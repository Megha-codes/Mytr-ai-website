'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Shared site-wide navbar: rendered once from layout.js so every route
// (home, Spike Lab, ...) gets the identical header. Logo sits centered
// via a 3-column grid (links | logo | cta+burger); the active route gets
// a highlighted pill in the left-hand link group.
const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#how', label: 'How it works' },
  { href: '#body', label: 'Health intelligence' },
  { href: '#home', label: 'For your home' },
  { href: '#vision', label: 'Vision' },
];

export default function Nav() {
  const pathname = usePathname() || '/';
  const onHome = pathname === '/';
  const onSpikeLab = pathname.startsWith('/spike-lab');
  // Hash links (#product etc.) only resolve on the home page itself;
  // from any other route they need the leading "/" to land back home
  // first, then scroll to the anchor.
  const base = onHome ? '' : '/';
  const brandHref = onHome ? '#top' : '/';

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeydown = (e) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="wrap nav-in">
        <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={`${base}${l.href}`} onClick={closeMenu}>{l.label}</a>
          ))}
          <a
            href="/spike-lab"
            className="nav-spike"
            aria-current={onSpikeLab ? 'page' : undefined}
            onClick={closeMenu}
          >
            Spike Lab
          </a>
          <div className="nav-cta-mobile">
            <a href="/mytr-ai.apk" download className="btn btn-secondary" onClick={closeMenu}>Download APK ↓</a>
            <a href={`${base}#waitlist`} className="btn btn-primary" onClick={closeMenu}>Join the waitlist</a>
          </div>
        </nav>

        <a href={brandHref} className="brand brand-center" onClick={closeMenu}>
          <span className="logo-mark" aria-hidden="true"></span>mytr.ai
        </a>

        <div className="nav-right">
          <div className="nav-cta">
            <a href="/mytr-ai.apk" download className="btn btn-secondary">Download APK ↓</a>
            <a href={`${base}#waitlist`} className="btn btn-primary">Join the waitlist</a>
          </div>
          <button
            className={`nav-burger${open ? ' open' : ''}`}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
