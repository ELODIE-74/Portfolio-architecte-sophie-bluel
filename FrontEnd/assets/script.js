fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.table(works);
    const gallery = document.querySelector(".gallery");
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
      //categories.add(work.category);
    }
  });

/*const categories = new Set();
categories.add("Objets");
categories.add("Appartements");
categories.add("hotels & restaurants");
if (
  categories.has("Objets") &&
  categories.has("Appartements") &&
  categories.has("hotels &amp; restaurants")
) {
  categories.forEach((categorie) => {
    console.log(categorie);
  });
}
function genererCategories(projets) {
  const gallery = document.querySelector(".gallery");
  projets.forEach(function (projet) {
    const projetElement = document.createElement("div");
    projetElement.textContent = projet;
    gallery.appendChild(projetElement);
  });
}
const boutonsFiltrer = document.querySelectorAll(".btn-filtrer");
boutonsFiltrer.forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    const categorie = this.id;
    const projetsFiltres = Array.from(categories).filter(function (
      categorieProjet
    ) {
      return (
        categorieProjet.trim().toLowerCase() === categorie.trim().toLowerCase()
      );
    });
    document.querySelector(".gallery").innerHTML = "";
    genererCategories(projetsFiltres);
  });
});*/
/*//création d'un nouvel objet avec set
const categories = new Set();
//const categoriesArray = Array.from(categories);
categories.add(categories);
if (categories.has("Objets", "Appartements", "hotels & restaurants")) {
  categories.forEach((categorie) => {
    //affichage des élément correspondant
    console.table(categories);
  });
}*/
/*const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
  const categoriesFiltrees = categories.filter(function (categorie) {
    return categorie.ordre <= 12;
  });
});*/
