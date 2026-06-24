const n=`---\r
title: Coastline\r
sidebar_label: Coastline\r
description: "用于在指定包围盒范围内模拟与渲染海岸线效果，包含海浪拍打沙滩、海风驱动的海面波动，并支持海平面水位逐级抬升的水淹推演。"\r
---\r
\r
# Coastline\r
\r
用于在指定包围盒范围内模拟与渲染海岸线效果，包含海浪拍打沙滩、海风驱动的海面波动，并支持海平面水位逐级抬升的水淹推演。\r
\r
通过 \`api.coastline\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：用于在指定包围盒范围内模拟与渲染海岸线效果，包含海浪拍打沙滩、海风驱动的海面波动，并支持海平面水位逐级抬升的水淹推演。\r
- **别名 / 不同行业叫法**：海岸线 / 岸线 / 潮间带 / 海陆交界带 / 滩涂带。\r
- **适用行业**：海洋气象、智慧水利、应急管理、城市治理（沿海城市）、海岸工程。\r
- **使用场景**：\r
  - 沿海风暴潮、海平面上升情景下的水淹淹没范围动态推演与可视化。\r
  - 海洋气象数字孪生中海岸带海浪、海风环境效果的实景还原。\r
  - 滨海城市、港口、滩涂区域的海陆交界景观展示与防灾科普展示。\r
- **注意事项**：\r
  - \`bbox\` 决定模拟范围，范围过大会增加渲染与计算开销，应结合实际关注区域设定。\r
  - 水淹推演由 \`enableFloodFill\`、\`seaLevelTimeInterval\`、\`seaLevelIncrement\`、\`seaLevelMaxElevation\` 共同控制，参数需与真实潮位/水文数据匹配，避免淹没结果失真。\r
  - \`seaLevelOffset\` 基于 bbox 中心 Z 偏移，使用前需确认坐标系与高程基准一致。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Coastline对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的Coastline | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Coastline对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取Coastline的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`update\`](#update) | 修改一个或多个Coastline对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Coastline对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`bbox\` | \`array\` | 海岸线模拟范围边界的包围盒，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`style\` | \`number\` | 海岸线的样式，目前只有一个样式，默认值：0 |\r
| \`waveSpeed\` | \`number\` | 海浪拍打沙滩的速度，单位：米/秒，默认值：0.5米/秒 |\r
| \`windVelocity\` | \`array\` | 海风风速UV的方向向量，此参数会影响海面效果，取值示例：[U,V] |\r
| \`enableFloodFill\` | \`boolean\` | 是否开启水淹，默认值：false |\r
| \`seaLevelTimeInterval\` | \`number\` | 海平面水位每次抬升的时间间隔，单位：秒，默认值：0.1s |\r
| \`seaLevelIncrement\` | \`number\` | 海平面水位每次抬升的高度，单位：米，默认值：0.1米 |\r
| \`seaLevelOffset\` | \`number\` | 基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米 |\r
| \`seaLevelMaxElevation\` | \`number\` | 海平面水位抬升的最大高度，单位：米，默认值：10米 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.coastline.clear();\r
let coastline = {\r
    id: 'coastline',\r
    bbox: [\r
        494274.8971875,\r
        2487771.141875,\r
        0,\r
        495095.20875,\r
        2491681.8159375,\r
        10\r
    ],\r
    style: 0, //海岸线的样式\r
    waveSpeed: 0.5, //海浪拍打沙滩的速度，单位：米/秒，默认值：0.5\r
    windVelocity: [-150, 50], //海风风速的UV向量，此参数会影响海面效果，取值示例：[U,V]\r
    enableFloodFill: true, //是否开启水淹，默认值：false\r
    seaLevelTimeInterval: 0.1, //海平面水位每次抬升的时间间隔，单位：秒，默认值：0.1s\r
    seaLevelIncrement: 0.1,  //海平面水位每次抬升的高度，单位：米，默认值：0.1米\r
    seaLevelOffset: 0, //基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米\r
    seaLevelMaxElevation: 10 //海平面水位抬升的最大高度，单位：米，默认值：10米\r
}\r
await fdapi.coastline.add(coastline);\r
fdapi.coastline.focus("coastline");\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的Coastline\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Clear\r
\r
\`\`\`js\r
fdapi.coastline.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Coastline对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Coastline对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.coastline.delete('fd1');\r
\`\`\`\r
\r
---\r
\r
### \`focus(ids, distance, flyTime, rotation, fn)\` {#focus}\r
\r
自动定位到合适的观察距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Coastline对象的ID或者ID数组 |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Focus\r
\r
\`\`\`js\r
fdapi.coastline.focus('coastline');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Coastline的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Coastline对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
Coastline的详细信息\r
[{\r
            "id":	"d1",\r
            "groupId":	"",\r
            "userData":	"",\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.coastline.get('coastline');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Coastline对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，请参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let coastline = {\r
    id: 'coastline',\r
    enableFloodFill: false, //是否开启水淹，默认值：false\r
    seaLevelOffset: 2, //基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米\r
}\r
await fdapi.coastline.update(coastline);\r
fdapi.coastline.focus("coastline");\r
\`\`\`\r
\r
---\r
\r
### \`updateBegin()\` {#updateBegin}\r
\r
用于批量多次修改对象的属性\r
\r
\r
在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据\r
\r
注意：\r
\r
updateBegin不是异步调用，不需要await，也没有回调函数参数\r
\r
**返回：** 无返回值。\r
\r
\`\`\`js\r
fdapi.xxx.updateBegin();\r
for (let i = 0; i < 1000; i++) {\r
     fdapi.xxx.setColor(i, Color.Yellow);\r
} \r
fdapi.xxx.updateEnd(function () {\r
     log('update finished!');\r
});\r
\`\`\`\r
\r
---\r
\r
### \`updateEnd(fn)\` {#updateEnd}\r
\r
用于批量多次修改对象的属性，与updateBegin配套使用\r
\r
注意：\r
\r
updateEnd是异步调用，可以用回调函数也可以await\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.coastline.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> Show\r
\r
\`\`\`js\r
fdapi.coastline.show('coastline');\r
\`\`\`\r
\r
> Hide\r
\r
\`\`\`js\r
fdapi.coastline.hide('coastline');\r
\`\`\`\r
\r
> HideAll\r
\r
\``;export{n as default};
