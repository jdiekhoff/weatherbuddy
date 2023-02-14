export interface CurrentWeather {
  coord: {
    lat: number;
    lon: number;
  },
  weather: [
    {
      id: number;
      main: string;
      description: string;
    }
  ],
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  }
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  }
  timezone: number;
  name: string;
}
