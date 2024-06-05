const form = document.querySelector('.search_location')
form.addEventListener('submit', getinfo)

function getinfo() {
    event.preventDefault()
    const form_lat = document.querySelector('.search_location .lat')
    const form_long = document.querySelector('.search_location .lng')
    fetch(`/api/stations/nearest/${form_lat.value}/${form_long.value}`)
    .then(res=>res.json())
    .then(res=>console.log(res))
}