import express from 'express'
import { config } from 'dotenv'
import { GetUsersController } from './controllers/getUsers/GetUsers'
import { MongoGetUsersRepository } from './repositories/getUsers/MongoGetUsers'
import { mongoClient } from './database/mongo'
import { MongoCreateUserRepository } from './repositories/createUsers/MongoCreateUsers'
import { CreateUserController } from './controllers/createUsers/createUsers'
import { MongoUpdateUserRepository } from './repositories/updateUser/MongoUpdateUser'
import { UpdateUserController } from './controllers/updateUser/UpdateUser'
import { MongoDeleteUserRepository } from './repositories/deteleUser/MongoDeleteUser'
import { DeleteUserController } from './controllers/deleteUser/DeleteUserController'
import { routes } from './routes/routes'

const main = async () => {
  config()

  const app = express()

  await mongoClient.connect()

  app.use(express.json())

  app.use(routes)

  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`🚀 server is running on ${port}!`)
  })
}

main()
