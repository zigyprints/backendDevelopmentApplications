import { ObjectId, Schema } from 'mongoose'

interface ITodoSchema {
  title: string
  description: string
  priority?: string
}

export const todoSchema = new Schema<ITodoSchema>(
  {
    title: { type: String },
    description: { type: String },
    priority: { type: String, enum: ['low', 'mid', 'high'] },
  },
  { timestamps: true }
)

todoSchema.statics.addTodo = async function (data: ITodoSchema): Promise<any> {
  try {
    await this.create(data)
  } catch (e) {
    return e
  }
}

todoSchema.statics.getTodoById = async function name(
  _id: ObjectId
): Promise<ITodoSchema> {
  return await this.findById(_id)
}

todoSchema.statics.getTodoAll = async function (): Promise<[]> {
  return await this.find()
}

todoSchema.statics.updateTodo = async function (
  title: string | null,
  description: string | null,
  _id: ObjectId
): Promise<any> {
  try {
  } catch (e) {
    return e
  }
}

todoSchema.statics.addTodo = async function (_id: ObjectId): Promise<any> {
  try {
    return await this.findByIdAndDelete(_id)
  } catch (e) {
    return e
  }
}
