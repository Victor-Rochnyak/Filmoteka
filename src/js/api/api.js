//  const galleryRef = document.querySelector(".gallery");
// const URL_TRENDING_FILMS = 'https://api.themoviedb.org/3/trending/all/day?api_key=74cf07cbcff58397c32fe332f07646fa';
// const URL_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=74cf07cbcff58397c32fe332f07646fa&language=en-US';

// async function getPopularFilms() {
//     try {
//         const responseFilms = await fetch(URL_TRENDING_FILMS);
//         const responseGenres = await fetch(URL_GENRES);
//        // debugger;
//         const dataFilms = await responseFilms.json();
//         const dataGenres = await responseGenres.json();
//         //console.log(dataFilms.results.length, dataGenres.genres.length);
//         saveDataToLocalStorage(dataGenres.genres, 'genres');

//         if (!dataFilms.results.length) {
//             console.log("Нет популярных фильмов");
//             return;
//         }

//         render(dataFilms.results);

//     }
//     catch(error)    {
//         console.log(error, "Что-то пошло не так");
//     }
// }

// function render(data) {
//     //debugger;
//     const genres = getDataFromLocalStorage('genres');
//     console.log(genres);
//     const markup = data.map(({poster_path, title, name, release_date, first_air_date, genre_ids
//     }) => {
//         let str = `<div class="photo-card"><a class="link" href=""><img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" loading="lazy" /></a>
//            <div class="info"><p class="film-name">${title}</p><p class="genre">${genre_ids} | ${release_date}</p></div></div>`;
//         console.log(str);
//         return str;
//     }).join("");
//     console.log(markup);
//     galleryRef.insertAdjacentHTML("beforeend", markup);
// }

// function saveDataToLocalStorage(data, key) {
//     try {
//         localStorage.setItem(key, JSON.stringify(data));
//     }catch (error) {
//     console.error("Set state error: ", error.message);
//   }
// }

// function getDataFromLocalStorage(key) {
//     try {
//         const data = localStorage.getItem(key);
//         return data === null ? undefined : JSON.parse(data);
//     }catch(error) {
//     console.error("Get state error: ", error.message);
//   }
// }

//
// getPopularFilms();
import axios from 'axios';
import API_KEY from '../api/apiKey';
import { URL_TRENDING_FILMS } from '../api/baseUrls';
import { URL_GENRES } from '../api/baseUrls';
import { startLoader, removeLoader } from '../components/loader';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
    this.sliderFilms = [];
  }

  // // Феч фільмів по трендам
  // fetchTrendingMovies() {
  // const url = `${URL_TRENDING_FILMS}trending/all/day?&api_key=${API_KEY}&page=${this._page}`;

  // return fetch(url).then(response => {
  //   return response.json();
  // });
  // }

  //slider and galerry
  async fetchTrendingMovies() {
    try {
      startLoader;
      const url = `${URL_TRENDING_FILMS}trending/all/day?&api_key=${API_KEY}&page=${this._page}`;
      const response = await axios.get(url);
      this.sliderFilms = response.data.results;
      removeLoader;

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


