import { popupWithPicture, popupPicture, user } from './utils';
import { openPopup } from './modal';
import { deleteCard, likeCard } from './api';

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

    const counterObject = cardObject.querySelector(".card__like-counter");
    counterObject.textContent = cardContent.likes.length;

    const likeButton = cardObject.querySelector(".card__button")
    const isLiked = cardContent.likes.some((liker) => {
        return liker._id == user._id;
    });
    if (isLiked || user._id == '') {
        likeButton.classList.add("card__button_liked");
    }
    likeButton.addEventListener('click', (event) => {
        onCardLike(cardContent._id, event, counterObject);
    });
    
    const deleteButton = cardObject.querySelector(".card__delete-button");
    if (user._id == cardContent.owner._id) {
        deleteButton.addEventListener('click', (event) => {
            onCardDeletion(cardContent._id, event);
        })
    } else {
        deleteButton.classList.add('card__delete-button_disabled');
    }
}

function onCardDeletion(cardId, event) {
    deleteCard(cardId)
        .then((res) => {
            event.target.closest('.card').remove();
        }).catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
}

function onCardLike(cardId, event, counterObject) {
    likeCard(cardId, event.target.classList.contains("card__button_liked"))
        .then((res) => {
            event.target.classList.toggle("card__button_liked");
            counterObject.textContent = res.likes.length;
        }).catch((err) => {
            console.log(`Ошибка: ${err}`);
        }) 
}

export function addCardToDOM(cardContent) {
    const newCard = cardTemplate.cloneNode(true);
    updateCard(newCard, cardContent)   
    cardHolder.prepend(newCard);
}

export function setUpCards(cardList) {
    cardList.reverse().forEach(addCardToDOM);
}