"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.features = exports.FeatureToggles = void 0;
exports.FeatureToggles = {
    CLOSED_BETA: 'CLOSED_BETA',
    WITH_CAT_STATISTICS: 'WITH_CAT_STATISTICS'
};
exports.features = [
    {
        id: exports.FeatureToggles.CLOSED_BETA,
        criteria: { isPaidUser: true, shareOfUsers: 0.5 }
    },
    {
        id: exports.FeatureToggles.WITH_CAT_STATISTICS,
        enabled: true
    }
];
//# sourceMappingURL=features.js.map