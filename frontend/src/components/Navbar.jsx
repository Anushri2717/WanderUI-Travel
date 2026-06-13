import { useState ,React} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 4rem', background: 'linear-gradient(to bottom,rgba(26,18,8,.92),transparent)', animation: 'navIn 1s ease .3s both' }}>
      <Link to="/" style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', letterSpacing: '-.03em', color: '#f5efe6', textDecoration: 'none' }}>
        Wand<span style={{ color: '#c96a3a', fontStyle: 'italic' }}>r</span>
      </Link>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {[['/', 'Explore'], ['/destinations', 'Destinations'], ['/bookings', 'My Trips']].map(([to, label]) => (
          <Link key={to} to={to} style={{ color: 'rgba(245,239,230,.7)', textDecoration: 'none', fontSize: '.9rem', fontWeight: 300, letterSpacing: '.05em', transition: 'color .3s' }}
            onMouseEnter={e => e.target.style.color = '#f5efe6'}
            onMouseLeave={e => e.target.style.color = 'rgba(245,239,230,.7)'}>
            {label}
          </Link>
        ))}

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'rgba(245,239,230,.7)', fontSize: '.9rem' }}>Hi, {user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(245,239,230,.2)', color: '#f5efe6', padding: '.6rem 1.2rem', borderRadius: 100, fontSize: '.85rem', transition: 'border-color .3s' }}>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <button style={{ background: '#c96a3a', color: '#f5efe6', border: 'none', padding: '.6rem 1.5rem', borderRadius: 100, fontSize: '.9rem', fontWeight: 500, boxShadow: '0 4px 20px rgba(201,106,58,.3)', transition: 'transform .2s,background .3s' }}>
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}