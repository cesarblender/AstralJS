/**
 * Enumeration of time units for JWT duration.
 */
export enum TimeUnits {
  seconds = 's',
  minutes = 'm',
  hours = 'h',
  days = 'd',
}

/**
 * Generates a JWT duration string by combining a numerical value and a time unit.
 * @param {number} time - The numerical value representing the duration.
 * @param {TimeUnits} timeUnit - The time unit (e.g., seconds, minutes) to use for the duration.
 * @returns {string} The JWT duration string in the format "{time}{timeUnit}" (e.g., "30s", "1h").
 */
export function JWTDuration (time: number, timeUnit: TimeUnits): string {
  return String(time) + timeUnit
}
