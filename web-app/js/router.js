define([
//  'jquery',
//  'underscore',
//  'backbone',
  'views/documents/search',
  'views/home'
], function(documentSummaryView, homeView){
//	console.log("in router")
//	console.log(Backbone)
//	console.log(reportSummaryView)
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'documents/search': 'searchDocuments',
      'document': 'showDocument',
      'home': 'home',
      'main/index': 'home',
      // Default
      '*actions': 'defaultAction'
    },
    home: function(){
    	console.log("welcome home!")
    	homeView.render();
    },
    searchDocuments: function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/documents/search'
      console.log("documents search")
      console.log(arguments)
      documentSummaryView.render();
    },
    showDocument: function(){
    	console.log("show document")
    },
    defaultAction: function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('No route:', actions);
      homeView.render();
    }
  });

  var initialize = function(){
    var appRouter = new AppRouter;
    Backbone.history.start();
    return appRouter;
  };
  return {
    initialize: initialize
  };
});