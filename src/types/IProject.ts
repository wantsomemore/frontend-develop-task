import { ITask } from './ITask'

export interface IProject  {
  name: string
  description: string
  tasks: ITask[]
}
