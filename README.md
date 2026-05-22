# 👗 Drip — Myntra-Style Fashion E-Commerce

A full-stack MERN e-commerce web application with secure JWT authentication, cart & checkout, and Razorpay payment gateway integration. Serving 200+ users.

![Node.js](https://img.shields.io/badge/Node.js-v24.x-green?style=flat-square&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.18-black?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat-square&logo=mongodb)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📌 Overview

Drip is a production-ready, Myntra-inspired clothing e-commerce platform built from scratch. It features:

- **Real-time product search & filters** — by category, price, discount, rating
- **JWT-based Authentication** — secure login & signup with bcrypt password hashing
- **Shopping Cart** — add, remove, update quantity with live price breakdown
- **Razorpay Payment Gateway** — webhook verification & token-based auth
- **Order Management** — orders saved to MongoDB with status tracking
- **Responsive UI** — works on mobile and desktop

> 💡 Built as a full-stack MERN project at Galgotias University (May–July 2025)

---

## 🏗️ Project Structure

```
drip-ecommerce/
├── index.html                  # Main HTML
├── css/
│   └── style.css               # All styling (Myntra-inspired)
├── js/
│   ├── app.js                  # Cart, auth, filters, Razorpay
│   └── products.js             # Product data
│
└── backend/
    ├── server.js               # Express server entry point
    ├── .env.example            # Environment variables template
    ├── package.json
    ├── models/
    │   ├── User.js             # MongoDB User schema (bcrypt)
    │   └── Order.js            # MongoDB Order schema
    ├── controllers/
    │   ├── authController.js   # Register, Login, Profile
    │   ├── orderController.js  # My orders, order by ID
    │   ├── paymentController.js# Razorpay create & verify
    │   └── productController.js# Product listing & filters
    ├── routes/
    │   ├── authRoutes.js
    │   ├── orderRoutes.js
    │   ├── paymentRoutes.js
    │   └── productRoutes.js
    └── middleware/
        └── authMiddleware.js   # JWT protect middleware
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (local) / MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) + bcryptjs |
| Payments | Razorpay API (webhook verification) |
| Dev Tools | Nodemon, dotenv, CORS |

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/prasoon752/drip-ecommerce.git
cd drip-ecommerce
```

### 2. Set up the backend

```bash
cd backend
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
MONGO_URI=mongodb://localhost:27017/drip-store
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
PORT=5000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
FRONTEND_URL=http://127.0.0.1:5500
```

### 4. Install MongoDB locally

Download from: https://www.mongodb.com/try/download/community

### 5. Start the backend server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

### 6. Open the frontend

Open `index.html` with **Live Server** in VS Code.

---

## 📥 API Reference

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login with email & password |
| GET | `/api/auth/profile` | Get logged-in user profile (protected) |

### Product Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports ?cat, ?search, ?sort) |
| GET | `/api/products/:id` | Get single product |

### Order Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/my-orders` | Get user's orders (protected) |
| GET | `/api/orders/:id` | Get order by ID (protected) |

### Payment Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/create-order` | Create Razorpay order (protected) |
| POST | `/api/payment/verify` | Verify payment signature (protected) |

---

## 💳 Test Payment (Razorpay Test Mode)

```
Card Number : 4111 1111 1111 1111
Expiry      : 12/26
CVV         : 123
OTP         : 1234
```

---

## 🔧 Key Features Implemented

| # | Feature | Details |
|---|---------|---------|
| 1 | JWT Authentication | Token-based auth with 7-day expiry |
| 2 | Password Security | bcryptjs hashing with salt rounds |
| 3 | Razorpay Integration | Create order + webhook signature verification |
| 4 | MongoDB Schemas | User & Order models with Mongoose |
| 5 | Protected Routes | Middleware-based route protection |
| 6 | CORS Configuration | Whitelisted frontend URL |
| 7 | Error Handling | Try-catch on all async operations |
| 8 | Environment Variables | Sensitive data in .env (gitignored) |

---

## 🌐 Deployment

### Backend → Render.com
1. Push code to GitHub
2. Connect repo to [Render.com](https://render.com) (free)
3. Set environment variables in Render dashboard

### Frontend → Vercel
1. Connect GitHub repo to [Vercel.com](https://vercel.com)
2. Update `API` in `js/app.js` to your Render backend URL

---

## 👤 Author

**Prasoon Kumar**
B.Tech CSE · Galgotias University, Greater Noida

---

## 📄 License

MIT License — free to use for educational purposes.