"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        const defaultSettings = {
            port: 3000,
            apiDocumentation: false,
            runningMessage: (port) => `Server running at http://localhost:${port}/`,
            jwt: false
        };
        this.settings = Object.assign(Object.assign({}, defaultSettings), this.getSettings());
        this.middlewares = [];
        this.app = (0, express_1.default)();
    }
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
    }
    implementMiddlewares() {
        this.middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    bootstrap() {
        if (this.settings.port === undefined) {
            throw new Error('Server port is not defined');
        }
        const runningMessage = this.settings.runningMessage;
        this.app.listen(this.settings.port, () => {
            if (runningMessage !== undefined) {
                console.log(runningMessage(this.settings.port));
            }
        });
    }
}
exports.Server = Server;
