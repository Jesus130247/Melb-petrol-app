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
    fetch("/api/stations/locations")
    .then(res => res.json())
    .then(res => {
        for (let location of res) {
            let position = { lat: location.lat, lng: location.lng}
            let marker = new AdvancedMarkerElement({
                map: map,
                position: position,
                title: location.address
            });
        }
    })
}

initMap();
