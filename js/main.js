import { validateRooms } from './form.js';
import './map.js';
import './image-preview.js';

validateRooms();

document.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('error__button') ||
      target.classList.contains('success__message')) {
    target.parentElement.remove();
  }

  if (target.classList.contains('success')) {
    target.remove();
  }
});
