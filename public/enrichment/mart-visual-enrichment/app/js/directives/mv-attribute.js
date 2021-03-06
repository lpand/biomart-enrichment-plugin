;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.directives");

app.directive("mvAttribute", [
    "queryBuilder",
    function (qb) {
        return {
            restrict: "A",
            scope: {},
            templateUrl: "mart-visual-enrichment/app/partials/attribute.html",
            link: function (scope, elem, attrs) {
                scope.attr = scope.$parent.$eval(attrs.mvAttribute);
                scope.value = scope.attr.selected ? scope.attr.name : null;
                scope.tVal = scope.attr.name;
                scope.setAttribute = function (checked) {
                    if (checked) {
                        qb.setAttribute(scope.attr.name, scope.attr);
                    } else {
                        qb.setAttribute(scope.attr.name);
                    }
                };
            }
        };
    }
]);


})(angular);