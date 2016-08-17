var css = require('insert-css')
var fs = require('fs')
var yo = require('yo-yo')
var path = require('path')

module.exports = Tree
Tree.items = items

function Tree (opt) {
  var state = {
    selected: opt.selected || [],
    open: opt.open || [],
    openAll: opt.openAll,
    root: opt.root || {},
    toggled: []
  }

  var el = render()

  return el

  function load () {
    if (opt.style !== false) css(fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8'))
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
  }

  function keyUp (e) {
    state.shift = false
  }

  function keyDown (e) {
    state.shift = e.shiftKey
  }

  function unload () {
    window.removeEventListener('keydown', keyDown)
    window.removeEventListener('keyup', keyUp)
  }

  function render () {
    return yo`
      <div class='tree-view' onload=${load} onunload=${unload}>
        ${renderDirectory(state.root)}
      </div>
    `
  }

  function update () {
    yo.update(el, render())
  }

  function renderDirectory (root) {
    var toggled = state.toggled.indexOf(root) !== -1
    var open = (root.open && !toggled) ||
      state.open.indexOf(root) !== -1 ||
      state.openAll
    var className = 'entry'
    className += root.entries.length ? ' directory' : ' file'
    className += state.selected.indexOf(root) === -1 ? '' : ' selected'
    className += open ? ' open' : ''

    return yo`
      <ul>
        <li key=${root.path} class=${className} onclick=${toggle(root)}>
          <div class='list-item'>
            <span data-id=${root.id}><a>${root.path}</a></span>
            <span onload=${(span) => { span.innerHTML = root.html || '' }} />
          </div>
          ${open || toggled ? root.entries.map(renderDirectory) : ''}
        </li>
      </ul>
    `
  }

  function toggle (root) {
    return function (e) {
      var el = e.target
      var type = !root.entries.length || /A|SPAN/.test(el.nodeName) ? 'selected' : 'open'
      while (el.nodeName !== 'LI') el = el.parentNode
      var typeState = state[type]
      var pos = typeState.indexOf(root)
      if (type === 'open' && root.open && pos === -1 && state.toggled.indexOf(root) === -1) {
        typeState.push(root)
        pos = state.length - 1
      }
      if (type === 'selected' && !state.shift) {
        typeState = pos === -1 ? [root] : []
        state[type] = typeState
      } else {
        if (pos === -1) {
          typeState.push(root)
        } else {
          typeState.splice(pos, 1)
        }
      }
      state.toggled = state.toggled.concat([root])
      if (type === 'selected' && opt.onSelect) opt.onSelect(items({ entries: typeState }))
      if (type === 'open' && opt.onOpen && state.open.indexOf(root) !== -1) opt.onOpen(root)
      e.stopPropagation()
      update()
    }
  }
}

function items (item) {
  if (item.type === 'file') return item
  return item.entries
    .map(items)
    .reduce(
      function (sum, x) {
        return (Array.isArray(x) ? x : [x]).concat(sum)
      }, []
    )
}
