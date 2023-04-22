import { IGetUsersRepository } from '../../controllers/getUsers/protocols'
import { mongoClient } from '../../database/mongo'
import { IUser } from '../../models/Users'

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await mongoClient.db
      .collection<Omit<IUser, 'id'>>('users')
      .find({})
      .toArray()

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }))
  }
}
