const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRpdHlhcHJhYmhhdCIsImEiOiJjazkza3hwNW0wMXczM21ydXN2eGptdnY3In0.kIzYy1jSdWIGtUGN8q6Anw'

    request( {url, json: true}, (error, {body}) => {

        if(error){
            callback('No Internet Connection!', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to fetch data for the given location.', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    } )
}


module.exports = geocode