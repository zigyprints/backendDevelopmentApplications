"use strict";
//The code below setup the server
/*
To start the server cd into the directory and type npm run dev
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3003;
const taskRouter = require('./routes/tasks');
app.use(bodyParser.json());
app.use('/api', taskRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
