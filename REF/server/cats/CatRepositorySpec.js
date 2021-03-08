"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var CatRepository_1 = require("./CatRepository");
var exampleCats_1 = require("./exampleCats");
describe('CatRepository', function () {
    var repository = new CatRepository_1.CatRepository();
    describe('getById', function () {
        it('should find an existing cat in the storage by ID', function () {
            var cat = repository.getById(1);
            chai_1.expect(cat).to.deep.equal({
                id: 1,
                name: 'Tony Iommi',
                breed: 'British Shorthair',
                gender: 'male',
                age: 71
            });
        });
        it('should return undefined if a cat is not in storage', function () {
            chai_1.expect(repository.getById(999)).to.be.undefined;
        });
    });
    describe('getAll', function () {
        it('should find all cats', function () {
            chai_1.expect(repository.getAll()).to.deep.equal(exampleCats_1.exampleCats);
        });
    });
});
//# sourceMappingURL=CatRepositorySpec.js.map