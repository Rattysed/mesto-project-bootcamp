import '../pages/index.css';
import { closePopup, openPopup, onProfileSubmit, onCardCreation, setUser, onAvatarUpdate} from './components/modal.js';
import { enableValidation, updateButton } from './components/validate.js';
import { setUpCards } from './components/card.js';
import { 
    profileName,
    profileDescription, 
    closeButtons, 
    popupList, 
    addButton, 
    editButton, 
    profilePopup, 
    cardPopup, 
    avatarEditButton,
    avatarPopup,
    avatarObject } from './components/utils';
import { loadUserInfo, loadInitialCards } from './components/api';


const formSelector = '.popup__form';
const inputSelector = '.popup__form-field';
const submitButtonSelector = '.popup__form-submit';
const inactiveButtonClass = 'popup__form-submit_disabled';


Promise.all([loadUserInfo(), loadInitialCards()]).then((values) => {
    setUser(values[0]);
    setUpCards(values[1]);
});

enablePopupClosing();
enablePopupButtons();
enablePopupSubmit();
enableValidation({
    formSelector: formSelector,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: inactiveButtonClass,
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_active'
});


function enablePopupButtons (){
    addButton.addEventListener('click', () => {
        openPopup(cardPopup);
        const profileForm = cardPopup.querySelector(formSelector);
        updateButton(profileForm, submitButtonSelector, inputSelector, inactiveButtonClass);
    });

    editButton.addEventListener('click', () => {
        openPopup(profilePopup);
        const profileForm = profilePopup.querySelector(formSelector);
        profileForm.name.value = profileName.innerText;
        profileForm.description.value = profileDescription.innerText;
        updateButton(profileForm, submitButtonSelector, inputSelector, inactiveButtonClass);
    });

    avatarEditButton.addEventListener('click', () => {
        openPopup(avatarPopup);
        const profileForm = avatarPopup.querySelector(formSelector);
        profileForm.link.value = avatarObject.src;
        updateButton(profileForm, submitButtonSelector, inputSelector, inactiveButtonClass);
    })
}

function enablePopupSubmit () {
    profilePopup.querySelector('.popup__form').addEventListener('submit', (event) => {
        event.preventDefault();
        onProfileSubmit(event);
    })
    cardPopup.querySelector('.popup__form').addEventListener('submit', (event) => {
        event.preventDefault();
        onCardCreation(event);
    });
    avatarPopup.querySelector('.popup__form').addEventListener('submit', (event) => {
        event.preventDefault();
        onAvatarUpdate(event);
    })
}

function enablePopupClosing() {    
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
}
