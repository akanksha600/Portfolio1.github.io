// ===== PAGE NAVIGATION =====
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) {
    page.classList.add('active');
    page.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const link = document.querySelector(`.nav-link[href="#${id}"]`);
  if (link) link.classList.add('active');
  closeLightbox();
}

// ===== DARK MODE =====
function toggleDark() {
  document.body.classList.toggle('dark');
  const btn = document.getElementById('darkToggle');
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// Load saved theme
(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('darkToggle');
    if (btn) btn.textContent = '☀️';
  }
})();

// ===== HAMBURGER MENU =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ===== LIGHTBOX =====
function openLightbox(el) {
  const lb = document.getElementById('lightbox');
  const inner = document.getElementById('lbInner');
  const content = el.querySelector('.gallery-placeholder') ? el.querySelector('.gallery-placeholder').innerHTML : 'Image Preview';
  inner.innerHTML = `<div style="padding:2rem; text-align:center; font-size:3rem;">${content}</div><p style="text-align:center;color:var(--text2);">Replace with actual certificate/photo in assets folder.</p>`;
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// ===== FORM SUBMIT =====
function submitForm(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = '✅ Message sent! I will get back to you soon.';
  e.target.reset();
  setTimeout(() => msg.textContent = '', 5000);
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 30px rgba(120,80,200,0.15)';
  } else {
    nav.style.boxShadow = '';
  }
});

// ===== ANIMATED TYPING EFFECT (Home Sub-title) =====
const roles = ['Student', 'Web Developer', 'AI Enthusiast', 'Problem Solver', 'Creative Thinker'];
let ri = 0, ci = 0, deleting = false;
const subEl = document.querySelector('.sub-title');

function typeEffect() {
  if (!subEl) return;
  const current = roles[ri];
  if (!deleting) {
    subEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(typeEffect, 1500); return; }
  } else {
    subEl.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeEffect, deleting ? 60 : 100);
}
typeEffect();

// ===== RGB CURSOR GLOW (subtle) =====
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.rgb-orb');
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.02;
    orb.style.transform = `translate(${e.clientX * factor * 0.3}px, ${e.clientY * factor * 0.3}px)`;
  });
});

// ===== INTERSECTION OBSERVER for card animations =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .project-card, .gallery-item, .timeline-item').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
