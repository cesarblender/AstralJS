import { Request, Response } from 'express'

export function custom404(req: Request, res: Response): void {
    res.status(404)

    if (req.accepts('html')) {
        res.render('404', { url: req.url })
        return
    }

    if (req.accepts('json')) {
        res.json({ error: 'Not found' })
        return
    }

    res.type('txt').send('Not found')
}
