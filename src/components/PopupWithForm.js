import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(
    modalSelector,
    { defaultText, updatingText },
    handleFormSubmit,
  ) {
    super(modalSelector);
    this._form = this._modal.querySelector('.modal__form');
    this._inputList = this._modal.querySelectorAll('.modal__input');
    this._submitButton = this._modal.querySelector('.modal__button');
    this._submitButton.textContent = defaultText;
    this._handleFormSubmit = (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = updatingText;
      this._submitButton.disabled = true;
      const formInputs = this._getInputValues();
      handleFormSubmit(formInputs, this._submitButton)
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error(err);
          return Promise.reject(err);
        })
        .finally(() => {
          this._submitButton.textContent = defaultText;
          this._submitButton.disabled = false;
        });
    };
  }

  _getInputValues() {
    const inputValue = {};
    this._inputList.forEach((input) => {
      inputValue[input.name] = input.value;
    });
    return inputValue;
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', this._handleFormSubmit);
    super.setEventListeners();
  };

  close() {
    super.close();
    this._form.reset();
  }
}
