import { offers } from './data.js';
import { renderCard } from './cards.js';
import { setActiveState, setInactiveState, validateRooms } from './form.js';

const map = document.querySelector('.map');
map.appendChild(renderCard(offers[0]));

setInactiveState();
setActiveState();
validateRooms();
