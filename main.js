/* Mimasa Ifigen — UI interactions */

// Header scroll effect
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Hero slider
(function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function autoplay() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetTimer() {
    clearInterval(timer);
    autoplay();
  }

  document.querySelector('.hero-next')?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  document.querySelector('.hero-prev')?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
  });

  autoplay();
})();

// Language switcher — close on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-switcher')) {
    document.querySelectorAll('.lang-dropdown').forEach(d => d.style.opacity = '');
  }
});
