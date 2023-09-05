import { Router } from 'express'

import { type ControllerType } from '../server/router'

export function genDocs (controllers: ControllerType[], apiDocsPath: string): Router {
  const router = Router()

  router.get(apiDocsPath, (req, res) => {
    res.json(controllers)
  })

  return router
}
