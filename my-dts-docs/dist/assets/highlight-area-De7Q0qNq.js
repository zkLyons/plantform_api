const n=`---\r
title: HighlightArea\r
sidebar_label: HighlightArea\r
description: "HighlightArea 根据多边形坐标在三维场景中对指定区域内的模型进行高亮染色，并可通过高度范围限定染色的 Z 区间，用于突出强调某一空间范围。"\r
---\r
\r
# HighlightArea\r
\r
HighlightArea 根据多边形坐标在三维场景中对指定区域内的模型进行高亮染色，并可通过高度范围限定染色的 Z 区间，用于突出强调某一空间范围。\r
\r
\r
\r
![](/img/refdoc/api/HlghlightArea.Update.gif)\r
\r
通过 \`api.highlightArea\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：HighlightArea 根据多边形坐标在三维场景中对指定区域内的模型进行高亮染色，并可通过高度范围限定染色的 Z 区间，用于突出强调某一空间范围。\r
- **别名 / 不同行业叫法**：高亮区域、热区、责任区、网格、管辖范围、染色区、圈层、重点区域。\r
- **适用行业**：智慧城市、应急管理、园区、智慧水利、安防、交通。\r
- **使用场景**：\r
  - 应急 / 城市管理：高亮事件影响范围、风险责任区、网格化管理单元，配合调度指挥。\r
  - 园区 / 安防：突出显示重点防护区域、权属地块、围栏内建筑。\r
  - 水利行业：淹没范围、防洪责任段、河湖管理范围的区域强调。\r
- **注意事项**：\r
  - \`heightRange\` 用于限定染色的 Z 坐标区间，只有处于该区间的模型才会被染色，需结合实际高程设置。\r
  - \`depthTest\` 为 true 时高亮会被前方物体遮挡，需穿透显示时设为 false。\r
  - 多边形 \`coordinates\` 应保证闭合且无自相交，避免染色异常。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个HighlightArea对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的HighlightArea | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个HighlightArea对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取HighlightArea的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏HighlightArea | 按业务条件隐藏对象 |\r
| [\`setColor\`](#setColor) | 设置颜色 |  |\r
| [\`setCoordinates\`](#setCoordinates) | 设置坐标 |  |\r
| [\`setDepthTest\`](#setDepthTest) | 设置是否做深度检测 |  |\r
| [\`setHeightRange\`](#setHeightRange) | 设置高度范围 |  |\r
| [\`setIntensity\`](#setIntensity) | 设置亮度 |  |\r
| [\`show\`](#show) | 显示HighlightArea | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个HighlightArea对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个HighlightArea对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 对象或者数组，对于每一个对象支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinates\` | \`array\` | 多边形坐标数组（二维数组），[取值示例](/docs/tutorials/coordinates) |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 多边形高亮颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`heightRange\` | \`array\` | 高亮染色区域高度范围：[min,max]，数组元素取值范围：[任意浮点数]，取值说明：Z坐标的区间，只有Z值这这个区间的模型才会被染色 |\r
| \`intensity\` | \`number\` | 高亮颜色的强度，取值范围：[0~1000] |\r
| \`depthTest\` | \`boolean\` | 是否做深度检测，默认为true（DepthTest=true会被遮挡，false的话不会被遮挡） |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.highlightArea.clear();\r
let o = {\r
    id: '1',\r
    coordinates: [\r
        [488526.90625, 2488808.5, 2.4699218273162842],\r
        [489125.78125, 2490378.75, 4.0634374618530273],\r
        [489808.625, 2490836.5, 4.278437614440918],\r
        [490844.5, 2490698.75, 8.6131248474121094],\r
        [491145.71875, 2489830, 20.654062271118164],\r
        [491075.59375, 2488885.5, 21.038749694824219],\r
        [490706.875, 2487941.75, 4.1996874809265137],\r
        [490053.40625, 2486989, 17.100000381469727],\r
        [489206.875, 2487352.75, 16.781406402587891],\r
    ],\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    color: [0, 1, 0, 0.8],      //多边形高亮颜色\r
    heightRange: [0.0, 200.0],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色\r
    intensity: 1.0,             //高亮颜色的强度\r
    depthTest: true             //深度检测\r
};\r
await fdapi.highlightArea.add(o);\r
fdapi.highlightArea.focus(o.id);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的HighlightArea\r
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
fdapi.highlightArea.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个HighlightArea对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的HighlightArea对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.highlightArea.delete('1');\r
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
| \`ids\` | \`string \\| array\` | HighlightArea对象的ID或者ID数组 |\r
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
fdapi.highlightArea.focus('1', 600);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取HighlightArea的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的HighlightArea对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
高亮区域的详细信息\r
{\r
            "id":	"1",\r
            "coordinates":	[],\r
            "color":	[1.000000, 0.000000, 0.000000, 0.800000],\r
            "heightRange":	[0.000000, 100.000000],\r
            "intensity":	5.000000\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.highlightArea.get('1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏HighlightArea\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | HighlightArea对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.highlightArea.hide('1');\r
\`\`\`\r
\r
---\r
\r
### \`setColor(id, newVal, fn)\` {#setColor}\r
\r
设置颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | HighlightArea对象的ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新的颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.highlightArea.setColor(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setCoordinates(id, newVal, fn)\` {#setCoordinates}\r
\r
设置坐标\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | HighlightArea对象的ID |\r
| \`newVal\` | \`array\` | 新的坐标值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.highlightArea.setCoordinates(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setDepthTest(id, newVal, fn)\` {#setDepthTest}\r
\r
设置是否做深度检测\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | HighlightArea对象的ID |\r
| \`newVal\` | \`boolean\` | 是否做深度检测 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.highlightArea.setDepthTest(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setHeightRange(id, newVal, fn)\` {#setHeightRange}\r
\r
设置高度范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | HighlightArea对象的ID |\r
| \`newVal\` | \`array\` | 高亮染色区域高度范围：[min,max] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.highlightArea.setHeightRange(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setIntensity(id, newVal, fn)\` {#setIntensity}\r
\r
设置亮度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | HighlightArea对象的ID |\r
| \`newVal\` | \`number\` | 新的亮度值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.highlightArea.setIntensity(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示HighlightArea\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | HighlightArea对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.highlightArea.show('1');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个HighlightArea对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 对象或者数组，数据结构请参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let o = {\r
    id: '1',\r
    coordinates: [\r
        [488526.90625, 2488808.5, 2.4699218273162842],\r
        [489125.78125, 2490378.75, 4.0634374618530273],\r
        [489808.625, 2490836.5, 4.278437614440918],\r
        [490844.5, 2490698.75, 8.6131248474121094],\r
        [491145.71875, 2489830, 20.654062271118164],\r
        [491075.59375, 2488885.5, 21.038749694824219]\r
    ],\r
    color: [1, 0, 0, 0.5],      //多边形高亮颜色\r
    heightRange: [0.0, 300.0],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色\r
    intensity: 2.0              //高亮颜色的强度\r
};\r
await fdapi.highlightArea.update(o);\r
fdapi.highlightArea.focus(o.id);\r
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
await fdapi.highlightArea.updateEnd();\r
\`\`\`\r
`;export{n as default};
