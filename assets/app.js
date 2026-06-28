/* BTB Surveyors — draft interactions (vanilla JS, no build step) */

/* ---- Mobile nav ---- */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => { toggle.classList.remove('open'); links.classList.remove('open'); })
    );
  }
})();

/* ---- Scroll reveal ---- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
})();

/* ---- Instant Quote Calculator ----
   Indicative pricing model — illustrative only for the draft.
   Real figures + regional/postcode logic get wired in the WordPress build.
*/
(function () {
  const card = document.getElementById('quote');
  if (!card) return;

  const state = { postcode: '', property: null, beds: null, survey: null };
  const steps = Array.from(card.querySelectorAll('.q-step'));
  const bars = Array.from(card.querySelectorAll('.q-steps .s'));
  let i = 0;

  // base price by survey type, multiplied by property size factor
  const SURVEY = {
    level2: { label: 'Level 2 Home Survey', base: 420 },
    level3: { label: 'Level 3 Building Survey', base: 650 },
    valuation: { label: 'RICS Valuation', base: 280 },
    snagging: { label: 'New-Build Snagging', base: 350 },
  };
  const SIZE = { '1-2': 1.0, '3': 1.18, '4': 1.4, '5+': 1.75 };

  function show(n) {
    i = Math.max(0, Math.min(steps.length - 1, n));
    steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
    bars.forEach((b, idx) => b.classList.toggle('done', idx <= i));
    if (steps[i].dataset.step === 'result') computePrice();
  }
  function computePrice() {
    const s = SURVEY[state.survey] || SURVEY.level2;
    const factor = SIZE[state.beds] || 1;
    const mid = Math.round((s.base * factor) / 5) * 5;
    const low = Math.round((mid * 0.92) / 5) * 5;
    const high = Math.round((mid * 1.12) / 5) * 5;
    card.querySelector('#q-price').textContent = '£' + mid;
    card.querySelector('#q-range').textContent = `Typical range £${low}–£${high} · ${s.label}`;
  }

  // option selection
  card.querySelectorAll('.q-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const group = opt.dataset.group, val = opt.dataset.value;
      card.querySelectorAll(`.q-opt[data-group="${group}"]`).forEach(o => o.classList.remove('sel'));
      opt.classList.add('sel');
      state[group] = val;
      setTimeout(() => next(), 220); // auto-advance for snappy feel
    });
  });

  function next() {
    // simple validation per step
    const cur = steps[i].dataset.step;
    if (cur === 'postcode') {
      const v = card.querySelector('#q-postcode').value.trim();
      if (v.length < 2) { card.querySelector('#q-postcode').focus(); return; }
      state.postcode = v;
    }
    show(i + 1);
  }
  function back() { show(i - 1); }

  card.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', next));
  card.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', back));

  const pc = card.querySelector('#q-postcode');
  if (pc) pc.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); next(); } });

  // lead form submit (draft: no backend)
  const form = card.querySelector('#q-lead-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    card.querySelector('#q-final').innerHTML =
      `<div class="q-result" style="padding:1.5rem 0">
         <div style="font-size:2.6rem">✅</div>
         <h3 style="margin:.6rem 0 .3rem">You're booked in for a callback.</h3>
         <p class="muted">A BTB surveyor will call you within <b>15 minutes</b> (8am–8pm) to confirm your quote and dates.</p>
       </div>`;
  });
})();
