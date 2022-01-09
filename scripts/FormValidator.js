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

	_addErrorStyles(inputElement) {
		inputElement.classList.add(this._settings.inputErrorClass);
	}

	_removeErrorStyles(inputElement) {
		inputElement.classList.remove(this._settings.inputErrorClass);
	}

	_showErrorMessage(inputElement) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(this._settings.errorClass);
	}

	_hideErrorMessage(inputElement) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);
		errorElement.textContent = "";
		errorElement.classList.remove(this._settings.errorClass);
	}

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._addErrorStyles(inputElement);
			this._showErrorMessage(inputElement);
		} else {
			this._removeErrorStyles(inputElement);
			this._hideErrorMessage(inputElement);
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

	resetValidation() {
		this._toggleButtonState();

		this._inputList.forEach((inputElement) => {
			this._removeErrorStyles(inputElement);
			this._hideErrorMessage(inputElement);
		});
	}
}

export default FormValidator;
