import ClientAnimations from './ClientAnimations';

const pageMarkup = `<!-- NAV -->
<nav>
  <a class="logo" href="#"><span class="logo-dot"></span>Mytr<span>.AI</span></a>
  <div class="nav-links">
    <a href="#pump">The Pump</a>
    <a href="#research">Research</a>
    <a href="#app">App</a>
    <a href="#mission">Mission</a>
    <a class="nav-cta" href="#app">Try the App →</a><a class="nav-cta" href="/mytr-ai.apk" style="margin-left:8px;background:#f97316;" download>Download APK ↓</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
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
    <h2>Precision insulin delivery.<br>Indian engineering. ₹30,000.</h2>
    <div class="pump-grid">
      <div class="fade-up">
        <p class="lead">Built from first principles — not licensed, not adapted. The Mytr AI Insulin Pump is designed for India's patients, India's climate, and India's healthcare system.</p>
        <div class="price-row">
          <div class="price-pill pp-our">
            <span class="pp-num">₹30K</span>
            <div class="pp-label">Mytr AI Pump — target price</div>
          </div>
          <div class="price-pill pp-theirs">
            <span class="pp-num">₹3–5L</span>
            <div class="pp-label">Imported pumps today</div>
          </div>
        </div>
        <ul class="feat-list">
          <li class="feat-item">
            <div class="feat-ic fi-t">⚙️</div>
            <div class="feat-txt">
              <strong>BLDC Motor Precision</strong>
              <p>Maxon EC 9.2 BLDC motor with 256:1 planetary gearhead — 0.025 U/hr minimum basal rate, medical-grade accuracy without imported pricing.</p>
            </div>
          </li>
          <li class="feat-item">
            <div class="feat-ic fi-b">🛡️</div>
            <div class="feat-txt">
              <strong>CDSCO-first Regulatory Strategy</strong>
              <p>Regulatory pathway designed for India from day one — not retrofitted from international approvals — ensuring faster, compliant local clearance.</p>
            </div>
          </li>
          <li class="feat-item">
            <div class="feat-ic fi-v">📡</div>
            <div class="feat-txt">
              <strong>CGM-ready Architecture</strong>
              <p>Foundation built for closed-loop CGM integration — the path toward fully automated insulin delivery for Indian patients.</p>
            </div>
          </li>
          <li class="feat-item">
            <div class="feat-ic fi-a">🇮🇳</div>
            <div class="feat-txt">
              <strong>Designed for Indian Conditions</strong>
              <p>Humidity, temperature extremes, power variability, and India's healthcare infrastructure all factored into every design decision.</p>
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
        <table class="specs-table">
          <tr><td>Motor</td><td>Maxon EC 9.2 BLDC</td></tr>
          <tr><td>Gear ratio</td><td>~256:1</td></tr>
          <tr><td>Min. basal rate</td><td>0.025 U/hr</td></tr>
          <tr><td>Drive resolution</td><td>0.098 µL/step</td></tr>
          <tr><td>Device lifespan</td><td>4 years</td></tr>
          <tr><td>Connectivity</td><td>BLE + 900 MHz</td></tr>
          <tr><td>Regulatory target</td><td>CDSCO Class C</td></tr>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- RESEARCH TIMELINE -->
<section class="research-section" id="research">
  <div class="research-inner">
    <div class="research-top">
      <div>
        <div class="section-chip chip-amber">Development Progress</div>
        <h2>Where we are,<br>and where we're going.</h2>
        <p class="lead" style="margin-top:1rem;">A transparent look at our R&D milestones — from teardown analysis through to CDSCO submission.</p>
      </div>
      <div class="r-right fade-up">
        <div class="r-stat-card"><span class="r-stat-num">Phase 3</span><div class="r-stat-label">Currently in prototype development</div></div>
        <div class="r-stat-card"><span class="r-stat-num">15 mo.</span><div class="r-stat-label">Target to MVP from today</div></div>
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.2rem 1.4rem;">
          <div class="r-stat-label" style="margin-bottom:0.6rem;">Active grant targets</div>
          <div class="grant-row">
            <span class="grant-pill hot">BIRAC BIG</span>
            <span class="grant-pill hot">SISFS</span>
            <span class="grant-pill">KA ELEVATE</span>
            <span class="grant-pill">JDRF</span>
          </div>
        </div>
      </div>
    </div>
    <div class="timeline-track fade-up">
      <div class="tl-spine"></div>
      <div class="tl-fill"></div>
      <div class="tl-item done">
        <div class="tl-dot-abs"></div>
        <div class="tl-phase">Phase 1</div>
        <div class="tl-title">Hardware Teardown & Analysis</div>
        <div class="tl-note">Full teardown of Medtronic MiniMed Paradigm. Motor, gearhead, lead screw, reservoir, and drive chassis fully characterised from first principles.</div>
        <span class="tl-badge tb-done">✓ Complete</span>
      </div>
      <div class="tl-item done">
        <div class="tl-dot-abs"></div>
        <div class="tl-phase">Phase 2</div>
        <div class="tl-title">System Architecture & Full BOM</div>
        <div class="tl-note">Complete Bill of Materials developed. MCU selection, TMC6300-LA motor driver, wireless stack, power subsystem, display, and firmware architecture all defined.</div>
        <span class="tl-badge tb-done">✓ Complete</span>
      </div>
      <div class="tl-item active">
        <div class="tl-dot-abs"></div>
        <div class="tl-phase">Phase 3 — Current</div>
        <div class="tl-title">Prototype Development</div>
        <div class="tl-note">PCB design, embedded firmware development, and mechanical chassis fabrication underway. First functional prototype target: 6 months.</div>
        <span class="tl-badge tb-active">⬤ In Progress</span>
      </div>
      <div class="tl-item">
        <div class="tl-dot-abs"></div>
        <div class="tl-phase">Phase 4</div>
        <div class="tl-title">Bench Testing & Validation</div>
        <div class="tl-note">Dose accuracy, occlusion detection, RF noise, thermal, and EMI testing to IEC 60601-1 and IEC 62133.</div>
        <span class="tl-badge tb-next">Upcoming</span>
      </div>
      <div class="tl-item">
        <div class="tl-dot-abs"></div>
        <div class="tl-phase">Phase 5</div>
        <div class="tl-title">CDSCO Submission & Approval</div>
        <div class="tl-note">Clinical evaluation, CDSCO Class C regulatory application, and approval for Indian market launch.</div>
        <span class="tl-badge tb-next">Upcoming</span>
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
    <a href="#research">Research</a>
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
