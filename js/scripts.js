
// IIFE pokemonRepository
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
  }
  ];

   return {
      add: function(pokemon) {
        pokemonList.push(pokemon);
      },
      getAll: function() {
        return pokemonList;
      }
    };
  })();

// pokemon add and getAll function
 console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu', height: 40.6, type: ['Electric'] });
console.log(pokemonRepository.getAll());

// function to show in browser
  (function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        let pokemonName = pokemon.name
        let pokemonHeight = pokemon.height

        if(pokemonHeight > 200) {
            document.write(pokemonName + ' (height : ' + pokemonHeight + ')' + ' - Wow, a huge Pokemon!');
        } else if (pokemonHeight < 100) {
          document.write(pokemonName + ' (height: ' + pokemonHeight + ') - Aw, a small Pokemon.');
        }
        else {
            document.write(pokemonName + ' (height : ' + pokemonHeight + ')');
        }
            document.write('<br>', '<br>');
        });
})();
