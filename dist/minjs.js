let pokemonRepository = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  function n(t) {
    'object' == typeof t && e.push(t);
  }
  function o(e) {
    i(e).then(function() {
      let t = document.querySelector('.pokemon-name'),
        n = document.querySelector('.pokemon-id'),
        o = document.querySelector('.pokemon-image'),
        i = document.querySelector('.pokemon-description'),
        r = document.querySelector('.pokemon-height'),
        c = document.querySelector('.pokemon-weight'),
        u = document.querySelector('.pokemon-types');
      (t.innerText = e.name),
        (n.innerText = e.id),
        o.setAttribute('src', e.imageUrl),
        (i.innerText = e.desc.replace(/\n/g, ' ')),
        (r.innerText = 'Height: ' + 10 * e.height + ' cm'),
        (c.innerText = 'Weight: ' + e.weight / 10 + ' kg'),
        (u.innerText = (function(e) {
          return e.types.length > 1 ? e.types.join('\n') : e.types;
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
      let t = document.querySelector('.pokemon-search-list'),
        n = document.createElement('li'),
        i = document.createElement('button');
      (i.innerText = e.name),
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
function searchPokemon() {
  let e = document.querySelector('#pokemon-search').value.toLowerCase(),
    t = document.querySelectorAll('.group-list-item');
  for (let n = 0; n < t.length; n++) {
    t[n].innerText.toLowerCase().indexOf(e) > -1
      ? (t[n].style.display = '')
      : (t[n].style.display = 'none');
  }
}
pokemonRepository.fetchList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
