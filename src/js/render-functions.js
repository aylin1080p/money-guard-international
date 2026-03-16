function createGalleryMarkup(images) {
  return images
    .map(
      (image) => `
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
      `,
    )
    .join("");
}

export function clearGallery() {
  const gallery = document.querySelector(".gallery");

  if (gallery) {
    gallery.innerHTML = "";
  }
}

export function renderGallery(images) {
  const gallery = document.querySelector(".gallery");

  if (!gallery || !Array.isArray(images) || images.length === 0) {
    return;
  }

  gallery.innerHTML = createGalleryMarkup(images);
}

export function appendGallery(images) {
  const gallery = document.querySelector(".gallery");

  if (!gallery || !Array.isArray(images) || images.length === 0) {
    return;
  }

  gallery.insertAdjacentHTML("beforeend", createGalleryMarkup(images));
}

export function showLoader() {
  const loaderElement = document.querySelector(".loader");

  if (!loaderElement) return;
  loaderElement.classList.add("is-active");
}

export function hideLoader() {
  const loaderElement = document.querySelector(".loader");

  if (!loaderElement) return;
  loaderElement.classList.remove("is-active");
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector(".load-more-button");

  if (!loadMoreButton) return;
  loadMoreButton.classList.add("is-visible");
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector(".load-more-button");

  if (!loadMoreButton) return;
  loadMoreButton.classList.remove("is-visible");
}
