export const KEY_PREFIX = 'breedsInfo';
export const API_KEY = '79fce215-15ef-4e33-b377-68e218319a6b';

const popup = document.querySelector('.d-none')
  // const closePopup = document.getElementById('close-popup')
  
export const displayBreedInfo = (container, info) => {
  const imageContainer = container.querySelector('.card-image-container');
  imageContainer.innerHTML = '';
  // const breedImage = document.createElement('img');
  const breedImage = document.querySelector('.class="card-image')
  // breedImage.alt = dog.name;
  // breedImage.src = dog.image.url;
  breedImage.classList.add('popup-image');
  imageContainer.appendChild(breedImage);

  const breedName = document.querySelector('.card-title');
  breedName.innerHTML = dog.name;

  const infoCategories = ['bred_for', 'breed_group', 'height', 'life_span',
    'temperament'];
  infoCategories.forEach((category) => {
    const categoryDisplay = container.querySelector(`#popup-${category}`);
    categoryDisplay.innerHTML = info[category];
  });
};




export const closePopupListener = (popup) => (event) => {
  event.preventDefault();
  // removeListeners(popup.querySelector('#new-comment'));
  popup.classList.add('d-none');
};


const openPopupListener = (popup) => async (event) => {
  event.preventDefault();
  const breedId = document.getElementById('comments-button');
  const storageKey = `${KEY_PREFIX}-${breedId}`;
  const breedInfo = JSON.parse(localStorage.getItem(storageKey));
  await displayBreedInfo(popup, breedInfo);
  
};

export default openPopupListener;