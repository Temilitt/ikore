const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')
const User    = require('../models/User')
const { protect, admin } = require('../middleware/authMiddleware')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role, state, farmName, farmDescription } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'User already exists' })
    const user = await User.create({
      name, email, password, phone, role, state, farmName, farmDescription
    })
    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id:             user._id,
        name:            user.name,
        email:           user.email,
        role:            user.role,
        phone:           user.phone,
        state:           user.state,
        farmName:        user.farmName,
        farmDescription: user.farmDescription,
        isVerified:      user.isVerified,
        token:           generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json(req.user)
})

// PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    Object.assign(user, req.body)
    if (req.body.password) user.password = req.body.password
    const updated = await user.save()
    res.json({
      _id:             updated._id,
      name:            updated.name,
      email:           updated.email,
      role:            updated.role,
      phone:           updated.phone,
      state:           updated.state,
      farmName:        updated.farmName,
      farmDescription: updated.farmDescription,
      token:           generateToken(updated._id),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// GET /api/auth/users — admin only
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// PUT /api/auth/verify/:id — admin only
router.put('/verify/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: req.body.isVerified },
      { new: true }
    ).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
module.exports = router