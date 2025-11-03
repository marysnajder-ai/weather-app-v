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
  let data = response.data;
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temperature");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#current-date");

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
  if (data.time) {
    date = new Date(data.time * 1000);
  } else {
    date = new Date();
  }
  dateElement.innerHTML = formatDate(date);

  // --- LOAD FORECAST FOR DEFAULT ---
  let apiKey = "7d9d8aed460317f0t10f235204bb13o9";
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;

  axios
    .get(forecastUrl)
    .then(displayForecast)
    .catch((error) => console.error("Error fetching forecast:", error));
}

// ---- DISPLAY FORECAST ----
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";

  let forecastDays = response.data.daily;
  if (!forecastDays || forecastDays.length === 0) {
    forecastElement.innerHTML =
      "<p>Forecast data unavailable. Check API key or response structure.</p>";
    return;
  }
  let forecastHTML = "";

  forecastDays.slice(0, 5).forEach(function (day) {
    let date = new Date(day.time * 1000);
    let dayName = date.toLocaleDateString(undefined, { weekday: "short" });
    forecastHTML += `
      <div class="forecast-day">
        <p class="day-name">${dayName}</p>
        <img
          src="${day.condition.icon_url}"
          alt="${day.condition.description}"
    class="forecast-icon"
        />
        <p class="forecast-temps">
          <span class="max">${Math.round(day.temperature.maximum)}°</span>
          <span class="min">${Math.round(day.temperature.minimum)}°</span>
        </p>
          </div>
    `;
  });
  forecastElement.innerHTML = forecastHTML;
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
