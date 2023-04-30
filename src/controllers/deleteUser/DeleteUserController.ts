import { IUser } from '../../models/Users'
import { badRequest, ok, serverError } from '../helpers'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { IDeleteUserRepository } from './protocols'

type IResponse = HttpResponse<IUser | string>

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<IResponse> {
    try {
      const id = httpRequest?.params?.id

      if (!id) {
        return badRequest('Missing user id')
      }

      const user = await this.deleteUserRepository.deleteUser(id)

      return ok<IUser>(user)
    } catch (error) {
      return serverError()
    }
  }
}
