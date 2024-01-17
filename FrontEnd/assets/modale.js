let modal = null;
const focusablesSelector = "button,a,input,textarea";
let focusables = [];
let previouslyFocusedElement = null;

// Récupération et affichage des projets dans la modal
function afficherImagesProjetsDansModale() {
  const url = "http://localhost:5678/api/works";
  const stockage = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Afficher les projets dans la modal
  const modalContent = document.querySelector("#modale1");
  modalContent.innerHTML = "";
  works.forEach((work) => {
    const workDiv = document.createElement("div");
    const workImage = document.createElement("img");
    workImage.src = work.image;
    workDiv.appendChild(workImage);
    const workTitre = document.createElement("h2");
    workTitre.textContent = work.titre;
    workDiv.appendChild(workTitre);
    modalContent.appendChild(workDiv);
    img.style.width = "80px";
    img.style.height = "100px";
  });
}
//ouverture de la modale
const openModal = async function (e) {
  e.preventDefault();
  const target = this.getAttribute("href"); //code pour ouvrir la modale
  if (target.startsWith("#")) {
    modal = document.querySelector(target); //trouver l'élément par rapport à la cible
  } else {
    modal = await loadModal(target); //lui passe l'url en paramètre
  }
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
};
// Ajout d'un écouteur d'événement au lien de modification
const modifierLink = document.querySelector(".js-modal");
modifierLink.addEventListener("click", openModal);

//fermeture de la modale
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);

  const hideModal = function () {
    modal.style.display = "none";
    modal = null;
  };
  modal.querySelector(".js-modal-close").addEventListener("click", hideModal);
};
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

//ouverture deuxieme modal
const loadModal = async function (url) {
  const target = "#" + url.split("#")[1];
  const existingModal = document.querySelector(target);
  if (existingModal !== null) return existingModal;

  const html = await fetch(url).then((response) => response.text());
  const element = document
    .createRange()
    .createContextualFragment(html)
    .querySelector(target);

  if (element === null)
    throw "l'element ${target} n'a pas était trouver dans la page ${url}";
  document.body.append(element);
  return element;
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
