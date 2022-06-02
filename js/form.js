import { sendRequest } from './api.js';
import { resetImage } from './image-preview.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formElement = document.querySelectorAll('fieldset, .map__filter, .ad-form__slider'); //коллекция всех элементов, которые нужно заблокировать
const MAX_PRICE = 100000;
//настройка состояния формы
const setFieldsActiveState = () => {
  formElement.forEach((item) => (item.disabled = false));
};

const setFieldsDisabledState = () => {
  formElement.forEach((item) => (item.disabled = true));
};

const setActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  setFieldsActiveState();
};

const setInactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  setFieldsDisabledState();
};

// pristine
const pristine = new Pristine(adForm, {
  //класс родительского элемента, куда добавляется класс ошибки/успеха
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item__invalid',
  //класс родительского элемента, куда добавляется текстовый элемент ошибки
  errorTextParent: 'ad-form__element',
  //тип элемента для создания текста ошибки
  errorTextTag: 'span',
  // class of the error text element
  errorTextClass: 'ad-form__error',
});

//Время заезда - время выезда
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const time = adForm.querySelector('.ad-form__element--time select');

time.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

time.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

//Тип жилья - минимальная цена
const minPriceHouse = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const formTime = adForm.querySelector('.ad-form__element--time');

const sliderElement = adForm.querySelector('.ad-form__slider');

const onTypeOfHouseChange = () => {
  const minPrice = minPriceHouse[type.value];
  price.placeholder = minPrice;
  price.min = minPrice;

  sliderElement.noUiSlider.updateOptions(
    {
      start: minPriceHouse[type.value],
    });
};

type.addEventListener('change', onTypeOfHouseChange);

const checkMinPrice = () => Number(price.value) >= Number(price.placeholder);
const checkMaxPrice = () => Number(price.value) <= MAX_PRICE;
const getMinPriceErrorMessage = () => `Минимальная цена ${price.placeholder} рублей`;
pristine.addValidator(price, checkMinPrice, getMinPriceErrorMessage);
pristine.addValidator(price, checkMaxPrice, `Максимальная цена ${MAX_PRICE} рублей`);

formTime.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
});

//Количество комнат - количество гостей
const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const capacity = adForm.querySelector('#capacity');
const guestNumber = capacity.querySelectorAll('option');
const roomNumber = adForm.querySelector('#room_number');

const validateRooms = () => {
  const roomValue = roomNumber.value;

  guestNumber.forEach((guest) => {
    const isDisabled = (NumberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = NumberOfGuests[roomValue[0]] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

validateRooms();

const onRoomNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', onRoomNumberChange);

//слайдер

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function(value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function(value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  const value = sliderElement.noUiSlider.get();

  price.value = value;
});

price.addEventListener('input', () => {
  sliderElement.noUiSlider.set(price.value);
});

const resetForm = () => {
  resetImage();
  adForm.reset();
};

const clearButton = document.querySelector('.ad-form__reset');

clearButton.addEventListener('click', resetForm);

const onSuccess = () => {
  const template = document.querySelector('#success').content;
  const content = template.cloneNode(true);

  document.body.append(content);
  resetForm();
};

const onError = (error = 'Произошла ошибка') => {
  const template = document.querySelector('#error').content;
  const content = template.cloneNode(true);
  const text = content.querySelector('.error__message');

  text.textContent = error;

  document.body.append(content);
};

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  const formData = new FormData(evt.target);

  evt.preventDefault();

  if(pristine.validate()) {
    sendRequest(onSuccess, onError, 'POST', formData);
  }
});

export {
  setActiveState,
  setInactiveState,
  validateRooms,
};
