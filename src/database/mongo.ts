import { MongoClient as Mongo, Db } from 'mongodb'

export const mongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || 'localhost:27017'
    // const userName = process.env.MONGODB_USERNAME
    // const password = process.env.MONGODB_PASSWORD

    const client = new Mongo(url)
    const db = client.db('UsersDB')

    this.client = client
    this.db = db
  },
}
