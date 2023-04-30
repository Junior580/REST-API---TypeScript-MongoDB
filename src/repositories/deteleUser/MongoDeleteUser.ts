import { ObjectId } from 'mongodb'
import { IDeleteUserRepository } from '../../controllers/deleteUser/protocols'
import { mongoClient } from '../../database/mongo'
import { IUser } from '../../models/Users'
import { MongoUser } from '../mongoProtocols'

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<IUser> {
    const user = await mongoClient.db
      .collection<MongoUser>('users')
      .findOne({ _id: new ObjectId(id) })

    if (!user) throw new Error('User not found')

    const { deletedCount } = await mongoClient.db
      .collection('users')
      .deleteOne({ _id: new ObjectId(id) })

    if (!deletedCount) throw new Error('User not deleted')

    const { _id, ...rest } = user

    return {
      id: _id.toHexString(),
      ...rest,
    }
  }
}
