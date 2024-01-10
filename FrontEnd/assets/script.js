//initialisation des variables
let works;
let categories;
let positionIndex = 0; //variable position (pour le changement des boutons)

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

//page de connexion
// login.js
/*document.getElementById("submit").addEventListener("submit", async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }
    const data = await response.json();
    const token = data.token;
    // Stocke le token dans le local storage pour une utilisation ultérieure
    localStorage.setItem("accessToken", token);
    console.log("Connexion réussie");
    window.location.href = "index.html"; // Redirige l'utilisateur vers la page principale
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la connexion. Veuillez réessayer plus tard.");
  }
});
let users;
function identification() {
  const emailenvoie = document.getElementsByName("mail");
  const motdepasseenvoie = (motdepasseenvoie =
    document.getElementsByName("password"));
  for (login of users) {
    const email = document.getElementsByName("mail")[0].value;
    const motdepasse = login.email;
    console.log(email, password);
    //vérification que ces deux valeurs sont correctes
    if (email !== "sophie.bluel@test.tld" || motdepasse !== "SOphie") {
      //affiche un message d'avertissement si l'une ou les deux valeurs ne sont pas correctes
      alert(
        "Votre email ou mot de passe sont incorrectes, veuillez rentrer les bons identifiants au bon format"
      );
      return;
    }
  }
}*/
