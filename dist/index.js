"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("./Store");
var Resource_1 = require("./Resource");
var Vapi = /** @class */ (function () {
    function Vapi(options) {
        this.resource = new Resource_1.Resource(options);
        return this;
    }
    Vapi.prototype.add = function (options) {
        this.resource.add(options);
        return this;
    };
    Vapi.prototype.getStore = function () {
        return Store_1.createStore(this.resource);
    };
    return Vapi;
}());
exports.Vapi = Vapi;
exports.default = Vapi;
