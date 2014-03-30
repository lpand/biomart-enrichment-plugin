;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.services");

// X dataset is the tostring of an object
// X? there are not attributes
// X check for empty filters
// X? unset boolean filter is missing

function xml (dataset, config, filters, attributes, processor, limit, header, client) {
    header = header ? 1 : 0;
    client = client || '';

    var arr = [
            '<!DOCTYPE Query>',
            '<Query client="' + client + '" processor="' + processor + '"' + (limit ? ' limit="' + limit + '"' : '-1') + ' header="' + header + '">'
        ];

    if (!dataset) return null;

    arr.push(['  <Dataset name="', dataset, '" ', 'config="' + config + '">'].join(""));

    Object.keys(filters).forEach(function (fk) {
        var v = filters[fk];
        if (v) {
            v = filters[fk].value
            if (angular.isDefined(v)) {
                if (angular.isString(v) && v.trim() === "") {
                    return;
                }
                arr.push('    <Filter name="'+fk+'">'+v+'</Filter>');
            }
        }
    })

    Object.keys(attributes).forEach(function (ak) {
        var v = attributes[ak]
        if (v) {
            arr.push('    <Attribute name="'+ak+'"></Attribute>');
        }
    })

    arr.push("  </Dataset>")
    arr.push('</Query>');

    return arr.join('\n');
}


app.service("queryBuilder",
         [function () {

    this.filters = {};
    this.attrs = {};
    this.xml = "";

    this.setFilter = function (name, value) {
        this.filters[name] = value;
    }

    this.setAttribute = function (name, value) {
        this.attrs[name] = value;
    }

    this.build = function (dataset, config) {
        var limit = -1, header = true, client = false;
        return this.xml = xml(dataset, config, this.filters, this.attrs, "TSV", limit, header, client);
    }

    this.getXml = function () {
        return this.xml;
    }

    this.getElements = function getEls() {
        return {
            filters: this.filters,
            attributes: this.attrs
        }
    }

}]);


})(angular);