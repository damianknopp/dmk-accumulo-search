define([
//  'underscore',
//  'backbone',
  // Pull in the Model module from above
  'models/documentSummaryModel'
], function(documentSummaryModel){
  var documentSummariesCollection = Backbone.Collection.extend({
    model: documentSummaryModel
  });
  // You don't usually return a collection instantiated
  return new documentSummariesCollection;
});

