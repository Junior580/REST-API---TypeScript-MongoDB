import { IUser } from '../../models/Users'

export interface ICreateUserParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<IUser>
}
