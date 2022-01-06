const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const temp = document.querySelector('#temp')
const humd = document.querySelector('#humd')
const weather = document.querySelector('#weather')
const desc = document.querySelector('#desc')
const weatherForm = document.querySelector('form')
const addressSearch = document.querySelector('input')

const updateData = () => {
    temp.textContent = ''
    humd.textContent = ''
    weather.textContent = ''
    desc.textContent = ''
}

const getData = (address) => {
    addressSearch.value = ''
    messageOne.textContent = 'Loading...'
    // messageTwo.textContent = ''
    updateData()
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error;
            } else {
                console.log(data.address)
                console.log(data.forecast)
                console.log(data.location)
                messageOne.textContent = 'Location : ' + data.location

                // messageTwo.textContent = `Temperature : ${data.forecast.temperature} Humidity: ${data.forecast.humidity} 
                // Weather: ${data.forecast.weather} Description: ${data.forecast.description}`
                temp.textContent = 'Temperature : ' + data.forecast.temperature,
                    humd.textContent = 'Humidity : ' + data.forecast.humidity,
                    weather.textContent = 'Weather : ' + data.forecast.weather,
                    desc.textContent = 'Description : ' + data.forecast.description
            }
        })
    })
}



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = addressSearch.value;
    // console.log(address)
    getData(address);
})

window.onload = function () {
    addressSearch.value = '';
}