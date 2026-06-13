import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import DestinationGrid from '../components/DestinationGrid';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <DestinationGrid />
      <Features />
      <Testimonials />

     
      <section style={{ padding: '5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: '-50%', background: 'radial-gradient(ellipse at center,rgba(201,106,58,.08),transparent 60%)', animation: 'bgPulse 4s ease-in-out infinite alternate', pointerEvents: 'none' }} />
        <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#d4a853', marginBottom: '.5rem' }}>✦ Start Today</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1.1, marginBottom: '1rem' }}>Your Next <em style={{ fontStyle: 'italic', color: '#c96a3a' }}>Adventure</em> Awaits</h2>
        <p style={{ color: 'rgba(245,239,230,.5)', maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>Join over 50,000 travelers who have discovered their perfect trip with Wandr. First booking? Get 15% off.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/destinations"><button style={{ background: '#c96a3a', color: '#f5efe6', border: 'none', padding: '1rem 2rem', borderRadius: 100, fontSize: '.95rem', fontWeight: 500, boxShadow: '0 4px 30px rgba(201,106,58,.3)' }}>Plan My Trip →</button></Link>
          <Link to="/destinations"><button style={{ color: '#f5efe6', background: 'transparent', border: '1px solid rgba(245,239,230,.2)', padding: '1rem 2rem', borderRadius: 100, fontSize: '.95rem' }}>Browse Destinations</button></Link>
        </div>
      </section>

      <Footer />
    </>
  );
}