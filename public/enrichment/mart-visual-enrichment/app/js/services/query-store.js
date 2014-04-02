;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.services");

QueryStore.$inject = ["$q", "$location", "$localForage"];
app.service("queryStore", QueryStore);
// It handles the storage of filter values, attributes names, configuration and
// dataset to persist the state of parameters selected by the deployer and the user.
// It allows to get hold of the query parameters across different sessions.
// It should have as little state as possible, because services are instanciated
// only on URL load or re-load, not through page history.

// All the names for filters, attributes, configurations, datasets must be unique
// or they'll clash.
function QueryStore($q, $loc, $localForage) {
    this.$q = $q;
    this.$loc = $loc;
    this.$localForage = $localForage;
    this.init();
}


QueryStore.prototype = {

    init: function () {},

    _filterKeys: "qs.filters",

    _attrKeys: "qs.attrs",

    _configKey: "qs.config",

    _datasetKey: "qs.dataset",

    _getDb: function () {
        return this.$localForage;
    },

    _coll: function _coll(collKey) {
        var db = this._getDb(), self = this;
        return db.getItem(collKey).then(function keysFn (keys) {
            var values = keys.map(function pValue(k) {
                return db.getItem(k);
            });
            return self.$q.all([values]);
        });
    },

    _handleSingleParam: function (key) {
        var db = this._getDb(), p;
        if (angular.isString(name)) {
            p = db.setItem(key, name);
        } else if (name === null || angular.isUndefined(name)) {
            p = db.removeItem(key);
        } else {
            p = this.$q.reject("`name` is not either a string, null or undefined: "+ name);
        }

        return p;
    },



    // Getter/Setter.
    // If `value` is null, it will remove the filter with
    // name `name`, otherwise it will replace the value of the filter or create
    // a new entry key `name` with value `value` amongst the filters.
    // name String
    // value Any
    filter: function (name, value) {},

    filtersAll: function() {
        this._coll(this._filterKeys);
    },

    // Getter/Setter.
    // See `#filter(name, value)`.
    // name String
    // value Any
    attr: function (name, value) {},

    attrsAll: function () {
        this._coll(this._attrKeys);
    },

    // Getter/Setter
    // Returns a promise.
    // If `name` is a string it'll replace or create an entry for the config
    // `name` as value, and fulfill the promise; if is null
    // or undefined it'll remove the config entry, otherwise it rejects.
    // config([name])
    // name String
    config: function (name) {
        return this._handleSingleParam(this._configKey);
    },

    // Getter/Setter.
    // See `#config(name)`.
    // name String
    dataset: function (name) {
        return this._handleSingleParam(this._datasetKey);
    }

};


}).call(this, angular);



    // name must be a string key.
    // returns a promise that fulfills if there is the value for this key,
    // rejects if there is not.
    // It reads the URL query first, then the db.
    // read: function readFilterValue(name) {
    //     var ctrl = this;
    //     var def = ctrl.$q.defer();
    //     var search = null, value;
    //     if (angular.isString(name)) {
    //         search = ctrl.$loc.search();
    //         value = search[name] || ctrl.$db.getItem(name);
    //         if (angular.isDefined(value)) {
    //             def.resolve(value);
    //         } else {
    //             def.reject("no value for "+name+" key");
    //         }
    //     } else {
    //         def.reject("name must be a string");
    //     }

    //     return def.promise;
    // },

    // hasName: function hasName(filter) {
    //     return !!filter.name;
    // },

    // hasValue: function hasValue(filter) {
    //     return angular.isDefined(filter.value) && filter.value !== null;
    // },

    // // This functions takes a Filter object representing a Biomart filter that must
    // // have the following props:
    // // {
    // //     name: "string",
    // //     value: "any"
    // // }
    // // Return a promise
    // // It updates the db. If filter.value is null then it removes the filter.
    // updateDb: function updateFilterValueDB(filter) {
    //     var ctrl = this, value;
    //     if (ctrl.hasName(filter)) {
    //         if (ctrl.hasValue(filter)) {
    //             ctrl.$db.setItem(filter.name, filter.value);
    //         } else {
    //             ctrl.$db.removeItem(filter.name);
    //         }
    //     }
    // }
