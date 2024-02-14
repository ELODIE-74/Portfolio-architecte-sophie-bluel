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
    localStorage.clear(); //écoute au moment de la connexion + changement de statut de login à logout
  });
  const header = document.querySelector("#header_hidden");
  const connexionHeader = document.createElement("div");
  connexionHeader.classList.add("barre_hidden"); //ajout du css du bandeau, récupére la classe css
  connexionHeader.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>';
  header.prepend(connexionHeader);
  //code précedant pour le masquage du bandeau en mode édition
  const buttonHidden = document.querySelector(".button_hidden");
  const buttonedition = document.createElement("div");
  buttonedition.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i><p class="edit_modifier"><a href="#modale1" class="js-modal">Modifier</a></p>';
  buttonHidden.appendChild(buttonedition);
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
      option.text = category.name;
      categoriesSelect.appendChild(option);
    });
    //fin affichage sélection deuxième modale
    categories = new Set(categoriesData); //données de la catégorie
    const filtres = document.getElementById("Filtres"); //variable globale qui récupérer les filtres
    for (categorie of categories) {
      //boucle pour parcourir les différentes catégories
      let divObjets = document.createElement("div"); //création de la div objet
      divObjets.innerText = categorie.name;
      divObjets.id = categorie.name;
      filtres.appendChild(divObjets);
    }
    ecouteClick(); //écoute l'évènement au clic sur un bouton et affiche la div concerné
  })
  //Traitement de l'erreur si il n'y a pas de réponse de l'url
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des catégories :",
      error
    );
  });

function filterByCategorie(categorie) {
  if (categorie === "Tous") {
    // Retourne tous les travaux sans filtrage
    return works;
  } else {
    // Filtre les travaux en fonction de la catégorie
    return works.filter((work) => work.category.name === categorie);
  }
}

//reprise des éléments du work dans la fonction displayWorks et affichage des oeuvres
const displayWorks = (works) => {
  const gallery = document.querySelector(".gallery");
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
  const categories = document.querySelectorAll("#Filtres div");
  for (let i = 0; i < categories.length; i++) {
    //parcour le tableau et grandit / initialise la variable à 0 point de départ
    const categorie = categories[i];
    categorie.addEventListener("click", function () {
      let textecategorie = categorie.innerText;
      // Filtre les oeuvres en fonction de la catégorie cliquée
      const oeuvresFiltrees = filterByCategorie(textecategorie);
      // Efface les éléments affichés actuellement dans la galerie
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      // Affiche les nouvelles oeuvres filtrées dans la galerie
      displayWorks(oeuvresFiltrees); //appel de la fonction pour afficher les oeuvres
      console.log(categorie);
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
  modal.style.display = "block";
  document.body.classList.add("dim-background"); //assombrir le site en mode édition à l'ouverture de la modale
  afficherImagesProjetsDansModale("#modale1");
};

// Fonction pour fermer la modale
const closeModal = () => {
  modal.style.display = "none";
  document.body.classList.remove("dim-background"); //enelever l'assombrissement quand on sort de la modale
};

// Ajout des écouteurs d'événements pour les boutons d'ouverture de la modale
modalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal();
    modale1.style.display = "block";
    modale2.style.display = "none";
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

// Fonction pour afficher la deuxième modale au clic sur le lien "Ajouter une photo"
const showModale2 = (event) => {
  event.preventDefault();
  modale1.style.display = "none";
  modale2.style.display = "block";
};

// Ajout d'un écouteur d'événement pour afficher la deuxième modale au clic sur le lien "Ajouter une photo"
const ajoutPhotoLink = document.getElementById("ajoutPhotoLink");
ajoutPhotoLink.addEventListener("click", showModale2);
// Fonction pour afficher la première modale au clic sur la flèche de retour dans la deuxième modale
const showModale1 = () => {
  modale2.style.display = "none";
  modale1.style.display = "block";
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
    projetDiv.appendChild(projetImg);
    projetDiv.appendChild(poubelleIcon);
    modalContent.appendChild(projetDiv);
    // Ajout d'une nouvelle div avec un identifiant unique pour chaque projet
    projetDiv.id = `projet-${projet.id}`;
    // Définit le fond de la div avec l'URL de l'image
    projetDiv.style.backgroundImage = `url(${projet.imageUrl})`;
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
          afficherMessage(document.querySelector("#modale1 .success-message"));
          afficherImagesProjetsDansModale();
          //raîchir la page actuelle après la suppression du projet
          location.reload();
        } else {
          afficherMessage(document.querySelector("#modale1 .error-message"));
        }
      })
      .catch((error) => {
        afficherMessageErreur("Erreur lors de la suppression du projet");
      });
  }
}
//éléments qui permettent d'ouvrir l'explorateur windows et de choisir et de mettre la nouvelle image dans la div prévut à cet effet
document
  .getElementById("ajoutPhotoButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    document.getElementById("typetelechargerImage").click();
  });
//pour l'ajout d'ume image, code qui sélectionne l'image et la place dans la div prévu à cet effet
document
  .getElementById("typetelechargerImage")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const imageSrc = reader.result;
        const elementsAMasquer = document.querySelector(".elements-a-masquer");
        elementsAMasquer.style.zIndex = "-1";

        const imageElement = document.createElement("img");
        imageElement.src = imageSrc;
        imageElement.style.width = "180px";
        imageElement.style.height = "210px";
        imageElement.style.marginTop = "84px";
        imageElement.style.zIndex = "6";

        document.querySelector(".div-img").appendChild(imageElement);
      });

      reader.readAsDataURL(file); // Lit le contenu du fichier image en tant qu'URL de données
    }
  });
const envoyerButton = document.getElementById("boutonValidation");
envoyerButton.addEventListener("click", envoyerFormulaire);
//fonction pour envoyer les données du formulaire à l'API
function envoyerFormulaire() {
  const form = document.getElementById("monFormulaire");
  if (form instanceof HTMLFormElement) {
    const formData = new FormData(form);
    const token = localStorage.getItem("accessToken");

    // Vérifier si tous les champs sont remplis
    const titre = formData.get("title");
    const categorie = formData.get("category");
    const image = formData.get("image");

    if (titre && categorie && image) {
      // si tous les champs sont remplis, colorer le bouton en vert
      const boutonValider = document.getElementById("boutonValidation");
      boutonValider.classList.add("valider");

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
            alert("Projet ajouté avec succès !");
          } else {
            alert("Une erreur est survenue lors de l'ajout du projet.");
          }
        })
        .catch((error) => {
          console.error("Erreur :", error);
          alert("Une erreur est survenue lors de l'ajout du projet.");
        });
    } else {
      // si l'un des champs est vide, il faut enlever la coloration verte du bouton
      const boutonValider = document.getElementById("boutonValidation");
      boutonValider.classList.remove("btn_valider");
    }
  }
  verifierChampsRemplis(); //appel de la fonction pour vérifier les champs
}
//vérification des champs du formulaire remplies pour la coloration du bouton valider
const formulaire = document.querySelector("#monFormulaire");
const boutonValider = formulaire.querySelector("#boutonValidation");
const champs = formulaire.querySelectorAll("input", "select");
champs.forEach((champ) => {
  champ.addEventListener("input", verifierChampsRemplis);
  champ.addEventListener("select", verifierChampsRemplis);
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
    boutonValider.style.backgroundColor = "#1d6154";
  } else {
    boutonValider.style.backgroundColor = "";
  }
}
//fonction pour afficher les messages d'erreur lors de la suppression d'un projet
function afficherMessage(element) {
  element.classList.remove("hidden");
}
