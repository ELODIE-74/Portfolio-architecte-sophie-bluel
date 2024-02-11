//initialisation des variables
let works;
let categories;
let positionIndex = 0; //variable position (pour le changement des boutons)

let url;
const logpage = document.getElementById("logpageaccueil"); //récupération de la page de connexion
const accessToken = localStorage.getItem("accessToken"); //récupération du jeton d'authentification
if (accessToken) {
  logpage.innerText = "logout";
  logpage.addEventListener("click", function (event) {
    //event.preventDefault();
    localStorage.clear(); //écoute au moment de la connexion + changement de statut de login à logout
  });
  const header = document.querySelector("#header_hidden"); //variable qui récupére l'élément html
  const connexionHeader = document.createElement("div"); //variable qui crée la div
  connexionHeader.classList.add("barre_hidden"); //ajout du css du bandeau, récupére la classe css
  connexionHeader.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>';
  header.prepend(connexionHeader); //ajout des éléments crée pour le mode édition
  //code précedant pour le masquage du bandeau en mode édition
  const buttonHidden = document.querySelector(".button_hidden"); //variable qui récupére l'élement html
  const buttonedition = document.createElement("div"); //création de la div
  buttonedition.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i><p class="edit_modifier"><a href="#modale1" class="js-modal">Modifier</a></p>'; //ajout des éléments
  buttonHidden.appendChild(buttonedition); //ajout des éléments crée pour le mode édition, lier
  //le code suivant masque les boutons de filtrage en mode édition
  const filterButtons = document.getElementById("Filtres"); // récupére la div qui contient les filtres
  filterButtons.style.display = "none"; //fait disparaitres les boutons de filtrage en mode édition
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
      categoriesSelect.appendChild(option); //on lie option à la sélection des catégories
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
    const figure = document.createElement("figure"); //création de l'élément
    const img = document.createElement("img"); //création de l'image
    const figcaption = document.createElement("figcaption"); //création de la légende
    img.src = work.imageUrl; //source
    img.alt = work.title; //titre
    figcaption.textContent = work.title; //un projet avec un titre
    figure.appendChild(img); //lier
    figure.appendChild(figcaption); //lier
    gallery.appendChild(figure); //lier
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
      displayWorks(oeuvresFiltrees); //appel de la fonction pour afficher les oeuvres
      console.log(categorie); //affiche une catégorie
    });
  }
}

////////////////////////////////////////////
//partie mode édition modale(x2)/////
//ouverture de la modale
// Sélection des éléments nécessaires au fonctionnement de la modale
const modal = document.querySelector("#modale"); //récupére l'aside qui contient la modale
const modalContents = document.querySelectorAll(".modale-content"); //le conteneur de la modale
const modalCloseButtons = document.querySelectorAll(".js-modal-close"); //fermeture de modale (btn)
const modalOpenButtons = document.querySelectorAll(".js-modal"); //ouverture de modale (btn)
const ajoutPhotoButton = document.getElementById("ajoutPhotoButton"); //btn qui ouvre la deuxième partie de la modale
const modale1 = document.getElementById("modale1"); //partie 1 de la modale (galerie)
const modale2 = document.getElementById("modale2"); //partie 2 de la modale (formulaire)

// Fonction pour ouvrir la modale
const openModal = () => {
  modal.style.display = "block"; //faire apparaitre la modale
  document.body.classList.add("dim-background"); //assombrir le site en mode édition à l'ouverture de la modale
  afficherImagesProjetsDansModale("#modale1"); //affiche de la galerie de projets au moment de l'ouverture de la première modale
};

// Fonction pour fermer la modale
const closeModal = () => {
  modal.style.display = "none"; //masquer la modale
  document.body.classList.remove("dim-background"); //enelever l'assombrissement quand on sort de la modale
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
//const ajoutPhotoLink = document.querySelector(".ajoutPhotoButton");

// Fonction pour afficher la deuxième modale au clic sur le lien "Ajouter une photo"
const showModale2 = (event) => {
  event.preventDefault();
  modale1.style.display = "none"; //masque la première partie à ce moment-là
  modale2.style.display = "block"; // fait apparaitre la deuxième partie à ce moment-là
};

// Ajout d'un écouteur d'événement pour afficher la deuxième modale au clic sur le lien "Ajouter une photo"
const ajoutPhotoLink = document.getElementById("ajoutPhotoLink");
ajoutPhotoLink.addEventListener("click", showModale2);
// Fonction pour afficher la première modale au clic sur la flèche de retour dans la deuxième modale
const showModale1 = () => {
  modale2.style.display = "none"; // masque la deuxième partie lorsque l'on revient à la première modale
  modale1.style.display = "block"; // affiche la première partie lorsque l'on revient à la première modale
};

// Sélection de la flèche de retour dans la deuxième partie et va sur la deuxième partie
const retourButton = document.querySelector(".modale-direction");
// ajout d'un écouteur d'événement pour afficher la première partie au clic sur la flèche de retour dans la deuxième partie
retourButton.addEventListener("click", showModale1);

//fonction pour afficher les travaux dans la modale
function afficherImagesProjetsDansModale() {
  const modalContent = document.querySelector(".modaleImg");
  modalContent.innerHTML = "";
  // bouclage pour parcourir les projets
  works.forEach((projet) => {
    // Crées les éléments nécessaires pour afficher le projet et l'icône de suppression
    const projetDiv = document.createElement("div");
    const projetImg = document.createElement("img");
    const poubelleIcon = document.createElement("i");
    // Définit l'URL de l'image du projet
    projetImg.src = projet.imageUrl;
    projetImg.style.width = "80px";
    projetImg.style.height = "100px";
    // Définit les classes pour l'icône de la poubelle
    poubelleIcon.classList.add("fa-solid", "fa-trash-can");
    projetDiv.appendChild(poubelleIcon);
    poubelleIcon.addEventListener("click", function () {
      supprimerProjet(projet.id); // Appel de la fonction qui permet de supprimer le projet
    });
    // Ajouts des éléments au contenu de la modale(première partie)
    projetDiv.appendChild(projetImg); //lie image à la div
    projetDiv.appendChild(poubelleIcon); //lie icone
    modalContent.appendChild(projetDiv); //lie le contenu
    // Ajout d'une nouvelle div avec un identifiant unique pour chaque projet
    projetDiv.id = `projet-${projet.id}`; // Utilise l'identifiant du projet comme partie de l'identifiant de la div
    // Définit le fond de la div avec l'URL de l'image
    projetDiv.style.backgroundImage = `url(${projet.imageUrl})`; //récupére chaque projet individuellement
    envoyerFormulaire(); //appel de la fonction pour la mise a jour des nouveaux projets rajoutés
  });
}
function supprimerProjet(projetDiv) {
  // Demande de confirmation avant la suppression
  if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
    // récupére le token de l'utilisateur(accès d'autorisation)
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
          afficherMessage(document.querySelector("#modale1 .success-message")); //affiche un message de succés dans la modale si réussi
          afficherImagesProjetsDansModale(); //actualise la modale pour afficher les projets mis à jour
        } else {
          afficherMessage(document.querySelector("#modale1 .error-message")); //affiche un message en cas d'échec de suppression personnaliser
        }
      })
      .catch((error) => {
        afficherMessageErreur("Erreur lors de la suppression du projet"); //affiche un message d'erreur standard
      });
  }
}
//éléments qui permettent d'ouvrir l'explorateur windows et de choisir et de mettre la nouvelle image dans la div prévut à cet effet
document
  .getElementById("ajoutPhotoButton") //récupére l'identifiant du btn
  .addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    document.getElementById("typetelechargerImage").click();
  });
//pour l'ajout d'ume image, code qui sélectionne l'image et la place dans la div prévu à cet effet
document
  .getElementById("typetelechargerImage")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Récupère le fichier image sélectionné par l'utilisateur

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const imageSrc = reader.result; // Récupère l'URL de l'image sous forme de texte
        const elementsAMasquer = document.querySelector(".elements-a-masquer");
        elementsAMasquer.style.zIndex = "-1"; // Masque les éléments d'origine présents dans la modale au moment de la sélection

        const imageElement = document.createElement("img"); // Crée un nouvel élément image
        imageElement.src = imageSrc; // Attribue l'URL de l'image à l'attribut src de l'élément image
        imageElement.style.width = "180px"; //taille image dans la div
        imageElement.style.height = "210px"; //hauteur de l'image dans la div
        imageElement.style.marginTop = "84px"; //marge
        imageElement.style.zIndex = "6"; //position par rapport aux autres éléments

        document.querySelector(".div-img").appendChild(imageElement); // Ajoute l'élément image à la div
      });

      reader.readAsDataURL(file); // Lit le contenu du fichier image en tant qu'URL de données
    }
  });
const envoyerButton = document.getElementById("boutonValidation"); //récupére l'identifiant du btn validation
envoyerButton.addEventListener("click", envoyerFormulaire); //écouteur d'évènement au moment de la validation des données
//fonction pour envoyer les données du formulaire à l'API
function envoyerFormulaire() {
  const form = document.getElementById("monFormulaire"); //récupére l'identifiant du formulaire
  if (form instanceof HTMLFormElement) {
    const formData = new FormData(form); //formulaire avec la méthode formData
    const token = localStorage.getItem("accessToken"); //récupère le jeton d'authentification

    // Vérifier si tous les champs sont remplis
    const titre = formData.get("title"); //titre
    const categorie = formData.get("category"); //catégorie
    const image = formData.get("image"); //image

    if (titre && categorie && image) {
      // si tous les champs sont remplis, colorer le bouton en vert
      const boutonValider = document.getElementById("boutonValidation");
      boutonValider.classList.add("valider"); //rajout de la classe valider

      // Effectuer l'envoi du formulaire
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert("Projet ajouté avec succès !"); //message de succés
          } else {
            alert("Une erreur est survenue lors de l'ajout du projet."); //message d'erreur
          }
        })
        .catch((error) => {
          console.error("Erreur :", error);
          alert("Une erreur est survenue lors de l'ajout du projet.");
        });
    } else {
      // si l'un des champs est vide, il faut enlever la coloration verte du bouton
      const boutonValider = document.getElementById("boutonValidation");
      boutonValider.classList.remove("btn_valider"); //enlève la classe sur le btn
    }
  }
  verifierChampsRemplis(); //appel de la fonction pour vérifier les champs
}
//vérification des champs du formulaire remplies pour la coloration du bouton valider
const formulaire = document.querySelector("#monFormulaire");
const boutonValider = formulaire.querySelector("#boutonValidation");
const champs = formulaire.querySelectorAll("input"); //récupére les input des champs
champs.forEach((champ) => {
  champ.addEventListener("input", verifierChampsRemplis); //écoute tous les input
  champ.addEventListener("select", verifierChampsRemplis); //écoute le select ou change
});
//fonction qui vérifie que tous les champs sont remplis et colore le btn en vert si complet
function verifierChampsRemplis() {
  let champsRemplis = true;
  champs.forEach((champ) => {
    if (champ.value === "") {
      champsRemplis = false;
    }
  });
  if (champsRemplis) {
    boutonValider.style.backgroundColor = "#1d6154"; //coloration du btn si tous les champs sont remplis
  } else {
    boutonValider.style.backgroundColor = ""; // Remettre la couleur par défaut si au moins un champ est vide
  }
}
//fonction pour afficher les messages d'erreur lors de la suppression d'un projet
function afficherMessage(element) {
  element.classList.remove("hidden");
}
