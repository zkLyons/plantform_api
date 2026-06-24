const n=`---\r
title: DynamicWater\r
sidebar_label: DynamicWater\r
description: "DynamicWater 用于在三维场景中按坐标多边形快速生成带波纹流动效果的动态水面，提供深蓝、蓝、湖水三种预设样式。它是一种轻量的“视觉级”水体表达，不依赖真实水动力计算，主要用于把河湖库等水域“点亮”为动态可视效果。"\r
---\r
\r
# DynamicWater\r
\r
DynamicWater 用于在三维场景中按坐标多边形快速生成带波纹流动效果的动态水面，提供深蓝、蓝、湖水三种预设样式。它是一种轻量的“视觉级”水体表达，不依赖真实水动力计算，主要用于把河湖库等水域“点亮”为动态可视效果。\r
\r
通过 \`api.dynamicWater\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：DynamicWater 用于在三维场景中按坐标多边形快速生成带波纹流动效果的动态水面，提供深蓝、蓝、湖水三种预设样式。它是一种轻量的“视觉级”水体表达，不依赖真实水动力计算，主要用于把河湖库等水域“点亮”为动态可视效果。\r
- **别名 / 不同行业叫法**：动态水面 / 动态水体 / 流动水面；在景观与城市表达中也称“水景水面”“面状水域”。\r
- **适用行业**：智慧水利、智慧城市、智慧园区、智慧交通（沿江沿河路网）、测绘与三维可视化。\r
- **使用场景**：\r
  - 智慧城市/园区底图中把河道、人工湖、景观水池渲染为带波纹的动态水面，提升场景真实感。\r
  - 水库、湖泊等大面积水域的常态化展示，按多边形勾勒水面范围并赋予流动质感。\r
  - 与建筑、桥梁、地形模型叠加，作为基础水域底景，无需精确仿真的轻量化表达。\r
- **注意事项**：\r
  - 属于效果型水面，不反映真实水深、流速与演进过程；需要真实数据驱动时应改用 HydroDynamic2D / HydroDynamic1D 等水动力对象。\r
  - coordinates 需注意坐标系类型（coordinateType），高程 Z 决定水面贴合地形的高度，避免水面穿模或悬空。\r
  - 多边形顶点过多或水面范围过大可能影响渲染性能，建议按可视范围合理控制面片规模。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个DynamicWater对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的DynamicWater | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个DynamicWater对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`focusAll\`](#focusAll) | 自动定位到能观察所有DynamicWater对象的合适距离 | 相机定位到全部对象的合适视角 |\r
| [\`get\`](#get) | 根据ID获取DynamicWater的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`setCoordinates\`](#setCoordinates) | 设置DynamicWater的坐标信息 |  |\r
| [\`setStyle\`](#setStyle) | 设置动态水的样式 |  |\r
| [\`update\`](#update) | 修改一个或多个DynamicWater对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个DynamicWater对象\r
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
| \`coordinates\` | \`array\` | 坐标数组，[取值示例](/docs/tutorials/coordinates) |\r
| \`style\` | \`number\` | 动态水的样式，取值：0（深蓝）、1（蓝）、2（湖水） |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.dynamicWater.clear();\r
await fdapi.dynamicWater.add({\r
    id: 'dy1',\r
    coordinates: [\r
        [494173.90625, 2491307.5, 0.95875000953674316],\r
        [494080.625, 2491060.75, 1.3939062356948853],\r
        [493967.5625, 2490980, 1.2018749713897705],\r
        [493865.09375, 2490651.25, 0.8790624737739563],\r
        [493701.90625, 2490626.25, 0.48812499642372131],\r
        [493494.6875, 2490660.75, 0.16062499582767487],\r
        [493598.75, 2491086.5, 0.25140625238418579],\r
        [493707.375, 2491471, 0.14765624701976776],\r
        [494149.3125, 2491321.25, 0.89968752861022949],\r
    ],\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    style: 0 //水的样式：0（深蓝）、1（蓝）、2（湖水）\r
});\r
fdapi.dynamicWater.focus('dy1', 200);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的DynamicWater\r
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
fdapi.dynamicWater.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个DynamicWater对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的DynamicWater对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.dynamicWater.delete('dy1');\r
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
| \`ids\` | \`string \\| array\` | DynamicWater对象的ID或者ID数组 |\r
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
fdapi.dynamicWater.focus('dy1', 100);\r
\`\`\`\r
\r
---\r
\r
### \`focusAll(distance, flyTime, rotation, fn)\` {#focusAll}\r
\r
自动定位到能观察所有DynamicWater对象的合适距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：FocusAll\r
\r
\`\`\`js\r
fdapi.dynamicWater.focusAll();\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取DynamicWater的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的DynamicWater对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
DynamicWater的详细信息\r
[{\r
            "id":	"dy1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "style":	0\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.dynamicWater.get('dy1');\r
\`\`\`\r
\r
---\r
\r
### \`setCoordinates(id, newVal, fn)\` {#setCoordinates}\r
\r
设置DynamicWater的坐标信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | DynamicWater对象ID |\r
| \`newVal\` | \`array\` | 坐标数组，[取值示例](/docs/tutorials/coordinates) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.dynamicWater.setCoordinates(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setStyle(id, newVal, fn)\` {#setStyle}\r
\r
设置动态水的样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | DynamicWater对象ID |\r
| \`newVal\` | \`number\` | 动态水的样式，取值：0（深蓝）、1（蓝）、2（湖水） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.dynamicWater.setStyle(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个DynamicWater对象\r
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
await fdapi.dynamicWater.update({\r
    id: 'dy1',\r
    style: 2\r
});\r
fdapi.dynamicWater.focus('dy1', 200);\r
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
|------|------|---\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
`;export{n as default};
