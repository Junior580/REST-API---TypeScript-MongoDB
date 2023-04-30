import validator from 'validator'
import { IUser } from '../../models/Users'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { ICreateUserParams, ICreateUserRepository } from './protocols'

type IRequest = HttpRequest<IUser>
type IResponse = HttpResponse<IUser>

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(HttpRequest: IRequest): Promise<IResponse> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password']

      for (const field of requiredFields) {
        if (!HttpRequest?.body?.[field as keyof ICreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          }
        }
      }

      const emailIsValid = validator.isEmail(HttpRequest.body!.email)

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: `Email is invalid`,
        }
      }

      const user = await this.createUserRepository.createUser(HttpRequest.body!)

      return {
        statusCode: 201,
        body: user,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong.',
      }
    }
  }
}
