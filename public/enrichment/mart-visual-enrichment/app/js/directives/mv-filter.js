;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.directives");

app.directive("mvFilter", ["$parse", function mvFilter ($parse) {
    return {
        restrict: "A",
        templateUrl: "mart-visual-enrichment/app/partials/filter.html",
        compile: function compile (elem, attrs) {

            function link (scope, elm, attrs) {
                var filter = scope.$eval(attrs.mvFilter),
                    setValue = $parse(attrs.mvFilterModel).assign;

                if (!setValue) return;

                scope.setValue = function (value) {
                    setValue(scope, value);
                }
            }
        }

    }

 }]);



})(angular);