import _ from "lodash";
import { ReportInfo } from "../types/interfaces";

interface List {
  list: Array<ReportInfo>;
}

export default function WeatherTable({ list }: List) {
  // look at the day time weather
  const dayData = _.filter(list, (data) => data.sys.pod === "d");
  return (
    <div className="weather-list">
      {_.map(dayData, (data: ReportInfo) => {
        const time = new Date(data.dt * 1000).toLocaleString("en-US");
        return (
          <div key={data.dt} className="weather-item">
            <div>{time}</div>
            <div>Temp: {data.main.temp}</div>
            <div>Wind Speed: {data.wind.speed}mph</div>
            <div>Wind Gust: {data.wind.gust}mph</div>
            {_.map(data.weather, (weather) => {
              return (
                <>
                  <div> Weather: {weather.description} </div>
                </>
              );
            })}
            <div>Probability of Precipitation: {data.pop}</div>
            <div>visibility: {data.visibility}</div>{" "}
            {/* if below 0.5km yellow if below 0.1km red  */}
            <div>Humidity: {data.main.humidity}</div>
            {data.rain && <div>Rain: {data.rain["3h"]}</div>}
            {data.snow && <div>Snow: {data.snow["3h"]}</div>}
          </div>
        );
      })}
    </div>
  );
}
