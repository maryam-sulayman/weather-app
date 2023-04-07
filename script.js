let currentDate = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentDate.getDay()];
  let currentTime = currentDate.getHours();
  if (currentTime < 10) {
    currentTime = `${0}${currentTime}`;
  }
  let currentTimes = currentDate.getMinutes();
  if (currentTimes < 10) {
    currentTimes = `${0}${currentTimes}`;
  }

  let dateAndTime = document.querySelector("#current-date-and-time");
  dateAndTime.innerHTML = `${currentDay} ${currentTime}:${currentTimes}`;
}

formatDate();

function finalCity(event) {
  event.preventDefault();
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let city = document.querySelector("#city-name").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showLiveData);
  console.log(apiUrl);
}

function showLiveData(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  let weather = document.querySelector("#weather");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  h1.innerHTML = response.data.name;
  h2.innerHTML = `${temperature}°C`;
  weather.innerHTML = `Weather: ${response.data.weather[0].main}`;
  console.log(response.data);
}

let cityName = document.querySelector("#search-city-name");
cityName.addEventListener("submit", finalCity);

function liveLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
function showCurrentLocation(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  let weather = document.querySelector("#weather");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  h1.innerHTML = `${response.data.name}`;
  h2.innerHTML = `${temperature}°C`;
  weather.innerHTML = `Weather: ${response.data.weather[0].description}`;
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentLocation);
}

let liveLocationButton = document.querySelector("#live-location");
liveLocationButton.addEventListener("click", liveLocation);
