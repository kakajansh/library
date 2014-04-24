ReactiveEntity
==============

```js
  var ReactiveEntity = require("library/meteor/core/ReactiveEntity");

  var foo = ReactiveEntity('default');
  // foo.get() === 'default'

  foo.set('bar');
  // foo.get() === 'bar'

```