import { NextFunction, Response } from 'express'
import xss from 'xss'

import { Request } from '@/definitions'

export function xssProtection(req: Request, res: Response, next: NextFunction) {
    req.body = sanitizeRequestData(req.body)
    req.query = sanitizeRequestData(req.query)
    next()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeRequestData(data: Record<string, any>) {
    if (typeof data === 'object') {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (typeof data[key] === 'string') {
                    data[key] = xss(data[key])
                } else if (typeof data[key] === 'object') {
                    data[key] = sanitizeRequestData(data[key])
                }
            }
        }
    }
    return data
}
