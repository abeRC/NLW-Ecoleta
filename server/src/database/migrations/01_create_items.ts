import Knex from "knex";

//criar tabela
export async function up (knex: Knex) {
    return knex.schema.createTable("items", table => {
        table.increments("id").primary(); //O increments() incrementa o campo automaticamente.
        table.string("title").notNullable();
        table.string("image").notNullable();
})};

//voltar atrás / desfazer o up()
export async function down (knex: Knex) {
    knex.schema.dropTable("items");
};