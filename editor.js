const diffy = require('diffy')({fullscreen: true})
const input = require('diffy/input')()
const {min, max} = Math

let maxHeight, maxWidth

const values = new Map()
values.set(0, 1)
values.set(1, 2)
values.set(2, 3)

let cursor = 0

function render () {
  let output = ''
  const keys = Array.from(values.keys()).sort((a, b) => a - b)
  // output += keys + ' ' + keys[keys.length - 1] + '\n'
  const maxLine = min(max(keys[keys.length - 1], cursor), maxHeight - 1)
  for (let i = 0; i <= maxLine; i++) {
    output += (
      (i === cursor ? '>' : ' ') +
      ' ' +
      '*'.repeat(values.get(i)) +
      '\n'
    )
  }
  return output
}
function r () { diffy.render(render) }

input.on('down', () => { cursor = min(cursor + 1, maxHeight - 1); r() })
input.on('up', () => { cursor = max(cursor - 1, 0); r() })

input.on('left', () => {
  values.set(cursor, max(values.get(cursor) - 1, 0))
  r()
})
input.on('right', () => {
  values.set(cursor, min((values.get(cursor) || 0) + 1, maxWidth))
  r()
})

function recalcMax () {
  maxHeight = diffy.height - 1
  maxWidth = diffy.width - 5
  r()
}

diffy.on('resize', recalcMax)

recalcMax()
