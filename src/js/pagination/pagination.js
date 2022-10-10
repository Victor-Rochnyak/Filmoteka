import Pagination from 'tui-pagination';
import MoviesApiService from '../api/api';
import makingMarkup from '../gallery/gallaryCard';

const homeCardsContainer = document.querySelector('.cards__list--home');
const moviesApiService = new MoviesApiService();

export function createPagination(total_results) {
  const container = document.getElementById('pagination');
  const options = {
    totalItems: total_results,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const mediaQuery = window.matchMedia('(max-width: 768px)');
  mediaQuery.addEventListener('change', handleMobileChange);
  function handleMobileChange(event) {
    // console.log('EVENT: ', event);
    if (event.matches) {
      // console.log('OPTIONS: ', options);
      options.visiblePages = 3;
    }
  }
  handleMobileChange(mediaQuery);

  const pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    homeCardsContainer.innerHTML = '';
    moviesApiService.page = event.page;
    moviesApiService
      .fetchTrendingMovies()
      .then(({ results }) => {
        makingMarkup(results);

        for (const result of results) {
          localStorage.setItem(`film_${result.id}`, JSON.stringify(result));
        }
      })
      .catch(error => console.log(error));
  });
}
