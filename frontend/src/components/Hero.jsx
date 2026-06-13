import React from 'react';
import { Link } from 'react-router-dom';

const floatCards = [
  { emoji: '🌊', name: 'Maldives', temp: '28°C · Sunny', badge: 'Trending', hot: false },
  { emoji: '🗻', name: 'Kyoto, Japan', temp: '18°C · Cloudy', badge: 'Hot Deal', hot: true },
  { emoji: '🌅', name: 'Santorini', temp: '24°C · Clear', badge: 'Popular', hot: false },
];

export default function Hero() {
  return (
    <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
    
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%,rgba(201,106,58,.18) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(42,125,111,.12) 0%,transparent 50%),linear-gradient(135deg,#1a1208 0%,#0d2220 100%)', animation: 'bgPulse 8s ease-in-out infinite alternate' }} />
      
      
      {[{ c: '#c96a3a', s: 400, style: { top: '10%', right: '15%' } }, { c: '#2a7d6f', s: 300, style: { bottom: '20%', left: '10%', animationDelay: '-4s' } }, { c: '#d4a853', s: 200, style: { top: '60%', right: '35%', animationDelay: '-8s' } }].map((o, i) => (
        <div key={i} style={{ position: 'absolute', width: o.s, height: o.s, background: o.c, borderRadius: '50%', filter: 'blur(80px)', opacity: .3, animation: 'float 12s ease-in-out infinite', ...o.style }} />
      ))}

      
      <div style={{ position: 'relative', zIndex: 2, padding: '0 4rem', maxWidth: 750 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(212,168,83,.3)', padding: '.4rem 1rem', borderRadius: 100, fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#d4a853', marginBottom: '1.5rem', animation: 'fadeUp 1s ease .8s both' }}>
          <span style={{ width: 6, height: 6, background: '#d4a853', borderRadius: '50%', display: 'inline-block', animation: 'blink 2s ease infinite' }} />
          Discover the World
        </div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(3.5rem,7vw,6rem)', lineHeight: 1.05, letterSpacing: '-.03em', marginBottom: '1.5rem', animation: 'fadeUp 1s ease 1s both' }}>
          Travel <em style={{ fontStyle: 'italic', color: '#c96a3a' }}>Beyond</em><br />the Ordinary
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 300, color: 'rgba(245,239,230,.6)', lineHeight: 1.7, maxWidth: 480, marginBottom: '2.5rem', animation: 'fadeUp 1s ease 1.2s both' }}>
          Curated journeys to extraordinary destinations. Let us craft your perfect adventure — from hidden gems to iconic wonders.
        </p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', animation: 'fadeUp 1s ease 1.4s both' }}>
          <Link to="/destinations">
            <button style={{ background: '#c96a3a', color: '#f5efe6', border: 'none', padding: '1rem 2rem', borderRadius: 100, fontSize: '.95rem', fontWeight: 500, boxShadow: '0 4px 30px rgba(201,106,58,.3)', transition: 'transform .2s,box-shadow .3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,106,58,.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 30px rgba(201,106,58,.3)'; }}>
              Start Exploring →
            </button>
          </Link>
          <button style={{ color: '#f5efe6', background: 'transparent', border: '1px solid rgba(245,239,230,.2)', padding: '1rem 2rem', borderRadius: 100, fontSize: '.95rem', display: 'flex', alignItems: 'center', gap: '.5rem', transition: 'border-color .3s' }}>
            <span style={{ width: 30, height: 30, background: 'rgba(212,168,83,.2)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '.7rem' }}>▶</span>
            Watch Stories
          </button>
        </div>
      </div>

     
      <div style={{ position: 'absolute', right: '4rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 2, animation: 'fadeUp 1s ease 1.6s both' }}>
        {floatCards.map((c, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 16, padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '.8rem', marginLeft: i === 1 ? 20 : 0, animation: `cardFloat ${5 + i}s ease-in-out infinite`, animationDelay: `${-i * 2}s` }}>
            <span style={{ fontSize: '2rem' }}>{c.emoji}</span>
            <div>
              <div style={{ fontWeight: 500, fontSize: '.95rem' }}>{c.name}</div>
              <div style={{ fontSize: '.8rem', color: 'rgba(245,239,230,.5)' }}>{c.temp}</div>
            </div>
            <span style={{ marginLeft: 'auto', background: c.hot ? 'rgba(201,106,58,.3)' : 'rgba(42,125,111,.3)', color: c.hot ? '#f5a070' : '#7ecfc3', border: `1px solid ${c.hot ? 'rgba(201,106,58,.5)' : 'rgba(42,125,111,.5)'}`, borderRadius: 100, padding: '.2rem .6rem', fontSize: '.7rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{c.badge}</span>
          </div>
        ))}
      </div>

      
      <div style={{ position: 'absolute', bottom: '3rem', left: '4rem', right: '4rem', display: 'flex', gap: '3rem', zIndex: 2, animation: 'fadeUp 1s ease 1.8s both' }}>
        {[['50K+', 'Happy Travelers'], ['120+', 'Destinations'], ['4.9★', 'Avg Rating'], ['15yr', 'Experience']].map(([n, l], i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '.2rem' }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: '#d4a853', lineHeight: 1 }}>{n}</span>
            <span style={{ fontSize: '.8rem', color: 'rgba(245,239,230,.5)', letterSpacing: '.05em' }}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}