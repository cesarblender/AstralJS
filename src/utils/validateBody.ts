import { ValidationError } from '../errors'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function validateBody(
    body: Record<string, any>,
    schema: Record<string, any>,
) {
    const bodyKeys = Object.keys(body)
    const schemaKeys = Object.keys(schema)

    for (const bodyKey of bodyKeys) {
        if (!schemaKeys.includes(bodyKey)) {
            throw new ValidationError(`${bodyKey} is not a valid param`)
        }

        if (typeof body[bodyKey] !== typeof schema[bodyKey]) {
            throw new ValidationError(
                `The type of ${bodyKey} is not valid. Excepted: ${typeof schema[
                    bodyKey
                ]}`,
            )
        }
    }
}
