const r=`---\r
title: FdExternal\r
sidebar_label: FdExternal\r
description: "FdExternal 封装进程内 JS 与底层 C++ 的互操作，用于 Explorer WebUI、Marker 弹窗、JSTick 调试窗等 CEF 页面里直接调用底层能力。"\r
---\r
\r
# FdExternal\r
\r
FdExternal类封装了进程内JS与C++的互操作功能，用于以下几种场景：\r
\r
- Explorer的WebUI页面里\r
- Marker的弹出窗口页面\r
- JSTick调试窗口页面 以上几种场景的共同点是都使用了cef显示html页面，在这些html页面里， 可以通过使用FdExternal类，直接调用底层C++功能，从而实现高性能、更直接的接口调用方式。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：FdExternal 封装进程内 JS 与底层 C++ 的互操作，用于 Explorer WebUI、Marker 弹窗、JSTick 调试窗等 CEF 页面里直接调用底层能力。\r
- **别名 / 不同行业叫法**：内外互操作 / JS-C++ 桥接 / 外部接口 / 宿主交互（无明显行业别称）。\r
- **适用行业**：通用（二次开发的底层能力）\r
- **使用场景**：\r
  - 弹窗/嵌入页面回调底层接口\r
  - Explorer WebUI 与三维场景联动\r
  - JSTick 调试页与客户端通信\r
- **注意事项**：\r
  - 仅在 CEF 承载的特定页面语境下可用\r
  - 调用底层需注意时序与上下文\r
  - 属高级/底层用法，普通页面不可用\r
\r
\r
## 构造函数\r
\r
\`\`\`js\r
new FdExternal()\r
\`\`\`\r
\r
---\r
\r
## 方法（Methods）\r
\r
### \`.close()\`\r
\r
用于关闭当前的窗口\r
\r
运行环境：1、Marker弹出窗口页面；2、JSTick调试窗口页面\r
\r
**返回：** 无返回值。\r
\r
---\r
\r
### \`.execute(json)\`\r
\r
用于通过JSON的方式调用JS接口\r
\r
运行环境：1、Explorer的WebUI页面里；2、Marker弹出窗口页面；3、JSTick调试窗口页面\r
\r
注意事项：\r
\r
此方法一般不需要用户直接调用，当在上面3种场景下初始化DigitalTwinAPI类时，不传host参数，\r
\r
调用接口时，内部会自动以FdExternal.execute的方式进行高性能高效率的调用。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`json\` | \`string\` | 要执行的JSON字符串 |\r
\r
**返回：** 无返回值。\r
\r
---\r
\r
### \`.getData(key)\`\r
\r
用于实现类似localStorage的功能\r
\r
运行环境：Explorer的WebUI页面\r
\r
注意：此方法是异步方法，返回值为promise，需要使用async/await同步\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`key\` | \`string\` | 键 |\r
\r
**返回：** 返回指定键对应的值\r
\r
---\r
\r
### \`.getViewportSize()\`\r
\r
之所以增加此功能是因为 当WebUI 在某种情况下已加在页面但是内部的WebWidget组件尚未显示（被隐藏）的情况下，\r
\r
通过JS获取网页宽高会返回失败（window.screen.width, window.innerWidth等），为了解决这个问题，可调用此方法实现。\r
\r
运行环境：Explorer的WebUI页面\r
\r
注意：此方法是异步方法，返回值为promise，需要使用async/await同步\r
\r
**返回：** 调用后会返回包含当前三维窗口宽高的数组。\r
\r
---\r
\r
### \`.postEvent(msg)\`\r
\r
用于向主页面发送事件通知\r
\r
运行环境：1、Marker弹出窗口页面；2、JSTick调试窗口页面\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`msg\` | \`string\` | 要发送的字符串 |\r
\r
**返回：** 无返回值。\r
\r
---\r
\r
### \`.setData(key, value)\`\r
\r
用于实现类似localStorage的功能\r
\r
运行环境：Explorer的WebUI页面\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`key\` | \`string\` | 键 |\r
| \`value\` | \`string\` | 值 |\r
\r
**返回：** 无返回值。\r
\r
---\r
\r
### \`.valid()\`\r
\r
检查是否在指定的环境里调用，FdExternal可以在以下环境调用：\r
\r
- Explorer的WebUI页面里\r
- Marker弹出窗口页面\r
- JSTick调试窗口页面\r
\r
**返回：** 如果有效返回true，否则返回false\r
`;export{r as default};
