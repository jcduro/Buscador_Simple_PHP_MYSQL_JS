const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []

getData()

// filtro en tiempo real
filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
  // Ruta correcta al PHP
  const res = await fetch('archivo_de_comexion_a la_BD')
  const data = await res.json()

  // limpiar HTML e array
  result.innerHTML = ''
  listItems.length = 0

  data.forEach(row => {
    const code = String(row.code || '').toUpperCase()   // CO
    const iso  = code.toLowerCase()                     // co
    const visitas = row.value ?? 0
    const nombrePais = row.nombrePais || code

    const li = document.createElement('li')
    li.classList.add('neon-user-item')
    listItems.push(li)

    li.innerHTML = `
      <span class="flag-icon flag-icon-${iso} neon-flag"></span>
      <div class="neon-user-info">
        <h4 class="neon-user-name">
          ${nombrePais} <span class="neon-country-code">(${code})</span>
        </h4>
        <p class="neon-user-location">Visitas: ${visitas}</p>
      </div>
    `

    result.appendChild(li)
  })
}

function filterData(searchTerm) {
  const term = searchTerm.toLowerCase()

  listItems.forEach(item => {
    if (item.innerText.toLowerCase().includes(term)) {
      item.classList.remove('hide')
    } else {
      item.classList.add('hide')
    }
  })
}
