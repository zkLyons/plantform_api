const n=`---\r
title: 快速开始 (Hello World)\r
sidebar_label: 快速开始\r
description: "5分钟完成 DTS Cloud SDK 接入，创建第一个数字孪生页面"\r
---\r
\r
### 一、获取 SDK 文件\r
\r
打开 DTS Cloud 软件，点击右上角 **【SDK】** 链接，在默认安装目录的 \`SDK\` 文件夹中获取 \`ac.min.js\` 文件。\r
\r
> 若采用下方「方式一：从云渲染服务直接引用」，可跳过本步骤，无需手动获取该文件。\r
\r
---\r
\r
### 二、引用 SDK\r
\r
\`ac.min.js\` 是二次开发的核心文件，**其版本必须与云渲染服务端保持一致**。自 2023.08.29 起，渲染进程与 JS 库会做**完整版本号匹配**，不一致时浏览器会弹框提示，并可能导致视频流连接异常、接口调用失败甚至崩溃。下面提供两种引用方式，**推荐方式一**。\r
\r
#### 方式一（推荐）：从云渲染服务直接引用\r
\r
直接引用云渲染服务上的 \`ac.min.js\`，每次服务端升级后都会**自动获取最新版本**，无需手动拷贝，从根本上避免前后端版本不一致：\r
\r
\`\`\`html\r
<!-- 适用于 2023.07.12 之后的版本（推荐） -->\r
<script src="http://192.168.1.27:8081/libac"><\/script>\r
\r
<!-- 或：适用于所有版本 -->\r
<script src="http://192.168.1.27:8081/ac.min.js"><\/script>\r
\`\`\`\r
\r
> 把 \`192.168.1.27:8081\` 换成你的云渲染服务地址（与初始化时的 \`host\` 一致）。\r
\r
#### 方式二：本地引用\r
\r
把「一、获取 SDK 文件」中拷出的 \`ac.min.js\` 放入项目后本地引用：\r
\r
\`\`\`html\r
<script src="./lib/ac.min.js"><\/script>\r
\`\`\`\r
\r
> 注意：此方式下，**每次升级 DTS Cloud 后都需重新拷贝** \`ac.min.js\`，否则版本不一致会引发异常——容易遗漏，故优先用方式一。\r
\r
---\r
\r
### 三、Hello World 示例\r
\r
#### 3.1 添加视频流容器\r
\r
在 \`<body>\` 中添加一个 \`<div>\` 作为视频流渲染区域，**必须设置宽高**：\r
\r
\`\`\`html\r
<div id="player" style="width: 800px; height: 500px;"></div>\r
\`\`\`\r
\r
#### 3.2 初始化 SDK\r
\r
\`\`\`js\r
// 事件回调\r
function _onReady() {\r
  console.log('onReady：可以调用 API 了');\r
}\r
\r
function _onLog(s, nnl) {\r
  console.log('[SDK Log]', s);\r
}\r
\r
function _onEvent(event) {\r
  if (event.eventtype === 'LeftMouseButtonClick' && event.Type === 'TileLayer') {\r
    console.log('点击了图层：', event.Id);\r
  }\r
}\r
\r
// 服务器地址和端口（替换为实际地址）\r
const host = '192.168.1.27:8081';\r
\r
const options = {\r
  domId: 'player',        // 与 HTML 中 div 的 id 一致\r
  apiOptions: {\r
    onReady:  _onReady,   // 必填：连接就绪回调，此后才可调用 API\r
    onLog:    _onLog,     // 可选：日志输出回调\r
    onEvent:  _onEvent,   // 可选：三维场景交互事件回调\r
  },\r
  ui: {\r
    startupInfo: true,    // 是否显示启动加载详情，默认 false\r
    statusButton: true,   // 是否显示状态按钮，默认 false\r
  },\r
  events: {\r
    onVideoLoaded: () => console.log('视频流加载成功'),\r
    onConnClose:   () => console.log('连接已断开'),\r
  },\r
  keyEventTarget: 'none', // 键盘事件接收者：'video' | 'document' | 'none'\r
};\r
\r
// 初始化播放器，获取 API 实例\r
const player = new DigitalTwinPlayer(host, options);\r
const fdapi  = player.getAPI();\r
// 也可通过全局变量 window.fdapi 访问同一实例\r
\`\`\`\r
\r
:::tip\r
只有在 \`onReady\` 回调触发之后，才能安全调用 \`fdapi\` 的各类方法。详见 [FAQ](/docs/tutorials/faq)。\r
:::\r
\r
---\r
\r
### 四、在 Vue / React / Angular 中使用\r
\r
在现代前端框架中集成 SDK，需要注意生命周期管理（组件卸载时销毁实例）和 SSR 兼容性。\r
\r
👉 查看完整示例：[框架集成指南](/docs/tutorials/framework-integration)\r
`;export{n as default};
