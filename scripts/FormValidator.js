class FormValidator {
	constructor(settings, formElement) {
		this._settings = settings;
		this._formElement = formElement;
		this._inputList = [...formElement.querySelectorAll(settings.inputSelector)];
		this._buttonElement = formElement.querySelector(
			settings.submitButtonSelector
		);
		this._inactiveButtonClass = settings.inactiveButtonClass;
	}

	_checkInputValidity(inputElement) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);

		if (!inputElement.validity.valid) {
			inputElement.classList.add(this._settings.inputErrorClass);
			errorElement.textContent = inputElement.validationMessage;
			errorElement.classList.add(this._settings.errorClass);
		} else {
			inputElement.classList.remove(this._settings.inputErrorClass);
			errorElement.textContent = "";
			errorElement.classList.remove(this._settings.errorClass);
		}
	}

	_toggleButtonState() {
		const allValid = this._inputList.every(
			(inputElement) => inputElement.validity.valid
		);
		if (allValid) {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.disabled = false;
		} else {
			this._buttonElement.classList.add(this._inactiveButtonClass);
			this._buttonElement.disabled = true;
		}
	}

	_setupEventListeners() {
		this._toggleButtonState();

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", (e) => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
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

/* Advice:

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
