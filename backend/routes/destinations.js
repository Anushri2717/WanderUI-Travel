import { Router } from 'express'
import db from '../config/db.js'

const router = Router()


router.get('/', (req, res) => {
  const { search, trending, hot_deal } = req.query
  let results = db.data.destinations

  if (search) {
    const q = search.toLowerCase()
    results = results.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.label.toLowerCase().includes(q)
    )
  }
  if (trending === 'true')  results = results.filter(d => d.is_trending)
  if (hot_deal === 'true')  results = results.filter(d => d.is_hot_deal)

  results = [...results].sort((a, b) => b.rating - a.rating)
  res.json(results)
})


router.get('/:id', (req, res) => {
  const dest = db.data.destinations.find(d => d.id === +req.params.id)
  if (!dest) return res.status(404).json({ error: 'Destination not found' })

  const reviews = db.data.reviews
    .filter(r => r.destination_id === dest.id)
    .map(r => {
      const user = db.data.users.find(u => u.id === r.user_id)
      return { ...r, user_name: user?.name || 'Anonymous' }
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  res.json({ ...dest, reviews })
})

export default router