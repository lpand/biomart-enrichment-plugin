<!doctype html>
<%@ page language="java" %>
<%@ page session="false" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="/WEB-INF/bmtaglib.tld" prefix="bm" %>
<html lang="en">
<c:set var="currentPage" scope="request" value="Enrichment"/>
<head>
  <c:import url="/conf/config.jsp" context="/"/>
    <title>${labels.document_title}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="mart-visual-enrichment/app/css/bootstrap/bootstrap.mod.css">
    <link rel="stylesheet" href="mart-visual-enrichment/app/css/app.css"/></head>
</head>
<body ng-app="martVisualEnrichment">

<div ng-view></div>

<script src="mart-visual-enrichment/app/lib/angular/angular.js"></script>
<script src="mart-visual-enrichment/app/lib/angular/angular-route.js"></script>
<script type="text/javascript" src="mart-visual-enrichment/app/lib/ui-bootstrap-tpls-0.10.0.js"></script>

<script src="mart-visual-enrichment/app/js/app.js"></script>

<script src="mart-visual-enrichment/app/lib/cytoscape.js"></script>

<script src="mart-visual-enrichment/app/js/services.js"></script>
<script src="mart-visual-enrichment/app/js/services/bmservice.js"></script>
<script src="mart-visual-enrichment/app/js/services/mv-config.js"></script>
<script src="mart-visual-enrichment/app/js/services/find-bio-element.js"></script>
<script src="mart-visual-enrichment/app/js/controllers.js"></script>
<script src="mart-visual-enrichment/app/js/controllers/species.js"></script>
<script src="mart-visual-enrichment/app/js/controllers/enrichment.js"></script>
<script src="mart-visual-enrichment/app/js/directives.js"></script>
<script src="mart-visual-enrichment/app/js/directives/mv-species.js"></script>


<!--
<script src="mart-visual-enrichment/app/js/services/tabs.js"></script>
<script src="mart-visual-enrichment/app/js/services/terms-async.js"></script>
<script src="mart-visual-enrichment/app/js/services/terms.js"></script>
<script src="mart-visual-enrichment/app/js/services/data-retrieve.js"></script>
<script src="mart-visual-enrichment/app/js/directives/mv-graph.js"></script>
<script src="mart-visual-enrichment/app/js/directives/mv-results-table.js"></script>
<script src="mart-visual-enrichment/app/js/directives/loading.js"></script>
-->

</body>
</html>