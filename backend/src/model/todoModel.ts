import sqlite from "sqlite3"
sqlite.verbose();

class todoModel{
    private db: sqlite.Database; 

    constructor(){
        this.db = new sqlite.Database('./../db/todo.db', (err) => {
            if(err){
                console.log(err.message);
            }
            else{
                console.log('Connected to the database');
            }
        });
        this.initialize();
    }
    initialize(){
            this.db.run('CREATE TABLE IF NOT EXISTS TASK(ID INT PRIMARY KEY NOT NULL AUTOINCREMENT, TASK TEXT, COMPLETED BOOLEAN, DATE DATETIME)');
    }
}



