const express = require('express')
const router  = express.Router()
const Order   = require('../models/Order')
const Produce = require('../models/Produce')
const { protect, admin } = require('../middleware/authMiddleware')

// GET /api/orders — admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('buyer',   'name email phone')
      .populate('farmer',  'name farmName')
      .populate('produce', 'name images price unit')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/orders/my — buyer orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('produce', 'name images price unit')
      .populate('farmer',  'name farmName state')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/orders/farmer — farmer orders
router.get('/farmer', protect, async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id })
      .populate('buyer',   'name email phone')
      .populate('produce', 'name images price unit')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const produce = await Produce.findById(req.body.produce)
    if (!produce) return res.status(404).json({ message: 'Produce not found' })
    if (!produce.isAvailable) return res.status(400).json({ message: 'Produce not available' })

    const order = await Order.create({
      ...req.body,
      buyer:      req.user._id,
      farmer:     produce.farmer,
      totalPrice: produce.price * req.body.quantity,
      timeline:   [{ status: 'pending', description: 'Order placed successfully' }],
    })

    const populated = await Order.findById(order._id)
      .populate('produce', 'name images price unit')
      .populate('farmer',  'name farmName')

    res.status(201).json(populated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT /api/orders/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    if (req.body.status && req.body.status !== order.status) {
      const messages = {
        confirmed:  'Order confirmed by farmer',
        processing: 'Order is being processed',
        shipped:    'Order has been shipped',
        delivered:  'Order delivered successfully',
        cancelled:  'Order cancelled',
      }
      order.timeline.push({
        status:      req.body.status,
        description: messages[req.body.status] || 'Status updated',
      })

      if (req.body.status === 'delivered') {
        await Produce.findByIdAndUpdate(order.produce, {
          $inc: { totalSold: order.quantity }
        })
      }
    }

    if (req.body.payment?.isPaid) {
      order.payment.isPaid    = true
      order.payment.paidAt    = new Date()
      order.payment.reference = req.body.payment.reference
    }

    Object.assign(order, req.body)
    const updated = await order.save()
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer',   'name email phone')
      .populate('farmer',  'name farmName phone')
      .populate('produce', 'name images price unit')
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router