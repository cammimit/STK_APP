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
exports.ExpressServer = void 0;
var express = require("express");
var fse = require("fs-extra");
var compress = require("compression");
var helmet = require("helmet");
var hpp = require("hpp");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var RateLimit = require("express-rate-limit");
//import { applyFeatureToggles } from './middlewares/feature-toggles/setupFeatureToggles'
/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
var ExpressServer = /** @class */ (function () {
    function ExpressServer(exmode) {
        this.exmode = exmode;
    }
    // constructor(private catEndpoints: CatEndpoints, private requestServices: RequestServices) {}
    ExpressServer.prototype.setup = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var server;
            return __generator(this, function (_a) {
                server = express();
                this.setupStandardMiddlewares(server);
                this.setupSecurityMiddlewares(server);
                this.setupFeatureToggles(server);
                this.applyWebpackDevMiddleware(server);
                this.setupTelemetry(server);
                this.setupServiceDependencies(server);
                this.configureEjsTemplates(server);
                this.configureFrontendPages(server);
                this.configureApiEndpoints(server);
                this.configureFrontendEndpoints(server);
                this.httpServer = this.listen(server, port);
                this.server = server;
                return [2 /*return*/, this.server];
            });
        });
    };
    ExpressServer.prototype.listen = function (server, port) {
        console.info("Starting server on port " + port);
        return server.listen(port);
    };
    ExpressServer.prototype.kill = function () {
        if (this.httpServer)
            this.httpServer.close();
    };
    ExpressServer.prototype.setupSecurityMiddlewares = function (server) {
        server.use(hpp());
        server.use(helmet());
        server.use(helmet.referrerPolicy({ policy: 'same-origin' }));
        server.use(helmet.noCache());
        server.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'unsafe-inline'"],
                scriptSrc: ["'unsafe-inline'", "'self'"]
            }
        }));
    };
    ExpressServer.prototype.setupStandardMiddlewares = function (server) {
        server.use(bodyParser.json());
        server.use(cookieParser());
        server.use(compress());
        var baseRateLimitingOptions = {
            windowMs: 15 * 60 * 1000,
            max: 1000,
            message: 'Our API is rate limited to a maximum of 1000 requests per 15 minutes, please lower your request rate'
        };
        server.use('/api/', new RateLimit(baseRateLimitingOptions));
    };
    ExpressServer.prototype.setupFeatureToggles = function (server) {
        //applyFeatureToggles(server)
    };
    ExpressServer.prototype.configureEjsTemplates = function (server) {
        server.set('views', ['resources/views']);
        server.set('view engine', 'ejs');
    };
    ExpressServer.prototype.setupTelemetry = function (server) {
        //DatadogStatsdMiddleware.applyTo(server, Environment.getDatadogOptions())
    };
    ExpressServer.prototype.setupServiceDependencies = function (server) {
        //const servicesMiddleware = addServicesToRequest(this.requestServices)
        //server.use(servicesMiddleware)
    };
    ExpressServer.prototype.configureFrontendPages = function (server) {
        var _this = this;
        this.prepareAssets();
        this.configureStaticAssets(server);
        var context = {
            cssFiles: this.cssFiles,
            config: {
                welcomePhrases: ['Bienvenue', 'Welcome', 'Willkommen', 'Welkom', 'Hoş geldin', 'Benvenuta', 'Bienvenido']
            }
        };
        var renderPage = function (template) { return function (req, res, _) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.type('text/html').render(template, context);
                return [2 /*return*/];
            });
        }); }; };
        //server.get('/', noCache, renderPage('index'))
    };
    //private configureStaticAssets(server: Express) {
    //    if (Environment.isProd()) {
    //        server.use([/(.*)\.js\.map$/, '/'], express.static('www/'))
    //    } else {
    //        server.use('/', express.static('www/'))
    //    }
    //
    //    server.use('/', express.static('resources/img/'))
    //}
    ExpressServer.prototype.configureStaticAssets = function (server) {
        if (this.exmode == 'prod') {
            server.use([/(.*)\.js\.map$/, '/'], express.static('www/'));
        }
        else {
            server.use('/', express.static('www/'));
        }
        server.use('/', express.static('resources/img/'));
    };
    //private applyWebpackDevMiddleware(server: Express) {
    //    if (Environment.isLocal()) {
    //        const config = require('../../webpack.config.js')
    //        const compiler = require('webpack')(config)
    //
    //        const webpackDevMiddleware = require('webpack-dev-middleware')
    //        server.use(
    //            webpackDevMiddleware(compiler, {
    //                hot: true,
    //                publicPath: config.output.publicPath,
    //                compress: true,
    //                host: 'localhost',
    //                port: Environment.getPort()
    //            })
    //        )
    //
    //        const webpackHotMiddleware = require('webpack-hot-middleware')
    //        server.use(webpackHotMiddleware(compiler))
    //    }
    //}
    ExpressServer.prototype.applyWebpackDevMiddleware = function (server) {
        if (this.exmode == 'dev') {
            var config = require('../../webpack.config.js');
            var compiler = require('webpack')(config);
            var webpackDevMiddleware = require('webpack-dev-middleware');
            server.use(webpackDevMiddleware(compiler, {
                hot: true,
                publicPath: config.output.publicPath,
                compress: true,
                host: 'localhost',
                port: 3816
            }));
            var webpackHotMiddleware = require('webpack-hot-middleware');
            server.use(webpackHotMiddleware(compiler));
        }
    };
    //private async prepareAssets() {
    //    if (Environment.isLocal()) {
    //        this.cssFiles = []
    //    } else {
    //        const isomorphicAssets: any = JSON.parse(await fse.readFile('www/static/media/isomorphic-assets.json', 'utf-8'))
    //        this.cssFiles = isomorphicAssets.chunks.app.filter((path: string) => path.endsWith('.css'))
    //    }
    //}
    ExpressServer.prototype.prepareAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isomorphicAssets, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.exmode == 'dev')) return [3 /*break*/, 1];
                        this.cssFiles = [];
                        return [3 /*break*/, 3];
                    case 1:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fse.readFile('www/static/media/isomorphic-assets.json', 'utf-8')];
                    case 2:
                        isomorphicAssets = _b.apply(_a, [_c.sent()]);
                        this.cssFiles = isomorphicAssets.chunks.app.filter(function (path) { return path.endsWith('.css'); });
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpressServer.prototype.configureApiEndpoints = function (server) {
        var strictRateLimit = new RateLimit({
            windowMs: 15 * 60 * 1000,
            max: 200,
            message: 'This endpoint has a stricter rate limiting of a maximum of 200 requests per 15 minutes window, please lower your request rate'
        });
        // server.get('/api/cat', noCache, this.catEndpoints.getAllCats)
        //server.get('/api/statistics/cat', noCache, strictRateLimit, this.catEndpoints.getCatsStatistics)
        //server.get('/api/cat/:catId', noCache, this.catEndpoints.getCatDetails)
    };
    ExpressServer.prototype.configureFrontendEndpoints = function (server) {
        var forbidExternalFrontends = cors({ origin: false });
        // server.get('/internal/cat', forbidExternalFrontends, noCache, this.catEndpoints.getAllCats)
    };
    return ExpressServer;
}());
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=ExpressServer.js.map