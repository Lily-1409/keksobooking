const FILE_TYPES = ['svg', 'jpg', 'jpeg', 'png', 'gif'];
const ERROR_CONTAINERS = document.querySelectorAll('.ad-form-header, .ad-form__element--file');
const TIME_DELETE_ERROR = 5000;
const MAX_LENGTH_LODGING_IMAGES = 3;
const form = document.querySelector('.ad-form');

const avatarChooser = form.querySelector('#avatar');
const avatarPreview = form.querySelector('#avatar-preview');
const defaultAvatarPreview = avatarPreview.src;
const lodgingChooser = form.querySelector('#images');
const lodgingImageContainer = form.querySelector('.ad-form__photo');

const checkMatches = (element) => FILE_TYPES.some((it) => element.endsWith(it));

const showErrorMessage = (containers) => {
  const container = containers;
  const element = document.createElement('div');
  element.style.color = 'red';
  element.textContent = 'Невозможно загрузить файл';
  container.append(element);
  setTimeout(() => {
    element.remove();
  }, TIME_DELETE_ERROR);
};

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = checkMatches(fileName);

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  } else {
    showErrorMessage(ERROR_CONTAINERS[0]);
  }
});

const createImage = () => {
  const image = document.createElement('img');
  image.style.maxWidth = '100%';
  image.style.objectFit = 'cover';

  return image;
};

lodgingImageContainer.style.display = 'flex';
lodgingImageContainer.style.gap = '5px';

lodgingChooser.addEventListener('change', ()=> {
  const files = Array.from(lodgingChooser.files);

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const matches = checkMatches(fileName);
    if (matches) {
      const image = createImage();
      image.src = URL.createObjectURL(file);
      if (lodgingImageContainer.children.length < MAX_LENGTH_LODGING_IMAGES) {
        lodgingImageContainer.append(image);
      } else {
        lodgingImageContainer.children[lodgingImageContainer.children.length - 1].remove();
        lodgingImageContainer.insertAdjacentElement('afterbegin', image);
      }
    }
  });
});

const resetImage = () => {
  const images = Array.from(lodgingImageContainer.children);
  avatarPreview.src = defaultAvatarPreview;

  if (images.length > 0) {
    images.forEach((image) => image.remove());
  }
};

export { resetImage };
