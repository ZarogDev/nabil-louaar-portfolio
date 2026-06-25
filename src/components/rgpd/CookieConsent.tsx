"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setShow(true);
  }, []);

  const accept = () => { localStorage.setItem('cookie-consent', 'accepted'); setShow(false); };
  const decline = () => { localStorage.setItem('cookie-consent', 'declined'); setShow(false); };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement cookies"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        maxWidth: '280px',
        background: '#fbfaf7',
        border: '1px solid #d8d5cd',
        padding: '18px 20px',
        boxShadow: '0 4px 20px rgba(10,10,10,0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <p style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '12px', lineHeight: 1.65, color: '#6b6860', margin: 0 }}>
        Ce site utilise des cookies de mesure d&apos;audience.{' '}
        <Link
          href="/politique-confidentialite"
          style={{ color: '#0a0a0a', textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationColor: '#d8d5cd' }}
        >
          En savoir plus
        </Link>
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={accept}
          style={{
            flex: 1, padding: '8px 0',
            background: '#0a0a0a', color: '#fbfaf7',
            border: 'none',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '9.5px', letterSpacing: '0.15em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Accepter
        </button>
        <button
          onClick={decline}
          style={{
            flex: 1, padding: '8px 0',
            background: 'transparent',
            color: '#c5c2bb',
            border: '1px solid #d8d5cd',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '9.5px', letterSpacing: '0.15em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
