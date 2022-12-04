const iconElement = document.querySelector(".weather_icon")
const locationIcon = document.querySelector(".location_icon")
const tempElement = document.querySelector(".temperature p")
const descriptionElement = document.querySelector(".temperature_description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")


var input = document.getElementById("search")
let city = ""
let latitude = 0.0
let longitude = 0.0


input.addEventListener("keyup", function(event){

    if(event.keyCode ===13){
        event.preventDefault();

        city = input.value
        getSearchWeather(city)
        console.log (city)
    }
})
const weather = {}

weather.temperature ={
    unit: "celsius"
}

const KELVIN = 273

const key ='96c2732cbcc6881f8cd32ef34b4c0c79'

if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notificationElement.style.display ='block'
    notificationElement.innerHTML ='<p> This Browser Does not Support Geolocation </p>'
}

function setPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    getWeather(latitude,longitude)
}
locationIcon.addEventListener("click", function(event){
    console.log('hi')
    getWeather(latitude,longitude)
})

function showError(error) {
    notificationElement.style.display = "block"
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

function getSearchWeather(city) {
    let api = ` `



    fetch(api).then(function (response) {
        let data = response.json ()
        return data
    })
    .then(function (data) {
        weather.temperature.value = Math.floor(data.main.temperature-KELVIN)
        weather.description = data.weather[0].description
        weather.iconID = data.weather[0].icon
        weather.city = data.name 
        weather.country = data.sys.country
    })
    .then(function() {
displayWeather()
    })
}

function getWeather(latitude, longitude) {
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api).
    then(function (response) {
        let data = response.json ()
        return data
    })
    .then(function (data) {
        weather.temperature.value = Math.floor(data.main.temperature - KELVIN)
        weather.description = data.weather[0].description
        weather.iconID = data.weather[0].icon
        weather.city = data.name 
        weather.country = data.sys.country
    })
    .then(function() {
displayWeather()
    })
}

function displayWeather() {
    iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`
    tempElement.innerHTML =`${weather.temperature.value} *<span>C</span>`
    descriptionElement.innerHTML = weather.description
    locationElement.innerHTML=`${weather.city}, ${weather.country}`
}
/*
Dear Mr.Sadili,

There is a problem about weather information, it shows the location and description but not temprature.
If you give feedback on this issue, it would be helpful to understand my mistake.
Thank you in advance.

Best regards,
Sama Mustafazada
*/