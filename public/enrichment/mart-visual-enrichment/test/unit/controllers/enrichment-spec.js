
describe("Enrichment Controller", function () {
    chai.should();
    var mkCtrl, $rootScope, $scope, $loc, species, config, $q, bm, containers;

    beforeEach(module("martVisualEnrichment.controllers"));
    beforeEach(inject(function ($injector) {
        $q = $injector.get("$q");
        $loc = $injector.get("$location");
        $rootScope = $injector.get("$rootScope");
        var $ctrl = $injector.get("$controller");

        species = [{name: "foo"}, {name: "bar"}];
        config = "configName";
        containers = fixtures.containers();
        bm = {
            containers: function() {
                return $q.when({
                    data: { containers: containers }
                });
            }
        };

        var finder = function () {
            return {
                addFunctions: function (){ return this },
                find: function () {
                    return fixtures.fns();
                }
            }
        }

        mkCtrl = function () {
            $scope = $rootScope.$new();
            var c = $ctrl("EnrichmentCtrl", { $scope: $scope, $location: $loc, bmservice: bm, findBioElement: finder });
            $rootScope.$apply();
            return c;
        };
    }));

    afterEach(function () { $scope = null; });

    it ("should initially not have containers", function () {
        var c = mkCtrl();
        $scope.should.not.have.property("containers");
    });

    it ("should get containers on url query change", function () {
        var c = mkCtrl();
        $loc.search({species: species[0].name, config: config});
        $scope.$apply();
        $scope.containers.should.eql(containers);
    });
})