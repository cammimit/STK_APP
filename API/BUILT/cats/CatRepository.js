"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatRepository = void 0;
var exampleCats_1 = require("./exampleCats");
var CatRepository = /** @class */ (function () {
    function CatRepository() {
    }
    CatRepository.prototype.getById = function (id) {
        return exampleCats_1.catsById[id];
    };
    CatRepository.prototype.getAll = function () {
        return exampleCats_1.exampleCats;
    };
    return CatRepository;
}());
exports.CatRepository = CatRepository;
//# sourceMappingURL=CatRepository.js.map