import { Router } from 'express'
import db, { nextId } from '../config/db.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.post('/', authMiddleware, (req, res) => {
  const { destination_id, check_in, check_out, travelers } = req.body
  if (!destination_id || !check_in || !check_out || !travelers)
    return res.status(400).json({ error: 'All fields required' })

  const dest = db.data.destinations.find(d => d.id === +destination_id)
  if (!dest) return res.status(404).json({ error: 'Destination not found' })

  const nights = Math.max(1, Math.ceil((new Date(check_out) - new Date(check_in)) / 86400000))
  const total_price = +((dest.price / dest.nights) * nights * travelers).toFixed(2)

  const booking = {
    id: nextId('bookings'),
    user_id: req.user.id,
    destination_id: +destination_id,
    check_in, check_out,
    travelers: +travelers,
    total_price,
    status: 'confirmed',
    created_at: new Date().toISOString()
  }
  db.data.bookings.push(booking)
  db.write()
  res.json(booking)
})


router.get('/my', authMiddleware, (req, res) => {
  const bookings = db.data.bookings
    .filter(b => b.user_id === req.user.id)
    .map(b => {
      const dest = db.data.destinations.find(d => d.id === b.destination_id)
      return { ...b, destination_name: dest?.name, country: dest?.country, emoji: dest?.emoji, gradient: dest?.gradient }
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  res.json(bookings)
})


router.patch('/:id/cancel', authMiddleware, (req, res) => {
  const booking = db.data.bookings.find(b => b.id === +req.params.id && b.user_id === req.user.id)
  if (!booking) return res.status(404).json({ error: 'Booking not found' })

  booking.status = 'cancelled'
  db.write()
  res.json(booking)
})

export default router