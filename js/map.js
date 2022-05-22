
import { sendRequest } from './api.js';
import { renderCard } from './cards.js';
import { setActiveState } from './form.js';

const MAX_PINS = 10;

const Map = {
  TILE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT: '&copy: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  ZOOM: 12.45,
};

const data = {lat: 35.6895, lng: 139.69171};
const address = document.querySelector('#address');

const map = L.map('map-canvas');

L.tileLayer(
  Map.TILE,
  {
    attribution: Map.COPYRIGHT,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnhor: [26, 52],
});

const marker = L.marker({
  lat: 35.6895,
  lng: 139.69171,
},
{
  draggable: true,
  icon: mainPinIcon,
}
).addTo(map);

marker.on('moveend' , (evt) => {
  const points = evt.target.getLatLng();
  address.value = `${points['lat'].toFixed(5)}, ${points['lng'].toFixed(5)}`;
});

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnhor: [20, 40],
});

const renderPins = (pins) => {
  pins.forEach((offer) => {
    const {
      location: {
        lat,
        lng
      }
    } = offer;

    const adPin = L.marker({
      lat,
      lng
    },
    {
      icon: adPinIcon,
    });

    adPin
      .addTo(map)
      .bindPopup(renderCard(offer), {
        keepInView: true
      });
  });
};

const onSuccess = (payload) => {
  renderPins(payload.slice(0, MAX_PINS));
};

const onError = (error = 'Произошла ошибка') => {
  const template = document.querySelector('#error').content;
  const content = template.cloneNode(true);
  const text = content.querySelector('.error__message');

  text.textContent = error;

  document.body.append(content);
};

map.on('load', () => {
  address.value = `${data['lat']}, ${data['lng']}`;
  setActiveState();
  sendRequest(onSuccess, onError, 'GET');
})
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, Map.ZOOM);
