// ==========================================
// Weather App
// ==========================================

// Your WeatherAPI key
const API_KEY = "2c6020ad0b3c44d7a49151703261408";

// API URL
const API_URL = "https://api.weatherapi.com/v1/forecast.json";

// DOM Elements

const locationInput =
    document.getElementById("locationInput");

const searchBtn =
    document.getElementById("searchBtn");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const weatherContainer =
    document.getElementById("weatherContainer");

const cityName =
    document.getElementById("cityName");

const countryName =
    document.getElementById("countryName");

const localTime =
    document.getElementById("localTime");

const weatherIcon =
    document.getElementById("weatherIcon");

const temperature =
    document.getElementById("temperature");

const temperatureValue =
    document.getElementById("temperatureValue");

const weatherCondition =
    document.getElementById("weatherCondition");

const humidity =
    document.getElementById("humidity");

const aqi =
    document.getElementById("aqi");

const aqiStatus =
    document.getElementById("aqiStatus");

const pressure =
    document.getElementById("pressure");

const uvIndex =
    document.getElementById("uvIndex");

const visibility =
    document.getElementById("visibility");

const sunrise =
    document.getElementById("sunrise");

const sunset =
    document.getElementById("sunset");


// ==========================================
// Get Weather
// ==========================================

async function getWeather(location) {

    try {

        showLoading();

        const url =
            `${API_URL}?key=${API_KEY}` +
            `&q=${encodeURIComponent(location)}` +
            `&days=1` +
            `&aqi=yes`;

        const response =
            await fetch(url);

        const data =
            await response.json();

        // WeatherAPI returns an error object
        // when the location is invalid.

        if (!response.ok || data.error) {

            throw new Error(
                data.error?.message ||
                "Unable to find this location."
            );

        }

        displayWeather(data);

    } catch (error) {

        showError(error.message);

    }

}


// ==========================================
// Display Weather
// ==========================================

function displayWeather(data) {

    const current =
        data.current;

    const location =
        data.location;

    const today =
        data.forecast.forecastday[0];

    const astro =
        today.astro;

    // Location

    cityName.textContent =
        location.name;

    countryName.textContent =
        `${location.region}, ${location.country}`;

    localTime.textContent =
        `Local Time: ${location.localtime}`;


    // Temperature

    temperature.textContent =
        Math.round(current.temp_c);

    temperatureValue.textContent =
        `${current.temp_c} °C`;


    // Weather Condition

    weatherCondition.textContent =
        current.condition.text;


    // Weather Icon

    weatherIcon.src =
        "https:" +
        current.condition.icon;

    weatherIcon.alt =
        current.condition.text;


    // Humidity

    humidity.textContent =
        `${current.humidity}%`;


    // Air Pressure

    pressure.textContent =
        `${current.pressure_mb} mb`;


    // UV Index

    uvIndex.textContent =
        current.uv;


    // Visibility

    visibility.textContent =
        `${current.vis_km} km`;


    // Sunrise

    sunrise.textContent =
        astro.sunrise;


    // Sunset

    sunset.textContent =
        astro.sunset;


    // Air Quality Index

    if (current.air_quality) {

        const usEPAIndex =
            current.air_quality["us-epa-index"];

        aqi.textContent =
            usEPAIndex;

        aqiStatus.textContent =
            getAQIStatus(usEPAIndex);

    } else {

        aqi.textContent = "N/A";

        aqiStatus.textContent =
            "AQI unavailable";
    }


    // Show weather container

    weatherContainer.classList.remove("hidden");

    errorMessage.classList.add("hidden");

    loading.classList.add("hidden");

}


// ==========================================
// AQI Status
// ==========================================

function getAQIStatus(index) {

    switch (index) {

        case 1:
            return "Good";

        case 2:
            return "Moderate";

        case 3:
            return "Unhealthy for Sensitive Groups";

        case 4:
            return "Unhealthy";

        case 5:
            return "Very Unhealthy";

        case 6:
            return "Hazardous";

        default:
            return "Unknown";

    }

}


// ==========================================
// Loading State
// ==========================================

function showLoading() {

    loading.classList.remove("hidden");

    errorMessage.classList.add("hidden");

    weatherContainer.classList.add("hidden");

}


// ==========================================
// Error State
// ==========================================

function showError(message) {

    loading.classList.add("hidden");

    weatherContainer.classList.add("hidden");

    errorMessage.textContent =
        message;

    errorMessage.classList.remove("hidden");

}


// ==========================================
// Search Button
// ==========================================

searchBtn.addEventListener(
    "click",
    () => {

        const location =
            locationInput.value.trim();

        if (location === "") {

            showError(
                "Please enter a location."
            );

            return;
        }

        getWeather(location);

    }
);


// ==========================================
// Enter Key Search
// ==========================================

locationInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            searchBtn.click();

        }

    }
);


// ==========================================
// Default Weather
// ==========================================

getWeather("London");