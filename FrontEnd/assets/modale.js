let modal = null;
const focusablesSelector = "button,a,input,textarea";
let focusables = [];
let previouslyFocusedElement = null;
const openModal = async function (e) {
  e.preventDefault();
  const target = this.getAttribute("href");
  if (target.startsWith("#")) {
    modal = document.querySelector(target);
  } else {
    modal = await loadModal(target);
  }
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
};
// Ajoutez un écouteur d'événement au lien de modification
const modifierLink = document.querySelector(".js-modal");
modifierLink.addEventListener("click", openModal);

/* Récupérez la référence à votre modale
const modal = document.getElementById("#modale1");
// Récupérez la référence au bouton qui ouvre la modale
const btnOpenModal = document.getElementById("btnOpenModal");
// Récupérez la référence à'élément quime la modale
closeModal = document.querySelector(".-xmark");
//outez un évén de clic sur leon qui ouvre modale
btnOpen.addEventListener("click", () => {
  modal.style.display = "block"; // Affichez la mod
});
// Ajoutez un événement de clic sur l'élément qui ferme la modale
closeModal.addEventListener("click", function () {
  modal.style.display = "none"; // Masquez la modale
});*/
