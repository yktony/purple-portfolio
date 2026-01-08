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

/* ----- dynamic year ----- */
document.getElementById('year').textContent = new Date().getFullYear();
