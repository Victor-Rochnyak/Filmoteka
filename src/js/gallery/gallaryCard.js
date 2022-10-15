import { URL_POSTER } from '../api/baseUrls';
import MoviesApiService from '../api/api';
import { createPagination } from '../pagination/pagination';
// import renderSlider from '../slider';

const homeCardsContainer = document.querySelector('.cards__list--home');
const sliderContainerRef = document.querySelector('.swiper-wrapper');
const input = document.querySelector('.search__input');
const moviesApiService = new MoviesApiService();

// let genresItem = [];
//  ЖАНРИ ДО LOCALSTORAGE
moviesApiService
  .fetchGenres()
  .then(({ genres }) => {
    localStorage.setItem('genre', JSON.stringify(genres));

    // for (const { id, name } of genres) {
    //   localStorage.setItem(`genre_${id}`, name);
    // }
  })
  .catch(error => console.log(error));

// ВІДОБРАЖЕННЯ РОЗМІТКИ
moviesApiService
  .fetchTrendingMovies()
  .then(({ results, total_results }) => {
    renderSlider(results);
    makingMarkup(results);

    createPagination(total_results);
    localStorage.setItem('film', JSON.stringify(results));
    // for (const result of results) {
    //   localStorage.setItem(`film_${result.id}`, JSON.stringify(result));
    // }
  })
  .catch(error => console.log(error));

// moviesApiService
// .fetchSearchingMovies()
// .then(({ results, total_results }) => {

//   makingMarkup(results);

//   createPagination(total_results);
//   localStorage.setItem('film', JSON.stringify(results));
//   // for (const result of results) {
//   //   localStorage.setItem(`film_${result.id}`, JSON.stringify(result));
//   // }
// })
// .catch(error => console.log(error));

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
// РОЗМІТКА
function setPosters(poster_path) {
  if (poster_path === null || poster_path === undefined) {
    return 'https://i.pinimg.com/originals/74/3d/b2/743db230d891b47c1d8c66b161111b91.jpg';
  }

  return `https://www.themoviedb.org/t/p/w500${poster_path}`;
}

export default function makingMarkup(results) {
  const markup = results
    .map(
      ({
        title,
        name,
        vote_average,
        poster_path,
        genre_ids,
        id,
        release_date,
        first_air_date,
      }) => {
        let data = (release_date || first_air_date || 'n/a ').slice(0, 4);
        return `<li class="movie-card">
        <div class="films__img">
                <img src="${setPosters(poster_path)}" alt="" data-id="${id}"
                loading="lazy"/></div>

                <div class="info">
                    <p class="info-item ">
                        ${title || name} 
                    </p>
                    <p class="info-item">
                        ${genresList(genre_ids)} | ${data}
                 <span class='film__rating'>${vote_average.toFixed(
                   1
                 )}</span></p>
                </div>
            </li>`;
      }
    )
    .join('');
  return insertFilmsMarkup(markup);

  // Функція для вставки розмітки в контейнер
  function insertFilmsMarkup(filmsMarkup) {
    homeCardsContainer.insertAdjacentHTML('beforeend', filmsMarkup);
  }
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
    // // centralSlides: true,
    loop: true,

    grabCursor: true,
    effect: 'coverflow',
    coverflowEffect: {
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
    // freeMode: true,

    breakpoints: {
      768: {
        // loop: true,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 60,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
      1200: {
        // loop: true,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 65,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
      1500: {
        // loop: true,
        slidesPerView: 7,
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
