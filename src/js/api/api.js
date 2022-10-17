

import axios from 'axios';
import API_KEY from '../api/apiKey';
import { URL_TRENDING_FILMS } from '../api/baseUrls';
import { URL_GENRES } from '../api/baseUrls';
import { Loading } from 'notiflix/build/notiflix-loading-aio';




function scrollTo(to, duration = 700) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    
    easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
}


export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
    this.sliderFilms = [];
  }



  async movieSearch() {
    scrollTo()
    Loading.pulse('Please wait...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
      svgSize: '200',
      svgColor: '#ff6b09',
      // messageFontSize:'40px',
      messageColor: '#ff6b09',
    });
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&query=${this.searchQuery}&page=${this._page}`;
    const response = await axios.get(url);
    Loading.remove(1500);
    return response.data
  }
  //slider and galerry
  async fetchTrendingMovies() {
    try {
      scrollTo()
      Loading.pulse('Please wait...', {
            backgroundColor: 'rgba(0,0,0,0.8)',
            svgSize: '200',
            svgColor: '#ff6b09',
            // messageFontSize:'40px',
            messageColor: '#ff6b09',
          });
      const url = `${URL_TRENDING_FILMS}trending/movie/day?&api_key=${API_KEY}&page=${this._page}`;
      const response = await axios.get(url);
      this.sliderFilms = response.data.results;
      Loading.remove(1500);

      return this.sliderFilms, response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
    }
  }
  // Феч фільмів по жанрам
  fetchGenres() {
    const url = `${URL_GENRES}&language=en-US&api_key=${API_KEY}`;
    return fetch(url).then(response => {
      return response.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }
}
