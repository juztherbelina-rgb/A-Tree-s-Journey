const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navLinks.addEventListener('click', (e) => {
  if (!e.target.closest('a')) return;
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
});
