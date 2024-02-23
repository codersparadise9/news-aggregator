import { User } from '../core/entites/user.entity.interface'
import { GenericRepository } from '../core/repositories/generic-repository.interface'
import {
    UserRegisterDTO,
    UserResponseDTO,
    UserResponseMapper,
} from '../dtos/user.dtos'
import { UserService } from './user.service'

export class UserServiceImpl implements UserService {
    private readonly repository: GenericRepository<User>

    constructor(repository: GenericRepository<User>) {
        this.repository = repository
    }

    async create(createDTO: UserRegisterDTO): Promise<UserResponseDTO> {
        const userExisting = await this.repository.find({
            email: createDTO.email,
        })
        if (userExisting.length === 0) {
            const newUser: Omit<User, 'id'> = {
                email: createDTO.email,
                fullName: createDTO.fullName,
                password: createDTO.password,
                preferences: [],
            }
            const user = await this.repository.create(newUser)
            return UserResponseMapper.mapCreateResponse(user)
        } else
            throw new Error(`user with email ${createDTO.email} already found`)
    }

    async delete(id: any): Promise<UserResponseDTO> {
        return await this.repository.delete(id)
    }

    async find(filter: Partial<User>): Promise<UserResponseDTO[]> {
        return await this.repository.find(filter)
    }

    async findAll(): Promise<UserResponseDTO[]> {
        return await this.repository.findAll()
    }

    async findByID(id: any): Promise<UserResponseDTO> {
        return await this.repository.findByID(id)
    }

    async update(updateDTO: User): Promise<UserResponseDTO | null> {
        return await this.repository.update(updateDTO)
    }
}
