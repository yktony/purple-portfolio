// mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const menu  = document.querySelector('.nav__menu');
toggle.addEventListener('click', () => {
  const vis = menu.dataset.visible === "true";
  menu.dataset.visible = !vis;
  toggle.setAttribute('aria-expanded', !vis);
});

// close menu after link click
menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    menu.dataset.visible = "false";
    toggle.setAttribute('aria-expanded', "false");
  })
);

// dynamic year
document.getElementById('year').textContent = new Date().getFullYear();
