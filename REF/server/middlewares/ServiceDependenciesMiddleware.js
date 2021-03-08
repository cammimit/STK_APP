"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addServicesToRequest = void 0;
var addServicesToRequest = function (services) { return function (req, res, next) {
    req.services = services;
    next();
}; };
exports.addServicesToRequest = addServicesToRequest;
//# sourceMappingURL=ServiceDependenciesMiddleware.js.map