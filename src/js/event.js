import refs from "./refs";
import { ChangeChartOption } from "./functions/changeChartLabel";

//появление кнопки Show Chard при переходе на 5 Days
document.querySelector(".home").addEventListener("click", (event) => {
  if (event.target.classList.contains("home-today-btn")) {
    refs.btnShowChartNode.classList.add("hidden");
    refs.chartWrapNode.classList.add("hidden");
    refs.fiveDaysNode.classList.remove("animation");
    document.querySelector(".chart").classList.remove("animation");
  }
});

// при нажатии на кнопку Show Chart отображаем график
refs.btnShowChartNode.addEventListener("click", () => {
  refs.btnShowChartNode.classList.toggle("hidden");
  refs.chartWrapNode.classList.toggle("hidden");
});

// при нажатии на кнопку Hide Chart прячем график
refs.btnHideChartNode.addEventListener("click", () => {
  refs.btnShowChartNode.classList.toggle("hidden");
  refs.chartWrapNode.classList.toggle("hidden");
});

// смена данных графика по нажатию на ярлык графика
document
  .querySelector(".chart-labels__list")
  .addEventListener("click", (event) =>
    ChangeChartOption(event.target.parentNode.id)
  );
