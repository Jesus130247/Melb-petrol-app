import findIconUrl from './utils.js'
const centerCoords = document.querySelector('.center-coords')
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
const lookupBtn = document.querySelector('.lookup-address-btn')
const centerLocationDiv = document.querySelector('.center-location')
const suburbsList = document.querySelector('.suburb-list')
const lookupAddress = document.querySelector('.lookup-address')

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
let infoWindowsArray = []

navigator.geolocation.getCurrentPosition((position) => {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    initMap(lat, lng); 
  });

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
      goToSearchedCoords(map)
    })

  //go a suburb
  
  suburbsList.addEventListener('click', async (evt)=>{
    let coord = await getLatLngBySuburb(evt.target.innerText)
    let latSuburb = coord.lat
    let lngSuburb = coord.lng
    goToCoords(map,latSuburb,lngSuburb)
  })
  
  // initial spotlight call
  spotlightData = await getSpotlight()
  spotlightLat = spotlightData.lat
  spotlightLng = spotlightData.lng
  spotlightStation.addEventListener('click', () => { 
    goToCoords(map,spotlightLat,spotlightLng)
    singleMapMarker(spotlightData)
  })
  
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
                lookupAddress.innerHTML = null
                let address = results[0].formatted_address
                let addressP = document.createElement('p')
                addressP.className = 'center-address'
                addressP.innerText = address
                lookupAddress.appendChild(addressP)
            }
        );
      })
    // initial call to get petrol stations of default bounds
    getMapMarkersAroundPosition(map, position)
    // event listeners for when the map changes
    google.maps.event.addListener(map, 'zoom_changed', () => mapMarkers(map))
    google.maps.event.addListener(map, 'dragend', () => mapMarkers(map))
    
}

// map changing functions
function updateCenterCoords() {
    let coord = `lat: ${map.getCenter().toJSON().lat.toFixed(4)} <br />
    lng: ${map.getCenter().toJSON().lng.toFixed(4)}`
    centerCoords.innerHTML = coord
}

function makeMarker(location) {
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
        lat: ${location.lat.toFixed(4)} <br>
        lng: ${location.lng.toFixed(4)} </p>
      `
      let infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: location.suburb,
        });
      infoWindowsArray.push(infowindow)
      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map,
        })
      })
      return {infowindow, marker}
}

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
        makeMarker(location)
      }
  })
}

function goToCoords(map,lat,lng) {
    map.setCenter(new google.maps.LatLng(lat,lng))
    updateCenterCoords()
    mapMarkers(map)
    lookupAddress.innerHTML = null
}

function getMapMarkersAroundPosition(map, position) {
  fetch(`/api/stations/nearest/${position.lat}/${position.lng}`)
  .then(res => res.json())
  .then(res => {
    for (let location of res) {
        makeMarker(location)
    }
})
}

async function singleMapMarker(location) {
    let markerWindowData = makeMarker(location)
    let infowindow = markerWindowData.infowindow
    let marker = markerWindowData.marker

    infowindow.open({
        anchor: marker,
        map,
    })
}

function goToSearchedCoords(map) {
  let lat = document.querySelector('.search_location .lat-input')
  let lng = document.querySelector('.search_location .lng-input')
  lat = Number(lat.value)
  lng = Number(lng.value)
  goToCoords(map,lat,lng)
}

async function getLatLngBySuburb(suburb) {
  let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${suburb}+Australia,+CA&key=AIzaSyC5yn98ClGzqHKOI80GOoTZYchaWjRXCvc`)
  let data = await res.json()
    let centerLat = (data.results[0].geometry.bounds.northeast.lat + data.results[0].geometry.bounds.southwest.lat)/2
    let centerLng = (data.results[0].geometry.bounds.northeast.lng + data.results[0].geometry.bounds.southwest.lng)/2
    return {lat:centerLat, lng:centerLng}
}

