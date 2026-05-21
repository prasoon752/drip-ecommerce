# 👗 Drip — Myntra-Style Fashion E-Commerce Website

A fully functional, responsive clothing e-commerce website built with **HTML, CSS & JavaScript** — inspired by Myntra. This is the frontend UI for a Full-Stack MERN E-Commerce project.

---

## 🚀 Live Features

- 🔍 **Search** — Real-time product search by brand or name
- 🗂️ **Category Navigation** — Filter by Men, Women, Ethnic, Streetwear, Sports, etc.
- 🏷️ **Filter & Sort** — New Arrivals, Sale, Top Rated + Sort by price/discount/rating
- 🛍️ **Add to Bag** — Select size and add products to cart
- 🛒 **Cart Drawer** — Slide-in cart with quantity control, remove items, price breakdown
- ❤️ **Wishlist** — Toggle wishlist on any product
- 🔐 **Auth Modal** — Login / Sign Up UI (connect to JWT backend)
- 💳 **Checkout** — Ready to connect with Razorpay / Stripe APIs
- 📱 **Responsive** — Works on mobile and desktop

---

## 🧱 Tech Stack (Full MERN Project)

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript (this repo) |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Auth | JWT (Token-based Authentication) |
| Payments | Razorpay API, Stripe API |
| Deployment | Cloud (Render / Vercel / Railway) |

---

## 📁 Project Structure

```
drip-ecommerce/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── products.js     # Product data
│   └── app.js          # App logic (cart, filters, auth)
└── README.md
```

---

## 🛠️ How to Run

1. Clone this repo:
   ```bash
   git clone https://github.com/yourusername/drip-ecommerce.git
   ```
2. Open `index.html` in your browser — no build step needed!

---

## 🔗 Backend Integration Points

- **Auth**: Connect `doLogin()` in `app.js` to your Express JWT endpoint
- **Products**: Replace `js/products.js` data with MongoDB API calls
- **Checkout**: Replace `proceedToCheckout()` with Razorpay/Stripe payment gateway

---

## 👨‍💻 About

Built by a CS student at **Galgotias University, Greater Noida** as part of a Full-Stack MERN E-Commerce project (May–July 2025), serving 200+ users.

**Skills used:** Node.js · Express.js · MongoDB · React.js · JavaScript · Razorpay API · Authentication & Authorization · REST APIs · Full-Stack Development
