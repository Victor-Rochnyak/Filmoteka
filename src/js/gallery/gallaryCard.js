import { URL_POSTER } from '../api/baseUrls';
import MoviesApiService from '../api/api';
import { createPagination } from '../pagination/pagination';
// import {renderSlider} from '../slider';

const homeCardsContainer = document.querySelector('.cards__list--home');
const sliderContainerRef = document.querySelector('.swiper-wrapper');
const moviesApiService = new MoviesApiService();


//  ЖАНРИ ДО LOCALSTORAGE
moviesApiService
  .fetchGenres()
  .then(({ genres }) => {
    for (const { id, name } of genres) {
      localStorage.setItem(`genre_${id}`, name);
    }
  })
  .catch(error => console.log(error));

// ВІДОБРАЖЕННЯ РОЗМІТКИ
moviesApiService
  .fetchTrendingMovies()
  .then(({ results, total_results }) => {
    renderSlider(results);
    makingMarkup(results);
    createPagination(total_results);
    for (const result of results) {
      localStorage.setItem(`film_${result.id}`, JSON.stringify(result));
    }
  })
  .catch(error => console.log(error));

function genresList(array) {
  let genre_names = '';

  for (const id of array) {
    const genre_name = localStorage.getItem(`genre_${id}`);
    if (!genre_name) {
      continue;
    }
    if (genre_names) {
      genre_names += ', ';
    }
    genre_names += genre_name;
  }
  return genre_names;
}
// РОЗМІТКА
export default function makingMarkup(results) {
  const markup = results
    .map(({ title, name, poster_path, genre_ids, id, release_date, first_air_date}) => {
      return `<div class="movie-card">
                <img width="280" height="402" class="movie-card__img"
                src="${URL_POSTER}/${poster_path}" alt="" data-id="${id}"
                loading="lazy"/>

                <div class="info">
                    <p class="info-item">
                        <b>${title || name}</b>
                    </p>
                    <p class="info-item">
                        <b>${genresList(genre_ids)} | ${(release_date || first_air_date).slice(0, 4)}</b>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                    </p>
                </div>
            </div>`;
    })
    .join('');
  return insertFilmsMarkup(markup);
}

// Функція для вставки розмітки в контейнер
function insertFilmsMarkup(filmsMarkup) {
  homeCardsContainer.insertAdjacentHTML('beforeend', filmsMarkup);
}


function renderSlider() {
  const markup = moviesApiService.sliderFilms
    .map(
      ({ id, poster_path, title }) =>
        `<div class="swiper-slider__wrapper swiper-slide">
              <img class="slide-img"
              src="${URL_POSTER}/${poster_path}" 
              alt="${title}" "id=${id}" 
              width=""
              />

          </div>`
    )
    .join('');
    
    sliderContainerRef.insertAdjacentHTML('beforeend', markup);

  const swiper = new Swiper('.swiper', {
    disableOnInteraction: true,
    slidesPerView: 7,
    slidesPerGroup: 1,
    spaceBetween: 65,
    speed: 2500,
    // centralSlides: true,
    loop: true,

    grabCursor: true,
    effect: 'coverflow',
    coverflowEffect: {
      //modifier:5, //для mobile
      depth: 70,
      rotate: 8,
      stretch: 50,
      slideShadows: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    freeMode: true,

    breakpoints: {
      768: {
        loop: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 60,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
      1200: {
        loop: true,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 65,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
      1500: {
        loop: true,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 58,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
    },
  });
}
