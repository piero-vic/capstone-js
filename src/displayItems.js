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
  reservationsButton.addEventListener('click', () => {
    // Reservations
    document.getElementById('reservation-container').style.display = 'block';
  });

  const closeButton = document.getElementById('close-reserve-popup');
  closeButton.addEventListener('click', () => {
    // Reservations
    document.getElementById('reservation-container').style.display = 'none';
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
