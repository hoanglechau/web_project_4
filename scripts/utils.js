export function openModal(modal) {
	modal.classList.add("modal_open");
	document.addEventListener("keydown", handlePressEscape);
}

export function closeModal(modal) {
	modal.classList.remove("modal_open");
	document.removeEventListener("keydown", handlePressEscape);
}

export function handlePressEscape(evt) {
	if (evt.key === "Escape") {
		closeModal(document.querySelector(".modal_open"));
	}
}
