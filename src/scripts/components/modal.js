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




