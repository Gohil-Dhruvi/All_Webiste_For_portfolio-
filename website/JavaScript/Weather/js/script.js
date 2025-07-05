document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherContent = document.querySelector('.weather-content');
    const errorMessage = document.getElementById('errorMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');

    const cityName = document.getElementById('cityName');
    const currentDate = document.getElementById('currentDate');
    const weatherIcon = document.getElementById('weatherIcon');
    const currentTemp = document.getElementById('currentTemp');
    const weatherDesc = document.getElementById('weatherDesc');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const pressure = document.getElementById('pressure');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const visibility = document.getElementById('visibility');
    const forecastList = document.getElementById('forecastList');

    const API_KEY = 'e66672aa27d441b582618c8bdde77bc4';

    searchBtn.addEventListener('click', fetchWeather);
    cityInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    });

    fetchWeather('London');

    function fetchWeather(city) {
        const cityNameToFetch = city || cityInput.value.trim();

        if (!cityNameToFetch) {
            showError('Please enter a city name');
            return;
        }

        showLoading();

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameToFetch}&units=metric&appid=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayCurrentWeather(data);
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityNameToFetch}&units=metric&appid=${API_KEY}`);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Forecast data not available');
                }
                return response.json();
            })
            .then(forecastData => {
                displayForecast(forecastData);
                hideLoading();
                showWeatherContent();
            })
            .catch(error => {
                hideLoading();
                showError(error.message);
            });
    }

    function displayCurrentWeather(data) {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        const now = new Date();
        currentDate.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        currentTemp.textContent = Math.round(data.main.temp);
        weatherDesc.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        pressure.textContent = `${data.main.pressure} hPa`;

        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        sunrise.textContent = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        sunset.textContent = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].main;
    }

    function displayForecast(data) {
        forecastList.innerHTML = '';

        const dailyForecasts = data.list.filter(item => {
            const date = new Date(item.dt * 1000);
            return date.getHours() === 12;
        }).slice(0, 5);

        if (dailyForecasts.length === 0) {
            const days = {};
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString();
                if (!days[day]) {
                    days[day] = item;
                }
            });

            Object.values(days).slice(0, 5).forEach(item => {
                createForecastItem(item);
            });
        } else {
            dailyForecasts.forEach(item => {
                createForecastItem(item);
            });
        }
    }

    function createForecastItem(item) {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';

        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].main}" class="forecast-icon">
            <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
            <div class="forecast-desc">${item.weather[0].description}</div>
        `;

        forecastList.appendChild(forecastItem);
    }

    function showLoading() {
        loadingSpinner.style.display = 'flex';
        weatherContent.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    function hideLoading() {
        loadingSpinner.style.display = 'none';
    }

   function showWeatherContent() {
    weatherContent.style.display = 'block';
    errorMessage.classList.remove('d-block');
    errorMessage.classList.add('d-none');
}


   function showError(message) {
    errorMessage.classList.remove('d-none');
    errorMessage.classList.add('d-block');
    weatherContent.style.display = 'none';

    const title = errorMessage.querySelector('h4');
    const text = errorMessage.querySelector('p');

    if (title) title.textContent = message === 'City not found' ? 'City Not Found' : 'Error Occurred';
    if (text) text.textContent = message === 'City not found'
        ? 'Please check the city name and try again.'
        : message;
}

});
