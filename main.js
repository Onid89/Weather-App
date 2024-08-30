const weatherForm = document.querySelector('.Weather-App');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '0ae01207c1ea4675b91114110242608'; // Replace with your API key

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
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

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
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return '⛈️';
    case weatherId >= 300 && weatherId < 400:
      return '🌫️';
    case weatherId >= 500 && weatherId < 600:
      return '🌨️';
    case weatherId >= 600 && weatherId < 700:
      return '❄️';
    case weatherId >= 700 && weatherId < 800:
      return '🌫️';
    case weatherId === 800:
      return '☀️';
    case weatherId >= 801 && weatherId < 810:
      return '🌫️';
    default:
      return '';
  }
}

function displayError(message) {
  const errorDisplay = document.querySelector('.errorDisplay');
  errorDisplay.textContent = message;
  card.style.display = 'flex';
}
