"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Resource = /** @class */ (function () {
    function Resource(options) {
        this.actions = {};
        this.actions = {};
        this.namespaced = options.namespaced || false;
        this.state = options.state || {};
        this.getters = options.getters || {};
        this.axios = options.axios || axios_1.default;
    }
    Resource.prototype.add = function (options) {
        this.actions[options.action] = {
            request: options.request,
            property: options.property,
            beforeRequest: options.beforeRequest,
            onSuccess: options.onSuccess,
            onError: options.onError,
            dispatchString: this.getDispatchString(options.action),
            commitString: this.getCommitString(options.action),
            axios: this.axios
        };
        return this;
    };
    Resource.prototype.getDispatchString = function (action) {
        return action;
    };
    Resource.prototype.getCommitString = function (action) {
        var capitalizedAction = action.replace(/([A-Z])/g, "_$1").toUpperCase();
        return "API_" + capitalizedAction;
    };
    return Resource;
}());
exports.Resource = Resource;
exports.default = Resource;
