<div align="center">

<br />

# 🚂 RailFood Trace

### End-to-end food traceability for Indian Railways — from kitchen to passenger.

<br />

[![Live Demo](https://img.shields.io/badge/Live-Demo-amber?style=for-the-badge)](http://localhost:5173)
[![API](https://img.shields.io/badge/API-Running-green?style=for-the-badge)](http://localhost:5000)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<br />

> **RailFood Trace** is a full-stack food safety and quality management platform designed for railway food vendors. Every food batch gets a unique QR code that passengers can scan to view ingredients, kitchen origin, expiry details — and instantly leave feedback.

<br />

</div>

---

## ✨ Features

### 🧑‍🍳 For Vendors
- **Batch Registration** — Create a food batch with name, category (veg / non-veg / egg), kitchen location, ingredients, preparation time, expiry time, and train number
- **QR Code Generation** — Each batch automatically generates a scannable QR code for passenger traceability
- **Vendor Dashboard** — At-a-glance view of all batches, active vs expired status, ratings, and passenger feedback
- **Copy & Share** — One-click copy of batch scan link after creation

### 👥 For Passengers
- **Scan & View** — Scan the QR on the food packaging to instantly view full batch details
- **Star Ratings** — Rate the food quality from 1–5 stars
- **Issue Reporting** — Report specific issues: Stale Food, Foreign Object, Unhygienic Packaging, Wrong Order, Temperature, or General concern
- **Anonymous Feedback** — Optionally include name and coach number, or submit fully anonymously

### 🔒 Platform
- **Secure Auth** — JWT-based authentication with httpOnly cookies (7-day sessions)
- **Role-based Access** — Vendor-only dashboard, public scan pages
- **Real-time Feedback Loop** — Vendors see passenger ratings and complaints on their dashboard instantly

---

## 📸 Screenshots

| Login | Dashboard |
|-------|-----------|
| Split-panel luxury dark UI | Stat cards, batch table, feedback panel |

| Create Batch | Scan Page |
|-------------|-----------|
| Sectioned form + live QR generation | Food details + inline star rating |

---

## 🗂️ Project Structure

```
RailFood-Trace/
├── backend/
│   ├── config/          # Database connection
│   ├── Middlewares/     # JWT auth middleware
│   ├── Models/          # Batch, Complaint, User schemas
│   ├── routes/          # Auth, Batch, Complaint API routes
│   └── server.js        # Express app entry point
│
└── frontend/
    └── src/
        ├── components/  # Navbar
        ├── pages/       # Login, Register, Dashboard,
        │                #   CreateBatch, ScanPage, Complaint
        ├── App.jsx      # Route definitions
        └── index.css    # Global styles & dark theme
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** and a **MongoDB** instance (local or Atlas) ready.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/railfood-trace.git
cd railfood-trace
```

### 2. Configure environment variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Start the backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at: `http://localhost:5000`

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Overview

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register a vendor |
| `POST` | `/api/auth/login` | Public | Login & receive JWT cookie |
| `POST` | `/api/auth/logout` | Public | Clear auth cookie |
| `GET` | `/api/auth/me` | Protected | Get logged-in user |
| `POST` | `/api/batch/create` | Protected | Create a food batch + QR |
| `GET` | `/api/batch/my` | Protected | Get vendor's own batches |
| `GET` | `/api/batch/:id` | Public | Get batch details (for scanning) |
| `POST` | `/api/complaint/create` | Public | Submit feedback/complaint |
| `GET` | `/api/complaint` | Protected | Get all feedback (vendor) |
| `GET` | `/api/complaint/batch/:id` | Public | Get feedback for a batch |

---

## 🎨 Design Philosophy

RailFood Trace uses a **luxury dark UI** theme built around:

- `zinc-950` deep backgrounds with a subtle dot-grid texture
- `amber-400` as the primary accent — evoking warmth, food, and trust
- `rounded-3xl` cards with `ring-1 ring-white/5` for depth
- Split-panel auth screens with feature highlight panels  
- Glassmorphism navbar with active route underline indicators
- Gradient buttons and colored stat card strips per metric

---

## 🛣️ Roadmap

- [ ] Admin panel with cross-vendor analytics
- [ ] Email/SMS notifications for low-rated batches
- [ ] Batch template system for recurring menu items
- [ ] Offline QR scanning support (PWA)
- [ ] Export reports as PDF / CSV

---

## 👨‍💻 Author

Built with ❤️ by **Logic Coders**  
_Batch S65-0126 · Full Stack Development_

---

<div align="center">

**RailFood Trace** — Making every railway meal accountable.

</div>
