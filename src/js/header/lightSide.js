const spanEl = document.querySelectorAll('.color');
const buttonRef = document.querySelector('.change-color');
const buttonText = document.querySelector('.settings__text');

buttonRef.addEventListener('click', () => {
  spanEl.forEach(element => {
    if (element.style.cssText !== 'background-color: brown;') {
      element.setAttribute('style', 'background-color: ' + 'brown');
      buttonText.textContent = 'LIGHT SIDE';
    } else {
      element.setAttribute('style', 'background-color: ' + '#fff');
      buttonText.textContent = 'DARK SIDE';
    }
  });
});