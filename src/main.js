import "./js/polyfills.js";
import "./css/styles.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import {
  appendGallery,
  clearGallery,
  hideLoadMoreButton,
  hideLoader,
  renderGallery,
  showLoadMoreButton,
  showLoader,
} from "./js/render-functions.js";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more-button");
const IMAGES_PER_PAGE = 20;

let currentQuery = "";
let currentPage = 1;
let totalPages = 0;

const lightbox = new SimpleLightbox(".gallery a", {
  docClose: true,
  docLoading: true,
});

form.addEventListener("submit", onSearch);
loadMoreButton.addEventListener("click", onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements["search-text"].value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: "",
      message: "Please enter a search query!",
      position: "topRight",
      class: "toast-error",
    });
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  totalPages = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.hits.length === 0) {
      showNoResultsMessage();
      return;
    }

    totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);

    renderGallery(data.hits);
    updateLoadMoreVisibility();
    lightbox.refresh();
    form.reset();
  } catch (error) {
    showRequestError(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);

    appendGallery(data.hits);
    lightbox.refresh();
    scrollPage();

    if (currentPage >= totalPages) {
      showEndOfResultsMessage();
      return;
    }

    showLoadMoreButton();
  } catch (error) {
    currentPage -= 1;
    showRequestError(error);
  } finally {
    hideLoader();
  }
}

function updateLoadMoreVisibility() {
  if (currentPage < totalPages) {
    showLoadMoreButton();
    return;
  }

  hideLoadMoreButton();
  showEndOfResultsMessage();
}

function showNoResultsMessage() {
  iziToast.error({
    title: "",
    message:
      "Sorry, there are no images matching your search query. Please try again!",
    position: "topRight",
    class: "toast-error",
  });
}

function showEndOfResultsMessage() {
  iziToast.info({
    title: "",
    message: "We're sorry, but you've reached the end of search results.",
    position: "topRight",
    class: "toast-end",
  });
}

function showRequestError(error) {
  let message = "Failed to fetch images. Please try again!";

  if (error?.code === "MISSING_KEY") {
    message = "Missing Pixabay API key. Add VITE_PIXABAY_KEY to .env.";
  } else if (error?.response?.status === 400) {
    message = "Invalid Pixabay API key. Please check VITE_PIXABAY_KEY.";
  }

  iziToast.error({
    title: "",
    message,
    position: "topRight",
    class: "toast-error",
  });
}

function scrollPage() {
  const firstGalleryCard = gallery.firstElementChild;

  if (!firstGalleryCard) {
    return;
  }

  const cardHeight = firstGalleryCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}
