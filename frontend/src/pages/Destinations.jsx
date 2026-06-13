import { useEffect, useState, React } from 'react';
import { useSearchParams } from 'react-router-dom';
import { destinationsAPI } from '../api';
import DestinationCard from '../components/DestinationCard';
import Footer from '../components/Footer';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [params] = useSearchParams();

  useEffect(() => {
    const q = params.get('search') || '';
    setSearch(q);
    destinationsAPI.getAll(q ? { search: q } : {}).then(res => {
      setDestinations(res.data);
      setLoading(false);
    });
  }, [params]);

  const handleSearch = () => {
    setLoading(true);
    destinationsAPI.getAll(search ? { search } : {}).then(res => {
      setDestinations(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div style={{ paddingTop: '8rem', padding: '8rem 4rem 5rem', minHeight: '100vh' }}>
        <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#d4a853', marginBottom: '.5rem' }}>✦ All Destinations</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '2rem', lineHeight: 1.1 }}>Explore the <em style={{ fontStyle: 'italic', color: '#c96a3a' }}>World</em></h1>

        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', maxWidth: 600 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Search destinations..." style={{ flex: 1, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 100, padding: '.8rem 1.5rem', color: '#f5efe6', fontSize: '1rem', outline: 'none' }} />
          <button onClick={handleSearch} style={{ background: '#c96a3a', color: '#f5efe6', border: 'none', padding: '.8rem 1.5rem', borderRadius: 100, fontSize: '.95rem', fontWeight: 500, boxShadow: '0 4px 20px rgba(201,106,58,.3)' }}>Search</button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
            <div style={{ width: 50, height: 50, border: '2px solid rgba(201,106,58,.3)', borderTop: '2px solid #c96a3a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem', gridAutoRows: '280px' }}>
            {destinations.map(d => <DestinationCard key={d.id} dest={d} />)}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}