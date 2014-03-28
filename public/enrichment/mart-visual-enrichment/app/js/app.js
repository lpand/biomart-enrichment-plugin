;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment", [
    "ui.router",
    "martVisualEnrichment.services",
    "martVisualEnrichment.controllers",
    "martVisualEnrichment.directives"
]);

app.config(["$stateProvider", "$locationProvider",
            function routes ($stateProvider, $locationProvider) {

    $stateProvider
        .state("gui", {
            abstract: true,
            url: "/gui/:gui/",
            templateUrl: "gui.html",
            resolve: {
                mart: [
                    "$state",
                    "$stateParams",
                    "bmservice",
                    function mart ($state, $params, bm) {
                        return bm.marts($params.gui).then(function (res) {
                            $state.go("gui.config", {config: mart.config})
                            return res.data.marts[0];
                        });
                }]
            }
        })
        .state("gui.config", {
            abstract: true,
            url: "/gui/:gui/config/:config",
            templateUrl: "gui.config.html",
            resolve: {
                species: [
                    "$state",
                    "$stateParams",
                    "bmservice",
                    "mart",
                    function species ($state, $params, bm, mart) {
                        return bm.datasets(mart.config).then(function (res) {
                            var species = res.data;
                            $state.go("gui.config.species", {
                                species: species[0]
                            });
                            return species;
                        });
                    }]
            }
        })
        .stete("gui.config.species", {
            url: "/species/:species",
            templateUrl: "species.html",
            controller: "SpeciesCtrl"
        })
        .state("gui.config.species.enrichment", {
            url: "/enrichment",
            templateUrl: "enrichment.html",
            controller: "EnrichmentCtrl",
            resolve: {
                containers: [
                    "$stateParams",
                    "bmservice",
                    function ($params, bmservice) {
                        bm.containers($params.species, $params.config, true)
                            .then(function getContainers (res) {
                                return res.data;
                            });
                    }]
            }
        });

}]);

})(angular);