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

    arr.push(['<Dataset name="', dataset, '" ', 'config="' + config + '">'].join(""));

    Object.keys(filters).forEach(function (fk) {
        var v = filters[fk], set = true;
        if (angular.isDefined(v)) {
            if (angular.isString(v) && v.trim() === "") {
                set = false;
            }

            if (set) {
                arr.push('<Filter name="'+fk+'" value="'+v+'" />');
            }
        }
    })

    Object.keys(attributes).forEach(function (ak) {
        var v = attributes[ak]
        if (angular.isDefined(v)) {
            arr.push('<Attribute name="'+v+'" />');
        }
    })

    arr.push("</Dataset>")
    arr.push('</Query>');

    return arr.join('');
}


app.service("queryBuilder",
         [function () {

    this.filters = {};
    this.attrs = {};
    this.xml = "";

    this.setFilter = function (name, value) {
        this.filters[name] = value;
    };

    this.setAttribute = function (name) {
        this.attrs[name] = name;
    }

    this.rmAttribute = function (name) {
        delete this.attrs[name];
    }

    this.build = function (dataset, config) {
        return this.xml = xml(dataset, config, this.filters, this.attrs, "TSV", 1000, true, true);
    }

    this.getXml = function () {
        return this.xml;
    }

}]);


// Set the proper filters, attributes, dataset and config for the query
// app.service("queryFactory", ["queryBuilder", function (qb) {

//     this.elmMap = null;

//     this.elements = function setElms(elmMap) {
//         if (elmMap) {
//             this.elmMap = elmMap;
//             return this;
//         } else {
//             return this.elmMap
//         }
//     }

//     this.create = function create() {

//     }

// }]);

})(angular);