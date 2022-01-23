export const initialCards = [
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

export const selectors = {
	gallery: document.querySelector(".gallery"),
	cardTemplate: document.querySelector(".card-template"),
	previewModal: ".modal_type_preview",
};

export const modalEditUserInfo = {
	selector: ".modal_type_edit",
	nameSelector: ".profile__name",
	aboutSelector: ".profile__about",
	button: document.querySelector(".profile__btn-edit"),
	form: document.querySelector(".modal_type_edit .modal__form"),
	nameInput: document.querySelector("#name-input"),
	aboutInput: document.querySelector("#about-input"),
};

export const modalAddCard = {
	selector: ".modal_type_add",
	button: document.querySelector(".profile__btn-add"),
	form: document.querySelector(".modal_type_add .modal__form"),
	titleInput: document.querySelector("#title-input"),
	linkInput: document.querySelector("#link-input"),
};

export const validationSettings = {
	inputSelector: ".modal__input",
	submitButtonSelector: ".modal__button",
	inactiveButtonClass: "modal__button_inactive",
	inputErrorClass: "modal__input_type_error",
	errorClass: "modal__error_visible",
};
