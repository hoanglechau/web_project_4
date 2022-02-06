import './index.css';
import {
  selectors,
  modalEditUserInfo,
  modalAddCard,
  modalEditAvatar,
  validationSettings,
} from '../utils/constants';
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo';
import api from '../components/Api';

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: modalEditUserInfo.nameSelector,
  aboutSelector: modalEditUserInfo.aboutSelector,
  avatarSelector: modalEditAvatar.avatarSelector,
});

const cardPreviewModal = new PopupWithImage(selectors.previewModal);
cardPreviewModal.setEventListeners();

const modalEditForm = new PopupWithForm(
  modalEditUserInfo.selector,
  { defaultText: 'Save', updatingText: 'Saving...' },
  (formInputs) =>
    api
      .setUserInfo({
        name: formInputs.name,
        about: formInputs.about,
      })
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        });
      })
      .catch((err) => {
        console.log(err);
      }),
);
modalEditForm.setEventListeners();

const modalEditAvatarForm = new PopupWithForm(
  modalEditAvatar.selector,
  { defaultText: 'Save', updatingText: 'Saving...' },
  (formInput) =>
    api
      .setUserAvatar({ avatar: formInput.link })
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        });
      })
      .catch((err) => {
        console.log(err);
      }),
);
modalEditAvatarForm.setEventListeners();

const modalDeleteCard = new PopupWithConfirmation(
  selectors.deleteModal,
  (cardId, card) => {
    api
      .removeCard(cardId)
      .then(() => {
        modalDeleteCard.close();
        card.remove();
        card = null;
      })
      .catch((err) => {
        console.log(err);
      });
  },
);
modalDeleteCard.setEventListeners();

const openModalDeleteCard = (cardId, card) => {
  modalDeleteCard.open(cardId, card);
};

const createCard = (res, userInfoData) => {
  const card = new Card(
    api,
    res,
    selectors.cardTemplate,
    (link, name) => {
      cardPreviewModal.open(link, name);
    },
    userInfoData._id,
    openModalDeleteCard,
  );
  return card.generateCard();
};

api
  .getInitialCards()
  .then(([cardsData, userInfoData]) => {
    const cardList = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          const cardElement = createCard(item, userInfoData);
          cardList.addItem(cardElement);
        },
      },
      selectors.gallery,
    );

    cardList.renderItems();

    userInfo.setUserInfo({
      name: userInfoData.name,
      about: userInfoData.about,
      avatar: userInfoData.avatar,
    });

    const modalAddForm = new PopupWithForm(
      modalAddCard.selector,
      { defaultText: 'Create', updatingText: 'Creating...' },
      (formInputs) => {
        api
          .addCard({
            name: formInputs.title,
            link: formInputs.link,
          })
          .then((res) => {
            const cardElement = createCard(res, userInfoData);
            cardList.prependItem(cardElement);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    );
    modalAddForm.setEventListeners();

    modalAddCard.button.addEventListener('click', (evt) => {
      evt.preventDefault();
      formValidators.modalAddForm.resetValidation();
      modalAddForm.open();
    });
  })
  .catch((err) => {
    console.log(err);
  });

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

modalEditAvatar.button.addEventListener('click', (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  formValidators.modalEditAvatarForm.resetValidation();
  modalEditAvatarForm.open();
});
