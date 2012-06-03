//// Require.js allows us to configure shortcut alias
//require.config({
//  paths: {
//	  jQuery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
//	  Underscore: 'underscore',
//	  Backbone: 'backbone'
////	  jquery: 'jquery-module-def',
////    underscore: 'underscore-module-def',
////    backbone: 'backbone-module-def'
//  }
//});

require(['order!https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', 'order!underscore', 'order!backbone'])

require([
// Load our app module and pass it to our definition function
 'app',
 
// Some plugins have to be loaded in order due to there non AMD compliance
// Because these scripts are not "modules" they do not pass any values to the definition function below
//'order!jquery',
//'order!underscore',
//'order!backbone'
], function(App){
	console.log("after load, in req-mods")
	//console.log(App)
//	console.log("initializing app..")
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
	AppRouter = App.initialize();
	console.log("app initialized...")
});

var AppRouter;