import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._previewImage = this._modal.querySelector(".modal__preview-image");
		this._previewImageTitle = this._modal.querySelector(".modal__card-title");
	}

	open(data) {
		this._previewImage.src = data.link;
		this._previewImage.alt = `Photo of ${data.name}`;
		this._previewImageTitle.textContent = data.name;

		super.open();
	}
}
