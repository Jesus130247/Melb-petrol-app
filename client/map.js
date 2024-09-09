import findIconUrl from './utils.js'
const centerCoords = document.querySelector('.center-coords')
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
const lookupBtn = document.querySelector('.lookup-address-btn')
const centerLocationDiv = document.querySelector('.center-location')
const suburbsList = document.querySelector('.suburb-list')

// spotlight code
import { getSpotlight } from './spotlight.js';
const spotlightStation = document.querySelector('.randomStation')
const refreshLink = document.querySelector('.refresh')

refreshLink.addEventListener('click', async () => {
    spotlightData = await getSpotlight()
    spotlightLat = spotlightData.lat
    spotlightLng = spotlightData.lng
})

// data for map coords
let spotlightData
let spotlightLat
let spotlightLng

// Initialize and add the map
let map;
let markersArray = []

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

  // initial for searching location
  const searchBtn = document.querySelector('.search_location form')
  searchBtn.addEventListener('submit', (event) => {
      event.preventDefault()
      goToSearchedStation(map)
    })

  //go a suburb
  
  suburbsList.addEventListener('click', async (evt)=>{
    let coord = await getLatLngBySuburb(evt.target.innerText)
    console.log(coord);
    let latSuburb = coord.lat
    let lngSuburb = coord.lng
    console.log(latSuburb,lngSuburb);
    goToStation(map,latSuburb,lngSuburb)
  })
  
  // initial spotlight call
  spotlightData = await getSpotlight()
  spotlightLat = spotlightData.lat
  spotlightLng = spotlightData.lng
  spotlightStation.addEventListener('click', () => goToStation(map,spotlightLat,spotlightLng))
  
  // On Drag End
    google.maps.event.addListener(map, 'dragend', function() { 
        let coord = `lat: ${map.getCenter().toJSON().lat.toFixed(4)} <br />
            lng: ${map.getCenter().toJSON().lng.toFixed(4)}`
        centerCoords.innerHTML = coord
        let addressText = document.querySelector('.center-address')
        if (addressText !== null) {
          addressText.remove()
        }
    });
      
      lookupBtn.addEventListener('click', () => {
        var google_map_position = new google.maps.LatLng( map.getCenter().toJSON().lat.toFixed(4), map.getCenter().toJSON().lng.toFixed(4) );
        var google_maps_geocoder = new google.maps.Geocoder();
        google_maps_geocoder.geocode(
            { 'latLng': google_map_position }, ( results, status ) => {
                let address = results[0].formatted_address
                let addressP = document.createElement('p')
                addressP.className = 'center-address'
                addressP.innerText = address
                centerLocationDiv.appendChild(addressP)
            }
        );
      })
    // initial call to get petrol stations of default bounds
    getMapMarkersAroundPosition(map, position)
    // event listeners for when the map changes
    google.maps.event.addListener(map, 'zoom_changed', () => mapMarkers(map))
    google.maps.event.addListener(map, 'dragend', () => mapMarkers(map))
    
}

navigator.geolocation.getCurrentPosition((position) => {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  initMap(lat, lng);

  
});

async function mapMarkers(map) {
  // delete all markers
  for (let marker of markersArray) {
    marker.map = null
  }
  // 

  let topLeft = [map.getBounds().Xh.hi,map.getBounds().Ih.lo]
  let bottomRight = [map.getBounds().Xh.lo,map.getBounds().Ih.hi]

  fetch(`/api/stations/bounds/${topLeft[0]}/${topLeft[1]}/${bottomRight[0]}/${bottomRight[1]}`)
    .then(res => {
      return res.json()})
    .then(res => {
      for (let location of res) {
        let iconImg = document.createElement('img')
        iconImg.classList.add('station_marker')
        iconImg.src = findIconUrl(location.brand_name)
        iconImg.style.width = '40px'
        let position = { lat: location.lat, lng: location.lng}
        let marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: location.station_name,
            content: iconImg,
        });
        markersArray.push(marker)
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

function getMapMarkersAroundPosition(map, position) {
  fetch(`/api/stations/nearest/${position.lat}/${position.lng}`)
  .then(res => res.json())
  .then(res => {
    console.log('Map Marker Data: ',res)
    for (let location of res) {
      let iconImg = document.createElement('img')
      iconImg.classList.add('station_marker')
      iconImg.src = findIconUrl(location.brand_name)
      iconImg.style.width = '40px'
      let position = { lat: location.lat, lng: location.lng}
      let marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: location.station_name,
          content: iconImg,
      });
      markersArray.push(marker)
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

function goToStation(map,lat,lng) {
    map.setCenter(new google.maps.LatLng(lat,lng))
    let coord = `lat: ${map.getCenter().toJSON().lat.toFixed(4)} <br />
    lng: ${map.getCenter().toJSON().lng.toFixed(4)}`
    centerCoords.innerHTML = coord
    singleMapMarker(spotlightData)
    getMapMarkersAroundPosition(map, {lat, lng})
}

async function singleMapMarker(location) {
    let iconImg = document.createElement('img')
    iconImg.classList.add('station_marker')
    iconImg.src = findIconUrl(location.brand_name)
    iconImg.style.width = '40px'
    let position = { lat: location.lat, lng: location.lng}
    let marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: location.station_name,
        content: iconImg,
    });

    markersArray.push(marker)

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

    infowindow.open({
        anchor: marker,
        map,
    })
}


function goToSearchedStation(map) {
  let lat = document.querySelector('.search_location .lat')
  let lng = document.querySelector('.search_location .lng')
  lat = Number(lat.value)
  lng = Number(lng.value)
  map.setCenter(new google.maps.LatLng(lat,lng))
  let coord = `lat: ${map.getCenter().toJSON().lat.toFixed(4)} <br />
  lng: ${map.getCenter().toJSON().lng.toFixed(4)}`
  centerCoords.innerHTML = coord
}


async function getLatLngBySuburb(suburb) {
  let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${suburb}+Australia,+CA&key=AIzaSyC5yn98ClGzqHKOI80GOoTZYchaWjRXCvc`)
  let data = await res.json()
    let centerLat = (data.results[0].geometry.bounds.northeast.lat + data.results[0].geometry.bounds.southwest.lat)/2
    let centerLng = (data.results[0].geometry.bounds.northeast.lng + data.results[0].geometry.bounds.southwest.lng)/2
    return {lat:centerLat, lng:centerLng}

}


