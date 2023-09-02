import { EnvError } from '../custom/error'

/**
 * Retrieves the value of an environment variable or a default value if not defined.
 *
 * @param {string} key - The name of the environment variable.
 * @param {T} defaultValue - The default value to return if the environment variable is not defined.
 * @returns {T} The value of the environment variable or the default value.
 * @throws {EnvError} If the environment variable is not defined and no default value is provided.
 */
export function getEnv<T> (key: string, defaultValue?: T): T {
  const variable = process.env[key]

  if (variable !== undefined) {
    return variable as T
  }

  if (defaultValue !== undefined) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`⚠ The variable ${key} is not defined in environment variables.`)
      console.warn(`⚠ Using default value for ${key} env variable.`)
    }

    return defaultValue
  }

  const noVariableNoDefaultMessage = `❌ Failed to load env variable ${key}. No default value was defined.`

  throw new EnvError(noVariableNoDefaultMessage)
}
