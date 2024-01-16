const url = "http://localhost:5678/api/works";
const stockage = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

let modal = null;
const focusablesSelector = "button,a,input,textarea";
let focusables = [];
let previouslyFocusedElement = null;

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
// Ajoutez un écouteur d'événement au lien de modification
const modifierLink = document.querySelector(".js-modal");
modifierLink.addEventListener("click", openModal);

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
  modal.addEventListener("js-modal-close", hideModal);
};

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

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});
/*Récupération de l'élément conteneur de la modale
const gallery = document.querySelector(".gallery");
// Fonction pour afficher les images des projets dans la modale
function afficherImagesProjetsDansModale() {
  // Clear modal container
  gallery.innerHTML = "";
  // Parcourir tous les projets
  projets.forEach((work) => {
    // Créer un élément <div> pour chaque projet
    const divProjet = document.createElement("div");
    // Créer un élément <img> pour l'image du projet
    const imgProjet = document.createElement("img");
    imgProjet.src = work.image;
    // Créer un élément <i> pour l'icône de poubelle
    const iconePoubelle = document.createElement("i");
    iconePoubelle.className = "fa fa-trash-can";
    // Ajouter le gestionnaire d'événement sur l'icône de poubelle
    iconePoubelle.addEventListener("click", () => {
      // Appeler la fonction de suppression du projet ici
      supprimerProjet(work.id);
    });
    // Ajouter l'image et l'icône de poubelle au div du projet
    divProjet.appendChild(imgProjet);
    divProjet.appendChild(iconePoubelle);
    // Ajouter le div du projet à la modale
    modalContainer.appendChild(divProjet);
  });
}
afficherImagesProjetsDansModale();*/
