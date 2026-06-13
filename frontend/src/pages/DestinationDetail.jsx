import { useEffect, useState,React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinationsAPI, bookingsAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function DestinationDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dest, setDest] = useState(null);
  const [booking, setBooking] = useState({ check_in: '', check_out: '', travelers: 1 });
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    destinationsAPI.getById(id).then(res => { setDest(res.data); setLoading(false); });
  }, [id]);

  const handleBook = async () => {
    if (!user) return navigate('/login');
    try {
      await bookingsAPI.create({ destination_id: id, ...booking });
      setBooked(true);
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><div style={{ width: 50, height: 50, border: '2px solid rgba(201,106,58,.3)', borderTop: '2px solid #c96a3a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <>
      <div style={{ paddingTop: '6rem', minHeight: '100vh' }}>
        
        <div style={{ height: '50vh', position: 'relative', overflow: 'hidden', background: dest.gradient }}>
          <div style={{ position: 'absolute', fontSize: '20rem', opacity: .15, bottom: '-4rem', right: '-4rem', filter: 'blur(5px)' }}>{dest.emoji}</div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent,rgba(26,18,8,.8))' }} />
          <div style={{ position: 'absolute', bottom: '3rem', left: '4rem' }}>
            <div style={{ fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(245,239,230,.6)', marginBottom: '.5rem' }}>{dest.label} · {dest.country}</div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(3rem,6vw,5rem)', lineHeight: 1.1 }}>{dest.name}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '.8rem', color: 'rgba(245,239,230,.7)', fontSize: '.9rem' }}>
              <span>★ {dest.rating}</span>
              <span>{dest.nights} nights</span>
              <span>From ₹{Number(dest.price).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', padding: '3rem 4rem' }}>
          
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', marginBottom: '1rem' }}>About {dest.name}</h2>
            <p style={{ color: 'rgba(245,239,230,.6)', lineHeight: 1.8, marginBottom: '2rem' }}>{dest.description}</p>

           
            {dest.reviews?.length > 0 && (
              <>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', marginBottom: '1.5rem' }}>Traveler Reviews</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {dest.reviews.map((r, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: '1.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
                        <span style={{ fontWeight: 500 }}>{r.user_name}</span>
                        <span style={{ color: '#d4a853' }}>{'★'.repeat(r.rating)}</span>
                      </div>
                      <p style={{ color: 'rgba(245,239,230,.6)', fontSize: '.9rem', lineHeight: 1.6 }}>{r.comment}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: '2rem', height: 'fit-content', position: 'sticky', top: '7rem' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', marginBottom: '.5rem' }}>Book Your Trip</h3>
            <div style={{ color: '#d4a853', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>₹{Number(dest.price).toLocaleString()}<span style={{ color: 'rgba(245,239,230,.4)', fontSize: '.9rem', fontWeight: 400 }}> / person</span></div>

            {booked ? (
              <div style={{ background: 'rgba(42,125,111,.2)', border: '1px solid rgba(42,125,111,.4)', borderRadius: 12, padding: '1.2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>✅</div>
                <p style={{ fontWeight: 500 }}>Booking Confirmed!</p>
                <p style={{ fontSize: '.85rem', color: 'rgba(245,239,230,.5)', marginTop: '.3rem' }}>Check My Trips for details</p>
              </div>
            ) : (
              <>
                {[['Check In', 'check_in', 'date'], ['Check Out', 'check_out', 'date'], ['Travelers', 'travelers', 'number']].map(([label, key, type]) => (
                  <div key={key} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,239,230,.5)', marginBottom: '.4rem' }}>{label}</label>
                    <input type={type} min={type === 'number' ? 1 : undefined} value={booking[key]} onChange={e => setBooking(b => ({ ...b, [key]: type === 'number' ? +e.target.value : e.target.value }))}
                      style={{ width: '100%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, padding: '.75rem 1rem', color: '#f5efe6', fontSize: '.95rem', outline: 'none' }} />
                  </div>
                ))}
                <button onClick={handleBook} style={{ width: '100%', background: '#c96a3a', color: '#f5efe6', border: 'none', padding: '1rem', borderRadius: 100, fontSize: '1rem', fontWeight: 500, marginTop: '.5rem', boxShadow: '0 4px 20px rgba(201,106,58,.3)', transition: 'transform .2s' }}>
                  {user ? 'Book Now →' : 'Sign In to Book'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}