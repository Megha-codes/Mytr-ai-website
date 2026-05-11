'use client';

import { useEffect } from 'react';

export default function ClientAnimations() {
  useEffect(() => {
    document.documentElement.classList.add('js-enabled');

    const elements = document.querySelectorAll('.fade-up');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('vis'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('js-enabled');
    };
  }, []);

  return null;
}
