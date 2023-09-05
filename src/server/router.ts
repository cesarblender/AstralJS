import { Router } from 'express'
import { type MiddlewareType } from '.'
import { type HTTPMethods } from './controller'
import { posix } from 'path'
import { genDocs } from 'src/docs/genDocs'

/**
 * Represents a class constructor for controllers.
 */
export type ControllerClass = new () => any

/**
 * Represents the return type for a controller method.
 */
export interface HandlerData {
  data: unknown
  status: number
}

/**
 * Represents an individual endpoint definition for a controller.
 */
export interface EndpointType {
  method: HTTPMethods
  route?: string
  middlewares?: MiddlewareType[]
  // eslint-disable-next-line @typescript-eslint/ban-types
  handler: Function
}

/**
 * Represents a controller definition with its associated endpoints.
 */
export interface ControllerType {
  path: string
  endpoints: EndpointType[]
  version?: number
  middlewares?: MiddlewareType[]
}

/**
 * Parses controller classes and their methods to extract routing information.
 * @param {ControllerClass[]} endpoints - An array of controller classes.
 * @returns {ControllerType[]} An array of parsed controller definitions.
 */
export function parseRoutes (endpoints: ControllerClass[]): ControllerType[] {
  const controllers: ControllerType[] = []

  endpoints.forEach((controller) => {
    const path: string | undefined = Reflect.getMetadata('path', controller)

    if (path === undefined) return

    const classMethods = Object.getOwnPropertyNames(controller.prototype)

    const controllerEndpoints: EndpointType[] = []

    classMethods.forEach((method) => {
      const httpMethod = Reflect.getMetadata(
        'httpMethod',
        controller.prototype,
        method
      )

      if (httpMethod === undefined) return

      controllerEndpoints.push({
        route: Reflect.getMetadata(
          'route',
          controller.prototype,
          method
        ) as string,
        method: httpMethod,
        middlewares: Reflect.getMetadata(
          'middlewares',
          controller.prototype,
          method
        ) as MiddlewareType[] | undefined,
        // eslint-disable-next-line new-cap
        handler: new controller()[method]
      })
    })

    controllers.push({
      path,
      middlewares: Reflect.getMetadata('middlewares', controller) as
        | MiddlewareType[]
        | undefined,
      version: Reflect.getMetadata('version', controller) as number | undefined,
      endpoints: controllerEndpoints
    })
  })

  return controllers
}

/**
 * Creates and configures an Express Router based on the parsed controller definitions.
 * @param {ControllerClass[]} endpoints - An array of controller classes.
 * @returns {Router} An Express Router with configured routes.
 */
export function router (
  endpoints: ControllerClass[],
  apiDocumentation: boolean,
  apiDocsPath: string
): Router {
  const controllers = parseRoutes(endpoints)

  const appRouter = Router()

  if (apiDocumentation) appRouter.use(genDocs(controllers, apiDocsPath))

  controllers.forEach((controller) => {
    controller.endpoints.forEach((endpoint) => {
      const allMiddlewares = [
        ...(controller.middlewares ?? []),
        ...(endpoint.middlewares ?? [])
      ]
      appRouter[endpoint.method](
        posix.join(controller.path, endpoint.route ?? ''),
        ...allMiddlewares,
        (req, res) => {
          const handlerData: HandlerData | undefined = endpoint.handler(
            req,
            res
          ) as HandlerData

          if (handlerData !== undefined) return res.json(handlerData)
        }
      )
    })
  })

  return appRouter
}
