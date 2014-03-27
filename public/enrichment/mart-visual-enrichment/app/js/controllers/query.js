;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("QueryCtrl", ["$scope", "$location", "queryValidator", "queryBuilder", "bmservice", QueryCtrl]);


function QueryCtrl($scope, $loc, queryValidator, qb, bm) {
    var ctrl = this;

    ctrl.queryValidator = queryValidator;
    ctrl.qb = qb;
    ctrl.$loc = $loc
}

QueryCtrl.prototype = {
    submit: function submit() {
        var ctrl = this;
        if (ctrl.validate()) {
            ctrl.buildQuery();
            $loc.url("/visualization/");
        } else {
            ctrl.showError(ctrl.queryValidator.errMessage());
        }
    },


    showError: function err() {

    },


    showModal: function modal() {

    },


    validate: function validate() {
        return this.queryValidator.validate(qb.getElements());
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
        if (ctrl.validate()) {
            ctrl.buildQuery();
            ctrl.openModal(ctrl.getXml());
        } else {
            showError(ctrl.queryValidator.errMessage());
        }
    }
}


})(angular);