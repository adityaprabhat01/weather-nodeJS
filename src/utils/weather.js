const request = require('request')



const weather = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6f4368be7fdaa8711164200a88c95a05&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if(error){
            return callback('No Internet Connection!', undefined)
        }
        else if(body.success === false){
            return callback('Unable to fetch weather for the given location.', undefined)
        }
        else{
            callback(undefined, {
                temperature: body.current.temperature,
                weather: body.current.weather_descriptions[0],
                feelslike: body.current.feelslike,
                location: body.location.name
            })
        }
    } )
}

module.exports = weather