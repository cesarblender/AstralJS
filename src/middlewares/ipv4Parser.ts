import { NextFunction, Response } from 'express'

import { Request } from '../definitions'

export function ipv4Parser(req: Request, res: Response, next: NextFunction) {
    let clientIP = req.ip
    if (clientIP === '::1') {
        clientIP = '127.0.0.1'
    } else if (clientIP.startsWith('::ffff:')) {
        clientIP = clientIP.split(':').pop() as string
    }

    req.ipv4 = clientIP

    next()
}
