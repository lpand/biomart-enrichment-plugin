;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.services");

app.factory("findBioElement", function() {

    function finder (containers) {
        if (!(this instanceof finder)) {
            return new finder(containers);
        }

        this.coll = containers;
        this.funcs = {};
    }


    finder.prototype.addFunctions = function (funcs) {
        if (angular.isArray(funcs)) {
            funcs.forEach(function (k) {
                if (!(k in this.funcs)) this.funcs[k] = {attributes: [], filters: []};
            }, this);
        } else {
            if (!(funcs in this.funcs)) this.funcs[funcs] = {attributes: [], filters: []};
        }

        return this;
    }


    // The containars form a tree
    finder.prototype.find = function walk() {
        // The root
        var c, q = [this.coll];
        while (q.length) {
            var c = q.shift();
            this.inspectAttrs(c.attributes, this.funcs);
            this.inspectFilters(c.filters, this.funcs);
            for (var i = 0; i < c.containers.length; ++i) {
                q.push(c.containers[i]);
            }
        }
        return this.funcs;
    }


    finder.prototype.inspectAttrs = function (els, acc) {
        this.inspect(els, acc, "attributes");
    }


    finder.prototype.inspectFilters = function (els, acc) {
        this.inspect(els, acc, "filters");
    }


    finder.prototype.inspect = function (els, acc, set) {
        els.reduce(function fold (acc, e) {
            var f;
            if ((f = e.function) in acc)
                acc[f][set].push(e);
            return acc;
        }, acc);
    }

    finder.prototype.getFunctionMap = function () {
        return this.funcs;
    }

    return finder;

});

})(angular);