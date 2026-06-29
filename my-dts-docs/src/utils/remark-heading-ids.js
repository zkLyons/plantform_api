/**
 * 在写文档时，我们常常希望为某个标题（heading）指定一个固定的 id，这样就可以创建稳定的链接直接跳转到该标题。这个插件就是用来实现这个功能的，它能识别一种特殊的语法，
 * @returns
 *
 */
export default function remarkHeadingIds() {
    return tree => {
        visit(tree, 'heading', node => {
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
