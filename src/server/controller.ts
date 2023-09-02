import 'reflect-metadata'
import { type MiddlewareType } from '.'

export function Controller (path: string, version?: number) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Function) {
    if (process.env.NODE_ENV !== 'production') {
      if (!path.startsWith('/')) {
        console.warn(
          `⚠ The path of the endpoint '${path}' must start with /. Solve it before entering in a production environment`
        )
        path = '/' + path
      }
    }

    Reflect.defineMetadata('path', path, target)
    if (version !== undefined) Reflect.defineMetadata('version', version, target)
  }
}

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS'
}

export function FactoryHTTPDecorator (metodo: string, route?: string) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata('httpMethod', metodo, target, propertyKey)
    Reflect.defineMetadata('route', route, target, propertyKey)

    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args)
      return result
    }
  }
}

export function Get (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.GET, route)
}

export function Post (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.POST, route)
}

export function Put (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.PUT, route)
}

export function Delete (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.DELETE, route)
}

export function HEAD (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.HEAD, route)
}

export function OPTIONS (route?: string): MethodDecorator {
  return FactoryHTTPDecorator(HTTPMethods.OPTIONS, route)
}

export function Middleware (middlewares: MiddlewareType | MiddlewareType[]) {
  return function (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ) {
    const middlewareArray = Array.isArray(middlewares) ? middlewares : [middlewares]
    Reflect.defineMetadata('middlewares', middlewareArray, descriptor !== undefined ? descriptor.value : target)
  }
}
