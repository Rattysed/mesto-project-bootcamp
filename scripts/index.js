const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup[type="profile"]')
const formFieldName = profilePopup.querySelector('.popup__form-field[name="name"]');
const formFieldDescription = profilePopup.querySelector('.popup__form-field[name="description"]');


const cardPopup = document.querySelector('.popup[type="card"]')
const formFieldLink = cardPopup.querySelector('.popup__form-field[name="link"]');
const formFieldPostName = cardPopup.querySelector('.popup__form-field[name="name"]');

const popupWithPicture = document.querySelector('.popup[type="picture"]')
const popupPicture = popupWithPicture.querySelector('.popup__picture')

const closeButtons = document.querySelectorAll('.popup__close-button');

const cardTemplate = document.querySelector(".card-template").content;
const cardHolder = document.querySelector(".elements");


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


function createCard(cardContent) {
    const newCard = cardTemplate.cloneNode(true);
    updateCard(newCard, cardContent)   
    cardHolder.prepend(newCard);
}

function openPopup(popupToOpen) {
    popupToOpen.classList.add('popup_opened');
}


function closePopup(popupToClose) {
    popupToClose.classList.remove('popup_opened');
}  


defaultCardList.forEach(createCard);

    
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

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


addButton.addEventListener('click', () => {openPopup(cardPopup);});

editButton.addEventListener('click', () => {
    openPopup(profilePopup);
    formFieldName.value = profileName.innerText;
    formFieldDescription.value = profileDescription.innerText;
});