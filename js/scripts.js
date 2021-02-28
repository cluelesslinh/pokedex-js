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

  //Pokemon details for modal

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      let modalTitle = document.querySelector('.modal-title');
      let modalImg = document.querySelector('.modal-img');
      let modalDesc = document.querySelector('.modal-desc');
      let modalHeight = document.querySelector('.modal-height');
      let modalWeight = document.querySelector('.modal-weight');
      let modalTypes = document.querySelector('.modal-types');

      modalTitle.innerText = '#' + pokemon.id + ' - ' + pokemon.name;
      modalImg.setAttribute('src', pokemon.imageUrl);
      modalDesc.innerText = pokemon.desc;
      modalHeight.innerText = 'Height: ' + pokemon.height;
      modalWeight.innerText = 'Weight: ' + pokemon.weight;
      modalTypes.innerText = pokemonTypes(pokemon);
    });
  }

  //Calling for Pokemon types from complex object

  function pokemonTypes(pokemon) {
    return pokemon.types.length > 1
      ? 'Types: [' + pokemon.types.join(', ') + ']'
      : 'Type: [' + pokemon.types + ']';
  }

  //Creating buttons for each Pokemon

  function pokemonButton(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
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
            item.desc = details.flavor_text_entries[0];
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
