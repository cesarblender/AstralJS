import { EnvError } from '../src'
import { getEnv } from '../src/utils/env'

describe('getEnv', () => {
  beforeEach(() => {
    process.env = {}
  })

  it('should return the correct value if the environment variable is defined', () => {
    process.env.MY_VARIABLE = '123'

    const result = getEnv('MY_VARIABLE')

    expect(result).toEqual('123')
  })

  it('Should return the default value', () => {
    const defaultValue = 'valor-por-defecto'

    process.env.NODE_ENV = 'production'

    const result = getEnv('MI_VARIABLE_INEXISTENTE', defaultValue)

    expect(result).toEqual(defaultValue)
  })

  it('Should throw error', () => {
    expect(() => {
      getEnv('NO_ENV_VARIABLE_ASSIGNED_123')
    }).toThrowError(EnvError)
  })
})
