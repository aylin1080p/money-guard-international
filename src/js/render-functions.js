export function createGalleryMarkup(images) {
  if (!Array.isArray(images) || images.length === 0) {
    return `
      <li class="gallery-placeholder">
        Gallery area is ready.
      </li>
    `;
  }

  return images
    .map(
      image => `
        <li class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </li>
      `
    )
    .join('');
}

export function showStatusMessage(element, message) {
  if (!element) return;
  element.textContent = message;
}