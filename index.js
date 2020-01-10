require ('dotenv').config()
const fetch = require('node-fetch')


const weatherToken = process.env.WEATHER_API_TOKEN

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
//?zip=94040,us

weatherURL.searchParams.set('zip', '92129,us')
weatherURL.searchParams.set('APPID', weatherToken)
weatherURL.searchParams.set('units', 'imperial')

const getWeatherData = async () => {

    const resp = await fetch(weatherURL.toString())
    const body = await resp.json()
    return body  
}

//form a nice human readable string from 'body' json results...
const generateWeatherMessage = 
    weatherData => `Hi there! The Weather in ${weatherData.name}: ${weatherData.weather[0].description}. 
    Current temperature is ${weatherData.main.temp}, with a low temp of ${weatherData.main.temp_min}
     and a high of ${weatherData.temp_max}.`

const main  = async () => {
    const weatherData = await getWeatherData()
    const weatherString = generateWeatherMessage(weatherData)
    //console.log(weatherData)  //pipe raw json to console
    console.log(weatherString)  //pipe formatted json to console
}

main()

