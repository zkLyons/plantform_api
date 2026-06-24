const r=`---\r
title: EditHelper\r
sidebar_label: EditHelper\r
description: "在三维场景中手动绘制点/线/面/体的交互工具，并返回绘制结果坐标，供后续分析、测量或落库使用。"\r
---\r
\r
# EditHelper\r
\r
在三维场景中手动绘制点/线/面/体的交互工具，并返回绘制结果坐标，供后续分析、测量或落库使用。\r
\r
\r
\r
![](/img/refdoc/api/EditHelper.Start.gif)\r
\r
通过 \`api.editHelper\` 访问。\r
\r
---\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：EditHelper 提供在三维场景中手动绘制点/线/面/体的交互能力，并返回绘制结果坐标，供后续分析或落库使用。\r
- **别名 / 不同行业叫法**：绘制助手 / 手绘工具 / 交互绘制 / 标绘助手 / 采集工具。\r
- **适用行业**：智慧城市、应急管理、智慧水利、规划设计、测绘\r
- **使用场景**：\r
  - 手动框选区域生成分析范围（如淹没、开挖范围）\r
  - 现场标绘事件点、警戒线与责任区\r
  - 交互采集坐标用于建模或入库\r
- **注意事项**：\r
  - 绘制结果的坐标系需明确\r
  - 触屏/移动端与桌面端交互体验存在差异\r
  - 常与 Plot、Polygon 等对象配合完成标绘闭环\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`cancel\`](#cancel) | 取消绘制模式 |  |\r
| [\`finish\`](#finish) | 绘制结束。调用此方法会结束当前的绘制，并在回调函数中返回绘制类型和坐标点，然后根据这些坐… |  |\r
| [\`setParam\`](#setParam) | 设置绘制参数 |  |\r
| [\`start\`](#start) | 进入绘制模式 | 启动该功能/交互 |\r
\r
## 方法（Methods）\r
\r
### \`cancel(fn)\` {#cancel}\r
\r
取消绘制模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Cancel\r
\r
\`\`\`js\r
fdapi.editHelper.cancel();\r
\`\`\`\r
\r
---\r
\r
### \`finish(withOffset, fn)\` {#finish}\r
\r
绘制结束。调用此方法会结束当前的绘制，并在回调函数中返回绘制类型和坐标点，然后根据这些坐标点再创建相关的几何图形。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`withOffset\` | \`boolean\` | 是否计算工程中心偏移，默认值是true |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
let res = await fdapi.editHelper.finish(true);\r
            switch (res.buildType) {\r
                case 0: {\r
                    fdapi.polyline.add({\r
                        id: Math.random(),\r
                        coordinates: res.coordinates,\r
                        color: Color.Red,\r
                        style: 2,\r
                        thickness: 10,\r
                        intensity: 1,\r
                        flowRate: 0.5,\r
                    });\r
                } break;\r
                case 1: {\r
                    fdapi.polygon.add({\r
                        id: Math.random(),\r
                        color: Color.Blue,\r
                        coordinates: res.coordinates,\r
                        frameColor: Color.Red,\r
                        frameThickness: 1\r
                    });\r
                } break;\r
            }\r
\`\`\`\r
\r
> 示例：Finish\r
\r
\`\`\`js\r
let res = await fdapi.editHelper.finish(true);\r
switch (res.buildType) {\r
    case 0: {\r
        fdapi.polyline.add({\r
            id: Math.random(),\r
            coordinates: res.coordinates,\r
            color: Color.Red,\r
            style: 2,\r
            thickness: 10,\r
            intensity: 1,\r
            flowRate: 0.5,\r
            depthTest: false\r
        });\r
    } break;\r
\r
    case 1: {\r
        fdapi.polygon.add({\r
            id: Math.random(),\r
            color: Color.Blue,\r
            coordinates: res.coordinates,\r
            frameColor: Color.Red,\r
            frameThickness: 1,\r
            depthTest: false\r
        });\r
    } break;\r
}\r
\`\`\`\r
\r
---\r
\r
### \`setParam(lineType, buildType, color, fn)\` {#setParam}\r
\r
设置绘制参数\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`lineType\` | \`number\` | 线类型，0：直线，1：曲线，默认值是0 |\r
| \`buildType\` | \`number\` | 绘制类型，0：画多点线段， 1：画多边形， 默认值是0 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetParam\r
\r
\`\`\`js\r
let lineType = 0;           //0：直线，1：曲线\r
let buildType = 1;          //0：画多点线段， 1：画多边形\r
let color = Color.Red;      //绘制颜色\r
fdapi.editHelper.setParam(lineType, buildType, color);\r
\`\`\`\r
\r
---\r
\r
### \`start(fn)\` {#start}\r
\r
进入绘制模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Start\r
\r
\`\`\`js\r
fdapi.editHelper.start();\r
\`\`\`\r
`;export{r as default};
