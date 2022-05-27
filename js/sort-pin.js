const MAX_OFFERS = 10;
const DEFAULT_VALUE = 'any';

const priceMap = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  }
};

const filters = Array.from(document.querySelector('.map__filters').children);

const filterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-price': (data, filter) => data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end,
  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),
  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),
  'housing-features': (data, filter) => {
    const checkListElements = Array.from(filter.querySelectorAll('input[type = "checkbox"]:checked'));
    return data.offer.features ? checkListElements.every((checkbox) => data.offer.features.includes(checkbox.value)) : !(checkListElements.length > 0);
  }
};

const filterData = (data) => {
  const filteredOffers = [];
  let i = 0;
  let result;

  while (i < data.length && filteredOffers.length < MAX_OFFERS) {
    result = filters.every((filter) => (filter.value === DEFAULT_VALUE ? true : filterRules[filter.id](data[i], filter)));

    if (result) {
      filteredOffers.push(data[i]);
    }

    i++;
  }

  return filteredOffers;
};

export { filterData };

/* фильтрация: с сервера получаем 50 точекб но отображаем только часть
всегда будем отображать только по 10
при выборе парметров в фильтре? будем получать выборку, при выборе предложения-
в нем должны фигурировать выбранные параметры
сложности в задании:
1. прбежаться по селектамб чтобы не присутсвовала слово любойб значит надо по нему пробежаться по массиву
2. фильтровать массив на каждом этапе
НУЖНО каждый раз пробегаться по массиву и каждый раз уменьшать количество совпадений
базовые критерии- количество циклов минимизировано
число пинов которое должно отображаться на карте (10) цикл использовать либо for либо while
*/
