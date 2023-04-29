import { IUser } from '../../models/Users'

export interface IUpdateUserParams {
  firstName?: string
  lastName?: string
  password?: string
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<IUser>
}
