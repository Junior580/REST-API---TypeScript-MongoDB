import { IGetUsersRepository } from '../../controllers/getUsers/protocols'
import { mongoClient } from '../../database/mongo'
import { IUser } from '../../models/Users'
import { MongoUser } from '../mongoProtocols'

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await mongoClient.db
      .collection<MongoUser>('users')
      .find({})
      .toArray()

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }))
  }
}
