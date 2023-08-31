import http, { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import { config } from './config/app.config'
import { databaseConnection } from './config/db.config'

const server: Server = http.createServer(app)

;(async () => {
  try {
    const connection = await databaseConnection(config.dbConnectionURL)
    if (connection instanceof Error) throw connection
    console.log('Database Connection Established!')
  } catch (e: any) {
    console.log(e.message)
    process.emit('SIGTERM')
  }
})()

server.listen(config.serverPort)

server.on('listening', () => {
  console.log(`Started at port: ${config.serverPort}`)
})

server.on('error', (e: Error) => {
  console.error(e.message)
  process.emit('SIGTERM')
})

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  console.log('Closing http server.')
  server.close((err) => {
    if (err) console.error(err)
    mongoose.connection.close(Boolean(0))
    console.log('DB connection closed succesfully!')
    process.exit(0)
  })
  console.log('HTTP server shutdown successful!.')
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err, origin)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise)
})
