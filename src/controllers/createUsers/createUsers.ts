import { IUser } from '../../models/Users'
import { HttpRequest, HttpResponse } from '../protocols'
import {
  ICreateUserController,
  ICreateUserParams,
  ICreateUserRepository,
} from './protocols'

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      if (!HttpRequest.body) {
        return {
          statusCode: 400,
          body: 'Please specify a body',
        }
      }
      const user = await this.createUserRepository.createUser(HttpRequest.body)

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
