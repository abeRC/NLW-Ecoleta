import knex from "knex";
import path from "path";

/*O Knex é uma forma de universalizar o tratamento de bases de dados SQL.
path é pra não fraturar o crânio tentando reinventar a roda (e tentando lidar com diferentes OS).

Relação entre pontos de coleta (points) e itens coletados (items) é de muitos para muitos: 
um ponto pode ter muitos itens e um item pode estar relacionado a vários pontos.
A maneira mais tradicional de representar isso é uma tabela pivô (point_items),
que armazena a relação dos itens que um ponto coleta.

Entidades da aplicação:
points:
    nome
    imagem
    email
    whatsapp
    latitude
    longitude
    cidade
    estado
items:
    título
    imagem
point_items:
    point_id
    item_id


Migrations = histórico do banco de dados
Útil para programar com os coleguinhas.
Comando: npx knex migrate:latest --knexfile knexfile.ts migrate:latest

Para ver a database, aperte F1, digite SQL e clique em open database.
(Às vezes a extensão dá uma bugada. Fecha a janela e abre de novo.)
*/

const connection = knex({
    client: "sqlite3",
    connection: {
        filename: path.resolve(__dirname, "database.sqlite"),
    },
    useNullAsDefault: true //experimenta tirar pra ver o warning
})

export default connection;