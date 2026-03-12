import './js/polyfills.js';
import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  docClose: true,
  docLoading: true,
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: '',
      message: 'Please enter a search query!',
      position: 'topRight',
      class: 'toast-error',
    });
    return;
  }

  gallery.innerHTML = '';
  showLoader();

  fetchImages(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          class: 'toast-error',
        });
        return;
      }

      renderGallery(data.hits);
      lightbox.refresh();
      form.reset();
    })
    .catch(error => {
      let message = 'Failed to fetch images. Please try again!';

      if (error?.code === 'MISSING_KEY') {
        message = 'Missing Pixabay API key. Add VITE_PIXABAY_KEY to .env.';
      } else if (error?.response?.status === 400) {
        message = 'Invalid Pixabay API key. Please check VITE_PIXABAY_KEY.';
      }

      iziToast.error({
        title: '',
        message,
        position: 'topRight',
        class: 'toast-error',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
