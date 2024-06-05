const leftDiv = document.querySelector('.left')
const rightDiv = document.querySelector('.right')
const mapId = document.querySelector('#map')

document.addEventListener('keydown', displayAsides)

function displayAsides(event) {
   
    if (event.ctrlKey && event.key === 'm') {

        if (leftDiv.style.display !== 'none' && rightDiv.style.display !== 'none') {
            leftDiv.style.display = 'none'
            rightDiv.style.display = 'none'
            mapId.style.position = 'absolute'
            console.log('asides display = ', leftDiv.style.display, '&', rightDiv.style.display);
        } else {
            leftDiv.style.display = ''
            rightDiv.style.display = ''
            mapId.style.position = ''
            console.log('asides display reset');
        }

    }
}