;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("EnrichmentCtrl",
               ["$scope",
                "$location",
                "$log",
                "bmservice",
                "findBioElement",
                "queryFactory",
                EnrichmentCtrl]);

function EnrichmentCtrl($scope, $loc, $log, bm, find, queryFactory) {

    var ctrl = this;
    ctrl.$loc = $loc;
    ctrl.$log = $log;
    ctrl.bm = bm;
    ctrl.find = find;
    ctrl.queryFactory = queryFactory;
    ctrl.init();
    ctrl.searchChange();
    $scope.$on("$locationChangeSuccess", ctrl.searchChange.bind(ctrl));
    $scope.$on("enrichment.query", ctrl.submit.bind(ctrl));

}

EnrichmentCtrl.prototype = {
    init: function init() {
        var ctrl = this;
        ctrl.reqs = ["cutoff", "bonferroni", "bed_regions", "sets", "background", "upstream", "downstream", "gene_type",
                     "gene_limit", "homolog"];
        ctrl.enElementValues = {};
        queryFactory.elements(ctrl.enElementValues);
        // These are the keys of the enElementValues map.
        // In this way there is not need to use watchers to sync the value of
        // filters.
        ctrl.defineEnrProperties(ctrl.reqs);
    },

    searchChange: function searchChange () {
        var ctrl = this, s = ctrl.$loc.search(), changed = false;
        if (s.species && s.species !== ctrl.enSpeciesName) {
            ctrl.enSpeciesName = s.species;
            changed = true;
        }
        if (s.config && s.config !== ctrl.enConfig) {
            ctrl.enConfig = s.config;
            changed = true;
        }
        if (changed) {
            ctrl.containersUpdatePathPromise(ctrl.enSpeciesName, ctrl.enConfig);
        }
    },

    containersUpdatePathPromise: function containersUpdatePathPromise(species, config) {
        var ctrl = this;
        return ctrl.bm.containers(species, config, true).
            then(function getContainers (res) {
                var c = ctrl.containers = res.data;
                ctrl.enElements = ctrl.findElements(ctrl.containers);
            }).
            catch(function (reason) {
                ctrl.$log.error("Species controller: "+reason);
            });
    },

    findElements: function findElements(coll) {
        var ctrl = this;
        var finder = ctrl.find(coll).addFunctions(ctrl.reqs);
        return finder.find();
    },


    getElements: function getElements(elmFunc, set) {
        var ctrl = this, elms = null, elmMap = ctrl.enElements[elmFunc];
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
    },


    defineEnrProperties: function (keys) {
        var ctrl = this;
        angular.forEach(keys, function (r) {
            Object.defineProperty(ctrl, r, {
                get: function () { return this.enElementValues[r] },
                set: function (value) { this.set(r, value) }
            });
        });
    }
}



})(angular);