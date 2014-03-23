;(function (angular) {

"use strict";

var app = angular.module("martVisualEnrichment.directives");

app.directive("mvSpecies", ["$location", function ($loc) {

    return {
        restrict: "E",
        templateUrl: "partials/species.html",
        scope: true,
        link: function (scope, elm, attrs) {
            scope.species = scope.$eval(attrs.species);
            // This event is broadcasted when the app has loaded and species promise fulfilled
            scope.$on("$locationChangeSuccess", function updateCurrentSpecies () {
                var search = $loc.search(), s = search.species;
                if (s !== scope.currentSpeciesName) {
                    scope.currentSpeciesName = s;
                    for (var i = 0, len = scope.species.length; i < len; ++i) {
                        var species = scope.species[i];
                        if (species.name === s) {
                            scope.selectedSpecies = species;
                            return;
                        }
                    }
                    // In case the new species doesn't exist
                    $loc.search("species", scope.selectedSpecies);
                }
            });

            scope.updateSpecies = function (species) {
                scope.currentSpeciesName = species.name;
                $loc.search({species: species.name});
            }
        }
    }

}]);

})(angular);