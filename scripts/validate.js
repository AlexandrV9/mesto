function showError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputInvalidClass);
}

function hideError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputInvalidClass);
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
      showError(form, input, config);
  } else {
      hideError(form, input, config);
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
      button.classList.remove(config.buttonInvalidClass);
      button.disabled = false;
  } else {
      button.classList.add(config.buttonInvalidClass);
      button.disabled = true;
  }
}

function setEventListeners(form, config) {
  const inputsList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, config);
        setButtonState(submitButton, form.checkValidity(), config);
      });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
      setEventListeners(form, config);

      form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          console.log('отправка формы');
      });

      const submitButton = form.querySelector(config.submitButtonSelector);
      setButtonState(submitButton, form.checkValidity(), config)
  });
}

function resetValidityState(popup, config){
  const currentForm = popup.querySelector(config.formSelector);
  const currentListInput = currentForm.querySelectorAll(config.inputSelector);
  currentListInput.forEach((input)=>{
    hideError(currentForm, input, config);
  })
}

function notifyAboutFormInoutChange(popup, config){
  const currentForm = popup.querySelector(config.formSelector);
  const submitButton = currentForm.querySelector(config.submitButtonSelector);
  setEventListeners(currentForm, config);
  setButtonState(submitButton, currentForm.checkValidity(), config);
}
