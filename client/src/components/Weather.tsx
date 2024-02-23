import { useEffect, useState } from "react";
import { ReportInterface } from "../types/interfaces";
import WeatherTable from "./WeatherTable";

export default function LoadWeather() {
  const [data, setData] = useState<ReportInterface | null>(null);

  useEffect(() => {
    fetch("/weather")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="weather-container">
      {data ? <Weather {...data} /> : <h1>Loading...</h1>}
    </div>
  );
}

export function Weather({ city, list }: ReportInterface) {
  const sunrise = new Date(city.sunrise * 1000).toLocaleTimeString("en-US");
  const sunset = new Date(city.sunset * 1000).toLocaleTimeString("en-US");
  return (
    <div>
      <h1>MTB 5 Day Forecast</h1>
      <h1>
        {city.name} {city.country}
      </h1>
      <div>
        <h2>Sunrise: {sunrise}</h2>
        <h2>Sunset: {sunset}</h2>
      </div>
      <WeatherTable list={list} />
    </div>
  );
}
