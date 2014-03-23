;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment", [
    "martVisual",
    "martVisualEnrichment.services",
    "martVisualEnrichment.controllers",
    "martVisualEnrichment.directives"
]);

app.config(["$routeProvider", "$locationProvider",
            function routes ($routeProvider, $locationProvider) {

    // This route gets species for the EnrichmentCtrl
    var home = {
        controller: "SpeciesCtrl",
        templateUrl: "partials/enrichment.html",
        resolve: {
            species: ["$routeParams", "$location", "bmservice",
                     function species ($params, $loc, bm) {
                return bm.marts($params.gui).then(function (res) {
                    var mart = res.data.marts[0];
                    return bm.datasets(mart.config).then(function (species) {
                        var query = $loc.search();
                        if (! "species" in query) $loc.search("species", species[0]);
                        if (! "config" in query) $loc.search("config", mart.config);
                        return species;
                    });
                });
            }]
        }
    }


    $routeProvider
        .when("/gui/:gui", home)
        .otherwise("/");

    $locationProvider.html5Moder(true);

}]);

// app.run(["$templateCache",function($templateCache) {
//     $templateCache.put("partials/table-of-results.html", document.getElementById("table-of-results.html").textContent);
//     $templateCache.put("partials/vis.html", document.getElementById("vis.html").textContent);
//     $templateCache.put("partials/mart-visual-enrichment.html", document.getElementById("mart-visual-enrichment.html").textContent);
// }]);

})(angular);