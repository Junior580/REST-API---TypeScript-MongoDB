import { IUser } from '../../models/Users'

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<IUser>
}
