"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFeatureToggles = void 0;
var fflip = require("fflip");
var FFlipExpressIntegration = require("fflip-express");
var criteria_1 = require("./criteria");
var features_1 = require("./features");
var applyFeatureToggles = function (server) {
    fflip.config({ criteria: criteria_1.criteria, features: features_1.features });
    var fflipExpressIntegration = new FFlipExpressIntegration(fflip, {
        cookieName: 'fflip',
        manualRoutePath: '/api/toggles/local/:name/:action'
    });
    server.use(fflipExpressIntegration.middleware);
    server.use(function (req, _, next) {
        try {
            req.fflip.setForUser(req.user);
        }
        catch (err) {
            console.error('Error while binding feature toggles to req.user');
        }
        next();
    });
};
exports.applyFeatureToggles = applyFeatureToggles;
//# sourceMappingURL=setupFeatureToggles.js.map