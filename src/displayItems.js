import {
  getComments, getDogsData, getLikes, postLikes, getReservations, submitReservation, postComments,
} from './requests.js';

import dogCounter from './dogCounter.js';
import commentsCounter from './commentCounter.js';
import reservationCounter from './reservationCounter.js';

const mainSection = document.getElementById('main-section');
let activeDog = '';

// Comments popup element
const popup = document.getElementById('popup-article');
const closePopup = document.getElementById('close-popup');
const commentList = document.getElementById('comments-list');
const submitCommentButton = document.getElementById('new-comment-submit');

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
      <p id="like-counter-${dog.id}">Likes: 0</p>
    </div>
    <button id="comments-button-${dog.id}" class="comments-button">Comments</button>
    <button id="reservations-button-${dog.id}" class="reservations-button">Reservations</button>
  `;

  mainSection.appendChild(card);

  // Reversation-popup page
  const reservationsButton = document.getElementById(`reservations-button-${dog.id}`);
  reservationsButton.addEventListener('click', () => {
    const popupReservationImage = document.getElementById('reservation-img');
    popupReservationImage.innerHTML = `<img class="reserveImage" src="${dog.image.url}" alt="">`;
    const breadGroup = document.getElementById('breed-group');
    breadGroup.innerHTML = `<h3 class="card-title">${dog.breed_group}</h3>`;
    const breadFor = document.getElementById('bred');
    breadFor.innerHTML = `<h3 class="card-title">${dog.bred_for}</h3>`;
    const lifeSpan = document.getElementById('lifespan');
    lifeSpan.innerHTML = `<h3 class="card-title">${dog.life_span}</h3>`;
    const height = document.getElementById('hgt');
    height.innerHTML = `<h3 class="card-title">${dog.height.metric}</h3>`;
    const temperament = document.getElementById('temperament');
    temperament.innerHTML = `<h3 class="card-title">${dog.temperament}</h3>`;
  });

  reservationsButton.addEventListener('click', (event) => {
    document.getElementById('reservation-container').style.display = 'block';
    const dogID = event.target.id.split('-');
    /* eslint-disable */
    activeDog = dogID[2];
    renderReservations(activeDog);
    /* eslint-enable */
  });

  const closeButton = document.getElementById('close-reserve-popup');
  closeButton.addEventListener('click', () => {
    document.getElementById('reservation-container').style.display = 'none';
  });

  // Like Button
  const likeButton = document.getElementById(`like-button-${dog.id}`);
  likeButton.addEventListener('click', () => {
    const body = {
      item_id: String(dog.id),
    };

    postLikes(body);

    const counter = document.getElementById(`like-counter-${dog.id}`);
    const likes = parseInt(counter.innerHTML.split(' ')[1], 10);
    counter.innerHTML = `Likes: ${likes + 1}`;
  });
}

// Render Homepage
getDogsData().then((list) => {
  dogCounter(list);
  // Create all cards
  list.forEach((dog) => {
    createCard(dog);

    // Add event listener to comment buttons
    const commentButton = document.getElementById(`comments-button-${dog.id}`);
    commentButton.addEventListener('click', () => {
      document.getElementById('popup-image').innerHTML = `<img class="pop-image" src="${dog.image.url}" alt="">`;
      document.getElementById('popup-breed_group').innerHTML = `<h3 class="card-title">${dog.breed_group}</h3>`;
      document.getElementById('popup-bred_for').innerHTML = `<h3 class="card-title">${dog.bred_for}</h3>`;
      document.getElementById('popup-life_span').innerHTML = `<h3 class="card-title">${dog.life_span}</h3>`;
      document.getElementById('popup-height').innerHTML = `<h3 class="card-title">${dog.height.metric}</h3>`;
      document.getElementById('popup-temperament').innerHTML = `<h3 class="card-title">${dog.temperament}</h3>`;
      // Load comments
      commentList.innerHTML = '';
      getComments(dog.id).then((comments) => {
        if (comments.length > 0) {
          comments.forEach((comment) => {
            const commentDisplay = document.createElement('li');
            commentDisplay.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
            commentList.appendChild(commentDisplay);
          });
        } else {
          const commentDisplay = document.createElement('li');
          commentDisplay.innerHTML = 'No comments';
          commentList.appendChild(commentDisplay);
        }
        commentsCounter(comments);
      });
      popup.classList.remove('d-none');
      submitCommentButton.className = `comment-button ${dog.id}`;
    });
  });

  // Get likes for cards
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

// Add reservation
async function renderReservations(id) {
  const reservations = await getReservations(id);
  let html = '';
  reservations.forEach((reservation) => {
    const htmlSegment = `<div class="reservation-records"><b>${reservation.date_start}</b>--<b>${reservation.date_end}</b> by ${reservation.username}</div>`;
    html += htmlSegment;
  });
  reservationCounter(reservations);
  const container = document.querySelector('#listOfReservations');
  container.innerHTML = html;
}

const reservationForm = document.getElementById('new-reserve');
reservationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitReservation(activeDog, document.querySelector('#username').value, document.querySelector('#start-date').value, document.querySelector('#end-date').value);
  reservationForm.reset();
  setTimeout(() => {
    renderReservations(activeDog);
  }, 1000);
});

closePopup.addEventListener('click', () => {
  popup.classList.add('d-none');
});

submitCommentButton.addEventListener('click', (event) => {
  event.preventDefault();
  const itemId = submitCommentButton.classList[1];
  const username = document.getElementById('new-comment-name');
  const content = document.getElementById('new-comment-content');

  const body = {
    item_id: itemId,
    username: username.value,
    comment: content.value,
  };

  postComments(body).then(() => {
    getComments(itemId).then((commentsArray) => {
      commentList.innerHTML = '';
      commentsArray.forEach((comment) => {
        const commentDisplay = document.createElement('li');
        commentDisplay.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
        commentList.appendChild(commentDisplay);
      });
      commentsCounter(commentsArray);
    });
  });

  username.value = '';
  content.value = '';
});
