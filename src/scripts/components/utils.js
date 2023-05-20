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
    cardPopup
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupWithPicture = document.querySelector('.popup[type="picture"]');
const popupPicture = popupWithPicture.querySelector('.popup__picture');

const closeButtons = document.querySelectorAll('.popup__close-button');
const popupList = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup[type="profile"]')
const cardPopup = document.querySelector('.popup[type="card"]')

