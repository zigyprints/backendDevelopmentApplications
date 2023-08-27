let express = require('express');

// create express server instance
let app = express();

// port defining
let port = 3000;

// get db connection function
let mongo = require('./dbconnection/db')

//cors required for external server use
const cors =require ("cors");   
app.use(cors());

// give acess to read req.body json
app.use(express.json());


app.listen(port, () => {
    console.log(`Server form on port : ${port}`)
})
app.get('/',(request,response)=>{
    response.send("done");
});

// create route
app.use('/api/', require('./routes/create'));

// delete route
app.use('/api/', require('./routes/delete'));

// read route
app.use('/api/', require('./routes/read'));

// update route
app.use('/api/', require('./routes/update'));

// readall route
app.use('/api/', require('./routes/readall'));


// connect to db
mongo();