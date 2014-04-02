;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.directives");
var partialsDir = "mart-visual-enrichment/app/partials";


function putTextPromise($q, evt) {
    var d = $q.defer();

    var file = evt.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            d.resolve(evt.target.result);
        };
        reader.onerror = function (evt) {
            d.reject("Error reading file");
        };

        return d.promise;
    }

    return d.reject("No file provided");
}


app.directive("uploadFilter",
          ["$q", "queryBuilder", "sanitize", function ($q, qb, sanitize) {
    return {
        restrict: "E",
        templateUrl: partialsDir + "/upload-filter.html",
        scope: {},
        link: function (scope, iElement, attrs) {
            scope.filter = scope.$parent.$eval(attrs.filter);
            iElement.find("input").on("change", function onChange (evt) {
                var p = putTextPromise($q, evt);
                p.then(function then(text) {
                    var v = text ? sanitize.stripTags(text) : null;
                    scope.setFilter(v);
                }).catch(function rejected(reason) {
                    scope.setFilter();
                    scope.textareaValue = reason;
                });
            });

            scope.setFilter = function (value) {
                scope.filter.value = scope.textareaValue = value ? value : "";
                qb.setFilter(scope.filter.name, value && value !== "" ? scope.filter : null);
            };
        }
    };
}]);


app.directive("singleSelectUploadFilter",
          ["$q", "queryBuilder", "sanitize", function ($q, qb, sanitize) {
    return {
        restrict: "E",
        templateUrl: partialsDir + "/single-select-upload-filter.html",
        scope: {},
        link: function (scope, iElement, attrs) {
            var prevSelected;
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.options = scope.filter.filters;
            prevSelected = scope.selected = scope.options[0];
            iElement.find("input").on("change", function onChange (evt) {
                var p = putTextPromise($q, evt);
                p.then(function then(text) {
                    var v = text ? sanitize.stripTags(text) : null;
                    scope.setFilter(v);
                }).catch(function rejected(reason) {
                    scope.setFilter();
                    scope.textareaValue = reason;
                });
            });

            scope.csv = function (text) {
                return text.split("\n").join(",");
            };

            scope.setFilter = function (value) {
                scope.selected.value = scope.textareaValue = value ? value : "";
                qb.setFilter(scope.selected.name, value && value !== "" ? scope.selected : null);
            };

            scope.onSelect = function (selected) {
                if (prevSelected !== selected) {
                    qb.setFilter(prevSelected.name, null);
                    prevSelected = selected;
                    this.setFilter(this.textareaValue);
                }
            };
        }

    };
}]);


app.directive("textFilter",
          ["queryBuilder", "sanitize", function (qb, sanitize) {
    return {
        restrict: "E",
        templateUrl: partialsDir + "/text-filter.html",
        scope: {},
        link: function (scope, iElement, attrs) {
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.set = function set (value) {
                var v = angular.isString(scope.filterText) && scope.filterText !== "" ?
                    sanitize.stripTags(value) : null;
                scope.filter.value = v;
                qb.setFilter(scope.filter.name, v ? scope.filter : null);
            };
        }
    };
}]);

app.directive("booleanFilter",
          ["queryBuilder", function booleanFilter (qb) {
    return {
        restrict: "E",
        templateUrl: partialsDir + "/boolean-filter.html",
        scope: {},
        link: function (scope, iElement, attrs) {
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.set = function set (value) {
                scope.filter.value = value;
                qb.setFilter(scope.filter.name, scope.filter);
            };
        }
    };
}]);


app.directive("multiSelectFilter", [
              "queryBuilder",
              function multiSelectFilter (qb) {

    return {
        restrict: "E",
        templateUrl: partialsDir + "/multi-select-filter.html",
        scope: {},
        link: function link(scope, elem, attrs) {
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.options = scope.filter.values;
            scope.setFilter = function setFilter (values) {
                if (values && values.length) {
                    var vs = values.map(function (f) { return f.name; });
                    scope.filter.value = vs.join(",");
                    qb.setFilter(scope.filter.name, scope.filter);
                } else {
                    qb.setFilter(scope.filter.name);
                }
            };
            scope.onSelect = function select (value) {
                this.setFilter(value);
            };
        }
    };
}]);


app.directive("singleSelectBooleanFilter", [
              "queryBuilder",
              function multiSelectFilter (qb) {

    return {
        restrict: "E",
        templateUrl: partialsDir + "/single-select-boolean-filter.html",
        scope: {},
        link: function link(scope, elem, attrs) {
            var prevSelected = scope.selected;
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.options = scope.filter.filters;
            scope.setFilter = function setFilter (filter) {
                if (filter && prevSelected !== filter) {
                    filter.value = "only";
                    qb.setFilter(filter.name, filter);
                }
                if (prevSelected) {
                    qb.setFilter(prevSelected.name);
                }
                prevSelected = filter;
            };

            scope.onSelect = function select (value) {
                this.setFilter(value);
            };
        }
    };
}]);


app.directive("singleSelectFilter", [
              "queryBuilder",
              function multiSelectFilter (qb) {

    return {
        restrict: "E",
        templateUrl: partialsDir + "/single-select-filter.html",
        scope: {},
        link: function link(scope, elem, attrs) {
            scope.filter = scope.$parent.$eval(attrs.filter);
            scope.options = scope.filter.filters || scope.filter.values;
            scope.setFilter = function setFilter (value) {
                if (value && value !== "") {
                    scope.filter.value = value;
                    qb.setFilter(scope.filter.name, scope.filter);
                } else {
                    qb.setFilter(scope.filter.name);
                }
            };

            scope.onSelect = function select (value) {
                this.setFilter(value);
            };
        }
    };
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