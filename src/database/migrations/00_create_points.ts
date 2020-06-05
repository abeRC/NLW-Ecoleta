import Knex from "knex";

/*Ordem dos arquivos vai ser a ordem em que elas vão ser executadas no banco, por isso o 0__ */

/*up() e down() vão ser chamadas pelo knex e receber uma instância do knex para acessar o banco de dados
Migrations = histórico do banco de dados
Útil para programar com os coleguinhas.
Comando: npx knex --knexfile knexfile.ts migrate:latest*/

//criar tabela
export async function up (knex: Knex) {
    /*PROTIP: Use o import e a anotação de função para tirar vantagem do Intellisense. */
    return knex.schema.createTable('points', table => {
        table.increments("id").primary(); //O increments() incrementa o campo automaticamente.

        table.string("name").notNullable();
        table.string("image").notNullable();
        table.string("email").notNullable();
        table.string("whatsapp").notNullable();
        table.decimal("latitude").notNullable();
        table.decimal("longitude").notNullable();
        table.string("cidade").notNullable();
        table.string("estado", 2).notNullable();
    });
};

//voltar atrás / desfazer o up()
export async function down (knex: Knex) {
    knex.schema.dropTable("points");
};