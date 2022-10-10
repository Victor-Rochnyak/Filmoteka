import { Loading } from 'notiflix/build/notiflix-loading-aio';

//FT-21 Loader (Barabash)
export const startLoader = Loading.pulse('Please wait...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
    svgSize: '200',
    svgColor: '#ff6b09',
    // messageFontSize:'40px',
    messageColor: '#ff6b09',
  });
  
export const removeLoader = Loading.remove(1500);
  