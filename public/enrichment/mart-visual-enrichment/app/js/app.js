;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment", [
    "ngRoute",
    "ui.bootstrap",
    "martVisualEnrichment.services",
    "martVisualEnrichment.controllers",
    "martVisualEnrichment.directives"
]);

app.config(["$routeProvider",
            function routes ($routeProvider) {

    var home = {
        controller: [
            "$scope",
            "coll",
            function MainCtlr ($scope, coll) {
                $scope.species = coll.species;
                $scope.containers = coll.containers;
            }
        ],
        templateUrl: "mart-visual-enrichment/app/partials/enrichment.html",
        resolve: {
            coll: ["$route", "$location", "$q", "bmservice",
                     function species ($route, $loc, $q, bm) {
                var config = bm.marts($route.current.params.gui).
                    then(function (res) {
                        return res.data.marts[0].config;
                    });
                var species = config.then(function (config) {
                        if (! ("config" in $loc.search())) $loc.search("config", config);
                        return bm.datasets(config);
                    }).
                    then(function (res) {
                        // species
                        return res.data;
                    });
                var cont = $q.all({
                        config: config,
                        species: species
                    }).
                    then(function (coll) {

                        var species = $loc.search().species;
                        if (! species) {
                            $loc.search("species", species = coll.species[0].name);
                        }

                        return bm.containers(species, coll.config, true).then(function getContainers (res) {
                                return res.data;
                            });

                    });

                return $q.all({
                    species: species,
                    containers: cont
                });
            }]
        }
    }

    // $locationProvider.html5Mode(true);

    $routeProvider
        .when("/gui/:gui/", home)
        // .otherwise("/");

}]);

})(angular);