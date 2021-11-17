import { displayComments,postCommentsListener } from "./commentsPopup";
const mainSection = document.getElementById('main-section');

function createCard(dog) {
  const card = document.createElement('div');
  card.classList = 'main-section-card';
  card.innerHTML = `
    <div class="card-image-container">
      <img class="card-image" src="${dog.image.url}" alt="">
    </div>
    <h3 class="card-title">${dog.name}</h3>
    <button id="comments-button-${dog.id}" class="comments-button">Comments</button>
    <button id="reservations-button-${dog.id}" class="reservations-button">Reservations</button>
  `;

  mainSection.appendChild(card);

  const popup = document.querySelector('.d-none')
  const closePopup = document.getElementById('close-popup')
  
  const openPopup = () => {
  //   createCard(dog);
  //   displayComments(dog, popup);
  // const form = popup.querySelector('#new-comment');
  // form.addEventListener('submit',
  //   postCommentsListener(dog,popup));
  popup.classList.remove('d-none');
  }
  const commentsButton = document.getElementById(`comments-button-${dog.id}`);
  commentsButton.addEventListener('click',  () => {
    openPopup()
  //   // Comments
  }) 

  closePopup.addEventListener('click', () => {
    popup.classList.add('d-none')
  });

  const reservationsButton = document.getElementById(`reservations-button-${dog.id}`);
  reservationsButton.addEventListener('click', () => {
    // Reservations
  });
}

const getDogsData = async () => {
  const url = 'https://api.thedogapi.com/v1/breeds?page=0&limit=9';
  const response = await fetch(url, {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  return response.json();
};


getDogsData().then((list) => {
  list.forEach((dog) => createCard(dog));
});
