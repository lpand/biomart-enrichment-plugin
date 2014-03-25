;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.services");

app.service("queryValidator", function queryValidator() {
    this.err = "";

    // TODO: add validation rules to the config
    this.validate = function validate (elmMap) {
        var def = angular.isDefined.bind(angular);
        // 1. sets and bed_regions cannot be set at the same time.
        if (def(elm.sets && def(elm.bed_regions))) {
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