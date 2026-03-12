export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

  if (!gallery) {
    return;
  }

  if (!Array.isArray(images) || images.length === 0) {
    gallery.innerHTML = '';
    return;
  }

  const galleryHTML = images
    .map(
      image => `
        <li class="gallery-list-item">
          <a class="gallery-item" href="${image.largeImageURL}">
            <img
              class="gallery-image"
              src="${image.webformatURL}"
              alt="${image.tags}"
            />
            <div class="image-info">
              <div class="info-item">
                <span class="info-label">Likes</span>
                <span class="info-value">${image.likes}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Views</span>
                <span class="info-value">${image.views}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Comments</span>
                <span class="info-value">${image.comments}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Downloads</span>
                <span class="info-value">${image.downloads}</span>
              </div>
            </div>
          </a>
        </li>
      `
    )
    .join('');

  gallery.innerHTML = galleryHTML;
}

export function showLoader() {
  const loaderElement = document.querySelector('.loader');

  if (!loaderElement) return;
  loaderElement.classList.add('is-active');
}

export function hideLoader() {
  const loaderElement = document.querySelector('.loader');

  if (!loaderElement) return;
  loaderElement.classList.remove('is-active');
}
