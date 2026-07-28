// Set this when your App Store listing is live:
// Example: 'https://apps.apple.com/app/gustnote-quick-notes/id1234567890'
const APP_STORE_URL = '';

const ctaLinks = [
  document.getElementById('header-cta'),
  document.getElementById('hero-cta'),
  document.getElementById('footer-cta'),
];

function setupCTAs() {
  ctaLinks.forEach((link) => {
    if (!link) return;

    if (APP_STORE_URL) {
      link.href = APP_STORE_URL;
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    } else {
      link.href = '#download';
      link.classList.add('is-pending');
      link.addEventListener('click', (event) => {
        if (window.location.hash === '#download') {
          event.preventDefault();
        }
      });
    }
  });
}

function screenshotTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function themedShotSrc(base) {
  return `${base}-${screenshotTheme()}.png`;
}

function updateThemedShots() {
  const theme = screenshotTheme();
  document.documentElement.dataset.theme = theme;

  document.querySelectorAll('img[data-shot]').forEach((image) => {
    image.src = themedShotSrc(image.dataset.shot);
  });
}

function setupThemedShots() {
  updateThemedShots();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemedShots);

  document.querySelectorAll('.screenshot-card img[data-shot]').forEach((image) => {
    image.addEventListener('error', () => {
      image.closest('.screenshot-card')?.classList.add('is-hidden');
    });
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
setupCTAs();
setupThemedShots();
