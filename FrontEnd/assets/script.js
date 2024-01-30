//initialisation des variables
let works;
let categories;
let positionIndex = 0; //variable position (pour le changement des boutons)

let url;
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
    //partie afficher dans la deuxième modale champ de sélection
    const categoriesSelect = document.getElementById("categories-select");
    categoriesData.forEach((category) => {
      let option = document.createElement("option"); //balise option emplacement
      option.value = category.id;
      option.text = category.name; //va de catégorie en catégorie pour la sélection
      categoriesSelect.appendChild(option); //on lie option à la sélection des catégorie
    });
    //fin affichage sélection deuxième modale
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
// Sélection des éléments nécessaires au fonctionnement de la modale

//éléments nécessaires au fonctionnement de la modale
const modal = document.querySelector("#modale");
const modalContents = document.querySelectorAll(".modale-content");
const modalCloseButtons = document.querySelectorAll(".js-modal-close");
const modalOpenButtons = document.querySelectorAll(".js-modal");
const ajoutPhotoButton = document.getElementById("ajoutPhotoButton");
const modale1 = document.getElementById("modale1");
const modale2 = document.getElementById("modale2");

// Fonction pour ouvrir la modale
const openModal = () => {
  modal.style.display = "block";
  afficherImagesProjetsDansModale("#modale1");
};

// Fonction pour fermer la modale
const closeModal = () => {
  modal.style.display = "none";
};

// Ajout des écouteurs d'événements pour les boutons d'ouverture de la modale
modalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal();
    modale1.style.display = "block"; // affichage de la première modale lors de son ouverture
    modale2.style.display = "none"; // masquage de la deuxème modale lorsque que l'on ouvre la première modale
  });
});

// Ajout des écouteurs d'événements pour les boutons de fermeture de la modale
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

// Ajout d'un écouteur d'événement pour la fermeture de la modale lorsque l'utilisateur clique en dehors de la modale
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Sélection du lien pour ajouter une photo
const ajoutPhotoLink = document.querySelector(".ajoutPhotoButton");

// Fonction pour afficher la deuxième modale au clic sur le lien "Ajouter une photo"
const showModale2 = () => {
  modale1.style.display = "none"; // masque la première modale lorsque j'ouvre la deuxième modale
  modale2.style.display = "block"; // affiche la deuxième modale lorsque j'ouvre la deuxième modale
};

// Ajout d'un écouteur d'événement pour afficher la deuxième modale au clic sur le lien "Ajouter une photo"
ajoutPhotoLink.addEventListener("click", showModale2);
// Fonction pour afficher la première modale au clic sur la flèche de retour dans la deuxième modale
const showModale1 = () => {
  modale2.style.display = "none"; // masque la deuxième modale lorsque l'on revient à la première modale
  modale1.style.display = "block"; // affiche la première modale lorsque l'on revient à la première modale
};

// Sélection de la flèche de retour dans la deuxième modale
const retourButton = document.querySelector(".modale-direction");
//revoir la classe a sélectionner

// ajout d'un écouteur d'événement pour afficher la première modale au clic sur la flèche de retour dans la deuxième modale
retourButton.addEventListener("click", showModale1);
//fonction pour afficher les travaux dans la modale
function afficherImagesProjetsDansModale() {
  const modalContent = document.querySelector(".modaleImg");
  modalContent.innerHTML = "";
  // bouclage pour parcourir les projets
  works.forEach((projet) => {
    // Créer les éléments nécessaires pour afficher le projet et l'icône de suppression
    const projetDiv = document.createElement("div");
    const projetImg = document.createElement("img");
    const poubelleIcon = document.createElement("i");
    // Définir l'URL de l'image du projet
    projetImg.src = projet.imageUrl;
    projetImg.style.width = "80px";
    projetImg.style.height = "100px";
    // Définir les classes pour l'icône de la poubelle
    poubelleIcon.classList.add("fa-solid", "fa-trash-can");
    projetDiv.appendChild(poubelleIcon);
    poubelleIcon.addEventListener("click", function () {
      supprimerProjet(projet.id); // Appeler une fonction pour supprimer le projet
    });
    // Ajouter les éléments au contenu de la modale
    projetDiv.appendChild(projetImg);
    projetDiv.appendChild(poubelleIcon);
    modalContent.appendChild(projetDiv);
    // Ajouter une nouvelle div avec un identifiant unique pour chaque projet
    projetDiv.id = `projet-${projet.id}`; // Utiliser l'identifiant du projet comme partie de l'identifiant de la div
    // Définir le fond de la div avec l'URL de l'image
    projetDiv.style.backgroundImage = `url(${projet.imageUrl})`;
  });
}
function supprimerProjet(projetDiv) {
  // Demande de confirmation avant la suppression
  if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
    // récupérer le token de l'utilisateur(accès d'autorisation)
    const accessToken = localStorage.getItem("accessToken");
    // Envoie le fichier image à l'API via une requête POST
    fetch(`http://localhost:5678/api/works/${projetDiv}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          afficherMessageSucces("Projet supprimé avec succès");
          afficherImagesProjetsDansModale(); //actualise la modale pour afficher les projets mis à jour
        } else {
          afficherMessageErreur("Erreur lors de la suppression du projet");
        }
      })
      .catch((error) => {
        afficherMessageErreur("Erreur lors de la suppression du projet");
      });
  }
}
