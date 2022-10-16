import * as basicLightbox from 'basiclightbox'
// $basicLightbox__background: rgba(0, 0, 0, .1);
// $basicLightbox__background: rgba(0, 0, 0, .8); // Background color
// $basicLightbox__zIndex: 1000; // Stack order
// $basicLightbox__duration: .4s; // Transition duration
// $basicLightbox__timing: ease; // Transition timing

// @import 'src/styles/main';





const openModal = document.querySelector('.open-modal-js');
const closeModal = document.querySelector('.button-close');
const modal =document.querySelector('.modal-footer');


const teamModal = basicLightbox.create(
	document.querySelector('#modalsection')
)
openModal.addEventListener('click', ()=>{
    teamModal.show()
})
// instance.show()


