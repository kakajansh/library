// Credit goes to @gadicc since I let me inspire of some of his code, Thanks! 
define('library/meteor/core/ViewSequence', ["famous/core/ViewSequence","library/meteor/core/Surface","library/meteor/core/ReactiveEntity"], function(require, exports, module) {
  // options data, template, size, properties
  var _ViewSequence = require("famous/core/ViewSequence");
  var MeteorSurface = require("library/meteor/core/Surface");
  var ReactiveEntity = require("library/meteor/core/ReactiveEntity");

  var ViewSequence = function(options) {
    var self = this;
    var index = {};

    // Create sequence
    var sequence = new _ViewSequence();
    // sequence._.reindex

    if (_.isArray(options.data)) {
        _.each(options.data, function(row) {
            sequence.push(new MeteorSurface({
                template: options.template,
                data: row,
                size: options.size,
                properties: options.properties,
                classes: options.classes || []
            }));

        });        
    } else if (typeof options.data == 'object') {
        // "data" is a MiniMongo cursor.  TODO, instanceof cursor check.
        self.observeHandle = options.data.observe({
          addedAt: function(doc, atIndex, before) {
            index[doc._id] = new ReactiveEntity(doc);
            sequence.splice(atIndex, 0, new MeteorSurface({
                template: options.template,
                data: index[doc._id].get(),
                size: options.size,
                properties: options.properties
            }));            
          },
          changedAt: function(newDocument, oldDocument, atIndex) {
            sequence._.setValue(atIndex, new MeteorSurface({
                template: options.template,
                data: newDocument,
                size: options.size,
                properties: options.properties
              }) 
            )
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
          movedTo: function(doc, fromIndex, toIndex, before) {
            var item = sequence._.array.splice(fromIndex, 1)[0];
            sequence.splice(toIndex, 0, item);
          }
        });
    }

    // Return the sequence handle
    return sequence;
  };

  module.exports = ViewSequence;
});
