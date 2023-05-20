function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;  
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }   
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}


export function updateButton(formElement, buttonSelector, inputSelector, inactiveButtonClass) {
    const button = formElement.querySelector(buttonSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    toggleButtonState(inputList, button, inactiveButtonClass);
}


function showInputError (formElement, inputElement, errorMessage, inputErrorClass, errorMessageClass) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorMessageClass);
};
  
function hideInputError (formElement, inputElement, inputErrorClass, errorMessageClass) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorMessageClass);
    errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorMessageClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, 
            inputErrorClass, errorMessageClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorMessageClass);
    }
};

export function enableValidation(params) {
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
        const submitButton = formElement.querySelector(params.submitButtonSelector);
        toggleButtonState(inputList, submitButton, params.inactiveButtonClass);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (evt) => {
                toggleButtonState(inputList, submitButton, params.inactiveButtonClass);
                checkInputValidity(formElement, inputElement,
                     params.inputErrorClass,
                     params.errorClass)
            });
        });
    });
}