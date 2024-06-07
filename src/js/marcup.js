import { Notify } from "notiflix/build/notiflix-notify-aio";
// import { getWeatherData } from "./api-service";
import { getWeatherData, oneCallApi } from "./api-service";
import { success } from "./geolocation";
import { bgImg } from "./bg-api";
import { markupHomeWeather } from "./home-weather";
import { markupHomeDay, timeId } from "./home-day";
import { marcupDays, marcupMore } from "./five-days";
import { quoteMarkup, quote } from "./quote";
import { arrFavoriteCityName, cityName } from "./favorite-city";
import { glide } from "./glide-settings";
import { markupChart } from "./functions/markupChart";
import refs from "./refs/";

const nameRequest = arrFavoriteCityName[0] || "kyiv";
let cityValue = cityName;

const marcupBtn = `<div class="home-buttons">
<button class="home-today-btn home-btn" disabled>TODAY</button>
<button class="home-days-btn home-btn">5 DAYS</button>
</div>`;

export async function marcupFiveDays() {
  try {
    const data = await getWeatherData(cityValue || nameRequest, "forecast");
    const data2 = await oneCallApi(data.city.coord.lat, data.city.coord.lon);
    console.log(data);
    console.log(data2);

    clearInterval(timeId);
    // marcupDays(data, data2);

    // !-----------------------
    marcupDays(data2, data);
    // !-----------------------

    markupChart(data);
    bgImg(cityValue || nameRequest);
  } catch (err) {
    console.log("catch error");
    Notify.failure("Something wrong");
    // Notify.info("Invalid city name");
  }
}

export async function marcupSectionMore(e) {
  const data = await getWeatherData(cityValue || nameRequest, "forecast");
  console.log(data);
  console.log(e);
  marcupMore(e, data);
}

export async function marcupToday() {
  // console.log("333");
  try {
    const weatherData = await getWeatherData(
      cityValue || nameRequest,
      "weather"
    );

    // console.log("444");
    const data = await oneCallApi(weatherData.coord.lat, weatherData.coord.lon);
    // console.log("555 ");
    // console.log(data);
    // console.log("weatherData");
    // console.log(weatherData);
    // console.log("data");
    // console.log(data);
    // console.dir("666 ");
    // console.dir(weatherData);
    // console.dir(weatherData.coord.lat);
    // console.dir(weatherData.coord.lon);
    // console.log("777 ");
    // console.log(cityValue);

    const quoteData = await quote();

    const arr = [
      markupHomeWeather(weatherData, data),
      marcupBtn,
      markupHomeDay(weatherData),
      quoteMarkup(quoteData),
    ];
    document.querySelector(".five-days-container").innerHTML = "";
    refs.homeContainer.innerHTML = arr.join("");
    document
      .querySelector(".home-days-btn")
      .addEventListener("click", marcupFiveDays);
    bgImg(cityValue || nameRequest);
  } catch (err) {
    console.log("888  err");
    Notify.info("Invalid city name");
  }
}

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  refs.location.classList.remove("click-location");
  if (refs.input.value === "") return;

  cityValue = refs.input.value;

  if (document.querySelector(".home-days-btn")?.hasAttribute("disabled")) {
    console.log("111");
    marcupFiveDays();
  } else {
    console.log("222");
    marcupToday();
  }
});

refs.favoriteCityList.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const name = e.path[1].childNodes[1].textContent;
    const idxForRemove = arrFavoriteCityName.indexOf(name);

    arrFavoriteCityName.splice(idxForRemove, 1);
    localStorage.setItem("cityName", JSON.stringify(arrFavoriteCityName));

    e.target.closest("li").remove();
    glide.mount();
  }

  if (e.target.nodeName === "P") {
    refs.location.classList.remove("click-location");
    cityValue = e.target.textContent;

    refs.input.value = "";
    if (document.querySelector(".home-days-btn")?.hasAttribute("disabled")) {
      marcupFiveDays();
    } else {
      marcupToday();
    }
  }
});

document.querySelector("#search").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      refs.location.classList.add("click-location");
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const res = await success(lat, lon);

      if (res[0].components) {
        cityValue = res[0].components.city
          ? res[0].components.city
          : res[0].components.state.split(" ")[0];

        refs.input.value = cityValue;

        if (
          document.querySelector(".home-days-btn")?.hasAttribute("disabled")
        ) {
          marcupFiveDays();
        } else {
          marcupToday();
        }
      } else alert(`We are don't found your location!!!`);
    } catch (err) {}
  });
});

marcupToday();
