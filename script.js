
const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");

const weatherImg = document.getElementById("weather-img");
const temperature = document.querySelector(".temparature");
const description = document.querySelector(".description");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const locationNotFound =
    document.querySelector(".location-not-found");

const weatherBody =
    document.querySelector(".weather-body");

async function checkWeather(city) {

    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "3d1100abbfa509fde7198ec54adbf8f1";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const weatherData = await response.json();

        console.log(weatherData);

        if (weatherData.cod == "404") {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        temperature.innerHTML =
            `${Math.round(weatherData.main.temp)}°C`;

        description.innerHTML =
            weatherData.weather[0].description;

        humidity.innerHTML =
            `${weatherData.main.humidity}%`;

        windSpeed.innerHTML =
            `${weatherData.wind.speed} km/h`;

        
        console.log(weatherData.weather[0].main)

        switch (weatherData.weather[0].main) {

            case "Clouds":
                weatherImg.src = "assets/cloud.jpg";
                break;

            case "Clear":
                weatherImg.src = "assets/clear.jpg";
                break;

            case "rain":
                weatherImg.src = "assets/rain.jpg";
                break;

            case "mist":
                weatherImg.src = "assets/mist.jpg";
                break;

            case "snow":
                weatherImg.src = "assets/snow.jpg";
                break;

            default:
                weatherImg.src = "assets/cloud.jpg";
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to fetch weather data.");
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(inputBox.value);
    }
}); 