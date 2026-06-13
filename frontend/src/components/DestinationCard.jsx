import { useState ,React} from 'react';
import { useNavigate } from 'react-router-dom';

export default function DestinationCard({ dest, large }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/destinations/${dest.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 18, overflow: 'hidden', position: 'relative', gridRow: large ? '1/3' : undefined, transition: 'transform .2s' }}>
     
      <div style={{ position: 'absolute', inset: 0, background: dest.gradient || 'linear-gradient(135deg,#1a3a2e,#2a6a5a)', transition: 'transform .6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}>
        <div style={{ position: 'absolute', fontSize: large ? '10rem' : '7rem', opacity: .2, bottom: large ? '-2rem' : 0, right: large ? '-2rem' : 0, filter: 'blur(3px)' }}>{dest.emoji}</div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(26,18,8,.9) 0%,transparent 60%)' }} />

      {hovered && <span style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 100, padding: '.4rem 1rem', fontSize: '.75rem', color: '#f5efe6' }}>Explore →</span>}

     
      {dest.is_trending && <span style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', background: 'rgba(42,125,111,.3)', color: '#7ecfc3', border: '1px solid rgba(42,125,111,.5)', borderRadius: 100, padding: '.2rem .6rem', fontSize: '.7rem', fontWeight: 500 }}>Trending</span>}
      {dest.is_hot_deal && <span style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', background: 'rgba(201,106,58,.3)', color: '#f5a070', border: '1px solid rgba(201,106,58,.5)', borderRadius: 100, padding: '.2rem .6rem', fontSize: '.7rem', fontWeight: 500 }}>Hot Deal</span>}

      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'transform .4s' }}>
        <div style={{ fontSize: '.7rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(245,239,230,.5)', marginBottom: '.3rem' }}>{dest.label}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: large ? '2.2rem' : '1.5rem', lineHeight: 1.2, marginBottom: '.5rem' }}>{dest.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', fontSize: '.8rem', color: 'rgba(245,239,230,.6)', opacity: hovered ? 1 : 0, transition: 'opacity .4s .1s' }}>
          <span style={{ color: '#d4a853', fontWeight: 500 }}>From ₹{Number(dest.price).toLocaleString()}</span>
          <span>★ {dest.rating}</span>
          {dest.nights && <span>{dest.nights} nights</span>}
        </div>
      </div>
    </div>
  );
}