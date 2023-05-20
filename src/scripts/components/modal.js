import { profileName, profileDescription, popupWithPicture } from "./utils";
import { createCard } from "./card";


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


const profilePopup = document.querySelector('.popup[type="profile"]')
const formFieldName = profilePopup.querySelector('.popup__form-field[name="name"]');
const formFieldDescription = profilePopup.querySelector('.popup__form-field[name="description"]');


const cardPopup = document.querySelector('.popup[type="card"]')
const formFieldLink = cardPopup.querySelector('.popup__form-field[name="link"]');
const formFieldPostName = cardPopup.querySelector('.popup__form-field[name="name"]');



const closeButtons = document.querySelectorAll('.popup__close-button');

let popupList = [
    profilePopup,
    cardPopup,
    popupWithPicture
];

let openedPopup = undefined;



export function openPopup(popupToOpen) {
    if (openedPopup) {
        closePopup(openedPopup);
    }
    popupToOpen.classList.add('popup_opened');
    openedPopup = popupToOpen;
}


function closePopup(popupToClose) {
    if (openedPopup) {
        popupToClose.classList.remove('popup_opened');
        openedPopup = undefined;
    }
}  


export function enablePopupClosing() {    
    closeButtons.forEach((button) => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(popup));
    });
    popupList.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target === popup){
                closePopup(popup);
            }
        });
    });
    document.addEventListener('keydown', (evt) => {
        if (evt.key === "Escape" && openPopup) {
            closePopup(openedPopup);
        }
    });
}

export function enablePopupButtons (){
    addButton.addEventListener('click', () => {openPopup(cardPopup);});

    editButton.addEventListener('click', () => {
        openPopup(profilePopup);
        formFieldName.value = profileName.innerText;
        formFieldDescription.value = profileDescription.innerText;
    });
}

export function enablePopupSubmit () {
    profilePopup.querySelector('.popup__form').addEventListener('submit', (event) => {
        event.preventDefault();
        profileName.innerText = formFieldName.value;
        profileDescription.innerText = formFieldDescription.value;
        closePopup(profilePopup);
    })
    cardPopup.querySelector('.popup__form').addEventListener('submit', (event) => {
        event.preventDefault();
        createCard({
            name: formFieldPostName.value,
            link: formFieldLink.value
        });
        formFieldPostName.value = "";
        formFieldLink.value = "";
        closePopup(cardPopup);
    });
}
