/* ----- loader fade ----- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 300);
});

/* ----- cookie banner ----- */
const banner = document.getElementById('cookie-banner');
const okBtn = document.getElementById('cookie-ok');
if (localStorage.getItem('cookiesAccepted')) banner.remove();
else banner.style.display = 'block';
okBtn.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', '1');
  banner.remove();
});

/* ----- dark / light toggle ----- */
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') html.classList.add('light');
toggleBtn.addEventListener('click', () => {
  html.classList.toggle('light');
  localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
});

/* ----- mobile nav ----- */
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
navToggle.addEventListener('click', () => {
  const vis = navMenu.dataset.visible === "true";
  navMenu.dataset.visible = !vis;
  navToggle.setAttribute('aria-expanded', !vis);
});
navMenu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    navMenu.dataset.visible = "false";
    navToggle.setAttribute('aria-expanded', "false");
  })
);

/* ----- typewriter ----- */
const text = "GETPWND";
const h1 = document.getElementById('typewriter');
let i = 0;
const type = () => {
  if (i < text.length) {
    h1.textContent += text.charAt(i);
    i++;
    setTimeout(type, 150);
  }
};
window.addEventListener('load', type);

/* ----- count-up numbers ----- */
const counters = document.querySelectorAll('.counter');
const section = document.getElementById('numbers');
const countUp = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const inc = target / 120;
    let current = 0;
    const update = () => {
      if (current < target) {
        current += inc;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });
};
const obs = new IntersectionObserver((entries, o) => {
  entries.forEach(e => {
    if (e.isIntersecting) { countUp(); o.unobserve(section); }
  });
}, { threshold: .5 });
if (section) obs.observe(section);

/* ----- rate-limit contact form ----- */
const form = document.getElementById('contactForm');
const SUBMIT_KEY = 'getpwnd submits';
const LIMIT = 3;
const WINDOW_MS = 5 * 60 * 1000;
function canSubmit() {
  const now = Date.now();
  const history = JSON.parse(localStorage.getItem(SUBMIT_KEY) || '[]');
  const recent = history.filter(t => now - t < WINDOW_MS);
  localStorage.setItem(SUBMIT_KEY, JSON.stringify(recent));
  return recent.length < LIMIT;
}
function recordSubmit() {
  const history = JSON.parse(localStorage.getItem(SUBMIT_KEY) || '[]');
  history.push(Date.now());
  localStorage.setItem(SUBMIT_KEY, JSON.stringify(history));
}
form.addEventListener('submit', (e) => {
  if (!canSubmit()) {
    e.preventDefault();
    alert('You can only send 3 messages every 5 minutes. Please wait.');
    return;
  }
  recordSubmit();
});

/* ----- honeypot spam trap ----- */
const pot = document.querySelector('.pot');
form.addEventListener('submit', (e) => {
  if (pot.value.length) {
    e.preventDefault();
    alert('Bot detected.');
  }
});

/* ----- paste-jacking shield ----- */
document.addEventListener('paste', (e) => {
  const data = e.clipboardData.getData('text');
  if (data.includes('<script>') || data.includes('javascript:')) {
    alert('Pasted content looks dangerous--review before using.');
  }
});

/* ----- clear-site-data button ----- */
document.getElementById('wipe').onclick = () => {
  localStorage.clear();
  caches.keys().then(names => names.forEach(n => caches.delete(n)));
  document.cookie.split(';').forEach(c => document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/'));
  alert('Local data wiped.');
};

/* ----- canary token ----- */
if (location.search.includes('admin=1')) {
  fetch('https://formspree.io/f/xwpejqql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject: 'Canary triggered', url: location.href })
  });
  location.replace('https://example.com');
};

/* ----- dynamic year ----- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== LIVE CYBER DEFENCE ===== */

/* 1.  HaveIBeenPwned breach alert (public email) */
const publicEmail = 'pwndme@dnmx.cc';
fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(publicEmail)}`)
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(data => {
    if (data.length) {
      const bar = document.getElementById('cyber-bar');
      bar.textContent = `⚠️  Public breach detected on ${data[0].BreachDate} – review passwords.`;
      bar.style.background = '#e74c3c';
      bar.style.color = '#fff';
      bar.style.padding = '.5rem';
      bar.style.textAlign = 'center';
      bar.style.fontSize = '.9rem';
    }
  })
  .catch(() => {}); // silent fail if rate-limited

/* 3.  Live VPN / proxy / threat detector */
fetch('https://ipapi.co/json/')
  .then(r => r.json())
  .then(data => {
    const bar = document.getElementById('cyber-bar');
    if (data.org.includes('VPN') || data.threat_level === 'high') {
      bar.textContent = '🔒 VPN/proxy or high-threat IP detected – extra verification may apply.';
      bar.style.background = '#f39c12';
      bar.style.color = '#000';
      bar.style.padding = '.5rem';
      bar.style.textAlign = 'center';
      bar.style.fontSize = '.9rem';
    }
  })
  .catch(() => {});
