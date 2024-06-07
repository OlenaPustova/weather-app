import sprite from "../images/symbol-defs.svg";

export function markupHomeDay(data) {
  const day = new Date(data.dt * 1000);
  const timezone = data.timezone * 1000;

  const currentPlaceTime = convertTimezone(day, timezone);
  const numberDay = currentPlaceTime.getDate();

  const ordinalNum = addNth(numberDay);
  const weekDay = getNameDayHome(currentPlaceTime);

  const sunrise = new Date(data.sys.sunrise * 1000);
  const currentPlaceSunrise = convertTimezone(sunrise, timezone);
  const sunriseHours = currentPlaceSunrise.getHours();
  const sunriseMinutes = currentPlaceSunrise.getMinutes();

  const sunset = new Date(data.sys.sunset * 1000);
  const currentPlaceSunset = convertTimezone(sunset, timezone);
  const sunsetHours = currentPlaceSunset.getHours();
  const sunsetMinutes = currentPlaceSunset.getMinutes();

  const month = getNameMonthHome(day);

  clock(data);
  return `
  <div class="home-day home-info-field">
  <p class="home-date">${numberDay}<sup>${ordinalNum} </sup>${weekDay}</p>
      <div class="home-wrap-info">
        <div class="home-wrap-date">
          <p class="home-month">${month}</p>
          <p class="home-time"></p>
        </div>
        <div class="home-wrap-sun">
          <div class="home-wrap-sunrise">
            <svg class="icon-home-sunrise" width="20" height="20">
              <use href=${sprite}#icon-home-sunrise></use>
            </svg>
            <p class="home-sunrise">${addLeadingZero(
              sunriseHours
            )}:${addLeadingZero(sunriseMinutes)}</p>
          </div>
          <div class="home-wrap-sunset">
            <svg class="icon-home-sunset" width="20" height="20">
              <use href=${sprite}#icon-home-sunset></use>
            </svg>
            <p class="home-time">${addLeadingZero(
              sunsetHours
            )}:${addLeadingZero(sunsetMinutes)}</p>
          </div>
        </div>
      </div>
      </div>`;
}

function addNth(numberDay) {
  if (numberDay > 3 && numberDay < 21) return "th";
  switch (numberDay % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function getNameDayHome(date) {
  const weekDay = date.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = "";
  days.forEach((item, ind) => {
    if (weekDay === ind) {
      day = item;
    }
  });
  return day;
}

function getNameMonthHome(date) {
  const monthNum = date.getMonth();
  let month = "";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  months.forEach((item, ind) => {
    if (monthNum === ind) {
      month = item;
    }
  });
  return month;
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

export let timeId = null;

function clock(data) {
  clearInterval(timeId);
  timeId = setInterval(function () {
    const day = new Date();
    const timezone = data.timezone * 1000;
    const currentPlaceTime = convertTimezone(day, timezone);

    const clock = document.querySelector(".home-time");
    clock.innerHTML = currentPlaceTime.toLocaleTimeString();
  }, 1000);
}

function convertTimezone(time, timezone) {
  const currentTimeZoneSR = time.getTimezoneOffset() * 60 * 1000;
  const dayUTCsr = time.getTime() + currentTimeZoneSR;
  const currentPlaceTime = new Date(dayUTCsr + timezone);
  return currentPlaceTime;
}
