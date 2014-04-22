define(function(require, exports, module) {

  var MeteorSurface = function(options) {
    var self = this;

    if (!(self instanceof MeteorSurface))
        throw new Error('Meteor Surface, please use the "new" keyword');

    // Load the original surface
    var Surface = require("famous/core/Surface");

    // Create a surface
    var surface = new Surface(options);

    surface.deploy = function(target) {
        // On deploy we create the template instance if set
        if (options.template) {
            // Create container
            surface.content = document.createElement('div');
            // Create instance
            self.templateInstance = UI.render(options.template);
            // Insert template into container
            UI.insert(self.templateInstance, surface.content);        
        }

        // Call super
        Surface.prototype.deploy.call(surface, target);
    };

    // Clean up
    surface.cleanup = function(allocator) {
        // Call super
        Surface.prototype.cleanup.call(surface, allocator);
        // Remove template instance
        self.templateInstance && self.templateInstance.dom.remove();
    };

    // Return the modified surface
    return surface;
  };


  // Export the function
  module.exports = MeteorSurface;

});
