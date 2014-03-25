;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.directives",
                         ["$log", function mvFilter ($log) {
    return {
        restrict: "A",
        controller: "FilterCtrl",
        require: "?ngModel",
        transclude: true,
        template: "<form ng-transclude></form>"
        link: function (scope, elm, attrs, ngModel) {
            if (!ngModel) return;
        }


    }


 }]);



})(angular);