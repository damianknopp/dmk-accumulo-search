define([], function(){
  var toolBarModel = Backbone.Model.extend({
    defaults: {
    	quickSearchMsg: "Enter a keyword",
    	curLink : "home"
    },
    initalize: function(){
    	console.log("newing up a toolBarModel")
    }
  });
  // You usually don't return a model instantiated
  return new toolBarModel;
});