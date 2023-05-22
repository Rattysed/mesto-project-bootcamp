export {
    profileName, 
    profileDescription, 
    popupWithPicture, 
    popupPicture, 
    closeButtons, 
    popupList,
    editButton,
    addButton,
    profilePopup,
    cardPopup,
    user,
    avatarEditButton,
    avatarPopup,
    avatarObject
}

import { loadInitialCards } from "./api";
import { setUpCards } from "./card";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const avatarEditButton = document.querySelector('.profile__avatar-overlay');
const avatarObject = document.querySelector('.profile__avatar');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupWithPicture = document.querySelector('.popup[type="picture"]');
const popupPicture = popupWithPicture.querySelector('.popup__picture');

const closeButtons = document.querySelectorAll('.popup__close-button');
const popupList = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup[type="profile"]');
const cardPopup = document.querySelector('.popup[type="card"]');
const avatarPopup = document.querySelector('.popup[type="avatar');

const user = {_id: "", }


export function setInitialCards() {
    loadInitialCards()
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        }).then((res) => {
            setUpCards(res);
        }).catch((err) => {
            console.log(`Ошибка: ${err}`)
        }) 
}