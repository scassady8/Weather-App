//Function to format the current date and time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

//Function to format the sunrise time
function formatSunriseTime(date) {
  let sunrisehour = date.getHours();
  if (sunrisehour < 10) {
    sunrisehour = `0${sunrisehour}`;
  }
  let sunriseminutes = date.getMinutes();
  if (sunriseminutes < 10) {
    sunriseminutes = `0${minutes}`;
  }
  return `${sunrisehour}:${sunriseminutes}`;
}

//Function to format the sunset time
function formatSunsetTime(date) {
  let sunsethour = date.getHours();
  if (sunsethour < 10) {
    sunsethour = `0${sunsethour}`;
  }
  let sunsetminutes = date.getMinutes();
  if (sunsetminutes < 10) {
    sunsetminutes = `0${sunsetminutes}`;
  }
  return `${sunsethour}:${sunsetminutes}`;
}

//Function to show current forecast for searched location
function showCurrentForecast(response) {
  let country = response.data.sys.country;
  let icon = document.querySelector("#current-weather-icon");
  let temperature = Math.round(response.data.main.temp);
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  let sunriseUTC = new Date(response.data.sys.sunrise * 1000);
  let sunsetUTC = new Date(response.data.sys.sunset * 1000);
  let city = response.data.name;
  let location = document.querySelector("h1");
  let currentDescription = document.querySelector("#current-description");
  let currentTemp = document.querySelector("#current-temperature");
  let humidity = document.querySelector("#humidity");
  let feelsLike = document.querySelector("#feels-like");
  let windSpeed = document.querySelector("#wind-speed");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  celsiusTemperature = response.data.main.temp;
  celsiusFeelsLikeTemperature = response.data.main.feels_like;
  location.innerHTML = `${city}, ${country}`;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentTemp.innerHTML = `${temperature}° C`;
  feelsLike.innerHTML = `${feelsLikeTemp}° C`;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  sunrise.innerHTML = formatSunriseTime(sunriseUTC);
  sunset.innerHTML = formatSunsetTime(sunsetUTC);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
}

//Function to load default city
function search(city) {
  let apiKey = "c6d74f51206d84d8baa8c0c74cb8a21c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentForecast);
}

//Search engine for a location
function submitLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#input-location").value;
  search(city);
}

//Get weather for current location
function captureLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let unit = `metric`;
  let apiKey = "c6d74f51206d84d8baa8c0c74cb8a21c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentForecast);
}

function submitCurrentLocation() {
  navigator.geolocation.getCurrentPosition(captureLocation);
}

//Convert temperature to C and F
function showCelsius() {
  let currentTemperature = document.querySelector("#current-temperature");
  let feelsLike = document.querySelector("#feels-like");
  let celsiusRoundedTemp = Math.round(celsiusTemperature);
  let celsiusRoundedFeelsLikeTemp = Math.round(celsiusFeelsLikeTemperature);
  currentTemperature.innerHTML = `${celsiusRoundedTemp}° C`;
  feelsLike.innerHTML = `${celsiusRoundedFeelsLikeTemp}° C`;
}

function showFarenheit() {
  let currentTemperature = document.querySelector("#current-temperature");
  let feelsLike = document.querySelector("#feels-like");
  let farenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let farenheitFeelsLikeTemperature = Math.round(
    (celsiusFeelsLikeTemperature * 9) / 5 + 32
  );
  currentTemperature.innerHTML = `${farenheitTemperature}° F`;
  feelsLike.innerHTML = `${farenheitFeelsLikeTemperature} ° F`;
}

let celsiusTemperature = null;
let celsiusFeelsLikeTemperature = null;

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

let inputForm = document.querySelector("#inputs-form");
inputForm.addEventListener("submit", submitLocation);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", submitCurrentLocation);

let celsiusButton = document.querySelector("#celsius-scale");
celsiusButton.addEventListener("click", showCelsius);

let farenheitButton = document.querySelector("#farenheit-scale");
farenheitButton.addEventListener("click", showFarenheit);

search("Trondheim");
