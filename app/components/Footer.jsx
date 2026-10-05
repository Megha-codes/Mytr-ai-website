'use client';

import { usePathname } from 'next/navigation';

// Shared site-wide footer, rendered once from layout.js (see Nav.jsx for
// why hash links need the leading "/" from non-home routes).
export default function Footer() {
  const pathname = usePathname() || '/';
  const onHome = pathname === '/';
  const base = onHome ? '' : '/';
  const homeHref = onHome ? '#top' : '/';

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href={homeHref} className="brand"><span className="logo-mark" aria-hidden="true"></span>mytr.ai</a>
            <p>An intelligence layer for your body, your habits, and the environment you live in.</p>
          </div>
          <div className="foot-col">
            <h4>Product</h4>
            <a href={`${base}#product`}>The device</a>
            <a href={`${base}#body`}>Health intelligence</a>
            <a href={`${base}#how`}>Correlation</a>
            <a href={`${base}#home`}>Environment</a>
            <a href="/spike-lab">Spike Lab</a>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <a href={`${base}#vision`}>Vision</a>
            <a href={homeHref}>About</a>
            <a href={homeHref}>Research</a>
            <a href={homeHref}>Contact</a>
          </div>
          <div className="foot-col">
            <h4>Resources</h4>
            <a href={homeHref}>Privacy</a>
            <a href={homeHref}>Terms</a>
            <a href={homeHref}>Data & security</a>
            <a href={homeHref}>FAQs</a>
          </div>
          <div className="foot-col">
            <h4>Follow</h4>
            <a href={homeHref}>LinkedIn</a>
            <a href={homeHref}>Instagram</a>
            <a href={homeHref}>X</a>
            <a href={homeHref}>YouTube</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 mytr.ai</span>
          <span className="disclaim-line">Not intended to diagnose, treat, cure, or prevent any disease.</span>
        </div>
      </div>
    </footer>
  );
}
