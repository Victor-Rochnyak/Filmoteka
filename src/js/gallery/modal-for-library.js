import { load, save, remove } from './local-st-load-remove-save';
import { showListWatched } from '../library';
import { showListQueue } from '../library';

const galleryFilm = document.querySelector('.cards__list');
const modalEl = document.querySelector('.modal');

galleryFilm.addEventListener('click', onOpenModal);
let movie_id;
// Ф-ція відкриття модалки
function onOpenModal(evt) {
  evt.preventDefault();
  if (
    evt.target.nodeName !== 'IMG' &&
    evt.target.nodeName !== 'P' &&
    evt.target.nodeName !== 'A'
  ) {
    return;
  }

  evt.stopPropagation();
  closeEsc();
  modalEl.classList.add('is-open');

  // const movie_id = evt.target.dataset.id;
  movie_id = evt.target.dataset.id;

  // ____________local st----закидаєм картку фільму в LS

  const watchListJson = load('watched');
  const queueListJson = load('queue');

  const filmForLibrary = watchListJson.concat(queueListJson);

  const oneFilmById = filmForLibrary.find(film => film.id === Number(movie_id));

  // ____________local st----

  murckupCard(oneFilmById);
  closeBtn();

  // --------test-btn--------------
  const btnWatchEl = document.querySelector('.btn__watch');
  const btnQueueEl = document.querySelector('.btn__queue');

  btnWatchEl.addEventListener('click', onLibraruWatch);
  btnQueueEl.addEventListener('click', onLibraruQueue);

  // відпрацювання кнопки проглянуте
  function onLibraruWatch(ev) {
    const btnEl = ev.target;

    if (!load('watched')) {
      const firstLocalSt = save('watched', []);
    }

    if (btnEl.getAttribute('data-show') === 'true') {
      addWatchedLocalStorage(oneFilmById);
    }
    if (btnEl.getAttribute('data-show') === 'false') {
      removeFromWatchedList(movie_id);
    }

    changeTextBtnWatch(btnEl);
    showListWatched(ev);
  }

  function onLibraruQueue(ev) {
    const btnEl = ev.target;

    if (!load('queue')) {
      const firstLocalSt = save('queue', []);
    }

    if (btnEl.getAttribute('data-show') === 'true') {
      addQueueLocalStorage(oneFilmById);
    }
    if (btnEl.getAttribute('data-show') === 'false') {
      removeFromQueueList(movie_id);
    }

    changeTextBtnQueue(btnEl);
    showListQueue(ev);
  }
  // --------test-btn--------------
}
let arrayFilmsWatched = [];
let localWatchListJson = [];
let watchList = [];

function addWatchedLocalStorage(obj) {
  // перевірка, чи є вже ця картка в сховищі

  localWatchListJson = load('watched');

  if (localWatchListJson) {
    watchList = localWatchListJson;
  }

  let index1 = watchList.findIndex(film => film.id === Number(movie_id));
  if (index1 != -1) {
    return;
  }

  // перевірка, чи є вже ця картка в сховищі

  arrayFilmsWatched = localWatchListJson;

  arrayFilmsWatched.push(obj);

  localStorage.setItem('watched', JSON.stringify(arrayFilmsWatched));

  return arrayFilmsWatched;
}
function removeFromWatchedList(id) {
  localWatchListJson = load('watched');

  if (localWatchListJson) {
    watchList = localWatchListJson;
  }

  remove('watched');

  let index = watchList.findIndex(film => film.id === Number(movie_id));

  watchList.splice(index, 1);
  save('watched', watchList);
}

// ________ Add Remove QUEUE

let arrayFilmsQueue = [];
let localQueueListJson = [];
let queueList = [];

function addQueueLocalStorage(obj) {
  // перевірка, чи є вже ця картка в сховищі

  localQueueListJson = load('queue');

  if (localQueueListJson) {
    queueList = localQueueListJson;
  }

  let index1 = queueList.findIndex(film => film.id === Number(movie_id));
  if (index1 != -1) {
    return;
  }

  // перевірка, чи є вже ця картка в сховищі

  arrayFilmsQueue = localQueueListJson;

  arrayFilmsQueue.push(obj);

  localStorage.setItem('queue', JSON.stringify(arrayFilmsQueue));

  return arrayFilmsQueue;
}
function removeFromQueueList(id) {
  localQueueListJson = load('queue');

  if (localQueueListJson) {
    queueList = localQueueListJson;
  }

  remove('queue');

  let index = queueList.findIndex(film => film.id === Number(movie_id));

  queueList.splice(index, 1);
  save('queue', queueList);
}
// ________ Add Remove QUEUE

//  Ф-ції зміни тексту на кнопках
function changeTextBtnQueue(btnEl) {
  if (btnEl.getAttribute('data-show') === 'true') {
    btnEl.innerText = 'Remove from queue';
    btnEl.setAttribute('data-show', 'false');
  } else {
    btnEl.innerText = 'Add to queue';
    btnEl.setAttribute('data-show', 'true');
  }
}
function changeTextBtnWatch(btnEl) {
  if (btnEl.getAttribute('data-show') === 'true') {
    btnEl.innerText = 'Remove from watched';
    btnEl.setAttribute('data-show', 'false');
  } else {
    btnEl.innerText = 'Add to watched';
    btnEl.setAttribute('data-show', 'true');
  }
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
function setPosters(poster_path) {
  if (poster_path === null || poster_path === 'undefined') {
    return 'https://wipfilms.net/wp-content/data/posters/tt0338683.jpg';
  }

  return `https://www.themoviedb.org/t/p/w500${poster_path}`;
}

// Ф-ція рендеру кнопок модалки

function btnChangeWatch() {
  localWatchListJson = load('watched');

  if (localWatchListJson) {
    watchList = localWatchListJson;
  }

  let index = watchList.findIndex(film => film.id === Number(movie_id));
  // перевіряєм чи знайшло фільм, тру якщо Є ФІЛЬМ
  if (index != -1) {
    return '<button type="button" class="film__button btn__watch" data-id="${id}" data-show="false">Remove from watched</button>';
  } else {
    return '<button type="button" class="film__button btn__watch" data-id="${id}" data-show="true">Add to watched</button>';
  }
}
function btnChangeQueue() {
  localQueueListJson = load('queue');
  if (localQueueListJson) {
    queueList = localQueueListJson;
  }
  let index = queueList.findIndex(film => film.id === Number(movie_id));
  if (index != -1) {
    return '<button type="button" class="film__button btn__queue" data-id="${id}" data-show="false">Remove from queue</button>';
  } else {
    return '<button type="button" class="film__button btn__queue" data-id="${id}" data-show="true">Add to queue</button>';
  }
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
  id,
}) {
  return (modalEl.innerHTML = `
  <div class='modal__backdrop'></div>

  <div class='modal__container'>
    <div class='film__image'>
      <img
        class='image'
        src='${setPosters(poster_path)}'
        alt='${title || name}'
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
      <div class='film__button__wrapper'>${btnChangeWatch()}

        ${btnChangeQueue()}
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
