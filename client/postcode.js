const divPostcode = document.querySelector('.postcode')
const formPostcode = document.querySelector('.postcode-form')
const inputPostcode = document.querySelector('.postcode-input')
const suburbList = document.querySelector('.suburb-list')

formPostcode.addEventListener('submit', handleSubmit)

async function handleSubmit(evt) {
    evt.preventDefault()

    let postcode = inputPostcode.value
    suburbList.innerHTML = ""
    // make endpoint to send a postcode  then make a call to the suburb api
    fetch(`/api/postcode/${postcode}`)
    .then(res => res.json())
    .then(data => {
        for (let suburb of data) {
            let name = suburb.name
            let nametagLi = document.createElement('li')
            nametagLi.textContent = name
            suburbList.appendChild(nametagLi)
        }
    })

}
