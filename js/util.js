const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomFloat = (min, max, digit) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return (Math.random() * (max - min) + min).toFixed(digit);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getNumber = (num, targetLength) => num.toString().padStart(targetLength, 0);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length-1)];

export {
  getRandomInteger,
  getRandomFloat,
  shuffleArray,
  getNumber,
  getRandomArrayElement,
};
