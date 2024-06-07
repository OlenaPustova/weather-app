import { glide } from "./glide-settings";
import refs from "./refs";
import debounce from "lodash.debounce";
import {
  markupFavoriteListCity,
  markupFavoriteCity,
} from "./functions/markupFavoriteCity";

export let cityName = "";
export const arrFavoriteCityName = localStorage.getItem("cityName")
  ? JSON.parse(localStorage.getItem("cityName"))
  : [];

const widthOfUserScreen = window.innerWidth;
const num = arrFavoriteCityName.length;

markupFavoriteListCity(arrFavoriteCityName);

//? refs.input.addEventListener("input", (e) => {
//?   console.log(e.target.value);
//? });

//? refs.location.addEventListener("click", (e) => {
//?   console.log(e.view.clientInformation.geolocation.getCurrentPosition());
//? });

refs.input.addEventListener(
  "input",
  debounce((e) => {
    // console.log(e);
    if (e.target.value === "") return;
    cityName =
      e.target.value[0].toUpperCase() + e.target.value.slice(1).toLowerCase();
  }, 300)
);

refs.favoriteBtn.addEventListener("click", (e) => {
  if (!cityName) return;
  refs.input.value = "";
  refs.location.classList.remove("click-location");
  if (arrFavoriteCityName.includes(cityName)) return;

  arrFavoriteCityName.splice(0, 0, cityName);
  localStorage.setItem("cityName", JSON.stringify(arrFavoriteCityName));

  markupFavoriteCity(cityName);

  if (arrFavoriteCityName.length > 2 && widthOfUserScreen < 768)
    refs.btnNext.classList.remove("hidden");

  if (arrFavoriteCityName.length > 4 && widthOfUserScreen >= 768)
    refs.btnNext.classList.remove("hidden");

  glide.mount();
});

if (
  (widthOfUserScreen < 768 && num > 2) ||
  (widthOfUserScreen >= 768 && num > 4)
) {
  refs.btnNext.classList.remove("hidden");
}

glide.on("run.after", function () {
  const num = arrFavoriteCityName.length;
  const idx = glide.index;

  if (idx === 0) {
    refs.btnPrev.classList.add("hidden");
  } else refs.btnPrev.classList.remove("hidden");

  if (widthOfUserScreen >= 768) {
    if (idx >= num - 4) {
      refs.btnNext.classList.add("hidden");
    } else refs.btnNext.classList.remove("hidden");
  }

  if (widthOfUserScreen < 768) {
    if (idx >= num - 2) {
      refs.btnNext.classList.add("hidden");
    } else refs.btnNext.classList.remove("hidden");
  }
});

refs.btnNext.addEventListener("click", (e) => {
  e.stopImmediatePropagation();

  glide.go(">");
});

refs.btnPrev.addEventListener("click", (e) => {
  e.stopImmediatePropagation();

  glide.go("<");
});

glide.mount();
