"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noCache = void 0;
function noCache(_, res, next) {
    res.setHeader('Expires', '0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
}
exports.noCache = noCache;
//# sourceMappingURL=NoCacheMiddleware.js.map