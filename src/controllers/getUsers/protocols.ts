import { IUser } from '../../models/Users'
import { HttpResponse } from '../protocols'

type IResponse = HttpResponse<IUser[]>

export interface IGetUsersController {
  handle(): Promise<IResponse>
}

export interface IGetUsersRepository {
  getUsers(): Promise<IUser[]>
}
