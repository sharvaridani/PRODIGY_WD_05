document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('location-input');
    const submitButton = document.getElementById('submit-location');
    const locationName = document.getElementById('location-name');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');

    const apiKey = '97a4e1496f2b46bb3b6982ac96ebafae';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    submitButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            alert('Please enter a location.');
        }
    });

    async function fetchWeather(location) {
        const apiEndpoint = `${apiUrl}?q=${location}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const data = await response.json();
            updateWeather(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            alert('Weather data not available. Please try again later.');
        }
    }

    function updateWeather(data) {
        locationName.textContent = data.name;
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherIcon.src = iconUrl;
        temperature.textContent = Math.round(data.main.temp);
        weatherDescription.textContent = data.weather[0].description;
    }
});
