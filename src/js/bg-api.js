function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function img(city) {
  return await fetch(
    `https://api.unsplash.com/search/photos/?client_id=LZvDZOjmJ3YNQFh2j9aXsuN6LDWTFwfPTOC_ddGKNmc&query=${city.toLowerCase()}&page=1&per_page=10&orientation=landscape`
  ).then((res) => {
    if (!res.ok) return Promise.reject("404");
    return res.json();
  });
}

export function bgImg(city) {
  if (localStorage.getItem(city))
    document.querySelector(
      "body"
    ).style.backgroundImage = `linear-gradient(0.56deg, #000000 -13.48%, rgba(0, 0, 0, 0) 78.75%), url(${
      localStorage.getItem(city).split(",")[getRandomNum(1, 10)]
    })`;
  else
    img(city)
      .then((res) => {
        return Object.entries(res);
      })
      .then((res) => {
        return res[2];
      })
      .then((res) => {
        if (res[1].length) return res[1];
        return Promise.reject("404");
      })
      .then((res) => res.map((elem) => elem.urls.regular))
      .then((data) => {
        document.querySelector("body").style.backgroundImage = `url(${
          data[getRandomNum(1, 10)]
        })`;
        localStorage.setItem(city, data);
      })
      .catch((err) => console.log(err));
}

// bgImg("Washington");
