import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

const initialCards = [
	{
		name: "Yosemite Valley",
		link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
	},
	{
		name: "Lake Louise",
		link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
	},
	{
		name: "Bald Mountains",
		link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
	},
	{
		name: "Latemar",
		link: "https://code.s3.yandex.net/web-code/latemar.jpg",
	},
	{
		name: "Vanoise National Park",
		link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
	},
	{
		name: "Lago di Braies",
		link: "https://code.s3.yandex.net/web-code/lago.jpg",
	},
];

/* -------------------------------------------------------------------------- */
/*                                  Wrappers                                  */
/* -------------------------------------------------------------------------- */
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const editModal = document.querySelector(".modal_type_edit");
const addModal = document.querySelector(".modal_type_add");
const modals = document.querySelectorAll(".modal");
const previewModal = document.querySelector(".modal_type_preview");
const editForm = editModal.querySelector(".modal__form");
const addForm = addModal.querySelector(".modal__form");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");
const titleInput = document.querySelector("#title-input");
const linkInput = document.querySelector("#link-input");
const gallery = document.querySelector(".gallery");

/* -------------------------------------------------------------------------- */
/*                                   Buttons                                  */
/* -------------------------------------------------------------------------- */
const editModalButton = document.querySelector(".profile__btn-edit");
const editModalCloseButton = editModal.querySelector(".modal__close");
const addModalButton = document.querySelector(".profile__btn-add");
const addModalCloseButton = addModal.querySelector(".modal__close");
const previewModalCloseButton = previewModal.querySelector(".modal__close");

/* -------------------------------------------------------------------------- */
/*                                  Templates                                 */
/* -------------------------------------------------------------------------- */
const cardSelector = document.querySelector("#card-template");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function preFillEditForm() {
	nameInput.value = profileName.textContent;
	aboutInput.value = profileAbout.textContent;
}

function resetAddForm() {
	titleInput.value = "";
	linkInput.value = "";
}

function editFormSubmitHandler(evt) {
	evt.preventDefault();

	profileName.textContent = nameInput.value;
	profileAbout.textContent = aboutInput.value;

	closeModal(editModal);
}

function addFormSubmitHandler(evt) {
	evt.preventDefault();

	const card = {
		name: titleInput.value,
		link: linkInput.value,
	};

	createCard(card);

	closeModal(addModal);
	addForm.reset();
}

function createCard(card) {
	const cardElement = new Card(card, cardSelector);
	addCard(cardElement, gallery);
	return cardElement;
}

function addCard(card, container) {
	container.prepend(card.getView());
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
editForm.addEventListener("submit", editFormSubmitHandler);
editModalButton.addEventListener("click", () => {
	preFillEditForm();
	openModal(editModal);
	editFormValidator.resetValidation();
});
editModalCloseButton.addEventListener("click", () => closeModal(editModal));

addForm.addEventListener("submit", addFormSubmitHandler);
addModalButton.addEventListener("click", () => {
	resetAddForm();
	openModal(addModal);
	addFormValidator.resetValidation();
});
addModalCloseButton.addEventListener("click", () => closeModal(addModal));

initialCards.forEach((card) => {
	createCard(card);
});

previewModalCloseButton.addEventListener("click", () =>
	closeModal(previewModal)
);

modals.forEach((modal) => {
	modal.addEventListener("mousedown", (e) => {
		if (e.target === modal) {
			closeModal(modal);
		}
	});
});

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
const validationSettings = {
	inputSelector: ".modal__input",
	submitButtonSelector: ".modal__button",
	inactiveButtonClass: "modal__button_inactive",
	inputErrorClass: "modal__input_type_error",
	errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationSettings, editForm);
const addFormValidator = new FormValidator(validationSettings, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* How to combine overlay and close buttons listeners together using generic css classes:

const popups = document.querySelectorAll('.popup')

    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup)
            }
            if (evt.target.classList.contains('popup__close')) {
				closePopup(popup)
            }
        })
    })

*/

/*
You can universally create instances of validators for all forms in the project storing them inside one object  formValidators .  And then you can take any validator using attribute name of the form where you need to disable/enable the submit button or remove errors.
const formValidators = {}

-> enable validation:
const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.formSelector))
	formList.forEach((formElement) => {
		const validator = new FormValidator(formElement, config)
		-> here you get the name of the form:
		const formName = formElement.getAttribute('name')

		-> here you store a validator by the `name` of the form:
		formValidators[formName] = validator;
		validator.enableValidation();
	});
};

enableValidation(config);

-> And now you can use them for disabling buttons or clearing errors:

formValidators[ profileForm.getAttribute('name') ].resetValidation()

-> or:

formValidators[ addCardForm.getAttribute('name') ].resetValidation()
*/
