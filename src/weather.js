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
