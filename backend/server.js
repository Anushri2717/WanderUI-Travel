import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


import './config/db.js'

import authRoutes         from './routes/auth.js'
import destinationRoutes  from './routes/destinations.js'
import bookingRoutes      from './routes/bookings.js'
import reviewRoutes       from './routes/reviews.js'

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth',         authRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/bookings',     bookingRoutes)
app.use('/api/reviews',      reviewRoutes)

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', db: 'lowdb JSON ✅', auth: 'JWT local ✅' })
)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀  Wandr API     →  http://localhost:${PORT}`)
  console.log(`📦  Database      →  db.json  (auto-created, no install needed)`)
  console.log(`🔑  Auth          →  Local JWT  (no Google, no cloud)\n`)
})