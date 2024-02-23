import { UserNewsPreferences } from './user-news-preferences.entity'

export interface User {
    id: any
    fullName: string
    email: string
    password: string
    preferences: UserNewsPreferences[] | []
}
