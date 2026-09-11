# ShopPromote

Full-stack React + Express + MongoDB marketplace connecting local shops with influencers.

## Stack
- React + Vite + React Router + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt authentication
- Responsive mobile-first UI

## Included
- Owner/influencer registration and login
- Shop profiles and discovery
- Influencer profiles and discovery
- Promotion booking workflow
- Owner/influencer dashboards
- Reviews API
- Basic analytics-ready data model
- Seed/demo data
- Responsive navigation and cards

## Run locally

Prerequisites: Node.js 20+, MongoDB 7+ or MongoDB Atlas.

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```
API: http://localhost:5000

### Frontend
In another terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Web app: http://localhost:5173

Demo:
- owner@example.com / Password123!
- influencer@example.com / Password123!
- admin@example.com / Password123!

For production, use MongoDB Atlas, HTTPS, managed hosting, and object storage (Cloudinary/S3) for images. Add a real payment provider, notifications, moderation, dispute handling, rate limiting and audit logs before taking real money.
