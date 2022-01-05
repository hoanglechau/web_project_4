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
const createButton = document.querySelector("#create-button");

/* -------------------------------------------------------------------------- */
/*                                  Templates                                 */
/* -------------------------------------------------------------------------- */
const cardSelector = document.querySelector("#card-template");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function preFillEditForm() {
	if (!editModal.classList.contains("modal_open")) {
		nameInput.value = profileName.textContent;
		aboutInput.value = profileAbout.textContent;
	}
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

	const newCard = new Card(card, cardSelector);
	renderCard(newCard, gallery);
	disableCreateButton();

	closeModal(addModal);
	addForm.reset();
}

function renderCard(card, container) {
	container.prepend(card.getView());
}

function disableCreateButton() {
	createButton.classList.add("modal__button_inactive");
	createButton.disabled = true;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
editForm.addEventListener("submit", editFormSubmitHandler);
editModalButton.addEventListener("click", () => {
	preFillEditForm();
	openModal(editModal);
});
editModalCloseButton.addEventListener("click", () => closeModal(editModal));

addForm.addEventListener("submit", addFormSubmitHandler);
addModalButton.addEventListener("click", () => openModal(addModal));
addModalCloseButton.addEventListener("click", () => closeModal(addModal));

initialCards.forEach(function (card) {
	const newCard = new Card(card, cardSelector);
	renderCard(newCard, gallery);
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
