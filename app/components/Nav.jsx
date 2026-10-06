'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getUser, subscribe, restoreSession, logout } from '../lib/auth';
import AuthModal from './AuthModal';

// Shared site-wide navbar: rendered once from layout.js so every route
// (home, Spike Lab, ...) gets the identical header. Logo sits centered
// via a 3-column grid (links | logo | cta+burger). Spike Lab is a
// standing highlighted button at the far left of the link group, not
// just an active-route state. The nav is transparent/white-on-dark only
// over the home page's own dark hero; everywhere else (any other route,
// or the home page once scrolled) it's the solid floating pill.
const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#how', label: 'How it works' },
  { href: '#body', label: 'Health intelligence' },
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
  // The transparent, white-on-dark nav reads correctly over any page's own
  // dark hero — home's galaxy hero and Spike Lab's hero (spike-lab.css's
  // .hero is hard-coded to var(--void)/#000, matching home, not the light
  // card-based styling the rest of that page uses) are both dark, so this
  // is scroll-driven only, the same on every route. Forcing the pill on
  // regardless of scroll position (an earlier version of this) looked
  // wrong on Spike Lab specifically: a solid white pill sitting directly
  // on its black hero, where the original standalone app had a black nav.
  const pill = scrolled;

  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authMessage, setAuthMessage] = useState('');

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

  // Nav mounts once per page load (it lives in layout.js), so this is a
  // fine place to both seed the initial user from localStorage and kick
  // off the one-time server check that confirms/refreshes that session.
  useEffect(() => {
    setUser(getUser());
    const unsubscribe = subscribe(setUser);
    restoreSession();
    return unsubscribe;
  }, []);

  // Lets other code (the Spike Lab free-attempts gate) ask this nav to
  // open the login modal without owning any of its state itself.
  useEffect(() => {
    const onOpenRequest = (e) => {
      setAuthMode((e.detail && e.detail.mode) || 'login');
      setAuthMessage((e.detail && e.detail.message) || '');
      setAuthOpen(true);
      setOpen(false);
    };
    window.addEventListener('mytr-auth:open', onOpenRequest);
    return () => window.removeEventListener('mytr-auth:open', onOpenRequest);
  }, []);

  const openAuth = (m) => { setAuthMode(m); setAuthMessage(''); setAuthOpen(true); closeMenu(); };

  return (
    <header className={`nav${pill ? ' scrolled' : ''}`} id="nav">
      <div className="wrap nav-in">
        <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks" aria-label="Primary">
          <a
            href="/spike-lab"
            className="nav-spike"
            aria-current={onSpikeLab ? 'page' : undefined}
            onClick={closeMenu}
          >
            Spike Lab
          </a>
          {LINKS.map((l) => (
            <a key={l.href} href={`${base}${l.href}`} onClick={closeMenu}>{l.label}</a>
          ))}
          <div className="nav-cta-mobile">
            <a href="/mytr-ai.apk" download className="btn btn-secondary" onClick={closeMenu}>Download APK ↓</a>
            {user ? (
              <>
                <span className="nav-user">{user.name || user.email}</span>
                <button type="button" className="btn btn-secondary" onClick={() => { logout(); closeMenu(); }}>Log out</button>
              </>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => openAuth('login')}>Login</button>
            )}
          </div>
        </nav>

        <a href={brandHref} className="brand brand-center" onClick={closeMenu}>
          <span className="logo-mark" aria-hidden="true"></span>mytr.ai
        </a>

        <div className="nav-right">
          <div className="nav-cta">
            <a href="/mytr-ai.apk" download className="btn btn-secondary">Download APK ↓</a>
            {user ? (
              <>
                <span className="nav-user">{user.name || user.email}</span>
                <button type="button" className="btn btn-secondary" onClick={logout}>Log out</button>
              </>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => openAuth('login')}>Login</button>
            )}
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

      <AuthModal
        open={authOpen}
        mode={authMode}
        message={authMessage}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => setAuthOpen(false)}
      />
    </header>
  );
}
