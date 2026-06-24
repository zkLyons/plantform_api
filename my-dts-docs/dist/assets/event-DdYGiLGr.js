const n=`---\r
title: 事件系统\r
sidebar_label: 事件系统\r
description: "三维交互事件系统，包括点击、悬停、相机移动等事件类型"\r
---\r
\r
### 一、关于事件交互系统的说明\r
\r
#### 1.1、初始化时传入 onEvent 回调监听\r
\r
在构造 \`DigitalTwinPlayer\` 时，通过 \`apiOptions.onEvent\` 传入回调函数：\r
\r
\`\`\`js\r
// 场景交互事件回调函数\r
function onEvent(event) {\r
  var eventType = event.eventtype;  // 事件类型\r
  var layerType  = event.Type;      // 图层类型\r
  var layerId    = event.Id || event.ID;   // 图层 ID\r
  var objectId   = event.ObjectID;         // 点击的 Actor ID\r
  var clickPos   = event.MouseClickPoint;  // 鼠标点击的世界坐标\r
\r
  switch (eventType) {\r
    // 鼠标左键单击\r
    case 'LeftMouseButtonClick':\r
      log('触发：鼠标左键单击');\r
      break;\r
\r
    // 鼠标悬停（需提前开启：fdapi.settings.setMousePickMask(7)）\r
    case 'MouseHovered':\r
      log('触发：鼠标悬停');\r
      break;\r
\r
    // 鼠标移动（需提前开启：fdapi.settings.setMousePickMask(7)）\r
    case 'MouseMoved':\r
      log('触发：鼠标移动');\r
      break;\r
\r
    // 相机开始移动（需提前开启：fdapi.settings.setEnableCameraMovingEvent(true)）\r
    case 'CameraStartMove':\r
      log('触发：相机开始飞行');\r
      break;\r
\r
    // 相机正在移动\r
    case 'CameraMoving':\r
      log('触发：相机正在飞行');\r
      break;\r
\r
    // 相机停止移动\r
    case 'CameraStopMove':\r
      log('触发：相机停止飞行');\r
      break;\r
\r
    // 对象执行 focus() 或相机执行 set()/lookAt()/lookAtBBox() 时触发\r
    case 'CameraChanged':\r
      log('触发：相机位置变化');\r
      break;\r
\r
    // 进入面剖切模式编辑后触发\r
    case 'PlaneClipEdit':\r
      log('触发：编辑面剖切');\r
      break;\r
\r
    // 进入体剖切模式编辑后触发\r
    case 'VolumeClipEdit':\r
      log('触发：编辑体剖切');\r
      break;\r
\r
    // 测量完成触发\r
    case 'Measurement':\r
      log('触发：测量完成');\r
      break;\r
\r
    // 导览播放结束触发（camera.playAnimation 和 cameraTour.play 均触发）\r
    case 'CameraTourFinished':\r
      log('触发：导览播放结束');\r
      break;\r
\r
    default:\r
      break;\r
  }\r
}\r
\r
// 初始化时注入事件回调\r
const player = new DigitalTwinPlayer('127.0.0.1:8080', {\r
  domId: 'player',\r
  apiOptions: {\r
    onEvent: onEvent,\r
  },\r
});\r
const fdapi = player.getAPI();\r
\`\`\`\r
\r
---\r
\r
#### 1.2、通过 API 接口动态设置事件监听\r
\r
初始化完成后，也可以通过 \`fdapi.setEventCallback\` 动态注入，**注意：此方式会覆盖初始化时设置的 onEvent 回调**：\r
\r
\`\`\`js\r
fdapi.setEventCallback(function (event) {\r
  var eventType  = event.eventtype;\r
  var layerType  = event.Type;\r
  var layerId    = event.Id || event.ID;\r
  var objectId   = event.ObjectID;\r
  var clickPos   = event.MouseClickPoint;\r
\r
  if (eventType === 'LeftMouseButtonClick') {\r
    console.log('点击了图层：', layerId, '位置：', clickPos);\r
  }\r
});\r
\`\`\`\r
\r
---\r
\r
#### 1.3、自定义监听鼠标和键盘\r
\r
在 \`DigitalTwinPlayer\` 的初始化参数 \`events\` 中传入 \`mouseKeyListener\`，目前支持 \`onmousedown\`、\`onmouseup\`、\`onkeydown\`：\r
\r
\`\`\`js\r
const mouseKeyListener = {\r
  onmousedown: (e) => { log(\`[MouseDn] button: \${e.button}, pos: \${e.x}, \${e.y}\`); },\r
  onmouseup:   (e) => { log(\`[MouseUp] button: \${e.button}, pos: \${e.x}, \${e.y}\`); },\r
  onkeydown:   (e) => { log(\`KeyDown: \${e.code}\`); },\r
};\r
\r
const fdPlayer = new DigitalTwinPlayer('127.0.0.1:8080', {\r
  events: mouseKeyListener,\r
  // 其他参数...\r
});\r
\`\`\`\r
\r
运行效果输出示例：\r
\r
\`\`\`\r
[MouseDn] button: 2, pos: 892, 625\r
[MouseUp] button: 2, pos: 892, 625\r
KeyDown: KeyF\r
KeyDown: KeyA\r
KeyDown: ControlLeft\r
\`\`\`\r
`;export{n as default};
