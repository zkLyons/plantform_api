import React, { forwardRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { API_COMPLETIONS } from '../../data/sandbox/api-completions'

// 自定义 CodeMirror 浅色主题，以匹配项目整体风格
const myTheme = EditorView.theme(
    {
        '&': {
            color: 'var(--txt, #2d2926)',
            backgroundColor: 'var(--panel, #ffffff)'
        },
        '.cm-content': {
            caretColor: 'var(--accent, #c45d2c)'
        },
        '&.cm-focused .cm-cursor': {
            borderLeftColor: 'var(--accent, #c45d2c)'
        },
        '&.cm-focused .cm-selectionBackground, ::selection': {
            backgroundColor: 'rgba(196, 93, 44, 0.15)'
        },
        '.cm-gutters': {
            backgroundColor: 'var(--bg, #faf9f7)',
            color: 'var(--muted, #8a8580)',
            border: 'none'
        }
    },
    { dark: false }
)

// fdapi / api 智能补全
// context 对象是什么？ 当 CodeMirror 编辑器需要显示自动补全列表时（例如用户输入了一个点 .），它会调用我们自定义的 fdapiCompletions 函数。

// 在调用时，CodeMirror 会传递一个名为 context 的特殊对象作为参数。这个对象包含了所有与当前补全请求相关的上下文信息，比如光标位置、光标前的文本、编辑器状态等。它是由 CodeMirror 框架自身创建并传入的。

// 场景一：处理命名空间内的方法补全, 如 `fdapi.camera.s...`
function completeNamespaceMethods(context) {
    const match = context.matchBefore(/(?:fdapi|api)\.([\w$]+)\.([\w$]*)$/)
    if (!match) return null

    const ns = match.text.replace(/^(?:fdapi|api)\./, '').split('.')[0]
    console.log('ns表示去除的fdapi的二级api，camera', ns)
    // 获取camera的所有子方法
    const methodList = API_COMPLETIONS.ns[ns]
    if (!methodList) return null

    console.log("fdapi.camera,输出值为13，最后一个'.'的位置", match.from + match.text.lastIndexOf('.') + 1)
    // 其中 options 字段就是要显示的提示列表（包含 label, detail, info 等）。
    return {
        from: match.from + match.text.lastIndexOf('.') + 1,
        options: methodList.map(o => ({ label: o.label, type: 'method', detail: o.detail, info: o.info || undefined })),
        validFor: /^[\w$]*$/
    }
}

// 场景二：处理根级 API 和命名空间的补全, 如 `fdapi.`
function completeRoot(context) {
    const match = context.matchBefore(/(?:fdapi|api)\.([\w$]*)$/)
    if (!match) return null

    const nsOptions = Object.keys(API_COMPLETIONS.ns).map(k => ({ label: k, type: 'namespace' }))
    console.log('fdapi的所有方法，只过滤出了label和type属性', nsOptions)

    const rootOptions = API_COMPLETIONS.root.map(o => ({ label: o.label, type: 'method', detail: o.detail, info: o.info || undefined }))

    console.log('root中存放的是fdapi.getVersion()这样只有一级的api:', rootOptions)

    return {
        from: match.from + match.text.lastIndexOf('.') + 1,
        options: nsOptions.concat(rootOptions),
        validFor: /^[\w$]*$/
    }
}
// javascriptLanguage是code mirror代码编辑器的接口
const fdapiCompletionExt = javascriptLanguage.data.of({
    autocomplete: context => {
        // 优先匹配更精确的场景一
        return completeNamespaceMethods(context) || completeRoot(context)
    }
})

const EditorPanel = forwardRef(function EditorPanel({ code, setCode, editorHeight, consoleCollapsed, notExecute, setNotExecute, doExecCode, doSendJson, shareCode }, ref) {
    return (
        <div className={'sb-center' + (consoleCollapsed ? ' sb-center-expand' : '')} ref={ref}>
            <div className="sb-editor-pane" style={consoleCollapsed ? { flex: 1, minHeight: 0 } : { flex: '1 1 auto', height: editorHeight + 'px', minHeight: '120px' }}>
                <div className="sb-editor-bar">
                    <label className="sb-switch" title="开启后，点击左侧示例立即执行；关闭则只填入编辑器">
                        <input type="checkbox" checked={!notExecute} onChange={e => setNotExecute(!e.target.checked)} />
                        <span className="sb-switch-track">
                            <span className="sb-switch-thumb" />
                        </span>
                        <span className="sb-switch-label">立即执行</span>
                    </label>
                    <span className="sb-editor-actions">
                        <button className="sb-btn sb-btn-run sb-btn-sm" onClick={doExecCode} title="执行编辑器中的JS代码（Ctrl+Enter）">
                            ▶ 执行JS
                        </button>
                        <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={doSendJson} title="日志回放：回放 __command 命令日志，或执行原始JSON命令">
                            ⧉ 执行JSON
                        </button>
                        <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={() => setCode('')} title="清除代码编辑器">
                            清空代码
                        </button>
                        <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={shareCode} title="将当前代码生成分享链接并复制">
                            分享
                        </button>
                    </span>
                </div>
                <div className="sb-editor-wrap">
                    <CodeMirror value={code} height="100%" theme={myTheme} extensions={[javascript(), fdapiCompletionExt, EditorView.lineWrapping]} onChange={val => setCode(val)} className="sb-cm-editor" />
                </div>
            </div>
        </div>
    )
})

export default EditorPanel
