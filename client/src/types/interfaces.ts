export interface Report {
  city: City;
  cnt: number;
  cod: string;
  list: Array<ReportInfo>;
  message: number;
}

export interface ReportInfo {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: Main;
  pop: number;
  sys: {
    pod: string;
  };
  visibility: number;
  weather: Array<Weather>;
  rain?: { "3h": number };
  snow?: { "3h": number };
  wind: Wind;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
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

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface City {
  coord: Coordinates;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}
