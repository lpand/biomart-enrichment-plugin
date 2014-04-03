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

    init: function () {
        var self = this, db = this._getDb();
        db.getItem(this._attrKeys).then(function (val) {
            if (!self._hasValue(val)) {
                db.setItem(self._attrKeys, []);
            }
        });
        db.getItem(this._filterKeys).then(function (val) {
            if (!self._hasValue(val)) {
                db.setItem(self._filterKeys, []);
            }
        });
    },

    _filterKeys: "qs.filters",

    _attrKeys: "qs.attrs",

    _configKey: "qs.config",

    _datasetKey: "qs.dataset",

    _hasValue: function hasValue(value) {
        return !(angular.isUndefined(value) || value === null);
    },

    _getDb: function _getIt () {
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

    _checkName: function _ckName(name) {
        if (!angular.isString(name)) {
            throw new Error("`name` is not either a string, null or undefined: "+ name);
        }
    },

    _param: function _slParam (key, value) {
        var db = this._getDb();
        return this._hasValue(name) ?
                // create/replace it, otheiwise remove it
                db.setItem(key, value) : db.removeItem(key);
    },

    _elem: function (collKey, eKey, eVal) {
        var self = this, db = this._getDb(), idx;
        return db.getItem(collKey).then(function aColl (aKeys) {
            function rm (val) { aKeys.splice(idx, 1); }
            function add (val) { aKeys.push(val); }
            function update () { db.setItem(collKey, aKeys); }

            // Add, remove, replace only if part of attrs or new one
            if ((idx = aKeys.indexOf(eKey)) !== -1) {
                return self._param(eKey, eVal).then(function (val) {
                    // if it's removed the element
                    if (!self._hasValue(val)) {
                        rm(val);
                    }
                });
            } else if (self._hasValue(eVal)) {
                db.setItem(eKey, eVal).then(function (val) {
                    add(val);
                });
            }
        });
    },

    // Getter/Setter.
    // If `value` is null, it will remove the filter with
    // name `name`, otherwise it will replace the value of the filter or create
    // a new entry key `name` with value `value` amongst the filters.
    // If name isn't a string, it throws an Error.
    // name String
    // value Any
    filter: function (name, value) {
        this._checkName(name);
        this._elem(this._filterKeys, name, value);
    },

    filtersAll: function() {
        this._coll(this._filterKeys);
    },

    // Getter/Setter.
    // See `#filter(name, value)`.
    // name String
    // value Any
    attr: function (name, value) {
        this._checkName(name);
        return this._elem(this._attrKeys, name, value);
    },

    attrsAll: function () {
        this._coll(this._attrKeys);
    },

    // Getter/Setter
    // Returns a promise.
    // If `name` is a string it'll replace or create an entry for the config
    // `name` as value, and fulfill the promise; if is null
    // or undefined it'll remove the config entry, otherwise it throws an Error.
    // config([name])
    // name String
    config: function (name) {
        this._checkName(name);
        return this._param(this._configKey, name);
    },

    // Getter/Setter.
    // See `#config(name)`.
    // name String
    dataset: function (name) {
        this._checkName(name);
        return this._param(this._datasetKey, name);
    }

};


}).call(this, angular);
