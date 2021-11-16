const mainSection = document.getElementById('main-section');

function createCard(){
  const card = document.createElement('div');
  card.classList = "main-section-card"
  card.innerHTML = `
    <div class="image-container">

    </div>
    <h3 class="card-title">Title</h3>
    <button class="comments-button">Comments</button>
    <button class="reservations-button">Reservations</button>
  `;
  mainSection.appendChild(card)
}

for (let i = 0; i < 9; i++)createCard();
