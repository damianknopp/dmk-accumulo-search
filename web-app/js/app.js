define([
//  'jquery',
//  'underscore',
//  'backbone',
  'router' // Request router.js
], function(Router){
//	console.log("in app.js")
//	console.log($)
//	console.log(_)
//	console.log(Backbone)
//	console.log(Router)
	var initialize = function(){
		// Pass in our Router module and call it's initialize function
		return Router.initialize();
	}
//	console.log("returning from app.js")
	return {
		initialize: initialize
	};
});

