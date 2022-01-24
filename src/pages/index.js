import './index.css';
import {
  initialCards,
  selectors,
  modalEditUserInfo,
  modalAddCard,
  validationSettings,
} from '../utils/constants';
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: modalEditUserInfo.nameSelector,
  aboutSelector: modalEditUserInfo.aboutSelector,
});

const cardPreviewModal = new PopupWithImage(selectors.previewModal);
cardPreviewModal.setEventListeners();

const createCard = (card) =>
  new Card(
    {
      data: card,
      handleCardClick: (imageData) => {
        cardPreviewModal.open(imageData);
      },
    },
    selectors.cardTemplate,
  );

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement.getView());
    },
  },
  selectors.gallery,
);
cardSection.renderItems(initialCards);

const modalEditForm = new PopupWithForm(
  modalEditUserInfo.selector,
  (evt) => {
    evt.preventDefault();

    const inputValue = modalEditForm.getInputValues();
    userInfo.setUserInfo({
      name: inputValue.name,
      about: inputValue.about,
    });

    modalEditForm.close();
  },
);
modalEditForm.setEventListeners();

const modalAddForm = new PopupWithForm(
  modalAddCard.selector,
  (evt) => {
    evt.preventDefault();

    const inputValue = modalAddForm.getInputValues();
    const cardElement = createCard({
      name: inputValue.title,
      link: inputValue.link,
    });
    cardSection.addItem(cardElement.getView());

    modalAddForm.close();
  },
);
modalAddForm.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(
    document.querySelectorAll(config.formSelector),
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

modalEditUserInfo.button.addEventListener('click', (evt) => {
  evt.preventDefault();
  const profileInfo = userInfo.getUserInfo();
  modalEditUserInfo.nameInput.value = profileInfo.name;
  modalEditUserInfo.aboutInput.value = profileInfo.about;
  formValidators.modalEditForm.resetValidation();
  modalEditForm.open();
});

modalAddCard.button.addEventListener('click', (evt) => {
  evt.preventDefault();
  formValidators.modalAddForm.resetValidation();
  modalAddForm.open();
});
