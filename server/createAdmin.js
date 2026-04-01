const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const dotenv   = require('dotenv')
const User     = require('./models/User')

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')

    await User.deleteMany({ email: 'aderounmutemiloluwa2004@gmail.com' })

    const salt    = await bcrypt.genSalt(10)
    const hashed  = await bcrypt.hash('Temi@2024', salt)

    await User.collection.insertOne({
      name:       'Temiloluwa Aderounmu',
      email:      'aderounmutemiloluwa2004@gmail.com',
      password:   hashed,
      role:       'admin',
      phone:      '09016196558',
      isVerified: true,
      createdAt:  new Date(),
      updatedAt:  new Date(),
    })

    console.log('✅ Admin created successfully')
    process.exit()
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

createAdmin()