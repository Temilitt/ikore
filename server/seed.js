const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const dotenv   = require('dotenv')
const User     = require('./models/User')
const Produce  = require('./models/Produce')

dotenv.config()
mongoose.set('bufferCommands', false)

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    })
    console.log('MongoDB Connected')

    await Produce.deleteMany()
    await User.deleteMany({ role: { $ne: 'admin' } })
    console.log('Cleared old data')

    // CREATE FARMERS
    const salt = await bcrypt.genSalt(10)

    const farmers = await User.insertMany([
      {
        name:            'Musa Abdullahi',
        email:           'musa@ikore.ng',
        password:        await bcrypt.hash('password123', salt),
        role:            'farmer',
        phone:           '08012345678',
        state:           'Kaduna',
        farmName:        'Abdullahi Fresh Farms',
        farmDescription: 'Family-owned tomato and pepper farm in Kaduna. Over 20 years of farming experience.',
        isVerified:      true,
      },
      {
        name:            'Emeka Nwachukwu',
        email:           'emeka@ikore.ng',
        password:        await bcrypt.hash('password123', salt),
        role:            'farmer',
        phone:           '08087654321',
        state:           'Ebonyi',
        farmName:        'Nwachukwu Rice Estate',
        farmDescription: 'Premium rice and cassava farm in Ebonyi. Supplying fresh produce since 2005.',
        isVerified:      true,
      },
      {
        name:            'Aisha Bello',
        email:           'aisha@ikore.ng',
        password:        await bcrypt.hash('password123', salt),
        role:            'farmer',
        phone:           '08055556666',
        state:           'Kano',
        farmName:        'Bello Gardens',
        farmDescription: 'Specialising in watermelon, onions and fresh fruits in Kano.',
        isVerified:      true,
      },
      {
        name:            'Biodun Adeyemi',
        email:           'biodun@ikore.ng',
        password:        await bcrypt.hash('password123', salt),
        role:            'farmer',
        phone:           '08033334444',
        state:           'Oyo',
        farmName:        'Adeyemi Farms',
        farmDescription: 'Cassava, yam and plantain farm in Oyo state.',
        isVerified:      false,
      },
    ])
    console.log(' Farmers created')

    
    await Produce.insertMany([
      {
        farmer:      farmers[0]._id,
        name:        'Fresh Tomatoes',
        description: 'Fresh, ripe tomatoes harvested daily from our farm in Kaduna. Perfect for cooking, soups and stews. Sorted and packed with care.',
        category:    'vegetables',
        price:       4500,
        unit:        'basket',
        quantity:    50,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259329/tomato_y7uae8.webp'],
        state:       'Kaduna',
        isAvailable: true,
        isFeatured:  true,
        rating:      4.8,
        numReviews:  24,
        totalSold:   234,
      },
      {
        farmer:      farmers[0]._id,
        name:        'Fresh Pepper',
        description: 'Hot and fresh pepper straight from the farm. Available in bulk for restaurants, caterers and households.',
        category:    'spices',
        price:       3200,
        unit:        'basket',
        quantity:    30,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259279/pepper_market_yraqph.jpg'],
        state:       'Kaduna',
        isAvailable: true,
        isFeatured:  false,
        rating:      4.6,
        numReviews:  18,
        totalSold:   156,
      },
      {
        farmer:      farmers[1]._id,
        name:        'Local Rice',
        description: 'Premium Nigerian local rice from Ebonyi — the food basket of the nation. Stone-free, fresh harvest.',
        category:    'grains',
        price:       45000,
        unit:        'bag (50kg)',
        quantity:    100,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259237/rice_market_b9h7yn.jpg'],
        state:       'Ebonyi',
        isAvailable: true,
        isFeatured:  true,
        rating:      4.9,
        numReviews:  42,
        totalSold:   312,
      },
      {
        farmer:      farmers[1]._id,
        name:        'Cassava',
        description: 'Fresh cassava tubers from Ebonyi. Suitable for garri, fufu and starch production. Bulk orders welcome.',
        category:    'tubers',
        price:       8000,
        unit:        'bag',
        quantity:    80,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259295/cassava_dmqrlv.jpg'],
        state:       'Ebonyi',
        isAvailable: true,
        isFeatured:  false,
        rating:      4.7,
        numReviews:  15,
        totalSold:   189,
      },
      {
        farmer:      farmers[2]._id,
        name:        'Watermelon',
        description: 'Sweet, fresh watermelons from Kano. Large sizes available. Perfect for juice, events and retail.',
        category:    'fruits',
        price:       2800,
        unit:        'piece',
        quantity:    200,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259210/watermelon_xjvu63.jpg'],
        state:       'Kano',
        isAvailable: true,
        isFeatured:  true,
        rating:      4.9,
        numReviews:  56,
        totalSold:   421,
      },
      {
        farmer:      farmers[2]._id,
        name:        'Onions',
        description: 'Fresh onions from Kano — the onion capital of Nigeria. Red and white varieties available.',
        category:    'vegetables',
        price:       15000,
        unit:        'bag (50kg)',
        quantity:    60,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259203/onion_riarce.webp'],
        state:       'Kano',
        isAvailable: true,
        isFeatured:  false,
        rating:      4.7,
        numReviews:  31,
        totalSold:   278,
      },
      {
        farmer:      farmers[3]._id,
        name:        'Yam Tubers',
        description: 'Premium yam tubers from Oyo state. Large sizes, freshly harvested. Perfect for pounded yam and boiling.',
        category:    'tubers',
        price:       12000,
        unit:        'bag',
        quantity:    40,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259313/yam_lgz0pl.webp'],
        state:       'Oyo',
        isAvailable: true,
        isFeatured:  true,
        rating:      4.9,
        numReviews:  38,
        totalSold:   189,
      },
      {
        farmer:      farmers[3]._id,
        name:        'Sweet Plantain',
        description: 'Ripe and unripe plantains from Oyo. Available in bunches. Good for dodo, boli and chips.',
        category:    'fruits',
        price:       5500,
        unit:        'bunch',
        quantity:    75,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259220/plaintain_brrfqo.jpg'],
        state:       'Oyo',
        isAvailable: true,
        isFeatured:  true,
        rating:      4.8,
        numReviews:  29,
        totalSold:   278,
      },
      {
        farmer:      farmers[3]._id,
        name:        'Maize (Corn)',
        description: 'Fresh maize from Oyo state. Suitable for roasting, milling and animal feed. Bulk orders available.',
        category:    'grains',
        price:       18000,
        unit:        'bag (100kg)',
        quantity:    55,
        images:      ['https://res.cloudinary.com/doqniwpta/image/upload/v1774259287/maize_olr0lg.jpg'],
        state:       'Oyo',
        isAvailable: true,
        isFeatured:  false,
        rating:      4.6,
        numReviews:  12,
        totalSold:   98,
      },
    ])
    console.log(' Produce seeded')
    console.log('')
    console.log('Test farmer logins:')
    console.log('→ musa@ikore.ng / password123')
    console.log('→ emeka@ikore.ng / password123')
    console.log('→ aisha@ikore.ng / password123')
    console.log('→ biodun@ikore.ng / password123')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedDB()