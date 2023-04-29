import { mongoClient } from '../../database/mongo'
import {
  ICreateUserParams,
  ICreateUserRepository,
} from '../../controllers/createUsers/protocols'
import { IUser } from '../../models/Users'

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: ICreateUserParams): Promise<IUser> {
    const { insertedId } = await mongoClient.db
      .collection('users')
      .insertOne(params)

    const user = await mongoClient.db
      .collection<Omit<IUser, 'id'>>('users')
      .findOne({ _id: insertedId })

    if (!user) throw new Error('User not created')

    const { _id, ...rest } = user

    return { id: _id.toHexString(), ...rest }
  }
}
