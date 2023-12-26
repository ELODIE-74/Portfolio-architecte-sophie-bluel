fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.table(works);
    const gallery = document.querySelector(".gallery.active");
    for (work of works) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      let figcaption = document.createElement("figcaption");
      figcaption.innerText = work.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
      // Ajout de la catégorie du travail à l'ensemble categories
      //gallery.appendChild("#Filtres");
      console.log(work.categories);
      figure.classList.add(work.categories);
    }
  });
//gestion des bouttons
// Récupération des pièces depuis le fichier JSON
const tousAll = await fetch("http://localhost:5678/api/categories").then(
  (categories) => categories.json()
);

const divTous = document.querySelectorAll("#Tous");
divTous.addEventListener("click", function () {
  const tousOrdonnees = Array.from(tous);
  tousOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
  console.log(tousOrdonnees);
});

let divObjets = document.querySelector("#Objets");
divObjets.addEventListener("click", function () {
  const objetsFiltrees = objets.filter(function (objet) {
    return objet.ordre <= 12;
  });
  console.log(objetsFiltrees);
});

let divAppartements = document.querySelector("#Appartements");
divAppartements.addEventListener("click", function () {
  const appartementsOrdonnees = Array.from(appartements);
  appartementsOrdonnees.sort(function (a, b) {
    return b.prix - a.ordre;
  });
  console.log(appartementsOrdonnees);
});

let divHotels = document.querySelector("#Hotels & Restaurants");
divHotels.addEventListener("click", function () {
  const hotelsFiltrees = hotels.filter(function (hotel) {
    return hotel.description;
  });
  console.log(hotelsFiltrees);
});
/*window.onload = () => {
  let filtres = document.querySelectorAll("#Filtres div");
  let galleryImgs = document.querySelectorAll(".gallery img"); // Modification ici
  for (let filtre of filtres) {
    filtre.addEventListener("click", function () {
      let tag = this.id;
      for (let galleryImg of galleryImgs) {
        // Modification ici
        galleryImg.classList.replace("active", "inactive");
        if (tag === "all" || tag === galleryImg.dataset.categorie) {
          // Modification ici
          galleryImg.classList.replace("inactive", "active");
        }
      }
    });
  }
};*/

/*fetch("http://localhost:5678/api/works")
  .then((data) => data.json()) //data = données
  .then((works) => {
    //les oeuvres
    console.table(works); //affiche les oeuvres dans un tableau
    const gallery = document.querySelector(".gallery"); //récupére les élemnts de la galerie
    const categories = new Set();
    for (work of works) {
      // création des élément d'1 oeuvre (image+title+figcaption)
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      let figcaption = document.createElement("figcaption");
      figcaption.innerText = work.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
      categories.add(work.category); //ajout de la catégorie
    }

    console.table(Array.from(categories));
  });
// Affichage initial des projets sans filtrage
afficherProjets();

// Écoute des clics sur les filtres
filters.addEventListener("click", (event) => {
  const clickedFilter = event.target;
  const category = clickedFilter.id;

  //le filtre doit avoir l'id "Tous"
  if (category === "Tous") {
    afficherProjets();
  } else {
    // Filtrage des projets en fonction de la catégorie sélectionnée
    const projetsFiltres = works.filter((work) => work.category === category);
    afficherProjets(projetsFiltres);
  }
});

function afficherProjets(projets = works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Réinitialise la galerie

  for (work of projets) {
    //boucle ajouts projets à la gallery
    console.table(works);
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    let figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
    // Ajout de la catégorie du travail à l'ensemble categories*/
//categories.add(work.category);
//}
//console.table(Array.from(categories)); // affiche le tableau
//}
