class FormValidator {
	constructor(settings, formElement) {
		this._settings = settings;
		this._formElement = formElement;
		this._inputList = [...formElement.querySelectorAll(settings.inputSelector)];
		this._buttonElement = formElement.querySelector(
			settings.submitButtonSelector
		);
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
		this._toggleButtonState(
			this._inputList,
			this._buttonElement,
			otherSettings
		);

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", (e) => {
				this._checkInputValidity(formElement, inputElement, otherSettings);
				this._toggleButtonState(
					this._inputList,
					this._buttonElement,
					otherSettings
				);
			});
		});
	}

	enableValidation() {
		this._formElement.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});
		this._setupEventListeners();
	}
}

export default FormValidator;

/*
You could make a special method resetValidation for clearing errors and controlling the submit button.
It could look something like this:

resetValidation() {
    this._toggleButtonState(); <== controlling the submit button ==

    this._inputList.forEach((inputElement) => {
        this._hideError(inputElement) <== clearing errors ==
    });

}

And you can call it in index.js when you click on open buttons
*/
