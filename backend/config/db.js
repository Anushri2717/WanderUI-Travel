import { Low } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, '..', 'db.json')


const adapter = new JSONFileSync(file)
const db = new Low(adapter, {
  users: [],
  destinations: [],
  bookings: [],
  reviews: [],
  _nextId: { users: 1, destinations: 1, bookings: 1, reviews: 1 }
})


db.read()


db.data.users        ??= []
db.data.destinations ??= []
db.data.bookings     ??= []
db.data.reviews      ??= []
db.data._nextId      ??= { users: 1, destinations: 1, bookings: 1, reviews: 1 }


if (db.data.destinations.length === 0) {
  db.data.destinations = [
    { id: 1, name: 'Maldives',   country: 'Maldives',    label: 'Island Paradise', description: 'Crystal clear waters, overwater bungalows, and breathtaking sunsets. A once-in-a-lifetime destination.', price: 85000,  rating: 4.9, emoji: '🏝', gradient: 'linear-gradient(135deg,#0d3d2e,#1a6a5a)', nights: 7, is_trending: true,  is_hot_deal: false },
    { id: 2, name: 'Swiss Alps', country: 'Switzerland', label: 'Mountains',       description: 'Snow-capped peaks, charming villages, and world-class skiing. A dream for adventure seekers.',           price: 120000, rating: 4.8, emoji: '🏔', gradient: 'linear-gradient(135deg,#3a2010,#8b4513)', nights: 5, is_trending: false, is_hot_deal: false },
    { id: 3, name: 'Kyoto',      country: 'Japan',       label: 'Culture',         description: 'Ancient temples, cherry blossoms, and zen gardens. Kyoto offers an unparalleled cultural experience.',     price: 65000,  rating: 4.9, emoji: '🏯', gradient: 'linear-gradient(135deg,#1a1a3a,#2a2a7a)', nights: 6, is_trending: false, is_hot_deal: true  },
    { id: 4, name: 'Bali',       country: 'Indonesia',   label: 'Beach',           description: 'Lush rice terraces, vibrant temples, and pristine beaches. Bali is the island of the gods.',               price: 45000,  rating: 4.7, emoji: '🌴', gradient: 'linear-gradient(135deg,#3a1a10,#a04520)', nights: 8, is_trending: false, is_hot_deal: true  },
    { id: 5, name: 'Paris',      country: 'France',      label: 'City',            description: 'The city of love, art, and fashion. From the Eiffel Tower to world-class cuisine, Paris enchants all.',    price: 95000,  rating: 4.8, emoji: '🗼', gradient: 'linear-gradient(135deg,#0a2020,#1a5050)', nights: 5, is_trending: false, is_hot_deal: false },
    { id: 6, name: 'Santorini',  country: 'Greece',      label: 'Island',          description: 'Iconic white-washed buildings, volcanic beaches, and the most beautiful sunsets in the world.',            price: 75000,  rating: 4.9, emoji: '🌅', gradient: 'linear-gradient(135deg,#1a0a2a,#5a2a8a)', nights: 5, is_trending: true,  is_hot_deal: false },
  ]
  db.data._nextId.destinations = 7
  db.write()
  console.log(' Seeded 6 destinations into db.json')
}

db.write()
console.log(' lowdb JSON database ready → db.json')


export function nextId(table) {
  const id = db.data._nextId[table]
  db.data._nextId[table]++
  db.write()
  return id
}

export default db