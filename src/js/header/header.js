import makingMarkup from '../gallery/gallaryCard';
import API_KEY from '../api/apiKey';
import { createPagination } from '../pagination/pagination-query';
import MoviesApiService from '../api/api';
import { load, save, remove } from '../gallery/local-st-load-remove-save';

const homeCardsContainer = document.querySelector('.cards__list--home');
const input = document.querySelector('.search__input');
const btn = document.querySelector('.search__button');
const searchForm = document.querySelector('.search');

const movieApiServise = new MoviesApiService();


async function searchMovies(evt) {
  evt.preventDefault();

  try {
    searchFilms = input.value.trim();
    movieApiServise.query = searchFilms;
    if (movieApiServise.query === '') return;
    await movieApiServise.movieSearch().then(({ results, total_results }) => {
      clearGallaryContainer();
  
      makingMarkup(results);

      createPagination(searchFilms, total_results);
      localStorage.setItem('film', JSON.stringify(results));
    });

    input.value = '';
  } catch (error) {
    console.log(error);
  }
}
// при клікі на кнопку ввідображає фільми з інпуту
btn.addEventListener('click', searchMovies);
//  function searchMovies(event) {
//   event.preventDefault();

//   let inputValue = input.value;

//   movieApiServise.query=inputValue;
// save('film', data);
// // console.log(input.value);
// clearGallaryContainer();
// // renderMarkupSearchFilms()
// makingMarkup(data);

// input.value = '';
//   // createPagination(totalResults);
// }
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


