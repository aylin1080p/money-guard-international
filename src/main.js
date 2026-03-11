import './css/styles.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  docClose: true,
  docLoading: true,
});

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';
  showLoader();

  try {
    const data = await fetchImages(searchQuery);

    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again!',
      position: 'topRight',
    });
  }

  form.reset();
});
