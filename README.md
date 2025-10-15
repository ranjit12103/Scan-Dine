🍽️ Scan & Dine — Restaurant Menu Management with QR Code System

A QR-based digital restaurant management platform built with the MERN stack —
modernizing menu handling, improving hygiene, and offering a seamless, contactless dining experience.

Final-Year Project – Dr. J. J. Magdum College of Engineering, Jaysingpur (2024 – 2025)

🧭 Overview

Scan & Dine replaces traditional printed menus with an interactive digital system.
Customers simply scan a QR code placed on their table to access the restaurant’s live menu instantly.
Restaurant owners can add, edit, or delete menu items, manage tables, and reward loyal customers through a central admin dashboard.

The system ensures:

A contactless, hygienic, and cost-effective dining process.

Real-time menu updates and multi-restaurant management.

A responsive UI built for both mobile and desktop users.

⚙️ Tech Stack
Layer	Technology
Frontend	React .js + Tailwind CSS
Backend	Node .js + Express .js
Database	MongoDB Atlas
Authentication	JWT (JSON Web Token)
QR Generation	qrcode / react-qr-code libraries
Hosting	Render / Vercel / MongoDB Atlas
Version Control	Git + GitHub
🧩 System Architecture
Admin → Creates & Manages Restaurant Accounts
      ↓
Restaurant Owner Dashboard → Tables | Menu | Customers | Discounts
      ↓
Database (MongoDB)
      ↓
QR Generator Module → Unique Table QR Codes
      ↓
Customer → Scans QR → Access Digital Menu

💡 Key Features
👨‍🍳 Admin & Restaurant Panel

Secure Login / Signup with JWT

Add / Edit / Delete Menu Items with Images

Categorize Menus (Starters, Main Course, Desserts, etc.)

Manage Tables and Generate Unique QR Codes

Configure Loyalty Rewards and Visit-Based Discounts

Publish Real-Time Menu Updates

📱 Customer Side

Scan QR Code to View Digital Menu (no app required)

Browse Items by Category (Veg/Non-Veg Filters)

View Images, Descriptions, and Prices Instantly

Responsive Interface for Mobile and Desktop

🧠 Smart Insights (Future Scope)

AI-based menu recommendations and sales analytics

Multi-branch reporting dashboard

Digital order and payment integration

🏗️ Project Structure
Scan-Dine/
├── client/                 # Frontend (React)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       │   ├── admin/
│       │   ├── auth/
│       │   └── customer/
│       ├── hooks/
│       ├── utils/
│       └── App.jsx
│
├── server/                 # Backend (Node + Express)
│   ├── config/             # DB Connection, JWT Config
│   ├── controllers/        # Business Logic
│   ├── models/             # MongoDB Schemas
│   ├── routes/             # API Routes
│   ├── middleware/         # Auth Middleware
│   ├── utils/              # QR Code Generation
│   └── server.js
│
├── .env.example            # Environment Variables Template
├── .gitignore
├── package.json
└── README.md
.
🚀 Getting Started
Prerequisites

Node.js (v18+)

npm / yarn

MongoDB Atlas URI

Installation
# Clone repo
git clone https://github.com/ranjit12103/Scan-Dine.git
cd Scan-Dine

# Setup backend
cd server
npm install

# Setup frontend
cd ../client
npm install

Environment Variables (.env)
PORT=5000
DB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
COMPANY_NAME=ScanandDine
CONTACT_NO=7507559790
ADMIN_EMAIL=ranjitppatil10@gmail.com
ADMIN_PASSWORD=<secure_hash>

Run Locally
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start


Access at: http://localhost:3000

🧠 Methodology Summary

Requirement Gathering – Surveys & feature prioritization

System Design – MERN stack architecture + responsive UI

Development – Modular frontend/backend integration

Testing – Unit, integration, load & UAT across devices

Deployment – Cloud-hosted (MongoDB Atlas + Render/Vercel)

Feedback – Usability testing with restaurant owners

🧾 Testing Highlights
Test Case	Module	Expected Result
Admin Login (Valid)	Auth	Dashboard opens successfully
Add Restaurant	Admin	Record saved to DB
Generate QR	Owner	Unique QR image created
Scan QR	Customer	Menu loads in 2 seconds
Loyalty Check	Owner	Discount applied on 3rd visit

Load testing confirmed stability for 100+ concurrent users.

📊 Results / Screens

Splash Screen & Home Page

Admin Dashboard → Manage Restaurants

Restaurant Owner Dashboard → Menu & Table Management

Customer Digital Menu → Category Filters & Images


🔮 Future Enhancements

Real-time order tracking & payment integration

Customer feedback & AI-based recommendations

Multi-branch analytics dashboard

Reservation & notification systems

Progressive Web App (PWA) support


📚 References

Archana Nikose et al., Cafeteria Food Ordering System Using QR Code (2023)

Kartik Patil & N. V. Karekar, Restaurant Automation System Using QR Codes (2019)

Vindya Liyanage et al., Foody – Smart Restaurant Management System (IEEE, 2019)

Kamlesh Bari et al., Restaurant Management System (2024, IJRPRR)


🏁 Project Status: Completed (2025)

Scan & Dine – Digital Dining Made Smart 💡
