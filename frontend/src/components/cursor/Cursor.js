import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorBig = useRef(null);
  const cursorSmall = useRef(null);
  useEffect(() => {
    const handleMoveCursor = (e) => {
      gsap.to(cursorBig.current, { duration: 0.4, left: e.clientX, top: e.clientY });
      gsap.to(cursorSmall.current, { duration: 0.1, left: e.clientX, top: e.clientY - 2 });
    }
    window.addEventListener('mousemove', handleMoveCursor);
    return () => {
      window.removeEventListener('mousemove', handleMoveCursor)
    }
  }, [])
  return (
    <div className="cursor">
      <div className="cursor__ball cursor__ball--big" ref={cursorBig}>
        <svg height="24" width="24">
          <circle cx="12" cy="12" r="12" strokeWidth="0"></circle>
        </svg>
      </div>
      <div className="cursor__ball cursor__ball--small" ref={cursorSmall}>
        <svg height="8" width="8">
          <circle cx="4" cy="4" r="4" strokeWidth="0"></circle>
        </svg>
      </div>
    </div>
  )
}

export default Cursor
