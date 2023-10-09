require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const documentRouter = require('./routes/documentRouter')

app.use(cors())

const PORT = process.env.API_PORT

// parse application/x-www-form-urlencoded and app*/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1/documents/', documentRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})