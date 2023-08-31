const sqlite3 = require('sqlite3').verbose();


const db=new sqlite3.Database('./DB/todo.db',sqlite3.OPEN_READWRITE, (err:any) => {
    if (err) {

        // this error will be shutdow the app
        // and log the err.message
        throw err;
    }

    console.log('Connected to the todo database.');

    const sql=`CREATE table TASK (
        taskId INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
        userId VARCHAR(50),
        description VARCHAR(255),
        timestamp DATETIME
    );`;
        
    db.run(sql,(err:Error)=>{
        if (err) {
            console.log('Table already created.');
        } else {
            console.log('Table created.');
        }
    })


});

module.exports = db;