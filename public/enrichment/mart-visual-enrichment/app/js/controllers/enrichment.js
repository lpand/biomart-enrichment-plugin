;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("EnrichmentCtrl",
               ["$scope",
                "$location",
                "$log",
                "bmservice",
                "findBioElement",
                EnrichmentCtrl]);

function EnrichmentCtrl($scope, $loc, $log, bm, find) {

    var ctrl = this;
    ctrl.$loc = $loc;
    ctrl.$log = $log;
    ctrl.bm = bm;
    ctrl.find = find;
    ctrl.containers = $scope.containers;
    ctrl.init();

}

EnrichmentCtrl.prototype = {
    init: function init() {
        var ctrl = this;
        ctrl.reqs = ["cutoff", "bonferroni", "bed_regions", "sets", "background", "upstream", "downstream", "gene_type",
                     "gene_limit", "homolog", "annotation"];
        ctrl.enElementValues = ctrl.findElements(ctrl.containers);
    },


    findElements: function findElements(coll) {
        var ctrl = this;
        var finder = ctrl.find(coll).addFunctions(ctrl.reqs);
        return finder.find();
    },


    getElements: function getElements(elmFunc, set) {
        var ctrl = this;
        var elms = null;
        var elmMap = ctrl.enElementValues[elmFunc];
        return elmMap && elmMap[set]? elmMap[set] : [];
    },


    // It returns the first filter with that elmFunc.
    // The first filter is the first one met with breadth visit of the
    // containers tree.
    getFilter: function getFilter(elmFunc) {
        var fls = this.getElements(elmFunc, "filters");
        return fls.length ? fls[0] : null;
    },


    // This returns all the attributes with elmFunc function
    getAttributes: function getAttributes(elmFunc) {
        return this.getElements(elmFunc, "attributes");
    },


    set: function (funcName, funcValue) {
        var ctrl = this, k = funcName, v = funcValue;
        ctrl.enElementValues[k] = v;
    }


    // defineEnrProperties: function (keys) {
    //     var ctrl = this;
    //     angular.forEach(keys, function (r) {
    //         Object.defineProperty(ctrl, r, {
    //             get: function () { return this.enElementValues[r] },
    //             set: function (value) { this.set(r, value) }
    //         });
    //     });
    // }
}



})(angular);