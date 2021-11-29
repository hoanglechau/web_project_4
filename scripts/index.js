const initialCards = [
	{
		name: "Yosemite Valley",
		link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
	},
	{
		name: "Lake Louise",
		link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
	},
	{
		name: "Bald Mountains",
		link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
	},
	{
		name: "Latemar",
		link: "https://code.s3.yandex.net/web-code/latemar.jpg",
	},
	{
		name: "Vanoise National Park",
		link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
	},
	{
		name: "Lago di Braies",
		link: "https://code.s3.yandex.net/web-code/lago.jpg",
	},
];

/* -------------------------------------------------------------------------- */
/*                                  Wrappers                                  */
/* -------------------------------------------------------------------------- */
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const editModal = document.querySelector(".modal_type_edit");
const addModal = document.querySelector(".modal_type_add");
const previewModal = document.querySelector(".modal_type_preview");
const editForm = editModal.querySelector(".modal__form");
const addForm = addModal.querySelector(".modal__form");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");
const titleInput = document.querySelector("#title-input");
const linkInput = document.querySelector("#link-input");
const gallery = document.querySelector(".gallery");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector(".modal__card-title");

/* -------------------------------------------------------------------------- */
/*                                   Buttons                                  */
/* -------------------------------------------------------------------------- */
const editModalButton = document.querySelector(".profile__btn-edit");
const editModalCloseButton = editModal.querySelector(".modal__close");
const addModalButton = document.querySelector(".profile__btn-add");
const addModalCloseButton = addModal.querySelector(".modal__close");
const previewModalCloseButton = previewModal.querySelector(".modal__close");

/* -------------------------------------------------------------------------- */
/*                                  Templates                                 */
/* -------------------------------------------------------------------------- */
const cardTemplate = document
	.querySelector("#card-template")
	.content.querySelector(".card");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal) {
	modal.classList.add("modal_open");
}

function closeModal(modal) {
	modal.classList.remove("modal_open");
}

function preFillEditForm() {
	if (!editModal.classList.contains("modal_open")) {
		nameInput.value = profileName.textContent;
		aboutInput.value = profileAbout.textContent;
	}
}

function editFormSubmitHandler(evt) {
	evt.preventDefault();

	profileName.textContent = nameInput.value;
	profileAbout.textContent = aboutInput.value;

	closeModal(editModal);
}

function addFormSubmitHandler(evt) {
	evt.preventDefault();

	const card = {
		name: titleInput.value,
		link: linkInput.value,
	};

	const cardElement = generateCard(card);
	gallery.prepend(cardElement);

	closeModal(addModal);
}

function generateCard(card) {
	const cardElement = cardTemplate.cloneNode(true);
	cardElement.querySelector(".card__title").textContent = card.name;

	const imageElement = cardElement.querySelector(".card__image");
	imageElement.src = card.link;
	imageElement.alt = `Photo of ${card.name}`;
	imageElement.addEventListener("click", function () {
		previewImage.src = card.link;
		previewImage.alt = `Photo of ${card.name}`;
		previewImageTitle.textContent = card.name;
		openModal(previewModal);
	});
	previewModalCloseButton.addEventListener("click", () =>
		closeModal(previewModal)
	);

	const likeButton = cardElement.querySelector(".card__btn-like");
	likeButton.addEventListener("click", () => {
		if (likeButton.classList.contains("card__btn-like_active")) {
			likeButton.classList.remove("card__btn-like_active");
		} else {
			likeButton.classList.add("card__btn-like_active");
		}
	});

	const deleteButton = cardElement.querySelector(".card__btn-delete");
	deleteButton.addEventListener("click", () => {
		const cardToRemove = deleteButton.closest(".card");
		cardToRemove.remove();
	});

	return cardElement;
}

function renderCard(card, container) {
	container.append(card);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
editForm.addEventListener("submit", editFormSubmitHandler);
editModalButton.addEventListener("click", () => {
	preFillEditForm();
	openModal(editModal);
});
editModalCloseButton.addEventListener("click", () => closeModal(editModal));

addForm.addEventListener("submit", addFormSubmitHandler);
addModalButton.addEventListener("click", () => openModal(addModal));
addModalCloseButton.addEventListener("click", () => closeModal(addModal));

initialCards.forEach(function (card) {
	const newCard = generateCard(card);
	renderCard(newCard, gallery);
});
