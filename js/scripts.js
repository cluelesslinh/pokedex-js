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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 200) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') Wow, a huge Pokemon! <br>');
  } else if (pokemonList[i].height < 100) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') Oh, a small Pokemon <br>');
  } else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + '<br>');
  }
}
