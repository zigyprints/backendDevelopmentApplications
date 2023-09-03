import knex from './db/knex';

export const createTask = (task: any): Promise<any> => {
    return knex("tasks").insert(task);
};

export const getTasks = (): Promise<any> => {
    return knex("tasks").select("*");
};


export const deleteTask = (id: any): Promise<any> => {
    return knex("tasks").where("id", id).del();
};

export const updateTask = (id: any, task: any): Promise<any> => {
    return knex("tasks").where("id", id).update(task);
};
