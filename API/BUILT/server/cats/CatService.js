"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatService = void 0;
var CatService = /** @class */ (function () {
    function CatService(catRepository) {
        this.catRepository = catRepository;
    }
    CatService.prototype.getCat = function (id) {
        return this.catRepository.getById(id);
    };
    CatService.prototype.getAllCats = function () {
        return this.catRepository.getAll();
    };
    CatService.prototype.getCatsStatistics = function () {
        var allCats = this.catRepository.getAll();
        var catsAgeSum = allCats.map(function (cat) { return cat.age; }).reduce(function (sum, nextAge) { return sum + nextAge; }, 0);
        return {
            amount: allCats.length,
            averageAge: allCats.length ? catsAgeSum / allCats.length : 0
        };
    };
    return CatService;
}());
exports.CatService = CatService;
//# sourceMappingURL=CatService.js.map