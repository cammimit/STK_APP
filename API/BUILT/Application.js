"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var ExpressServer_1 = require("./ExpressServer");
var CatEndpoints_1 = require("./cats/CatEndpoints");
var CatService_1 = require("./cats/CatService");
var CatRepository_1 = require("./cats/CatRepository");
var Environment_1 = require("./Environment");
/**
 * Wrapper around the Node process, ExpressServer abstraction and complex dependencies such as services that ExpressServer needs.
 * When not using Dependency Injection, can be used as place for wiring together services which are dependencies of ExpressServer.
 */
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.createApplication = function () {
        return __awaiter(this, void 0, void 0, function () {
            var catService, requestServices, expressServer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        catService = new CatService_1.CatService(new CatRepository_1.CatRepository());
                        requestServices = { catService: catService };
                        expressServer = new ExpressServer_1.ExpressServer(new CatEndpoints_1.CatEndpoints(), requestServices);
                        return [4 /*yield*/, expressServer.setup(Environment_1.Environment.getPort())];
                    case 1:
                        _a.sent();
                        Application.handleExit(expressServer);
                        return [2 /*return*/, expressServer];
                }
            });
        });
    };
    Application.handleExit = function (express) {
        process.on('uncaughtException', function (err) {
            console.error('Uncaught exception', err);
            Application.shutdownProperly(1, express);
        });
        process.on('unhandledRejection', function (reason) {
            console.error('Unhandled Rejection at promise', reason);
            Application.shutdownProperly(2, express);
        });
        process.on('SIGINT', function () {
            console.info('Caught SIGINT');
            Application.shutdownProperly(128 + 2, express);
        });
        process.on('SIGTERM', function () {
            console.info('Caught SIGTERM');
            Application.shutdownProperly(128 + 2, express);
        });
        process.on('exit', function () {
            console.info('Exiting');
        });
    };
    Application.shutdownProperly = function (exitCode, express) {
        Promise.resolve()
            .then(function () { return express.kill(); })
            .then(function () {
            console.info('Shutdown complete');
            process.exit(exitCode);
        })
            .catch(function (err) {
            console.error('Error during shutdown', err);
            process.exit(1);
        });
    };
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=Application.js.map