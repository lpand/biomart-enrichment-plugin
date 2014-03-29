;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.services");

app.service("queryValidator", function queryValidator() {
    this.err = "";

    this.mkFnMap = function mkFnMap(elmMap, m) {
        return elmMap.reduce(function r(map, el) {
            var f = el.function;
            if (!map[f]) { map[f] = [] }
            map[f].push(el)
            return map;
        }, m || {});
    }

    function def (t) {
        return angular.isDefined(t) && angular.isArray(t) && t.length !== 0;
    }

    // TODO: add validation rules to the config
    this.validate = function validate (elmMap) {
        var elm  = this.mkFnMap(elmMap.attributes);
        elm  = this.mkFnMap(elmMap.filters, elm);
        // 1. sets and bed_regions cannot be set at the same time or both missing
        if (! (def(elm.sets) ^ def(elm.bed_regions))) {
            this.err = "There can only be a list of genes or a BED file, not both";
            return false;
        }
        if (!def(elm.cutoff)) {
            this.err = "The cutoff must be provided"
            return false;
        }

        this.err = "";
        return true;
    }

    this.errMessage = function message() {
        return err;
    }

});

})(angular);