import request from 'supertest'
import { createServer } from '@/server'
import { get } from '@/router/methods'
import { CreateServer, UrlPath } from '@/definitions'

describe('Server Integration Test', () => {
    let server: CreateServer

    beforeEach(() => {
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

        server = createServer({endpoints: [endpoint], port: 5402})
    })

    afterEach((done) => {
        server.stop()
        done()
    })

    it('should handle GET request with /test', async () => {

        const response = await request(server.app).get('/test')

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Success')
        expect(response.body.data).toEqual({ test: 'data' })
    })
})
