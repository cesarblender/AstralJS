import express from 'express'
import { Server } from 'http'

import { CreateServer, ServerSettings } from '@types'
import { runningMessage } from '@messages'
import { setupMiddlewares } from './utils/setupMiddlewares'

export const defaultSettings: ServerSettings = {
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
export function createServer(
    settings: Partial<ServerSettings> = defaultSettings,
): CreateServer {
    const app = express()

    // Middlewares
    setupMiddlewares(app, settings)

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

createServer().start()
