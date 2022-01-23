export default class Popup {
	constructor(modalSelector) {
		this._modal = document.querySelector(modalSelector);
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
		document.addEventListener("mousedown", this._mouseClick);
	}

	close() {
		this._modal.classList.remove("modal_open");
		document.removeEventListener("keyup", this._handleEscClose);
		document.removeEventListener("mousedown", this._mouseClick);
	}

	_handleEscClose = (evt) => {
		if (evt.key === "Escape") {
			this.close();
		}
	};

	_mouseClick = (evt) => {
		if (evt.target === this._modal) {
			this.close();
		}
	};
}
