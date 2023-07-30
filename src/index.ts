const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const coompression = require('compression')
const cors= require('cors')

const app= express()
app.use(cors({credentials:true}))

app.use(bodyParser.json())
const server = http.createServer(app)

server.listen(8080, ()=>{
    console.log("listening on port 8080")
})
