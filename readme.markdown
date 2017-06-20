# treez

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/treez.svg)](https://greenkeeper.io/)

A simple tree widget inspired by [tree-view] where the css is copied from!
using [yo-yo]

# example
```javascript
var widget = require('treez')({
  root: root,
  onSelect: (selected) => console.log('selected', selected),
  onOpen: (opened) => console.log('opened', opened)
})
window.document.body.appendChild(widget.el)
```
see [full-example]

Try it out! [![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/embed?gist=98b36be0be9c529621feebf8e202acba)

[tree-view]:https://github.com/maxogden/tree-view
[yo-yo]:https://github.com/maxogden/yo-yo
[full-example]:https://github.com/JamesKyburz/treez/blob/master/example.js
