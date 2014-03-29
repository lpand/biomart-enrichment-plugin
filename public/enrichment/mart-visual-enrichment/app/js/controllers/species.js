;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");


app.controller("SpeciesCtrl", ["$scope", "$location",
    function SpeciesCtrl($scope, $loc) {

    var sName = $loc.search().species, species;
    for (var i = 0, len = $scope.species.length; i < len; ++i) {
        species = $scope.species[i];
        if (species.name === sName) {
            $scope.selectedSpecies = species;
            break;
        }
    }
    $scope.updateSpecies = function (species) {
        $loc.search("species", species.name);
    }


}]);



})(angular);