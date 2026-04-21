<div align="center">

<img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80" alt="Wedding Gallery System Banner" width="100%" style="border-radius: 12px;" />

<br/>
<br/>

# 💍 Wedding Gallery System

**A secure, elegant platform for photographers to deliver wedding memories.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://mongodb.com)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Hosting-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

[🚀 Live Demo](#) · [🐛 Report a Bug](https://github.com/Elysekejoo/Wedding_Gallery_System/issues) · [✨ Request a Feature](https://github.com/Elysekejoo/Wedding_Gallery_System/issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🎯 About the Project

**Wedding Gallery System** is a full-stack web application that streamlines how photographers deliver wedding photos to their clients. Instead of sharing large files over email or generic cloud drives, photographers can create organized, beautiful galleries and share them securely using a unique access code — keeping every couple's memories private and accessible in one place.

> Built with Rwandan wedding traditions in mind — supporting categories like **Gusaba**, **Church Ceremony**, **Reception**, and **Photoshoot**.

---

## ✨ Features

### 📸 Photographer (Admin) Dashboard
| Feature | Description |
|---|---|
| 🔐 Auth | Secure register & login with JWT |
| 🖼️ Gallery Management | Create, update, and delete wedding galleries |
| 🔑 Access Codes | Generate unique codes per client |
| ☁️ Photo Uploads | Upload photos directly to Cloudinary |
| 📂 Category Organizer | Sort photos by ceremony type |
| 🗑️ Photo Management | Remove individual or bulk images |

### 👰 Client Portal
| Feature | Description |
|---|---|
| 🔓 Access Code Entry | Secure, code-based gallery access (no account needed) |
| 🖼️ Gallery Viewer | Beautiful, responsive image browsing |
| 📁 Category Filtering | Browse photos by Gusaba, Church, Reception, Photoshoot |
| ⬇️ Download | Save individual photos to device |

---

## 🛠 Tech Stack

**Frontend**
- ⚡ [React](https://reactjs.org) + [Vite](https://vitejs.dev) — fast, modern UI
- 🎨 [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- 🔀 [React Router](https://reactrouter.com) — client-side routing
- 📡 [Axios](https://axios-http.com) — HTTP client

**Backend**
- 🟢 [Node.js](https://nodejs.org) + [Express.js](https://expressjs.com) — REST API
- 🍃 [MongoDB](https://mongodb.com) + [Mongoose](https://mongoosejs.com) — database & ODM
- 🔒 [JWT](https://jwt.io) — authentication & authorization
- 📦 [Multer](https://github.com/expressjs/multer) — file upload handling

**Infrastructure & Tools**
- ☁️ [Cloudinary](https://cloudinary.com) — image storage & CDN
- 🔐 [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — password hashing
- 🌍 [dotenv](https://github.com/motdotla/dotenv) — environment config

---

## 📁 Project Structure

```
Wedding_Gallery_System/
├── backend/
│   ├── controllers/        # Route handler logic
│   ├── middleware/         # Auth & error middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── utils/              # Helpers (cloudinary config, etc.)
│   ├── .env                # Environment variables (not committed)
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level page components
│   │   ├── context/        # React context (auth state)
│   │   ├── services/       # Axios API calls
│   │   └── App.jsx         # Root component
│   ├── .env                # Frontend env variables (not committed)
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org) `v18+`
- [npm](https://www.npmjs.com) `v9+`
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **or** a [MongoDB Atlas](https://cloud.mongodb.com) URI
- A [Cloudinary](https://cloudinary.com) account (free tier works)

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Elysekejoo/Wedding_Gallery_System.git
cd Wedding_Gallery_System
```

**2. Set up the Backend**

```bash
cd backend
npm install
```

**3. Set up the Frontend**

```bash
cd ../frontend
npm install
```

---

### Environment Variables

#### Backend — `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wedding-gallery

JWT_SECRET=your_own_strong_secret_key_here

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Never commit `.env` files.** They are already excluded in `.gitignore`. Always use your **own Cloudinary credentials** — never share or publish them publicly.

---

**4. Start the Backend**

```bash
cd backend
npm run dev
```

> Server runs at: `http://localhost:5000`

**5. Start the Frontend**

```bash
cd frontend
npm run dev
```

> App runs at: `http://localhost:5173`

---

## 💡 Usage

### As a Photographer (Admin)

1. Go to `http://localhost:5173`
2. **Register** for an admin account
3. **Log in** to access the dashboard
4. **Create a gallery** for the wedding couple
5. **Upload photos** and assign them to categories (Gusaba, Church, Reception, Photoshoot)
6. **Copy the unique access code** and share it with your clients

### As a Client

1. Go to `http://localhost:5173`
2. **Enter the access code** provided by your photographer
3. **Browse** your wedding gallery by category
4. **Download** your favorite photos

---

## 📡 API Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register photographer | ❌ |
| `POST` | `/api/auth/login` | Login photographer | ❌ |
| `GET` | `/api/galleries` | Get all galleries | ✅ JWT |
| `POST` | `/api/galleries` | Create gallery | ✅ JWT |
| `DELETE` | `/api/galleries/:id` | Delete gallery | ✅ JWT |
| `POST` | `/api/photos/upload` | Upload photo | ✅ JWT |
| `DELETE` | `/api/photos/:id` | Delete photo | ✅ JWT |
| `POST` | `/api/client/access` | Client access via code | ❌ |

---

## 🗺 Roadmap

- [x] Photographer authentication (JWT)
- [x] Create & manage galleries
- [x] Generate unique client access codes
- [x] Upload photos to Cloudinary
- [x] Category-based photo organization
- [x] Client gallery viewing & download
- [ ] 📦 Bulk download as ZIP
- [ ] ⏳ Gallery expiration / auto-disable codes
- [ ] 🔖 Watermark protection on images
- [ ] 🔍 Search & filter photos
- [ ] 💌 Email delivery of access codes
- [ ] 📊 Photographer analytics dashboard
- [ ] 🌐 Deployment (Vercel + Render/Railway)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org) format for commit messages.

---

## 👤 Author

**ISHIMWE NSHUTI ELYSE**

- GitHub: [@Elysekejoo](https://github.com/Elysekejoo)

If this project helped you or you find it interesting, please consider giving it a ⭐ — it helps others discover the project and keeps me motivated to build more!

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and distribute it.

---

<div align="center">

Made in Rovynex solution LTD  

</div>
