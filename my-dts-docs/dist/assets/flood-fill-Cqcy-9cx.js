const n=`---\r
title: FloodFill\r
sidebar_label: FloodFill\r
description: "FloodFill 基于给定出水点（seed）和水位高度（elevation），在指定范围内沿地形进行漫延式的淹没计算与填充，模拟“给定水位下哪些区域会被淹没”，并以指定颜色渲染淹没范围与水面。"\r
---\r
\r
# FloodFill\r
\r
FloodFill 基于给定出水点（seed）和水位高度（elevation），在指定范围内沿地形进行漫延式的淹没计算与填充，模拟“给定水位下哪些区域会被淹没”，并以指定颜色渲染淹没范围与水面。\r
\r
通过 \`api.floodFill\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：FloodFill 基于给定出水点（seed）和水位高度（elevation），在指定范围内沿地形进行漫延式的淹没计算与填充，模拟“给定水位下哪些区域会被淹没”，并以指定颜色渲染淹没范围与水面。\r
- **别名 / 不同行业叫法**：淹没分析 / 水淹分析 / 淹没范围模拟 / 洪水演进（淹没填充）/ 漫滩分析；应急领域常称“淹没范围推演”“受淹区识别”。\r
- **适用行业**：智慧水利、应急管理、智慧城市（内涝防治）、能源电力（库区/电站防洪）、海洋气象（风暴潮淹没）。\r
- **使用场景**：\r
  - 防汛应急中给定预测水位，快速推演城区或村镇的淹没范围，辅助受影响人口与设施研判。\r
  - 水库溃坝、超标洪水的“假设水位”淹没推演，支撑撤离路线与警戒区域划定。\r
  - 城市内涝低洼点积水范围模拟，配合地形 DEM 评估受淹道路与地下空间风险。\r
- **注意事项**：\r
  - 出水点 seed 必须落在 [min,max] 分析范围内且不被模型遮挡，否则结果无效；通常取地形高度上方的合法点位。\r
  - precision 越高精度越好但效率越低，大范围分析建议先用低精度试算再细化；分析范围 min/max 应贴合关注区域，避免无谓计算开销。\r
  - 属于基于水位的静态淹没填充，不含真实时序水动力过程；需要动态演进过程时应配合水动力模型对象使用。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new FloodFill()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个FloodFill对象， | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的FloodFill | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个FloodFill对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取FloodFill的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏FloodFill | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有FloodFill | 一键隐藏全部对象 |\r
| [\`setColor\`](#setColor) | 设置水颜色 |  |\r
| [\`setElevation\`](#setElevation) | 设置水位高度 |  |\r
| [\`setPrecision\`](#setPrecision) | 设置水淹模拟精度 |  |\r
| [\`setRange\`](#setRange) | 设置水淹分析范围 |  |\r
| [\`setSeed\`](#setSeed) | 设置出水点 |  |\r
| [\`show\`](#show) | 显示FloodFill | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有FloodFill | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个FloodFill对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个FloodFill对象，\r
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
| \`min\` | \`array\` | 水淹分析范围Min：[x,y]，数组元素取值：[任意数值] |\r
| \`max\` | \`array\` | 水淹分析范围Max：[x,y]，数组元素取值：[任意数值] |\r
| \`seed\` | \`array\` | 出水点，水淹分析范围[min~max]内的任意[x,y]，数组元素取值：[任意数值] 注意：出水点必须在水淹分析范围内，且不能被物体遮挡，否则会无效 |\r
| \`elevation\` | \`number\` | 水位高度，取值范围：[任意正数]，单位：米 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 水颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`precision\` | \`number\` | 水淹模拟精度，取值范围：[0~1] 精度越高效率会降低 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.floodFill.clear();\r
let o = {\r
    id: 'fd1',\r
    min: [494023.875, 2491299.75],//水淹分析范围min\r
    max: [494564.21875, 2491845.5],//水淹分析范围max\r
    seed: [494084.9, 2491641],//出水点 注意：出水点一定要在水淹分析范围[min~max]内，否则接口会报错\r
    elevation: 2.5,//水位高度\r
    color: Color.LightSeaGreen,//水颜色\r
    precision: 0.5 //水淹模拟精度\r
}\r
await fdapi.floodFill.add(o);\r
fdapi.floodFill.focus(o.id);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的FloodFill\r
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
fdapi.floodFill.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个FloodFill对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的FloodFill对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.floodFill.delete('fd1');\r
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
| \`ids\` | \`string \\| array\` | FloodFill对象的ID或者ID数组 |\r
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
fdapi.floodFill.focus('fd1', 100);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取FloodFill的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的FloodFill对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
FloodFill的详细信息\r
{\r
        "id": "fd1",\r
        "min": [495119.875, 2491031.25],//水淹分析范围min\r
        "max": [495386.625, 2491245.5],//水淹分析范围max\r
        "seed": [495304.9, 2491041],//出水点 注意：出水点[x,y]一定要在水淹分析范围[min~max]内，否则接口会报错\r
        "elevation": 3.5,//水位高度\r
        "color": [0,1,0,1],//水颜色\r
        "precision": 0.5 //水淹模拟精度\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.floodFill.get('fd1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏FloodFill\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | FloodFill对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.floodFill.hide('fd1');\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有FloodFill\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideAll\r
\r
\`\`\`js\r
fdapi.floodFill.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`setColor(id, newVal, fn)\` {#setColor}\r
\r
设置水颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.floodFill.setColor(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setElevation(id, newVal, fn)\` {#setElevation}\r
\r
设置水位高度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.floodFill.setElevation(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setPrecision(id, newVal, fn)\` {#setPrecision}\r
\r
设置水淹模拟精度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.floodFill.setPrecision(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setRange(id, minArr, maxArr, fn)\` {#setRange}\r
\r
设置水淹分析范围 注意：出水点[x,y]一定要在新设置的水淹分析范围[min~max]内\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 水淹分析范围唯一标识，字符串类型的ID |\r
| \`minArr\` | \`array\` | 水淹分析范围Min：[x,y]，数组元素取值：[任意数值] |\r
| \`maxArr\` | \`array\` | 水淹分析范围Max：[x,y]，数组元素取值：[任意数值] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.floodFill.setRange(id, minArr, maxArr);\r
\`\`\`\r
\r
---\r
\r
### \`setSeed(id, newVal, fn)\` {#setSeed}\r
\r
设置出水点\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.floodFill.setSeed(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示FloodFill\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | FloodFill对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.floodFill.show('fd1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有FloodFill\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowAll\r
\r
\`\`\`js\r
fdapi.floodFill.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个FloodFill对象\r
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
let o = {\r
    id: 'fd1',\r
    min: [495119.875, 2491031.25],\r
    max: [495386.625, 2491245.5],\r
    seed: [495304.9, 2491041],\r
    elevation: 2.5,\r
    color: Color.DarkSeaGreen,\r
    precision: 0.25\r
}\r
await fdapi.floodFill.update(o);\r
fdapi.floodFill.focus(o.id);\r
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
| \`fn\` | \`function\` | 可选的回调\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
`;export{n as default};
