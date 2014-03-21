;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichement.controllers");

app.controller("EnrichmentCtrl", ["$scope", "$location", "bmservice",
    function EnrichmentCtrl($scope, $loc, bm) {

    $scope.$on("$locationChangeSuccess", function searchChange () {
        var s = $loc.search();
        if (s.species !== $scope.species) {
            containersUpdatePathPromise($scope.species = s.species, s.config);
        }
    });


    function containersUpdatePathPromise(species, config) {
        bm.containers(species.name, config, true).
            then(function getContainers (res) {
                $scope.containers = res.data.containers;
            }).
            catch(function (reason) {
                $log.error("Species controller: "+reason);
            });
    }

    // TODO: set default paramters for enrichment like cutoff=1, bonferroni=excluded...

}]);



})(angular);