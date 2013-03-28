/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var coffee = require("coffee-script-redux");
var loaderUtils = require("loader-utils");
module.exports = function(source) {
	this.cacheable && this.cacheable();
	var coffeeRequest = loaderUtils.getRemainingRequest(this);
	var jsRequest = loaderUtils.getCurrentRequest(this);
	var csAst = coffee.parse(source, {
		bare: true,
		// raw: true,
		optimise: true
	});
	var jsAst = coffee.compile(csAst, {
		bare: true,
		inScope: [
			"require", 
			"module", 
			"exports", 
			"define", 
			"__webpack_modules__",
			"__webpack_require__"
		]
	});
	var result = coffee.jsWithSourceMap(jsAst, jsRequest);
	result.map.setSourceContent(coffeeRequest, source);
	this.callback(null, result.code, result.map.toJSON());
}
