const spotlightStation = document.querySelector('.randomStation')

// let spotlightDisplay = document.createElement('h2')


// spotlight.appendChild(spotlightDisplay)


fetch('/api/stations/random')
.then(res => res.json())
.then(data => {
    
    
    let name = data.station_name
    let address = data.address
    
    spotlightStation.innerHTML = `${name} <br /> ${address}`
    console.log(name, address);
})

    