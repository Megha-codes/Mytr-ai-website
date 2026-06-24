'use client';

import { useEffect } from 'react';

export default function ClientAnimations() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-enabled');

    // Transparent nav over the hero, frosted glass once scrolled.
    const nav = document.querySelector('nav');
    const onScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const elements = Array.from(document.querySelectorAll('.fade-up'));
    const reveal = (el) => el.classList.add('vis');
    const revealAll = () => elements.forEach(reveal);

    // No observer support → just show everything.
    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));

    // Fail-safe: content must never stay invisible. Reveal anything still
    // hidden shortly after load, even if the observer never fires for it.
    const fallback = window.setTimeout(revealAll, 1500);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      root.classList.remove('js-enabled');
    };
  }, []);

  return null;
}
