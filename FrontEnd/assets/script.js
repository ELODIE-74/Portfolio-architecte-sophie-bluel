fetch("http://localhost:5678/api/works")
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
  const categories = clickedFilter.id;

  //le filtre doit avoir l'id "Tous"
  if (categories === "Tous") {
    afficherProjets();
  } else {
    // Filtrage des projets en fonction de la catégorie sélectionnée
    const projetsFiltres = works.filter((work) => work.category === categories);
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
  }
}
// Ajout de la catégorie du travail à l'ensemble categories*/
//categories.add(work.category);
//}
//console.table(Array.from(categories)); // affiche le tableau
