const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const app = express()
const hbs = require('hbs')


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs') //key, value
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//render view
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aditya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aditya',
        contact: '9521417653',
        email: 'aditya.prabhat1@learner.manipal.edu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'No locatin was found'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location: geoLocation} = {}) => {
        if (error){
            return res.send({error})
        }
        
        weather(latitude, longitude, (error, {temperature, weather, feelslike, location}) => {
            if (error){
                return res.send({error})
            }

            res.send({
                temperature,
                weather,
                feelslike,
                location
            })
        })
    }) 
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.',
        title: '404'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})