import 'reflect-metadata'

import { type MiddlewareType } from '.'
import { PathError } from '../custom/error'

/**
 * Regular expression for validating paths.
 * The escape characters are important, so, we're accepting the characters . : - _ ; ,
 */
export const pathRegex =
  // eslint-disable-next-line no-useless-escape
  /^((\/)|(\/(?:[a-zA-Z0-9\.\:\-\_\;\,]+\/)*[a-zA-Z0-9\.\:\-\_\;\,]+))$/

/**
 * Controller decorator to define the base path and optional version for a controller class.
 * @param {string} path - The base path for the controller.
 * @param {number} [version] - Optional version number for the api controller.
 */
export function Controller (path: string, version?: number): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Function) {
    if (!pathRegex.test(path)) {
      throw new PathError(
        `❌ Illegal characters in path '${path}' of the controller ${target.name}. Verify if the path starts with '/' and does no end with '/'\nAllowed Characters: [a-z A-Z 0-9 . : - _ ; ,]`
      )
    }
    Reflect.defineMetadata('path', path, target)
    if (version !== undefined) {
      Reflect.defineMetadata('version', version, target)
    }
  }
}

/**
 * Enumeration of HTTP methods.
 */
export enum HTTPMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
}

/**
 * Factory function to create HTTP method decorators (e.g., @Get, @Post).
 * @param {string} method - The HTTP method (GET, POST, etc.).
 * @param {string} [route] - Optional route for the HTTP method.
 */
export function FactoryHTTPDecorator (method: string, route?: string) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    if (route !== undefined && route.length > 0 && !pathRegex.test(route)) {
      throw new PathError(
        `❌ Illegal characters in route '${route}' of the method ${target.name}. Verify if the path starts with '/' and does no end with '/'\nAllowed Characters: [a-z A-Z 0-9 . : - _ ; ,]`
      )
    }

    Reflect.defineMetadata('httpMethod', method, target, propertyKey)
    Reflect.defineMetadata('route', route, target, propertyKey)

    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args)
      return result
    }
  }
}

/**
 * HTTP GET method decorator.
 * @param {string} [route] - Optional route for the GET request.
 */
export function Get (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.GET, route)
}

/**
 * HTTP POST method decorator.
 * @param {string} [route] - Optional route for the POST request.
 */
export function Post (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.POST, route)
}

/**
 * HTTP PUT method decorator.
 * @param {string} [route] - Optional route for the PUT request.
 */
export function Put (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.PUT, route)
}

/**
 * HTTP DELETE method decorator.
 * @param {string} [route] - Optional route for the DELETE request.
 */
export function Delete (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.DELETE, route)
}

/**
 * HTTP HEAD method decorator.
 * @param {string} [route] - Optional route for the HEAD request.
 */
export function HEAD (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.HEAD, route)
}

/**
 * HTTP OPTIONS method decorator.
 * @param {string} [route] - Optional route for the OPTIONS request.
 */
export function OPTIONS (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.OPTIONS, route)
}

/**
 * Middleware decorator to define middleware functions for a controller or route.
 * @param {MiddlewareType | MiddlewareType[]} middlewares - The middleware function(s) to apply.
 */
export function Middleware (middlewares: MiddlewareType | MiddlewareType[]) {
  return function (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ) {
    const middlewareArray = Array.isArray(middlewares)
      ? middlewares
      : [middlewares]
    Reflect.defineMetadata(
      'middlewares',
      middlewareArray,
      descriptor !== undefined ? descriptor.value : target
    )
  }
}
