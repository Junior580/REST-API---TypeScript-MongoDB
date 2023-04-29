import { ObjectId } from 'mongodb'
import {
  IUpdateUserParams,
  IUpdateUserRepository,
} from '../../controllers/updateUser/protocols'
import { mongoClient } from '../../database/mongo'
import { IUser } from '../../models/Users'

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: IUpdateUserParams): Promise<IUser> {
    await mongoClient.db.collection('users').updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...params,
        },
      }
    )

    const user = await mongoClient.db
      .collection<Omit<IUser, 'id'>>('users')
      .findOne({ _id: new ObjectId(id) })

    if (!user) throw new Error('User not updated')

    const { _id, ...rest } = user

    return { id: _id.toHexString(), ...rest }
  }
}
