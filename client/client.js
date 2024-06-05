const centerCoords = document.querySelector('.center-coords')

// Initialize and add the map
let map;

async function initMap(lat, lng) {
  const position = { lat, lng };
  centerCoords.innerHTML = `lat: ${position.lat} <br />lng: ${position.lng}`
  const { Map } = await google.maps.importLibrary("maps");

  // The map
  map = new Map(document.getElementById("map"), {
    zoom: 13,
    minZoom: 8,
    maxZoom: 13,
    center: position,
    mapId: "AUSTRALIA",
  });

  // The markers for petrol stations
  mapMarkers(map);

  // On Drag End
    google.maps.event.addListener(map, 'dragend', function() { 
        let coord = `lat: ${map.getCenter().toJSON().lat.toFixed(4)} <br />
            lng: ${map.getCenter().toJSON().lng.toFixed(4)}`
        centerCoords.innerHTML = coord
    });
}

navigator.geolocation.getCurrentPosition((position) => {
  initMap(position.coords.latitude, position.coords.longitude);
});

async function mapMarkers(map) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    fetch("/api/stations")
    .then(res => res.json())
    .then(res => {
      for (let location of res) {
        let iconImg = document.createElement('img')
        iconImg.src = findIconUrl(location.brand_name)
        iconImg.style.width = '40px'
        let position = { lat: location.lat, lng: location.lng}
        let marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: location.station_name,
            content: iconImg,
        });
        let contentString = `
          <h1 class="station_name"> ${location.station_name} </h1>
          <p class="content"> ${location.address}, ${location.suburb} <br>
          owner: ${location.brand_name} <br>
          lat: ${location.lat} <br>
          lng: ${location.lng} </p>
          <div class="save">Save star</div>
        `
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          ariaLabel: location.suburb,
          });
        marker.addListener('click', () => {
          infowindow.open({
            anchor: marker,
            map,
          })
        })
      }
  })
}


function findIconUrl(brand) {
  let icons  = {
    "Caltex": "https://fuelprice.io/wp-content/uploads/2018/07/caltex-favicon-64x64.png",
    "BP": "https://fuelprice.io/wp-content/uploads/2018/07/bp-favicon.png",
    "Shell": "https://fuelprice.io/wp-content/uploads/2018/07/shell-favicon.png",
    "7-Eleven": "https://fuelprice.io/wp-content/uploads/2018/07/7-eleven-64x62.png",
    "default": "https://fuelprice.io/wp-content/uploads/2018/10/fuelprice-logo.png"
  }
  if (icons[brand]) {
    return icons[brand]
  } else {
    return icons.default
  }
}

initMap();

