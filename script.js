const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('srl-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  if (next === 'light') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = next;
  localStorage.setItem('srl-theme', next);
});

document.getElementById('year').textContent = new Date().getFullYear();

const search = document.getElementById('publicationSearch');
const filters = document.querySelectorAll('.filter');
let activeFilter = 'all';
function filterPublications() {
  const term = (search?.value || '').toLowerCase().trim();
  document.querySelectorAll('.publication').forEach(pub => {
    const matchesText = pub.textContent.toLowerCase().includes(term);
    const matchesType = activeFilter === 'all' || pub.dataset.type === activeFilter;
    pub.hidden = !(matchesText && matchesType);
  });
}
search?.addEventListener('input', filterPublications);
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter;
  filterPublications();
}));
