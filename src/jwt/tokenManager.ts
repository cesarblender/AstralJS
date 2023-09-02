export enum TimeUnits { seconds = 's', minutes = 'm', hours = 'h', days = 'd' }

export function JWTDuration (time: number, timeUnit: TimeUnits): string {
  return String(time) + timeUnit
}
