import { useEffect, useRef, useState ,React} from 'react';

export default function Cursor() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const animId = useRef();

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);

    const anim = () => {
      ring.current.x += (mouse.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.y - ring.current.y) * 0.12;
      setRingPos({ x: ring.current.x, y: ring.current.y });
      animId.current = requestAnimationFrame(anim);
    };
    animId.current = requestAnimationFrame(anim);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(animId.current); };
  }, [mouse]);

  return (
    <>
      <div style={{ position: 'fixed', left: mouse.x, top: mouse.y, width: 12, height: 12, background: '#c96a3a', borderRadius: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 9999, transition: 'transform .15s' }} />
      <div style={{ position: 'fixed', left: ringPos.x, top: ringPos.y, width: 40, height: 40, border: '1px solid rgba(201,106,58,.5)', borderRadius: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 9998 }} />
    </>
  );
}