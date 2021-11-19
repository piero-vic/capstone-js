import {
  getComments, getDogsData, getLikes, postLikes, getReservations, submitReservation
} from './requests.js';

const mainSection = document.getElementById('main-section');
let activeDog = '';

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
  // Comments
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
    const commentList = document.getElementById('comments-list');
    commentList.innerHTML = '';
    getComments(dog.id).then((comments) => {
      if (comments.length > 0) {
        comments.forEach((comment) => {
          const commentList = document.getElementById('comments-list');
          const commentDisplay = document.createElement('li');
          commentDisplay.innerHTML = `
          <span class="comment-date">${comment.creation_date}</span>
          <span class="commenter">${comment.username}:</span>
          <span class="comment-content">${comment.comment}</span>
        `;
          commentList.appendChild(commentDisplay);
        });
      } else {
        const commentList = document.getElementById('comments-list');
        const commentDisplay = document.createElement('li');
        commentDisplay.innerHTML = 'No comment';
        commentList.appendChild(commentDisplay);
      }
    });
  });

  closePopup.addEventListener('click', () => {
    popup.classList.add('d-none');
  });

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

  // const reservationsButton = document.getElementById(`reservations-button-${dog.id}`);
  reservationsButton.addEventListener('click', (event) => {
    // Reservations
    document.getElementById('reservation-container').style.display = 'block';
    const dogID = event.target.id.split('-');
    /* eslint-disable */
    activeDog = dogID[2];
    renderReservations(activeDog);
    /* eslint-enable */
  });

  const closeButton = document.getElementById('close-reserve-popup');
  closeButton.addEventListener('click', () => {
    // Reservations
    document.getElementById('reservation-container').style.display = 'none';
  });

  // getReservations(dog.id).then((reservations) => {

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

// Add reservation
async function renderReservations(id) {
  const reservations = await getReservations(id);
  let html = '';
  reservations.forEach(reservation => {
      const htmlSegment = `<div class="reservation-records"><b>${reservation.date_start}</b>--<b>${reservation.date_end}</b> by ${reservation.username}</div>`;
      html += htmlSegment;
  });

  const container = document.querySelector('#listOfReservations');
  container.innerHTML = html;
}

const addReservationbtn = document.querySelector('.reserve-button');
const reservationForm = document.getElementById('new-reserve');
const reservationList = document.getElementById('listOfReservations');
reservationForm.addEventListener('submit', (event) => {
  console.log(event.target.id);
  event.preventDefault();
  submitReservation(activeDog, document.querySelector('#username').value, document.querySelector('#start-date').value, document.querySelector('#end-date').value);
  reservationForm.reset();
  setTimeout(() => {
    renderReservations(activeDog);
  }, 1000);
});

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   submitReservation(currentId, intName.value, intStartDate.value, intEndDate.value);
//   form.reset();
//   setTimeout(() => {
//     recorsCont.innerHTML = '';
//     displayReservation(currentId, recorsCont);
//   }, 2000);
// });