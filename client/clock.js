
const clock = document.querySelector('.date')

let clockDisplay = document.createElement('h2')

setInterval(updateClock, 1000)
clock.appendChild(clockDisplay)

function currentTime(){
    return dayjs().format('ddd HH:MM:ss A')//maybe its the issue
}


function updateClock() {
    let time = currentTime()
    
    clockDisplay.innerText = time
}

