import { IUser } from '../../models/Users'
import { ok, serverError } from '../helpers'
import { HttpResponse, IController } from '../protocols'
import { IGetUsersRepository } from './protocols'

type IResponse = HttpResponse<IUser[] | string>

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<IResponse> {
    try {
      const users = await this.getUsersRepository.getUsers()

      return ok<IUser[]>(users)
    } catch (error) {
      return serverError()
    }
  }
}
