import { useEffect, useState, useRef,React } from 'react';
import { Link } from 'react-router-dom';
import { destinationsAPI } from '../api';
import DestinationCard from './DestinationCard';

export default function DestinationGrid() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  useEffect(() => {
    destinationsAPI.getAll().then(res => {
      setDestinations(res.data.slice(0, 5));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="reveal" style={{ padding: '3rem 4rem 5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem' }}>
        <div>
          <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#d4a853', marginBottom: '.5rem' }}>✦ Top Picks</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.1 }}>Popular <em style={{ fontStyle: 'italic', color: '#c96a3a' }}>Destinations</em></h2>
        </div>
        <Link to="/destinations" style={{ color: 'rgba(245,239,230,.5)', textDecoration: 'none', fontSize: '.9rem', borderBottom: '1px solid rgba(245,239,230,.2)', paddingBottom: 2 }}>View all →</Link>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div style={{ width: 40, height: 40, border: '2px solid rgba(201,106,58,.3)', borderTop: '2px solid #c96a3a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '280px 280px', gap: '1rem' }}>
          {destinations.map((d, i) => <DestinationCard key={d.id} dest={d} large={i === 0} />)}
        </div>
      )}
    </section>
  );
}