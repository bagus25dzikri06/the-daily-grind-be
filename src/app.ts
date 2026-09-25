import express, { Request, Response } from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.route'

const app = express()

app.use(cors())
app.use(express.json({
    limit: '10mb'
}))
app.use(express.urlencoded({
    limit: '10mb',
    extended: true
}))

app.use('/api/auth', authRoutes)
app.get('/', (req : Request, res : Response) => {
    res.send('SportOn Backend Is Running')
})

export default app