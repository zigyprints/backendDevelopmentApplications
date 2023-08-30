import sqlite from "sqlite3"
import path from "path"

sqlite.verbose();                       //gives detail about database longer stack traces

class todoModel{
    public db: sqlite.Database; 

    constructor(){
        this.db = new sqlite.Database('./src/db/todo.db', (err) => {
            if(err){
                console.log(err);
            }
            else{
                console.log('Connected to the database');
            }
        });
        this.initialize();
    }
    initialize(){
            this.db.run('CREATE TABLE IF NOT EXISTS TASK(ID INTEGER PRIMARY KEY NOT NULL, TASK TEXT NOT NULL, COMPLETED BOOLEAN NOT NULL, ST_DATE DATETIME NOT NULL, FN_DATE DATETIME)');
    }

}

export default new todoModel();



