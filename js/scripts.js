let pokemonRepository = (function () {
  let pokemonList = [
    {
    name: 'Bulbasaur',
    height: 71.1,
    type: ['Grass', 'Poison']
  },
  {
    name: 'Ivysaur',
    height: 99.1,
    type: ['Grass', 'Poison']
  },
  {
    name: 'Venusaur',
    height: 201,
    type: ['Grass', 'Poison']
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function () {
  showDetails(pokemon);
});
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };

})();

pokemonRepository.add({ name: "Pikachu", height: 40.6, types: ["Electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
