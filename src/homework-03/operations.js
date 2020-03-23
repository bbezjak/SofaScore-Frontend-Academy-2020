const activePokemons = {
  pokemons: [],
  domElement: "pokemon_list",
  callback: pokemon => {
    function fun() {
      return deletePokemonFromDomList(pokemon, activePokemons, deletedPokemons);
    }
    return fun;
  },
  moveButtonText: "Delete"
};

const deletedPokemons = {
  pokemons: [],
  domElement: "deleted_pokemons",
  callback: pokemon => {
    function fun() {
      return deletePokemonFromDomList(pokemon, deletedPokemons, activePokemons);
    }
    return fun;
  },
  moveButtonText: "Restore"
};

const deletedList = document.getElementById("deleted_pokemons");

function fetchPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon";
  console.log("Staring fetching pokemons");

  fetch(url)
    .then(response => {
      console.log("Response", { response });

      if (response.status === 200) {
        response.json().then(jsonData => {
          console.log("Data received", jsonData);
          pokemons = jsonData.results;
          console.log(this.result);

          //https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
          const domElement = document.getElementById(activePokemons.domElement);
          //domElement.textContent = "";
          for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            insertPokemonIntoList(pokemon, activePokemons);
          }
        });
      } else {
        console.log(
          "Something is wrong, response status is " + response.status
        );
      }
    })
    .catch(console.error)
    .finally(console.log("Fetch finished"));
}

function insertPokemonIntoList(pokemon, list) {
  const domElement = document.getElementById(list.domElement);
  if (domElement.children[pokemon.name] == undefined) {
    const li = document.createElement("li");
    li.id = pokemon.name;
    const span = document.createElement("span");
    span.innerText = pokemon.name;
    const button = document.createElement("button");
    button.addEventListener("click", list.callback(pokemon));
    button.innerText = list.moveButtonText;
    li.appendChild(span);
    li.appendChild(button);
    domElement.appendChild(li);

    list.pokemons.push(pokemon);
  }
}

function deletePokemonFromDomList(pokemon, stateFrom, stateTo) {
  const li = document.getElementById(pokemon.name);
  const domElementFrom = document.getElementById(stateFrom.domElement);
  domElementFrom.removeChild(li);
  stateFrom.pokemons = stateFrom.pokemons.filter(
    _pokemon => _pokemon.name !== pokemon.name
  );

  insertPokemonIntoList(pokemon, stateTo);
}
