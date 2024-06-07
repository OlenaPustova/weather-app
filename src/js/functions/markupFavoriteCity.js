import refs from "../refs";

export function markupFavoriteListCity(cities) {
  const markup = cities
    .map(
      (city) => `
  <li class="favorite-city__item">
  <p class="favorite-city__text">${city}</p>
  <button class="favorite-city__del" type="button"></button>
  </li>`
    )
    .join("");
  refs.favoriteCityList.innerHTML = markup;
}

export function markupFavoriteCity(city) {
  const markup = `<li class="favorite-city__item">
  <p class="favorite-city__text">${city}</p>
  <button class="favorite-city__del" type="button"></button>
  </li>`;
  refs.favoriteCityList.insertAdjacentHTML("afterbegin", markup);
}
