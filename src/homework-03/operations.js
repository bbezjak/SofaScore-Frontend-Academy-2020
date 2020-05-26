let maxOffset;
const noDisplayClass = "no_display";

const activePokemons = {
  pokemons: [],
  domElement: "active_pokemons",
  callback: pokemon => {
    function fun() {
      return movePokemonToAnotherList(pokemon, activePokemons, deletedPokemons);
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
      return movePokemonToAnotherList(pokemon, deletedPokemons, activePokemons);
    }
    return fun;
  },
  moveButtonText: "Restore"
};

const deletedList = document.getElementById("deleted_pokemons");

function fetchPokemons(offsetParam) {
  let url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  if (offsetParam > 0) {
    url = url + "&offset=" + offsetParam * 20;
  }
  console.log("Staring fetching pokemons");

  fetch(url)
    .then(response => {
      console.log("Response", { response });

      if (response.status === 200) {
        response.json().then(jsonData => {
          console.log("Data received", jsonData);
          maxOffset = Math.round(jsonData.count / 20);
          pokemons = jsonData.results;
          console.log(this.result);

          //https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
          const domElement = document.getElementById(activePokemons.domElement);
          domElement.textContent = "";
          for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            insertPokemonIntoList(pokemon, activePokemons);
          }

          setupPagination(offsetParam);
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

function showPokemonAbilities(pokemon) {
  console.log("Staring fetching pokemon details");

  fetch(pokemon.url)
    .then(response => {
      if (response.status === 200) {
        response.json().then(jsonData => {
          console.log("Data received", jsonData);

          const domElement = document.getElementById(
            pokemon.name + "_extra_info"
          );
          const span = document.createElement("span");
          span.innerText = "Abilities";
          domElement.appendChild(span);
          const list = document.createElement("ul");
          for (let i = 0; i < jsonData.abilities.length; i++) {
            const ability = jsonData.abilities[i];
            const li = document.createElement("li");
            li.innerText = ability.ability.name;
            list.appendChild(li);
          }
          domElement.appendChild(list);
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
  if (document.getElementById(pokemon.name) == undefined) {
    //domElement.children[pokemon.name] == undefined &&
    const li = document.createElement("li");
    li.id = pokemon.name;
    li.classList.add("pokemon_li");

    //create span with pokemon name
    const span = document.createElement("span");
    span.innerText = pokemon.name;

    //create button for moving pokemon from list to list
    const button = document.createElement("button");
    button.addEventListener("click", list.callback(pokemon));
    button.innerText = list.moveButtonText;

    //create div with extra informations
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("extra_info");
    detailsDiv.classList.add(noDisplayClass);
    const id = pokemon.name + "_extra_info";
    detailsDiv.id = id;

    //append chidren to li element
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(detailsDiv);

    //li.onclick = () => console.log("nesto sam kliketnuo");
    li.addEventListener("click", () => {
      if (detailsDiv.children.length == 0) {
        showPokemonAbilities(pokemon);
      }
      toggleSeeDeletedList(id, noDisplayClass);
    });

    //add li to correct list
    domElement.appendChild(li);

    //add pokemon to state(one of the lists)
    list.pokemons.push(pokemon);
  }
}

function movePokemonToAnotherList(pokemon, stateFrom, stateTo) {
  const li = document.getElementById(pokemon.name);
  const domElementFrom = document.getElementById(stateFrom.domElement);
  domElementFrom.removeChild(li);
  stateFrom.pokemons = stateFrom.pokemons.filter(
    _pokemon => _pokemon.name !== pokemon.name
  );

  insertPokemonIntoList(pokemon, stateTo);
}

function toggleSeeDeletedList(domElement, className) {
  const deletedList = document.getElementById(domElement);
  if (deletedList.classList.contains(className)) {
    deletedList.classList.remove(className);
  } else {
    deletedList.classList.add(className);
  }
}

function setupPagination(offsetParam) {
  const selectedClass = "p_selected";

  const one = document.getElementById("p1");
  one.classList.remove(noDisplayClass);
  one.classList.remove(selectedClass);

  const two = document.getElementById("p2");
  two.classList.remove(noDisplayClass);
  two.classList.remove(selectedClass);

  const three = document.getElementById("p3");
  three.classList.remove(selectedClass);

  const four = document.getElementById("p4");
  four.classList.remove(noDisplayClass);
  four.classList.remove(selectedClass);

  const five = document.getElementById("p5");
  five.classList.remove(noDisplayClass);
  five.classList.remove(selectedClass);

  if (offsetParam - 3 < 0) {
    one.innerText = 1;
    one.onclick = () => fetchPokemons(0);

    two.innerText = 2;
    two.onclick = () => fetchPokemons(1);

    three.innerText = 3;
    three.onclick = () => fetchPokemons(2);

    four.innerText = 4;
    four.onclick = () => fetchPokemons(3);

    five.innerText = 5;
    five.onclick = () => fetchPokemons(4);

    if (offsetParam == 0) {
      one.classList.add(selectedClass);
    } else if (offsetParam == 1) {
      two.classList.add(selectedClass);
    } else if (offsetParam == 2) {
      three.classList.add(selectedClass);
    }
  } else if (offsetParam + 2 > maxOffset) {
    one.innerText = maxOffset - 4;
    one.onclick = () => fetchPokemons(maxOffset - 4);

    two.innerText = maxOffset - 3;
    two.onclick = () => fetchPokemons(maxOffset - 3);

    three.innerText = maxOffset - 2;
    three.onclick = () => fetchPokemons(maxOffset - 2);

    four.innerText = maxOffset - 1;
    four.onclick = () => fetchPokemons(maxOffset - 1);

    five.innerText = maxOffset;
    five.onclick = () => fetchPokemons(maxOffset);

    if (offsetParam == maxOffset - 1) {
      four.classList.add(selectedClass);
    } else if (offsetParam == maxOffset) {
      five.classList.add(selectedClass);
    }
  } else {
    one.innerText = offsetParam - 1;
    one.onclick = () => fetchPokemons(offsetParam - 2);

    two.innerText = offsetParam;
    two.onclick = () => fetchPokemons(offsetParam - 1);

    three.innerText = offsetParam + 1;
    three.onclick = () => fetchPokemons(offsetParam);

    four.innerText = offsetParam + 2;
    four.onclick = () => fetchPokemons(offsetParam + 1);

    five.innerText = offsetParam + 3;
    five.onclick = () => fetchPokemons(offsetParam + 2);

    three.classList.add(selectedClass);
  }
}
