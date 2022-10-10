import API_KEY from '../api/apiKey';

const galleryFilm = document.querySelector('.cards__list--home');
const modalEl = document.querySelector('.modal');

// Ф-ція фетчу одного фільму за id.

function fetchOneMovieInfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`;
  return fetch(url).then(response => {
    return response.json();
  });
}

galleryFilm.addEventListener('click', onOpenModal);

// Ф-ція відкриття модалки
function onOpenModal(evt) {
  evt.preventDefault();

  const movie_id = evt.target.dataset.id;

  fetchOneMovieInfo(movie_id).then(data => {
    murckupCard(data);

    // додаємо слухача на кнопку закриттяя

    const btnModalClos = document.querySelector('.close__button__modal');
    btnModalClos.addEventListener('click', () => onCloseBtn());
  });

  modalEl.classList.add('is-open');
}

// Ф-ція закриття модалки
function onCloseBtn() {
  modalEl.classList.remove('is-open');
}

function murckupCard({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  overview,
  genres,
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
        <h2 class='film__title'>${title}</h2>

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
            <p class='film__info--uper'>${original_title}</p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Genre</p>
            <p class='film__about__text'>${
              genres.map(genre => genre.name).join(', ') || 'N/A'
            }</p>
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
