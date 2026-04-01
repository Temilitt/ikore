const express  = require('express')
const router   = express.Router()
const Produce  = require('../models/Produce')
const { protect, admin, farmer } = require('../middleware/authMiddleware')

// GET /api/produce — public
router.get('/', async (req, res) => {
  try {
    const { search, category, state, minPrice, maxPrice, sort } = req.query
    let query = { isAvailable: true }

    if (search)   query.name     = { $regex: search, $options: 'i' }
    if (category) query.category = category
    if (state)    query.state    = { $regex: state, $options: 'i' }
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    let sortOption = { createdAt: -1 }
    if (sort === 'price_asc')  sortOption = { price: 1  }
    if (sort === 'price_desc') sortOption = { price: -1 }
    if (sort === 'rating')     sortOption = { rating: -1 }
    if (sort === 'popular')    sortOption = { totalSold: -1 }

    const produce = await Produce.find(query)
      .populate('farmer', 'name farmName state isVerified avatar')
      .sort(sortOption)

    res.json(produce)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/produce/featured
router.get('/featured', async (req, res) => {
  try {
    const produce = await Produce.find({ isAvailable: true, isFeatured: true })
      .populate('farmer', 'name farmName state isVerified')
      .limit(6)
      .sort({ totalSold: -1 })
    res.json(produce)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/produce/my — farmer's own produce
router.get('/my', protect, farmer, async (req, res) => {
  try {
    const produce = await Produce.find({ farmer: req.user._id }).sort({ createdAt: -1 })
    res.json(produce)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/produce/:id
router.get('/:id', async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id)
      .populate('farmer', 'name farmName state phone isVerified avatar farmDescription')
    if (!produce) return res.status(404).json({ message: 'Produce not found' })
    res.json(produce)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/produce — farmer only
router.post('/', protect, farmer, async (req, res) => {
  try {
    const produce = await Produce.create({ ...req.body, farmer: req.user._id })
    res.status(201).json(produce)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT /api/produce/:id
router.put('/:id', protect, farmer, async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id)
    if (!produce) return res.status(404).json({ message: 'Produce not found' })
    if (produce.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' })
    }
    Object.assign(produce, req.body)
    const updated = await produce.save()
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// DELETE /api/produce/:id
router.delete('/:id', protect, farmer, async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id)
    if (!produce) return res.status(404).json({ message: 'Produce not found' })
    if (produce.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' })
    }
    await Produce.findByIdAndDelete(req.params.id)
    res.json({ message: 'Produce deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/produce/:id/review
router.post('/:id/review', protect, async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id)
    if (!produce) return res.status(404).json({ message: 'Produce not found' })
    const { rating, comment } = req.body
    produce.reviews.push({ buyer: req.user._id, rating, comment })
    produce.numReviews = produce.reviews.length
    produce.rating     = produce.reviews.reduce((a, r) => a + r.rating, 0) / produce.reviews.length
    await produce.save()
    res.status(201).json({ message: 'Review added' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router