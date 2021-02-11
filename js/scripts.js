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

pokemonList.forEach(function(pokemon) {
  document.write(pokemon.name + ' height is ' + pokemon.height + ' cm. <br>');
});
