ViewSequence
============


```js
    var Scrollview       = require("famous/views/Scrollview");
    var MeteorSequence   = require("library/meteor/core/ViewSequence");

    var scrollview = new Scrollview();

    // Main view scroll view
    scrollview.sequenceFrom(new MeteorSequence({
        template: Template.mainItem,
        data: collection.find(),
        size: [undefined, 100],
        classes: ['listItem'],
        properties: {
            'padding-left': '20px'
        }
    }));
```

Credit goes to @gadicc since I let me inspire of some of his code, Thanks!