const knex = require("./knex")

exports.createTask = (task) => {
    return knex("task").insert(task);
}

exports.getAllTask = () => {
    return knex("task").select("*");
}

exports.getTask = (id) => {
    return knex("task").where("id",id).select();
}

exports.deleteTask = (id) => {
    return knex("task").where("id",id).del();
}
exports.updateTask = (id,task) => {
    return knex("task").where("id",id).update(task);
}
