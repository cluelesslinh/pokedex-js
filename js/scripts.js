let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";


  function add(pokemon) {
    if (
    if (typeof(pokemon) === 'object'){
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalTitle = document.querySelector('.modal-title');
      let modalImg = document.querySelector('.modal-img');
      let modalHeight = document.querySelector('.modal-height');
      let modalTypes = document.querySelector('.modal-types')

      modalTitle.innerText = pokemon.name
      modalImg.setAttribute('src', pokemon.imageUrl)
      modalHeight.innerText = 'Height: ' + pokemon.height

    });
  }

  function pokemonButton (button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal')
    button.classList.add('btn')
    listItem.appendChild(button);
    listItem.classList.add('group-list-item')
    pokemonList.appendChild(listItem);
    pokemonButton(button, pokemon);
  }

    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
