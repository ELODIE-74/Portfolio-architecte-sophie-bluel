let works;
let categories;

fetch("http://localhost:5678/api/works")
  .then((data) => data.json()) //data = données
  .then((json) => {
    works = json;
    displayWorks(works); // Appel de la fonction displayWorks avec les données récupérées
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

    let objets = filterByCategorie("Objets");
    console.log(objets);
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
let isGalleryDisplayed = false;
function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  if (isGalleryDisplayed) {
    gallery.innerHTML = ""; // Supprimer le contenu actuel de la galerie
  }
  for (const work of works) {
    // Vérifier si le travail est déjà dans la galerie
    const existingWork = gallery.querySelector(`[data-id="${work.id}"]`);
    if (existingWork) {
      continue; // Passer à la prochaine itération de la boucle
    }
    let figure = document.createElement("figure");
    figure.dataset.id = work.id; // Ajouter l'ID du travail en tant qu'attribut data
    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    let figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
  isGalleryDisplayed = true; // Marquer la galerie comme déjà affichée
}
//partie page de connexion
/*const container = document.getElementById(".Zone");
const loginButton = document.getElementById("#login");
const signupButton = document.getElementById("#submit");
let error = null;
signupButton.add("click", () => {
  container.classList.remove("active");
});
loginButton.addEventListener("click", () => {
  container.classList.remove("active");
});
let myForm = document.getElementById("myForm");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let myInput = document.getElementById("login");
  if (myInput.value == "") {
    e.preventDefault();
  }
  if (!passwordValidator.test(password)) {
    error = "le mot de passe doit contenir 8 caractère minimum";
  } else if (!email) {
    error = "Adresse email obligatoire";
  }
  if (error) {
    return resizeBy.status(400).json({ message: error });
  }
  //const exist = await UserActivation.FindOne({ email:email });
  if (exist) {
    return res.status(400).json({ message: "email déjà existant" });
  }
});
*/
