const express = require('express');
const route = require('./route');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/tasks", route);

const port = 3000;
const server = app.listen(port, () => {
    console.log(`app running on port ${port}`);
})