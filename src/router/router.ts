import { Router } from 'express'

import { EndpointType } from '@types'

export function router(endpoints: EndpointType<object>[]): Router {
    const router = Router()

    endpoints.forEach((endpoint) => {
        // TODO: add a middleware to protect with jwt in case of having the setting protected: true
        // TODO: add a api version header to handle it
        // TODO: validate body with endpoint.bodyScheme
        router[endpoint.method](
            endpoint.path,
            ...(endpoint.middlewares ?? []),
            async (req, res) => {
                const controllerResponse = await endpoint.controller({
                    body: req.body,
                    req,
                    res,
                })
                if (
                    typeof controllerResponse === 'object' &&
                    controllerResponse !== null
                ) {
                    if (controllerResponse.redirect) {
                        return res.redirect(
                            controllerResponse.status,
                            controllerResponse.redirect,
                        )
                    }

                    // TODO: use setting's handleData function to return data
                    return res.status(controllerResponse.status).json({
                        message: controllerResponse.message,
                        data: controllerResponse.data,
                        status: controllerResponse.status,
                    })
                }
            },
        )
    })

    return router
}
