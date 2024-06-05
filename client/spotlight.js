const spotlightStation = document.querySelector('.randomStation')
const refreshLink = document.querySelector('.refresh')

async function getSpotlight() {
    fetch('/api/stations/random')
    .then(res => res.json())
    .then(data => {
        let name = data.station_name
        let address = data.address
        
        spotlightStation.innerHTML = `${name} <br /> ${address}`
        spotlightStation.addEventListener('click', goToStation)
    })   
}

function moveMap(map) {
    
}

getSpotlight()
refreshLink.addEventListener('click', getSpotlight)

    