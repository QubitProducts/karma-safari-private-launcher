var applescript = require('applescript')

function launchBrowser (url) {
  var script = `
    activate application "Safari"

    tell application "System Events"
      tell process "Safari"
        -- Closing windows is sometimes called out of order, so just leave the open windows alone
        -- key code 13 using {option down, command down} -- alt-command-W, close all windows
        key code 45 using {shift down, command down} -- shift-command-N, new private window
      end tell
    end tell

    tell application "Safari"
      set URL of document 1 to "${url}"
    end tell
  `

  applescript.execString(script, function (err) {
    if (err) throw err
  })
}

function killBrowser (done) {
  var script = `
  activate application "Safari"
  tell application "System Events" to tell process "Safari"
    key code 13 using {option down, command down} -- alt-command-W, close all windows
    key code 12 using command down -- shift-command-Q, quit
  end tell
  `

  applescript.execString(script, function (err) {
    if (err) throw err
    done()
  })
}

var SafariBrowser = function (baseBrowserDecorator) {
  baseBrowserDecorator(this)
  this._start = launchBrowser
  this.on('kill', killBrowser)
}

SafariBrowser.prototype = {
  name: 'SafariPrivate'
}

SafariBrowser.$inject = ['baseBrowserDecorator']

module.exports = {
  'launcher:SafariPrivate': ['type', SafariBrowser]
}
