;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("VisualizationCtrl",
           ["$scope", "queryBuilder", "bmservice",
           function VisualizationCtrl ($scope, qb, bm) {
    var ctrl = this, xml = qb.getXml();

    var tabs = bm.query(xml, {cache: false}).
        then(function then (res) {
            var graphs = res.data.graphs;
            return Object.keys(graphs).map(function (tabTitle) {
                var g = graphs[tabTitle];
                return {
                    title: tabTitle,
                    nodes: g.nodes,
                    edges: g.edges
                };
            });
        })

    $scope.mvTabs = [];

    ctrl.state = function state(curr) {
        $scope.currentState = curr;
    }

    ctrl.state("loading");

    tabs.then(function (tabs) {
        $scope.mvTabs = tabs;
        ctrl.state("loaded");
    }, function (reason) {
        $scope.errorMessage = reason;
        ctrl.state("error");
    });

}]);

}) (angular);