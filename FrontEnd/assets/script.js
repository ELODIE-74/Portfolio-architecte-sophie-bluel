//initialisation des variables
let works;
let categories;
let positionIndex = 0; //variable position (pour le changement des boutons)
let modal = null;
const logpage = document.getElementById("logpageaccueil");
const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  logpage.innerText = "logout";
  logpage.addEventListener("click", function (event) {
    //event.preventDefault();
    localStorage.clear();
  });
  const header = document.querySelector("#header_hidden"); //variable qui récupére l'élément html
  const connexionHeader = document.createElement("div"); //variable qui crée la div
  connexionHeader.classList.add("barre_hidden"); //ajout du css du bandeau
  connexionHeader.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>';
  header.prepend(connexionHeader); //ajout des éléments crée pour le mode édition
  //code précedant pour le masquage du bandeau en mode édition
  const buttonHidden = document.querySelector(".button_hidden"); //variable qui récupére l'élement html
  const buttonedition = document.createElement("div"); //création de la div
  buttonedition.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i><p class="edit_modifier"><a href="#modale1" class="js-modal">Modifier</a></p>'; //ajout des éléments
  buttonHidden.appendChild(buttonedition); //ajout des éléments crée pour le mode édition
  //le code suivant masque les boutons de filtrage en mode édition
  const filterButtons = document.getElementById("Filtres"); // récupére la div qui contient les filtres
  filterButtons.style.display = "none"; //fait disparaitres les bouton de filtrage en mode édition
}

fetch("http://localhost:5678/api/works")
  .then((data) => data.json()) //data = données
  .then((json) => {
    works = json;
    const gallery = document.querySelector(".gallery"); //récupére les élemnts de la galerie
    displayWorks(works); // Appel de la fonction displayWorks avec les données récupérées
    console.table(works); //affichage de tous les projets(works)
  });

fetch("http://localhost:5678/api/categories")
  //on récupére une réponse qu'on formate en formar JSON
  .then((response) => response.json())
  //on récupère ensuite les données
  .then((categoriesData) => {
    categories = new Set(categoriesData); //données de la catégorie
    const filtres = document.getElementById("Filtres"); //variable globale qui récupérer les filtres
    for (categorie of categories) {
      //boucle pour parcourir les différentes catégories
      //création du bouton de la catégorie objet
      let divObjets = document.createElement("div"); //création de la div objet
      divObjets.innerText = categorie.name; //rajout du nom de la catégorie
      divObjets.id = categorie.name; //rajout de l'identifiant de la catégorie
      filtres.appendChild(divObjets); //lier la div(objet) au parent filtres
    }
    ecouteClick(); //écoute l'évènement au clic sur un bouton et affiche la div concerné
  })
  //Traitement de l'erreur si il n'y a pas de réponse de l'url
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des catégories :", //message d'erreur
      error
    );
  });

//Fonction qui filtre un projet = une catégorie
//function filterByCategorie(categorie) {
//return works.filter((work) => work.category.name === categorie); //retourne tous les éléments avec le même identifiant (ici les différentes catégories)
//}
function filterByCategorie(categorie) {
  if (categorie === "Tous") {
    // Retourne tous les travaux sans filtrage
    return works;
  } else {
    // Filtre
    // les travaux en fonction de la catégorie
    return works.filter((work) => work.category.name === categorie);
  }
}

//reprise des éléments du work dans la fonction displayWorks et affichage des oeuvres
const displayWorks = (works) => {
  const gallery = document.querySelector(".gallery"); //variable qui récupére tous les élèment de la galerie
  //Boucle pour parcourir d'un projet en particulier à tous les projets
  for (const work of works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
};
//gestion des click sur les boutons
function ecouteClick() {
  const categories = document.querySelectorAll("#Filtres div"); //récupére toutes les div contenus dans la partie Filtres
  for (let i = 0; i < categories.length; i++) {
    //parcour le tableau et grandit / initialise la variable à 0 point de départ
    const categorie = categories[i]; //tableau des catégories(le parcours)
    categorie.addEventListener("click", function () {
      //écoute de l'évènement au click sur un bouton
      let textecategorie = categorie.innerText; //variable pour récupérer le texte de la catégorie
      // Filtre les oeuvres en fonction de la catégorie cliquée
      const oeuvresFiltrees = filterByCategorie(textecategorie);
      // Efface les éléments affichés actuellement dans la galerie
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      // Affiche les nouvelles oeuvres filtrées dans la galerie
      displayWorks(oeuvresFiltrees);
      console.log(categorie); //affiche une catégorie
    });
  }
}
////////////////////////////////////////////
//partie mode édition modale(x2)/////
///////////////////////////////////////////
//ouverture de la modale
const openModal = async function (e) {
  e.preventDefault();
  const target = this.getAttribute("href"); //code pour ouvrir la modale
  if (target && target.startsWith("#")) {
    modal = document.querySelector(target);
  } else {
    modal = await loadModal(target);
  }
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  afficherImagesProjetsDansModale("#modale1"); //appel de la fonction pour afficher les travaux dans la première modale
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
  //sélectionne chaque lien et permet de mettre un addeventlistener
});

//fonction pour afficher les travaux dans la modale
function afficherImagesProjetsDansModale() {
  const modalContent = document.querySelector(".modaleImg");
  modalContent.innerHTML = "";
  // Boucle sur les projets
  works.forEach((projet) => {
    // Créer les éléments nécessaires pour afficher le projet et l'icône de suppression
    const projetDiv = document.createElement("div");
    const projetImg = document.createElement("img");
    const poubelleIcon = document.createElement("img");
    // Définir l'URL de l'image du projet
    projetImg.src = projet.imageUrl;
    projetImg.style.width = "80px";
    projetImg.style.height = "100px";
    // Définir l'icône de la poubelle
    poubelleIcon.classList.add("iconepoubelle");
    poubelleIcon.addEventListener("click", () => {
      supprimerProjet(projet.id); // Appele une fonction pour supprimer le projet
    });
    // Ajoute les éléments au contenu de la modale
    projetDiv.appendChild(projetImg);
    projetDiv.appendChild(poubelleIcon);
    modalContent.appendChild(projetDiv);
  });
}
function displayModal() {
  // Récupérer les images existantes depuis l'API avec une requête fetch
  fetch("/images")
    .then((response) => response.json())
    .then((data) => {
      // Créer une variable pour stocker le contenu HTML de la fenêtre modale
      let modalContent = "";
      // Parcourir les images récupérées et les ajouter dans le contenu de la fenêtre modale
      data.forEach((image) => {
        modalContent += `<div class="ajout-image">
                          <img src="${image.url}" alt="${image.alt}">
                          <button onclick="deleteImage(${image.id})">Supprimer</button>
                        </div>`;
      });
      // Afficher le contenu de la fenêtre modale dans le DOM
      const modal = document.getElementById("modal");
      modal.innerHTML = modalContent;
      modal.style.display = "block";
    });
}
//deuxième fonction pour ajouter une photo
/*function addPhoto() {
  // récupére l'élément du formulaire contenant les informations
  const photoForm = document.getElementById("ajout-image");
  // rée un nouvel objet
  const formData = new FormData(photoForm);
  window.open(url) = "download-link";
  // envoie les données du formulaire via une requête
  fetch("<http://votre-api.com/photos>", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // traite la réponse de l'API
      if (data.success) {
        ("vous avez réussi");
      } else {
        return error;
      }
    })
    .catch((error) => {
      // en cas d'erreur de connexion au serveur
      console.error(
        "Une erreur est survenue lors de l'ajout de la photo :",
        error
      );
    });
}*/
const downloadLink = document.getElementById("download-link");
downloadLink.addEventListener("click", function (event) {
  event.preventDefault();
});
