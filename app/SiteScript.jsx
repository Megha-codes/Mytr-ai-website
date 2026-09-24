'use client';

import { useEffect } from 'react';

// Ported from mytr-site/assets/app.js (see README there). Logic is
// unchanged; it's wrapped in useEffect + a cleanup function because
// dangerouslySetInnerHTML never executes injected <script> tags, and
// because React 18 Strict Mode double-invokes effects in dev — without
// the idempotency guards below (clearing #dots/.eq before repopulating)
// and the cleanup (listeners/RAF/interval teardown), a dev reload would
// duplicate equalizer bars, carousel dots, and event listeners.
export default function SiteScript() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    const eq = document.querySelector('.eq');
    if (eq) {
      eq.innerHTML = '';
      for (let k = 0; k < 18; k++) {
        const s = document.createElement('span');
        s.style.animationDelay = (k * 0.07).toFixed(2) + 's';
        s.style.animationDuration = (0.85 + (k % 5) * 0.11).toFixed(2) + 's';
        eq.appendChild(s);
      }
    }

    const nav = document.getElementById('nav');
    if (nav) {
      const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    const chat = document.getElementById('chat');
    if (chat) io.observe(chat);
    if (reduce) {
      document.querySelectorAll('.reveal,#chat').forEach((el) => el.classList.add('in'));
    }
    cleanups.push(() => io.disconnect());

    if (!reduce && window.matchMedia('(pointer:fine)').matches) {
      const root = document.documentElement;
      const onPointerMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14;
        const y = (e.clientY / window.innerHeight - 0.5) * 14;
        root.style.setProperty('--mx', x.toFixed(1) + 'px');
        root.style.setProperty('--my', y.toFixed(1) + 'px');
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      cleanups.push(() => window.removeEventListener('pointermove', onPointerMove));
    }

    // galaxy constellation (red + blue)
    const c = document.getElementById('field');
    if (c) {
      const ctx = c.getContext('2d');
      let w, h, dpr, nodes, raf, running = true;
      const COLORS = ['10,108,255', '10,108,255', '255,51,85'];
      function size() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = c.clientWidth = window.innerWidth;
        h = c.clientHeight = window.innerHeight;
        c.width = w * dpr;
        c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      function init() {
        size();
        const count = Math.min(78, Math.floor((w * h) / 18500));
        nodes = [];
        for (let i = 0; i < count; i++) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            col: COLORS[i % COLORS.length],
          });
        }
      }
      function step() {
        ctx.clearRect(0, 0, w, h);
        let i, j, n, a, b, dx, dy, d;
        for (i = 0; i < nodes.length; i++) {
          n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.3, 0, 6.283);
          ctx.fillStyle = 'rgba(' + n.col + ',.85)';
          ctx.fill();
        }
        for (i = 0; i < nodes.length; i++) {
          for (j = i + 1; j < nodes.length; j++) {
            a = nodes[i];
            b = nodes[j];
            dx = a.x - b.x;
            dy = a.y - b.y;
            d = dx * dx + dy * dy;
            if (d < 16000) {
              const al = (1 - d / 16000) * 0.22;
              ctx.strokeStyle = 'rgba(' + a.col + ',' + al.toFixed(3) + ')';
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        if (running) raf = requestAnimationFrame(step);
      }
      init();
      if (reduce) {
        step();
        running = false;
      } else {
        step();
      }
      const onResize = () => init();
      window.addEventListener('resize', onResize);
      const onVisibility = () => {
        if (document.hidden) {
          running = false;
          cancelAnimationFrame(raf);
        } else if (!reduce) {
          running = true;
          step();
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      cleanups.push(() => {
        running = false;
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibility);
      });
    }

    // body carousel + live panel
    (function () {
      const car = document.getElementById('carousel');
      if (!car) return;
      const slidesEls = car.querySelectorAll('#slides .slide');
      const dotsWrap = document.getElementById('dots');
      const insightText = document.getElementById('insightText');
      const trendTitle = document.getElementById('trendTitle');
      const trBase = document.getElementById('trBase');
      const trToday = document.getElementById('trToday');
      const trArea = document.getElementById('trArea');
      const trEvt = document.getElementById('trEvt');
      const trEvtRing = document.getElementById('trEvtRing');
      const SC = [
        { ins: "You slept 43 minutes longer than your 7-day average, and your recovery is higher today.", tt: "Recovery · last 7 days", base: [.5, .52, .48, .55, .5, .58, .6], today: [.55, .6, .58, .66, .62, .74, .84], ev: 6 },
        { ins: "Great run. Your heart rate stayed in your target zone and your glucose held stable.", tt: "Heart rate · today's run", base: [.3, .6, .8, .85, .78, .5, .35, .3], today: [.3, .66, .86, .9, .8, .42, .28, .24], ev: 5 },
        { ins: "Glucose stayed in range through your workout. Good fuelling.", tt: "Glucose · during workout", base: [.5, .55, .7, .62, .5, .6, .72, .6], today: [.5, .52, .55, .5, .48, .52, .5, .49], ev: 4 },
        { ins: "Your grilled chicken bowl raised glucose by 28 mg/dL, gentler than your usual lunch.", tt: "Glucose response · this meal", base: [.4, .5, .78, .9, .82, .66, .5, .44], today: [.4, .46, .6, .68, .62, .52, .45, .42], ev: 3 },
        { ins: "Focus mode: your room is calm, and your heart rate and HRV are holding steady.", tt: "Health signals · through the day", base: [.5, .48, .46, .5, .52, .5, .48], today: [.55, .6, .5, .64, .68, .6, .66], ev: 4 },
        { ins: "A restful night. Your sleep efficiency was 92%.", tt: "Sleep depth · last night", base: [.3, .7, .5, .8, .6, .85, .4, .2], today: [.35, .8, .55, .9, .7, .92, .45, .22], ev: 5 },
      ];
      function pts(a) {
        const n = a.length;
        let s = '';
        for (let i = 0; i < n; i++) s += (8 + i * (304 / (n - 1))).toFixed(1) + ',' + (110 - a[i] * 94).toFixed(1) + ' ';
        return s.trim();
      }
      function area(a) {
        const n = a.length;
        let d = 'M8,110 ';
        for (let i = 0; i < n; i++) d += 'L' + (8 + i * (304 / (n - 1))).toFixed(1) + ',' + (110 - a[i] * 94).toFixed(1) + ' ';
        return d + 'L312,110 Z';
      }
      let cur = 0, timer;
      const dots = [];
      dotsWrap.innerHTML = '';
      const dotClickHandlers = [];
      slidesEls.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Situation ' + (i + 1));
        if (i === 0) b.className = 'on';
        const handler = () => go(i, true);
        b.addEventListener('click', handler);
        dotClickHandlers.push([b, handler]);
        dotsWrap.appendChild(b);
        dots.push(b);
      });
      function render(i) {
        const s = SC[i];
        insightText.style.opacity = 0;
        trendTitle.style.opacity = 0;
        setTimeout(() => {
          insightText.textContent = s.ins;
          trendTitle.textContent = s.tt;
          insightText.style.opacity = 1;
          trendTitle.style.opacity = 1;
        }, 150);
        trBase.setAttribute('points', pts(s.base));
        trToday.setAttribute('points', pts(s.today));
        trArea.setAttribute('d', area(s.today));
        const a = s.today, n = a.length, ex = 8 + s.ev * (304 / (n - 1)), ey = 110 - a[s.ev] * 94;
        trEvt.setAttribute('cx', ex);
        trEvt.setAttribute('cy', ey);
        trEvtRing.setAttribute('cx', ex);
        trEvtRing.setAttribute('cy', ey);
      }
      function go(i, manual) {
        i = (i + SC.length) % SC.length;
        slidesEls[cur].classList.remove('active');
        dots[cur].classList.remove('on');
        cur = i;
        slidesEls[cur].classList.add('active');
        dots[cur].classList.add('on');
        render(cur);
        if (manual) reset();
      }
      function reset() {
        clearInterval(timer);
        if (!reduce) timer = setInterval(() => go(cur + 1), 6000);
      }
      const cprev = document.getElementById('cprev');
      const cnext = document.getElementById('cnext');
      const onPrev = () => go(cur - 1, true);
      const onNext = () => go(cur + 1, true);
      cprev.addEventListener('click', onPrev);
      cnext.addEventListener('click', onNext);
      const onMouseEnter = () => clearInterval(timer);
      const onMouseLeave = () => reset();
      car.addEventListener('mouseenter', onMouseEnter);
      car.addEventListener('mouseleave', onMouseLeave);
      render(0);
      reset();
      cleanups.push(() => {
        clearInterval(timer);
        cprev.removeEventListener('click', onPrev);
        cnext.removeEventListener('click', onNext);
        car.removeEventListener('mouseenter', onMouseEnter);
        car.removeEventListener('mouseleave', onMouseLeave);
        dotClickHandlers.forEach(([b, handler]) => b.removeEventListener('click', handler));
      });
    })();

    const form = document.getElementById('wl');
    let onSubmit;
    if (form) {
      onSubmit = (ev) => {
        ev.preventDefault();
        const email = document.getElementById('wl-email').value.trim();
        const note = document.getElementById('wl-note');
        const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
        if (!ok) {
          note.textContent = 'Enter a valid email to join.';
          note.classList.remove('wl-done');
          return;
        }
        form.style.display = 'none';
        note.innerHTML = '<span class="wl-done">You’re on the list.</span> We’ll be in touch as V1.1 gets close.';
      };
      form.addEventListener('submit', onSubmit);
      cleanups.push(() => form.removeEventListener('submit', onSubmit));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
