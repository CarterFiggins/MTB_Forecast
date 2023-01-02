import _ from "lodash";
import { ReportInfo, Weather, Wind } from "../types/interfaces";

interface List {
  list: Array<ReportInfo>;
}

type cssWarning =
  | "warning-green"
  | "warning-yellow"
  | "warning-orange"
  | "warning-red";

function calculateTemp(temp: number): cssWarning {
  if (temp >= 75 && temp <= 85) {
    return "warning-green";
  }
  if (temp >= 70 && temp <= 90) {
    return "warning-yellow";
  }
  if (temp >= 50 && temp <= 100) {
    return "warning-orange";
  }
  return "warning-red";
}

function calculateWeather(weather: Weather[], probability: number): cssWarning {
  if (_.some(weather, (data) => data.main === "Extreme")) {
    return "warning-red";
  }

  if (
    _.some(weather, (data) => data.main === "Clouds" || data.main === "Clear")
  ) {
    // check probability?
    return "warning-green";
  }

  const probPercentage = _.round(probability * 100);

  if (probPercentage <= 30) {
    return "warning-yellow";
  }

  if (probPercentage <= 50) {
    return "warning-orange";
  }

  return "warning-red";
}

function calculateWind(wind: Wind): cssWarning {
  if (wind.speed <= 25 && wind.gust <= 25) {
    return "warning-green";
  }
  if (wind.speed <= 32 && wind.gust <= 32) {
    return "warning-yellow";
  }
  if (wind.speed <= 46 && wind.gust <= 46) {
    return "warning-orange";
  }
  return "warning-red";
}

export default function WeatherTable({ list }: List) {
  // look at the day time weather
  // const dayData = _.filter(list, (data) => data.sys.pod === "d");
  const dayData = list
  return (
    <div className="weather-list">
      {_.map(dayData, (data: ReportInfo) => {
        const date = new Date(data.dt * 1000);
        const time = date.toLocaleTimeString("en-US");
        const weekday = date.toLocaleString("en-us", { weekday: "long" });
        const dateTime = date.toLocaleDateString("en-us");
        const tempClass = calculateTemp(data.main.temp);
        const weatherClass = calculateWeather(data.weather, data.pop);
        const windClass = calculateWind(data.wind);

        return (
          <div key={data.dt} className="weather-item">
            <h1>
              {weekday}
              <br />
              {time}
            </h1>
            <h2>{dateTime}</h2>
            <div className={`info-box ${tempClass}`}>
              <h2>{data.main.temp}°F</h2>
              <p>Humidity: {data.main.humidity}</p>
            </div>
            <div className={`info-box ${weatherClass}`}>
              <h2>Weather</h2>
              {_.map(data.weather, (weather) => {
                return <p>{weather.main} </p>;
              })}
              <p>Probability: {_.round(data.pop * 100)}%</p>
              {data.rain && <p>Rain: {data.rain["3h"]}</p>}
              {data.snow && <p>Snow: {data.snow["3h"]}</p>}
            </div>
            <div className={`info-box ${windClass}`}>
              <h2>Wind</h2>
              <p>Speed: {data.wind.speed}mph</p>
              <p>Gust: {data.wind.gust}mph</p>
            </div>
            {/* <div>visibility: {data.visibility}</div> */}
            {/* if below 0.5km yellow if below 0.1km red  */}
          </div>
        );
      })}
    </div>
  );
}
