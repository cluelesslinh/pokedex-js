let pokemonRepository = (function() {
  let pokemonList = [];
  let pokeNameApi = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  //Adding Pokemon to list

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  //Pokemon details

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      let pokemonName = document.querySelector('.pokemon-name');
      let pokemonIdNumber = document.querySelector('.pokemon-id');
      let pokemonImage = document.querySelector('.pokemon-image');
      let pokemonDesc = document.querySelector('.pokemon-description');
      let pokemonHeight = document.querySelector('.pokemon-height');
      let pokemonWeight = document.querySelector('.pokemon-weight');
      let pokemonTypes = document.querySelector('.pokemon-types');

      pokemonName.innerText = pokemon.name;
      pokemonIdNumber.innerText = pokemon.id;
      pokemonImage.setAttribute('src', pokemon.imageUrl);
      pokemonDesc.innerText = pokemon.desc.replace(/\n/g, ' ');
      pokemonHeight.innerText = 'Height: ' + pokemon.height * 10 + ' cm';
      pokemonWeight.innerText = 'Weight: ' + pokemon.weight / 10 + ' kg';
      pokemonTypes.innerText = callPokemonTypes(pokemon);
    });
  }

  //Calling for Pokemon types from complex object

  function callPokemonTypes(pokemon) {
    return pokemon.types.length > 1 ? pokemon.types.join('\n') : pokemon.types;
  }

  //Creating buttons for each Pokemon

  function pokemonButton(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-search-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    listItem.appendChild(button);
    listItem.classList.add('group-list-item');
    pokemonList.appendChild(listItem);
    pokemonButton(button, pokemon);
  }

  //Fetching Pokemon description

  function fetchList() {
    return fetch(pokeNameApi)
      .then(function(response) {
        return response.json();
      })
      .then(function(pokeName) {
        pokeName.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let pokeDetails = item.detailsUrl;
    return fetch(pokeDetails)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.id = details.id;
        item.imageUrl = details.sprites.other['official-artwork'].front_default;
        item.species = details.species.url;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function(pokeType) {
          item.types.push(pokeType.type.name);
        });

        return fetch(details.species.url)
          .then(function(response) {
            return response.json();
          })
          .then(function(desc) {
            item.desc = desc.flavor_text_entries.find(
              entry => entry.language.name === 'en'
            ).flavor_text;
          });
      })

      .catch(function(e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    fetchList: fetchList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//Loading all data

pokemonRepository.fetchList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//Search bar

function searchPokemon() {
  let searchText = document.querySelector('#pokemon-search').value;
  let x = searchText.toLowerCase();
  let pokes = document.querySelectorAll('.group-list-item');
  for (let i = 0; i < pokes.length; i++) {
    let y = pokes[i].innerText;
    if (y.toLowerCase().indexOf(x) > -1) {
      pokes[i].style.display = '';
    } else {
      pokes[i].style.display = 'none';
    }
  }
}
