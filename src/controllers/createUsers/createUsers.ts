import { IUser } from '../../models/Users'
import { HttpRequest, HttpResponse } from '../protocols'
import { ICreateUserController, ICreateUserRepository } from './protocols'

type IRequest = HttpRequest<IUser>
type IResponse = HttpResponse<IUser>

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(HttpRequest: IRequest): Promise<IResponse> {
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
