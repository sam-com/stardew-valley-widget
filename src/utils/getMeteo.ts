import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 45.4001,
  longitude: -71.8991,
  current: [
    'temperature_2m',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'weather_code',
  ],
  daily: ['sunrise', 'sunset'],
  timezone: 'America/New_York',
  forecast_days: 1,
};
const url = 'https://api.open-meteo.com/v1/forecast';

const bigIntToDate = (b: bigint) => new Date(Number(b) * 1000);

export type Meteo = {
  daylight: {
    sunrise: Date;
    sunset: Date;
  };
  weather: {
    weatherCode: number;
  };
};

export async function getMeteo(): Promise<Meteo> {
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const current = response.current()!;
  const daily = response.daily()!;

  const weatherCode = current.variables(5)!.value();

  const sunrise = daily.variables(0)!.valuesInt64(0)!;
  const sunset = daily.variables(1)!.valuesInt64(0)!;

  return {
    daylight: {
      sunrise: bigIntToDate(sunrise),
      sunset: bigIntToDate(sunset),
    },
    weather: {
      weatherCode,
    },
  };
}
