const form = document.querySelector('#form');
const eventCard = document.querySelector('.cards');
const clearBtn = document.getElementById('clearBtn');
const sampleBtn = document.getElementById('sampleBtn');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = eventTitle.value;
    const date = eventDate.value;
    const cat = category.value;
    const desc = description.value;

    createCard(title, date, cat, desc);
    form.reset();
});

function createCard(title, date, cat, desc) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <h2>${title}</h2>
        <p>🗓️ ${date}</p>
        <button>${cat}</button>
        <p>${desc}</p>
        <div class="deletecard">x</div>
    `;

    card.querySelector('.deletecard').addEventListener('click', () => {
        card.remove();
    });

    eventCard.appendChild(card);
}

clearBtn.addEventListener('click', () => {
    eventCard.innerHTML = "";
});

sampleBtn.addEventListener('click', () => {
    createCard("Ai Summit","2026-01-14","Social","AI conference");
    createCard("Tech Conference","2026-02-10","Conference","AI event");
    createCard("Web Dev Meetup","2026-03-05","Meetup","Frontend meetup");
});

document.addEventListener('keydown', (event) => {
    document.querySelector('.key').innerText = event.key;
});