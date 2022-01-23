import "./styles/index.css";
import {
	initialCards,
	selectors,
	modalEditUserInfo,
	modalAddCard,
	validationSettings,
} from "./utils/constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
	nameSelector: modalEditUserInfo.nameSelector,
	aboutSelector: modalEditUserInfo.aboutSelector,
});

const cardPreviewModal = new PopupWithImage(selectors.previewModal);
cardPreviewModal.setEventListeners();

const cardSection = new Section(
	{
		renderer: (item) => {
			const cardElement = new Card(
				{
					data: item,
					handleCardClick: (imageData) => {
						cardPreviewModal.open(imageData);
					},
				},
				selectors.cardTemplate
			);
			cardSection.addItem(cardElement.getView());
		},
	},
	selectors.gallery
);
cardSection.renderItems(initialCards);

const editFormValidator = new FormValidator(
	validationSettings,
	modalEditUserInfo.form
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
	validationSettings,
	modalAddCard.form
);
addFormValidator.enableValidation();

const editFormSubmitHandler = (evt) => {
	evt.preventDefault();

	const name = modalEditUserInfo.nameInput.value;
	const about = modalEditUserInfo.aboutInput.value;
	userInfo.setUserInfo({ name, about });

	modalEditForm.close();
};

const addFormSubmitHandler = (evt) => {
	evt.preventDefault();

	const card = {
		name: modalAddCard.titleInput.value,
		link: modalAddCard.linkInput.value,
	};

	createCard(card);

	modalAddForm.close();
	modalAddCard.form.reset();
};

const modalEditForm = new PopupWithForm(
	modalEditUserInfo.selector,
	editFormSubmitHandler
);
modalEditForm.setEventListeners();

const modalAddForm = new PopupWithForm(
	modalAddCard.selector,
	addFormSubmitHandler
);
modalAddForm.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

modalEditUserInfo.button.addEventListener("click", (evt) => {
	evt.preventDefault();
	const profileInfo = userInfo.getUserInfo();
	modalEditUserInfo.nameInput.value = profileInfo.name;
	modalEditUserInfo.aboutInput.value = profileInfo.about;
	editFormValidator.resetValidation();
	modalEditForm.open();
});

modalAddCard.button.addEventListener("click", (evt) => {
	modalAddCard.form.reset();
	evt.preventDefault();
	addFormValidator.resetValidation();
	modalAddForm.open();
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const createCard = (card) => {
	const cardElement = new Card(
		{
			data: card,
			handleCardClick: (imageData) => {
				cardPreviewModal.open(imageData);
			},
		},
		selectors.cardTemplate
	);
	addCard(cardElement, selectors.gallery);
	return cardElement;
};

const addCard = (card, container) => {
	container.prepend(card.getView());
};
