import { setDataChart } from "../chart";

let charts = [];
export function markupChart(data) {
  if (charts.length > 0) {
    charts.forEach((element) => element.destroy());
    charts = [];
  }

  const dataForChart = {
    dates: [],
    temperature: [],
    humidity: [],
    windSpeed: [],
    atmPress: [],
  };

  data.daily.slice(0, 5).forEach((day) => {
    dataForChart.dates.push(timeConverter(day.dt));
    dataForChart.temperature.push(Math.round(day.temp.day));
    dataForChart.humidity.push(day.humidity);
    dataForChart.windSpeed.push(Math.round(day.wind_speed));
    dataForChart.atmPress.push(day.pressure);
  });

  [
    "myChart-temperature",
    "myChart-humidity",
    "myChart-wind",
    "myChart-atmospherePressure",
  ].forEach((id) => {
    charts.push(setDataChart(id, dataForChart));
  });
}

function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = date + " " + month;
  return time;
}
