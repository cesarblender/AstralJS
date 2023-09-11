import { Application, Request as ExpressRequest } from 'express'

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
    urlencoded: boolean
    errorLogger(errorMessage: string): void
    responseStructure(data: unknown, status: number, message?: string): object
    errorResponseStructure(message: string, status: number): object
    staticPath?: string
    ipv4Parser?: boolean
    xssProtection?: boolean
}

export type Request = ExpressRequest & { ipv4?: string }
