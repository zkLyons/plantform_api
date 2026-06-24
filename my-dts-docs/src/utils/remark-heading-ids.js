/**
 * remark plugin: strip Docusaurus-style {#custom-id} from headings
 *
 * Before: ### `exitWorld(fn)` {#exitWorld}
 * After:  ### `exitWorld(fn)`   (with id="exitWorld" set on the node)
 *
 * Also handles: ### Title {#some-id .class}
 */
export default function remarkHeadingIds() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      const last = node.children[node.children.length - 1]
      if (!last || last.type !== 'text') return

      const match = last.value.match(/\{#([\w-]+)(?:\s*\.[\w.-]+)*\}\s*$/)
      if (!match) return

      // Extract the custom id
      const customId = match[1]

      // Remove the {#...} suffix from the text
      last.value = last.value.replace(/\s*\{#[\w-]+(?:\s*\.[\w.-]+)*\}\s*$/, '')

      // If the text is now empty, remove the node
      if (!last.value) {
        node.children.pop()
      }

      // Set the heading's id via data
      if (!node.data) node.data = {}
      node.data.id = customId
      if (!node.data.hProperties) node.data.hProperties = {}
      node.data.hProperties.id = customId
    })
  }
}

/** Simple recursive visitor (no external dep) */
function visit(node, type, callback) {
  if (node.type === type) callback(node)
  if (node.children) {
    for (const child of node.children) {
      visit(child, type, callback)
    }
  }
}
