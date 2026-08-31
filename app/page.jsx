import ClientAnimations from './ClientAnimations';

/*
  NOTE ON IMAGES
  ---------------
  This redesign ships with zero external image assets — the "device + phone"
  visuals below (hero, features, etc.) are hand-built with HTML/CSS, the same
  approach the previous version of this page used. No product photography was
  found in the repo (no /public directory) and no image path was supplied, so
  nothing here depends on a file that might 404.

  To swap in real photography, the best drop-in spots are:
    1. .eco-visual in the hero — replace the two .device-shell / .phone-shell
       blocks with <img src="/images/hero-device.png" .../> and
       <img src="/images/hero-app.png" .../> (desk unit + phone, ideally shot
       together or on a matching background).
    2. .connect-card in "How the Ecosystem Connects" — a photo of the device's
       4 display modes and a few app screens would strengthen this section.
    3. .feat-card icons could become small screenshots for the two device
       features ("4 Display Modes", "Offline Alarms").
  Drop files in /public/images/ and reference them as /images/<file>.
*/

const pageMarkup = `<!-- ICON SPRITE -->
<svg style="display:none" aria-hidden="true">
  <symbol id="ic-cgm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>
    <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2"/>
  </symbol>
  <symbol id="ic-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 20l4-1L19 8l-3-3L5 16l-1 4z"/><path d="M14.5 5.5l3 3"/>
  </symbol>
  <symbol id="ic-camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13.4" r="3.4"/>
  </symbol>
  <symbol id="ic-activity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2.5 12h4l2-6.5 4 13 2-6.5h5"/>
  </symbol>
  <symbol id="ic-cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6.8 18a4.2 4.2 0 1 1 .5-8.37A5.6 5.6 0 0 1 17.9 9.1 4.4 4.4 0 0 1 17.2 18z"/>
  </symbol>
  <symbol id="ic-monitor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4.5" width="18" height="12" rx="2.2"/><path d="M8.5 20h7M12 16.5V20"/>
  </symbol>
  <symbol id="ic-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 5h16v11H9.5l-4 4V5z"/>
    <circle cx="9" cy="10.4" r="0.9" fill="currentColor" stroke="none"/><circle cx="12.5" cy="10.4" r="0.9" fill="currentColor" stroke="none"/><circle cx="16" cy="10.4" r="0.9" fill="currentColor" stroke="none"/>
  </symbol>
  <symbol id="ic-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5V11M10 19.5V5M16 19.5v-8"/><path d="M2.5 19.5h19"/>
  </symbol>
  <symbol id="ic-bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 10.2a6 6 0 1 1 12 0c0 4 1.5 5.3 1.5 5.3H4.5S6 14.2 6 10.2z"/><path d="M10 18.8a2 2 0 0 0 4 0"/>
  </symbol>
  <symbol id="ic-droplet" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3.2s6.2 7.3 6.2 11.3a6.2 6.2 0 1 1-12.4 0C5.8 10.5 12 3.2 12 3.2z"/>
  </symbol>
  <symbol id="ic-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </symbol>
  <symbol id="ic-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 5l7 7-7 7"/>
  </symbol>
  <symbol id="ic-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11.6 18.2h0.8" stroke-width="2"/>
  </symbol>
</svg>

<!-- NAV -->
<nav>
  <a class="logo" href="#">mytr<span>.ai</span></a>
  <div class="nav-links">
    <a href="#crisis">The Crisis</a>
    <a href="#ecosystem">The Ecosystem</a>
    <a href="#features">Features</a>
    <a class="nav-cta" href="#ecosystem">Explore →</a><a class="nav-cta nav-cta-apk" href="/downloads/mytr-ai.apk" download>Download APK ↓</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="eyebrow">Diabetes Technology · Made for India</div>
    <h1>Your metabolic health,<br>on your desk <em>and</em> in your pocket.</h1>
    <p class="hero-sub">Mytr.AI is one connected ecosystem: an always-on desk display and an AI-powered health app, sharing a single account. Built to make world-class diabetes care genuinely affordable and accessible for every Indian family.</p>
    <div class="hero-actions">
      <a class="btn-primary" href="/downloads/mytr-ai.apk" download>Download APK ↓</a>
      <a class="btn-ghost" href="#ecosystem">Explore the Ecosystem →</a>
    </div>
    <p class="apk-note">Android may ask you to allow installs from your browser the first time.</p>

    <div class="eco-panel fade-up d1">
      <div class="eco-visual">
        <div class="eco-node">
          <div class="device-shell">
            <div class="device-screen">
              <div class="device-mode-label">Glucose · Live</div>
              <div class="device-glucose">118</div>
              <div class="device-unit">mg/dL · steady</div>
              <div class="device-spark"><span></span><span></span><span></span><span></span><span></span><span></span></div>
            </div>
          </div>
          <div class="eco-caption">Desk Display</div>
        </div>

        <div class="eco-sync">
          <div class="sync-line"></div>
          <div class="sync-pill">One account · always in sync</div>
          <div class="sync-line"></div>
        </div>

        <div class="eco-node">
          <div class="phone-shell">
            <div class="phone-inner">
              <div class="phone-app-head"><span class="phone-app-badge"></span><span class="phone-app-name">mytr.ai</span></div>
              <div class="phone-ring"><div class="phone-ring-inner"><span class="phone-ring-val">87%</span><span class="phone-ring-lbl">In range</span></div></div>
              <div class="phone-row">
                <div class="phone-chip"><svg><use href="#ic-cgm"/></svg><span>CGM</span></div>
                <div class="phone-chip"><svg><use href="#ic-camera"/></svg><span>Food</span></div>
                <div class="phone-chip"><svg><use href="#ic-activity"/></svg><span>Health</span></div>
              </div>
              <div class="phone-chat">Ask the AI coach…</div>
            </div>
          </div>
          <div class="eco-caption">Mobile App</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- THE CRISIS -->
<section class="crisis-section" id="crisis">
  <div class="crisis-inner">
    <div class="section-head">
      <div class="section-chip">The Problem We're Solving</div>
      <h2 style="margin-bottom:0.9rem;">India's diabetes crisis is silent, and scattered.</h2>
      <p class="lead">77 million Indians live with diabetes. The tools to manage it well exist, but they're priced out of reach, and even for those who do track their health, the numbers end up scattered across a CGM app, a fitness tracker, and a food diary that never talk to each other.</p>
    </div>
    <div class="crisis-grid">
      <div class="stat-card sc-1 fade-up">
        <div class="stat-num">77M</div>
        <div class="stat-title">Indians living with diabetes</div>
        <div class="stat-body">One of the largest diabetic populations on earth, served by a system that was never built to reach all of them.</div>
      </div>
      <div class="stat-card sc-2 fade-up d1">
        <div class="stat-num">&lt;1%</div>
        <div class="stat-title">Access to gold-standard tools</div>
        <div class="stat-body">CGMs and connected care, considered standard elsewhere, remain out of reach for almost every Indian patient.</div>
      </div>
      <div class="stat-card sc-3 fade-up d2">
        <div class="stat-num">5+ apps</div>
        <div class="stat-title">Where a patient's data lives today</div>
        <div class="stat-body">Glucose in one app, food in another, steps in a third. Nothing connects, so nothing adds up to a full picture.</div>
      </div>
      <div class="stat-card sc-4 fade-up d3">
        <div class="stat-num">3× higher</div>
        <div class="stat-title">Risk of serious complications</div>
        <div class="stat-body">Without consistent visibility, the risk of blindness, kidney failure and amputation triples, and is largely preventable.</div>
      </div>
    </div>
    <p class="crisis-bridge">Mytr.AI exists to pull every one of those numbers back into <span>one account</span>, visible wherever you happen to look.</p>
  </div>
</section>

<!-- HOW THE ECOSYSTEM CONNECTS -->
<section class="connect-section" id="ecosystem">
  <div class="connect-inner">
    <div class="section-head">
      <div class="section-chip">How It Works</div>
      <h2 style="margin-bottom:0.9rem;">One account. Two surfaces.</h2>
      <p class="lead">The app and the desk device aren't two separate products, they're two views into the same account. Everything you feed in from your phone shows up on your desk, automatically.</p>
    </div>

    <div class="flow-row">
      <div class="flow-node fn-1 fade-up">
        <div class="flow-ic"><svg><use href="#ic-pencil"/></svg></div>
        <h3>You feed it</h3>
        <p>Connect a CGM, log manually, snap a meal photo, or sync your wearable.</p>
      </div>
      <div class="flow-arrow"><svg><use href="#ic-arrow"/></svg></div>
      <div class="flow-node fn-2 fade-up d1">
        <div class="flow-ic"><svg><use href="#ic-cloud"/></svg></div>
        <h3>The app is the hub</h3>
        <p>Every reading, meal and metric lands in your Mytr.AI account and becomes insight.</p>
      </div>
      <div class="flow-arrow"><svg><use href="#ic-arrow"/></svg></div>
      <div class="flow-node fn-3 fade-up d2">
        <div class="flow-ic"><svg><use href="#ic-monitor"/></svg></div>
        <h3>The device shows it</h3>
        <p>Your desk display pulls from that same account, always on and glanceable, even offline.</p>
      </div>
    </div>

    <div class="connect-cards">
      <div class="connect-card cc-app fade-up">
        <div class="connect-card-head">
          <div class="connect-card-ic"><svg><use href="#ic-phone"/></svg></div>
          <div><div class="connect-card-eyebrow">The App</div><h3>Your control center</h3></div>
        </div>
        <ul class="connect-list">
          <li><svg><use href="#ic-check"/></svg>Connect a CGM, or log glucose manually in seconds</li>
          <li><svg><use href="#ic-check"/></svg>Snap a photo to log food and estimate carbs automatically</li>
          <li><svg><use href="#ic-check"/></svg>Sync steps, sleep and HRV from your wearable</li>
          <li><svg><use href="#ic-check"/></svg>Ask the AI chatbot for plain-language coaching, anytime</li>
        </ul>
      </div>
      <div class="connect-card cc-device fade-up d1">
        <div class="connect-card-head">
          <div class="connect-card-ic"><svg><use href="#ic-monitor"/></svg></div>
          <div><div class="connect-card-eyebrow">The Device</div><h3>Your glanceable ally</h3></div>
        </div>
        <ul class="connect-list">
          <li><svg><use href="#ic-check"/></svg>Always-on desk screen, nothing to unlock or open</li>
          <li><svg><use href="#ic-check"/></svg>Switches between 4 display modes with one tap</li>
          <li><svg><use href="#ic-check"/></svg>Offline alarms for highs and lows, no wifi required</li>
          <li><svg><use href="#ic-check"/></svg>Reads from the same account as the app, zero extra setup</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="features-section" id="features">
  <div class="features-inner">
    <div class="section-head">
      <div class="section-chip">Everything In The Ecosystem</div>
      <h2 style="margin-bottom:0.9rem;">Built to cover the full picture.</h2>
      <p class="lead">Eight features, one connected system, app-first and device-backed.</p>
    </div>
    <div class="feat-grid">
      <div class="feat-card fade-up">
        <span class="feat-badge fb-app">App</span>
        <div class="feat-ic"><svg><use href="#ic-cgm"/></svg></div>
        <h3>Glucose Tracking</h3>
        <p>Real-time CGM feed or manual entry, with AI trend prediction so you see where you're headed.</p>
      </div>
      <div class="feat-card fade-up d1">
        <span class="feat-badge fb-app">App</span>
        <div class="feat-ic"><svg><use href="#ic-camera"/></svg></div>
        <h3>Food Photo → Carb AI</h3>
        <p>Snap a photo of your meal and get an instant carb and nutrition estimate, no manual lookup.</p>
      </div>
      <div class="feat-card fade-up d2">
        <span class="feat-badge fb-app">App</span>
        <div class="feat-ic"><svg><use href="#ic-activity"/></svg></div>
        <h3>Health Metrics</h3>
        <p>Steps, sleep and HRV pulled into one timeline alongside your glucose.</p>
      </div>
      <div class="feat-card fade-up d3">
        <span class="feat-badge fb-app">App</span>
        <div class="feat-ic"><svg><use href="#ic-droplet"/></svg></div>
        <h3>Water Tracking</h3>
        <p>Simple daily hydration logging with gentle reminders to keep you on track.</p>
      </div>
      <div class="feat-card fade-up">
        <span class="feat-badge fb-app">App</span>
        <div class="feat-ic"><svg><use href="#ic-chart"/></svg></div>
        <h3>Analytics &amp; Insights</h3>
        <p>Trends, patterns and weekly reports that turn raw numbers into decisions.</p>
      </div>
      <div class="feat-card fade-up d1">
        <span class="feat-badge fb-app">App</span>
        <div class="feat-ic"><svg><use href="#ic-chat"/></svg></div>
        <h3>AI Chatbot</h3>
        <p>Ask questions in plain language and get coaching grounded in your own data.</p>
      </div>
      <div class="feat-card fade-up d2">
        <span class="feat-badge fb-device">Device</span>
        <div class="feat-ic"><svg><use href="#ic-monitor"/></svg></div>
        <h3>4 Display Modes</h3>
        <p>Switch the desk display between glucose focus, trend graph, daily agenda and a minimal clock.</p>
      </div>
      <div class="feat-card fade-up d3">
        <span class="feat-badge fb-device">Device</span>
        <div class="feat-ic"><svg><use href="#ic-bell"/></svg></div>
        <h3>Offline Alarms</h3>
        <p>High and low alerts that still fire on the device, even without wifi or a phone nearby.</p>
      </div>
    </div>
  </div>
</section>

<!-- DOWNLOAD / CTA -->
<section class="cta-section" id="download">
  <div class="cta-inner">
    <div class="section-chip on-dark" style="position:relative;z-index:1;">Get Started</div>
    <h2>The future of diabetes care in India starts here.</h2>
    <p class="lead">Download the app to get started today, your account carries over to the desk display the moment it's set up.</p>
    <div class="cta-acts">
      <a class="btn-light" href="/downloads/mytr-ai.apk" download>Download the App ↓</a>
      <a class="btn-outline-w" href="mailto:hello@mytr.ai">Ask About the Desk Device</a>
    </div>
    <p class="apk-note">Android may ask you to allow installs from your browser the first time.</p>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ft-logo">mytr<span>.ai</span></div>
  <div class="ft-links">
    <a href="#crisis">The Crisis</a>
    <a href="#ecosystem">The Ecosystem</a>
    <a href="#features">Features</a>
    <a href="mailto:hello@mytr.ai">Contact</a>
  </div>
  <div class="ft-copy">Built with care in <span class="india">India</span> · © 2025 Mytr.AI</div>
</footer>`;

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <ClientAnimations />
    </>
  );
}
