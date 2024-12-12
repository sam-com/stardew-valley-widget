import { isDateInvalid } from '@utils/isDateInvalid';

export interface GetClockHandRotationProps {
  current: Date;
  sunrise: Date;
  sunset: Date;
}

const maxAngle = 0; // Rotation after sunset
const minAngle = -180; // Rotation before sunrise
const startAngle = -155; // Rotation at sunrise
const endAngle = -60; // Rotation at sunset

export function getClockHandRotation({
  current,
  sunrise,
  sunset,
}: GetClockHandRotationProps) {
  if ([sunrise, sunset].some(isDateInvalid)) return minAngle;

  const sunriseTime = sunrise;
  const sunsetTime = sunset;

  const now = new Date(current);

  if (now < sunriseTime) {
    // Interpolate from minAngle (-180°) to startAngle (-155°) before sunrise
    const totalNightBeforeSunrise =
      sunriseTime.getTime() - new Date(sunriseTime).setHours(0, 0, 0, 0); // Midnight to sunrise
    const elapsedNight =
      now.getTime() - new Date(sunriseTime).setHours(0, 0, 0, 0);
    const fractionOfNight = elapsedNight / totalNightBeforeSunrise;
    return minAngle + fractionOfNight * (startAngle - minAngle);
  }

  if (now > sunsetTime) {
    // Interpolate from endAngle (-60°) to maxAngle (0°) after sunset
    const totalNightAfterSunset =
      new Date(sunsetTime).setHours(23, 59, 59, 999) - sunsetTime.getTime(); // Sunset to midnight
    const elapsedNight = now.getTime() - sunsetTime.getTime();
    const fractionOfNight = elapsedNight / totalNightAfterSunset;
    return endAngle + fractionOfNight * (maxAngle - endAngle);
  }

  // Calculate elapsed time as a fraction of total daylight duration
  const totalDaylight = sunsetTime.getTime() - sunriseTime.getTime(); // in milliseconds
  const elapsedTime = now.getTime() - sunriseTime.getTime(); // in milliseconds

  // Interpolate rotation angle for daylight hours
  const fractionOfDaylight = elapsedTime / totalDaylight;
  const rotation = startAngle + fractionOfDaylight * (endAngle - startAngle);

  return rotation;
}
