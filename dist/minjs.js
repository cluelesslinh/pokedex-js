let pokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  function n(e) {
    'object' == typeof e && t.push(e);
  }
  function o(t) {
    i(t).then(function() {
      let e = document.querySelector('.modal-title'),
        n = document.querySelector('.modal-img'),
        o = document.querySelector('.modal-height');
      (e.innerText = t.name),
        n.setAttribute('src', t.imageUrl),
        (o.innerText = 'Height: ' + t.height);
    });
  }
  function i(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types);
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      let e = document.querySelector('.pokemon-list'),
        n = document.createElement('li'),
        i = document.createElement('button');
      (i.innerText = t.name),
        i.setAttribute('data-toggle', 'modal'),
        i.setAttribute('data-target', '#pokemonModal'),
        i.classList.add('btn'),
        n.appendChild(i),
        n.classList.add('group-list-item'),
        e.appendChild(n),
        (function(t, e) {
          t.addEventListener('click', function() {
            o(e);
          });
        })(i, t);
    },
    loadList: function() {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: i,
    showDetails: o
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
