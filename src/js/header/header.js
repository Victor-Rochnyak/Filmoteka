
import makingMarkup from '../gallery/gallaryCard';
import API_KEY from '../api/apiKey';
import { createPagination } from '../pagination/pagination-query';
import MoviesApiService from '../api/api';
import { load, save, remove } from '../gallery/local-st-load-remove-save';
// import MoviesApiService from '../api/api';

const input = document.querySelector('.search__input');
const btn = document.querySelector('.search__button');
const searchForm = document.querySelector('.search');
const searchFilms = input.value.trim();

const movieApiServise = new MoviesApiService();
movieApiServise.query = searchFilms;

let totalResults;

// MovieSearch('game')
//Функція вітягує фільми
async function MovieSearch(searchFilm) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchFilm}`
  );
  const respData = await resp.json();
  console.log(respData.total_results)
  totalResults = respData.total_results;
  return respData.results;
}



// при клікі на кнопку ввідображає фільми з інпуту
btn.addEventListener('click', searchMovies);
async function searchMovies(event) {
  event.preventDefault();
 
  const data = await MovieSearch(input.value);
  save('film', data);
  // console.log(input.value);
  clearGallaryContainer();
  // renderMarkupSearchFilms()
  makingMarkup(data);
  
  input.value = '';
  createPagination(totalResults);
}
// малює контейнер для фільміф з інпуту
function clearGallaryContainer() {
  const gallaryContainer = document.querySelector('.cards__list--home');
  gallaryContainer.innerHTML = '';
}


//!---------------------
// async function get_movie_by_id (id) {
//   const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
//   const respData = await resp.json()
//   return respData
// }

