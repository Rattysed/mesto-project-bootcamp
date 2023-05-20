import '../pages/index.css';
import { setUpCards } from './components/card';
import { enablePopupClosing, enablePopupButtons, enablePopupSubmit } from './components/modal';
import { enableValidation } from './components/validate';



setUpCards();
enablePopupClosing();
enablePopupButtons();
enablePopupSubmit();
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-field',
    submitButtonSelector: '.popup__form-submit',
    inactiveButtonClass: 'popup__form-submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_active'

});


