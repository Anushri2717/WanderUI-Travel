import { useState ,React} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handle = async () => {
    setLoading(true); setError('');
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate('/');
    } catch (e) {
      setError(e.response?.data?.error || 'Something went wrong');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%,rgba(201,106,58,.12) 0%,transparent 70%),linear-gradient(135deg,#1a1208,#0d2220)' }} />
      <div style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 24, padding: '3rem', width: 420, backdropFilter: 'blur(20px)' }}>
        <Link to="/" style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: '#f5efe6', textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
          Wand<span style={{ color: '#c96a3a', fontStyle: 'italic' }}>r</span>
        </Link>

        <div style={{ display: 'flex', marginBottom: '2rem', background: 'rgba(255,255,255,.06)', borderRadius: 100, padding: '.2rem' }}>
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '.6rem', borderRadius: 100, border: 'none', background: mode === m ? '#c96a3a' : 'transparent', color: '#f5efe6', fontSize: '.9rem', fontWeight: mode === m ? 500 : 300, transition: 'all .3s', textTransform: 'capitalize' }}>{m === 'login' ? 'Sign In' : 'Sign Up'}</button>
          ))}
        </div>

        {mode === 'register' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,239,230,.5)', marginBottom: '.4rem' }}>Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" style={{ width: '100%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, padding: '.75rem 1rem', color: '#f5efe6', fontSize: '.95rem', outline: 'none' }} />
          </div>
        )}

        {[['Email', 'email', 'email'], ['Password', 'password', 'password']].map(([label, key, type]) => (
          <div key={key} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,239,230,.5)', marginBottom: '.4rem' }}>{label}</label>
            <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={label} onKeyDown={e => e.key === 'Enter' && handle()}
              style={{ width: '100%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, padding: '.75rem 1rem', color: '#f5efe6', fontSize: '.95rem', outline: 'none' }} />
          </div>
        ))}

        {error && <p style={{ color: '#f5a070', fontSize: '.85rem', marginBottom: '1rem', background: 'rgba(201,106,58,.1)', padding: '.6rem 1rem', borderRadius: 8, border: '1px solid rgba(201,106,58,.2)' }}>{error}</p>}

        <button onClick={handle} disabled={loading} style={{ width: '100%', background: loading ? 'rgba(201,106,58,.5)' : '#c96a3a', color: '#f5efe6', border: 'none', padding: '1rem', borderRadius: 100, fontSize: '1rem', fontWeight: 500, marginTop: '.5rem', boxShadow: '0 4px 20px rgba(201,106,58,.3)', transition: 'all .3s' }}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
        </button>
      </div>
    </div>
  );
}