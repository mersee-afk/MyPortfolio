// Typing animation
const typingEl = document.querySelector('.typing');
const words = ["Java Full Stack Developer", "Java Developer", "Software Developer", "Software Engineer"];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
  current = words[i];
  typingEl.textContent = isDeleting
    ? current.substring(0, j--)
    : current.substring(0, j++);
  if (!isDeleting && j === current.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    setTimeout(type, 400);
  } else {
    setTimeout(type, isDeleting ? 60 : 120);
  }
}
type();

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Reveal sections on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Contact form fallback
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name = contactForm.querySelector('input[type=text]').value;
    const email = contactForm.querySelector('input[type=email]').value;
    const msg = contactForm.querySelector('textarea').value;
    window.location.href=`mailto:mercyyesudas432@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AEmail:%20${encodeURIComponent(email)}`;
  });
}