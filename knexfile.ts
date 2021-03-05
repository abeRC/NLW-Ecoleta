import path from "path";

/*Knex não suporta export default, por isso estamos fazendo assim. */
module.exports = {
    client: "sqlite3",
    connection: {
        filename: path.resolve(__dirname, "src","database","database.sqlite")
    },
    migrations: {
        directory: path.resolve(__dirname, "src","database","migrations")
    },
    seeds: {
        directory: path.resolve(__dirname, "src","database","seeds")
    },
    useNullAsDefault: true //experimenta tirar pra ver o warning
};