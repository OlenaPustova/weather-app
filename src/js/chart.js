import Chart from "chart.js/auto";

export function setDataChart(id, data) {
  //Global options
  Chart.defaults.font.family = "Lato";
  Chart.defaults.font.size = 14;
  Chart.defaults.plugins.legend.position = "top";
  Chart.defaults.borderColor = "rgb(255,255,255,0.2)";

  const dataChart = {
    //даты прогноза
    labels: data.dates,

    datasets: [
      {
        label: "— Temperature, C° ",
        data: data.temperature,
        backgroundColor: "#FF6B09",
        borderColor: "#FF6B09",
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const config = {
    type: "line",
    data: dataChart,

    options: {
      legend: {
        display: true,
        align: "start",
        labels: {
          color: "#ffffff",
        },
      },

      plugins: {
        legend: {
          display: false,
        },
        subtitle: {
          display: true,
          text: "Value of Indicator",
          color: "rgba(255, 255, 255, 0.54)",
          position: "left",
          align: "center",
        },
      },

      scales: {
        y: {
          min: Math.min(...data.temperature) - 1,
          max: Math.max(...data.temperature) + 1,
          ticks: {
            stepSize: 1,
          },
        },
      },
      //маштабирование до размера холста
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  switch (id) {
    case "myChart-humidity":
      dataChart.datasets = [
        {
          label: "— Humidity, %",
          data: data.humidity,

          backgroundColor: "#0906EB",
          borderColor: "#0906EB",
          cubicInterpolationMode: "monotone",
        },
      ];
      config.options.scales = {
        y: {
          min: Math.min(...data.humidity) - 1,
          max: Math.max(...data.humidity) + 1,
          ticks: {
            stepSize: 2,
          },
        },
      };
      break;

    case "myChart-wind":
      dataChart.datasets = [
        {
          label: "— Wind Speed, m/s",
          data: data.windSpeed,

          backgroundColor: "#EA9A05",
          borderColor: "#EA9A05",
          cubicInterpolationMode: "monotone",
        },
      ];
      config.options.scales = {
        y: {
          min: Math.min(...data.windSpeed) - 1,
          max: Math.max(...data.windSpeed) + 1,
          ticks: {
            stepSize: 1,
          },
        },
      };
      break;

    case "myChart-atmospherePressure":
      dataChart.datasets = [
        {
          label: "— Atmosphere Pressure, m/m",
          data: data.atmPress,

          backgroundColor: "#067806",
          borderColor: "#067806",
          cubicInterpolationMode: "monotone",
        },
      ];
      config.options.scales = {
        y: {
          min: Math.min(...data.atmPress) - 1,
          max: Math.max(...data.atmPress) + 1,
          ticks: {
            stepSize: 1,
          },
        },
      };
      break;

    default:
      break;
  }

  return new Chart(document.getElementById(id), config);
}
