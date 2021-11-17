import { getComments, getDogsData, getLikes, postComments } from './requests.js';

const mainSection = document.getElementById('main-section');

function createCard(dog) {
  const card = document.createElement('div');
  card.classList = 'main-section-card';
  card.innerHTML = `
    <div class="card-image-container">
      <img class="card-image" src="${dog.image.url}" alt="">
    </div>
    <h3 class="card-title">${dog.name}</h3>
    <p id="like-counter-${dog.id}">Likes: 0</p>
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

  getComments(1).then((comments) => {
    Array.from(comments).forEach((item) => {
      const counter = document.getElementById(`comments-counter-${item.item_id}`);
      if (counter) {
        const commentsCounter = ` ${item.comments} `;
        counter.innerHTML = commentsCounter;
      }
    });
  });


  
const displayComment = (container,comment) => {
  console.log(container);
  const commentDisplay = document.createElement('li');
  commentDisplay.innerHTML = `
    <span class="comment-date">${comment.creation_date}</span>
    <span class="commenter">${comment.username}:</span>
    <span class="comment-content">${comment.comment}</span>
`;
  container.appendChild(commentDisplay);
};

const displayComments = async (breedId, popup) => {
  let comments = await getComments(breedId);
  const commentsContainer = document.querySelector('#comments-list');
  commentsContainer.innerHTML = '';
  if (comments.error) comments = [];
  getComments(popup, comments);
  Array.from(comments)
    .forEach((comment) => { displayComment(commentsContainer, comment); });
};


const commetsBtn = document.getElementById('new-comment-submit')
commetsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const username = document.getElementById('new-comment-name');
  const content = document.getElementById('new-comment-content');
  postComments(username.value, content.value)
    .then(() => {
      username.value = '';
      content.value = '';
      displayComments();
    });
})
  
});


