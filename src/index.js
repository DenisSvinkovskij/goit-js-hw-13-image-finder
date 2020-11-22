import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';

import imagesCardTpl from './templates/img-card-markup.hbs';
import PixabayApiServise from './js/APIService';

import './styles.scss';

const refs = {
  input: document.querySelector('#search-form input'),
  outputList: document.querySelector('.gallery'),
  watcher: document.querySelector('.watcher'),
};

const pixabayApiServise = new PixabayApiServise();

refs.input.addEventListener('input', debounce(onSearchInputChange, 500));
refs.outputList.addEventListener('click', onClickImage);

function onSearchInputChange({ target }) {
  pixabayApiServise.query = target.value;
  if (pixabayApiServise.query === '') {
    clearArticlesList();
    return;
  }

  clearArticlesList();
  pixabayApiServise.resetPage();
  fetchToPixabayApiAndRender();
}

function fetchToPixabayApiAndRender() {
  pixabayApiServise.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup({ hits }) {
  refs.outputList.insertAdjacentHTML('beforeend', imagesCardTpl(hits));
}

function clearArticlesList() {
  refs.outputList.innerHTML = '';
}

//Modal img settings

function onClickImage({ target: { dataset } }) {
  basicLightbox
    .create(
      `<img width="" height="" src="${dataset.sourse}">
`,
    )
    .show();
}

//infinite scroll settings

const intersectionCallback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && pixabayApiServise.query !== '') {
      fetchToPixabayApiAndRender();
    }
  });
};

const intersectionOptions = {
  rootMargin: '0% 0% 50% 0%',
};

const observer = new IntersectionObserver(
  intersectionCallback,
  intersectionOptions,
);

observer.observe(refs.watcher);