import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_URL = 'https://pixabay.com/api';
const AUTH_TOKEN = '42319756-1866d229574eee1c1aa4e15c2';
const CLASS_HIDDEN = 'hidden';
axios.defaults.baseURL = API_URL;

const alertError = {
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  color: '#FFA000',
  position: 'topRight',
  icon: 'icon-octagon',
  iconText: '',
  timeout: 5000,
  titleColor: '#fff',
  messageColor: '#fff',
  iconColor: '#fff',
};

const paramsOptions = {
  key: AUTH_TOKEN,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 20,
};

const findPhotoForm = document.querySelector('.form');
const galleryList = document.querySelector('ul.gallery');
const loader = document.querySelector('.loader');
const showMoreButton = document.querySelector('#show-more');

let loadedPage = 1,
  totalHits = 1,
  searchQuery = '';

const lightbox = new SimpleLightbox('.gallery a', {
  sourceAttr: 'data-source',
  captionsData: 'alt',
  captionDelay: 250,
});

const addPhotos = photos => {
  galleryList.insertAdjacentHTML(
    'beforeend',
    photos
      .map(photo => {
        return `<li class="gallery-item">
                  <a class="gallery-link" href="${photo.largeImageURL}" data-source="${photo.largeImageURL}">
                    <img class="gallery-image" src="${photo.webformatURL}"  alt="${photo.tags}"/>
                  </a>
                </li>`;
      })
      .join('')
  );
  lightbox.refresh();
};

const galleryScroll = (page, itemsInPage) => {
  const indexOfItem = itemsInPage * (page - 1);
  const galleryItemPosition =
    galleryList.children[indexOfItem].getBoundingClientRect();
  window.scrollBy({
    top: galleryItemPosition.y,
    left: 0,
    behavior: 'smooth',
  });
};

const fetchPhotos = async (value, page) => {
  const response = await axios.get('/', {
    params: { ...paramsOptions, q: value, page },
  });
  return response.data;
};

const handleSearchSubmit = async event => {
  event.preventDefault();
  const searchText = event.target.elements.search.value.trim();
  event.target.elements.search.value = '';

  loader.classList.remove(CLASS_HIDDEN);

  galleryList.innerHTML = '';
  loadedPage = 1;
  totalHits = 1;

  try {
    const photos = await fetchPhotos(searchText, loadedPage);

    if (!photos.totalHits) {
      iziToast.show(alertError);
      loader.classList.add(CLASS_HIDDEN);
      return;
    }

    addPhotos(photos.hits);
    loadedPage++;
    searchQuery = searchText;
    totalHits = Math.ceil(photos.totalHits / paramsOptions.per_page);

    if (totalHits > 1) showMoreButton.classList.remove(CLASS_HIDDEN);
    else
      iziToast.show({
        ...alertError,
        message: "We're sorry, but you've reached the end of search results.",
      });
  } catch (error) {
    iziToast.show({ ...alertError, message: error.message, color: '#EF4040' });
  } finally {
    loader.classList.add(CLASS_HIDDEN);
  }
};

const handleSearchMore = async () => {
  loader.classList.remove(CLASS_HIDDEN);
  showMoreButton.classList.add(CLASS_HIDDEN);

  try {
    const photos = await fetchPhotos(searchQuery, loadedPage);

    addPhotos(photos.hits);
    galleryScroll(loadedPage, paramsOptions.per_page);
    loadedPage++;

    if (totalHits >= loadedPage) {
      showMoreButton.classList.remove(CLASS_HIDDEN);
    } else {
      iziToast.show({
        ...alertError,
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.show({ ...alertError, message: error.message });
  } finally {
    loader.classList.add(CLASS_HIDDEN);
  }
};

findPhotoForm.addEventListener('submit', handleSearchSubmit);
showMoreButton.addEventListener('click', handleSearchMore);
