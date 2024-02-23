import express, { Express } from 'express'
import { envConfig } from './config/envconfig'
import userRouter from './routes/user.routes'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.listen(envConfig.PORT, () => {
    console.log(`Server is listening on ${envConfig.PORT}`)
})
