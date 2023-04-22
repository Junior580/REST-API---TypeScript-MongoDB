import express from 'express'
import { config } from 'dotenv'
import { GetUsersController } from './controllers/getUsers/GetUsers'
import { MongoGetUsersRepository } from './repositories/getUsers/MongoGetUsers'
import { mongoClient } from './database/mongo'
import { MongoCreateUserRepository } from './repositories/createUsers/MongoCreateUsers'
import { CreateUserController } from './controllers/createUsers/createUsers'

const main = async () => {
  config()

  const app = express()

  await mongoClient.connect()

  app.get('/users', async (req, res) => {
    const userRepo = new MongoGetUsersRepository()

    const getUsersController = new GetUsersController(userRepo)

    const response = await getUsersController.handle()

    return res.status(response.statusCode).send(response.body)
  })

  app.post('/', async (req, res) => {
    const userRepo = new MongoCreateUserRepository()

    const createUserController = new CreateUserController(userRepo)

    const {body, statusCode } = createUserController.handle({req.body})
  })

  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`🚀 server is running on ${port}!`)
  })
}

main()
