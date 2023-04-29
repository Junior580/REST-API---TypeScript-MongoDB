import { IUser } from '../../models/Users'
import { HttpRequest, HttpResponse } from '../protocols'

type IRequest = HttpRequest<IUser>
type IResponse = HttpResponse<IUser>

export interface ICreateUserParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ICreateUserController {
  handle(HttpRequest: IRequest): Promise<IResponse>
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<IUser>
}
