import request from 'supertest'
import { createServer } from '@/server'
import { get } from '@/router/methods'
import { CreateServer, UrlPath } from '@/definitions'
import { router } from '@/router/router'

describe('Server Integration Test', () => {
    let server: CreateServer

    beforeEach(() => {
        server = createServer()
    })

    afterEach((done) => {
        server.stop()
        done()
    })

    it('should handle GET request with /test', async () => {
        const endpoint = get({
            settings: { path: '/test' as UrlPath },
            controller: () => {
                return {
                    status: 200,
                    message: 'Success',
                    data: { test: 'data' },
                }
            },
        })

        server.app.use(router([endpoint]))

        const response = await request(server.app).get('/test')

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Success')
        expect(response.body.data).toEqual({ test: 'data' })
    })
})
