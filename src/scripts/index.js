import '../pages/index.css';
import { setUpCards, createCard } from './components/card';
import { closePopup, openPopup} from './components/modal';
import { enableValidation, updateButton } from './components/validate';
import { profileName, profileDescription, closeButtons, popupList, addButton, editButton, profilePopup, cardPopup } from './components/utils';


const formSelector = '.popup__form';
const inputSelector = '.popup__form-field';
const submitButtonSelector = '.popup__form-submit';
const inactiveButtonClass = 'popup__form-submit_disabled';

setUpCards();
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
}

function enablePopupSubmit () {
    profilePopup.querySelector('.popup__form').addEventListener('submit', (event) => {
        event.preventDefault();
        profileName.innerText = event.target.name.value;
        profileDescription.innerText = event.target.description.value;
        closePopup(profilePopup);
    })
    cardPopup.querySelector('.popup__form').addEventListener('submit', (event) => {
        event.preventDefault();
        createCard({
            name: event.target.name.value,
            link: event.target.link.value
        });
        event.target.name.value = "";
        event.target.link.value = "";
        closePopup(cardPopup);
    });
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
