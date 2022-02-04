import api from './Api';

export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    currentUserId,
    deleteSubmitHandler,
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteSubmitHandler = deleteSubmitHandler;
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
    const isLiked = this._data.likes.some((like) => {
      if (like._id === this._currentUserId) {
        return true;
      }
      return false;
    });

    if (isLiked) {
      this._removeLike();
    } else {
      this._addLike();
    }
  }

  _handleDeleteButton() {
    this._deleteSubmitHandler(this._cardId, this._element);
  }

  _addLike() {
    api.addLike(this._cardId).then((res) => {
      this._likeButton.classList.add('card__btn-like_active');
      this._likeCounter.textContent = res.likes.length;
      this._data = res;
    });
  }

  _removeLike() {
    api.removeLike(this._cardId).then((res) => {
      this._likeButton.classList.remove('card__btn-like_active');
      this._likeCounter.textContent = res.likes.length;
      this._data = res;
    });
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector('.card')
      .cloneNode(true);
    this._deleteButton = cardElement.querySelector(
      '.card__btn-delete',
    );
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent =
      this._name;
    this._likeButton = this._element.querySelector('.card__btn-like');
    this._likeCounter = this._element.querySelector(
      '.card__like-counter',
    );
    this._imageElement = this._element.querySelector('.card__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = `Photo of ${this._name}`;

    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.classList.add('card__btn-delete_hidden');
    }
    const isLiked = this._data.likes.some((like) => {
      if (like._id === this._currentUserId) {
        return true;
      }
      return false;
    });

    if (isLiked) {
      this._likeButton.classList.add('card__btn-like_active');
    } else {
      this._likeButton.classList.remove('card__btn-like_active');
    }

    this._likeCounter.textContent = this._data.likes.length;
    this._setEventListeners();
    return this._element;
  }
}
