
const dateTempDiv = document.querySelector('.date_temperature')

dateTempDiv.addEventListener('click', handleClick)

displayClock()
const clockClass = document.querySelector('.clock-display')

let weatherDisplay = document.createElement('h2')
weatherDisplay.className = "weather-display"
weatherDisplay.style.display = 'none'

displayWeather()

function handleClick(event) {
    console.log(event.target.classList.value, 'date-temp EL');

    let className = event.target.classList.value


    if (className === "clock-display"){
        clockClass.style.display = 'none'
        weatherDisplay.style.display = 'block'
    } else {
        clockClass.style.display = 'block'
        weatherDisplay.style.display = 'none'
    }
}

function displayClock() {

    let clockDisplay = document.createElement('h2')
    clockDisplay.className = "clock-display"


    setInterval(updateClock, 1000)
    dateTempDiv.appendChild(clockDisplay)

    function currentTime(){
        return dayjs().format('ddd HH:mm:ss A')
    }


    function updateClock() {
        let time = currentTime()
        
        clockDisplay.innerText = time
    }
}

async function displayWeather() {

    navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
    });

    async function getWeather(lat, lng){
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`
       
        fetch(url)
        .then(res => res.json())
        .then(data => {
            
            let temp = data.hourly.temperature_2m[0]
            weatherDisplay.innerText = temp +  ' °C'
            
            dateTempDiv.appendChild(weatherDisplay)
        })
    }  
}