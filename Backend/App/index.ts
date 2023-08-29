// Required modules ...
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './route'

// Using modules ...
dotenv.config({ path: 'Backend/.env' })

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// specifying path for CRUD operations ...
app.use('/api/v1', router)

// Export app for the server.ts ...
export default app