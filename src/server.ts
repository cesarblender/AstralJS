import express from 'express'
import { Server } from 'http'
import helmet from 'helmet'
import compression from 'compression'
import expressStaticGzip from 'express-static-gzip'

import { CreateServer, ServerSettings } from '@types'
import { runningMessage } from '@messages'
import { requestLogger } from '@middlewares/requestLogger'
import { ipv4Parser } from '@middlewares/ipv4Parser'
import { xssProtection } from '@middlewares/xssProtection'
import { sqlInjectionProtection } from '@middlewares/sqlInjectionProtection'

const defaultSettings: ServerSettings = {
    docs: true,
    docsPath: '/api/docs',
    errorLogger() {},
    errorResponseStructure(message, status) {
        return { message, status }
    },
    jsonParser: true,
    port: 3000,
    requestLogger: true,
    responseStructure(data, status, message) {
        return { data, status, message }
    },
    urlencoded: true,
    ipv4Parser: true,
    xssProtection: true,
    sqlInjectionProtection: true,
    helmet: true,
    compression: true,
}

/**
 * Creates an Express server instance.
 *
 * @returns {CreateServer} The server instance.
 */
export default function createServer(
    settings: Partial<ServerSettings> = defaultSettings,
): CreateServer {
    const app = express()

    // Middlewares
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

    // Router
    // TODO: implement a router

    let server: Server | null = null

    return {
        /**
         * Starts the Express server on port 3000.
         *
         * @returns {Server} The HTTP server.
         */
        start(): Server {
            server = app.listen(settings.port, () => {
                console.log(runningMessage(settings.port as number))
            })

            return server
        },

        /**
         * Stops the running Express server.
         */
        stop() {
            if (server !== null) server.close()
        },

        /**
         * The Express application instance.
         *
         * @type {express.Express}
         */
        app,
    }
}
