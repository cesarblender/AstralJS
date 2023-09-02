import { Server, type ServerSettings } from '../src'

class TheNameOfYourServer extends Server {
  public getSettings (): Partial<ServerSettings> {
    return {}
  }
}

const server = new TheNameOfYourServer()

server.bootstrap()
