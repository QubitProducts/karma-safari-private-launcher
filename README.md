# karma-safari-private-launcher

> Launcher for Safari in private mode.

## Installation

```bash
npm install karma-safari-private-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['SafariPrivate']
  })
}
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers SafariPrivate
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
