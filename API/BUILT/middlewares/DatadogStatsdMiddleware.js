"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatsD = require("hot-shots");
var connectDatadog = require("connect-datadog");
var DatadogStatsdMiddleware = /** @class */ (function () {
    function DatadogStatsdMiddleware() {
    }
    DatadogStatsdMiddleware.applyTo = function (server, config) {
        var statsdClient = DatadogStatsdMiddleware.createStatsdClient({
            host: config.targetHost,
            mock: !config.enableTelemetry
        });
        var datadogStatsdMiddleware = connectDatadog({
            dogstatsd: statsdClient,
            tags: config.tags,
            path: false,
            method: true,
            response_code: false
        });
        server.use(datadogStatsdMiddleware);
    };
    DatadogStatsdMiddleware.createStatsdClient = function (options) {
        var statsdClient = new StatsD(options);
        statsdClient.socket.on('error', function (err) {
            console.error('Error sending datadog stats', err);
        });
        return statsdClient;
    };
    return DatadogStatsdMiddleware;
}());
exports.default = DatadogStatsdMiddleware;
//# sourceMappingURL=DatadogStatsdMiddleware.js.map