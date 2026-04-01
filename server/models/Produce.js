const mongoose = require('mongoose')

const produceSchema = new mongoose.Schema(
  {
    farmer: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    name: {
      type:     String,
      required: true,
      trim:     true,
    },
    description: {
      type:     String,
      required: true,
    },
    category: {
      type:    String,
      enum:    ['vegetables', 'tubers', 'grains', 'fruits', 'spices', 'livestock', 'other'],
      required: true,
    },
    price: {
      type:     Number,
      required: true,
    },
    unit: {
      type:     String,
      required: true,
    },
    quantity: {
      type:     Number,
      required: true,
    },
    images: [{ type: String }],
    state: {
      type:     String,
      required: true,
    },
    address: {
      type:    String,
      default: '',
    },
    isAvailable: {
      type:    Boolean,
      default: true,
    },
    isFeatured: {
      type:    Boolean,
      default: false,
    },
    rating: {
      type:    Number,
      default: 0,
    },
    numReviews: {
      type:    Number,
      default: 0,
    },
    reviews: [
      {
        buyer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating:  { type: Number, required: true },
        comment: { type: String },
        date:    { type: Date, default: Date.now },
      }
    ],
    totalSold: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Produce', produceSchema)