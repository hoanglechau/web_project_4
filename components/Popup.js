export default class Popup {
	constructor(popupSelector) {
		this._modal = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	setEventListeners() {
		const closeButton = this._modal.querySelector(".modal__close");
		closeButton.addEventListener("click", () => {
			this.close();
		});
	}

	open() {
		this._modal.classList.add("modal_open");
		document.addEventListener("keyup", this._handleEscClose);
		document.addEventListener("click", this._mouseClick);
	}

	close() {
		this._modal.classList.remove("modal_open");
		document.removeEventListener("keyup", this._handleEscClose);
		document.removeEventListener("click", this._mouseClick);
	}

	_handleEscClose = (evt) => {
		if (evt.key === "Escape") {
			this.close();
		}
	};

	_mouseClick = (evt) => {
		if (
			!evt.target.closest(".modal__content") &&
			!evt.target.closest(".modal__content_type_preview")
		) {
			this.close();
		}
	};
}
