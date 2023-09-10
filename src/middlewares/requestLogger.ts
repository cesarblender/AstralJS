import { type Request, type Response, type NextFunction } from 'express'
import chalk from 'chalk'

export function requestLogger (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now()

  res.on('finish', () => {
    const elapsed = Date.now() - start
    let elapsedColor = chalk.bgGreenBright

    if (elapsed > 5000) {
      elapsedColor = chalk.bgRedBright
    }

    console.log(
      `[${chalk.cyan(req.method)}] ${chalk.bold(req.ip)} ${chalk.green(
        req.originalUrl
      )} ${chalk.bold(res.statusCode)} ${elapsedColor.bold.blackBright(
        elapsed + ' ms'
      )}`
    )
  })
  next()
}
