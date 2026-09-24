import SiteScript from './SiteScript';

/*
  V1.1 rebuild — ported from a standalone static site (mytr-site/, see
  README there) authored outside this repo. Markup/CSS/JS structure is
  kept 1:1 with that source so future updates from the same source can
  be re-pasted with minimal diff:
    - assets/img/*, favicon.png, logo-mask.png -> public/assets/
    - assets/styles.css -> app/globals.css (only change: literal
      "DM Sans"/"Manrope" font-family strings swapped for the
      var(--font-dm-sans)/var(--font-manrope) custom properties that
      next/font/google injects in layout.js, and the CSS mask url()
      for the logo mark made root-relative since it now lives in a
      Next-bundled stylesheet rather than being loaded from assets/)
    - assets/app.js -> ./SiteScript.jsx (dangerouslySetInnerHTML does
      not execute <script> tags, so this had to become a real client
      component; logic is otherwise unchanged)

  NOTE: this version has no /downloads/mytr-ai.apk button anywhere —
  it replaces the app-download CTA with a waitlist form. That's a
  deliberate content change from the source file, not an omission
  introduced here.
*/

const pageMarkup = `<div class="galaxy" aria-hidden="true">
  <div class="stars"></div>
  <div class="aurora"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div><div class="blob b4"></div></div>
  <canvas id="field"></canvas>
</div>

<!-- NAV -->
<header class="nav" id="nav">
  <div class="wrap nav-in">
    <a href="#top" class="brand"><span class="logo-mark"></span>mytr.ai</a>
    <nav class="nav-links">
      <a href="#product">Product</a><a href="#how">How it works</a><a href="#body">Health intelligence</a><a href="#home">For your home</a><a href="#vision">Vision</a>
    </nav>
    <div class="nav-cta"><a href="/downloads/mytr-ai.apk" download class="btn btn-secondary">Download APK ↓</a><a href="#waitlist" class="btn btn-primary">Join the waitlist</a></div>
  </div>
</header>

<!-- HERO -->
<section class="s-dark hero">
  <div class="wrap hero-center">
    <p class="eyebrow">Your health, one interface</p>
    <h1>Understand your body.<br><span class="sub">Improve how you live.</span></h1>
    <p class="lead">One intelligent health interface that brings together your body, your habits, and the environment around you. It makes sense of how they move together.</p>
    <div class="hero-cta">
      <a href="/downloads/mytr-ai.apk" download class="btn btn-primary">Download APK ↓</a>
      <a href="#product" class="btn btn-secondary">Explore the product</a>
      <a href="#waitlist" class="btn btn-secondary">Join the waitlist</a>
    </div>
    <p class="hero-note"><span class="lv"></span> V1.1 · a physical health intelligence device, plus a companion app</p>
    <p class="apk-note">Android may ask you to allow installs from your browser the first time.</p>

    <div class="stage" aria-hidden="true">
      <div class="uglow blue"></div><div class="uglow red"></div>
      <div class="orbits">
        <svg viewBox="0 0 460 300">
          <g class="ring-a"><ellipse cx="230" cy="150" rx="226" ry="132" fill="none" stroke="rgba(10,108,255,.16)" stroke-width="1" stroke-dasharray="2 9"/><circle cx="456" cy="150" r="2.6" fill="#0A6CFF"/></g>
          <g class="ring-b"><ellipse cx="230" cy="150" rx="176" ry="98" fill="none" stroke="rgba(255,51,85,.16)" stroke-width="1" stroke-dasharray="1 10"/><circle cx="54" cy="150" r="2.4" fill="#FF3355"/></g>
        </svg>
      </div>
      <img class="render" src="/assets/img/hero-device.webp" alt="mytr desk device showing the health dashboard">
    </div>
  </div>
</section>

<!-- PROBLEM -->
<section class="s-white pad-y">
  <div class="wrap">
    <p class="eyebrow">The problem</p>
    <div class="prob-grid">
      <div>
        <h2 class="prob-head reveal">Your health is scattered across your life.</h2>
        <div class="scatter reveal">
          <span class="chip"><i></i>Apple Health</span><span class="chip"><i></i>Garmin</span><span class="chip"><i></i>Fitbit</span>
          <span class="chip"><i></i>Oura</span><span class="chip"><i></i>Whoop</span><span class="chip"><i></i>Samsung Health</span>
          <span class="chip"><i></i>CGM</span><span class="chip"><i></i>Food log</span><span class="chip"><i></i>Air quality</span>
        </div>
      </div>
      <div class="scene reveal">
        <img src="/assets/img/problem-scene.webp" alt="A bedside table with the mytr device, a phone, a smartwatch, an air-quality monitor and a sensor, each showing separate health data">
      </div>
    </div>
    <p class="statement reveal">Your body doesn't experience them separately. <span class="q">Why should you?</span></p>
  </div>
</section>

<!-- PRODUCT -->
<section class="s-white pad-y" id="product" style="padding-top:0;">
  <div class="wrap">
    <div class="head" style="max-width:680px;">
      <p class="eyebrow">The device</p>
      <h2>One screen. Your whole health picture.</h2>
      <p class="lead">Every source you already use flows into one place. mytr reads your body, your behaviour, and your environment continuously, and resolves it into a single living display.</p>
    </div>
    <div class="info-wrap">
      <div class="uglow blue"></div><div class="uglow red"></div>
      <img class="info-render reveal" src="/assets/img/connected-screen.webp" alt="mytr screen connecting sleep, glucose, HRV, activity, and environment sources">
    </div>

    <div class="band">
      <div class="bstage">
        <div class="uglow blue"></div>
        <img class="band-render reveal" src="/assets/img/device-phone.webp" alt="mytr desk device and companion phone app">
      </div>
      <div>
        <p class="eyebrow">On your desk, and in your pocket</p>
        <h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);">A calm display at home. The full picture on your phone.</h2>
        <p class="lead" style="margin-top:14px;">The desk device keeps your health visible in the moments that matter. The companion app carries the same intelligence with you, everywhere.</p>
      </div>
    </div>
  </div>
</section>

<!-- BODY -->
<section class="s-grey pad-y" id="body">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Body</p>
      <h2>Know what your body is doing.</h2>
      <p class="lead">Every metric is read against your own history, so a good day and an off day actually look different.</p>
    </div>
    <div class="body-live">
      <div class="carousel" id="carousel">
        <div class="slides" id="slides">
          <div class="slide active"><img src="/assets/img/carousel-1-morning.webp" alt="Waking up at home, the mytr display showing recovery and sleep"><div class="scrim"></div><span class="ctx">Morning at home</span></div>
          <div class="slide"><img src="/assets/img/carousel-2-run.webp" alt="An outdoor run tracked on phone and display"><div class="scrim"></div><span class="ctx">During your run</span></div>
          <div class="slide"><img src="/assets/img/carousel-3-gym.webp" alt="A gym workout with CGM and live glucose on the display"><div class="scrim"></div><span class="ctx">At the gym</span></div>
          <div class="slide"><img src="/assets/img/carousel-4-meal.webp" alt="A meal with the glucose response shown on the display"><div class="scrim"></div><span class="ctx">After your meal</span></div>
          <div class="slide"><img src="/assets/img/carousel-5-work.webp" alt="Working at a desk with focus mode and environment data"><div class="scrim"></div><span class="ctx">While you work</span></div>
          <div class="slide"><img src="/assets/img/carousel-6-sleep.webp" alt="Sleeping at night with sleep and environment monitoring"><div class="scrim"></div><span class="ctx">While you sleep</span></div>
        </div>
        <button class="cnav prev" id="cprev" aria-label="Previous situation">&#8249;</button>
        <button class="cnav next" id="cnext" aria-label="Next situation">&#8250;</button>
        <div class="dots" id="dots"></div>
      </div>

      <div class="live-panel">
        <div class="insight-card">
          <span class="badge">Aarna insight</span>
          <p id="insightText">Your recovery is 9% higher than your 30-day baseline.</p>
        </div>
        <div class="metrics4">
          <div class="m"><div class="k">Sleep</div><div class="v">7h 28m</div></div>
          <div class="m"><div class="k">HRV</div><div class="v">68 <small>ms</small></div></div>
          <div class="m"><div class="k">Recovery</div><div class="v">84</div></div>
          <div class="m"><div class="k r">Resting HR</div><div class="v">58 <small>bpm</small></div></div>
        </div>
        <div class="trend">
          <div class="trend-top"><span class="trend-title" id="trendTitle">Recovery · last 7 days</span><span class="trend-legend"><i class="base"></i>baseline<i class="today"></i>today</span></div>
          <svg class="trend-svg" viewBox="0 0 320 120" preserveAspectRatio="none">
            <path class="area" id="trArea"></path>
            <polyline class="base" id="trBase"></polyline>
            <polyline class="today" id="trToday"></polyline>
            <circle class="evtring" id="trEvtRing" r="6"></circle>
            <circle class="evt" id="trEvt" r="3"></circle>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ENVIRONMENT -->
<section class="s-dark pad-y" id="home">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Environment</p>
      <h2>Because your environment is part of your biology.</h2>
      <p class="lead">The room you sleep in shapes how you recover. mytr reads it continuously and connects it back to your body.</p>
    </div>
    <div class="room-grid">
      <div class="envstage">
        <div class="uglow blue"></div><div class="uglow red"></div>
        <img class="env-render" src="/assets/img/device-front.webp" alt="mytr desk device sensing the room">
      </div>
      <div class="room">
        <div class="cellx"><div class="v num">24°C</div><div class="k">Temperature</div></div>
        <div class="cellx"><div class="v num">52%</div><div class="k">Humidity</div></div>
        <div class="cellx"><div class="v"><b>Good</b></div><div class="k">Air quality</div></div>
        <div class="cellx"><div class="v num">780</div><div class="k">CO₂ ppm</div></div>
        <div class="cellx"><div class="v num">32</div><div class="k">Noise dB</div></div>
        <div class="cellx"><div class="v"><b>Low</b></div><div class="k">Light</div></div>
      </div>
    </div>
    <div class="env-note"><span class="badge">Pattern</span><span>Your best sleep this month came on nights your bedroom stayed between 23-25°C.</span></div>
  </div>
</section>

<!-- CORRELATION -->
<section class="s-white pad-y" id="how">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Correlation engine</p>
      <h2>See what your data can't show you alone.</h2>
      <p class="lead">Single metrics tell you what happened. mytr traces how one thing led to the next, across body, behaviour, and environment.</p>
    </div>
    <div class="chains">
      <div class="chain">
        <h3>An ordinary late dinner</h3>
        <div class="step"><span class="node">Late dinner</span><span class="tag">behaviour</span></div>
        <div class="flow"></div>
        <div class="step"><span class="node">Higher glucose response</span><span class="tag">glucose</span></div>
        <div class="flow"></div>
        <div class="step"><span class="node">Later sleep onset</span><span class="tag">sleep</span></div>
        <div class="flow"></div>
        <div class="step"><span class="node">Lower overnight HRV</span><span class="tag">body</span></div>
        <div class="flow"></div>
        <div class="step"><span class="node">Lower recovery</span><span class="tag">recovery</span></div>
      </div>
      <div class="chain">
        <h3>A warm, stuffy room</h3>
        <div class="step"><span class="node">Poor air quality</span><span class="tag">environment</span></div>
        <div class="plus">+</div>
        <div class="step"><span class="node">Higher bedroom temperature</span><span class="tag">environment</span></div>
        <div class="flow"></div>
        <div class="step"><span class="node">More sleep disturbance</span><span class="tag">sleep</span></div>
        <div class="flow"></div>
        <div class="step"><span class="node">Lower recovery</span><span class="tag">recovery</span></div>
      </div>
    </div>
    <p class="disclaimer">These insights describe patterns and associations in your personal data. They are not medical diagnoses.</p>
  </div>
</section>

<!-- AI · AARNA -->
<section class="s-dark pad-y">
  <div class="wrap ai-head">
    <div class="ai-orb" aria-hidden="true"><span class="r1"></span><span class="r2"></span><span class="core"></span></div>
    <div class="eq" aria-hidden="true"></div>
    <p class="eyebrow">Meet Aarna</p>
    <h2 style="font-size:clamp(1.9rem,4.2vw,3rem);">Ask Aarna anything.</h2>
    <p class="lead" style="margin:14px auto 0;">Aarna is the intelligence inside mytr. Ask a plain question, get a clear answer grounded in your own data.</p>
  </div>
  <div class="wrap">
    <div class="chat" id="chat">
      <div class="msg you"><div class="who">You</div><div class="bubble">Why have I been sleeping badly this week?</div></div>
      <div class="msg ai"><div class="who">Aarna</div><div class="bubble">Your sleep is down 52 minutes against your 30-day average. Three things stand out:
        <ul><li>You've gone to bed about an hour later than usual.</li><li>Caffeine has shifted roughly 2 hours later in the day.</li><li>Your bedroom has run 2.1°C warmer on average.</li></ul></div></div>
      <div class="msg you"><div class="who">You</div><div class="bubble">What should I change first?</div></div>
      <div class="msg ai"><div class="who">Aarna</div><div class="bubble">Start with bedtime. It has the strongest association with your recent recovery decline. The room temperature is worth fixing next.</div></div>
    </div>
  </div>
</section>

<!-- VISION -->
<section class="s-grey pad-y" id="vision">
  <div class="wrap center-col">
    <p class="eyebrow">Our vision</p>
    <h2 class="cta-head">Your biology is telling a story.</h2>
    <p class="lead" style="margin:16px auto 0;">We're building the interface that helps you understand it. Starting with your body and your home today, and working toward health technology that becomes more predictive, personalised, and proactive over time.</p>
    <div class="roadmap">
      <svg viewBox="0 0 560 50" aria-hidden="true">
        <line class="rl" x1="50" y1="25" x2="280" y2="25"/>
        <line class="rd" x1="280" y1="25" x2="510" y2="25"/>
        <circle cx="50" cy="25" r="6" fill="#0A6CFF"/>
        <circle cx="280" cy="25" r="6" fill="#fff" stroke="#0A6CFF" stroke-width="1.5"/>
        <circle cx="510" cy="25" r="4" fill="none" stroke="#86868b" stroke-width="1.5"/>
      </svg>
    </div>
    <div class="rm-labels"><span>Today · understand</span><span>Next · act</span></div>
  </div>
</section>

<!-- WAITLIST -->
<section class="s-white pad-y" id="waitlist">
  <div class="wrap center-col">
    <h2 style="font-size:clamp(1.8rem,4vw,2.5rem);">Understand the system you live in.</h2>
    <p class="lead" style="margin:16px auto 28px;">Join the waitlist for early access to mytr V1.1.</p>
    <form class="waitlist" id="wl" novalidate>
      <input type="email" id="wl-email" placeholder="you@email.com" aria-label="Email address" required>
      <button type="submit" class="btn btn-primary">Join</button>
    </form>
    <p class="wl-note" id="wl-note">V1.1 coming soon.</p>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="#top" class="brand"><span class="logo-mark"></span>mytr.ai</a>
        <p>An intelligence layer for your body, your habits, and the environment you live in.</p>
      </div>
      <div class="foot-col"><h4>Product</h4><a href="#product">The device</a><a href="#body">Health intelligence</a><a href="#how">Correlation</a><a href="#home">Environment</a></div>
      <div class="foot-col"><h4>Company</h4><a href="#vision">Vision</a><a href="#top">About</a><a href="#top">Research</a><a href="#top">Contact</a></div>
      <div class="foot-col"><h4>Resources</h4><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Data &amp; security</a><a href="#top">FAQs</a></div>
      <div class="foot-col"><h4>Follow</h4><a href="#top">LinkedIn</a><a href="#top">Instagram</a><a href="#top">X</a><a href="#top">YouTube</a></div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 mytr.ai</span>
      <span class="disclaim-line">Not intended to diagnose, treat, cure, or prevent any disease.</span>
    </div>
  </div>
</footer>`;

export default function Home() {
  return (
    <>
      <div id="top" dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <SiteScript />
    </>
  );
}
