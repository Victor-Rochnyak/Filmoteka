
import makingMarkup from '../gallery/gallaryCard';
import API_KEY from '../api/apiKey';
// import MoviesApiService from '../api/api';

const input = document.querySelector('.search__input');
const btn = document.querySelector('.search__button');
const searchForm = document.querySelector('.search');

// MovieSearch('game')
//Функція вітягує фільми
async function MovieSearch(searchFilm) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchFilm}`
  );
  const respData = await resp.json();
  return respData.results;
}
// при клікі на кнопку ввідображає фільми з інпуту
btn.addEventListener('click', searchMovies);

async function searchMovies(event) {
  event.preventDefault();

  const data = await MovieSearch(input.value);
  console.log(input.value);
  clearGallaryContainer();
  // renderMarkupSearchFilms()
  makingMarkup(data);
  input.value = '';
}
// малює контейнер для фільміф з інпуту
function clearGallaryContainer() {
  const gallaryContainer = document.querySelector('.cards__list--home');
  gallaryContainer.innerHTML = '';
}


// ///////////////////////////
// async function get_movie_by_id (id) {
//   const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
//   const respData = await resp.json()
//   return respData
// }

// const galleryFilm = document.querySelector('.cards__list--home');
// galleryFilm.addEventListener('click', onOpenModal);

// function onOpenModal(evt) {
//   evt.preventDefault();
//   evt.stopPropagation();
//   closeEsc();
//   modalEl.classList.add('is-open');

//   const movie_id = evt.target.dataset.id;
//   console.log(movie_id);
//   // ____________local st----
//   const filmsLocalSt = localStorage.getItem(`film`);
//   const arrayFilmLocalSt = JSON.parse(filmsLocalSt);
//   const oneFilmById = arrayFilmLocalSt.find(film => film.id == movie_id);
//   console.log(oneFilmById);
//   // ____________local st----

//   murckupCard(oneFilmById);
//   closeBtn();



