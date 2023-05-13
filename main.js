import { displayTime } from "./src/clock.js";
displayTime();
import { setupDarkMode } from "./src/darkmode.js";
setupDarkMode();
import fetchQuote from "./src/quotes.js";
import getRandomInt from "./src/utilities-function/getRandomInt.js";

// update the time every second
setInterval(displayTime, 1000);

// Load the Google Custom Search Engine script asynchronously
const script = document.createElement("script");
script.async = true;
script.src = "https://cse.google.com/cse.js?cx=12cc501042a7a47f0";
document.head.appendChild(script);

// Wait for the script to load
script.addEventListener("load", () => {
  // Get the search element from the HTML
  const searchElement = document.querySelector(".gcse-search");

  // Set the data-api-key attribute
  searchElement.setAttribute(
    "data-api-key",
    "AIzaSyDCCPQ4F535kWIbVLwDHFUWe7MAgyFsbKo"
  );
});

fetchQuote()
  .then((quoteData) => {
    const quoteContainer = document.getElementById("quote-container");
    const randomIndex = getRandomInt(0, quoteData.length - 1);
    quoteContainer.innerHTML = `
    <p>"${quoteData[randomIndex].text}"-</p>
    <h1>${quoteData[randomIndex].author}</h1>
    `;
  })

  .catch((error) => console.log(error));

// weather app
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = "692488d1368f536508ec5c101ba245f5";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const city = data.name;
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherElement = document.querySelector(".weather");
        weatherElement.classList.remove("loading");
        const cityElement = document.querySelector(".city");
        cityElement.textContent = `Weather in ${city}`;
        const tempElement = document.querySelector(".temp");
        tempElement.innerHTML = `${temp}&deg;C`;
        const iconElement = document.querySelector(".icon");
        iconElement.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${icon}.png`
        );
        const descriptionElement = document.querySelector(".description");
        descriptionElement.textContent = description;
        const humidityElement = document.querySelector(".humidity");
        humidityElement.textContent = `Humidity: ${humidity}%`;
        const windElement = document.querySelector(".wind");
        windElement.textContent = `Wind speed: ${windSpeed} km/h`;
      })
      .catch((error) => console.log(error));
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
