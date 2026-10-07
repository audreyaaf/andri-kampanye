const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigasi');
menu.hidden = false;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menu.focus();
  }
});
matchMedia('(min-width: 768px)').addEventListener('change', closeMenu);

const dialog = document.querySelector('.lightbox');
const photoLinks = [...document.querySelectorAll('[data-photo]')];
let activePhotos = [];
let activePhoto = 0;
const image = dialog.querySelector('img');
const caption = dialog.querySelector('#photo-caption');
function showPhoto(index) {
  activePhoto = (index + activePhotos.length) % activePhotos.length;
  const link = activePhotos[activePhoto];
  image.src = link.href;
  image.alt = link.querySelector('img').alt;
  caption.textContent = link.dataset.caption;
}
if (typeof dialog.showModal === 'function') {
  photoLinks.forEach((link) => link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    activePhotos = photoLinks.filter((photo) => !photo.closest('details') || photo.closest('details').open);
    showPhoto(activePhotos.indexOf(link));
    dialog.showModal();
  }));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.photo-prev').addEventListener('click', () => showPhoto(activePhoto - 1));
  dialog.querySelector('.photo-next').addEventListener('click', () => showPhoto(activePhoto + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); showPhoto(activePhoto + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  image.addEventListener('error', () => { caption.textContent = 'Foto belum dapat dimuat. Coba foto lainnya atau muat ulang halaman.'; });
}

const shareButton = document.querySelector('.share-button');
const shareStatus = document.querySelector('.share-status');
shareButton.hidden = false;
shareButton.addEventListener('click', async () => {
  const url = new URL(location.href);
  url.hash = ''; url.search = '';
  shareStatus.textContent = '';
  document.querySelector('.share-fallback').hidden = true;
  const data = { title: 'Andri Juliono | Nomor 2 untuk RW 13', text: 'Kenali Andri Juliono dan lima program untuk RW 13 yang Mandiri & Peduli.', url: url.href };
  shareButton.disabled = true;
  try {
    if (navigator.share) {
      try { await navigator.share(data); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(url.href);
    shareStatus.textContent = 'Tautan tersalin. Silakan bagikan ke tetangga.';
  } catch {
    const fallback = document.querySelector('.share-fallback');
    const input = document.querySelector('#share-url');
    fallback.hidden = false;
    input.value = url.href;
    input.focus(); input.select();
  } finally { shareButton.disabled = false; }
});
