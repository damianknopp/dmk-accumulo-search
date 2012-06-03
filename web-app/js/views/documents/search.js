// Filename: views/reports/search.js
define([
  // Pull in the Collection module from above
  'collections/documentSummariesCollection',
  'text!templates/documents/search.html',
  'views/toolbar'
], function(documentSummariesCollection, summariesTemplate, toolbarView){
  console.log("in search.js")
  var documentSummarySearchView = Backbone.View.extend({
    el: $("#content"),
    initialize: function(){
    	console.log("newing up a searchView")
      this.collection = documentSummariesCollection;
    },
    render: function(){
    	toolbarView.model.set({ curLink : "search"});
    	toolbarView.render();
    	// Compile the template using Underscores micro-templating
    	var compiledTemplate = _.template( summariesTemplate, { docSummaries: this.collection.models } );
    	$(compiledTemplate).appendTo(this.$el);
    }
  });
  // Returning instantiated views can be quite useful for having "state"
  return new documentSummarySearchView;
});

