const r=`---\r
title: DTS Explorer 桌面端\r
sidebar_label: Explorer\r
description: "DTS Explorer 桌面端的功能介绍与二次开发接入说明"\r
---\r
\r
## DTS Explorer 桌面端简介\r
\r
DTS Explorer 是 DTS 平台的**桌面端渲染**，相对于云渲染版本（DTS Cloud），Explorer 在本地运行渲染引擎，适用于对网络带宽有限制、或需要本地高性能渲染的场景。\r
\r
| 对比项 | DTS Cloud（云渲染） | DTS Explorer（本地） |\r
|--------|-------------------|----------------------|\r
| 渲染位置 | 服务端渲染，视频流传输 | 本地 GPU 直接渲染 |\r
| 接入方式 | WebSocket + 视频流 | WebSocket（本地端口） |\r
| 网络要求 | 需要稳定高带宽 | 仅需本地回环或局域网 |\r
| 二次开发 API | 相同（\`fdapi\`） | 相同（\`fdapi\`） |\r
\r
:::note\r
标准版 Explorer **不支持**二次开发，需使用**专业版** Explorer。\r
:::\r
\r
---\r
\r
## 启动配置\r
\r
Explorer 安装后，在 \`Explorer\\Binaries\\Win64\\\` 目录下找到 \`Explorer.exe\`，右键创建快捷方式，在属性的**目标**栏末尾追加启动参数：\r
\r
| 参数 | 说明 | 示例 |\r
|------|------|------|\r
| \`-projectpath\` | 启动时自动加载的项目文件 | \`-projectpath=D:/data/scene.acp\` |\r
| \`-WindowWidth\` / \`-WindowHeight\` | 主窗口宽高（像素） | \`-WindowWidth=1440 -WindowHeight=768\` |\r
| \`-websocketport\` | WebSocket 服务端口 | \`-websocketport=4322\` |\r
| \`-webui\` | 启动时加载的 HTML 页面（需完整路径，不能含空格） | \`-webui=D:/sdk/webui/index.html\` |\r
\r
---\r
\r
## WebUI 接入\r
\r
通过 \`-webui\` 参数指定的 HTML 页面会在 Explorer 启动时内嵌显示，页面内的 JS 代码可以通过 WebSocket 调用 Explorer 提供的全部 API。\r
\r
### 连接到 Explorer\r
\r
\`\`\`js\r
// 连接本地 Explorer（端口与 -websocketport 保持一致）\r
const player = new DigitalTwinPlayer('127.0.0.1:4322', {\r
  domId: 'player',\r
  apiOptions: {\r
    onReady: () => {\r
      console.log('Explorer 已连接');\r
      initScene();\r
    },\r
  },\r
});\r
const fdapi = player.getAPI();\r
\`\`\`\r
\r
### 与云渲染 API 的兼容性\r
\r
Explorer 和 DTS Cloud 使用**相同的 \`fdapi\` API 接口**，同一套业务代码只需切换 \`host\` 地址即可在两种模式下运行。\r
\r
---\r
\r
## 接口测试页\r
\r
SDK 文件夹下内置了完整的接口测试页面 \`int.html\`，包含所有 API 的测试代码。\r
\r
使用方式：\r
1. 启动 Explorer，并配置 \`-websocketport=4322\`\r
2. 双击 SDK 目录下的 \`int.html\`\r
3. 在页面顶部输入 WebSocket 端口号，点击"连接"\r
4. 左侧列表选择接口，右侧实时查看日志输出\r
\r
---\r
\r
## 相关文档\r
\r
- [Explorer 使用指南](/docs/tutorials/explorer-guideline) — 启动参数详解、WebUI 开发最佳实践\r
- [帧同步 FrameTick](/docs/tutorials/frame-tick) — Explorer 专属高性能逐帧调用\r
- [API 文档](/docs/api/quickstart/digital-twin-api) — 完整 API 参考\r
`;export{r as default};
