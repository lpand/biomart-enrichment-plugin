;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("EnrichmentCtrl", ["$scope", "$location", "bmservice", "findBioElement",
    function EnrichmentCtrl($scope, $loc, bm, find) {

    var reqs = ["cutoff", "bonferroni", "regions", "sets", "background", "upstream", "downstream", "gene_type", "gene_limit", "homolog"];

    $scope.$on("$locationChangeSuccess", function searchChange () {
        var s = $loc.search(), changed = false;
        if (s.species !== $scope.enSpeciesName) {
            $scope.enSpeciesName = s.species;
            changed = true;
        }
        if (s.config !== $scope.enConfig) {
            $scope.enConfig = s.config;
            changed = true;
        }
        if (changed) {
            containersUpdatePathPromise($scope.enSpeciesName, $scope.enConfig);
        }
    });


    function containersUpdatePathPromise(species, config) {
        return bm.containers(species, config, true).
            then(function getContainers (res) {
                var c = $scope.containers = res.data.containers;
                $scope.enElements = findElements($scope.containers);
            }).
            catch(function (reason) {
                $log.error("Species controller: "+reason);
            });
    }


    function findElements(coll) {
        var finder = find(coll).addFunctions(reqs);
        return finder.find();
    }

}]);



})(angular);