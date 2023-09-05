import {
  type ControllerClass,
  type ControllerType,
  parseRoutes,
  router,
  Controller,
  Get
} from '../src'

@Controller('/example')
class ExampleController {
  @Get('/example')
  public getExample (): string {
    return 'Hello from ExampleController!'
  }
}

describe('parseRoutes', () => {
  it('should correctly parse controllers and routes', () => {
    const controllers: ControllerClass[] = [ExampleController]
    const result: ControllerType[] = parseRoutes(controllers)

    expect(result).toHaveLength(1)
    const controller = result[0]
    expect(controller.path).toBe('/example')
    expect(controller.endpoints).toHaveLength(1)

    const endpoint = controller.endpoints[0]
    expect(endpoint.method).toBe('get')
    expect(endpoint.route).toBe('/example')
    expect(typeof endpoint.handler).toBe('function')
  })
})

describe('router', () => {
  it('should configure routes correctly', () => {
    const controllers: ControllerClass[] = [ExampleController]
    const appRouter = router(controllers, false, '')

    expect(appRouter.stack).toHaveLength(1)
  })
})
