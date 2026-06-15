import ClientAnimations from './ClientAnimations';

const pageMarkup = `<!-- NAV -->
<nav>
  <a class="logo" href="#"><span class="logo-dot"></span>Mytr<span>.AI</span></a>
  <div class="nav-links">
    <a href="#pump">The Pump</a>
    <a href="#app">App</a>
    <a href="#mission">Mission</a>
    <a class="nav-cta" href="#app">Try the App →</a><a class="nav-cta" href="/mytr-ai.apk" style="margin-left:8px;background:#f97316;" download>Download APK ↓</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-label">India's First Indigenous Insulin Pump</div>
<h1>Diabetes care built for<br><em>every Indian.</em></h1>
  <p class="hero-sub">Mytr.AI combines India's first indigenously engineered insulin pump with an AI-powered metabolic health app — making world-class diabetes management truly affordable and accessible.</p>
  <div class="hero-actions">
    <a class="btn-teal" href="#app">Try the Mytr.AI App →</a>
    <a class="btn-ghost" href="#pump">Meet the Insulin Pump</a>
  </div>
</section>

<!-- PROBLEM STRIP -->
<section class="problem-strip">
  <div class="problem-header">
    <div class="section-chip chip-coral">The Problem We're Solving</div>
    <h2 style="margin-bottom:0.75rem;">India's diabetes care crisis<br>is silent — and massive.</h2>
    <p class="lead" style="margin: 0 auto;">77 million Indians live with diabetes. The tools that could transform their care are locked behind an impossible price wall. We're breaking it.</p>
  </div>
  <div class="prob-grid">
    <div class="prob-card pc-coral fade-up" data-emoji="💸">
      <span class="prob-icon">💸</span>
      <div class="prob-stat">₹3–5L</div>
      <div class="prob-title">Cost of an imported insulin pump</div>
      <div class="prob-body">Medtronic, Roche, and Abbott pumps are priced beyond reach for over 99% of Indian families — a systemic failure of access that costs lives.</div>
    </div>
    <div class="prob-card pc-amber fade-up d1" data-emoji="💉">
      <span class="prob-icon">📉</span>
      <div class="prob-stat">&lt;1%</div>
      <div class="prob-title">Indians with access to pump therapy</div>
      <div class="prob-body">Despite pump therapy being the clinical gold standard for Type 1 diabetes, virtually no Indian patient can access it — multiple daily injections remain the only option.</div>
    </div>
    <div class="prob-card pc-violet fade-up d2" data-emoji="⚠️">
      <span class="prob-icon">🧬</span>
      <div class="prob-stat">3× higher</div>
      <div class="prob-title">Risk of complications without proper control</div>
      <div class="prob-body">Poor glucose management triples the risk of blindness, kidney failure, and limb amputation — all preventable with the right therapy, if only it were affordable.</div>
    </div>
    <div class="prob-card pc-blue fade-up d3" data-emoji="🏭">
      <span class="prob-icon">🔬</span>
      <div class="prob-stat">Zero</div>
      <div class="prob-title">Indigenous insulin pumps made in India</div>
      <div class="prob-body">Not a single insulin pump has ever been indigenously designed and manufactured in India. Every device is imported. Until now — Mytr.AI is changing that.</div>
    </div>
  </div>
</section>

<!-- PUMP SECTION -->
<section class="pump-section" id="pump">
  <div class="pump-inner">
    <div class="section-chip chip-teal">Mytr AI Insulin Pump</div>
    <h2>Precision insulin delivery,<br>engineered in India.</h2>
    <div class="pump-grid">
      <div class="fade-up">
        <p class="lead">Built from first principles — not licensed, not adapted. The Mytr AI Insulin Pump is designed for India's patients, India's climate, and India's healthcare system.</p>
        <ul class="feat-list">
          <li class="feat-item">
            <div class="feat-ic fi-t">⚙️</div>
            <div class="feat-txt">
              <strong>Precision Insulin Delivery</strong>
              <p>Medical-grade dosing accuracy, engineered to match the standard set by the world's best pumps.</p>
            </div>
          </li>
          <li class="feat-item">
            <div class="feat-ic fi-v">📡</div>
            <div class="feat-txt">
              <strong>Smart & Connected</strong>
              <p>Designed to work hand-in-hand with the Mytr.AI app for intelligent, guided diabetes management.</p>
            </div>
          </li>
          <li class="feat-item">
            <div class="feat-ic fi-a">🇮🇳</div>
            <div class="feat-txt">
              <strong>Designed for India</strong>
              <p>Built for India's climate, infrastructure, and healthcare realities — and made to be genuinely accessible.</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="pump-visual-wrap fade-up d2">
        <div class="pump-device-wrap">
          <div class="pump-device">
            <div class="pump-screen">
              <div class="psl psl1"></div>
              <div class="psl psl2"></div>
              <div class="psl psl3"></div>
            </div>
            <div class="pump-btns">
              <div class="pbtn"></div><div class="pbtn"></div><div class="pbtn"></div>
            </div>
            <div class="pump-cannula"></div>
          </div>
        </div>
        <p class="pump-label">Mytr AI Insulin Pump — Prototype in Development</p>
      </div>
    </div>
  </div>
</section>

<!-- APP SECTION -->
<section class="app-section" id="app">
  <div class="app-inner">
    <div class="section-chip chip-blue">Mytr.AI — The App</div>
    <h2>Your metabolic health,<br>intelligently managed.</h2>
    <div class="app-grid">
      <div class="phone-outer fade-up">
        <div class="phone-shell">
          <div class="phone-inner">
            <div class="app-topbar">
              <div class="atb-greet">Good morning,</div>
              <div class="atb-name">Arjun 👋</div>
            </div>
            <div class="gluco-widget">
              <div>
                <div class="gw-lbl">Current Glucose</div>
                <div class="gw-val">112</div>
                <div class="gw-unit">mg/dL</div>
              </div>
              <div class="gw-badge">↗ In Range</div>
            </div>
            <div class="chart-wrap">
              <div class="c-label">Last 6 hours</div>
              <div class="bars">
                <div class="bar bar-lo" style="height:50%"></div>
                <div class="bar bar-lo" style="height:64%"></div>
                <div class="bar bar-hi" style="height:82%"></div>
                <div class="bar bar-hi" style="height:90%"></div>
                <div class="bar bar-hi" style="height:77%"></div>
                <div class="bar bar-lo" style="height:60%"></div>
                <div class="bar bar-hi" style="height:72%"></div>
                <div class="bar bar-hi" style="height:84%"></div>
              </div>
            </div>
            <div class="metrics-row">
              <div class="metric-cell"><div class="mc-lbl">Time in Range</div><div class="mc-val t">87%</div></div>
              <div class="metric-cell"><div class="mc-lbl">HbA1c Est.</div><div class="mc-val b">6.4%</div></div>
              <div class="metric-cell"><div class="mc-lbl">Active IOB</div><div class="mc-val v">1.2U</div></div>
            </div>
            <div class="ai-chip">
              <div class="ai-chip-icon">🧠</div>
              <div>
                <div class="ai-chip-text">AI suggests +0.3U correction</div>
                <div class="ai-chip-sub">Based on your pattern &amp; meal log</div>
              </div>
            </div>
            <div class="bolus-btn">Calculate Bolus →</div>
          </div>
        </div>
        <div class="float1">
          <div class="fl-label">AI Insight</div>
          <div class="fl-val1">+0.3 U</div>
          <div class="fl-sub">Suggested correction</div>
        </div>
        <div class="float2">
          <div class="fl-label">Time in range</div>
          <div class="fl-val2">87%</div>
          <div class="fl-sub">Today · ↑ 4%</div>
        </div>
      </div>

      <div class="fade-up d2">
        <p class="lead">Mytr.AI gives every person with diabetes the intelligence of a specialist in their pocket — tracking glucose, predicting trends, guiding dosing, and connecting to the Mytr AI Insulin Pump.</p>
        <div class="app-feats">
          <div class="app-feat">
            <div class="af-ic t">📊</div>
            <div class="af-txt"><strong>Real-time Glucose Intelligence</strong><p>CGM-synced tracking with AI trend prediction — know what your glucose will do before it happens.</p></div>
          </div>
          <div class="app-feat">
            <div class="af-ic b">💉</div>
            <div class="af-txt"><strong>Smart Bolus Calculator</strong><p>Personalised recommendations based on your carbs, current glucose, sensitivity factor, and active insulin on board.</p></div>
          </div>
          <div class="app-feat">
            <div class="af-ic v">🧠</div>
            <div class="af-txt"><strong>Adaptive AI Learning</strong><p>Learns your patterns — meals, activity, sleep — and continuously refines its guidance to match your body uniquely.</p></div>
          </div>
          <div class="app-feat">
            <div class="af-ic a">🔗</div>
            <div class="af-txt"><strong>Mytr AI Pump Control</strong><p>Wireless control of your insulin pump directly from the app — adjust basals, deliver boluses, review dose history.</p></div>
          </div>
        </div>
        <div class="app-cta-box">
          <p>Available today — no pump required. Start logging glucose, meals, and insulin, and let Mytr.AI begin learning your patterns from day one.</p>
          <a class="btn-blue" href="#">Start Using Mytr.AI Free →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MISSION -->
<section class="mission-section" id="mission">
  <div class="mission-inner">
    <div class="section-chip chip-violet">Why We Exist</div>
    <h2>A system that failed millions.<br>We're fixing it.</h2>
    <div class="mission-cards">
      <div class="mc-card mc-teal fade-up">
        <span class="mc-emoji">🏥</span>
        <div class="mc-title">The Access Gap</div>
        <div class="mc-body">Over 77 million Indians live with diabetes, yet insulin pump therapy is inaccessible to nearly all of them. Imported pumps cost ₹3–5 lakhs — more than most families earn in a year.</div>
      </div>
      <div class="mc-card mc-blue fade-up d1">
        <span class="mc-emoji">🔬</span>
        <div class="mc-title">Indigenous Engineering</div>
        <div class="mc-body">The Mytr AI Insulin Pump is built from first principles in India — not licensed or adapted. Every component, algorithm, and design decision is made for the Indian patient and context.</div>
      </div>
      <div class="mc-card mc-violet fade-up d2">
        <span class="mc-emoji">🤝</span>
        <div class="mc-title">Software + Hardware</div>
        <div class="mc-body">The Mytr.AI app and Mytr AI Insulin Pump are one integrated system — intelligence and delivery working together for better outcomes, at every economic level.</div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="section-chip chip-white" style="position:relative;z-index:1;margin-bottom:1.5rem;">Join the Movement</div>
  <h2 class="cta-h2">The future of diabetes care<br>in India starts here.</h2>
  <p class="cta-lead">Patient, clinician, investor, or believer — we'd love to have you with us.</p>
  <div class="cta-acts">
    <a class="btn-white" href="#app">Try the Mytr.AI App →</a>
    <a class="btn-outline-w" href="mailto:hello@mytr.ai">Contact the Team</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ft-logo">Mytr<span>.AI</span></div>
  <div class="ft-links">
    <a href="#pump">Insulin Pump</a>
    <a href="#app">App</a>
    <a href="#mission">Mission</a>
    <a href="mailto:hello@mytr.ai">Contact</a>
  </div>
  <div class="ft-copy">Made with ❤️ in <span class="india">India</span> · © 2025 Mytr.AI</div>
</footer>`;

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <ClientAnimations />
    </>
  );
}
