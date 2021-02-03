export default class FormValidator {
  constructor(data, formSelector){
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputInvalidClass = data.inputInvalidClass;
    this._buttonInvalidClass = data.buttonInvalidClass;
    this._formSelector = formSelector;
    this._form = document.querySelector(this._formSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputsList = this._form.querySelectorAll(this._inputSelector);
  }


  _showError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputInvalidClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._inputInvalidClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
        this._showError(input);
    } else {
        this._hideError(input);
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

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('отправка формы');
    });
    this._inputsList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._setButtonState(this._submitButton, this._form.checkValidity());
        });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._setButtonState(this._submitButton, this._form.checkValidity());
  }

  resetValidityState(){
    this._inputsList.forEach((input)=>{
      this._hideError(input);
    });
    this._setButtonState(this._submitButton, this._form.checkValidity());
  }
}
