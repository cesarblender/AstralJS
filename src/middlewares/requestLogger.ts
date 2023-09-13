import { NextFunction, Response } from 'express'
import chalk from 'chalk'

import { Request } from '../definitions'

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now()
    res.on('finish', () => {
        const elapsed = Date.now() - start
        let elapsedColor = chalk.bgGreenBright
        if (elapsed > 5000) {
            elapsedColor = chalk.bgRedBright
        }
        console.log(
            `${chalk.bgYellow.black.bold(req.method)} ${chalk.green(
                req.originalUrl,
            )} -> ${chalk.bold(res.statusCode)} :: ${chalk.gray.bold(
                req.ipv4,
            )} time elapsed: ${elapsedColor.bold.blackBright(elapsed + ' ms')}`,
        )
    })

    next()
}
