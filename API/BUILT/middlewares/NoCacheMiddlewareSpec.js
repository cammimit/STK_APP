"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon = require("sinon");
var NoCacheMiddleware_1 = require("./NoCacheMiddleware");
describe('NoCacheMiddleware', function () {
    var sandbox = sinon.createSandbox();
    var next;
    var requestMock;
    var responseMock;
    describe('noCache', function () {
        beforeEach(function () {
            requestMock = {};
            responseMock = {
                setHeader: sandbox.spy()
            };
            next = sandbox.spy();
        });
        it('should call "next"', function () {
            NoCacheMiddleware_1.noCache(requestMock, responseMock, next);
            chai_1.expect(next).to.have.been.calledOnce;
        });
        it('should set all required headers', function () {
            NoCacheMiddleware_1.noCache(requestMock, responseMock, next);
            chai_1.expect(responseMock.setHeader).to.have.been.calledThrice;
            sinon.assert.callOrder(responseMock.setHeader.withArgs('Expires', '0'), responseMock.setHeader.withArgs('Pragma', 'no-cache'), responseMock.setHeader.withArgs('Cache-Control', 'no-cache, no-store, must-revalidate'));
        });
    });
});
//# sourceMappingURL=NoCacheMiddlewareSpec.js.map