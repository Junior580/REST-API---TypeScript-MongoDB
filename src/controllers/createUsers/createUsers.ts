import validator from 'validator'
import { IUser } from '../../models/Users'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { ICreateUserParams, ICreateUserRepository } from './protocols'
import { badRequest, created, serverError } from '../helpers'

type IRequest = HttpRequest<IUser>
type IResponse = HttpResponse<IUser | string>

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(HttpRequest: IRequest): Promise<IResponse> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password']

      for (const field of requiredFields) {
        if (!HttpRequest?.body?.[field as keyof ICreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      const emailIsValid = validator.isEmail(HttpRequest.body!.email)

      if (!emailIsValid) {
        return badRequest(`Email is invalid`)
      }

      const user = await this.createUserRepository.createUser(HttpRequest.body!)

      return created<IUser>(user)
    } catch (error) {
      return serverError()
    }
  }
}
