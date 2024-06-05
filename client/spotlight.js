const spotlightStation = document.querySelector('.randomStation')
const refreshLink = document.querySelector('.refresh')
refreshLink.addEventListener('click', getSpotlight)

export async function getSpotlight() {
    const result = await fetch('/api/stations/random')
    const data = await result.json()
    let name = data.station_name
    let address = data.address
    spotlightStation.innerHTML = `${name} <br /> ${address}`
    return data
}

getSpotlight()
    