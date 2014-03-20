;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("VisualizationCtrl",
           ["$scope", "tabs",
           function VisualizationCtrl ($scope, tabs) {

    $scope.mvTabs = [];

    tabs.then(function (tabs) {
        $scope.mvTabs = tabs;
    });

}]);

}) (angular);