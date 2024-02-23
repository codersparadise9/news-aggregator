import { UserService } from '../services/user.service'
import { UserLoginDTO, UserRegisterDTO } from '../dtos/user.dtos'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../core/entites/user.entity.interface'
import jwt from 'jsonwebtoken'
import { envConfig } from '../config/envconfig'

export class UserController {
    private readonly userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    static verifyToken(request: Request, response: Response) {
        const token = request.headers.authorization?.split(' ')[1] // Assuming token is sent as a Bearer token
        console.log('token = ', request.headers)
        if (!token) {
            return false
        }

        // Verify token
        jwt.verify(token!, envConfig.JWT_KEY!, (err: any, decoded: any) => {
            if (err) {
                return response.status(401).json({ message: 'Invalid token' })
            }

            // Attach decoded user data to request object
            // @ts-ignore
            request.userID = decoded

            // Proceed to next middleware or route handler
        })
        return true
    }

    async register(request: Request, response: Response): Promise<any> {
        try {
            const registerDTO: UserRegisterDTO = request.body
            const existingUser = await this.userService.find({
                email: registerDTO.email,
            })
            registerDTO.password = await bcrypt.hash(registerDTO.password, 10)
            if (existingUser.length > 0) {
                response.status(400).json({ message: 'User already exists' })
                return
            }
            response
                .status(201)
                .json(await this.userService.create(registerDTO))
        } catch (error) {
            response.status(400).json({ error: error })
        }
    }

    async login(request: Request, response: Response): Promise<any> {
        const loginDTO: UserLoginDTO = request.body

        const user = (await this.userService.find({
            email: loginDTO.email,
            password: loginDTO.password,
        })) as User[]
        if (user.length === 0)
            response.send(400).json({ message: 'Invalid credentials ' })
        const validPassword = await bcrypt.compare(
            loginDTO.password,
            user[0].password
        )
        if (!validPassword) {
            response.status(401).json({ message: 'Invalid credentials' })
            return
        }
        const token = jwt.sign({ userId: user[0].id }, envConfig.JWT_KEY!, {
            expiresIn: '1h',
        })
        response.status(200).json({ token: token })
    }

    async addUserPreferences(
        request: Request,
        response: Response
    ): Promise<any> {
        const preferences = request.body
        if (UserController.verifyToken(request, response)) {
            // @ts-ignore
            const user = await this.userService.findByID(request.userID)
            user.preferences.push(preferences)
            await this.userService.update(user)
            response
                .status(200)
                .json({ message: 'successfully added preferences' })
        }
    }

    async getUserPreferences(
        request: Request,
        response: Response
    ): Promise<any> {
        if (UserController.verifyToken(request, response)) {
            // @ts-ignore
            const user = await this.userService.findByID(request.userID)
            response.status(200).json(user)
        }
        response.status(401).json({ message: 'Unauthorized' })
    }
}
