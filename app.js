document.addEventListener('DOMContentLoaded', () => {
  const apiKey = "e0d9626ed38aa5d2eee13b6ce17b61ec";

  const main = document.getElementById('main');
  const form = document.getElementById('form');
  const search = document.getElementById('search');

  const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  async function getWeatherByLocation(city) {
    try {
      const resp = await fetch(url(city), {
        origin: "cors"
      });
      if (!resp.ok) {
        throw new Error('Unable to fetch weather data. Please try again.');
      }
      const respData = await resp.json();
      addWeatherToPage(respData);
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      main.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
      <h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        ${temp}°C
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      </h2>
      <small>${data.weather[0].main}</small>
    `;

    // Cleanup
    main.innerHTML = "";
    main.appendChild(weather);
  }

  function Ktoc(K) {
    return Math.floor(K - 273.15);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
      getWeatherByLocation(city);
    }
  });
});
