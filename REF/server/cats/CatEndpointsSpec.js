"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var chai_1 = require("chai");
var HttpStatus = require("http-status-codes");
var expressmocks_1 = require("expressmocks");
var CatEndpoints_1 = require("./CatEndpoints");
var exampleCats_1 = require("./exampleCats");
describe('CatEndpoints', function () {
    var sandbox = sinon.createSandbox();
    var sampleRequest;
    var catService;
    var endpoints;
    beforeEach(function () {
        endpoints = new CatEndpoints_1.CatEndpoints();
        catService = {
            getCat: sandbox.stub(),
            getAllCats: sandbox.stub().returns(exampleCats_1.exampleCats),
            getCatsStatistics: sandbox.stub().returns({ amount: 30, averageAge: 50 })
        };
        sampleRequest = {
            services: { catService: catService },
            params: { catId: 1 },
            fflip: {
                has: sandbox.stub().returns(true)
            }
        };
    });
    describe('getCatDetails', function () {
        it('should ask the underlying service for the cat', function () {
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getCatDetails)
                .then(function () { return chai_1.expect(catService.getCat).to.have.been.calledWith(1); });
        });
        it('should return the cat as JSON response if it could be found by the service', function () {
            catService.getCat.withArgs(1).returns({ id: 1, name: 'Sample Cat' });
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getCatDetails)
                .expectJson({ id: 1, name: 'Sample Cat' });
        });
        it('should send only the 404 status if the cat could not be found', function () {
            catService.getCat.withArgs(1).returns(undefined);
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getCatDetails)
                .expectSendStatus(HttpStatus.NOT_FOUND);
        });
        it('should handle thrown errors by passing them to NextFunction', function () {
            var thrownError = new Error('Some problem with accessing the data');
            catService.getCat.throws(thrownError);
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getCatDetails)
                .expectNext(thrownError);
        });
    });
    describe('getAllCats', function () {
        it('should return all cats as JSON response', function () {
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getAllCats)
                .expectJson(exampleCats_1.exampleCats);
        });
        it('should handle thrown errors by passing them to NextFunction', function () {
            var thrownError = new Error('Some problem with accessing the data');
            catService.getAllCats.throws(thrownError);
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getAllCats)
                .expectNext(thrownError);
        });
    });
    describe('getCatsStatistics', function () {
        it('should return the statistics as JSON response', function () {
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getCatsStatistics)
                .expectJson({ amount: 30, averageAge: 50 });
        });
        it('should send status 404 if the feature toggle is deactivated', function () {
            sampleRequest.fflip.has.returns(false);
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getCatsStatistics)
                .expectSendStatus(HttpStatus.NOT_FOUND);
        });
        it('should handle thrown errors by passing them to NextFunction', function () {
            var thrownError = new Error('Some problem with accessing the data');
            catService.getCatsStatistics.throws(thrownError);
            return expressmocks_1.default.create(sampleRequest)
                .test(endpoints.getCatsStatistics)
                .expectNext(thrownError);
        });
    });
});
//# sourceMappingURL=CatEndpointsSpec.js.map