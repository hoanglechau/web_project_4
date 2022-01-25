class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () =>
      this._handleCardClick({ name: this._name, link: this._link }),
    );
    this._likeButton.addEventListener('click', () =>
      this._handleLikeButton(),
    );
    this._deleteButton.addEventListener('click', () =>
      this._handleDeleteButton(),
    );
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('card__btn-like_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return this._cardSelector.content
      .querySelector('.card')
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent =
      this._name;
    this._likeButton = this._element.querySelector('.card__btn-like');
    this._deleteButton = this._element.querySelector(
      '.card__btn-delete',
    );
    this._imageElement = this._element.querySelector('.card__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = `Photo of ${this._name}`;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
