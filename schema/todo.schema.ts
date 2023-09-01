import { ObjectId, Schema, model, Model } from 'mongoose'
import { ITodoSchema } from '../interfaces/interface.model'
import { IUpdateTodoBody } from '../interfaces/app.dto'
interface ITodoModel extends Model<ITodoSchema> {
  addTodo(data: ITodoSchema): Promise<ITodoSchema>
  getTodos(priority: string | null): Promise<ITodoSchema[]>
  getTodoById(_id: string): Promise<ITodoSchema | null>
  updateTodo(
    _id: string,
    title: string | undefined,
    descript: string | undefined
  ): Promise<ITodoSchema | null>
  deleteTodo(_id: string): Promise<ITodoSchema | null>
}

export const todoSchema = new Schema<ITodoSchema>(
  {
    title: { type: String },
    description: { type: String },
    priority: { type: String },
  },
  {
    timestamps: true,
    statics: {
      async addTodo(data: ITodoSchema): Promise<ITodoSchema | any> {
        try {
          return await this.create(data)
        } catch (e) {
          return e
        }
      },
      async getTodoById(_id: ObjectId): Promise<ITodoSchema | any> {
        try {
          return await this.findById(_id).lean()
        } catch (e) {
          return e
        }
      },
      async getTodos(priority: string | null): Promise<ITodoSchema[]> {
        interface Iquery {
          priority?: string
        }
        let query: Iquery = {}
        if (priority) {
          query.priority = priority
        }
        return await this.find(query).lean()
      },
      async updateTodo(
        _id: ObjectId,
        title: string | null,
        description: string | null
      ): Promise<ITodoSchema | any> {
        let update: IUpdateTodoBody = {}
        if (title) {
          update.title = title
        }
        if (description) {
          update.description = description
        }
        try {
          return await this.findByIdAndUpdate(_id, update, {
            lean: true,
            returnDocument: 'after',
          })
        } catch (e) {
          return e
        }
      },
      async deleteTodo(_id: ObjectId) {
        try {
          return await this.findByIdAndDelete(_id)
        } catch (e) {
          return e
        }
      },
    },
  }
)

export const todoModel = model<ITodoSchema, ITodoModel>('todo', todoSchema)
