const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formElement = document.querySelectorAll('fieldset, .map__filter, .ad-form__slider'); //коллекция всех элементов, которые нужно заблокировать

//настройка состояния формы
const setDisabledState = () => {
  formElement.forEach((item) => (item.disabled = !item.disabled)); //замена текущего статуса на обратный делаем и активацию и деактивацию
};

const setActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  setDisabledState();
};

const setInactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  setDisabledState();
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
const formTime = adForm.querySelector('#ad-form__element--time');

const onTypeOfHouseChange = () => {
  const minPrice = minPriceHouse[type.value];
  price.placeholder = minPrice;
  price.min = minPrice;
};

type.addEventListener('change', onTypeOfHouseChange);

const CheckMinPrice = () => Number(price.value) >= Number(price.placeholder);
const getPriceErrorMessage = () => `Минимальная цена ${price.placeholder} рублей`;
pristine.addValidator(price, CheckMinPrice, getPriceErrorMessage);

formTime.addEventListener ('change', (evt) => {
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

//отправка формы
adForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  } else {
    return true;
  }
});

export {
  setActiveState,
  setInactiveState,
  validateRooms,
};
