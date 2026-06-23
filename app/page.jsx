import ClientAnimations from './ClientAnimations';

const pageMarkup = `<!-- NAV -->
<nav>
  <a class="logo" href="#"><span class="logo-dot"></span>Mytr<span>.AI</span></a>
  <div class="nav-links">
    <a href="#crisis">The Crisis</a>
    <a href="#app">The App</a>
    <a href="#mission">Mission</a>
    <a class="nav-cta" href="#app">Try the App →</a><a class="nav-cta nav-cta-apk" href="/downloads/mytr-ai.apk" download>Download APK ↓</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-label">Diabetes Technology · Made for India</div>
<h1>Diabetes care built for<br><em>every Indian.</em></h1>
  <p class="hero-sub">Mytr.AI is building technology to transform how India lives with diabetes. We are starting with an AI powered metabolic health app, with one goal: making world class care genuinely affordable and accessible.</p>
  <div class="hero-actions">
    <a class="btn-teal" href="#app">Try the Mytr.AI App →</a>
    <a class="btn-ghost" href="/downloads/mytr-ai.apk" download>Download APK ↓</a>
  </div>
  <p class="apk-note">Android may ask you to allow installs from your browser the first time.</p>
</section>

<!-- PROBLEM STRIP -->
<section class="problem-strip" id="crisis">
  <div class="problem-header">
    <div class="section-chip chip-coral">The Problem We're Solving</div>
    <h2 style="margin-bottom:0.75rem;">India's diabetes care crisis<br>is silent, and massive.</h2>
    <p class="lead" style="margin: 0 auto;">77 million Indians live with diabetes. The care that could transform their lives is locked behind an impossible price wall. We are here to change that.</p>
  </div>
  <div class="prob-grid">
    <div class="prob-card pc-blue fade-up">
      <div class="prob-stat">77M</div>
      <div class="prob-title">Indians living with diabetes</div>
      <div class="prob-body">One of the largest diabetic populations on earth, served by a healthcare system that was never built to reach all of them.</div>
    </div>
    <div class="prob-card pc-coral fade-up d1">
      <div class="prob-stat">₹3-5L</div>
      <div class="prob-title">Cost of modern diabetes care</div>
      <div class="prob-body">World class diabetes management is priced far beyond what the vast majority of Indian families could ever afford. It is a systemic failure of access.</div>
    </div>
    <div class="prob-card pc-amber fade-up d2">
      <div class="prob-stat">&lt;1%</div>
      <div class="prob-title">Access to gold-standard therapy</div>
      <div class="prob-body">The tools and therapies considered the clinical standard elsewhere in the world remain out of reach for almost every Indian patient.</div>
    </div>
    <div class="prob-card pc-violet fade-up d3">
      <div class="prob-stat">3× higher</div>
      <div class="prob-title">Risk of serious complications</div>
      <div class="prob-body">Without proper control, the risk of blindness, kidney failure, and amputation triples. These are outcomes that are largely preventable with the right care.</div>
    </div>
  </div>
</section>

<!-- APP SECTION -->
<section class="app-section" id="app">
  <div class="app-inner">
    <div class="section-chip chip-blue">Mytr.AI, The App</div>
    <h2>One app for every<br>health journey.</h2>
    <div class="app-grid">
      <div class="phone-outer fade-up">
        <div class="phone-shell">
          <div class="phone-inner">
            <div class="app-screen">
              <div class="app-head">
                <span class="app-logo-badge"></span>
                <span class="app-logo-name">Mytr<span>.AI</span></span>
              </div>
              <div class="app-eyebrow">Health. Intelligently.</div>
              <div class="app-hero-h">One app for every health journey.</div>
              <div class="app-hero-sub">From glucose to calories, coaching and fitness.</div>
              <div class="app-cards">
                <div class="app-mini-card amc-1"><div class="amc-title">CGM Live</div><div class="amc-sub">Real-time glucose</div></div>
                <div class="app-mini-card amc-2"><div class="amc-title">Calorie AI</div><div class="amc-sub">Photo meal scan</div></div>
                <div class="app-mini-card amc-3"><div class="amc-title">Bolus AI</div><div class="amc-sub">Smart dose calc</div></div>
                <div class="app-mini-card amc-4"><div class="amc-title">Fitness Coach</div><div class="amc-sub">Activity and sleep</div></div>
              </div>
              <div class="app-tags">
                <span>Weight tracking</span><span>Sleep insights</span><span>Stress tracking</span><span>XP and challenges</span>
              </div>
            </div>
            <div class="app-sheet">
              <div class="app-getstarted">Get Started, It's Free →</div>
              <div class="app-signin">Already have an account? <strong>Sign in</strong></div>
            </div>
          </div>
        </div>
        <div class="float1">
          <div class="fl-label">Calorie AI</div>
          <div class="fl-val1">1,840</div>
          <div class="fl-sub">kcal logged today</div>
        </div>
        <div class="float2">
          <div class="fl-label">Time in range</div>
          <div class="fl-val2">87%</div>
          <div class="fl-sub">Today · 4% better</div>
        </div>
      </div>

      <div class="fade-up d2">
        <p class="lead">From glucose management to calorie tracking, coaching and fitness, Mytr.AI adapts to your goals. It works just as well for people managing diabetes as for fitness enthusiasts who want to understand their metabolism and train smarter.</p>
        <div class="app-feats">
          <div class="app-feat">
            <div class="af-txt"><strong>CGM Live</strong><p>Real-time glucose tracking with AI trend prediction, so you see where your levels are heading before they get there.</p></div>
          </div>
          <div class="app-feat">
            <div class="af-txt"><strong>Calorie AI</strong><p>Snap a photo of your meal and log nutrition in seconds, with no tedious manual entry.</p></div>
          </div>
          <div class="app-feat">
            <div class="af-txt"><strong>Bolus AI</strong><p>Smart insulin dose suggestions based on your carbs, current glucose, and active insulin on board.</p></div>
          </div>
          <div class="app-feat">
            <div class="af-txt"><strong>Fitness Coach</strong><p>Activity, sleep, and recovery insights that adapt to your training, your goals, and your body.</p></div>
          </div>
        </div>
        <p style="font-size:0.82rem;color:var(--muted);margin-top:0.9rem;line-height:1.6;">Plus weight tracking, sleep and stress insights, and XP challenges to keep you motivated.</p>
        <div class="app-cta-box">
          <p>Available today, whether you are managing diabetes or optimising your fitness. Start logging glucose, meals, and activity, and let Mytr.AI begin learning your patterns from day one.</p>
          <a class="btn-blue" href="/downloads/mytr-ai.apk" download>Download the Mytr.AI App ↓</a>
          <p class="apk-note">Android may ask you to allow installs from your browser the first time.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MISSION -->
<section class="mission-section" id="mission">
  <div class="mission-inner">
    <div class="section-chip chip-violet">Why We Exist</div>
    <h2>A system that failed millions.<br>We're here to fix it.</h2>
    <div class="mission-cards">
      <div class="mc-card mc-teal fade-up">
        <div class="mc-title">The Access Gap</div>
        <div class="mc-body">Over 77 million Indians live with diabetes, yet the best tools to manage it are priced out of reach for nearly all of them, often costing more than a family earns in a year.</div>
      </div>
      <div class="mc-card mc-blue fade-up d1">
        <div class="mc-title">Built in India</div>
        <div class="mc-body">We believe technology for Indian patients should be built in India, for our climate, our infrastructure, and our healthcare realities, from first principles.</div>
      </div>
      <div class="mc-card mc-violet fade-up d2">
        <div class="mc-title">Affordable by Design</div>
        <div class="mc-body">Affordability isn't an afterthought. It is our starting point. Everything we work on is measured against one question: can an ordinary Indian family actually use it?</div>
      </div>
    </div>
  </div>
</section>

<!-- TEASER -->
<section class="teaser-section" id="approach">
  <div class="teaser-inner">
    <div class="section-chip chip-teal">What's Next</div>
    <h2 style="margin-bottom:1.1rem;">The app is just<br>the beginning.</h2>
    <p class="lead" style="margin:0 auto 1.5rem;">We are a team of engineers and clinicians working at the frontier of diabetes and metabolic health technology, building tools designed to make great care genuinely accessible across India.</p>
    <p class="lead" style="margin:0 auto;">Something bigger is on the way. We are not ready to share the details just yet, but we are moving fast, and we'd love for you to follow along.</p>
  </div>
</section>

<!-- CTA -->
<section class="cta-section" id="contact">
  <div class="section-chip chip-white" style="position:relative;z-index:1;margin-bottom:1.5rem;">Join the Movement</div>
  <h2 class="cta-h2">The future of diabetes care<br>in India starts here.</h2>
  <p class="cta-lead">Patient, clinician, investor, or believer, we'd love to have you with us.</p>
  <div class="cta-acts">
    <a class="btn-white" href="#app">Try the Mytr.AI App →</a>
    <a class="btn-outline-w" href="mailto:hello@mytr.ai">Contact the Team</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ft-logo">Mytr<span>.AI</span></div>
  <div class="ft-links">
    <a href="#crisis">The Crisis</a>
    <a href="#app">The App</a>
    <a href="#mission">Mission</a>
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
