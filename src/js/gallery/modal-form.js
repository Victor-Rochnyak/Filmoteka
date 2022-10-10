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
    console.log(data);
    murckupCard(data);

    // додаємо слухача на кнопку закриття

    const btnModalClos = document.querySelector('.close__button__modal');
    btnModalClos.addEventListener('click', () => onCloseBtn());
  });

  modalEl.classList.add('is-open');
}

// Ф-ція закриття модалки
function onCloseBtn() {
  modalEl.classList.remove('is-open');
}

// Ф-ція відмльовування картки
function murckupCard(data) {
  return (modalEl.innerHTML = `
  <div class='modal__backdrop'></div>

  <div class='modal__container'>
    <div class='film__image'>
      <img
        class='image'
        src='https://www.themoviedb.org/t/p/w500${data.poster_path}'
        alt=''
        title=''
      />
    </div>

    <div class='film__information'>
      <div>
        <h2 class='film__title'>${data.title}</h2>

        <ul>
          <li class='film__item'>
            <p class='film__details'>Vote / Votes</p>
            <p class='film__info--uper'>
            <span class='film__rating--orange'>${data.vote_average}</span>
            <span class='film__rating--divider'> / </span>
            <span>${data.vote_count}</span>
          </p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Popularity</p>
            <p class='film__info--uper'>${data.popularity}</p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Original title</p>
            <p>${data.original_title}</p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Genre</p>
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h3 class='film__about__title'>About</h3>
        <p class='film__about__text'>${data.overview}
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
      >X</button>
    </div>
  </div>
  `);
  // const btnModalClos = document.querySelector('.close__button__modal');
  // btnModalClos.addEventListener('click', () => onCloseBtn());
}
