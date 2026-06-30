import React, { forwardRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { API_COMPLETIONS } from '../../data/sandbox/api-completions'

// fdapi / api 智能补全
function fdapiCompletions(context) {
    let m = context.matchBefore(/(?:fdapi|api)\.([\w$]+)\.([\w$]*)$/)
    if (m) {
        const ns = m.text.replace(/^(?:fdapi|api)\./, '').split('.')[0]
        const list = API_COMPLETIONS.ns[ns]
        if (!list) return null
        return {
            from: m.from + m.text.lastIndexOf('.') + 1,
            options: list.map(o => ({ label: o.label, type: 'method', detail: o.detail, info: o.info || undefined })),
            validFor: /^[\w$]*$/
        }
    }
    m = context.matchBefore(/(?:fdapi|api)\.([\w$]*)$/)
    if (m) {
        const nsOptions = Object.keys(API_COMPLETIONS.ns).map(k => ({ label: k, type: 'namespace' }))
        const rootOptions = API_COMPLETIONS.root.map(o => ({ label: o.label, type: 'method', detail: o.detail, info: o.info || undefined }))
        return {
            from: m.from + m.text.lastIndexOf('.') + 1,
            options: nsOptions.concat(rootOptions),
            validFor: /^[\w$]*$/
        }
    }
    return null
}
const fdapiCompletionExt = javascriptLanguage.data.of({ autocomplete: fdapiCompletions })

const EditorPanel = forwardRef(function EditorPanel({
    code, setCode, editorHeight, consoleCollapsed,
    notExecute, setNotExecute, doExecCode, doSendJson, shareCode
}, ref) {
    return (
        <div className="sb-center" ref={ref}>
            <div className="sb-editor-pane" style={consoleCollapsed ? { flex: '1 1 0%', minHeight: 0, height: 'auto' } : { flex: '1 1 auto', height: editorHeight + 'px', minHeight: '120px' }}>
                <div className="sb-editor-bar">
                    <label className="sb-switch" title="开启后，点击左侧示例立即执行；关闭则只填入编辑器">
                        <input type="checkbox" checked={!notExecute} onChange={e => setNotExecute(!e.target.checked)} />
                        <span className="sb-switch-track"><span className="sb-switch-thumb" /></span>
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
                    <CodeMirror
                        value={code}
                        height="100%"
                        theme={oneDark}
                        extensions={[javascript(), fdapiCompletionExt]}
                        onChange={val => setCode(val)}
                        className="sb-cm-editor"
                    />
                </div>
            </div>
        </div>
    )
})

export default EditorPanel
