import { type ControllerClass } from '../src'
import { Server, type ServerSettings } from '../src/server'

describe('MyServer', () => {
  class MyServer extends Server {
    public controllers: ControllerClass[] = []

    public getSettings (): Partial<ServerSettings> {
      return {
        port: 9092
      }
    }

    constructor () {
      super()

      this.addMiddleware((req, res, next) => {
        console.log('Everything well')
        next()
      })

      this.implementMiddlewares()
    }
  }

  it('should create an instance of MyServer', () => {
    const myServer = new MyServer()
    expect(myServer).toBeInstanceOf(MyServer)
  })

  it('should have custom port 9092', () => {
    const myServer = new MyServer()
    expect(myServer.settings.port).toBe(9092)
  })

  it('should have more than one middleware', () => {
    const myServer = new MyServer()
    expect(myServer.middlewares.length).toBeGreaterThanOrEqual(1)
  })
})
