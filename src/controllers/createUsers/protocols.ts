import { IUser } from '../../models/Users'
import { HttpRequest, HttpResponse } from '../protocols'

type IResponse = HttpResponse<IUser>

export interface ICreateUserParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ICreateUserController {
  handle(
    HttpRequest: HttpRequest<ICreateUserParams>
  ): Promise<IResponse | string>
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<IUser>
}
