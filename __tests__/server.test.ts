import { CreateServer } from '@/definitions'
import { createServer, defaultSettings } from '@/server'
import request from 'supertest'

describe('createServer', () => {
    let server: CreateServer

    beforeAll(() => {
        server = createServer()
    })

    afterAll((done) => {
        server.stop()
        done()
    })

    it('should start the server', async () => {
        const response = await request(server.app).get('/')
        expect(response.status).toBe(404)
    })

    it('should start the server with custom settings', async () => {
        const customSettings = {
            ...defaultSettings,
            port: 5400,
        }
        const customServer = createServer(customSettings)
        const response = await request(customServer.app).get('/')
        expect(response.status).toBe(404)
        customServer.stop()
    })
})
