// const jsondb = require('../config.json');
// const API_KEY = jsondb.API_KEY;
const API_KEY = "e0d09a127e3805cfc0df614328ce7619";
export const today = "weather";
export const fiveDays = "forecast";

// export async function getWeatherData(city, page = today) {
//   return await fetch(
//     // `https://api.openweathermap.org/data/2.5/${page}?q=${city}&appid=${API_KEY}&units=metric` ----original
//     // `https://api.openweathermap.org/data/2.5/today?q=paris&appid=${API_KEY}&units=metric`
//     // `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`
//     `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}&units=metric`
//     // `https://jsonplaceholder.typicode.com/users`
//   ).then((res) => {
//     if (!res.ok) return Promise.reject("404");
//     return res.json();
//   });
// }

// export async function oneCallApi(lat = 0, lon = 100) {
//   // export async function oneCallApi(lat, lon) {
//   return await fetch(
//     `https://api.openweathermap.org/data/2.5/onecall?lat=44.34&lon=10.99&appid=${API_KEY}&units=metric`
//     // `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric` -----original
//   ).then((res) => {
//     if (!res.ok) return Promise.reject("404");
//     return res.json();
//   });
// }

export async function getWeatherData(city, page = today) {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/${page}?q=${city}&appid=${API_KEY}&units=metric`
  ).then((res) => {
    if (!res.ok) return Promise.reject("404");
    return res.json();
  });
}

export async function oneCallApi(lat, lon) {
  return await fetch(
    // `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then((res) => {
    if (!res.ok) return Promise.reject("404");
    return res.json();
  });
}

// ? ----------------------------------------------------
async function marcupFiveDaysTEST() {
  try {
    const dataTEST = await getWeatherData("Kyiv", "forecast");
    console.log(dataTEST);

    dataTEST.list.map((day, index) => {
      // console.log(day.dt_txt);
    });
  } catch (error) {
    console.log("TEST catch error");
  }
}

marcupFiveDaysTEST();
// ?||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// // !!! my code

// export async function getForecastData(lat, lon) {
//   return await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//   ).then((res) => {
//     if (!res.ok) return Promise.reject("404");
//     return res.json();
//   });
// // }
// export async function oneCallApi(lat, lon) {
//   return await fetch(
//     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
//   ).then(res => {
//     if (!res.ok) return Promise.reject('404');
//     return res.json();
//   });
// }
