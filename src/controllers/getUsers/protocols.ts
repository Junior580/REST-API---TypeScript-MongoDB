import { IUser } from '../../models/Users'
import { HttpResponse } from '../protocols'

type IReponse = HttpResponse<IUser[]>

export interface IGetUsersController {
  handle(): Promise<IReponse>
}

export interface IGetUsersRepository {
  getUsers(): Promise<IUser[]>
}
