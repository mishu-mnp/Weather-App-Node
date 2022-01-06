const express = require('express');
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js');

const app = express()


// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vaibhav Mishra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vaibhav Mishra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Feel Free',
        message: 'You can ask any of your doubts on given social media handles',
        name: 'Vaibhav Mishra'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'ERROR! Please provide an address'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'ERROR! ' + error
            })

        } else {
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: 'ERROR! ' + error
                    })
                } else {
                    res.send({
                        address: req.query.address,
                        forecast: forecastData,
                        location: location
                    })
                }
            })
        }
    })
})

app.get('/courses', (req, res) => {
    // console.log(req.query)
    // console.log(req.query.course)

    if (!req.query.course) {
        return res.send({
            error: 'ERROR! You must provide course name'
        })
    }

    res.send({
        courses: [{ course: req.query.course, duration: req.query.duration }]
    })
})

app.get('/help/test', (req, res) => {
    res.send('Help Test page')
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Vaibhav Mishra',
        errorMssg: 'Help article not found :('
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Vaibhav Mishra',
        errorMssg: 'Page Not found'
    })
})

app.listen(3000, () => {
    console.log('App listening at 3000')
});

