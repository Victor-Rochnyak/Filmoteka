import makingMarkup from '../gallery/gallaryCard';
import API_KEY from '../api/apiKey';
import { createPagination } from '../pagination/pagination-query';
import MoviesApiService from '../api/api';
import { load, save, remove } from '../gallery/local-st-load-remove-save';

const homeCardsContainer = document.querySelector('.cards__list--home');
const input = document.querySelector('.search__input');
const btn = document.querySelector('.search__button');
const searchForm = document.querySelector('.search');

// Для виводу повідомлення про помилку+++++++++++
const error = document.querySelector('.warning-notification');
const cardsContainer = document.querySelector('.cards__list');
// ++++++++++++++

const movieApiServise = new MoviesApiService();

async function searchMovies(evt) {
  evt.preventDefault();

  try {
    const searchFilms = input.value.trim();
    movieApiServise.query = searchFilms;
    // Якщо інпут пошуку пустий  ==========
    if (movieApiServise.query === '') {
      return (error.textContent =
        'No matches found for your query. Enter the correct movie name.');
    } else error.textContent = '';
    // ===========
    await movieApiServise.movieSearch().then(({ results, total_results }) => {
      clearGallaryContainer();

      makingMarkup(results);

      createPagination(searchFilms, total_results);
      localStorage.setItem('film', JSON.stringify(results));

      // Якщо в базі немає фільму який шукається
      if (results.length < 1) {
        return (
          (error.textContent = `No matches found for your query. Enter the correct movie name.`),
          (cardsContainer.innerHTML = `          
          <img class="img-wrong" src="https://s3.amazonaws.com/stickers.wiki/laughingCStickers/1291222.512.webp">`)
        );
      } else error.textContent = '';
    });
    // ================

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
//   const resp = await fetch(https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY})
//   const respData = await resp.json()
//   return respData
// }
