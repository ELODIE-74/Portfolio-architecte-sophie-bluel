let works;
let categories;

fetch("http://localhost:5678/api/works")
  .then((data) => data.json()) //data = données
  .then((json) => {
    works = json;
    //displayWorks(works); // Appel de la fonction displayWorks avec les données récupérées
    console.table(works); //affiche les oeuvres dans un tableau
    const gallery = document.querySelector(".gallery"); //récupére les élemnts de la galerie
    const categories = new Set();
    for (work of works) {
      // création des élément d'1 oeuvre (image+title+figcaption)
      let figure = document.createElement("figure"); //création d'un élément
      let img = document.createElement("img"); //création de l'image
      img.src = work.imageUrl; //rajout et récupération du chemin de l'image(url)
      img.alt = work.title; //rajout du titre comme attribut
      let figcaption = document.createElement("figcaption"); //création de la légende de l'image
      figcaption.innerText = work.title; //rajout du titre de la légende
      figure.appendChild(img); //lier l'image à l'élément(figure)
      figure.appendChild(figcaption); //lier la légende à l'élément
      gallery.appendChild(figure); //lier l'oeuvre(1 figure) à la galerie de projets dans son ensemble
    }
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
    categories = new Set(categoriesData); // Créez un ensemble de catégories
    const filtres = document.getElementById("Filtres");
    for (categorie of categories) {
      //boucle pour parcourir les différenytes catégories

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
  //work = 1 travail, chaque work correspond à une catégorie de travail (objet/appartements/hôtels et restaurants)
}

let displayedWorks = []; // Tableau pour stocker les travaux déjà affichés, éviter les doublons d'affichage
function displayWorks(works) {
  //fonction qui affichent les travaux passé en paramètres
  const gallery = document.querySelector(".gallery"); //récupération des éléments de la galerie
  for (const work of works) {
    //boucle pour passer d'un projet aux autres projets
    // Variable pour vérifier si le projet est déjà présent.
    const isDisplayed = displayedWorks.some(
      // La méthode some() teste si au moins un élément du tableau passe le test
      (displayedWork) => displayedWork.id === work.id //regarde si les id(identifiants) sont correctes
    );
    if (isDisplayed) {
      continue; // sinon passe à la prochaine instruction de la boucle
    }
    //recréation des éléments de la galerie
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
    Objets.addEventListener("click", () => {
      const objetFiltre = categorieId.filter(categorieId);
      return categorieId.categorie.id === 1;
    });
    console.table(ObjetslesFiltre);
  }
}
