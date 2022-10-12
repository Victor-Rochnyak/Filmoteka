import { load, save, remove } from './gallery/local-st-load-remove-save';
import './gallery/modal-for-library';

const libGalleryRef = document.querySelector('.cards__list');
const btnWatched = document.querySelector('.btnWatched');
const btnQueue = document.querySelector('.btnQueue');

btnWatched.addEventListener('click', showListWatched);
btnQueue.addEventListener('click', showListQueue);

console.log('В библиотеке');

function showListWatched(e) {
  e.preventDefault();
  libGalleryRef.innerHTML = '';
  btnWatched.classList.add('activ');
  btnQueue.classList.remove('activ');
  console.log(btnWatched);
  console.log(btnQueue);

  const listWatched = load('watched');
  console.log(listWatched);

  if (!listWatched) {
    console.log('Вывести заглушку');
  }

  Render(listWatched);
}

function showListQueue(e) {
  e.preventDefault();
  libGalleryRef.innerHTML = '';
  btnWatched.classList.remove('activ');
  btnQueue.classList.add('activ');
  console.log(btnWatched);
  console.log(btnQueue);

  const listQueue = load('queue');
  console.log(listQueue);

  if (!listQueue) {
    console.log('Вывести заглушку');
  }
  Render(listQueue);
}

function Render(obj) {
  const markup = obj
    .map(
      ({
        title,
        name,
        poster_path,
        genre_ids,
        id,
        release_date,
        first_air_date,
      }) => {
        return `<div class="movie-card">
                <img width="280" height="402" class="movie-card__img"
                src="${setPosters(poster_path)}" alt="" data-id="${id}"
                loading="lazy"/>

                <div class="info">
                    <p class="info-item">
                        <b>${title || name}</b>
                    </p>
                    <p class="info-item">
                        <b>${genresList(genre_ids)} | ${(
          release_date || first_air_date
        ).slice(0, 4)}</b>                  
                </div>
            </div>`;
      }
    )
    .join('');
  libGalleryRef.insertAdjacentHTML('beforeend', markup);
}

function setPosters(poster_path) {
  if (poster_path === null || poster_path === undefined) {
    return 'https://i.pinimg.com/originals/74/3d/b2/743db230d891b47c1d8c66b161111b91.jpg';
  }
  return `https://www.themoviedb.org/t/p/w500${poster_path}`;
}

function genresList(array) {
  let genre_names = '';
  let foundGenres = 0;
  const arrGenres = JSON.parse(localStorage.getItem('genre'));
  for (const id of array) {
    const genre_name = arrGenres.find(genre => id === genre.id);
    //const genre_name = localStorage.getItem(`genre_${id}`);
    if (!genre_name) {
      continue;
    }
    if (genre_names) {
      genre_names += ', ';
    }
    if (foundGenres === 2) {
      genre_names += 'Others';
      break;
    }

    foundGenres += 1;
    genre_names += genre_name.name;
  }
  if (!genre_names) {
    genre_names = 'unknown';
  }
  return genre_names;
}

showListWatched();
