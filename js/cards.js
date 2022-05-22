const card = document.querySelector('#card').content.querySelector('.popup'); //Находим фрагмент с содержимым шаблона

const typeOfHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house:'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderFeatures = (features, container) => {
  const list = container.querySelectorAll('li');

  list.forEach((item) => {
    if (features.indexOf(item.classList[1].replace('popup__features--', '')) === -1) {
      item.remove();
    }
  });
};

const renderImage = (container, sources) => {
  const popupPhoto = container.querySelector('.popup__photo');
  container.innerText = '';

  const fragmentPhoto = document.createDocumentFragment();

  sources.forEach((source) => {
    const newPhoto = popupPhoto.cloneNode(true);
    newPhoto.src = source;
    fragmentPhoto.appendChild(newPhoto);
  });

  return fragmentPhoto;
};

const renderCard = ({ author, offer }) => {
  const offerCard = card.cloneNode(true);
  const title = offerCard.querySelector('.popup__title');

  if (offer.title) {
    title.textContent = offer.title;
  } else {
    title.remove();
  }
  const address = offerCard.querySelector('.popup__text--address');
  if (offer.address) {
    address.textContent = offer.address;
  } else {
    address.remove();
  }

  const price = offerCard.querySelector('.popup__text--price');

  if(offer.price) {
    price.textContent = `${offer.price} ₽/ночь`;
  } else {
    price.remove();
  }

  const type = offerCard.querySelector('.popup__type');
  if(offer.type) {
    type.textContent = typeOfHouse[offer.type];
  } else {
    type.remove();
  }

  const capacity = offerCard.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    capacity.textContent = `${offer.rooms} ${offer.rooms} для ${offer.guests}`;
  } else {
    capacity.remove();
  }

  const time = offerCard.querySelector('.popup__text--time');
  if(offer.checkin && offer.checkout) {
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    time.remove();
  }

  const features = offerCard.querySelector('.popup__features');
  if (offer.features && offer.features.length > 0) {
    renderFeatures(offer.features, features);
  } else {
    features.remove();
  }

  const description = offerCard.querySelector('.popup__description');
  if (offer.description) {
    description.textContent = `${offer.description}`;
  } else {
    description.remove();
  }

  const photos = offerCard.querySelector('.popup__photos');
  if (offer.photos && offer.photos.length > 0) {
    photos.appendChild(renderImage(photos, offer.photos));
  } else {
    photos.remove();
  }

  const avatar = offerCard.querySelector('.popup__avatar');
  if (author.avatar) {
    avatar.src = author.avatar;
  }

  return offerCard;
};

export { renderCard };
