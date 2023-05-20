import { openPopup } from './modal';
import { popupWithPicture, popupPicture } from './utils';

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



function updateCard(cardObject, cardContent) {
    const picture = cardObject.querySelector(".card__picture");
    picture.src = cardContent.link;
    picture.alt = cardContent.name;
    picture.addEventListener('click', () => {
        openPopup(popupWithPicture);
        popupPicture.src = picture.src;
        popupPicture.alt = picture.alt;
        popupWithPicture.querySelector('.popup__picture-description').textContent = cardContent.name;
    });
    cardObject.querySelector(".card__heading").textContent = cardContent.name;
    cardObject.querySelector(".card__button").addEventListener('click', (event) => {
        event.target.classList.toggle("card__button_liked");
    })
    cardObject.querySelector(".card__delete-button").addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    })
}


export function createCard(cardContent) {
    const newCard = cardTemplate.cloneNode(true);
    updateCard(newCard, cardContent)   
    cardHolder.prepend(newCard);
}

export function setUpCards() {
    defaultCardList.forEach(createCard);
}