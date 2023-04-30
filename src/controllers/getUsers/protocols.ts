import { IUser } from '../../models/Users'

export interface IGetUsersRepository {
  getUsers(): Promise<IUser[]>
}
