import { Router } from 'express'
import db, { nextId } from '../config/db.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()


router.post('/', authMiddleware, (req, res) => {
  const { destination_id, rating, comment } = req.body
  if (!destination_id || !rating)
    return res.status(400).json({ error: 'destination_id and rating are required' })

  const review = {
    id: nextId('reviews'),
    user_id: req.user.id,
    destination_id: +destination_id,
    rating: +rating,
    comment: comment || '',
    created_at: new Date().toISOString()
  }
  db.data.reviews.push(review)


  const destReviews = db.data.reviews.filter(r => r.destination_id === +destination_id)
  const avg = destReviews.reduce((sum, r) => sum + r.rating, 0) / destReviews.length
  const dest = db.data.destinations.find(d => d.id === +destination_id)
  if (dest) dest.rating = +avg.toFixed(1)

  db.write()
  res.json(review)
})

export default router