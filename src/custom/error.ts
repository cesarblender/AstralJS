/**
 * Custom error class for environment variable-related errors.
 */
export class EnvError extends Error {
  /**
   * Creates an instance of EnvError with a specific error message.
   * @param {string} message - The error message describing the environment variable error.
   */
  constructor (message: string) {
    super()
    this.name = 'Environment Variable Error'
    this.message = message
  }
}

/**
 * Custom error class for path-related errors.
 */
export class PathError extends Error {
  /**
   * Creates an instance of PathError with a specific error message.
   * @param {string} message - The error message describing the path error.
   */
  constructor (message: string) {
    super()
    this.name = 'Path Error'
    this.message = message
  }
}

/**
 * Custom error class for router-related errors.
 */
export class RouterError extends Error {
  /**
   * Creates an instance of RouterError with a specific error message.
   * @param {string} message - The error message describing the path error.
   */
  constructor (message: string) {
    super()
    this.name = 'Router Error'
    this.message = message
  }
}
