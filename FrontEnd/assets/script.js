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
      categories.add(work.categories); //ajout de la catégorie
    }
  });
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categoriesData) => {
    const categories = new Set(categoriesData); // Créez un ensemble de catégories
    function filterWorksByCategory(category) {
      //prend en compte une catégorie en tant que paramètre et filtre les travaux en fonction de cette catégorie.
      const filteredCategories = works.filter((work) =>
        work.categories.includes(category)
      );
      displayWorks(filteredCategories); //appelle la fonction avec les travaux filtrés
    }
    // Sélectionnez les boutons de catégorie en utilisant querySelectorAll
    const categoryButtons = document.querySelectorAll(".Filtres");
    // Ajoutez des écouteurs d'événements à chaque bouton de catégorie
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () =>
        filterCategoriesByCategory(button.innerText)
      );
    });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des catégories :",
      error
    );
  });
// Écoutez les événements de clic sur chaque catégorie
/*categories.forEach((category) => {
      const categoryButton = document.createElement("button");
      categoryButton.innerText = category;
      categoryButton.addEventListener("click", () =>
        //écoute des évènements
        filterWorksByCategory(category)
      );
      filterContainer.appendChild(categoryButton); // Ajoutez les boutons de catégorie à votre conteneur de filtrage
    });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des catégories :",
      error
    );
  });*/
/*fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categoriesData) => {
    // Utilisez les données ici
    //const [projects, setProjects] = useState([categories]); //stocke des données des travaux
    //const filteredProjects = projects.filter(
    //fonction pour filtrer les projets
    //(project) => project.categories === categorie
    //);
    const filteredCategories = categoriesData.filter((categorie) => {
      work.categories.includes(category);
    });
    setProjects(filteredProjects); //mise à jour des projets filtrés
    displayFilteredWorks(filteredCategories); // affiche les projets filtrés dans la galerie
  });
const filterButtons = document.querySelectorAll("#Filtres > div");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.id; // récupère la catégorie du filtre sur laquelle l'utilisateur a cliqué
    const filteredCategories = categories.filter((categorie) =>
      work.categories.includes(category)
    );
    displayFilteredWorks(filteredCategories); // affiche les projets filtrés dans la galerie
  });
});
function displayFilteredCategories(filteredCategories) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // vide la galerie actuelle
  filteredCategories.forEach((work) => {
    // création des éléments d'une oeuvre (image + title + figcaption)
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = categorie.imageUrl;
    img.alt = categorie.title;
    let figcaption = document.createElement("figcaption");
    figcaption.innerText = categorie.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  })
};*/
// Affichage initial des projets sans filtrage
//http://localhost:5678/api/categories
/*afficherCategories();

// Écoute des clics sur les filtres
filters.addEventListener("click", (event) => {
  const clickedFilter = event.target;
  const categories = clickedFilter.id;

  //le filtre doit avoir l'id "Tous"
  if (categories === "Tous") {
    afficherCategories();
  } else {
    // Filtrage des projets en fonction de la catégorie sélectionnée
    const categoriesFiltres = works.filter(
      (work) => work.categories === categories
    );
    afficherCategories(categoriesFiltres);
  }
});

function afficherProjets(categories = works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Réinitialise la galerie

  for (work of categories) {
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
}*/
// Ajout de la catégorie du travail à l'ensemble categories*/
//categories.add(work.category);
//}
//console.table(Array.from(categories)); // affiche le tableau
