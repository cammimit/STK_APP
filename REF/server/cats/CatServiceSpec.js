"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var chai_1 = require("chai");
var CatService_1 = require("./CatService");
var exampleCats_1 = require("./exampleCats");
describe('CatService', function () {
    var sandbox = sinon.createSandbox();
    var catService;
    var catRepository;
    beforeEach(function () {
        catRepository = { getAll: sandbox.stub().returns(exampleCats_1.exampleCats) };
        catService = new CatService_1.CatService(catRepository);
    });
    describe('getCatsStatistics', function () {
        it('should reflect the total amount of cats', function () {
            chai_1.expect(catService.getCatsStatistics().amount).to.eq(5);
        });
        it('should calculate the average age of all cats', function () {
            chai_1.expect(catService.getCatsStatistics().averageAge).to.eq(69.2);
        });
        it('should calculate an average age of zero if the amount of cats is zero', function () {
            catRepository.getAll.returns([]);
            chai_1.expect(catService.getCatsStatistics()).to.deep.equal({
                amount: 0,
                averageAge: 0
            });
        });
    });
});
//# sourceMappingURL=CatServiceSpec.js.map