;(function (angular) {
"use strict";

var app = angular.module("martVisualEnrichment.controllers");

app.controller("QueryCtrl", QueryCtrl);

QueryCtrl.$inject = [ "$scope", "$location", "$window", "queryValidator", "queryBuilder", "bmservice", "mvConfig", "$modal"];
function QueryCtrl($scope, $loc, win, qv, qb, bm, config, $modal) {
    var ctrl = this;

    ctrl.win = win;
    ctrl.$modal = $modal;
    ctrl.qv = qv;
    ctrl.qb = qb;
    ctrl.$loc = $loc
    ctrl.bm = bm;
    ctrl.config = config;
}

QueryCtrl.prototype = {
    submit: function submit() {
        var ctrl = this;
        if (ctrl.validate()) {
            ctrl.buildQuery();
            $loc.url(ctrl.config.visualizationUrl);
        } else {
            ctrl.showError(ctrl.qv.errMessage());
        }
    },


    showError: function err(message) {
        this.win.alert(message);
    },


    openModal: function modal(xml) {
        this.$modal.open({
            template: '<div class="modal-header"><h2>XML</h2></div><div class="modal-body"><pre><code>"'+window.escapeHtmlEntities(xml)+'"</code></pre></div>'
        });


    },


    validate: function validate() {
        return this.qv.validate(this.qb.getElements());
    },


    getXml: function build() {
        return this.qb.getXml();
    },


    buildQuery: function build () {
        var ctrl = this, s = ctrl.$loc.search(), spec = s.species,
            cfg = s.config;
        ctrl.qb.build(spec, cfg);
    },


    showQuery: function showQuery() {
        var ctrl = this;
        if (ctrl.validate()) {
            ctrl.buildQuery();
            ctrl.openModal(ctrl.getXml());
        } else {
            ctrl.showError(ctrl.qv.errMessage());
        }
    }
}


})(angular);