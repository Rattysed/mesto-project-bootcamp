import { updateProfile, loadUserInfo, makeNewCard, updateAvatar } from "./api";
import { addCardToDOM } from "./card";
import { profileName, profileDescription, user, avatarObject } from "./utils";


function onEscapePressed (evt) {
    const popupToClose = document.querySelector('.popup_opened');
    if (evt.key === "Escape") {
        closePopup(popupToClose);
    }
}

export function openPopup(popupToOpen) {
    popupToOpen.classList.add('popup_opened');
    document.addEventListener('keydown', onEscapePressed);
}


export function closePopup(popupToClose) {
    popupToClose.classList.remove('popup_opened');
    document.removeEventListener('keydown', onEscapePressed);
}  


export function updateUserName(name, about) {
    profileName.innerText = name;
    profileDescription.innerText = about;
}

function setUserAvatar(link) {
    avatarObject.src = link;
}

export function setUser() {
    loadUserInfo()
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status);
        })
        .then((res) => {
            user._id = res._id;
            setUserAvatar(res.avatar);
            updateUserName(res.name, res.about);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
}

export function onProfileSubmit(event) {
    const newName = event.target.name.value;
    const newDescription = event.target.description.value;
    const buttonElement = event.target.querySelector('.button');
    buttonElement.innerText = "Обновляем...";
    updateProfile(newName, newDescription)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        }).then((res) => {
            buttonElement.innerText = "Сохранить"
            updateUserName(newName, newDescription);
            closePopup(event.target.closest('.popup'));
        }).catch((err) => {
            buttonElement.innerText = "Произошла ошибка";
            setTimeout(
                () => {buttonElement.innerText = "Сохранить"}, 1000
            )
            console.log(`Ошибка: ${err}`)
        })
}

export function onCardCreation(event) {
    const cardContent = {
        name: event.target.name.value,
        link: event.target.link.value
    }
    const buttonElement = event.target.querySelector('.button');
    buttonElement.innerText = "Создаём...";
    makeNewCard(cardContent)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        }).then((res) => {
            buttonElement.innerText = "Создать";
            addCardToDOM(res);
            closePopup(event.target.closest('.popup'));
            event.target.name.value = "";
            event.target.link.value = "";
        }).catch((err) => {
            buttonElement.innerText = "Произошла ошибка";
            setTimeout(
                () => {buttonElement.innerText = "Создать"}, 1000
            );
            console.log(`Ошибка: ${err}`);
        })
}

export function onAvatarUpdate(event) {
    const buttonElement = event.target.querySelector('.button');
    buttonElement.innerText = "Сохраняем...";

    updateAvatar(event.target.link.value)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        }).then((res) => {
            buttonElement.innerText = "Сохранить";
            setUserAvatar(res.avatar);
            closePopup(event.target.closest('.popup'));
        }).catch((err) => {
            buttonElement.innerText = "Произошла ошибка";
            setTimeout(
                () => {buttonElement.innerText = "Сохранить"}, 1000
            );
            console.log(`Ошибка: ${err}`);
        })
}