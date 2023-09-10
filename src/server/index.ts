import express, {
  type Request,
  type Application,
  type Response,
  type NextFunction
} from 'express'
import { type Algorithm } from 'jsonwebtoken'
import { router, type ControllerClass } from './router'
import { requestLogger } from '../middlewares/requestLogger'
import chalk from 'chalk'
import { FatalError } from '../custom/error'

/**
 * Represents a message function that returns a message indicating the server is running.
 * @param {number} port - The port on which the server is running.
 * @returns {string} A message indicating the server's running status.
 */
export type RunningMessage = (port: number) => string

/**
 * Represents JSON Web Token (JWT) settings for authentication.
 */
export interface JWTSettings {
  secret: string | { refresh: string, access: string }
  duration: string | { refresh: string, access: string }
  algorithm: Algorithm
}

/**
 * Represents settings for configuring the server.
 */
export interface ServerSettings {
  port: number
  apiDocumentation: boolean
  apiDocsPath: string
  runningMessage: RunningMessage
  logRequests: boolean
}

/**
 * Represents a middleware function.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {NextFunction} next - The Express NextFunction to pass control to the next middleware.
 */
export type MiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

/**
 * Abstract class for creating an AstralJS server.
 */
export abstract class Server {
  /**
   * Server settings.
   */
  public readonly settings: ServerSettings

  /**
   * The Express Application instance.
   */
  public readonly app: Application

  /**
   * An array of controller classes that define API endpoints.
   */
  public abstract controllers: ControllerClass[]

  /**
   * Constructor for the Server class.
   */
  constructor () {
    const defaultSettings: ServerSettings = {
      port: 3000,
      apiDocumentation: false,
      runningMessage: (port) => `${chalk.bgGreenBright(`Server running at http://localhost:${port}/`)}`,
      apiDocsPath: '/api/docs',
      logRequests: true
    }
    this.settings = { ...defaultSettings, ...this.getSettings() }

    this.app = express()

    if (this.settings.logRequests) this.app.use(requestLogger)
  }

  /**
   * Abstract method to get server-specific settings. Must be implemented by subclasses.
   * @returns {Partial<ServerSettings>} Partial server settings.
   */
  public abstract getSettings (): Partial<ServerSettings>

  /**
   * Adds a middleware function to the server.
   * @param {MiddlewareType} middleware - The middleware function to add.
   */
  protected addMiddleware (middleware: MiddlewareType): void {
    this.app.use(middleware)
  }

  /**
   * Implements the router for handling API routes.
   */
  private implementRouter (): void {
    if (this.controllers === undefined) {
      throw new FatalError(
        'No controllers were found. In the main server class overwrite the controllers param.'
      )
    }

    this.app.use(router(this.controllers, this.settings.apiDocumentation, this.settings.apiDocsPath))
  }

  /**
   * Boots up the server, listening on the specified port.
   */
  public bootstrap (): void {
    if (this.settings.port === undefined) {
      throw new FatalError('Server port is not defined')
    }

    const runningMessage = this.settings.runningMessage

    this.implementRouter()

    this.app.listen(this.settings.port, () => {
      if (runningMessage !== undefined) {
        console.log(runningMessage(this.settings.port))
      }
    })
  }
}
