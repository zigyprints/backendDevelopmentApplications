import express, { Request, Response, NextFunction, Application } from 'express'
import { config } from './config/app.config'
import { appController } from './controller/app.controller'
import { tryCatch } from './utils/trycatch'

const app: Application = express()

app.use(express.json({ limit: config.jsonLimit }))
app.use(express.urlencoded({ extended: true }))

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 400 && err.type === 'entity.parse.failed') {
    return res.status(400).send({ message: 'Invalid JSON format!' })
  } else {
    next(err)
  }
  next()
})

app.post('/api/v1/tasks', tryCatch(appController.saveTasks))

app.get('/api/v1/tasks?', tryCatch(appController.getTasks))

app.patch('/api/v1/tasks?', tryCatch(appController.updateTasks))

app.delete('/api/v1/tasks?', tryCatch(appController.deleteTasks))

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new Error('Invalid Route!'))
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status !== 400)
    return res.status(err.status).send({ message: err.message })
  return res.status(500).send({ message: 'Internal Server Error' })
})

export default app
