const n=`---\r
title: 多视频同屏渲染\r
sidebar_label: 多视频\r
description: "在单个页面中同时渲染多个视频流的实现方式"\r
---\r
\r
### 在一个页面中嵌入多个云渲染窗口\r
\r
要在同一个页面中嵌入多个云渲染视频流窗口，目前有以下两种方式：\r
\r
---\r
\r
#### 第 1 种方式：使用 iframe 框架\r
\r
代码如下：\r
\r
\`\`\`html\r
<body>\r
  <table width="100%" height="600" border="0">\r
    <tr>\r
      <td>\r
        <iframe id="player1" src="player.html?ms" width="100%" height="100%"></iframe>\r
      </td>\r
      <td>\r
        <iframe id="player2" src="player.html?ms" width="100%" height="100%"></iframe>\r
      </td>\r
    </tr>\r
  </table>\r
</body>\r
\`\`\`\r
\r
这种方式代码简单，适合快速开发展示多个视频流的情况。但由于使用了 iframe 存在跨域问题，调用 \`DigitalTwinAPI\` 接口时需通过 \`postMessage\` 实现，相对繁琐。推荐使用第 2 种方案。\r
\r
---\r
\r
#### 第 2 种方式：多实例 API（推荐，适用于 20210315 之后的版本）\r
\r
HTML 核心代码：\r
\r
\`\`\`html\r
<div id="player1"></div>\r
<button onclick="callPlayer1()">调用 Player1 的接口</button>\r
\r
<div id="player2"></div>\r
<button onclick="callPlayer2()">调用 Player2 的接口</button>\r
\`\`\`\r
\r
JS 核心代码：\r
\r
\`\`\`js\r
// 注意：显卡需要支持 Cloud 同时启动多个实例\r
\r
// 在 Cloud 实例列表中右键复制实例 ID\r
let instanceId1 = '2464721833873';\r
let instanceId2 = '2464721833874';\r
\r
let host = '127.0.0.1:8080';\r
\r
let option1 = {\r
  domId: 'player1',       // 挂载容器 ID\r
  iid: instanceId1,       // 实例 ID\r
  apiOptions: {\r
    // 只有在 onReady 之后才可以调用 DigitalTwinAPI 接口\r
    onReady: _onReady1,\r
  },\r
};\r
\r
let option2 = {\r
  domId: 'player2',\r
  iid: instanceId2,\r
  apiOptions: {\r
    onReady: _onReady2,\r
  },\r
};\r
\r
// 分别初始化两个 API 实例\r
var __api1 = new DigitalTwinPlayer(host, option1).getAPI();\r
var __api2 = new DigitalTwinPlayer(host, option2).getAPI();\r
\r
// 分别操作各自的视频流\r
function callPlayer1() {\r
  __api1.settings.setMainUIVisibility(false);\r
}\r
\r
function callPlayer2() {\r
  __api2.settings.setMainUIVisibility(false);\r
}\r
\`\`\`\r
\r
:::tip\r
每个 \`DigitalTwinPlayer\` 实例独立管理自己的 API 对象，互不干扰。\`onReady1\` / \`onReady2\` 各自的回调中操作对应的 \`__api1\` / \`__api2\`，避免混用。\r
:::\r
`;export{n as default};
