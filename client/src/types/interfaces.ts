export interface ReportInterface {
  city: CityInterface;
  cnt: number;
  cod: string;
  list: Array<ReportInfoInterface>;
  message: number;
}

export interface ReportInfoInterface {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: MainInterface;
  pop: number;
  sys: {
    pod: string;
  };
  visibility: number;
  weather: Array<WeatherInterface>;
  rain?: { "3h": number };
  snow?: { "3h": number };
  wind: WindInterface;
}

export interface WeatherInterface {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainInterface {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

export interface WindInterface {
  speed: number;
  deg: number;
  gust: number;
}

export interface CoordinatesInterface {
  lat: number;
  lon: number;
}

export interface CityInterface {
  coord: CoordinatesInterface;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}
