import dotenv from 'dotenv'

dotenv.config()
export const envConfig = {
    PORT: process.env.PORT,
    JWT_KEY: process.env.JWT_KEY,
}
