define([
//  'underscore',
//  'backbone'
], function(){
  var documentSummaryModel = Backbone.Model.extend({
    defaults: {
      dtg: "!!dtg unknown!!",
      name: "!!report unknown!!",
      title: "!!title unknown!!",
      summary: "!!synopsis unknown!!",
      contents: "!!contents unknown!!",
      uri: "!!uri unknown!!"
    }
  });
  // You usually don't return a model instantiated
  return documentSummaryModel;
});