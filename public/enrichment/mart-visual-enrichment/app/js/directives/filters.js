;(function (angular) {
"use strict";


function putTextPromise($q, evt) {
    var d = $q.defer()

    var file = evt.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            d.resolve(evt.target.result);
        }
        reader.onerror = function (evt) {
            d.reject("Error reading file");
        }

        return d.promise;
    }

    return d.reject("No file provided");
}


var app = angular.module("martVisualEnrichment.directives");
var partialsDir = "mart-visual-enrichment/app/partials";

app.directive("uploadFilter",
          ["$q", "queryBuilder", "sanitize", function ($q, qb, sanitize) {
    return {
        restrict: "E",
        templateUrl: partialsDir + "/upload-filter.html",
        scope: true,
        link: function (scope, iElement, attrs) {
            scope.filter = scope.$parent.$eval(attrs.filter);
            iElement.find("input").on("change", function onChange (evt) {
                var p = putTextPromise($q, evt);
                p.then(function then(text) {
                    var v = text ? sanitize.stripTags(text) : null
                    scope.setFilter(v);
                }).catch(function rejected(reason) {
                    scope.setFilter();
                    scope.textareaValue = reason;
                });
            });

            scope.setFilter = function (value) {
                scope.textareaValue = value ? value : "";
                qb.setFilter(scope.filter.name, value && value !== "" ? value : null);
            }
        }
    }
}]);


app.directive("singleSelectUploadFilter",
          ["$q", "queryBuilder", "sanitize", function ($q, qb, sanitize) {
    return {
        restrict: "E",
        templateUrl: partialsDir + "/single-select-upload-filter.html",
        scope: true,
        link: function (scope, iElement, attrs) {
            var prevSelected;
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.options = scope.filter.filters;
            prevSelected = scope.selected = scope.options[0];
            iElement.find("input").on("change", function onChange (evt) {
                var p = putTextPromise($q, evt);
                p.then(function then(text) {
                    var v = text ? sanitize.stripTags(text) : null
                    scope.setFilter(v);
                }).catch(function rejected(reason) {
                    scope.setFilter();
                    scope.textareaValue = reason;
                });
            });

            scope.setFilter = function (value) {
                scope.textareaValue = value ? value : "";
                qb.setFilter(scope.selected.name, value && value !== "" ? value : null);
            }

            scope.onSelect = function (selected) {
                if (prevSelected !== selected) {
                    qb.setFilter(prevSelected, null);
                    prevSelected = selected;
                    this.setFilter(this.textareaValue);
                }
            }
        }

    }
}]);


app.directive("textFilter",
          ["queryBuilder", "sanitize", function (qb, sanitize) {
    return {
        restrict: "E",
        templateUrl: partialsDir + "/text-filter.html",
        scope: true,
        link: function (scope, iElement, attrs) {
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.set = function set (value) {
                var v = angular.isString(scope.filterText) && scope.filterText !== ""
                    ? sanitize.stripTags(value)
                    : null;
                qb.setFilter(scope.filter.name, v);
            }
        }
    }
}]);

app.directive("booleanFilter",
          ["queryBuilder", function booleanFilter (qb) {
    return {
        restrict: "E",
        templateUrl: partialsDir + "/boolean-filter.html",
        scope: true,
        link: function (scope, iElement, attrs) {
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.set = function set (value) {
                qb.setFilter(scope.filter.name, value);
            }
        }
    }
}]);


// app.controller("FilterCtrl", ["$scope", "queryBuilder", function FilterCtrl ($scope, qb) {
//     var ctrl = this;

//     ctrl.setFilter = function filterValue(name, value) {
//         qb.setFilter(name, value);
//     }

// }]);


// app.controller("AttributeCtrl", ["$scope", "queryBuilder", function FilterCtrl ($scope, qb) {
//     var ctrl = this;

//     ctrl.setAttribute = function attrValue(name, value) {
//         qb.setAttribute(name, value);
//     }

// }]);



})(angular);