import { openModal } from "./utils.js";

const previewImage = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector(".modal__card-title");
const previewModal = document.querySelector(".modal_type_preview");

class Card {
	constructor(data, cardSelector) {
		this._name = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
	}

	_setEventListeners() {
		this._imageElement.addEventListener("click", () =>
			this._handlePreviewImage()
		);
		this._likeButton.addEventListener("click", () => this._handleLikeButton());
		this._deleteButton.addEventListener("click", () =>
			this._handleDeleteButton()
		);
	}

	_handleLikeButton() {
		this._likeButton.classList.toggle("card__btn-like_active");
	}

	_handleDeleteButton() {
		this._element.remove();
		this._element = null;
	}

	_handlePreviewImage() {
		previewImage.src = this._link;
		previewImage.alt = `Photo of ${this._name}`;
		previewImageTitle.textContent = this._name;
		openModal(previewModal);
	}

	_getTemplate() {
		const cardElement = this._cardSelector.content
			.querySelector(".card")
			.cloneNode(true);
		return cardElement;
	}

	getView() {
		this._element = this._getTemplate();
		this._element.querySelector(".card__title").textContent = this._name;
		this._likeButton = this._element.querySelector(".card__btn-like");
		this._deleteButton = this._element.querySelector(".card__btn-delete");
		this._imageElement = this._element.querySelector(".card__image");
		this._imageElement.src = this._link;
		this._imageElement.alt = `Photo of ${this._name}`;

		this._setEventListeners();
		return this._element;
	}
}

export default Card;
