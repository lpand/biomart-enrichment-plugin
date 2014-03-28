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
            // abstract: true,
            url: "/gui/:gui",
            template: "<ui-view/>",
            resolve: {
                mart: [
                    "$location",
                    "$stateParams",
                    "bmservice",
                    function mart ($loc, $params, bm) {
                        return bm.marts($params.gui).then(function (res) {
                            var mart = res.data.marts[0];
                            $loc.url($loc.url()+"/config/"+mart.config)
                            return mart;
                        });
                }]
            }
        })
        .state("gui.config", {
            url: "/config/:config",
            templateUrl: "mart-visual-enrichment/app/partials/enrichment.html",
            resolve: {
                species: [
                    "$location",
                    "$stateParams",
                    "bmservice",
                    "mart",
                    function species ($loc, $params, bm, mart) {
                        return bm.datasets(mart.config).then(function (res) {
                            var species = res.data;
                            // $loc.url($loc.url()+"/species/"+species[0].name)
                            $loc.url($loc.url()+"/species/")
                            return species;
                        });
                    }]
            }
        })
        // .state("gui.config.species", {
        //     url: "/species",
        //     templateUrl: "mart-visual-enrichment/app/partials/species.html",
        //     controller: function ($scope, $location, species) {
        //         var ctrl = this;
        //         $scope.species = species;
        //         ctrl.setSpecies = function (spec) {
        //             $location.url($location.url()+"/"+spec.name)
        //         }
        //         scope.updateSpecies = function (spec) {
        //             ctrl.setSpecies(spec);
        //         }
        //         this.setSpecies(species[0]);
        //     }
        // })
        .state("gui.config.species", {
            url: "/species/:species", // matches also /species/ and i'll redirect /species to /species/
            templateUrl: "mart-visual-enrichment/app/partials/enrichment.html",
            views: {
                species: {
                    templateUrl: "mart-visual-enrichment/app/partials/species.html",
                    controller: "SpeciesCtrl"
                },
                sections: {
                    templateUrl: "mart-visual-enrichment/app/partials/sections.html",
                    controller: "EnrichmentCtrl",
                    controllerAs: "enr"
                }
            },
            resolve: {
                containers: [
                    "$stateParams",
                    "bmservice",
                    "species",
                    function containers ($params, bm, species) {
                        return bm.containers($params.species, $params.config, true)
                            .then(function getContainers (res) {
                                return res.data;
                            });
                    }
                ]
            },
            onEnter: [
                "$stateParams",
                "$state",
                "species",
                function onEnter($params, $state, species) {
                    if (!$params.species) {
                        $state.go("gui.config.species", {
                            species: species[0].name
                        })
                    }
                }]
        });

}]);

app.run(function ($rootScope) {
    $rootScope.$on("$stateChangeError", function (e) {
        console.log(e);
    })
    $rootScope.$on("$stateNotFound", function (e) {
        console.log(e);
    })

})

})(angular);