import { type Request, type Application, type Response, type NextFunction } from 'express';
export type RunningMessage = (port: number) => string;
export interface JWTSettings {
    secret: string | {
        refresh: string;
        access: string;
    };
    duration: string | {
        refresh: string;
        access: string;
    };
    algorithm: string;
}
export interface ServerSettings {
    port: number;
    apiDocumentation: boolean;
    jwt: JWTSettings | false;
    runningMessage: RunningMessage;
}
export type MiddlewareType = (req: Request, res: Response, next: NextFunction) => void;
export declare abstract class Server {
    readonly middlewares: MiddlewareType[];
    readonly settings: ServerSettings;
    readonly app: Application;
    constructor();
    abstract getSettings(): Partial<ServerSettings>;
    protected addMiddleware(middleware: MiddlewareType): void;
    protected implementMiddlewares(): void;
    bootstrap(): void;
}
