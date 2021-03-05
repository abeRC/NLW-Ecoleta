import Knex from "knex";

//criar tabela
export async function up (knex: Knex) {
    return knex.schema.createTable('point_items', table => {
        table.increments("id").primary(); //O increments() incrementa o campo automaticamente.
        
        //integer porque o id das outras tabelas é integer (por causa do auto-increment)
        table.integer("point_id")
            .notNullable()
            .references("id")
            .inTable("points"); //cria uma chave estrangeira na tabela points no campo id
        //ou seja, todo point_id nesta tabela precisa ser um id válido na tabela points

        table.integer("item_id")
            .notNullable()
            .references("id")
            .inTable("items"); 
})};

//voltar atrás / desfazer o up()
export async function down (knex: Knex) {
    knex.schema.dropTable("point_items");
};