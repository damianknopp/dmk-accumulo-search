define([
  'text!templates/home.html',
  'views/toolbar'
], function(homeTemplate, toolbarView){
  console.log("in home.js")
  var homeView = Backbone.View.extend({
    el: $("#content"),
    initialize: function(){
    	console.log("newing up a home view.")
    },
    render: function(){
    	toolbarView.model.set({ curLink : "home"});
    	toolbarView.render();
    	// Compile the template using Underscores micro-templating
    	var compiledTemplate = _.template( homeTemplate, { } );
    	$(compiledTemplate).appendTo(this.$el);
    }
  });
  // Returning instantiated views can be quite useful for having "state"
  return new homeView;
});

