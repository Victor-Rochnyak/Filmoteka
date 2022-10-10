import makingMarkup from "../gallery/gallaryCard";

const header = document.querySelector('.page-header');
function insertFilmsLibrary(filmsMarkup) {
    header.insertAdjacentHTML('afterend', filmsMarkup);
  }
 
  // КОД ПРОЕКТА
  let arrayFilmsWatched = [];
  let arrayFilmsQueue = [];
  
//   Для модалки
  export function addWatchedLocalStorage (obj) {
      
      arrayFilmsWatched.push(...obj);
  
      localStorage.setItem('watched', JSON.stringify(arrayFilmsWatched));
  
      console.log('arrayFilmsWatched', arrayFilmsWatched);
      return arrayFilmsWatched;
  }
//   Для модалки
  export function addQueueLocalStorage (obj) {
      
      arrayFilmsQueue.push(...obj);
  
      localStorage.setItem('queue', JSON.stringify(arrayFilmsQueue));
  
      console.log('arrayFilmsQueue', arrayFilmsQueue);
      return arrayFilmsQueue;
  }
//   Код для кнопок
  export function getWatchedFilms() {
      try {
          const saveFilms = localStorage.getItem('watched');
          const parsedFilms = JSON.parse(saveFilms);

          const renderWatched = makingMarkup(parsedFilms);
          insertFilmsLibrary(renderWatched);
      } catch (error) {
          console.log(error);
      }
  }
//   Код для кнопок
  export function getQueueFilms () {
      try {
          const saveFilms = localStorage.getItem('queue');
          const parsedFilms = JSON.parse(saveFilms);

          const renderQueue = makingMarkup(parsedFilms);
          insertFilmsLibrary(renderQueue);
      } catch (error) {
          console.log(error);
      }
  }