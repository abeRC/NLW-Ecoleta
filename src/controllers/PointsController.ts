import {Request, Response} from "express";
import knex from "../database/connection";

class PointsController {
    async show (request: Request, response: Response) {
        //aqui a gente usa request parameters

        //const id = request.params.id;
        const { id } = request.params; //desestruturação

        //const point = await knex("points").where("id", id) //point é any[]
        const point = await knex("points").where("id", id).first();

        if (!point) {
            return response.status(400).json({
                message: "Point not found."
            });
        }
        
        /*Usamos isto na aplicação mobile.
        Em linguagem de tabelas: 
        SELECT * FROM items
        JOIN point_items ON items.id = point_items.item_id
        WHERE point_items.point_id = {id}*/
        const items = await knex("items")
            .join("point_items", "items.id", "=", "point_items.item_id") //junta com a tabela point_items na parte em que items.id = point_items.item_id
            .where("point_items.point_id", id)
            .select("items.title");
        return response.json({point, items});
    }

    async create (request: Request, response: Response) {
        //aqui a gente usa request body

        //const {} = request.body; //desestruturação do objeto para pegar os campos dentro dele
        //const name = request.body.name
        //...etc.
        const {
            //short syntax: quando o nome da variável é igual à propriedade,
            //podemos omitir o nome da variável
            name, //sem short syntax
            email, //com (todo o resto) short syntax 
            whatsapp,
            latitude,
            longitude,
            cidade,
            estado,
            items //não é um campo da tabela points!
        } = request.body;

        /*Antes de todas as queries, para que elas sejam ligadas e ou todas falhem (o que causa um rollback) ou todas executem com sucesso.
        documentação: knexjs.org
        "In some cases you may prefer to create transaction but only execute statements in it later. 
        In such case call method transaction without a handler function." */
        const trx = await knex.transaction();

        //O método insert() retorna o registro dos itens que foram inseridos (que no caso é 1 objeto) (o id vem do 00)create_points.ts).
        //retorna um number[]
        const newpoint = {
            name,
            image: "https://images.unsplash.com/photo-1514425263458-109317cc1321?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60", //não pode ser nulo
            email,
            whatsapp,
            latitude,
            longitude,
            cidade,
            estado
        };
        const insertedIds = await trx("points").insert(newpoint);
        const point_id = insertedIds[0];

        //Criamos um objeto com a relação item-ponto a partir da lista de itens.
        const pointItems = items.map( (item_id: number) => {
            return {
                item_id,
                point_id
            };
        });

        //Perceba que este insert depende do primeiro, mas o primeiro não depende deste.
        await trx("point_items").insert(pointItems);

        await trx.commit(); //Para inserir de fato as mudanças na database. //NO ERROR HANDLING HERE BOYZ :D
        //Caso algo falhe, precisamos do rollback.

        return response.json({
            id: point_id, //Faltava este cara.
            ... newpoint /*Spread operator*/
        });
    }

    async index (request: Request, response: Response) {
        //aqui a gente usa request query

        const { cidade, estado, items } = request.query; //Pode vir qualquer coisa no query, então é preciso cuidar com os tipos.

        const parsedString = String(items)
            .split(",")
            .map( item => Number(item.trim()));

            const points = await knex("points") //todos os pontos em que pelo menos um dos itens pertence ao array de filtro e com estado e cidade certos
                .join("point_items", "points.id", "=", "point_items.point_id")
                .whereIn("point_items.item_id", parsedString) //que tem um item que está dentro do array
                .where("cidade", String(cidade))
                .where("estado", String(estado))
                .distinct() //Porque um mesmo ponto estará associado a vários itens.
                .select("points.*"); //Restringe a busca às entradas da tabela original (e não da joined).

        response.json(points);
    }
};

export default PointsController;