const isValid = (inputEl) => inputEl.validity.valid;

const checkInputValidity = (formEl, inputEl, settings) => {
	const errorEl = formEl.querySelector(`#${inputEl.id}-error`);

	if (!isValid(inputEl)) {
		inputEl.classList.add(settings.inputErrorClass);
		console.log(formEl);
		console.log(inputEl);
		console.log(errorEl);
		errorEl.textContent = inputEl.validationMessage;
		errorEl.classList.add(settings.errorClass);
	} else {
		inputEl.classList.remove(settings.inputErrorClass);
		console.log(inputEl);
		console.log(errorEl);
		errorEl.textContent = "";
		errorEl.classList.remove(settings.errorClass);
	}
};

toggleButtonState = (inputList, buttonEl, { inactiveButtonClass }) => {
	const allValid = inputList.every((inputEl) => isValid(inputEl));
	if (allValid) {
		buttonEl.classList.remove(inactiveButtonClass);
		buttonEl.disabled = false;
	} else {
		buttonEl.classList.add(inactiveButtonClass);
		buttonEl.disabled = true;
	}
};

const setupEventListeners = (
	formEl,
	{ inputSelector, submitButtonSelector, ...otherSettings }
) => {
	const inputList = [...formEl.querySelectorAll(inputSelector)];
	const buttonEl = formEl.querySelector(submitButtonSelector);

	inputList.forEach((inputEl) => {
		inputEl.addEventListener("input", (e) => {
			checkInputValidity(formEl, inputEl, otherSettings);
			toggleButtonState(inputList, buttonEl, otherSettings);
		});
	});
};

const enableValidation = ({ formSelector, ...otherSettings }) => {
	const formList = [...document.querySelectorAll(formSelector)];
	formList.forEach((formEl) => {
		formEl.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});
		setupEventListeners(formEl, otherSettings);
	});
};

enableValidation({
	formSelector: ".modal__form",
	inputSelector: ".modal__input",
	submitButtonSelector: ".modal__button",
	inactiveButtonClass: "modal__button_inactive",
	inputErrorClass: "modal__input_type_error",
	errorClass: "modal__error_visible",
});
