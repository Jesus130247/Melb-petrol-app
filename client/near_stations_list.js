const rightList = document.querySelector('.near-stations-list ul')
// first 10 stations 
fetch('/api/stations')
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i< 10; i++) {
            // let randomNum = Math.floor(Math.random()*data.length)
            let station = data[i]
            let stationLi = document.createElement('li')
            let stationNameP = document.createElement('p')
            let stationAddressP = document.createElement('p')
            let stationOwnerP = document.createElement('p')

            stationNameP.className = 'right-list-name'
            stationAddressP.className = 'right-list-address'
            stationOwnerP.className = 'right-list-owner'

            stationNameP.innerText = station.station_name
            stationAddressP.innerText = station.address 
            stationOwnerP.innerText = station.brand_name

            stationLi.appendChild(stationOwnerP)
            stationLi.appendChild(stationNameP)
            stationLi.appendChild(stationAddressP)


            rightList.appendChild(stationLi)
        }
    })

