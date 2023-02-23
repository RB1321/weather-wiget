class City {
  constructor(name) {
    this.name = name;
  }
  fetchWeather = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.name}&units=metric&APPID=5d066958a60d315387d9492393935c19`
    )
      .then((res) => res.json())
      .then((data) => (this.weather = data))
      .catch((error) => console.log(error));
    return this.weather;
  };

  widgetModel = async () => {
    this.weather = await this.fetchWeather();
    if (this.weather.cod === "404") {
      // alert('invalid city name')
      return 404;
    }
    this.clouds = this.weather.clouds.all;
    this.temp = this.weather.main.temp;
    this.desc = this.weather.weather[0].description;
    this.windSpeed = this.weather.wind.speed;
    this.iconLink = `https://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
    this.feelsLike = this.weather.main.feels_like;
    this.humidity = this.weather.main.humidity;
    this.element = document.createElement("div");
    this.element.classList.add("city-wrapper");
    this.element.innerHTML = `
          <h2>${this.name}</h2>
          <div class="icon-wrap">
          <img src="${this.iconLink}" alt="">
          </div>
          <div class="temperature">${this.temp}°C</div>
          <div class="description">${this.desc}</div>
          <div class="block-footer">
              <div class="wind">
                  <p>Wind</p>
                  <div class="wind-numb"> ${this.windSpeed} km/h</div>
              </div>
              <div class="clouds">
                  <p>Clouds</p>
                  <div class="clouds-num">${this.clouds}%</div>
              </div>
              <div class="humidity">
                  <p>Humidity</p>
                  <div class="humidity-numb">${this.humidity}%</div>
              </div>
              <div class="feels-like">
                  <p>Feels like</p>
                  <div class="feels-like-numb">${this.feelsLike}°C</div>
              </div>
          </div>
        `;
  };

  renderCity = async (container) => {
    await this.widgetModel();
    if (this.weather.cod === "404") {
      alert("invalid city name");
      return false;
    } else {
      container.append(this.element);
      return this;
    }
  };
}
let widgetContainer = document.querySelector(".widget-wrapper");
// let cityWeather = new City();
// new City("Paris").renderCity(container);

//SEARCH CITY WEATHER
let clearBtn = document.getElementById(`clear-button`);
let submitBtn = document.getElementById(`submit-city`);
let city;
let input = document.getElementById(`input-city`);
submitBtn.addEventListener("click", (e) => {
  if (!input.value) {
    alert("Enter city name!");
    return;
  } else {
    window.navigator.vibrate(50);
    e.preventDefault();
    new City(input.value).renderCity(widgetContainer);
  }
});
clearBtn.addEventListener("click", function () {
  widgetContainer.innerHTML = "";
});
