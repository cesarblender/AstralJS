import express from 'express'
import path from 'path'
import { Server } from 'http'

import { CreateServer } from '@types'
import { runningMessage } from '@messages'
import { custom404 } from '@middlewares/404'

/**
 * Creates an Express server instance.
 *
 * @returns {CreateServer} The server instance.
 */
export default function createServer(): CreateServer {
    const app = express()

    // Template engine setup
    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, 'views'))

    // Custom error pages
    app.use(custom404)

    let server: Server | null = null

    return {
        /**
         * Starts the Express server on port 3000.
         *
         * @returns {Server} The HTTP server.
         */
        start() {
            server = app.listen(3000, () => {
                console.log(runningMessage(3000))
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
