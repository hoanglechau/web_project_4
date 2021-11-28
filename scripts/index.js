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
const editModalBtn = document.querySelector(".profile__btn-edit");
const editModalCloseBtn = editModal.querySelector(".modal__close");
const addModalBtn = document.querySelector(".profile__btn-add");
const addModalCloseBtn = addModal.querySelector(".modal__close");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");

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
	imageElement.style.backgroundImage = `url(${card.link})`;
	imageElement.addEventListener("click", function () {
		previewImage.src = card.link;
		previewImageTitle.textContent = card.name;
		openModal(previewModal);
	});
	previewModalCloseBtn.addEventListener("click", () =>
		closeModal(previewModal)
	);

	const likeBtn = cardElement.querySelector(".card__btn-like");
	likeBtn.addEventListener("click", () => {
		if (likeBtn.classList.contains("card__btn-like_active")) {
			likeBtn.classList.remove("card__btn-like_active");
		} else {
			likeBtn.classList.add("card__btn-like_active");
		}
	});

	const deleteBtn = cardElement.querySelector(".card__btn-delete");
	deleteBtn.addEventListener("click", () => {
		const removedCard = deleteBtn.closest(".card");
		removedCard.remove();
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
editModalBtn.addEventListener("click", () => {
	preFillEditForm();
	openModal(editModal);
});
editModalCloseBtn.addEventListener("click", () => closeModal(editModal));

addForm.addEventListener("submit", addFormSubmitHandler);
addModalBtn.addEventListener("click", () => openModal(addModal));
addModalCloseBtn.addEventListener("click", () => closeModal(addModal));

initialCards.forEach(function (card) {
	const newCard = generateCard(card);
	renderCard(newCard, gallery);
});
