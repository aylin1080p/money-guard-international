import './css/styles.css';
import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, showStatusMessage } from './js/render-functions.js';

console.log('main.js loaded');
console.log('fetchImages:', fetchImages);
console.log('createGalleryMarkup:', createGalleryMarkup);
console.log('showStatusMessage:', showStatusMessage);

const appMarkup = `
  <main class="container">
    <h1 class="title">Image Search</h1>

    <form class="search-form" id="search-form">
      <input
        class="search-input"
        type="text"
        name="search-text"
        placeholder="Search images..."
        autocomplete="off"
      />
      <button class="search-button" type="submit">Search</button>
    </form>

    <p class="status-text" id="status-text">
      Uygulama iskeleti başarıyla yüklendi.
    </p>

    <ul class="gallery" id="gallery"></ul>

    <button class="load-more" id="load-more" type="button" hidden>
      Load more
    </button>
  </main>
`;

document.body.insertAdjacentHTML('afterbegin', appMarkup);

const form = document.querySelector('#search-form');
const statusText = document.querySelector('#status-text');
const gallery = document.querySelector('#gallery');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    showStatusMessage(statusText, 'Lütfen bir arama kelimesi girin.');
    gallery.innerHTML = '';
    return;
  }

  showStatusMessage(statusText, `Arama hazır: "${query}"`);
  gallery.innerHTML = createGalleryMarkup([]);
});

console.log('Page rendered successfully');