;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("QueryCtrl", QueryCtrl);

QueryCtrl.$inject = [ "$scope", "$location", "queryValidator", "queryBuilder", "bmservice", "mvConfig"];
function QueryCtrl($scope, $loc, queryValidator, qb, bm, config) {
    var ctrl = this;

    ctrl.queryValidator = queryValidator;
    ctrl.qb = qb;
    ctrl.$loc = $loc
    ctrl.bm = bm;
    ctrl.config = config;
}

QueryCtrl.prototype = {
    submit: function submit() {
        var ctrl = this;
        if (ctrl.validate()) {
            ctrl.buildQuery();
            $loc.url(ctrl.config.visualizationUrl);
        } else {
            ctrl.showError(ctrl.queryValidator.errMessage());
        }
    },


    showError: function err() {

    },


    showModal: function modal() {

    },


    validate: function validate() {
        return this.queryValidator.validate(this.qb.getElements());
    },


    getXml: function build() {
        return this.qb.getXml();
    },


    buildQuery: function build () {
        var ctrl = this, s = ctrl.$loc.search(), spec = s.species,
            cfg = s.config;
        ctrl.qb.build(spec, cfg);
    },


    showQuery: function showQuery() {
        var ctrl = this;
        if (ctrl.validate()) {
            ctrl.buildQuery();
            ctrl.openModal(ctrl.getXml());
        } else {
            showError(ctrl.queryValidator.errMessage());
        }
    }
}


})(angular);