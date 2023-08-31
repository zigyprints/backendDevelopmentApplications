import dotenv from 'dotenv'

dotenv.config()

interface Config {
  serverPort: number
  dbConnectionURL: string
  environment: string
  jsonLimit: string
}

export const config: Config = {
  serverPort: Number(process.env.PORT),
  dbConnectionURL: String(process.env.DB_URL),
  environment: String(process.env.ENV),
  jsonLimit: '10mb',
}
