// ---- DATE FORMATTER ----
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hours}:${minutes}`;
}

// ---- DISPLAY WEATHER ----
function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temperature");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#current-date");

  console.log(response.data); // debugging

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

  if (response.data.condition.icon_url) {
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" 
      class="weather-app-icon" 
      alt="${response.data.condition.description}" />`;
  }
  let date;
  if (response.data.time) {
    // If API provides a timestamp, use it
    date = new Date(response.data.time * 1000);
  } else {
    date = new Date();
  }
  dateElement.innerHTML = formatDate(date);
}

// ---- LOAD DEFAULT CITY ----
function loadDefaultCity() {
  let defaultCity = "Madrid";
  let apiKey = "7d9d8aed460317f0t10f235204bb13o9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

// ---- SEARCH BOX ----
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "7d9d8aed460317f0t10f235204bb13o9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

// ---- EVENT LISTENERS ----
document.querySelector("#search-box").addEventListener("submit", search);

// ---- INITIALIZE ----
loadDefaultCity();
