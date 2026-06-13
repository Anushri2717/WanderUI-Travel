import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db, { nextId } from '../config/db.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required' })

  const exists = db.data.users.find(u => u.email === email)
  if (exists) return res.status(400).json({ error: 'Email already registered' })

  const hash = await bcrypt.hash(password, 10)
  const user = {
    id: nextId('users'),
    name, email,
    password: hash,
    role: 'user',
    created_at: new Date().toISOString()
  }
  db.data.users.push(user)
  db.write()

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, name, email } })
})


router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' })

  const user = db.data.users.find(u => u.email === email)
  if (!user) return res.status(400).json({ error: 'Invalid email or password' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ error: 'Invalid email or password' })

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
})


router.get('/me', authMiddleware, (req, res) => {
  const user = db.data.users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role })
})

export default router