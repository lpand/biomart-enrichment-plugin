;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.directives");


/**
 *
 * This implementation is highly inspired by https://github.com/angular-ui/bootstrap/blob/master/src/tabs/tabs.js
 *
 */


app.controller("HSectionCtrl", ["$scope", function HSectionCtrl ($scope) {
    var ctrl = this, sections = $scope.sections = ctrl.sections = [];

    ctrl.addSection = function (section) {
        ctrl.sections.push(section);
        if (sections.length === 1 || section.active) {
            ctrl.select(section);
        }

        return this;
    }

    ctrl.select = function (section) {
        angular.forEach(sections, function (s) {
            if (s.active && s !== section) {
                s.active = false;
            }
        });
        section.active = true;

        return this;
    }

}]);

app.directive("hsectionset", function mveSets() {
    // In this way, sections share the same controller
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {},
        controller: "HSectionCtrl",
        templateUrl: "partials/hsection/hsectionset.html"
    };
});


app.directive("hsection", [function mveSetSection () {
    return {
        restrict: "E",
        require: "^hsectionset",
        transclude: true,
        replace: true,
        scope: {
            heading: "@"
        },
        controller: function () {},
        templateUrl: "partials/hsection/hsection.html",
        link: function (scope, elm, attrs, ctrl, transcludeFn) {
            ctrl.addSection(scope);
            scope.$transcludeFn = transcludeFn;
        }
    }
}]);

app.directive("hsectionContentTransclude", function hsectionContentTransclude (){
    return {
        restrict: "A",
        require: "^hsectionset",
        link: function (scope, elm, attrs, ctrl) {
            var sec = scope.$eval(atts.hsectionContentTransclude);
            // scope coming from the first element that introduces it, above
            // the horizontal section.
            sec.$transcludeFn(sec.$parent, function (contents) {
                angular.forEach(contents, function (node) {
                    elm.append(node);
                });
            });
        }
    };
});

})(angular);