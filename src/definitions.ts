import { CompressionOptions } from 'compression'
import { Application, Request as ExpressRequest } from 'express'
import { ExpressStaticGzipOptions } from 'express-static-gzip'
import { HelmetOptions } from 'helmet'

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
    ipv4Parser: boolean
    xssProtection: boolean
    sqlInjectionProtection: boolean
    helmet: boolean
    compression: boolean
    helmetSettings?: Readonly<HelmetOptions>
    compressionSettings?: CompressionOptions
    static?: {
        path: string
        settings: ExpressStaticGzipOptions
    }
}

export type Request = ExpressRequest & { ipv4?: string }
