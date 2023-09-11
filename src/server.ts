import express from 'express'
import path from 'path'
import { Server } from 'http'

import { CreateServer, ServerSettings } from '@types'
import { runningMessage } from '@messages'
import { custom404 } from '@middlewares/404'
import { requestLogger } from '@middlewares/requestLogger'
import { ipv4Parser } from '@middlewares/ipv4Parser'

const defaultSettings: ServerSettings = {
    docs: true,
    docsPath: '/api/docs',
    errorLogger() {},
    errorResponseStructure(message, status) {
        return { message, status }
    },
    jsonParser: true,
    port: 6000,
    requestLogger: true,
    responseStructure(data, status, message) {
        return { data, status, message }
    },
    staticPath: undefined,
    urlencoded: true,
    ipv4Parser: true
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

    // Template engine setup
    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, 'views'))

    // Middlewares
    if (settings.ipv4Parser) app.use(ipv4Parser)
    if (settings.requestLogger) app.use(requestLogger)
    if (settings.jsonParser) app.use(express.json())
    if (settings.urlencoded) app.use(express.urlencoded())

    // Router
    // TODO: implement a router

    // Custom error pages
    app.use(custom404)

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

createServer().start()
