import { isDateInvalid } from '@utils/isDateInvalid';
export interface IsNightTimeProps {
  current: Date;
  sunrise: Date;
  sunset: Date;
}

export function parseTimeString(timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function isNightTime({
  current,
  sunrise,
  sunset,
}: IsNightTimeProps): boolean {
  if ([sunrise, sunset].some(isDateInvalid)) return true;

  return current < sunrise || current > sunset;
}
