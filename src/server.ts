import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config()

const PORT = process.env.PORT || '5001'
const MONGO_URL = process.env.MONGO_URL || 'no-mongo-url'

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.error('Error in connecting to MongoDB', error)
})