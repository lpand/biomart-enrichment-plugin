;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");


app.controller("SpeciesCtrl", ["$scope",  "species",
    function SpeciesCtrl($scope, species, selectedSpecies) {

    $scope.species = species;
    $scope.selectedSpecies = selectedSpecies;

}]);



})(angular);