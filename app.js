const express = require('express');

const app = express();
const taskRouter = require('./routes/taskRoute')
const morgan = require('morgan')

const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middelware/not-found')
const errorHandlerMiddelware = require('./middelware/error-handler')

// Middelwares
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/v1/tasks', taskRouter)
app.use(errorHandlerMiddelware)
app.use(notFound)



const PORT = 9000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`app listen in port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()

