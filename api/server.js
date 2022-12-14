require('dotenv').config({ path: './config.env' })
const express = require('express')
const connectDB = require('./config/db.js')
const errorHandler = require('./middleware/error.js')

// Connect DB
connectDB()

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/private', require('./routes/private.js'))

// Error Handler (Should be last piece of middleware)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('APP IS RUNNING.')
})

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
