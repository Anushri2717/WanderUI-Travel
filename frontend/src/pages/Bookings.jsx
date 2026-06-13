import { useEffect, useState,React } from 'react';
import { bookingsAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Bookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    bookingsAPI.getMy().then(res => { setBookings(res.data); setLoading(false); });
  }, [user]);

  const cancel = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    await bookingsAPI.cancel(id);
    setBookings(b => b.map(bk => bk.id === id ? { ...bk, status: 'cancelled' } : bk));
  };

  const statusColor = (s) => ({ pending: '#d4a853', confirmed: '#2a7d6f', cancelled: '#c96a3a' }[s] || '#888');

  return (
    <>
      <div style={{ paddingTop: '8rem', padding: '8rem 4rem 5rem', minHeight: '100vh' }}>
        <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#d4a853', marginBottom: '.5rem' }}>✦ My Trips</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '2.5rem', lineHeight: 1.1 }}>Your <em style={{ fontStyle: 'italic', color: '#c96a3a' }}>Bookings</em></h1>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
            <div style={{ width: 50, height: 50, border: '2px solid rgba(201,106,58,.3)', borderTop: '2px solid #c96a3a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'rgba(245,239,230,.4)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✈️</div>
            <p style={{ fontSize: '1.2rem' }}>No bookings yet. Start exploring!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bookings.map(b => (
              <div key={b.id} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 18, padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '2rem', transition: 'border-color .3s' }}>
                <div style={{ width: 70, height: 70, borderRadius: 16, background: b.gradient || 'linear-gradient(135deg,#1a3a2e,#2a6a5a)', display: 'grid', placeItems: 'center', fontSize: '2.5rem', flexShrink: 0 }}>{b.emoji}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', marginBottom: '.3rem' }}>{b.destination_name}</h3>
                  <p style={{ color: 'rgba(245,239,230,.5)', fontSize: '.85rem' }}>{b.country} · {new Date(b.check_in).toLocaleDateString()} → {new Date(b.check_out).toLocaleDateString()} · {b.travelers} traveler{b.travelers > 1 ? 's' : ''}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#d4a853', fontWeight: 600, fontSize: '1.1rem', marginBottom: '.3rem' }}>₹{Number(b.total_price).toLocaleString()}</div>
                  <div style={{ display: 'inline-block', background: `${statusColor(b.status)}22`, color: statusColor(b.status), border: `1px solid ${statusColor(b.status)}55`, borderRadius: 100, padding: '.2rem .8rem', fontSize: '.75rem', textTransform: 'capitalize', marginBottom: '.8rem' }}>{b.status}</div>
                  {b.status !== 'cancelled' && <div><button onClick={() => cancel(b.id)} style={{ background: 'transparent', border: '1px solid rgba(201,106,58,.3)', color: 'rgba(201,106,58,.8)', padding: '.4rem 1rem', borderRadius: 100, fontSize: '.8rem', transition: 'all .3s' }}>Cancel</button></div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}