# 🚀 DRIP — Complete Setup Guide (Zero to Running)

Follow these steps ONE BY ONE. Takes about 20 minutes total.

---

## STEP 1 — Install Node.js

1. Go to: https://nodejs.org
2. Click **"LTS"** (green button) and download
3. Install it (just click Next → Next → Finish)
4. Verify: Open **Command Prompt** and type:
   ```
   node -v
   npm -v
   ```
   You should see version numbers like `v20.x.x`

---

## STEP 2 — Set Up MongoDB Atlas (Free Database)

1. Go to: https://cloud.mongodb.com
2. Click **"Try Free"** → Sign up with Google or email
3. Choose **FREE tier (M0)**
4. Select region: **Mumbai (ap-south-1)** (closest to India)
5. Click **Create Cluster** (takes 2-3 minutes)
6. Then go to **Database Access** → Add New User:
   - Username: `dripuser`
   - Password: `drip1234` (save this!)
   - Role: **Read and Write**
7. Go to **Network Access** → Add IP Address → **Allow Access from Anywhere**
8. Go to **Database** → Click **Connect** → **Connect your application**
9. Copy the connection string — looks like:
   ```
   mongodb+srv://dripuser:drip1234@cluster0.xxxxx.mongodb.net/
   ```

---

## STEP 3 — Set Up Razorpay (Free Test Account)

1. Go to: https://razorpay.com
2. Sign up for free
3. Go to **Settings** → **API Keys** → **Generate Test Keys**
4. Copy your **Key ID** and **Key Secret**

---

## STEP 4 — Set Up the Backend

1. Open **Command Prompt** or **VS Code Terminal**
2. Navigate to the `drip-backend` folder:
   ```bash
   cd path/to/drip-backend
   ```
3. Install all packages:
   ```bash
   npm install
   ```
4. Create your `.env` file:
   - Copy `.env.example` → rename it to `.env`
   - Fill in your values:
   ```
   MONGO_URI=mongodb+srv://dripuser:drip1234@cluster0.xxxxx.mongodb.net/drip-store?retryWrites=true&w=majority
   JWT_SECRET=mydripsecretkey2025superlong
   JWT_EXPIRE=7d
   PORT=5000
   RAZORPAY_KEY_ID=rzp_test_XXXXXXXX
   RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXX
   FRONTEND_URL=http://127.0.0.1:5500
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```
6. You should see:
   ```
   ✅ MongoDB Connected
   🚀 Server running on http://localhost:5000
   ```

---

## STEP 5 — Connect Frontend to Backend

1. Open your `drip-ecommerce` folder
2. Replace `js/app.js` with the `frontend-app.js` file from drip-backend folder
3. Open `index.html` and add this line before `</head>`:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```

---

## STEP 6 — Run the Frontend

1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. It opens at `http://127.0.0.1:5500`

---

## ✅ Everything Should Now Work:

| Feature | Status |
|---------|--------|
| Browse products | ✅ Live from backend |
| Search & filter | ✅ Working |
| Create Account | ✅ Saved in MongoDB |
| Login | ✅ JWT token auth |
| Add to cart | ✅ Working |
| Place Order | ✅ Razorpay popup |
| Payment | ✅ Test mode (use card: 4111 1111 1111 1111) |
| Order saved | ✅ Stored in MongoDB |

---

## 🧪 Test Payment Card (Razorpay Test Mode)

```
Card Number : 4111 1111 1111 1111
Expiry      : Any future date (e.g. 12/26)
CVV         : Any 3 digits (e.g. 123)
OTP         : 1234
```

---

## 📁 Final Folder Structure

```
drip-project/
├── drip-ecommerce/        ← Frontend
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── products.js
│       └── app.js         ← Replace with frontend-app.js
│
└── drip-backend/          ← Backend
    ├── server.js
    ├── .env               ← Your secret keys
    ├── models/
    │   ├── User.js
    │   └── Order.js
    ├── controllers/
    │   ├── authController.js
    │   ├── orderController.js
    │   ├── paymentController.js
    │   └── productController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── orderRoutes.js
    │   ├── paymentRoutes.js
    │   └── productRoutes.js
    └── middleware/
        └── authMiddleware.js
```

---

## ❓ Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `MongoDB connection error` | Check your MONGO_URI in .env |
| `npm not found` | Reinstall Node.js |
| `Cannot find module` | Run `npm install` again |
| `CORS error` | Make sure FRONTEND_URL in .env matches your Live Server URL |
| `Razorpay not defined` | Add the Razorpay script tag in index.html |

---

## 🌐 Deploy Online (Optional - After It Works Locally)

- **Backend** → Deploy on [Render.com](https://render.com) (free)
- **Frontend** → Deploy on [Vercel.com](https://vercel.com) (free)
- Update `FRONTEND_URL` in .env to your Vercel URL
- Update `API` in frontend-app.js to your Render URL
