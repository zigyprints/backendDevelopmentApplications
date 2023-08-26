let express = require('express');

// create express server instance
let app = express();

// port defining
let port = 3000;

// get db connection function
let mongo = require('./dbconnection/db')

// connect to db
mongo();

// give acess to read req.body json
app.use(express.json());

// create route
app.use('/', require('./routes/create'));

// delete route
app.use('/', require('./routes/delete'));

// read route
app.use('/', require('./routes/read'));

// update route
app.use('/', require('./routes/update'));

// readall route
app.use('/', require('./routes/readall'));

// add port listener 
app.listen(port, () => {
    console.log(`Server form on port : ${port}`)
})