define(function(require, exports, module) {

  var ViewSequence = function(options) {
    var self = this;
    // options data, template, size, properties
    var _ViewSequence = require("famous/core/ViewSequence");
    var MeteorSurface = require("library/meteor/core/Surface");
    var ReactiveEntity = require("library/meteor/core/ReactiveEntity");
    var index = {};

    // Create sequence
    self.sequence = new _ViewSequence();

    if (_.isArray(options.data)) {
        _.each(options.data, function(row) {

            sequence.push(new MeteorSurface({
                template: options.template,
                data: row,
                size: options.size,
                properties: options.properties
            }));

        });        
    } else if (typeof options.data == 'object') {
        // "data" is a MiniMongo cursor.  TODO, instanceof cursor check.
        self.observeHandle = options.data.observe({
          addedAt: function(document, atIndex, before) {
            // Keep an reactive index
            index[document._id] = new ReactiveEntity(document);
            // Add surface
            sequence.splice(atIndex, 0, new MeteorSurface({
                template: options.template,
                data: index[document._id].get(),
                size: options.size,
                properties: options.properties
            }));            
          },
          changedAt: function(newDocument, oldDocument, atIndex) {
            index[newDocument._id].set(newDocument);
          },
          removedAt: function(oldDocument, atIndex) {
            // Remove item
            var item = sequence.splice(atIndex, 1);
            // Clean up, help GC
            index[oldDocument._id] = null;
            // Clean up
            delete index[oldDocument._id];
            console.log('Removed', item);
            // item.destroy(); ??
          },
          movedTo: function(document, fromIndex, toIndex, before) {
            var item = sequence.splice(fromIndex, 1)[0];
            sequence.splice(toIndex, 0, item);
          }
        });
    }

    // Return the sequence handle
    return sequence;
  };

  module.exports = ViewSequence;
});