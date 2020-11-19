import './styles.scss';

import imagesCardTpl from './templates/img-card-markup.hbs';
import PixabayApiServise from './js/APIService';

import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('#search-form input'),
  outputList: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const pixabayApiServise = new PixabayApiServise();

refs.input.addEventListener('input', debounce(onSearchInputChange, 500));
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

function onSearchInputChange(e) {
  pixabayApiServise.query = e.target.value;
  if (pixabayApiServise.query === '') {
    addClassHidenToLoadMoreBtn();
    clearArticlesContainer();
    return;
  }

  clearArticlesContainer();
  pixabayApiServise.resetPage();
  fetchToPixabayApiAndRender();
  removeClassHidenFromLoadMoreBtn();
}

function fetchToPixabayApiAndRender() {
  pixabayApiServise.fetchImages().then(({ hits }) => {
    appendImagesMarkup(hits);
  });
}

function appendImagesMarkup(images) {
  refs.outputList.insertAdjacentHTML('beforeend', imagesCardTpl(images));
}

function clearArticlesContainer() {
  refs.outputList.innerHTML = '';
}

//load-more button settings

async function onClickLoadMoreBtn() {
  refs.loadMoreBtn.disabled = true;

  await fetchToPixabayApiAndRender();

  refs.loadMoreBtn.disabled = false;

  setTimeout(() => {
    window.scrollBy({
      top: window.innerHeight - 50,
      behavior: 'smooth',
    });
  }, 300);
}

function addClassHidenToLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hiden');
}

function removeClassHidenFromLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hiden');
}
