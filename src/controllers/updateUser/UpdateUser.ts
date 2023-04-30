import { IUser } from '../../models/Users'
import { badRequest, serverError, ok } from '../helpers'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { IUpdateUserParams, IUpdateUserRepository } from './protocols'

type IResponse = HttpResponse<IUser | string>

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<IResponse> {
    try {
      const id = httpRequest?.params?.id
      const body = httpRequest?.body

      if (!body) {
        return badRequest('Missing fields')
      }

      if (!id) {
        return badRequest('Missing user id')
      }

      const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
        'firstName',
        'lastName',
        'password',
      ]

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        key => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
      )

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest('Some received fields is not allowed to update')
      }

      const user = await this.updateUserRepository.updateUser(id, body)

      return ok<IUser>(user)
    } catch (error) {
      return serverError()
    }
  }
}
