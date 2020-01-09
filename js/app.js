const requestResourceButton = document.getElementById("requestResourceButton");
requestResourceButton.addEventListener("click", mainRequest);

let content = document.getElementById("contentContainer");
let mainTitle = document.createElement("h2");
let firstDesc = document.createElement("p");
let secondDesc = document.createElement("p");
let lastDesc = document.createElement("ul");
content.appendChild(mainTitle);
content.appendChild(firstDesc);
content.appendChild(secondDesc);
content.appendChild(lastDesc);

function mainRequest() {
  let resourceType = document.getElementById("resourceType").value;
  let input = document.getElementById("resourceId").value;

  if (resourceType === "people") {
    let people = new XMLHttpRequest();
    people.addEventListener("load", function() {
      if (this.status === 404) {
        content.innerHTML = "No nothing";
      } else {
        let peopleObj = JSON.parse(this.responseText);
        mainTitle.innerHTML = peopleObj.name;
        firstDesc.innerHTML = peopleObj.gender;

        let species = new XMLHttpRequest();
        species.addEventListener("load", function() {
          let speciesObj = JSON.parse(this.responseText);
          secondDesc.innerHTML = speciesObj.name;
        });
        species.open("GET", peopleObj.species.toString());
        species.send();
      }
    });
    people.open("GET", "https://swapi.co/api/people/" + input + "/");
    people.send();
  } else if (resourceType === "planets") {
    let planet = new XMLHttpRequest();
    planet.addEventListener("load", function() {
      if (this.status === 404) {
        content.innerHTML = "No nothing";
      } else {
        let planetObj = JSON.parse(this.responseText);
        mainTitle.innerHTML = planetObj.name;
        firstDesc.innerHTML = planetObj.terrain;
        secondDesc.innerHTML = planetObj.population;

        for (let i in planetObj.films) {
          let films = new XMLHttpRequest();
          films.addEventListener("load", function() {
            let filmsObj = JSON.parse(this.responseText);
            let listItem = document.createElement("li");
            listItem.innerHTML = filmsObj.title;
            lastDesc.appendChild(listItem);
          });
          films.open("GET", planetObj.films[i]);
          films.send();
        }
      }
    });
    planet.open("GET", "https://swapi.co/api/planets/" + input + "/");
    planet.send();
  } else if (resourceType === "starships") {
    let starship = new XMLHttpRequest();
    starship.addEventListener("load", function() {
      if (this.status === 404) {
        content.innerHTML = "No nothing";
      } else {
        let starshipObj = JSON.parse(this.responseText);
        mainTitle.innerHTML = starshipObj.name;
        firstDesc.innerHTML = starshipObj.manufacturer;
        secondDesc.innerHTML = starshipObj.starship_class;

        for (let i in starshipObj.films) {
          let films = new XMLHttpRequest();
          films.addEventListener("load", function() {
            let filmsObj = JSON.parse(this.responseText);
            let listItem = document.createElement("li");
            listItem.innerHTML = filmsObj.title;
            lastDesc.appendChild(listItem);
          });
          films.open("GET", starshipObj.films[i]);
          films.send();
        }
      }
    });
    starship.open("GET", "https://swapi.co/api/starships/" + input + "/");
    starship.send();
  }
}
