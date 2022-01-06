const request = require('request');


const geocode = (address, callback) => {
    setTimeout(() => {
        const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlzaHUtbW5wIiwiYSI6ImNreHZlbXRmdjEzb3IydXBoY3k0YmJqNW0ifQ.rkidZJHo7elzKxB_Jerrrw';

        request({ url: geocodeURL, json: true }, (error, { body }) => {
            if (error) {
                callback('Check your network connection', undefined)
            } else if (body.message) {
                callback(body.message, undefined)
            } else if (body.features.length === 0) {
                callback('Not found! Try another location', undefined)
            } else {
                const data = body;
                const { features } = data;
                const { place_name, center } = features[0];
                callback(undefined, {
                    location: place_name,
                    longitude: center[0],
                    latitude: center[1]
                })
            }
        })
    }, 2000)
}

module.exports = geocode