const sqlite3 = require('sqlite3').verbose();


const db=new sqlite3.Database('./DB/todo.db',sqlite3.OPEN_READWRITE, (err:any) => {
    if (err) {
        // can't open database
        console.error(err.message);
        throw err;
        return;
    }

    console.log('Connected to the todo database.');

    const sql=`CREATE table TASK (
        taskId INTEGER PRIMARY KEY AUTO_INCREMENT,
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