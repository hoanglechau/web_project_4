/* Query selectors */
const editProfileBtn = document.querySelector(".profile__btn-edit");
const closeBtn = document.querySelector(".modal__close");
const likeBtn = document.querySelectorAll(".card__btn-like");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const modal = document.querySelector(".modal");
const form = document.querySelector(".modal__form");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");

/* Init */
nameInput.value = profileName.textContent;
aboutInput.value = profileAbout.textContent;

/* Functions */
function toggleModal() {
	modal.style.display = "flex";
}

function closeModal() {
	modal.style.display = "none";
}

function updateProfile() {
	event.preventDefault();

	profileName.textContent = nameInput.value;
	profileAbout.textContent = aboutInput.value;

	closeModal();
}

/* Event Listeners */
modal.addEventListener("submit", updateProfile, false);
editProfileBtn.addEventListener("click", toggleModal, false);
closeBtn.addEventListener("click", closeModal, false);

likeBtn.forEach((likeBtn) => {
	likeBtn.addEventListener("click", () => {
		if (likeBtn.classList.contains("card__btn-like_active")) {
			likeBtn.classList.remove("card__btn-like_active");
		} else {
			likeBtn.classList.add("card__btn-like_active");
		}
	});
});
