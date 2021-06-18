const path = require('path') //core node module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
console.log(partialsPath);

//Setup handlebars engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText: 'This is some helpful text!',
        name: 'Sanidhya Desai'
    })
})

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Sanidhya Desai'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Sanidhya Desai'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
             return res.send({error})   
            }

            res.send({
                location,
                forecast: forecastData,
                Address: req.query.address
            })
           
          })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search) //Property of request for query string
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404page',{
        title: 'Help',
        errorMessage: 'Help article not found',
        name: 'Sanidhya Desai'
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        errorMessage: 'Page not found!',
        title: '404',
        name: 'Sanidhya Desai'
    })
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})
