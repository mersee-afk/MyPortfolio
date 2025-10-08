// ---------- Typing / Roles carousel ----------
const typedEl = document.getElementById('typed');
const texts = [
  'Java Full Stack Developer',
  'Java Developer',
  'Software Developer',
  'Software Engineer'
];

let tIndex = 0, cIndex = 0, deleting = false;

function typeTick() {
  const current = texts[tIndex];
  if(!deleting) {
    cIndex++;
    if(cIndex <= current.length) typedEl.textContent = current.slice(0, cIndex);
    if(cIndex === current.length + 1) {
      deleting = true;
      setTimeout(typeTick, 900);
      return;
    }
  } else {
    cIndex--;
    typedEl.textContent = current.slice(0, cIndex);
    if(cIndex === 0) {
      deleting = false;
      tIndex = (tIndex + 1) % texts.length;
    }
  }
  setTimeout(typeTick, deleting ? 80 : 100);
}
typeTick();

// ---------- Theme toggle ----------
const themeToggle = document.getElementById('theme-toggle');
function setTheme(dark) {
  document.documentElement.style.setProperty('--bg', dark ? '#060608' : '#f6f7fb');
  document.documentElement.style.setProperty('--card', dark ? '#0f1724' : '#ffffff');
  document.documentElement.style.setProperty('--text', dark ? '#e6eef7' : '#0f1724');
  document.documentElement.style.setProperty('--muted', dark ? '#9aa4b2' : '#6b7280');
  document.documentElement.style.setProperty('--glass', dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)');
  themeToggle.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('themeDark', dark ? '1' : '0');
}
themeToggle.addEventListener('click', () => {
  const cur = localStorage.getItem('themeDark') === '1';
  setTheme(!cur);
});
// initialize
if(localStorage.getItem('themeDark') === '1') setTheme(true);

// ---------- Mobile nav ----------
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuToggle && menuToggle.addEventListener('click', () => {
  const open = mobileNav.getAttribute('aria-hidden') === 'false';
  mobileNav.setAttribute('aria-hidden', String(!open));
  mobileNav.style.display = open ? 'none' : 'flex';
});

// ---------- Simple contact form handler (optional) ----------
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    // If you set up Formspree / Netlify Forms you can submit normally.
    // For now we prevent default and open mailto (graceful fallback).
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value || '';
    const email = contactForm.querySelector('[name="email"]').value || '';
    const message = contactForm.querySelector('[name="message"]').value || '';
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:mercyyesudas432@gmail.com?subject=${subject}&body=${body}`;
  });
}