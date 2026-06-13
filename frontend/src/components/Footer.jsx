import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ padding: '3rem 4rem', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link to="/" style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#f5efe6', textDecoration: 'none' }}>
        Wand<span style={{ color: '#c96a3a', fontStyle: 'italic' }}>r</span>
      </Link>
      <p style={{ fontSize: '.8rem', color: 'rgba(245,239,230,.3)' }}>© 2026 Wandr · Crafted with ✈ for travelers everywhere</p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['Privacy', 'Terms', 'Contact'].map(l => (
          <span key={l} style={{ fontSize: '.8rem', color: 'rgba(245,239,230,.3)' }}>{l}</span>
        ))}
      </div>
    </footer>
  );
}