import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const API_KEYS = '74cf07cbcff58397c32fe332f07646fa';

function createTrailerLink(elementRef) {
  const trailerBtn = elementRef;
  trailerBtn.forEach(el =>
    el.addEventListener('click', e => {
      drawModalForTrailler(e.target.dataset.id);
    })
  );
}

async function drawModalForTrailler(id_film) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id_film}/videos?api_key=${API_KEYS}`,
      {
        params: {
          api_key: API_KEYS,
        },
      }
    );

    const data = response.data.results;
    if (data.length === 0 || data === undefined) {
      alert('Sorry, trailer not found.');
      return;
    }

    // const key = data[0].key;

    let key = '';
    data.forEach(obj => {
      if (obj.name.includes('Official')) {
        key = obj.key;
      }
    });
    console.log(key);

    const instance = basicLightbox.create(`
    <div class="modal__youtube">
    <iframe src="https://www.youtube.com/embed/${key}" width="640" height="480" frameborder="0"></iframe>
    </div>
  `);
    instance.show();
  } catch (error) {
    const instance = basicLightbox.create(`
      <div class="modal__youtube">
        <iframe width="100%" height="315" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`);

    instance.show();
  }
}

export default { createTrailerLink };
