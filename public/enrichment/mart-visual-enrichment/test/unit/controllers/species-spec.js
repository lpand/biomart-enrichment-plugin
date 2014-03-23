
describe("Species Controller", function () {
    chai.should();
    var mkCtrl, $rootScope, $scope, $loc, species, config;

    beforeEach(module("martVisualEnrichment.controllers"));
    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get("$rootScope");
        var $ctrl = $injector.get("$controller");

        species = [{name: "foo"}, {name: "bar"}];
        config = "configName";

        mkCtrl = function () {
            $scope = $rootScope.$new();
            var c = $ctrl("SpeciesCtrl", { $scope: $scope, species: species });
            $rootScope.$apply();
            return c;
        };
    }));

    afterEach(function () { $scope = null; });

    it ("should hold the species", function () {
        var c = mkCtrl();
        $scope.species.should.eql(species);
    });

});