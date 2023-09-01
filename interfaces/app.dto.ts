export interface ISaveTodoBody {
  title: string
  description: string
  priority: string
}

export interface IUpdateTodoBody {
  title?: string
  description?: string
}
