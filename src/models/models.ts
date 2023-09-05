import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('todos.db');

export default db;
