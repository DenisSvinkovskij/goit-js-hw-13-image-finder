// url  q=что_искать
const API_KEY = '19147241-2fe73d03b0bbed93b469d5f85';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
      const resultFetch = await fetch(url);
      const parsedResponse = await resultFetch.json();
      this.incrementPage();

      return parsedResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
