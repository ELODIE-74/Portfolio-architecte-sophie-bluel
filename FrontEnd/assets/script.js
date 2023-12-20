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
    }
  });
