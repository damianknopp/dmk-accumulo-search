define([
  'text!templates/toolbar.html',
  'models/toolBarModel',
  'collections/documentSummariesCollection',
  'text!templates/documents/search.html'
], function(toolbarTemplate, toolBarModel, documentSummariesCollection, summariesTemplate){
  console.log("in toolbar.js")
  var toolbarView = Backbone.View.extend({
    el: $("#content"),
    events:{
    	"focus .leftHeader > form > input[type=text]": "focusInSearch",
    	"blur .leftHeader > form > input[type=text]": "focusOutSearch",
    	"change .leftHeader > form > input[type=text]": "searchBoxChange",
    	"submit .leftHeader > form": "submitSearch"
    },
    initialize: function(){
    	console.log("newing up a toolbar view.");
    	this.model = toolBarModel;
    	this.model.view = this;
    	this.collection = documentSummariesCollection;
    },
    
    /**
     * render the minimum components of the page
     */
    renderMin: function(){
    	// Compile the template using Underscores micro-templating
    	var toolbar = _.template( toolbarTemplate, {
    		curText: this.model.get("quickSearchMsg"),
    		curLink: this.model.get("curLink")
    		});
    	this.$el.html(""); //clear out the page
    	$(toolbar).prependTo(this.$el);
    },
    
    /**
     * 
     */
    renderMsg:  function(msg){
    	this.renderMin();
    	this.$el.append(msg);
    },
    
    /**
     * 
     */
    render: function(){
    	this.renderMin();
    	console.log("found %s models", this.collection.models.length)
    	console.log(this.collection.models[0])
		compiledTemplate = _.template( summariesTemplate, { docSummaries: this.collection.models } );
		$(compiledTemplate).appendTo(this.$el);
		this.collection.reset();
    },
    
    /**
     * 
     */
    searchBoxChange: function(event){
    	var val = $(event.target).val() || "unk";
    	console.log("update model to " + val);
    	this.model.set({ quickSearchMsg: val })
    },
    
    /**
     * 
     */
    focusInSearch: function(event){
    	$(event.target).attr("size", 40);
    	$(event.target).addClass("focus");
    },
    focusOutSearch: function(event){
    	$(event.target).attr("size", 25);
    	$(event.target).removeClass("focus");
    },
    submitSearch: function(event){
    	//serialize isnt working?
//    	var vals = $(event.target).serialize();
    	var vals = $(".leftHeader form input[type='text']").val()
    	console.log("submit '%s'", vals);
    	var terms;
    	var self = this;
    	if(vals && !_.isEmpty(vals)){
    		terms = vals.split(" ")
    		terms = terms.join("/")
    		var termSearchUri = "/accumulo-test/document/search/{terms}".replace("{terms}", terms)
    		this.renderMsg("Contacting server, searching for '{1}'".replace("{1}", vals));
    		$.get(termSearchUri, function(results, status, xhr){
    			console.log("success")
    			console.log(arguments)
    			self.collection.reset(arguments[0]);
//    			AppRouter.navigate("#/documents/search")
    	    	self.model.set({ curLink : "n/a"})
    			self.render()
    		}).error(function(){ console.log("trouble with network call")});
    	}
    }
  });
  // Returning instantiated views can be quite useful for having "state"
  return new toolbarView;
});