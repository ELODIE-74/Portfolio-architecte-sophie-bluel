//page de connexion
// login.js
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire
  //console.log("envoie réussi");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }
    const data = await response.json();
    const token = data.token;
    // Stocke le token dans le local storage pour une utilisation ultérieure
    localStorage.setItem("accessToken", token);
    console.log("Connexion réussie");
    window.location.href = "index.html"; // Redirige l'utilisateur vers la page principale
  } catch (error) {
    console.error(error);
    document.getElementById("errormessage").classList.remove("hidden");
  }
});
let users;
function identification() {
  const emailenvoie = document.getElementsByName("mail");
  const motdepasseenvoie = (motdepasseenvoie =
    document.getElementsByName("password"));
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
