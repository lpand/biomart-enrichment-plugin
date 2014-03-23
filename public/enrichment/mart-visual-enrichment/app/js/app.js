;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment", [
    "ngRoute",
    "martVisualEnrichment.services",
    "martVisualEnrichment.controllers",
    "martVisualEnrichment.directives"
]);

app.config(["$routeProvider", "$locationProvider",
            function routes ($routeProvider, $locationProvider) {

    // This route gets species for the EnrichmentCtrl
    var home = {
        controller: "SpeciesCtrl",
        templateUrl: "mart-visual-enrichment/app/partials/enrichment.html",
        resolve: {
            species: ["$route", "$location", "bmservice",
                     function species ($route, $loc, bm) {
                return bm.marts($route.current.params.gui)
                .then(function (res) {
                    return res.data.marts[0];
                }).then(function (mart) {
                    if (! ("config" in $loc.search())) $loc.search("config", mart.config);
                    return bm.datasets(mart.config);
                }).then(function (res) {
                    var species = res.data;
                    if (! ("species" in $loc.search())) $loc.search("species", species[0].name);
                    return species;
                });
            }]
        }
    }

    // $locationProvider.html5Mode(true);

    $routeProvider
        .when("/gui/:gui", home)
        // .otherwise("/");

}]);

// app.run(["$templateCache",function($templateCache) {
//     $templateCache.put("partials/enrichment.html", document.getElementById("enrichment.html").textContent);
//     $templateCache.put("partials/species.html", document.getElementById("species.html").textContent);
// }]);

})(angular);