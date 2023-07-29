// imports

const express = require('express')
const app = express()
require('express-async-errors');
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

// error handler

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware

app.use(express.json())

// routes

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

// extra security packages

const helmet = require('helmet')
const xss = require('xss-clean')
app.use(helmet());
app.use(xss());

// Port

const port = process.env.PORT || 5000

// DB Connection start

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        )
    } catch (error) {
        console.log(error)
    }
}

start()