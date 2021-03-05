import Knex from "knex";

/*Serve para popular a base de dados com dados padrão.
Comando: npx knex --knexfile knexfile.ts seed:run
*/
export async function seed (knex: Knex) {
    await knex("items").insert([
        { title: "Lâmpadas", image: "lampadas.svg"},
        { title: "Pilhas e Baterias", image: "baterias.svg"},
        { title: "Papéis e Papelão", image: "papeis-papelao.svg"},
        { title: "Resíduos eletrônicos", image: "eletronicos.svg"},
        { title: "Resíduos orgânicos", image: "organicos.svg"},
        { title: "Óleo de cozinha", image: "oleo.svg"}
    ]);
};