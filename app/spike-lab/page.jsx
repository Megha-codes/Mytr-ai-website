import SpikeLabScript from './SpikeLabScript';
import './spike-lab.css';

/*
  Spike Lab — ported from a standalone single-file HTML app (originally
  published as a Claude.ai Artifact) into its own route on the main
  mytr.ai Next.js site, so it shares the real site navbar/footer
  (app/components/Nav.jsx, app/components/Footer.jsx, rendered from
  app/layout.js) instead of carrying its own copies.

  What changed from the original single-file app, and why:
    - Its own <header class="nav">/<footer> markup was removed; the
      shared site Nav/Footer render around it instead (via layout.js).
    - Its CSS (spike-lab.css) was mechanically scoped so every selector
      is prefixed with ".spike-lab-page" (see scope-css.js used to do
      this) — the original stylesheet declares plain classes like
      .nav/.brand/.btn/.nav-links for its own removed header, which
      otherwise collide by name with the shared Nav/Footer's identical
      class names. Its @keyframes were also renamed (sl-*) to avoid
      clashing with the main site's own keyframes of the same name, and
      literal "DM Sans"/"Manrope" font-family strings were swapped for
      the var(--font-dm-sans)/var(--font-manrope) custom properties the
      self-hosted next/font setup in layout.js already provides — so
      this route needs no separate Google Fonts <link>.
    - Its <script> (a single big IIFE) becomes a real client component,
      ./SpikeLabScript.jsx, for the same dangerouslySetInnerHTML-can't-
      run-<script>-tags reason as the home page's SiteScript.jsx. Unlike
      that one, it isn't wrapped in cleanup logic: every internal link
      to/from this route is a plain <a> (not next/link), matching this
      repo's existing convention of full page loads for navigation, so
      the script's whole lifetime is exactly one real page load, same
      as it was as a standalone static file.

  Two optional Claude.ai-only features degrade on their own with no
  code changes needed: the meal-photo detector and the community
  database (submitted foods/CGM readings) both check for `window.claude`
  at startup and show a plain explanatory message instead of breaking
  when it isn't present, which it won't be for ordinary site visitors.
  Everything else — the plate builder, the ~9,000-food database (its own
  curated set plus the bundled USDA table), glucose-curve predictions,
  swap suggestions, food detail pages, food zones, and the science/open
  source sections — is plain client-side JS/SVG with no dependency on
  that runtime, and works exactly as it did standalone. The code already
  exposes window.SpikeLab (a small public API) and
  SpikeLab.registerDetector(...) / window.SpikeLabStorage as extension
  points for wiring up a real food-photo model and a real database if
  that's wanted later — see the comments in SpikeLabScript.jsx.
*/

export const metadata = {
  title: 'Spike Lab · mytr.ai',
  description:
    'An open, India-first glucose explorer. See the likely sugar spike of a meal and find swaps that keep it steady.',
};

const markup = `<main>
<div id="home" class="view">
<section class="hero" aria-labelledby="h1">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1 id="h1">Know what every meal does to you.</h1>
      <p class="lead">Spike Lab predicts how your glucose responds to more than 9,000 foods, then shows the version of each meal that keeps your energy steady and your goals on track.</p>
      <div class="cta">
        <a class="btn btn-blue" href="#snap">Snap a meal</a>
        <button class="btn btn-ghost-dark" type="button" data-palette><span>Search <span id="hCount">9,000+</span> foods</span><kbd>/</kbd></button>
      </div>
      <p class="trust">Built on published glycaemic research, the USDA nutrient database, and real CGM readings.</p>
    </div>
    <div class="hero-read" aria-live="polite">
      <div class="hr-zone" id="hZone"><i></i><span>Steady</span></div>
      <div class="hr-peak"><b class="dm" id="hPeak">0</b><span>mg/dL predicted peak</span></div>
      <div class="hr-meta" id="hMeta"></div>
      <a class="hr-link" id="hLink" href="#food/idli_coffee">See how to steady it</a>
    </div>
  </div>
  <div class="live" id="hLive">
    <svg id="hChart" role="img" aria-label="Predicted glucose curve for the selected meal"></svg>
    <div class="scrub" id="hScrub" aria-hidden="true"></div>
  </div>
  <div class="hmarq" id="hChips" role="group" aria-label="Choose a meal to see its curve">
    <div class="hrow" id="hRow1"></div>
    <div class="hrow rev" id="hRow2"></div>
  </div>
  <div class="wrap hero-ctl">
    <div class="hctl-r">
      <div class="hseg" role="group" aria-label="Glucose profile">
        <button type="button" data-p="none">No diabetes</button><button type="button" data-p="pre">Prediabetes</button><button type="button" data-p="t2">Type 2</button>
      </div>
      <label class="hsteady"><input type="checkbox" id="hSteady"><span class="tr"></span>Steadier version</label>
    </div>
  </div>
</section>


<section class="sec grey snap" id="snap" aria-labelledby="snapH">
  <div class="wrap">
    <div class="sec-head">
      <div class="kicker">Meal detector</div>
      <h2 id="snapH">Snap your plate. See the spike.</h2>
      <p>Take a photo or upload one. The detector names what's on the plate, estimates portions, predicts the curve, and builds the steadiest version of the same meal. You can correct anything it gets wrong.</p>
    </div>
    <div class="snap-grid">
      <div class="drop" id="drop">
        <div class="drop-inner" id="dropInner">
          <div class="drop-ic" aria-hidden="true">📷</div>
          <p class="drop-t">Drop a meal photo here</p>
          <p class="drop-s">JPEG, PNG or WebP. Photos are sent only to the detector you pick and are not stored.</p>
        </div>
        <img id="snapImg" alt="Your meal photo" hidden>
        <div class="drop-actions">
          <label class="btn btn-blue" for="camIn">Take a photo</label>
          <label class="btn btn-out" for="upIn">Upload</label>
          <input id="camIn" type="file" accept="image/*" capture="environment" class="sr">
          <input id="upIn" type="file" accept="image/jpeg,image/png,image/webp" class="sr">
        </div>
        <label class="det-pick" id="detPickWrap" hidden>Detector <select id="detPick"></select></label>
        <div class="snap-status" id="snapStatus" role="status"></div>
      </div>
      <div class="snap-out" id="snapOut">
        <div class="snap-empty" id="snapEmpty">
          <span aria-hidden="true">🍽</span>
          <p>Your detected meal will appear here, with its predicted curve and a steadier version.</p>
        </div>
        <div id="snapRes" hidden>
          <div class="snap-head"><h3 id="snapTitle">Your meal</h3><span class="score" id="snapScore"></span></div>
          <ul class="items" id="snapItems"></ul>
          <div class="snap-peak"><b id="snapPeak" class="dm">0</b><span>mg/dL predicted peak</span></div>
          <div class="chart"><svg id="snapChart" viewBox="0 0 600 250" role="img" aria-label="Predicted curve for the detected meal"></svg></div>
          <div class="best" id="snapBest"></div>
          <div class="d-actions">
            <button class="btn btn-dark" id="snapAdd" type="button">Add this meal to my plate</button>
            <button class="btn btn-blue" id="snapAddBest" type="button">Add the steadier version</button>
          </div>
          <p class="hint" style="margin-top:12px">Detection is an estimate. Check the items and portions before you rely on the numbers.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="build" aria-labelledby="buildH">
  <div class="wrap">
    <div class="sec-head">
      <div class="kicker">Plate builder</div>
      <h2 id="buildH">What's on your plate?</h2>
      <p>Tap any food to see its curve and how to steady it. Tap + to add it to your plate, then adjust portions and watch the prediction change.</p>
    </div>

    <div class="sl-gate" id="slGate" hidden>
      <p id="slGateMsg"></p>
      <button type="button" class="btn btn-primary" id="slGateBtn">Log in</button>
    </div>

    <div class="builder">
      <div class="browse" id="browse">
        <label class="search">
          <span class="sr">Search foods</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <input id="q" type="search" placeholder="Search filter coffee, sushi, tacos, biryani..." autocomplete="off">
        </label>
        <div class="cats" id="cats" role="group" aria-label="Food categories"></div>
        <div class="cats subcats" id="subcats" role="group" aria-label="USDA food groups" hidden></div>
        <div class="count" id="count" aria-live="polite"></div>
        <div class="scroller" id="scroller" tabindex="0" aria-label="Food list, scrolls independently"><div class="foods" id="foods"></div><div id="sentinel" style="height:1px"></div></div>
      </div>

      <aside class="panel" id="panel" aria-labelledby="plateH">
        <div class="panel-top">
          <h3 id="plateH">Your plate</h3>
          <button class="linkbtn" id="clear" type="button">Clear</button>
        </div>
        <div class="seg" role="group" aria-label="Glucose profile" id="profiles">
          <button type="button" data-p="none" aria-pressed="true">No diabetes</button>
          <button type="button" data-p="pre" aria-pressed="false">Prediabetes</button>
          <button type="button" data-p="t2" aria-pressed="false">Type 2</button>
        </div>

        <div class="plate-row">
          <div class="dish-wrap">
            <svg class="dish-ring" viewBox="0 0 78 78" aria-hidden="true"><circle cx="39" cy="39" r="37" fill="none" stroke="var(--chip)" stroke-width="2.4"/><circle id="ringArc" cx="39" cy="39" r="37" fill="none" stroke="var(--green)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="232.5" stroke-dashoffset="232.5" transform="rotate(-90 39 39)"/></svg>
            <div class="dish"><div class="dish-well"></div><div class="dish-items" id="dishItems"></div><button class="dish-add" id="dishAdd" type="button" data-palette-add aria-label="Search and add food to your plate"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><span>Add food</span></button></div>
            <div class="cup" id="cup" aria-hidden="true"></div>
            <div class="dish-score"><b id="scoreN">-</b><small>/10</small></div>
          </div>
          <div class="result" aria-live="polite">
            <div class="peak">
              <b id="peak">90</b><span>mg/dL peak</span>
              <small id="peakSub">Add food to see your curve</small>
            </div>
            <div class="zone" id="zone">&nbsp;</div>
          </div>
        </div>

        <div class="chart"><svg id="chart" viewBox="0 0 600 250" role="img" aria-label="Predicted glucose curve for the next 3 hours"></svg></div>

        <div class="toggles">
          <label class="tog"><span>Eat vegetables and protein first<small>Carbs last, in the same meal</small></span><span class="switch"><input type="checkbox" id="order"><span class="tr"></span></span></label>
          <label class="tog"><span>Walk 10 to 15 minutes after<small>Start within 30 minutes of eating</small></span><span class="switch"><input type="checkbox" id="walk"><span class="tr"></span></span></label>
        </div>

        <ul class="items" id="items"></ul>
        <div class="quick" role="group" aria-label="Quick add-ons"><span>Quick add</span>
          <button type="button" data-add="ghee_tsp">🧈 Ghee, 1 tsp</button><button type="button" data-add="curd">🥛 Curd</button><button type="button" data-add="salad">🥗 Salad</button><button type="button" data-add="pickle">🫙 Pickle</button><button type="button" data-add="papad">🟡 Papad</button>
        </div>
        <div class="totals" id="totals"></div>
      </aside>
    </div>

    <div class="sugg-wrap" id="suggest" aria-live="polite">
      <h3>Make this plate steadier</h3>
      <p id="suggSub">Add a meal above and we'll suggest swaps, add-ons, and habits that lower its spike.</p>
      <div class="sugg-grid" id="sugg"></div>
    </div>
  </div>
</section>

<section class="sec grey" id="zones" aria-labelledby="zonesH">
  <div class="wrap">
    <div class="sec-head">
      <div class="kicker">Food zones</div>
      <h2 id="zonesH">Steadiest and spikiest, one serving at a time.</h2>
      <p>Predicted peak for a person without diabetes, eating one typical serving or meal. Tap any item to see why, and how to steady it.</p>
    </div>
    <div class="zones">
      <div class="zcol"><h3><i style="background:var(--green)"></i>Steady zone</h3><div id="ztop"></div></div>
      <div class="zcol"><h3><i style="background:var(--red)"></i>Spike zone</h3><div id="zbot"></div></div>
    </div>
  </div>
</section>

<section class="sec" id="community" aria-labelledby="commH">
  <div class="wrap">
    <div class="sec-head">
      <div class="kicker">Community</div>
      <h2 id="commH">Built by people who eat, measure, and share.</h2>
      <p>Add a dish we're missing, or share what your CGM actually showed. Every contribution makes the predictions better for everyone, especially for foods that have never been tested.</p>
    </div>
    <div class="cstats">
      <div><b class="dm" id="cContrib">0</b><span>contributors</span></div>
      <div><b class="dm" id="cFoods">0</b><span>foods submitted</span></div>
      <div><b class="dm" id="cReads">0</b><span>CGM readings shared</span></div>
      <div><b class="dm" id="cVerified">0</b><span>verified foods</span></div>
    </div>
    <div class="cnote" id="cOffline" hidden></div>
    <div class="cgrid">
      <form class="ocard cform" id="fFood" novalidate>
        <h3>Add a food</h3>
        <p>Cite a source: a paper, a food label, or a food composition table. Submissions show as pending until a moderator verifies them.</p>
        <label>Food name<input name="name" required maxlength="80" placeholder="e.g. Neer dosa"></label>
        <div class="row2">
          <label>Cuisine<select name="cuisine">
            <option value="south">South Indian</option><option value="breakfast">North and West Indian</option><option value="asia">East and Southeast Asian</option><option value="western">American and European</option><option value="medit">Mediterranean and Middle Eastern</option><option value="latin">Latin American</option><option value="africa">African</option><option value="snacks">Snack or street food</option><option value="sweets">Sweet</option><option value="drinks">Drink</option>
          </select></label>
          <label>Serving<input name="serving" required maxlength="40" placeholder="2 pieces"></label>
        </div>
        <div class="row4">
          <label>Carbs g<input name="carbs" type="number" min="0" max="250" step="0.1" required></label>
          <label>Fibre g<input name="fibre" type="number" min="0" max="80" step="0.1" required></label>
          <label>Protein g<input name="protein" type="number" min="0" max="150" step="0.1" required></label>
          <label>Fat g<input name="fat" type="number" min="0" max="150" step="0.1" required></label>
        </div>
        <div class="row2">
          <label>GI, if known<input name="gi" type="number" min="0" max="110" step="1" placeholder="optional"></label>
          <label>Source<input name="source" required maxlength="200" placeholder="Paper, label, or table"></label>
        </div>
        <button class="btn btn-blue" type="submit">Submit food</button>
        <div class="fmsg" role="status"></div>
      </form>

      <form class="ocard cform" id="fRead" novalidate>
        <h3>Share a CGM reading</h3>
        <p>Ate something from Spike Lab with a CGM on? Log what it showed. Readings are anonymous and are only shown as averages.</p>
        <label>Food or meal<input name="food" list="foodList" required placeholder="Start typing, e.g. masala dosa"></label>
        <datalist id="foodList"></datalist>
        <div class="row4">
          <label>Servings<input name="servings" type="number" min="0.5" max="5" step="0.5" value="1" required></label>
          <label>Before mg/dL<input name="base" type="number" min="40" max="400" required></label>
          <label>Peak mg/dL<input name="peak" type="number" min="40" max="500" required></label>
          <label>Peak at (min)<input name="tpeak" type="number" min="5" max="240" required></label>
        </div>
        <div class="row2">
          <label>You are<select name="prof"><option value="none">No diabetes</option><option value="pre">Prediabetes</option><option value="t2">Type 2</option><option value="t1">Type 1</option></select></label>
          <label>Sensor<select name="device"><option>FreeStyle Libre</option><option>Dexcom</option><option>Ultrahuman M1</option><option>Other</option></select></label>
        </div>
        <label class="consent"><input type="checkbox" name="consent" required> I agree to share this reading anonymously with Spike Lab and mytr.ai to improve predictions. I can delete my data at any time.</label>
        <button class="btn btn-blue" type="submit">Share reading</button>
        <div class="fmsg" role="status"></div>

        <div class="lv" id="lv">
          <div class="lv-head"><h4>Import from LibreView</h4><span class="lv-pill">Processed on your device</span></div>
          <p class="lv-p">Have a FreeStyle Libre? Upload your LibreView CSV and Spike Lab finds your meals, starting values, and peaks. Only the summary numbers you choose to share leave this page.</p>
          <details class="lv-how"><summary>How to download your LibreView data</summary>
            <ol>
              <li>Make sure your FreeStyle LibreLink app is connected to LibreView (in the app menu, under Connected Apps or Share), so your readings sync.</li>
              <li>On a computer, sign in at libreview.com.</li>
              <li>Choose <b>Download glucose data</b>, complete the check, and save the CSV file.</li>
              <li>Upload it here. Tip: when you eat, add a food note in LibreLink, and Spike Lab will find those meals automatically.</li>
            </ol>
          </details>
          <div class="lv-row">
            <label class="btn btn-out" for="lvFile">Choose CSV file</label>
            <input id="lvFile" type="file" accept=".csv,text/csv,text/plain" class="sr">
            <span class="lv-stat" id="lvStat" role="status"></span>
          </div>
          <div id="lvBody" hidden>
            <div class="lv-tools">
              <span class="lv-ctl">Dates in file <select id="lvFmt"><option value="dmy">Day first (27-09-2026)</option><option value="mdy">Month first (09-27-2026)</option></select></span>
              <span class="lv-ctl">Add a meal time <input type="datetime-local" id="lvWhen"><button type="button" class="btn-sm" id="lvAddT">Add</button></span>
            </div>
            <p class="lv-p">Pick the food for each meal you want to share. Meals marked with a warning were affected by gaps, another meal, or a rising start, so their numbers are less reliable.</p>
            <div class="lv-list" id="lvList"></div>
            <label class="consent"><input type="checkbox" id="lvConsent"> I agree to share the selected readings anonymously with Spike Lab and mytr.ai to improve predictions. I can delete my data at any time.</label>
            <button type="button" class="btn btn-blue" id="lvShare">Share selected readings</button>
            <div class="fmsg" id="lvMsg" role="status"></div>
          </div>
        </div>
      </form>
    </div>

    <div class="feed-wrap">
      <div class="feed-head"><h3>Community foods</h3><button class="linkbtn" id="delMine" type="button" hidden>Delete my contributions</button></div>
      <div class="feed" id="feed"><p class="hint">Nothing submitted yet. Be the first.</p></div>
    </div>
  </div>
</section>

<section class="sec grey" id="science" aria-labelledby="sciH">
  <div class="wrap">
    <div class="sec-head">
      <div class="kicker">The science</div>
      <h2 id="sciH">Five levers shape every spike.</h2>
      <p>Glucose after a meal depends far more on how much carbohydrate you eat, and what you eat with it, than on any single "good" or "bad" food.</p>
    </div>
    <div class="levers">
      <div class="lever"><div class="ic">⚖️</div><h4>Portion</h4><p>The amount of digestible carbohydrate is the biggest driver. Half a plate of rice spikes far less than a full one.</p><span class="fx">Biggest effect</span></div>
      <div class="lever"><div class="ic">🌾</div><h4>Carb type</h4><p>Glycaemic index ranks how fast a carb raises glucose. Whole lentils sit near 30; white rice and maida sit above 70.</p><span class="fx">GI × carbs = load</span></div>
      <div class="lever"><div class="ic">🥗</div><h4>Company</h4><p>Fibre, protein, and fat slow how fast the stomach empties, which flattens and delays the peak.</p><span class="fx">Add dal, curd, salad</span></div>
      <div class="lever"><div class="ic">🔁</div><h4>Order</h4><p>Eating vegetables and protein before carbs lowered post-meal peaks substantially in clinical studies.</p><span class="fx">Carbs last</span></div>
      <div class="lever"><div class="ic">🚶</div><h4>Movement</h4><p>Working muscles pull glucose from the blood. A short walk soon after eating blunts the rise.</p><span class="fx">10 to 15 minutes</span></div>
    </div>

    <div class="doc">
      <div class="glow b" aria-hidden="true"></div>
      <div class="badge" aria-hidden="true">⚕</div>
      <div>
        <h4>A note from the clinical side</h4>
        <p>These curves are educational estimates, not measurements. The same meal can produce responses two to three times apart in different people, and even in one person on different days, depending on sleep, stress, activity, and the gut. A CGM shows what your body actually does.</p>
        <p><b style="color:#fff">If you take insulin or sulfonylurea tablets,</b> lowering a meal's carbohydrate or spike can lower the dose you need. Changing meals without adjusting medicine can cause hypoglycaemia. Agree any changes with your doctor first. For type 1 diabetes, use the carb totals here with your care team's carb ratio, not the curve.</p>
        <p>Pregnancy, kidney disease, and children have different targets. This tool doesn't cover them.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="open" aria-labelledby="openH">
  <div class="wrap">
    <div class="sec-head">
      <div class="kicker">Open source</div>
      <h2 id="openH">Every number, in the open.</h2>
      <p>The code is MIT licensed and the curated dataset is CC BY 4.0, so anyone can read, reuse, and improve them with credit. Each GI value is tagged by source: international GI tables, Indian GI studies, or estimated from ingredients. Meal combos are computed from their parts. The USDA database adds about 8,800 foods with public-domain nutrient data; their GI values are assigned by food-group rules. Help us replace estimates with measured data.</p>
    </div>
    <div class="open">
      <div class="ocard">
        <h3>The model</h3>
        <p>A transparent, deliberately simple estimate. No black box.</p>
        <div class="formula">meal GI   = Σ(GIᵢ × carbsᵢ) ÷ Σ carbsᵢ
load      = meal GI × total carbs ÷ 100
slowing   = 1 + 0.006·protein + 0.005·fat + 0.02·fibre
habits    = 0.75 if carbs last × 0.80 if walk after
raw rise  = load × k ÷ slowing × habits
rise      = R × (1 − e^(−raw ÷ R))      ← saturates
curve     = base + rise · (t/tₚ)ᵃ · e^(a(1 − t/tₚ))

profile      base  k    R    a
none          90   2.0  95  2.8
prediabetes  104   3.0 140  2.0
type 2       135   4.6 230  1.6</div>
        <div class="row" style="margin-top:14px">
          <button class="btn btn-blue" id="openData" type="button">View the dataset</button>
        </div>
      </div>
      <div class="ocard">
        <h3>Sources</h3>
        <ol class="refs">
          <li>Atkinson FS, Foster-Powell K, Brand-Miller JC. International tables of glycemic index and glycemic load values. <i>Diabetes Care</i> 2008, updated in <i>Am J Clin Nutr</i> 2021.</li>
          <li>Longvah T et al. <i>Indian Food Composition Tables 2017</i>. National Institute of Nutrition, Hyderabad.</li>
          <li>Shukla AP et al. Food order has a significant impact on postprandial glucose and insulin levels. <i>Diabetes Care</i> 2015.</li>
          <li>Buffey AJ et al. The acute effects of interrupting prolonged sitting time in adults with standing and light-intensity walking. <i>Sports Med</i> 2022.</li>
          <li>Glycemic carbohydrates, glycemic index and glycemic load of commonly consumed South Indian breakfast foods. <i>J Food Sci Technol</i> 2022.</li>
          <li>George R, Garcia AL, Edwards CA. Glycaemic responses of staple South Asian foods alone and combined with curried chicken as a mixed meal. <i>J Hum Nutr Diet</i> 2015.</li>
          <li>Mohan V et al. Effect of brown rice, white rice, and brown rice with legumes on blood glucose and insulin responses in overweight Asian Indians. <i>Diabetes Technol Ther</i> 2014.</li>
          <li>U.S. Department of Agriculture, Agricultural Research Service. <i>USDA National Nutrient Database for Standard Reference, Release 28</i> (2015), now SR Legacy in FoodData Central. Public domain.</li>
          <li>Zeevi D et al. Personalized nutrition by prediction of glycemic responses. <i>Cell</i> 2015.</li>
          <li>Anitha S et al. A systematic review and meta-analysis of the potential of millets for managing and reducing the risk of developing diabetes mellitus. <i>Front Nutr</i> 2021.</li>
        </ol>
        <p style="margin-top:14px">Found a better value or a missing dish? Copy the dataset, correct it, and share it back with a source.</p>
      </div>
    </div>
    <div class="open" style="margin-top:16px">
      <div class="ocard">
        <h3>Plug in a meal detector</h3>
        <p>Spike Lab ships with a Claude-powered detector. Anyone can register another one, such as an on-device model or your own API, and it appears in the detector menu.</p>
        <div class="formula">SpikeLab.registerDetector({
  id: 'my-model',
  name: 'My food model',
  async detect(file) {          // a File or Blob image
    const res = await myModel(file);
    return { items: [
      // known foods: use a Spike Lab id
      { id: 'masala_dosa', servings: 1, confidence: 0.9 },
      // unknown foods: send nutrients per serving
      { name: 'Neer dosa', servings: 2, carbs: 22,
        fibre: 0.5, protein: 2, fat: 1, gi: 70 }
    ] };
  }
});</div>
      </div>
      <div class="ocard">
        <h3>Use it in your app</h3>
        <p>The same engine is exposed for other apps and plug-ins. Everything runs in the browser.</p>
        <div class="formula">SpikeLab.foods('dosa')         // search foods
SpikeLab.predict(
  { idli: 1, sambar: 1 },      // food id → servings
  'pre',                       // none | pre | t2
  { order: true, walk: false } // habits
)  // → { peak, rise, timeToPeak, carbs, gi, gl }
SpikeLab.steadier('masala_dosa_coffee')
   // → steps with the peak after each change</div>
        <p style="margin-top:14px">Code is MIT licensed. Curated data is CC BY 4.0, so reuse it freely with credit to mytr.ai Spike Lab. USDA data is public domain.</p>
      </div>
    </div>
  </div>
</section>
</div>
<div id="detail" class="view" hidden>
  <section class="d-top">
    <div class="wrap">
      <button class="back" id="back" type="button">‹ All foods</button>
      <div class="d-grid">
        <div>
          <div class="d-emoji" id="dEmoji" aria-hidden="true"></div>
          <div class="d-crumb" id="dCrumb"></div>
          <h1 class="d-title" id="dTitle"></h1>
          <p class="d-serv" id="dServ"></p>
          <div class="d-tags" id="dTags"></div>
          <p class="d-verdict" id="dVerdict"></p>
          <div class="d-actions">
            <button class="btn btn-blue" id="dAdd" type="button" data-add="">Add to plate</button>
            <a class="btn btn-out" href="#dStory">How to steady it ↓</a>
          </div>
        </div>
        <div class="d-card">
          <div class="seg" role="group" aria-label="Glucose profile" style="margin-top:0">
            <button type="button" data-p="none">No diabetes</button>
            <button type="button" data-p="pre">Prediabetes</button>
            <button type="button" data-p="t2">Type 2</button>
          </div>
          <div class="result" aria-live="polite">
            <div class="peak"><b id="dPeak">0</b><span>mg/dL peak</span><small id="dRise"></small></div>
            <div class="ring" aria-hidden="true">
              <svg width="78" height="78" viewBox="0 0 78 78"><circle cx="39" cy="39" r="33" fill="none" stroke="var(--chip)" stroke-width="7"/><circle id="dArc" cx="39" cy="39" r="33" fill="none" stroke="var(--green)" stroke-width="7" stroke-linecap="round" stroke-dasharray="207.3" stroke-dashoffset="207.3"/></svg>
              <div class="lbl"><div><b id="dScore">-</b><small>of 10</small></div></div>
            </div>
          </div>
          <div class="zone" id="dZone"></div>
          <div class="measured" id="dMeasured" hidden></div>
          <div class="chart"><svg id="dChart" viewBox="0 0 600 250" role="img" aria-label="Predicted glucose curve"></svg></div>
          <div class="nums" id="dNums"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="parts" id="dParts" hidden>
    <div class="wrap">
      <h2>Where the spike comes from</h2>
      <p>Each part's share of the meal's glycaemic load. Tap a part to see it on its own.</p>
      <div class="parts-card" id="dPartList"></div>
    </div>
  </section>

  <section class="story" id="dStory" aria-labelledby="storyH">
    <div class="glow b" aria-hidden="true"></div>
    <div class="wrap">
      <div class="story-head">
        <div class="kicker">Step by step</div>
        <h2 id="storyH">Make it steadier.</h2>
        <p id="storySub"></p>
      </div>
      <div class="steady" id="steadyMsg" hidden></div>
      <div class="story-grid" id="storyGrid">
        <div class="sticky">
          <div class="row"><div class="big" id="sPeak"></div><div class="from" id="sFrom"></div></div>
          <div class="stepname" id="sName"></div>
          <div class="chart"><svg id="sChart" viewBox="0 0 600 250" role="img" aria-label="Glucose curve for the current step"></svg></div>
          <div class="dots" id="dots" aria-hidden="true"></div>
        </div>
        <div class="steps" id="stepList"></div>
      </div>
      <div class="finale" id="finale">
        <div class="fromto dm" id="finaleNums"></div>
        <p id="finaleText"></p>
        <button class="btn btn-blue" id="applyAll" type="button">Add the steadier version to my plate</button>
      </div>
    </div>
  </section>

  <section class="note-sec">
    <div class="wrap">
      <div class="note"><div class="ic" id="tipIc" aria-hidden="true"></div><div><h3 id="tipH"></h3><p id="tipP"></p></div></div>
      <div class="note" style="margin-top:12px"><div class="ic" aria-hidden="true">⚕</div><div><h3>Before you change your meals</h3><p>These are educational estimates, not measurements; real responses vary two to three times between people. If you take insulin or sulfonylurea tablets, eating fewer carbs or a steadier meal can lower the dose you need, so agree changes with your doctor first to avoid hypoglycaemia.</p></div></div>
    </div>
  </section>

  <section class="similar">
    <div class="wrap">
      <h2 id="simH">Similar foods</h2>
      <div class="hscroll" id="simList"></div>
    </div>
  </section>
</div>
</main>

<div class="fab" id="fab" aria-hidden="true"><span>🍽 <b id="fabN">0</b> items · peak <b id="fabPk">90</b></span><button class="go" id="fabGo" type="button">View plate</button></div>
<div class="toast" id="toast" role="status"></div>
<div class="pal" id="pal" hidden>
  <div class="pal-box" role="dialog" aria-modal="true" aria-label="Search foods">
    <div class="pal-in"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
      <input id="palQ" type="search" placeholder="Search any food or meal" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="palList" aria-autocomplete="list"><kbd>esc</kbd></div>
    <ul class="pal-list" id="palList" role="listbox"></ul>
    <div class="pal-foot" id="palFoot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>+</kbd> add to plate</span></div>
  </div>
</div>


<dialog id="dlg" aria-labelledby="dlgH">
  <div class="dlg-head"><h3 id="dlgH">Spike Lab dataset (JSON, MIT licence)</h3><div style="display:flex;gap:8px"><button class="btn-sm" id="copy" type="button">Copy</button><button class="linkbtn" id="dlgClose" type="button">Close</button></div></div>
  <div class="dlg-body"><textarea id="dataTxt" readonly aria-label="Dataset JSON"></textarea></div>
</dialog>`;

export default function SpikeLabPage() {
  return (
    <div className="spike-lab-page">
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <SpikeLabScript />
    </div>
  );
}
