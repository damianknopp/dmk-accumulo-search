<!doctype html>
<html lang="en">
<head>
<title>Main - Backbone.js sample</title>
<link rel="stylesheet" type="text/css"
	href="http://localhost:${request.localPort}${request.contextPath}/css/app.css" />
<!-- require will efficiently load our js modules -->
<!-- Load the script "js/require-modules.js" as our entry point -->
<script
	data-main="http://localhost:${request.localPort}${request.contextPath}/js/require-modules"
	src="http://localhost:${request.localPort}/${request.contextPath}/js/require.js"></script>
</head>
<body>
	<div id="content" class="center reduceWidth">
		<div id="results"></div>
		<hr />
		<div class="status"></div>
	</div>
</body>
</html>