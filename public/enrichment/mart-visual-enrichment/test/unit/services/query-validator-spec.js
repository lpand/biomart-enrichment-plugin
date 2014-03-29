describe("queryValidator service", function () {
    var expect = chai.expect, elms, qv, sets, bed_regions, cutoff, filters;

    beforeEach(module("martVisualEnrichment.services"));
    beforeEach(inject(function ($injector) {
        qv = $injector.get("queryValidator");
        filters = [];
        sets = {
            name: "set filter",
            function: "sets"
        }
        bed_regions = {
            name: "bed filter",
            function: "bed_regions"
        };
        cutoff = {
            name: "cutoff filter",
            function: "cutoff"
        };
        elms = {
            attributes: [],
            filters: filters
        }
    }));

    describe("valid case", function () {
        it ("when sets and cutoff are present", function () {
            filters.push(sets, cutoff);
            expect(qv.validate(elms)).to.be.true;
        });

        it ("when bed_regions and cutoff are present", function () {
            filters.push(bed_regions, cutoff)
            expect(qv.validate(elms)).to.be.true;
        });
    });


    describe("invalid case", function () {
        it ("when there are no filters", function () {
            expect(qv.validate(elms)).to.be.false;
        })

        it ("when sets, bed_regions and cutoff are present", function () {
            filters.push(sets, cutoff, bed_regions);
            expect(qv.validate(elms)).to.be.false;
        });

        it ("when cutoff is missing", function () {
            filters.push(bed_regions);
            expect(qv.validate(elms)).to.be.false;
        });
    });

});