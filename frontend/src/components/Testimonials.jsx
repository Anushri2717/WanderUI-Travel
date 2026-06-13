import { useEffect, useRef ,React} from 'react';

const reviews = [
  { name: 'Priya S.', dest: 'Bali, Indonesia', av: '#c96a3a', text: 'Wandr made our honeymoon absolutely magical. Every detail was perfect — from the villa to the sunset dinner cruise.' },
  { name: 'Rahul M.', dest: 'Swiss Alps', av: '#2a7d6f', text: 'The AI planner saved us hours of research. It found a hidden mountain village not on any travel blog!' },
  { name: 'Ananya K.', dest: 'Kyoto, Japan', av: '#d4a853', text: 'Best travel app I have used. Offline maps were lifesavers and local expert recommendations were spot-on.' },
  { name: 'James T.', dest: 'Maldives', av: '#6a3ac9', text: 'Got a price alert for business class to the Maldives. Saved over ₹40,000. Cannot recommend enough!' },
  { name: 'Sofia L.', dest: 'Paris, France', av: '#c93a6a', text: 'The curated itinerary felt like it was made by someone who truly knows Paris. Found restaurants I would never have found alone.' },
  { name: 'Arjun P.', dest: 'Santorini', av: '#3a6ac9', text: 'Smooth booking, beautiful UI, and incredible customer support. This is how travel apps should be done.' },
];

export default function Testimonials() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="reveal" style={{ padding: '5rem 4rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#d4a853', marginBottom: '.5rem' }}>✦ Traveler Stories</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.1 }}>Loved by <em style={{ fontStyle: 'italic', color: '#c96a3a' }}>Explorers</em> Worldwide</h2>
      </div>
      <div className="track-wrap" style={{ overflow: 'hidden' }}>
        <div className="track-inner" style={{ display: 'flex', gap: '1.5rem', minWidth: 'max-content', animation: 'scrollTrack 35s linear infinite' }}>
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: '1.8rem', width: 340, flexShrink: 0 }}>
              <div style={{ color: '#d4a853', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '.9rem', color: 'rgba(245,239,230,.7)', lineHeight: 1.7, marginBottom: '1.2rem', fontStyle: 'italic' }}>"{r.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: r.av, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{r.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '.9rem' }}>{r.name}</div>
                  <div style={{ fontSize: '.75rem', color: 'rgba(245,239,230,.4)' }}>Traveled to {r.dest}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}