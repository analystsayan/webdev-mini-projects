const apiKey = "ff9fd558ea454839b59133326251002";
const apiUrl = "https://api.weatherapi.com/v1/forecast.json?key=";
const searchApiUrl = "http://api.weatherapi.com/v1/search.json?key=";

const searchInput = document.getElementById("location");
const searchBtn = document.getElementById("search-btn");
const suggestionsBox = document.getElementById("suggestions");

let suggestions = [];
let selectedIndex = -1;

// Detect and fetch weather for the user's current location
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
            },
            error => {
                console.error("Geolocation error:", error);
                alert("Location access denied. Please enter a location manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

function fetchWeatherByCoords(lat, lon) {
    fetch(`${apiUrl}${apiKey}&q=${lat},${lon}&days=10&aqi=yes&alerts=no`)
        .then(response => response.json())
        .then(data => {
            searchInput.value = `${data.location.name}, ${data.location.country}`; // Autofill input
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching location weather:", error);
            alert("Error fetching weather data. Please try again.");
        });
}

searchInput.addEventListener("input", fetchSuggestions);
searchInput.addEventListener("keydown", handleKeyboardNavigation);

function fetchSuggestions() {
    let query = searchInput.value.trim();
    if (query.length < 2) {
        suggestionsBox.style.display = "none";
        return;
    }

    fetch(`${searchApiUrl}${apiKey}&q=${query}`)
        .then(response => response.json())
        .then(data => {
            suggestions = data;
            showSuggestions();
        })
        .catch(error => console.error("Error fetching suggestions:", error));
}

function showSuggestions() {
    if (suggestions.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    let suggestionsHtml = suggestions.map((s, index) => 
        `<div class="suggestion-item ${index === selectedIndex ? 'active' : ''}" 
            data-location="${s.name}, ${s.country}">${s.name}, ${s.country}</div>`).join("");

    suggestionsBox.innerHTML = suggestionsHtml;
    suggestionsBox.style.display = "block";

    document.querySelectorAll(".suggestion-item").forEach((item, index) => {
        item.addEventListener("click", function () {
            searchInput.value = this.getAttribute("data-location");
            suggestionsBox.style.display = "none";
            fetchWeather();
        });
    });
}

function handleKeyboardNavigation(event) {
    if (event.key === "ArrowDown") {
        selectedIndex = (selectedIndex + 1) % suggestions.length;
        showSuggestions();
    } else if (event.key === "ArrowUp") {
        selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
        showSuggestions();
    } else if (event.key === "Enter") {
        event.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            searchInput.value = suggestions[selectedIndex].name + ", " + suggestions[selectedIndex].country;
        }
        suggestionsBox.style.display = "none";
        fetchWeather();
    }
}

function fetchWeather() {
    let location = searchInput.value;
    if (!location) {
        alert("Please enter a location");
        return;
    }

    fetch(`${apiUrl}${apiKey}&q=${location}&days=10&aqi=yes&alerts=no`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Error fetching weather data. Please try again.");
        });
}

function displayWeather(data) {
    document.getElementById("temperature").innerText = `${Math.round(data.current.temp_c)}°C`;
    document.getElementById("high-low").innerText = `High: ${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°C · Low: ${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°C`;

    // Hourly forecast
    let hourlyHtmlHeader = "<h3>Hourly Forecast</h3>";
    let hourlyHtml = "";
    let currentHour = new Date().getHours(); // Get current hour
    let hoursDisplayed = 0; // Count for 12-hour limit

    // Loop through both today’s and tomorrow’s forecast
    data.forecast.forecastday.forEach(day => {
        day.hour.forEach(hour => {
            let forecastDate = new Date(hour.time);
            let forecastHour = forecastDate.getHours();

            // If within the next 12 hours, display
            if (hoursDisplayed < 12 && (forecastDate > new Date() || forecastHour >= currentHour)) {
                let formattedTime = forecastDate.toLocaleTimeString([], { hour: '2-digit', hour12: true });
                hourlyHtml += `<div class="forecast-card hourly">
                ${Math.round(hour.temp_c)}°C
                <strong>${formattedTime}</strong> 
                </div>`;
                hoursDisplayed++;
            }
        });
    });

    document.getElementById("hourly-forecast-header").innerHTML = hourlyHtmlHeader;
    document.getElementById("hourly-forecast").innerHTML = hourlyHtml;

    // 10-day forecast
    let tenDayHtmlHeader = "<h3>10-Day Forecast</h3>";
    let tenDayHtml = "";

    data.forecast.forecastday.forEach((day, index) => {
        let dateObj = new Date(day.date);
        let dayName = index === 0 ? "Today" : dateObj.toLocaleDateString("en-GB", { weekday: 'long' }); // "Today" for the first item
        let dateFormatted = dateObj.toLocaleDateString("en-GB", { day: 'numeric', month: 'short' });

        tenDayHtml += `
            <div class="forecast-card ten-day">
                <strong>${dayName}, ${dateFormatted}</strong>
                ${Math.round(day.day.mintemp_c)}° / ${Math.round(day.day.maxtemp_c)}°
            </div>
        `;
    });

    document.getElementById("ten-day-forecast-header").innerHTML = tenDayHtmlHeader;
    document.getElementById("ten-day-forecast").innerHTML = tenDayHtml;


}
