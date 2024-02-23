import { User } from '../core/entites/user.entity.interface'
import { UserNewsPreferences } from '../core/entites/user-news-preferences.entity'

export class UserEntity implements User {
    id: any
    email: string
    fullName: string
    password: string
    preferences: UserNewsPreferences[]

    constructor(
        id: any,
        fullName: string,
        email: string,
        password: string,
        preferences: UserNewsPreferences[]
    ) {
        this.id = id
        this.email = email
        this.password = password
        this.fullName = fullName
        this.preferences = preferences || []
    }
}
