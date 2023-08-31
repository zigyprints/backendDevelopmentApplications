import { ObjectId, Schema, model, Model } from 'mongoose'

export interface ITodoSchema {
  title: string
  description: string
  priority: string
}

interface ITodoModel extends Model<ITodoSchema> {
  addTodo(data: ITodoSchema): Promise<ITodoSchema>
  getTodos(priority: string | null): Promise<ITodoSchema[]>
}

export const todoSchema = new Schema<ITodoSchema>(
  {
    title: { type: String },
    description: { type: String },
    priority: { type: String, enum: ['low', 'mid', 'high'] },
  },
  {
    timestamps: true,
    statics: {
      async addTodo(data: ITodoSchema): Promise<ITodoSchema> {
        return await this.create(data)
      },
      async getTodoById(_id: ObjectId): Promise<any> {
        return await this.findById(_id)
      },
      async getTodos(priority: string | null): Promise<ITodoSchema[]> {
        interface Iquery {
          priority?: string
        }
        let query: Iquery = {}
        if (priority) {
          query.priority = priority
        }
        return await this.find(query)
      },
      // async updateTodo(
      //   _id: ObjectId,
      //   title: string | null,
      //   description: string | null
      // ): Promise<boolean> {
      //  if()
      // },
    },
  }
)

// todoSchema.statics.addTodo = async function (data: ITodoSchema): Promise<any> {
//   try {
//     await this.create(data)
//   } catch (e) {
//     return e
//   }
// }

// todoSchema.statics.getTodoById = async function name(
//   _id: ObjectId
// ): Promise<ITodoSchema> {
//   return await this.findById(_id)
// }

// todoSchema.statics.getTodoAll = async function (): Promise<[]> {
//   return await this.find()
// }

// todoSchema.statics.updateTodo = async function (
//   title: string | null,
//   description: string | null,
//   _id: ObjectId
// ): Promise<any> {
//   try {
//   } catch (e) {
//     return e
//   }
// }

// todoSchema.statics.addTodo = async function (_id: ObjectId): Promise<any> {
//   try {
//     return await this.findByIdAndDelete(_id)
//   } catch (e) {
//     return e
//   }
// }

export const todoModel = model<ITodoSchema, ITodoModel>('todo', todoSchema)
