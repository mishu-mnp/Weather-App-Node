const request = require('request')

const forecast = (long, lat, callback) => {
    setTimeout(() => {
        const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=6ccbb619549b5466d8db8200f7dd4b97`;

        request({ url: forecastURL, json: true }, (error, { body }) => {
            if (error) {
                callback('Check your network connection', undefined)
            } else if (body.message) {
                callback('Error! ' + body.cod + ' ' + body.message, undefined)
            } else {
                const no = 2
                const data = body;
                const { list } = data;
                const { main, weather } = list[no];
                callback(undefined, {
                    temperature: main.temp,
                    humidity: main.humidity,
                    weather: weather[0].main,
                    description: weather[0].description
                })
            }
        })
    }, 2000)
}


module.exports = forecast