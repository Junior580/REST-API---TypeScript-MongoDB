import { IUser } from '../../models/Users'
import { HttpResponse, HttpRequest } from '../protocols'

export interface IUpdateUserParams {
  firstName?: string
  lastName?: string
  password?: string
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<IUser>
}
