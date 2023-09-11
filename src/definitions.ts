import { Application } from 'express'

export interface CreateServer {
    start(): void
    stop(): void
    app: Application
}

export interface ServerSettings {
    port: number
    docs: boolean
    docsPath: string
    requestLogger: boolean
    jsonParser: boolean
    staticPath: string
    urlencoded: boolean
    errorLogger(errorMessage: string): void
    responseStructure(data: unknown, status: number, message?: string): object
    errorResponseStructure(message: string, status: number): object
}
