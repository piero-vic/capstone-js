const mainSection = document.getElementById('main-section');

function createCard() {
  const card = document.createElement('div');
  card.classList = 'main-section-card';
  card.innerHTML = `
    <div class="image-container">

    </div>
    <h3 class="card-title">Title</h3>
    <button class="comments-button">Comments</button>
    <button class="reservations-button">Reservations</button>
  `;
  mainSection.appendChild(card);
}

for (let i = 0; i < 9; i++)createCard();

async function getDogsData() {
  const response = await fetch('https://api.thedogapi.com/v1/breeds?page=0&limit=9', {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  return response.json();
}
