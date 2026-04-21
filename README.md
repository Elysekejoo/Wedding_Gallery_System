# Wedding Gallery System

## Overview

Wedding Gallery System is a full-stack web application designed to simplify how photographers deliver wedding photos to their clients.  
It allows photographers to upload and organize images into galleries and provide clients with a secure access code to view and download their photos.

---

## Preview

![Wedding Camera](https://images.unsplash.com/photo-1519741497674-611481863552)
![Photo Gallery](https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)

---

## Features

### Photographer (Admin)
- Register and login
- Create wedding galleries
- Generate unique access codes
- Upload and manage photos
- Organize photos into categories:
  - Gusaba
  - Church Ceremony
  - Reception
  - Photoshoot

### Client
- Enter access code
- View gallery
- Browse photos by category
- Download images

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Other Tools
- Cloudinary (image hosting)
- JWT Authentication

---

## Project Structure


backend/
frontend/


---

## Getting Started

Follow these steps carefully to run the project locally.

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/wedding-gallery-system.git
cd wedding-gallery-system


2. Setup Backend
cd backend
npm install
Create .env file in backend folder

Create a file named .env and add:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/wedding-gallery
JWT_SECRET=mySuperSecretKey123!@#2024WeddingGallery

CLOUDINARY_CLOUD_NAME=dfkpd0ft7
CLOUDINARY_API_KEY=551847547182297
CLOUDINARY_API_SECRET=CPxqWkuGSsF7BO3_UN78Hd3cqQM
Start Backend Server
npm run dev
3. Setup Frontend
cd ../frontend
npm install
Create .env file in frontend folder
VITE_API_URL=http://localhost:5000/api
Start Frontend
npm run dev
4. Access Application

Open your browser and go to:

http://localhost:5173
Important Notes
Ensure MongoDB is running locally
Ensure internet connection for Cloudinary uploads
Do not expose your .env file publicly
Replace Cloudinary credentials with your own for production
How to Get Cloudinary API Keys
Create an account at Cloudinary
Go to Dashboard
Copy:
Cloud Name
API Key
API Secret
Paste them into your backend .env file
Future Improvements
Bulk download (ZIP)
Gallery expiration
Watermark images
Search and filter
License

This project is open-source and available under the MIT License.

Author

Developed by ISHIMWE NSHUTI ELYSE


---

If you want, I can also upgrade this README with:

- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}
- :contentReference[oaicite:2]{index=2}

Just tell me.
