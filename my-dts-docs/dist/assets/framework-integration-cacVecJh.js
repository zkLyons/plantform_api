const n=`---\r
title: 框架集成指南\r
sidebar_label: 框架集成\r
description: "在 Vue 3、React 18 中集成 DTS Cloud SDK 的完整示例"\r
---\r
\r
DTS Cloud SDK 是面向浏览器的 JS 库，可以在任何现代前端框架中使用。核心要点：\r
\r
- **SDK 需要在 DOM 挂载完毕后初始化**（Vue: \`onMounted\`，React: \`useEffect\`）\r
- **组件卸载时必须销毁实例**，避免内存泄漏和重复连接\r
- **\`fdapi\` 全局变量在 \`onReady\` 后才可用**，不要在组件顶层直接使用\r
\r
---\r
\r
## Vue 3（Composition API）\r
\r
\`\`\`vue\r
<template>\r
  <div class="dts-wrapper">\r
    <div id="dts-container" style="width: 100%; height: 600px;" />\r
    <div v-if="status === 'connecting'" class="status-tip">连接中...</div>\r
    <div v-if="status === 'error'" class="status-tip error">连接失败</div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref, onMounted, onBeforeUnmount } from 'vue';\r
\r
const status = ref('connecting');\r
let apiInstance = null;\r
\r
onMounted(() => {\r
  // SDK 通过 <script> 标签全局引入，window.DigitalTwinAPI 即可用\r
  apiInstance = new window.DigitalTwinAPI('127.0.0.1:8080', {\r
    domId: 'dts-container',\r
    onReady: () => {\r
      status.value = 'ready';\r
      initScene();\r
    },\r
    onError: (err) => {\r
      status.value = 'error';\r
      console.error('[DTS] 连接失败：', err);\r
    },\r
  });\r
});\r
\r
onBeforeUnmount(() => {\r
  // 组件卸载时销毁 SDK，释放 WebSocket 和渲染资源\r
  apiInstance?.destroy?.();\r
  apiInstance = null;\r
});\r
\r
function initScene() {\r
  // onReady 之后才能调用 fdapi\r
  fdapi.camera.lookAt(120.15, 30.27, 0, 1000, -45, 0, 2.0, () => {\r
    console.log('相机就位');\r
  });\r
\r
  fdapi.marker.add({\r
    id: 'marker_vue_001',\r
    coordinate: [120.15, 30.27, 50],\r
    text: 'Vue 示例标注',\r
    imagePath: '@path:/img/icons/poi.svg',\r
  });\r
}\r
<\/script>\r
\`\`\`\r
\r
### 在 \`index.html\` 引入 SDK\r
\r
\`\`\`html\r
<!-- public/index.html 或 index.html -->\r
<head>\r
  <script src="/sdk/ac.min.js"><\/script>\r
</head>\r
\`\`\`\r
\r
### Vite 项目注意事项\r
\r
Vite 的 TypeScript 类型检查不认识全局 \`fdapi\`，在 \`src/env.d.ts\` 中添加声明即可：\r
\r
\`\`\`ts\r
// src/env.d.ts\r
/// <reference path="../public/sdk/dts-sdk.d.ts" />\r
\`\`\`\r
\r
---\r
\r
## React 18（Hooks）\r
\r
\`\`\`tsx\r
import { useEffect, useRef, useState } from 'react';\r
\r
type Status = 'connecting' | 'ready' | 'error';\r
\r
export default function DTSViewer() {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const apiRef = useRef<any>(null);\r
  const [status, setStatus] = useState<Status>('connecting');\r
\r
  useEffect(() => {\r
    // 确保容器 DOM 已挂载\r
    if (!containerRef.current) return;\r
\r
    // React 严格模式下 useEffect 会执行两次，用 flag 防止重复初始化\r
    let destroyed = false;\r
\r
    apiRef.current = new (window as any).DigitalTwinAPI('127.0.0.1:8080', {\r
      domId: 'dts-container',\r
      onReady: () => {\r
        if (destroyed) return;\r
        setStatus('ready');\r
        initScene();\r
      },\r
      onError: (err: unknown) => {\r
        if (destroyed) return;\r
        setStatus('error');\r
        console.error('[DTS] 连接失败：', err);\r
      },\r
    });\r
\r
    // 清理函数：组件卸载时销毁\r
    return () => {\r
      destroyed = true;\r
      apiRef.current?.destroy?.();\r
      apiRef.current = null;\r
    };\r
  }, []); // 空依赖：只在挂载时执行一次\r
\r
  function initScene() {\r
    const fdapi = (window as any).fdapi;\r
\r
    fdapi.camera.lookAt(120.15, 30.27, 0, 1000, -45, 0, 2.0);\r
\r
    fdapi.marker.add({\r
      id: 'marker_react_001',\r
      coordinate: [120.15, 30.27, 50],\r
      text: 'React 示例标注',\r
      imagePath: '@path:/img/icons/poi.svg',\r
    });\r
  }\r
\r
  return (\r
    <div style={{ position: 'relative', width: '100%', height: 600 }}>\r
      <div id="dts-container" ref={containerRef} style={{ width: '100%', height: '100%' }} />\r
      {status === 'connecting' && (\r
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>\r
          连接中...\r
        </div>\r
      )}\r
      {status === 'error' && (\r
        <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'red', transform: 'translate(-50%,-50%)' }}>\r
          连接失败，请检查服务地址\r
        </div>\r
      )}\r
    </div>\r
  );\r
}\r
\`\`\`\r
\r
### Create React App / Vite + React\r
\r
在 \`public/index.html\` 中引入 SDK：\r
\r
\`\`\`html\r
<script src="%PUBLIC_URL%/sdk/ac.min.js"><\/script>\r
\`\`\`\r
\r
---\r
\r
## Angular\r
\r
Angular 中通过 \`ngOnInit\` / \`ngOnDestroy\` 管理 SDK 生命周期：\r
\r
\`\`\`typescript\r
import { Component, OnInit, OnDestroy } from '@angular/core';\r
\r
@Component({\r
  selector: 'app-dts-viewer',\r
  template: \`\r
    <div id="dts-container" style="width:100%;height:600px"></div>\r
  \`,\r
})\r
export class DtsViewerComponent implements OnInit, OnDestroy {\r
  private api: any;\r
\r
  ngOnInit(): void {\r
    this.api = new (window as any).DigitalTwinAPI('127.0.0.1:8080', {\r
      domId: 'dts-container',\r
      onReady: () => this.initScene(),\r
    });\r
  }\r
\r
  ngOnDestroy(): void {\r
    this.api?.destroy?.();\r
  }\r
\r
  private initScene(): void {\r
    const fdapi = (window as any).fdapi;\r
    fdapi.camera.lookAt(120.15, 30.27, 0, 1000, -45, 0, 2.0);\r
  }\r
}\r
\`\`\`\r
\r
在 \`angular.json\` 的 \`scripts\` 数组中添加 SDK 路径：\r
\r
\`\`\`json\r
"scripts": [\r
  "src/assets/sdk/ac.min.js"\r
]\r
\`\`\`\r
\r
---\r
\r
## TypeScript 类型支持\r
\r
三种框架均可使用 SDK 提供的类型声明文件获得 IDE 智能提示，详见 [TypeScript 类型支持](/docs/tutorials/typescript)。\r
`;export{n as default};
