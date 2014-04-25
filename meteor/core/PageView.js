define(function(require, exports, module) {

  var _PageView = function(surfaces, options) {
    var self = this;
    options = options || {};
    // Use the scroller
    var ScrollView = require('famous/views/Scrollview');
    // Use the Meteor Surface
    var Surface = require("library/meteor/core/Surface");

    if (surfaces.length) {
      
      // We force paginated here...
      options.paginated = true;

      // Allow direction to be set - but default to vertical
      options.direction = options.direction || 0;

      // Rig a scroll view
      var scrollview = new ScrollView(options.direction);

      // Create from sequence
      scrollview.sequenceFrom(surfaces);

      // Return the scrollview
      return scrollview;
    } else {
      throw new Error('pageView expects array of surfaces');
    }
  };

  module.exports = _PageView;
});    