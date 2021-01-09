export default class FormValidator {
  constructor(data, formSelector){
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputInvalidClass = data.inputInvalidClass;
    this._buttonInvalidClass = data.buttonInvalidClass;
    this._formSelector = formSelector;
  }

  _showError(form, input) {
    const error = form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputInvalidClass);
  }

  _hideError(form, input) {
    const error = form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._inputInvalidClass);
  }

  _checkInputValidity(form, input) {
    if (!input.validity.valid) {
        this._showError(form, input);
    } else {
        this._hideError(form, input);
    }
  }

  _setButtonState(button, isActive) {
    if (isActive) {
        button.classList.remove(this._buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(this._buttonInvalidClass);
        button.disabled = true;
    }
  }

  _setEventListeners(form) {
    const inputsList = form.querySelectorAll(this._inputSelector);
    const submitButton = form.querySelector(this._submitButtonSelector);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('отправка формы');
    });
    inputsList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(form, input);
          this._setButtonState(submitButton, form.checkValidity());
        });
    });
  }

  enableValidation() {
    const form = document.querySelector(this._formSelector);
    this._setEventListeners(form);
    const submitButton = form.querySelector(this._submitButtonSelector);
    console.log(submitButton);
    this._setButtonState(submitButton, form.checkValidity());
  }

  resetValidityState(){
    const currentForm = document.querySelector(this._formSelector);
    const submitButton = currentForm.querySelector(this._submitButtonSelector);
    const currentInputsList = currentForm.querySelectorAll(this._inputSelector);
    currentInputsList.forEach((input)=>{
      this._hideError(currentForm, input);
    });
    this._setButtonState(submitButton, currentForm.checkValidity());
  }
}
