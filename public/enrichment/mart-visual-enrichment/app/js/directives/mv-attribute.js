;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.directives");

app.directive("mvAttribute", [
    "queryStore", "$location",
    function (qs, $loc) {
        return {
            restrict: "A",
            scope: {},
            templateUrl: "mart-visual-enrichment/app/partials/attribute.html",
            link: function (scope, elem, attrs) {
                scope.attr = scope.$parent.$eval(attrs.mvAttribute);
                var fnValue = scope.attr.function;
                var ann = $loc.search()[fnValue] || [];
                scope.ckValue = ann.indexOf(scope.attr.name) !== -1 || scope.attr.selected;
                scope.setAttribute = function (checked) {
                    ann = $loc.search()[fnValue];
                    if (checked) {
                        ann = ann || [];
                        ann.push(scope.attr.name);
                        qs.attr(scope.attr.name, scope.attr.name);
                    } else {
                        if (ann) {
                            var i = ann.indexOf(scope.attr.name);
                            if (i !== -1) {
                                ann.splice(i, 1);
                            }
                        }
                        qs.attr(scope.attr.name);
                    }
                    $loc.search(fnValue, ann);
                };
            }
        };
    }
]);


})(angular);