const express = require('express');
const env = require('dotenv')

env.config() //Configuring hostname and port form dotenv file
hostname = process.env.HOSTNAME || 'localhost'
port = process.env.PORT || 3000

const app = express();

app.listen(port, (req, res) => {
    console.log(`Server listening on port http://${hostname}:${port}`);
});