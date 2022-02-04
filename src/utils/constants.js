export const selectors = {
  gallery: document.querySelector('.gallery'),
  cardTemplate: document.querySelector('.card-template'),
  previewModal: '.modal_type_preview',
  deleteModal: '.modal_type_delete',
};

export const modalEditUserInfo = {
  selector: '.modal_type_edit',
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  button: document.querySelector('.profile__btn-edit'),
  form: document.querySelector('.modal_type_edit .modal__form'),
  nameInput: document.querySelector('#name-input'),
  aboutInput: document.querySelector('#about-input'),
};

export const modalAddCard = {
  selector: '.modal_type_add',
  button: document.querySelector('.profile__btn-add'),
  form: document.querySelector('.modal_type_add .modal__form'),
  titleInput: document.querySelector('#title-input'),
  linkInput: document.querySelector('#link-input'),
};

export const modalEditAvatar = {
  selector: '.modal_type_avatar',
  avatarSelector: '.profile__avatar',
  button: document.querySelector('.profile__avatar'),
  form: document.querySelector('.modal_type_avatar .modal__form'),
  avatarInput: document.querySelector('#avatar-input'),
};

export const validationSettings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_inactive',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible',
};
