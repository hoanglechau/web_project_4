class FormValidator {
	constructor(settings, formElement) {
		this._settings = settings;
		this._formElement = formElement;
	}

	_checkInputValidity(formElement, inputElement, settings) {
		console.log(formElement);
		console.log(inputElement);

		const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

		if (!inputElement.validity.valid) {
			inputElement.classList.add(settings.inputErrorClass);
			console.log(formElement);
			console.log(inputElement);
			console.log(errorElement);
			errorElement.textContent = inputElement.validationMessage;
			errorElement.classList.add(settings.errorClass);
		} else {
			inputElement.classList.remove(settings.inputErrorClass);
			console.log(inputElement);
			console.log(errorElement);
			errorElement.textContent = "";
			errorElement.classList.remove(settings.errorClass);
		}
	}

	_toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
		const allValid = inputList.every(
			(inputElement) => inputElement.validity.valid
		);
		if (allValid) {
			buttonElement.classList.remove(inactiveButtonClass);
			buttonElement.disabled = false;
		} else {
			buttonElement.classList.add(inactiveButtonClass);
			buttonElement.disabled = true;
		}
	}

	_setupEventListeners(
		formElement,
		{ inputSelector, submitButtonSelector, ...otherSettings }
	) {
		const inputList = [...formElement.querySelectorAll(inputSelector)];
		const buttonElement = formElement.querySelector(submitButtonSelector);
		this._toggleButtonState(inputList, buttonElement, otherSettings);

		inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", (e) => {
				this._checkInputValidity(formElement, inputElement, otherSettings);
				this._toggleButtonState(inputList, buttonElement, otherSettings);
			});
		});
	}

	enableValidation() {
		this._formElement.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});
		this._setupEventListeners(this._formElement, this._settings);
	}
}

export default FormValidator;
