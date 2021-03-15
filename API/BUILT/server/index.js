"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = require("./Application");
/**
 * Entrypoint for bootstrapping and starting the application.
 * Might configure aspects like logging, telemetry, memory leak observation or even orchestration before.
 * This is about to come later!
 */
Application_1.Application.createApplication().then(function () {
    console.info('The application was started! Kill it using Ctrl + C');
});
//# sourceMappingURL=index.js.map