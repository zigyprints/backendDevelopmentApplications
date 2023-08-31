import { Mongoose, connect } from 'mongoose'

export const databaseConnection = async (url: string): Promise<Mongoose> => {
  return await connect(url)
}
