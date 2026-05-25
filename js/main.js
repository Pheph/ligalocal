/* ================================
   LIGA LOCAL — main.js
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* Navbar shadow on scroll */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--shadow', window.scrollY > 10);
    }, { passive: true });
  }

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* Fade-up on scroll */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.observe').forEach(el => observer.observe(el));

});

/* ---- Form helpers (shared across etapa1, etapa2, confirmacao) ---- */

function toggleChip(el, group) {
  el.classList.toggle('selected');
  const val = el.dataset.val;
  if (!window._state) window._state = {};
  if (!window._state[group]) window._state[group] = [];
  if (el.classList.contains('selected')) { window._state[group].push(val); }
  else { window._state[group] = window._state[group].filter(v => v !== val); }
}

function selectSingle(el, group) {
  el.closest('.select-grid-3, .select-grid-2, .chips-col')
    .querySelectorAll('[data-val]')
    .forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  if (!window._state) window._state = {};
  window._state[group] = el.dataset.val;
}

function toggleGenero(el) {
  el.closest('.chips-col').querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  if (!window._state) window._state = {};
  window._state.genero = el.dataset.val;
}
