;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("EnrichmentCtrl",
               ["$scope",
                "$location",
                "$log",
                "containers",
                "findBioElement",
                EnrichmentCtrl]);

function EnrichmentCtrl($scope, $loc, $log, containers, find) {

    var ctrl = this;
    ctrl.$loc = $loc;
    ctrl.$log = $log;
    ctrl.find = find;
    ctrl.containers = containers;
    ctrl.init();
    // $scope.$on("$locationChangeSuccess", ctrl.searchChange.bind(ctrl));

}

EnrichmentCtrl.prototype = {
    init: function init() {
        var ctrl = this;
        ctrl.reqs = ["cutoff", "bonferroni", "bed_regions", "sets", "background", "upstream", "downstream", "gene_type",
                     "gene_limit", "homolog"];
        ctrl.enElementValues = ctrl.findElements(ctrl.containers) || {};
    },

    // searchChange: function searchChange () {
    //     var ctrl = this, s = ctrl.$loc.search(), changed = false;
    //     if (s.species && s.species !== ctrl.enSpeciesName) {
    //         ctrl.enSpeciesName = s.species;
    //         changed = true;
    //     }
    //     if (s.config && s.config !== ctrl.enConfig) {
    //         ctrl.enConfig = s.config;
    //         changed = true;
    //     }
    //     if (changed) {
    //         ctrl.containersUpdatePathPromise(ctrl.enSpeciesName, ctrl.enConfig);
    //     }
    // },

    // containersUpdatePathPromise: function containersUpdatePathPromise(species, config) {
    //     var ctrl = this;
    //     return ctrl.bm.containers(species, config, true).
    //         then(function getContainers (res) {
    //             var c = ctrl.containers = res.data;
    //             ctrl.enElementValues = ctrl.findElements(ctrl.containers);
    //         }).
    //         catch(function (reason) {
    //             ctrl.$log.error("Enrichment controller: "+reason);
    //         });
    // },

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
    getAttributes: function getFilter(elmFunc) {
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