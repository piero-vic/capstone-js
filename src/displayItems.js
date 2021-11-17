import { getDogsData, getLikes, postLikes } from './requests.js';

const mainSection = document.getElementById('main-section');

function createCard(dog) {
  const card = document.createElement('div');
  card.classList = 'main-section-card';
  card.innerHTML = `
    <div class="card-image-container">
      <img class="card-image" src="${dog.image.url}" alt="">
    </div>
    <h3 class="card-title">${dog.name}</h3>
    <div class="like-container">
      <i id="like-button-${dog.id}" class="fas fa-heart like-button"></i>
      <p id="like-counter-${dog.id}">
        Likes: 0
      </p>
    </div>
    <button id="comments-button-${dog.id}" class="comments-button">Comments</button>
    <button id="reservations-button-${dog.id}" class="reservations-button">Reservations</button>
  `;

  mainSection.appendChild(card);

  const popup = document.getElementById('popup-article');
  const closePopup = document.getElementById('close-popup');

  const commentsButton = document.getElementById(`comments-button-${dog.id}`);
  commentsButton.addEventListener('click', () => {
    const popUpImage = document.getElementById('popup-image');
    popUpImage.innerHTML = `<img class="pop-image" src="${dog.image.url}" alt="">`;
    const breadGroup = document.getElementById('popup-breed_group');
    breadGroup.innerHTML = `<h3 class="card-title">${dog.breed_group}</h3>`;
    const breadFor = document.getElementById('popup-bred_for');
    breadFor.innerHTML = `<h3 class="card-title">${dog.bred_for}</h3>`;
    const lifeSpan = document.getElementById('popup-life_span');
    lifeSpan.innerHTML = `<h3 class="card-title">${dog.life_span}</h3>`;
    const dogHeight = document.getElementById('popup-height');
    dogHeight.innerHTML = `<h3 class="card-title">${dog.height.metric}</h3>`;
    const dogTemperament = document.getElementById('popup-temperament');
    dogTemperament.innerHTML = `<h3 class="card-title">${dog.temperament}</h3>`;
    popup.classList.remove('d-none');
  //   // Comments
  });

  closePopup.addEventListener('click', () => {
    popup.classList.add('d-none');
  });

  const reservationsButton = document.getElementById(`reservations-button-${dog.id}`);
  reservationsButton.addEventListener('click', () => {
    // Reservations
  });

  // Like Button
  const likeButton = document.getElementById(`like-button-${dog.id}`);
  likeButton.addEventListener('click', () => {
    const body = {
      item_id: dog.id,
    };

    postLikes(body);

    const counter = document.getElementById(`like-counter-${dog.id}`);
    const likes = parseInt(counter.innerHTML.split(' ')[1], 10);
    counter.innerHTML = `Likes: ${likes + 1}`;
  });
}

getDogsData().then((list) => {
  list.forEach((dog) => createCard(dog));

  getLikes().then((likes) => {
    likes.forEach((item) => {
      const counter = document.getElementById(`like-counter-${item.item_id}`);
      if (counter) {
        const likeCounter = `Likes: ${item.likes}`;
        counter.innerHTML = likeCounter;
      }
    });
  });
});
