import { User } from '../core/entites/user.entity.interface'

export interface CreateUserDTO extends Omit<User, 'id'> {}

export interface UserResponseDTO extends Omit<User, 'password'> {}

export interface UserRegisterDTO {
    fullName: string
    email: string
    password: string
}

export interface UserLoginDTO {
    email: string
    password: string
}

export class UserResponseMapper {
    public static mapCreateResponse(user: User): UserResponseDTO {
        return {
            email: user.email,
            fullName: user.fullName,
            id: user.id,
            preferences: user.preferences,
        }
    }
}
