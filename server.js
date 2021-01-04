const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const dbUri = process.env.ATLAS_URI
mongoose.connect(dbUri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection;
connection.once('open', () => { console.log(`Connect DB complete!`) })

const app = express()

const port = process.env.PORT || 5000


app.use(cors())
app.use(bodyParser.json())

const exercisesRoute = require('./routes/exercises')
const usersRoute = require('./routes/users')

app.use('/exercises', exercisesRoute)
app.use('/users', usersRoute)

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})