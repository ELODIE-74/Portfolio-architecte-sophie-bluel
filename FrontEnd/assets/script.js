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
function filterByCategorie(categorie) {
  return works.filter((work) => work.category.name === categorie); //retourne tous les éléments avec le même identifiant (ici les différentes catégories)
}
//reprise des éléments du work dans la fonction displayWorks et affichage des oeuvres
const displayWorks = (works) => {
  const gallery = document.querySelector(".gallery"); //variable qui récupére tous les élèment de la galerie
  //Boucle pour parcourir d'un projet en particulier à tous les projets
  for (const work of works) {
    //création des éléments d'un projet
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
      //textcategorie; reprendre là le codage
      console.log(categorie); //affiche une catégorie
    });
  }
}
