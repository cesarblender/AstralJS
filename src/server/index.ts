import express, {
  type Request,
  type Application,
  type Response,
  type NextFunction
} from 'express'
import { type Algorithm } from 'jsonwebtoken'

export type RunningMessage = (port: number) => string

export interface JWTSettings {
  secret: string | { refresh: string, access: string }
  duration: string | { refresh: string, access: string }
  algorithm: Algorithm
}

export interface ServerSettings {
  port: number
  apiDocumentation: boolean
  jwt: JWTSettings | false
  runningMessage: RunningMessage
}

export type MiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

export abstract class Server {
  public readonly middlewares: MiddlewareType[]
  public readonly settings: ServerSettings
  public readonly app: Application

  constructor () {
    const defaultSettings: ServerSettings = {
      port: 3000,
      apiDocumentation: false,
      runningMessage: (port) => `Server running at http://localhost:${port}/`,
      jwt: false
    }
    this.settings = { ...defaultSettings, ...this.getSettings() }

    this.middlewares = []

    this.app = express()
  }

  public abstract getSettings (): Partial<ServerSettings>

  protected addMiddleware (middleware: MiddlewareType): void {
    this.middlewares.push(middleware)
  }

  protected implementMiddlewares (): void {
    this.middlewares.forEach((middleware) => {
      this.app.use(middleware)
    })
  }

  public bootstrap (): void {
    if (this.settings.port === undefined) {
      throw new Error('Server port is not defined')
    }

    const runningMessage = this.settings.runningMessage

    this.app.listen(this.settings.port, () => {
      if (runningMessage !== undefined) {
        console.log(runningMessage(this.settings.port))
      }
    })
  }
}
