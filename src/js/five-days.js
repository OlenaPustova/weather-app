import { marcupSectionMore } from "./marcup";
import { getNameDay, getNumberDay, getNameMounth } from "./date";
import { glideDays, glideHours } from "./glide-settings";
import sprite from "../images/symbol-defs.svg";
import refs from "./refs/";
import { marcupToday } from "./marcup";

export function marcupDays(dataDay, dataDays) {
  refs.homeContainer.innerHTML = "";

  const dateNow = Date.now();
  let dayOfWeek = "";
  let tempMin;
  let tempMax;
  let counter = 0;
  const marcup = `
  <div class="five-days__header">
  <span class="five-days__city">${dataDay.name}, ${dataDay.sys.country}</span>
  <div>
    <button class="home-today-btn home-btn ">TODAY</button>
    <button class="home-days-btn home-btn" disabled>5 DAYS</button>
  </div>
  </div>
  <div class="five-days">
  <span class="five-days__city-mobile">${dataDay.name}, ${
    dataDay.sys.country
  }</span>
  <div class="glide-days">
  <div class="glide__track" data-glide-el="track">
  <ul class="five-days__list glide__slides">
  ${dataDays.list
    .slice(0, 40)
    .map((day, index) => {
      if (getNameDay(day.dt) != getNameDay(dateNow)) {
        dayOfWeek = getNameDay(day.dt);
        if (dayOfWeek == getNameDay(day.dt)) {
          if (tempMin == undefined || tempMin > day.main.temp_min) {
            tempMin = day.main.temp_min;
          }
          if (tempMax == undefined || tempMax < day.main.temp_max) {
            tempMax = day.main.temp_max;
          }
          counter += 1;
        }
        if (counter == 8 || index == 39) {
          counter = 0;
          let tempMinField = tempMin;
          let tempMaxField = tempMax;
          tempMin = undefined;
          tempMax = undefined;

          return `<li class="five-days__item glide__slide">
          <span class="five-days__day">${getNameDay(day.dt)}</span>
          <span class="five-days__date">${getNumberDay(day.dt)} ${getNameMounth(
            day.dt
          )}</span>
          <img class="five-days__icon"src="https://openweathermap.org/img/wn/${
            day.weather[0].icon
          }.png" width="35" height="35"/>
          <div class="five-days__flex-container">
          <div class="five-days__temp-container">
          <span class="five-days__temp-name">min</span>
          <span class="five-days__temp">${Math.round(tempMinField)}&deg;</span>
          </div>
          <div class="five-days__temp-container">
          <span class="five-days__temp-name">max</span>
          <span class="five-days__temp">${Math.round(tempMaxField)}&deg;</span>
          </div>
          </div>
          <button class="five-days__btn-more" data-index=${index} data-dt="${getNumberDay(
            day.dt
          )}">more info</button>
          </li>`;
        }
      }
    })
    .join("")}
  </ul>
  </div>
  <div class="glide__arrows mobile" data-glide-el="controls">
    <button class="glide__arrow mobile glide__arrow--left" data-glide-dir="<">&#10094;</button>
    <button class="glide__arrow mobile glide__arrow--right" data-glide-dir=">">&#10095;</button>
  </div>
  </div>
  <div class="five-days__more-container"></div>
  </div>`;

  refs.fiveDaysNode.innerHTML = marcup;

  refs.btnShowChartNode.classList.remove("hidden");

  const fiveDaysNodeList = document.querySelector(".five-days__list");
  fiveDaysNodeList.addEventListener("click", marcupSectionMore);

  glideDays.mount();

  document.querySelector(".home-today-btn").addEventListener("click", () => {
    marcupToday();
  });
}

export function marcupMore(e, data) {
  if (e.target.nodeName !== "BUTTON") return;

  const moreNode = document.querySelector(".five-days__more-container");
  refs.fiveDaysNode.classList.add("animation");
  document.querySelector(".chart").classList.add("animation");

  let positionDate = 0;
  for (const item of data.list) {
    if (Number(item.dt_txt.slice(8, 10)) === Number(e.target.dataset.dt)) {
      break;
    }
    positionDate++;
  }

  const marcup = `
  <div class="glide-hours">
  <div class="glide__track" data-glide-el="track">
  <ul class="five-days__list glide__slides">
${data.list
  .slice(positionDate, positionDate + 8)
  .map((day) => {
    return `<li class="five-days__item-more glide__slide">
<span class="five-days__time-more">${day.dt_txt.slice(11, 16)}</span>
<img class="five-days__icon"src="http://openweathermap.org/img/w/${
      day.weather[0].icon
    }.png" width="35" height="35"/>
<span class="five-days__temp2">${Math.round(day.main.temp)}&deg;</span>
<div class="five-days__statistics-more-container">
<div class="five-days__statistics-more">
<svg width="20" height="20">
<use href=${sprite}#barometer></use>
</svg>
<span class="five-days__value-more">${day.main.pressure}mm</span>
</div>
<div class="five-days__statistics-more">
<svg width="20" height="20">
<use href=${sprite}#humidity></use>
</svg>
<span class="five-days__value-more">${day.main.humidity}%</span>
</div>
<div class="five-days__statistics-more">
<svg width="20" height="20">
<use href=${sprite}#wind></use>
</svg>
<span class="five-days__value-more">${day.wind.speed.toFixed(1)} m/s</span>
</div>
</div>
</li>`;
  })
  .join("")}
</ul>
</div>
<div class="glide__arrows tablet" data-glide-el="controls">
    <button class="glide__arrow tablet glide__arrow--left" data-glide-dir="<">	
    &#10094;</button>
    <button class="glide__arrow tablet glide__arrow--right" data-glide-dir=">">	
    &#10095;</button>
  </div>
  <div class="glide__bullets" data-glide-el="controls[nav]">
  <button class="glide__bullet" data-glide-dir="=0"></button>
  <button class="glide__bullet" data-glide-dir="=1"></button>
  <button class="glide__bullet" data-glide-dir="=2"></button>
  <button class="glide__bullet" data-glide-dir="=3"></button>
  <button class="glide__bullet" data-glide-dir="=4"></button>
  <button class="glide__bullet" data-glide-dir="=5"></button>
</div>
</div>
`;

  const list = document.querySelector(".five-days__list").children;
  console.log(list);
  for (let i = 0; i < list.length; i++) {
    console.log(e);
    console.log(e.target);
    console.log(e.target.dataset);
    if (i === Number(e.target.dataset.index)) {
      list[i].classList.add("active");
    } else {
      list[i].classList.remove("active");
    }
  }

  setTimeout(() => {
    moreNode.classList.add("five-days__more-container--margin");
    moreNode.innerHTML = marcup;
    glideHours.mount();
  }, 600);
}
