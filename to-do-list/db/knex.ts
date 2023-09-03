import knex from "knex";

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "tododb.sqlite3"
    }
});

export default connectedKnex;