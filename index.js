const defaultCardList = [
      {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      }
]


const cardTemplate = document.querySelector(".card-template").content;
const cardHolder = document.querySelector(".elements");

function likeCard(likeButton) {
    likeButton.classList.toggle("card__button_liked");
}



function createCard(cardContent) {
    const newCard = cardTemplate.cloneNode(true);
    const picture = newCard.querySelector(".card__picture");
    picture.src = cardContent.link;
    picture.alt = cardContent.name;
    picture.addEventListener('click', () => {
        openPopup(picturePopup);
        picturePopup.querySelector('.popup__picture').src = picture.src;
        picturePopup.querySelector('.popup__picture').alt = picture.alt;
        picturePopup.querySelector('.popup__picture-description').textContent = cardContent.name;
    });
    newCard.querySelector(".card__heading").textContent = cardContent.name;
    newCard.querySelector(".card__button").addEventListener('click', (event) => {
        event.target.classList.toggle("card__button_liked");
    })
    newCard.querySelector(".card__delete-button").addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    })
    cardHolder.append(newCard);
}

defaultCardList.forEach((card) => {
    createCard(card);
})



const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup[type="profile"]')
const cardPopup = document.querySelector('.popup[type="card"]')
const picturePopup = document.querySelector('.popup[type="picture"]')

profilePopup.querySelector('.popup__close-button').addEventListener('click', () => {closePopup(profilePopup)});
cardPopup.querySelector('.popup__close-button').addEventListener('click', () => {closePopup(cardPopup)});
picturePopup.querySelector('.popup__close-button').addEventListener('click', () => {closePopup(picturePopup)});

profilePopup.querySelector('.popup__form-submit').addEventListener('click', (event) => {
    event.preventDefault();
    profileName.innerText = profilePopup.querySelector('.popup__form-field[name="name"]').value;
    profileDescription.innerText = profilePopup.querySelector('.popup__form-field[name="description"]').value;
    closePopup(profilePopup);
})

cardPopup.querySelector('.popup__form-submit').addEventListener('click', (event) => {
    event.preventDefault();
    createCard({
        name: cardPopup.querySelector('.popup__form-field[name="name"]').value,
        link: cardPopup.querySelector('.popup__form-field[name="link"]').value
    });
    cardPopup.querySelector('.popup__form-field[name="name"]').value = "";
    cardPopup.querySelector('.popup__form-field[name="link"]').value = "";
    closePopup(cardPopup);
});

function openPopup(popupToOpen) {
    popupToOpen.classList.add('popup_opened');
}
function closePopup(popupToClose) {
    popupToClose.classList.remove('popup_opened');
}

addButton.addEventListener('click', () => {openPopup(cardPopup);});

editButton.addEventListener('click', () => {
    openPopup(profilePopup);
    profilePopup.querySelector('.popup__form-field[name="name"]').value = profileName.innerText;
    profilePopup.querySelector('.popup__form-field[name="description"]').value = profileDescription.innerText;
});