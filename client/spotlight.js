const spotlightStation = document.querySelector('.randomStation')

export async function getSpotlight() {
    const result = await fetch('/api/stations/random')
    const data = await result.json()
    let name = data.station_name
    let address = data.address
    spotlightStation.innerHTML = `${name} <br /> ${address}`
    return data
}

    