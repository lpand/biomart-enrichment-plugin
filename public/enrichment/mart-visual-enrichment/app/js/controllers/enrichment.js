;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichement.controllers");

app.controller("EnrichmentCtrl", ["$scope", "$routeParams", "$location", "bmservice",
    function EnrichmentCtrl($scope, $routeParams, $loc, bm) {

    var gui = $routeParams.gui, mart;

    bm.marts(gui).then(function (res) {
        var data = res.data;
        mart = data.marts[0].name;
        $scope.config = data.marts[0].config;
        return bm.datasets(mart);
    }).then(function (res) {
        var data = res.data;
        $scope.species = data[mart];
        // Last param says we want filters too
        return bm.containers($scope.species[0].name, $scope.config, true);
    }).then(function (res) {
        $scope.containers = res.data.containers;
    }).catch(function (reason) {
        $log.error("Enrichment controller: "+reason);
    });

    this.select = function (species) {
        bm.containers(species.name, $scope.config, true).then(function (res) {
            $scope.containers = res.data.containers;
        });
    }

}]);



})(angular);