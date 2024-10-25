const weatherForm = document.querySelector('.Weather-App');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '0ae01207c1ea4675b91114110242608';
// Replace with your API key

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  } else {
    displayError('Please enter a city');
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not fetch weather data');
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    location: { name: city },
    current: {
      temp_c,
      humidity,
      condition: { text, code },
    },
  } = data;

  card.style.display = 'flex';

  const showCity = document.querySelector('.showCity');
  const temperature = document.querySelector('.temperature');
  const humidityElement = document.querySelector('.humidity');
  const descrDisplay = document.querySelector('.descrDisplay');
  const weatherEmoji = document.querySelector('.weatherEmoji');
  const errorDisplay = document.querySelector('.errorDisplay');

  showCity.textContent = city;
  temperature.textContent = `${temp_c}°C`;
  humidityElement.textContent = `Humidity: ${humidity}%`;
  descrDisplay.textContent = text;
  weatherEmoji.textContent = getWeatherEmoji(code);
  errorDisplay.textContent = '';
}

function getWeatherEmoji(weatherId) {
  switch (weatherId) {
    case 1000:
      return '☀️'; // Clear/Sunny
    case 1003:
    case 1006:
      return '⛅'; // Partly Cloudy
    case 1009:
      return '☁️'; // Overcast
    case 1030:
    case 1135:
    case 1147:
      return '🌫️'; // Mist/Fog
    case 1063:
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
      return '🌧️'; // Rain
    case 1066:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
      return '❄️'; // Snow
    case 1087:
      return '⛈️'; // Thunderstorm
    case 1273:
    case 1276:
      return '🌩️'; // Thunder with rain
    default:
      return '❓'; // Unknown weather
  }
}

function displayError(message) {
  const errorDisplay = document.querySelector('.errorDisplay');
  errorDisplay.textContent = message;
  card.style.display = 'flex';
}
