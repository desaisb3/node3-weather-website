const request = require('request')

const forecast = ((latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/46a582eb722658ff444d87b01c1eefba/'+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }
        else if(body.error){
            callback('Unable to find location!', undefined)
        }
        else{
            callback(undefined, 
                body.daily.data[0].summary + ' The Temperature is ' + body.currently.temperature
            )
        }


    })
})

module.exports = forecast