import { Router } from 'express'

import { EndpointType } from '@types'
import { validateBody } from '@/utils/validateBody'
import { ValidationError } from '@/errors'

export function router(
    endpoints: EndpointType<object>[],
    errorLogger: (errorMessage: string) => void,
    errorResponseStructure: (message: string, status: number) => object,
    responseStructure: (
        status: number,
        data?: unknown,
        message?: string,
    ) => object,
): Router {
    const router = Router()

    endpoints.forEach((endpoint) => {
        // TODO: add a middleware to protect with jwt in case of having the setting protected: true
        // TODO: add a api version header to handle it
        router[endpoint.method](
            endpoint.path,
            ...(endpoint.middlewares ?? []),
            async (req, res) => {
                try {
                    if (endpoint.bodySchema)
                        validateBody(req.body, endpoint.bodySchema)
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

                        return res
                            .status(controllerResponse.status)
                            .json(
                                responseStructure(
                                    controllerResponse.status,
                                    controllerResponse.data,
                                    controllerResponse.message,
                                ),
                            )
                    }
                } catch (error) {
                    if (error instanceof ValidationError) {
                        return res
                            .status(401)
                            .json(errorResponseStructure((error as ValidationError).message, 401))
                    }

                    errorLogger(error as string)
                    return res
                        .status(500)
                        .json(
                            errorResponseStructure(
                                'Internal server error',
                                500,
                            ),
                        )
                }
            },
        )
    })

    return router
}
