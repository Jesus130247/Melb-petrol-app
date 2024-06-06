
const funcs = {
     getNearbyStations(event, map) {
        event.preventDefault()
        const form_lat = document.querySelector('.search_location .lat')
        const form_long = document.querySelector('.search_location .lng')
        fetch(`/api/stations/nearest/${form_lat.value}/${form_long.value}`)
        .then(res=>res.json())
        .then(res=>console.log(res))
        // returns list of nearby stations

        // need to
        // --> pan to lat/long
        // --> generate markers for returned results
    },

    panToLocation() {
        // map
        return
    },

    generateMarkers() {
        //markers
        return
    }
}

export default funcs

// event.preventDefault DOESNT WORK!!!