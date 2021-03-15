"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ServiceDependenciesMiddleware_1 = require("./ServiceDependenciesMiddleware");
describe('addServicesToRequest', function () {
    var services = { myService: 'something' };
    var middleware;
    var requestMock;
    var responseMock;
    beforeEach(function () {
        requestMock = {};
        responseMock = {};
        middleware = ServiceDependenciesMiddleware_1.addServicesToRequest(services);
    });
    it('should set "services" on request', function (done) {
        middleware(requestMock, responseMock, function () {
            chai_1.expect(requestMock.services).to.deep.equal(services);
            done();
        });
    });
    it('should call next()', function (done) {
        middleware(requestMock, responseMock, function (error) {
            chai_1.expect(error).to.be.undefined;
            done();
        });
    });
});
//# sourceMappingURL=ServiceDependenciesMiddlewareSpec.js.map