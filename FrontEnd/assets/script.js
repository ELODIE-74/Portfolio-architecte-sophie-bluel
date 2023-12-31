let works;
let categories;
let positionIndex = 0; //variable position (pour le changement des boutons)

fetch("http://localhost:5678/api/works")
  .then((data) => data.json()) //data = données
  .then((json) => {
    works = json;
    //displayWorks(works); // Appel de la fonction displayWorks avec les données récupérées
    console.table(works);
    const gallery = document.querySelector(".gallery"); //récupére les élemnts de la galerie
    const categories = new Set();
    for (work of works) {
      // création des élément d'1 oeuvre (image+title+figcaption)
      let figure = document.createElement("figure"); //création d'un élément
      let img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      let figcaption = document.createElement("figcaption");
      figcaption.innerText = work.title;
      //lier les éléments parents/enfants
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
    //affichage des tableaux par catégorie
    let tous = filterByCategorie("Tous");
    console.table(tous);
    let objets = filterByCategorie("Objets");
    console.table(objets);
    let appartements = filterByCategorie("Appartements");
    console.table(appartements);
    let hotels = filterByCategorie("Hotels & restaurants");
    console.table(hotels);
  });

fetch("http://localhost:5678/api/categories")
  //on récupére une réponse qu'on formate en formar JSON
  .then((response) => response.json())
  //on récupère ensuite les données
  .then((categoriesData) => {
    categories = new Set(categoriesData); //données de la catégorie
    const filtres = document.getElementById("Filtres");
    for (categorie of categories) {
      //boucle pour parcourir les différentes catégories

      //création du bouton de la catégorie objet
      let divObjets = document.createElement("div"); //création de la div objet
      divObjets.innerText = categorie.name; //rajout du nom de la catégorie
      divObjets.id = categorie.name; //rajout de l'identifiant de la catégorie
      filtres.appendChild(divObjets); //lier la div(objet) au parent filtres
    }
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
  return works.filter((work) => work.category.name === categorie); //retourne tous les éléments avec le même identifiant (ici objet)
}
//reprise des éléments du work dans la fonction displayWorks
const displayWorks = (works) => {
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
Tous.addEventListener("click", function () {
  positionIndex = positionIndex - 1; //retour en arrière, gauche
  changeButtons(positionIndex, "gauche");
  displayWorks(categories);
});
Objets.addEventListener("click", function () {
  positionIndex = positionIndex + 1; //bond vers l'avant, droite
  changeButtons(positionIndex, "droite");
  displayWorks(categories);
});

//changement de boutons,déplacement
function changeButtons(index, sensButton) {
  if (positionIndex === -1 && sensButton === "gauche") {
    positionIndex = works.length - 1; //pour revenir en arrière, bouton d'avant
  } else if (positionIndex === works.length && sensButton == "droite") {
    //pour aller au bouton suivant
    positionIndex = 0;
    filter.classList.add("Filtres");
  }
}
const buttonWork = document.querySelector("div");
//mise à jour des boutons
const imageUrl = "assets/images/${works[positionIndex].image}";
buttonWork.src = imageUrl;
buttonWork.alt = "Work ${positionIndex + 1}";

//mise à jour de la figcaption
const tagline = works[positionIndex].tagline;
document.querySelector(figcaption).innerText = tagline;

console.log("Clic sur la catégorie ${sensButton}");

//affichage du premier bouton
changeButtons(positionIndex, "BoutonTous");

//Autre essai reprise idéee projet5 changement boutons pour l'affichage des travaux, addeventlistener et displayworks
//affichage des travaux
/*let displayedWorks = []; // Tableau pour stocker les travaux déjà affichés, évite les doublons lors de l'affichage
function displayWorks(works) {
  //fonction qui affichent les travaux passé en paramètres
  const gallery = document.querySelector(".gallery");
  for (const work of works) {
    // Variable pour vérifier si le projet est déjà présent.
    const isDisplayed = displayedWorks.some(
      // La méthode some() teste si au moins un élément du tableau passe le test
      (displayedWork) => displayedWork.id === work.id
    );
    if (isDisplayed) {
      continue; // sinon passe à la prochaine instruction de la boucle
    }
    //éléments de la galerie pour l'affichage
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    let figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
    displayedWorks.push(work); // Ajoute le projet au tableau des projets déjà affichés
  }
}
//écoutes des boutons(div tous) et objet
/*const Tous = document.createElement("div");
const Objets = document.createElement("div");
Tous.addEventListener("click", function () {
  const travauxFiltres = filterByCategorie("tous");
  displayWorks(travauxFiltres);
});
Objets.addEventListener("click", function () {
  const travauxFiltres = filterByCategorie("objets");
  displayWorks(travauxFiltres);
});*/
