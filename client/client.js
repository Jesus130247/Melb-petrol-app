// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -37.8136, lng: 144.9631 };
  // Request needed libraries.
  //@ts-ignore
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
  
}

async function mapMarkers(map) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    fetch("/api/stations")
    .then(res => res.json())
    .then(res => {
      for (let location of res) {
        let position = { lat: location.lat, lng: location.lng}
        let marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: location.address
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

initMap();