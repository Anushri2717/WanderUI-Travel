import { useState,React } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [tab, setTab] = useState('Flights');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) navigate(`/destinations?search=${query}`);
  };

  return (
    <section className="reveal" style={{ padding: '5rem 4rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: '2rem', backdropFilter: 'blur(20px)', transition: 'border-color .3s,box-shadow .3s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,168,83,.3)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(212,168,83,.05)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.boxShadow = ''; }}>
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.5rem' }}>
          {['Flights', 'Hotels', 'Packages', 'Experiences'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '.5rem 1.2rem', borderRadius: 100, fontSize: '.85rem', border: '1px solid', borderColor: tab === t ? '#c96a3a' : 'rgba(255,255,255,.15)', background: tab === t ? '#c96a3a' : 'transparent', color: tab === t ? '#f5efe6' : 'rgba(245,239,230,.6)', transition: 'all .3s' }}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', alignItems: 'center' }}>
          {[['Destination', query, (v) => setQuery(v), 'Where to?'], ['Check In', '', null, 'Add date'], ['Check Out', '', null, 'Add date'], ['Travelers', '', null, '1 adult']].map(([label, val, onChange, ph], i) => (
            <div key={i} style={{ padding: '.8rem 1.2rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
              <div style={{ fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,239,230,.4)', marginBottom: '.3rem' }}>{label}</div>
              <input placeholder={ph} value={val} onChange={onChange ? e => onChange(e.target.value) : undefined} style={{ background: 'none', border: 'none', outline: 'none', color: '#f5efe6', fontSize: '1rem', width: '100%' }} />
            </div>
          ))}
          <button onClick={handleSearch} style={{ background: '#c96a3a', border: 'none', color: '#f5efe6', width: 52, height: 52, borderRadius: '50%', fontSize: '1.2rem', boxShadow: '0 4px 20px rgba(201,106,58,.3)', transition: 'transform .2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}>🔍</button>
        </div>
      </div>
    </section>
  );
}