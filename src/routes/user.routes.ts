import express, { Request, Response, Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'
import { InMemoryDb } from '../database/in-memory-db'
import { GenericRepository } from '../core/repositories/generic-repository.interface'
import { User } from '../core/entites/user.entity.interface'
import { UserServiceImpl } from '../services/user.service.impl'

const userRouter: Router = express.Router()

const userDb: GenericRepository<User> = new InMemoryDb()
const userService: UserService = new UserServiceImpl(userDb)
const userController = new UserController(userService)

userRouter.post('/login', (request: Request, response: Response) =>
    userController.login(request, response)
)

userRouter.post('/register', (request: Request, response: Response) =>
    userController.register(request, response)
)

userRouter.get('/preferences', (request: Request, response: Response) =>
    userController.getUserPreferences(request, response)
)

userRouter.put('/preferences', (request: Request, response: Response) =>
    userController.login(request, response)
)

userRouter.get('/news', (request: Request, response: Response) =>
    userController.login(request, response)
)

export default userRouter
