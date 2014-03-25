;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("QueryCtrl", ["$scope", "queryValidator", "queryFactory", "bmservice", QueryCtrl]);


function QueryCtrl($scope, queryValidator, queryFactory, bm) {
    var ctrl = this;

    ctrl.queryValidator = queryValidator;
    ctrl.queryFactory = queryFactory;
}

QueryCtrl.prototype = {
    submit: function submit() {
        var ctrl = this;
        if (ctrl.validate()) {
            bm.query(ctrl.getXml());
            ctrl.nextStep();
        } else {
            ctrl.showError(ctrl.queryValidator.errMessage());
        }
    },


    nextStep: function () {

    },


    showError: function () {

    },


    validate: function validate() {
        return this.queryValidator.validate(queryFactory.elements());
    },


    getXml: function build() {
        var xml = this.queryFactory.create();
        return xml;
    },


    showQuery: function showQuery() {
        if (ctrl.validate()) {
            ctrl.openModal();
        } else {
            showError(ctrl.queryValidator.errMessage());
        }
    }
}


})(angular);