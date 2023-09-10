import 'reflect-metadata'
import { getEnv } from '../utils/env'

export type Rules = Record<string, (value: any) => boolean>

/**
 * ValidateBody decorator to add validation rules for request body fields.
 * @param {Rules} [rules] - Optional validation rules for request body fields.
 */
export function ValidateBody (rules: Rules = {}): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    if (
      Object.keys(rules).length === 0 &&
      getEnv<string>('NODE_ENV', 'development') !== 'production'
    ) {
      const methodName = propertyKey.toString()
      const className = target.constructor.name
      console.warn(
        `⚠ No rules defined in decorator ValidateBody at method ${methodName} in controller ${className}`
      )
    }
    Reflect.defineMetadata('validateBodyRules', rules, descriptor.value ?? target.constructor)
  }
}
