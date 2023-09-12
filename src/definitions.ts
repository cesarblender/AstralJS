import { CompressionOptions } from 'compression'
import {
    Application,
    Request as ExpressRequest,
    NextFunction,
    Response,
} from 'express'
import { ExpressStaticGzipOptions } from 'express-static-gzip'
import { HelmetOptions } from 'helmet'

export interface CreateServer {
    start(): void
    stop(): void
    app: Application
}

export type Request = ExpressRequest & { ipv4?: string }

export type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void

export interface ControllerProperties<BodyType> {
    req: Request
    res: Response
    body: BodyType
}

export enum HTTPStatus {
    Continue = 100,
    SwitchingProtocols = 101,
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    TemporaryRedirect = 307,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    RequestEntityTooLarge = 413,
    RequestURITooLong = 414,
    UnsupportedMediaType = 415,
    RequestedRangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HTTPVersionNotSupported = 505,
}

export type UrlPath = string & { __pathBrand: true }

export interface ControllerResponse {
    status: HTTPStatus
    message?: string
    data?: object
    redirect?: UrlPath
}

export type Controller<BodyType> = (
    props: ControllerProperties<BodyType>,
) => ControllerResponse | Promise<ControllerResponse> | void | Promise<void>

export interface ControllerSettings {
    middlewares?: Middleware[]
    bodySchema?: object
    protected?: boolean
    version?: number
    path: UrlPath
}

export enum HTTPMethods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
    head = 'head',
    options = 'options',
}

export type EndpointType<BodyType> = ControllerSettings & {
    controller: Controller<BodyType>
    method: HTTPMethods
}

export interface EndpointParams<BodyType> {
    settings: ControllerSettings
    controller: Controller<BodyType>
}

export interface ServerSettings {
    port: number
    docs: boolean
    docsPath: string
    requestLogger: boolean
    jsonParser: boolean
    urlencoded: boolean
    errorLogger(errorMessage: string): void
    responseStructure(status: number, data?: unknown, message?: string): object
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
    endpoints?: EndpointType<object>[]
}
