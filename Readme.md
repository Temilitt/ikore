# Ikore — Nigeria's Farm-to-Table Marketplace

A full-stack agricultural marketplace connecting Nigerian farmers directly with buyers. No middlemen. Fair prices. Fresh produce.

## Live Demo
- Frontend: https://ikoreapp.vercel.app
- Backend API: https://ikore-api.onrender.com

## The Problem We Solve
Nigeria loses over 40% of its food to post-harvest waste annually. Farmers sell to middlemen at exploitative prices while buyers overpay for produce. Ikore eliminates the middleman entirely.

## Features

**For Farmers**
- Create a verified farm profile
- List produce with photos, price and quantity
- Receive and manage orders directly
- Get paid instantly via Paystack
- Track earnings on farmer dashboard

**For Buyers**
- Browse fresh produce from verified Nigerian farms
- Filter by category, state and price
- Order directly at farm prices
- Pay securely via Paystack
- Track order status in real time

**For Admin**
- Full dashboard with analytics
- Manage all users, produce and orders
- Verify farmer profiles
- Update order statuses

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- Paystack Inline JS

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer
- Paystack API

## Getting Started

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd Farm
npm install
npm run dev
```

### Environment Variables

**server/.env**
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
PAYSTACK_SECRET_KEY=your_paystack_secret
```

**Farm/.env.local**
```
VITE_API_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

## API Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/auth/users (admin)
PUT    /api/auth/verify/:id (admin)

GET    /api/produce
GET    /api/produce/featured
GET    /api/produce/my
GET    /api/produce/:id
POST   /api/produce (farmer)
PUT    /api/produce/:id (farmer)
DELETE /api/produce/:id (farmer)

GET    /api/orders (admin)
GET    /api/orders/my (buyer)
GET    /api/orders/farmer (farmer)
POST   /api/orders
PUT    /api/orders/:id
```

## Test Accounts
```
Farmer: musa@ikore.ng / password123
Farmer: emeka@ikore.ng / password123
Buyer:  register a new account
Admin:  aderounmutemiloluwa2004@gmail.com / Temi@2024
```

## Test Payment
Use Paystack test card:
```
Card: 4084 0840 8408 4081
Expiry: any future date
CVV: 408
OTP: 123456
```

## Built By
Temiloluwa Aderounmu
- GitHub: https://github.com/Temilitt
- LinkedIn: Temiloluwa Adeboye
- X: @justtemilit
- Email: aderounmutemiloluwa2004@gmail.com