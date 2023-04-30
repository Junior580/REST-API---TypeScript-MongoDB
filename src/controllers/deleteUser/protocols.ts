import { IUser } from '../../models/Users'
import { HttpRequest, HttpResponse } from '../protocols'

type IResponse = HttpResponse<IUser>
export interface IDeleteUserController {
  handle(httpRequest: HttpRequest<any>): Promise<IResponse>
}
export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<IUser>
}
