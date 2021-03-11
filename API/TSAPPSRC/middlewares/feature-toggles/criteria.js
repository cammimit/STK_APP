"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criteria = void 0;
exports.criteria = [
    {
        id: 'isPaidUser',
        check: function (user, needsToBePaid) { return user && user.isPaid === needsToBePaid; }
    },
    {
        id: 'shareOfUsers',
        check: function (user, share) { return user && user.id % 100 < share * 100; }
    }
];
//# sourceMappingURL=criteria.js.map