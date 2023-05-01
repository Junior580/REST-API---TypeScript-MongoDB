import { Request, Response, Router } from 'express'
import { MongoGetUsersRepository } from '../repositories/getUsers/MongoGetUsers'
import { GetUsersController } from '../controllers/getUsers/GetUsers'
import { MongoCreateUserRepository } from '../repositories/createUsers/MongoCreateUsers'
import { CreateUserController } from '../controllers/createUsers/createUsers'
import { MongoUpdateUserRepository } from '../repositories/updateUser/MongoUpdateUser'
import { UpdateUserController } from '../controllers/updateUser/UpdateUser'
import { MongoDeleteUserRepository } from '../repositories/deteleUser/MongoDeleteUser'
import { DeleteUserController } from '../controllers/deleteUser/DeleteUserController'

export const routes = Router()

routes.get('/users', async (request: Request, response: Response) => {
  const userRepo = new MongoGetUsersRepository()

  const getUsersController = new GetUsersController(userRepo)

  const { body, statusCode } = await getUsersController.handle()

  return response.status(statusCode).json(body)
})

routes.post('/users', async (request, response) => {
  const userRepo = new MongoCreateUserRepository()

  const createUserController = new CreateUserController(userRepo)

  const { statusCode, body } = await createUserController.handle({
    body: request.body,
  })

  return response.status(statusCode).json(body)
})

routes.patch('/users/:id', async (request, response) => {
  const userRepo = new MongoUpdateUserRepository()

  const updateUserController = new UpdateUserController(userRepo)

  const { body, statusCode } = await updateUserController.handle({
    body: request.body,
    params: request.params,
  })

  return response.status(statusCode).json(body)
})

routes.delete('/users/:id', async (request, response) => {
  const userRepo = new MongoDeleteUserRepository()

  const deleteUserController = new DeleteUserController(userRepo)

  const { body, statusCode } = await deleteUserController.handle({
    params: request.params,
  })

  return response.status(statusCode).json(body)
})
