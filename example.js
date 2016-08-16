var root = {
  'path': '/root',
  'type': 'directory',
  'key': '/',
  'entries': [
    {
      'path': 'a.out',
      'entries': [],
      'type': 'file'
    },
    {
      'path': 'foo',
      'entries': [
        {
          'path': 'bar',
          'entries': [
            {
              'path': 'baz',
              'entries': [],
              'type': 'file'
            }
          ],
          'type': 'directory'
        }
      ],
      'type': 'directory'
    },
    {
      'path': 'bar',
      'entries': [
        {
          'path': 'foo',
          'id': 30,
          'entries': [],
          'type': 'file'
        }
      ],
      'type': 'directory'
    }
  ]
}

var tree = require('./')({
  root: root,
  onSelect: function (selected) {
    console.log('selected', selected)
  },
  onOpen: function (selected) {
    console.log('open', selected)
  }
})

window.document.body.appendChild(tree)
