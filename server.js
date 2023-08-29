const express = require('express');
const env = require('dotenv');
const router = require('./routes/contactRouter');
const DBConnect = require('./Config/connectionDB');

env.config() //Configuring hostname and port form dotenv file
hostname = process.env.HOSTNAME || 'localhost'
port = process.env.PORT || 3000

DBConnect();
const app = express(); //Created Express app

//Setting up Middleware and Router
app.use(express.json());
app.use('/api/contact', router);

app.listen(port, (req, res) => {
    console.log(`Server listening on port http://${hostname}:${port}`);
});