// ---- DATE FORMATTER ----
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
// ---- DISPLAY WEATHER ----
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}°C`;
  refreshWeather(response);
}

function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temperature");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;
  feelsLikeElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  descriptionElement.innerHTML = response.data.condition.description;
}

// ---- INITIALIZE DEFAULT CITY ----
function loadDefaultCity() {
  let defaultCity = "Madrid";

  let apiKey = "7d9d8aed460317f0t10f235204bb13o9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

// Load default city on page load
loadDefaultCity();

// ---- SEARCH BOX ----

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "7d9d8aed460317f0t10f235204bb13o9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

// ---- EVENT LISTENERS ----
let searchBox = document.querySelector("#search-box");
searchBox.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
