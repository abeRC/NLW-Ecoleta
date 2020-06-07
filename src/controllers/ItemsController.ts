import {Request, Response} from "express";
import knex from "../database/connection";

class ItemsController {
    async index (request: Request, response: Response) {
        //Conseguir os dados da base de dados pode demorar um pouco, então acrescentamos a palavra-chave await
        //e deixamos a função assíncrona.
        const items = await knex("items").select("*"); //SELECT * FROM items //seleciona
    
        /*Serialização de dados: transformar os dados para um novo formato mais acessível para quem está requisitando as informações */
        const serializedItems = items.map( item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.100.28:3333/uploads/${item.image}`
                /*Isto foi alterado para testar o app do React Native.
                Lembre de mudar de volta! ^^ */
            };
        });
        return response.json(serializedItems);
    }
}

export default ItemsController;