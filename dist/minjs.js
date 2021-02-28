let pokemonRepository = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  function n(t) {
    'object' == typeof t && e.push(t);
  }
  function o(e) {
    i(e).then(function() {
      let t = document.querySelector('.modal-title'),
        n = document.querySelector('.modal-img'),
        o = document.querySelector('.modal-desc'),
        i = document.querySelector('.modal-height'),
        r = document.querySelector('.modal-weight'),
        c = document.querySelector('.modal-types');
      (t.innerText = '#' + e.id + ' - ' + e.name),
        n.setAttribute('src', e.imageUrl),
        (o.innerText = e.desc.replace(/\n/g, ' ')),
        (i.innerText = 'Height: ' + e.height),
        (r.innerText = 'Weight: ' + e.weight),
        (c.innerText = (function(e) {
          return e.types.length > 1
            ? 'Types: [' + e.types.join(', ') + ']'
            : 'Type: [' + e.types + ']';
        })(e));
    });
  }
  function i(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        return (
          (e.id = t.id),
          (e.imageUrl = t.sprites.other['official-artwork'].front_default),
          (e.species = t.species.url),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.types = []),
          t.types.forEach(function(t) {
            e.types.push(t.type.name);
          }),
          fetch(t.species.url)
            .then(function(e) {
              return e.json();
            })
            .then(function(t) {
              e.desc = t.flavor_text_entries.find(
                e => 'en' === e.language.name
              ).flavor_text;
            })
        );
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  return {
    add: n,
    getAll: function() {
      return e;
    },
    addListItem: function(e) {
      let t = document.querySelector('.pokemon-list'),
        n = document.createElement('li'),
        i = document.createElement('button');
      (i.innerText = e.name),
        i.setAttribute('data-toggle', 'modal'),
        i.setAttribute('data-target', '#pokemonModal'),
        i.classList.add('btn'),
        n.appendChild(i),
        n.classList.add('group-list-item'),
        t.appendChild(n),
        (function(e, t) {
          e.addEventListener('click', function() {
            o(t);
          });
        })(i, e);
    },
    fetchList: function() {
      return fetch(t)
        .then(function(e) {
          return e.json();
        })
        .then(function(e) {
          e.results.forEach(function(e) {
            n({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    loadDetails: i,
    showDetails: o
  };
})();
pokemonRepository.fetchList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
