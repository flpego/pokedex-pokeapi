const listaPokemon = document.querySelector("#listaPokemons");
const botonesHeader = document.querySelectorAll(".btn-header")

let URL = "https://pokeapi.co/api/v2/pokemon/"

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then(response => response.json())
    .then(data => mostrarPokemon(data))
}

function mostrarPokemon(data) {

  let tipos = data.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
  tipos = tipos.join("")

  let pokemonId = data.id

  const div = document.createElement("div")
  div.classList.add('pokemon')

  div.innerHTML = `
    <p class="pokemon-id-back">#${data.id}</p>
    <div class="pokemon-imagen">
      <img
        src="${data.sprites.other["official-artwork"].front_default}"
        alt="pikachu"
      />
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${data.id}</p>
        <h2 class="pokemon-nombre">${data.name}</h2>
      </div>
      <div class="pokemon-tipos">
        ${tipos}
      </div>
      <div class="pokemon-stats">

        <p class="stat">${data.height < 10 ? '0,' : ''}${data.height.toString().split('').join(",")} M</p>
        <p class="stat">${data.weight} Kg</p>
      </div>
    `

  listaPokemon.append(div)
}

botonesHeader.forEach(boton => boton.addEventListener('click', (e) => {
  const botonId = e.currentTarget.id

  listaPokemon.innerHTML = ""

  for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
      .then(response => response.json())
      .then(data => {

        if (botonId === "ver-todos") {
          mostrarPokemon(data)
        } else {
          const tipos = data.types.map(type => type.type.name)

          if (tipos.some((tipo => tipo.includes(botonId)))) {
            mostrarPokemon(data)
          }
        }
      })
  }
}))