import { load, save, remove } from './gallery/local-st-load-remove-save';
import './gallery/modal-for-library';

const libGalleryRef = document.querySelector('.cards__list');
const btnWatched = document.querySelector('.btnWatched');
const btnQueue = document.querySelector('.btnQueue');

btnWatched.addEventListener('click', showListWatched);
btnQueue.addEventListener('click', showListQueue);

onLoad();

export function showListWatched(e) {
  e.preventDefault();

  libGalleryRef.innerHTML = '';
  btnWatched.classList.add('activ');
  btnQueue.classList.remove('activ');

  const listWatched = load('watched');

  if (!listWatched) {
  }

  Render(listWatched);
}

export function showListQueue(e) {
  e.preventDefault();

  libGalleryRef.innerHTML = '';
  btnWatched.classList.remove('activ');
  btnQueue.classList.add('activ');

  const listQueue = load('queue');

  if (!listQueue) {
  }
  Render(listQueue);
}

function Render(obj) {
  
  //debugger; 
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
        let date = (release_date || first_air_date || 'n/a ').slice(0, 4);
        return `<div class="movie-card">
                <img width="100%" height="402" class="movie-card__img"
                src="${setPosters(poster_path)}" alt="" data-id="${id}"
                loading="lazy"/>

                <div class="info">
                    <p class="info-item">
                        <b>${title || name}</b>
                    </p>
                    <p class="info-item">
                        <b>${genresList(genre_ids)} | ${date}</b>                  
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

function onLoad() {
  libGalleryRef.innerHTML = '';
  let listWt = load('watched');
  
  if (listWt && listWt.length>0) {    
    Render(listWt);
    btnWatched.classList.add('activ');
    return;
  }

  let listQue = load('queue');
  
  if (listQue && listQue.length>0) {
    Render(listQue);
    btnQueue.classList.add('activ');
    return;
  }  
  libGalleryRef.innerHTML = ` <div class="wrong-box"> <p class="wrong-text">Not Found</p>        
  <img class="img-wrong" src="https://s3.amazonaws.com/stickers.wiki/laughingCStickers/1291222.512.webp"></div>`
}



