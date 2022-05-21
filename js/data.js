import { getRandomFloat, getRandomInteger, shuffleArray, getNumber, getRandomArrayElement } from './util.js';

const TITLES = [
  'Гостиница',
  'Апартаменты',
  'Квартира',
  'Отель',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'В этом месте все мечты сбываются',
  'Здесь вы действительно отдохнете',
  'Местоположение данного предложения просто ВАУ!',
  'Вид из окна превосходит все ожидания',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const addOffer = (index) => ({
  author: {
    avatar: `img/avatars/user${getNumber(index, 2)}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${getRandomFloat(35.65000, 35.70000, 5)}, ${getRandomFloat(139.70000, 139.80000, 5)}`,
    price: getRandomInteger(0, 100000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger(1, 3),
    guests: getRandomInteger(1, 3),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: shuffleArray(FEATURES).slice(0, getRandomInteger(0, FEATURES.length)),
    description: getRandomArrayElement(DESCRIPTION),
    photos: shuffleArray(PHOTOS).slice(0, getRandomInteger(0, PHOTOS.length)),
  },
  location: {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lang: getRandomFloat(139.70000, 139.80000, 5)
  },
});

const offers = [];

for (let i = 0; i < 10; i++) {
  offers[i] = addOffer(i + 1);
}

/*
const lengthArray = 10;
const offers = Array.from({length: lengthArray}, addOffer);*/

export {offers};

