;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichement.controllers");

app.controller("SpeciesCtrl", ["$scope", "$location", "species",
    function EnrichmentCtrl($scope, $loc, species) {

    // [ [/* species */], config ]
    var _config = species[1];

    // Get species to show in the gui.
    $scope.species = species[0];


    $scope.updateSpecies = function (species) {
        $scope.currentSpecies = species;
        updateSearch(species.name);
    }


    function updateSearch(speciesName) {
        $loc.search({config: _config, species: speciesName});
    }


    $scope.updateSpecies($scope.species[0]);

}]);



})(angular);