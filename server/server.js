const express   = require('express')
const cors      = require('cors')
const dotenv    = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Ikore API is running' }))

app.use('/api/auth',    require('./routes/authRoutes'))
app.use('/api/produce', require('./routes/produceRoutes'))
app.use('/api/orders',  require('./routes/orderRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))