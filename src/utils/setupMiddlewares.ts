import express, { Application } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import expressStaticGzip from 'express-static-gzip'

import { ServerSettings } from '../definitions'
import { requestLogger } from '../middlewares/requestLogger'
import { ipv4Parser } from '../middlewares/ipv4Parser'
import { xssProtection } from '../middlewares/xssProtection'
import { sqlInjectionProtection } from '../middlewares/sqlInjectionProtection'

/**
 * Setup server middlewares.
 */
export function setupMiddlewares(
    app: Application,
    settings: Partial<ServerSettings>,
): void {
    if (settings.ipv4Parser) app.use(ipv4Parser)
    if (settings.requestLogger) app.use(requestLogger)
    if (settings.jsonParser) app.use(express.json())
    if (settings.urlencoded) app.use(express.urlencoded({ extended: true }))
    if (settings.xssProtection) app.use(xssProtection)
    if (settings.sqlInjectionProtection) app.use(sqlInjectionProtection)
    if (settings.helmet) app.use(helmet(settings.helmetSettings))
    if (settings.compression) app.use(compression(settings.compressionSettings))
    if (settings.static?.path)
        app.use(
            expressStaticGzip(settings.static.path, settings.static?.settings),
        )
}
