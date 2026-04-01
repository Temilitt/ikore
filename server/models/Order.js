const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    farmer: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    produce: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Produce',
      required: true,
    },
    quantity:   { type: Number,  required: true },
    totalPrice: { type: Number,  required: true },
    status: {
      type:    String,
      enum:    ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    deliveryAddress: {
      address: { type: String, required: true },
      city:    { type: String, required: true },
      state:   { type: String, required: true },
      phone:   { type: String, required: true },
    },
    payment: {
      method:    { type: String, default: 'paystack' },
      reference: { type: String, default: ''         },
      isPaid:    { type: Boolean, default: false      },
      paidAt:    { type: Date                         },
    },
    timeline: [
      {
        status:      { type: String  },
        description: { type: String  },
        timestamp:   { type: Date, default: Date.now },
      }
    ],
    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)