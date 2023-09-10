import chalk from 'chalk'

/**
 * Custom error class for environment variable-related errors.
 */
export class EnvError extends Error {
  constructor (message: string) {
    super()
    this.name = chalk.bgYellowBright.bold.black('Environment Variable Error')
    this.message = message
  }
}

/**
 * Custom error class for path-related errors.
 */
export class PathError extends Error {
  constructor (message: string) {
    super()
    this.name = chalk.bgYellowBright.bold.black('Path Error')
    this.message = message
  }
}

/**
 * Custom error class for router-related errors.
 */
export class RouterError extends Error {
  constructor (message: string) {
    super()
    this.name = chalk.bgMagentaBright.bold.black('Router Error')
    this.message = message
  }
}

/**
 * Custom error class for fatal errors.
 */
export class FatalError extends Error {
  constructor (message: string) {
    super()
    this.name = chalk.bgRedBright.bold.black('FATAL ERROR')
    this.message = message
  }
}

/**
 * Custom error class for auth-related errors.
 */
export class AuthError extends Error {
  constructor (message: string) {
    super()
    this.name = chalk.bgRedBright.bold.black('AuthError')
    this.message = message
  }
}
