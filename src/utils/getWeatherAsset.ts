import cloud from '@assets/weather/cloud.svg';
import snow from '@assets/weather/snow.svg';
import winter from '@assets/seasons/winter.svg';

enum Weather {
  Cloud = 'cloud',
  Snow = 'snow',
}

interface WeatherData {
  asset: string;
  codes: number[];
}

const weatherData: Record<Weather, WeatherData> = {
  [Weather.Cloud]: { asset: cloud, codes: [1, 2, 3] },
  [Weather.Snow]: { asset: snow, codes: [71, 73, 75, 77, 85, 86] },
};

const weatherAsssetsMap = new Map<number, string>(
  Object.values(weatherData).flatMap(({ asset, codes }) =>
    codes.map((code) => [code, asset])
  )
);

export function getWeatherAsset(weatherCode: number): string {
  return weatherAsssetsMap.get(weatherCode) ?? winter;
}
