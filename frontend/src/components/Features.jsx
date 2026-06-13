import { useEffect, useRef,React } from 'react';

const features = [
  { icon: '🤖', title: 'AI Trip Planner', desc: 'Describe your dream trip and our AI crafts a personalized itinerary with flights, hotels, and local experiences.', color: 'rgba(201,106,58,.15)' },
  { icon: '🗺️', title: 'Interactive Maps', desc: 'Explore destinations on beautiful interactive maps with curated layers for food, culture, and nightlife.', color: 'rgba(42,125,111,.15)' },
  { icon: '💰', title: 'Price Alerts', desc: 'Set your budget and receive instant notifications when flight prices drop to your target range.', color: 'rgba(212,168,83,.15)' },
  { icon: '🧳', title: 'Packing Assistant', desc: 'Get smart packing lists tailored to your destination, duration, and planned activities.', color: 'rgba(201,106,58,.15)' },
  { icon: '🌐', title: 'Offline Access', desc: 'Download your entire trip for seamless offline use anywhere in the world.', color: 'rgba(42,125,111,.15)' },
  { icon: '⭐', title: 'Local Experts', desc: 'Connect with verified local guides for authentic off-the-beaten-path experiences.', color: 'rgba(212,168,83,.15)' },
];

export default function Features() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="reveal" style={{ padding: '5rem 4rem', background: 'linear-gradient(180deg,transparent,rgba(42,125,111,.05),transparent)' }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#d4a853', marginBottom: '.5rem' }}>✦ Why Wandr</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.1 }}>Everything You Need for<br />an <em style={{ fontStyle: 'italic', color: '#c96a3a' }}>Epic Journey</em></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: '2rem', transition: 'transform .3s,border-color .3s,background .3s', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(201,106,58,.2)'; e.currentTarget.style.background = 'rgba(255,255,255,.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.background = 'rgba(255,255,255,.03)'; }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: f.color, display: 'grid', placeItems: 'center', fontSize: '1.5rem', marginBottom: '1.2rem' }}>{f.icon}</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', marginBottom: '.6rem' }}>{f.title}</h3>
            <p style={{ fontSize: '.88rem', color: 'rgba(245,239,230,.5)', lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}