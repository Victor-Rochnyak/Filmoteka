// import API_KEY from '../api/apiKey';

const galleryFilm = document.querySelector('.cards__list--home');
const modalEl = document.querySelector('.modal');

// Ф-ція фетчу одного фільму за id.
// function fetchOneMovieInfo(movie_id) {
//   const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`;
//   return fetch(url).then(response => {
//     return response.json();
//   });
// }

galleryFilm.addEventListener('click', onOpenModal);

// Ф-ція відкриття модалки
function onOpenModal(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  closeEsc();
  modalEl.classList.add('is-open');

  const movie_id = evt.target.dataset.id;
  console.log(movie_id);
  // ____________local st----
  const filmsLocalSt = localStorage.getItem(`film`);
  const arrayFilmLocalSt = JSON.parse(filmsLocalSt);
  const oneFilmById = arrayFilmLocalSt.find(film => film.id == movie_id);
  console.log(oneFilmById);
  // ____________local st----

  murckupCard(oneFilmById);
  closeBtn();

  // стара реалізація рендерингу за допомогою FETCH

  // const btnModalClos = document.querySelector('.close__button__modal');
  // btnModalClos.addEventListener('click', () => onCloseBtn());

  // fetchOneMovieInfo(movie_id).then(data => {
  //   console.log(data);
  //   murckupCard(data);

  //   // додаємо слухача на кнопку закриттяя
  //   const btnModalClos = document.querySelector('.close__button__modal');
  //   btnModalClos.addEventListener('click', () => onCloseBtn());
  // });
}

// Ф-ція закриття модалки
function onCloseBtn() {
  modalEl.classList.remove('is-open');
}
function closeBtn() {
  const btnModalClos = document.querySelector('.close__button__modal');
  btnModalClos.addEventListener('click', () => onCloseBtn());
}
// Close modal by Escape
function closeEsc() {
  window.addEventListener('keydown', closeModalByEsc);
  function closeModalByEsc(e) {
    if (e.code === 'Escape') {
      onCloseBtn();
      window.removeEventListener('keydown', closeModalByEsc);
    }
  }
}

// render film card
function genresList(array) {
  let array_genre_names = [];
  let genre_namess = '';

  for (const id of array) {
    try {
      const genre_name = localStorage.getItem(`genre`);
      const arrayAllGenres = JSON.parse(genre_name);
      const arrayIdGenres = arrayAllGenres.find(genre => genre.id == id);

      array_genre_names.push(arrayIdGenres.name || 'n/a');

      genre_namess = array_genre_names.join(', ');
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }
  return genre_namess;
}

function murckupCard({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  overview,
  genre_ids,
  name,
}) {
  function setPosters(poster) {
    if (poster === null) {
      return 'https://wipfilms.net/wp-content/data/posters/tt0338683.jpg';
    }

    return `https://www.themoviedb.org/t/p/w500${poster_path}`;
  }

  return (modalEl.innerHTML = `
  <div class='modal__backdrop'></div>

  <div class='modal__container'>
    <div class='film__image'>
      <img
        class='image'
        src='${setPosters(poster_path)}'
        alt=''
        title=''
      />
    </div>

    <div class='film__information'>
      <div>
        <h2 class='film__title'>${title || name}</h2>

        <ul>
          <li class='film__item'>
            <p class='film__details'>Vote / Votes</p>
            <p class='film__info--uper'>
            <span class='film__rating--orange'>${vote_average}</span>
            <span class='film__rating--divider'> / </span>
            <span>${vote_count}</span>
          </p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Popularity</p>
            <p class='film__info--uper'>${popularity}</p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Original title</p>
            <p class='film__info--uper'>${original_title || name}</p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Genre</p>
            <p class='film__about__text'>${genresList(genre_ids)}
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h3 class='film__about__title'>About</h3>
        <p class='film__about__text'>${overview}
        </p>
      </div>
      <div class='film__button__wrapper'>
        <button type='button' class='film__button btn__watch' data-id=''>Add
          to watched</button>
        <button type='button' class='film__button btn__queue' data-id=''>Add
          to queue</button>
      </div>
      <button
        type='button'
        class='close__button__modal'
        data-action='close-modal'
      >
       <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute"><path d="m8 8 14 14M8 22 22 8" stroke="#000" stroke-width="2"/></svg>
    </button>
    </div>
  </div>
  `);
}
