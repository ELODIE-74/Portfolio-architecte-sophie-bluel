//page de connexion
// login.js
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire
  const email = document.getElementById("email").value; //récupère la valeur de l'email
  const password = document.getElementById("password").value; //récupère la valeur du mot de passe
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la connexion"); //message d'erreur si problème lors de la connexion
    }
    const data = await response.json();
    const token = data.token;
    // Stocke le token dans le local storage pour une utilisation ultérieure
    localStorage.setItem("accessToken", token);
    console.log("Connexion réussie");
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    document.getElementById("errormessage").classList.remove("hidden"); //affiche un message d'erreur si problème lors de l'authentification
  }
});
let users; //variable utilisateurs
//fonction qui permet de vérifier que tous les champs sont remplis correctements et au bon format
function identification() {
  const emailenvoie = document.getElementsByName("mail");
  const motdepasseenvoie = (motdepasseenvoie =
    document.getElementsByName("password"));
  //va de la connexion(login) à aux utilisateurs (users), parcours le tableau
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
}
