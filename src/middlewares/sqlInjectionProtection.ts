import { NextFunction, Response } from 'express'

import { Request } from '@/definitions'

export function sqlInjectionProtection(req: Request, res: Response, next: NextFunction) {
    sanitizeRequestData(req.body)
    sanitizeRequestData(req.query)
    sanitizeRequestData(req.params)
    next()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeRequestData(data: Record<string, any>) {
    if (typeof data === 'object') {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (typeof data[key] === 'string') {
                    if (containsSQLInjection(data[key])) {
                        throw new Error(
                            'SQL Injection attack detected.',
                        )
                    }
                } else if (typeof data[key] === 'object') {
                    sanitizeRequestData(data[key])
                }
            }
        }
    }
}

function containsSQLInjection(input: string) {
    const sqlPatterns = [
        /SELECT/i,
        /INSERT/i,
        /UPDATE/i,
        /DELETE/i,
        /DROP TABLE/i,
        /--/,
    ]

    return sqlPatterns.some((pattern) => pattern.test(input))
}
