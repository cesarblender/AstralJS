import { JWTDuration, TimeUnits } from '../src'

describe('JWTDuration', () => {
  it('should generate a valid JWT duration string for seconds', () => {
    const result = JWTDuration(30, TimeUnits.seconds)
    expect(result).toBe('30s')
  })

  it('should generate a valid JWT duration string for minutes', () => {
    const result = JWTDuration(1, TimeUnits.minutes)
    expect(result).toBe('1m')
  })

  it('should generate a valid JWT duration string for hours', () => {
    const result = JWTDuration(2, TimeUnits.hours)
    expect(result).toBe('2h')
  })

  it('should generate a valid JWT duration string for days', () => {
    const result = JWTDuration(3, TimeUnits.days)
    expect(result).toBe('3d')
  })

  it('should handle value 0 correctly', () => {
    const result = JWTDuration(0, TimeUnits.seconds)
    expect(result).toBe('0s')
  })

  it('should handle negative numbers correctly', () => {
    const result = JWTDuration(-1, TimeUnits.hours)
    expect(result).toBe('-1h')
  })

  it('should handle fractional values correctly', () => {
    const result = JWTDuration(0.5, TimeUnits.minutes)
    expect(result).toBe('0.5m')
  })

  it('should handle large values correctly', () => {
    const result = JWTDuration(1000, TimeUnits.days)
    expect(result).toBe('1000d')
  })
})
