"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var Environment = /** @class */ (function () {
    function Environment() {
    }
    Environment.isLocal = function () {
        return Environment.getStage() === 'local';
    };
    Environment.isStaging = function () {
        return Environment.getStage() === 'staging';
    };
    Environment.isProd = function () {
        return Environment.getStage() === 'prod';
    };
    Environment.getStage = function () {
        return process.env.STAGE || 'local';
    };
    Environment.getPort = function () {
        return process.env.PORT || 8000;
    };
    Environment.getVerticalName = function () {
        return process.env.VERTICAL_NAME || 'cats';
    };
    Environment.getServiceName = function () {
        return process.env.SERVICE_NAME || 'cats-provider';
    };
    Environment.getDatadogOptions = function () {
        return {
            targetHost: process.env.DATADOG_HOST || 'https://datadog.mycompany.com',
            enableTelemetry: process.env.ENABLE_DATADOG_TELEMETRY === 'true' || false,
            tags: ["team:" + Environment.getVerticalName(), "product:" + Environment.getServiceName()]
        };
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map