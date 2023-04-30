import { IUser } from '../models/Users'

export type MongoUser = Omit<IUser, 'id'>
