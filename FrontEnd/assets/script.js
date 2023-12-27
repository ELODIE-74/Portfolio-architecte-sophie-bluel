let works;
let categories;

fetch("http://localhost:5678/api/works")
  .then((data) => data.json()) //data = données
  .then((json) => {
    works = json;
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
    }
    let objets = filterByCategorie("Objets");
    console.log(objets);
  });

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categoriesData) => {
    categories = new Set(categoriesData); // Créez un ensemble de catégories
    const filtres = document.getElementById("Filtres");
    for (categorie of categories) {
      let divObjets = document.createElement("div");
      divObjets.innerText = categorie.name;
      divObjets.id = categorie.name;
      filtres.appendChild(divObjets);
    }
  })

  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des catégories :",
      error
    );
  });

function filterByCategorie(categorie) {
  return works.filter((work) => work.category.name === categorie);
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
