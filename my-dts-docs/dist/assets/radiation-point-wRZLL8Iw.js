const n=`---\r
title: RadiationPoint\r
sidebar_label: RadiationPoint\r
description: "RadiationPoint 以辐射圈/扩散圈形式表达从某点向外扩散、强度逐渐衰减的影响范围。"\r
---\r
\r
# RadiationPoint\r
\r
RadiationPoint 以辐射圈/扩散圈形式表达从某点向外扩散、强度逐渐衰减的影响范围。\r
\r
\r
\r
![](/img/refdoc/api/RediationPoint.Update.gif)\r
\r
通过 \`api.radiationPoint\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：RadiationPoint 以辐射圈/扩散圈形式表达从某点向外扩散、强度逐渐衰减的影响范围。\r
- **别名 / 不同行业叫法**：辐射点 / 辐射圈 / 扩散圈 / 影响范围 / 污染扩散 / 信号覆盖圈 / 预警圈。\r
- **适用行业**：应急（污染/危化扩散）、环保、安防、通信、城市治理\r
- **使用场景**：\r
  - 污染源、危化品泄漏的扩散范围示意\r
  - 事件影响半径与预警圈表达\r
  - 信号/服务覆盖范围的示意\r
- **注意事项**：\r
  - 为示意性表达，非精确扩散模型\r
  - 半径与衰减参数需结合业务设定\r
  - 常与告警点、标注配合使用\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个RadiationPoint对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的RadiationPoint | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个RadiationPoint对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`focusAll\`](#focusAll) | 自动定位到能观察所有RadiationPoint对象的合适距离 | 相机定位到全部对象的合适视角 |\r
| [\`get\`](#get) | 根据ID获取RadiationPoint的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏RadiationPoint | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有RadiationPoint | 一键隐藏全部对象 |\r
| [\`setAutoHeight\`](#setAutoHeight) | 设置AutoHeight 自动判断下方是否有物体，设置正确高度 |  |\r
| [\`setBrightness\`](#setBrightness) | 设置新的亮度 |  |\r
| [\`setColor\`](#setColor) | 设置颜色 |  |\r
| [\`setCoordinate\`](#setCoordinate) | 设置坐标 |  |\r
| [\`setRadius\`](#setRadius) | 设置半径 |  |\r
| [\`setRippleNumber\`](#setRippleNumber) | 设置波纹数量 |  |\r
| [\`show\`](#show) | 显示RadiationPoint | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有RadiationPoint | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个RadiationPoint对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个RadiationPoint对象\r
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
| \`groupId\` | \`string\` | 可选，Group分组id |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinate\` | \`array\` | 坐标点，[取值示例](/docs/tutorials/coordinates) |\r
| \`radius\` | \`number\` | 辐射圈的半径，取值范围：[0~500000]，单位：米 |\r
| \`rippleNumber\` | \`number\` | 波纹数量，取值范围：[0~5]，单位：个 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`intensity\` | \`number\` | 亮度，取值范围：[0~1.0] |\r
| \`autoHeight\` | \`boolean\` | 自动判断下方是否有物体，设置正确高度，默认值：false |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.radiationPoint.clear();\r
let o = {\r
    id: '1',\r
    coordinate: [494479.71875, 2491462.25, 0],//辐射圈坐标位置\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    radius: 300,//辐射半径\r
    rippleNumber: 5,//波纹数量\r
    color: [1, 0, 0, 0.8],//颜色\r
    intensity: 0.8,//亮度\r
    autoHeight: false//自动判断下方是否有物体\r
}\r
await fdapi.radiationPoint.add(o);\r
fdapi.radiationPoint.focus(o.id, 800, 1);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的RadiationPoint\r
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
fdapi.radiationPoint.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个RadiationPoint对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的RadiationPoint对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
let ids = ['0', '1'];\r
fdapi.radiationPoint.delete(ids);\r
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
| \`ids\` | \`string \\| array\` | RadiationPoint对象的ID或者ID数组 |\r
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
fdapi.radiationPoint.focus('1', 200);\r
\`\`\`\r
\r
---\r
\r
### \`focusAll(distance, flyTime, rotation, fn)\` {#focusAll}\r
\r
自动定位到能观察所有RadiationPoint对象的合适距离\r
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
fdapi.radiationPoint.focusAll();\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取RadiationPoint的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的RadiationPoint对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
RadiationPoint的详细信息\r
{\r
            "id":	"1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "coordinate":	[62.838749, 0.080000, 0.400000],\r
            "rippleNumber":	5.000000,\r
            "radius":	300.000000,\r
            "color":	[1.000000, 0.000000, 1.000000],\r
            "brightness":	0.800000,\r
            "autoHeight":	0\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.radiationPoint.get('1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏RadiationPoint\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | RadiationPoint对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.radiationPoint.hide('1');\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有RadiationPoint\r
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
fdapi.radiationPoint.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`setAutoHeight(id, newVal, fn)\` {#setAutoHeight}\r
\r
设置AutoHeight 自动判断下方是否有物体，设置正确高度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | RadiationPoint对象的ID |\r
| \`newVal\` | \`boolean\` | 自动判断下方是否有物体，设置正确高度 true/false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.radiationPoint.setAutoHeight(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setBrightness(id, newVal, fn)\` {#setBrightness}\r
\r
设置新的亮度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | RadiationPoint对象的ID |\r
| \`newVal\` | \`number\` | 新亮度值，取值范围：[0~1] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.radiationPoint.setBrightness(id, newVal);\r
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
| \`id\` | \`string\` | RadiationPoint对象的ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.radiationPoint.setColor(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setCoordinate(id, newVal, fn)\` {#setCoordinate}\r
\r
设置坐标\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | RadiationPoint对象的ID |\r
| \`newVal\` | \`array\` | 新的坐标值，[取值示例](/docs/tutorials/coordinates) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.radiationPoint.setCoordinate(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setRadius(id, newVal, fn)\` {#setRadius}\r
\r
设置半径\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | RadiationPoint对象的ID |\r
| \`newVal\` | \`number\` | 辐射圈新的半径，取值范围：[0~500000]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.radiationPoint.setRadius(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setRippleNumber(id, newVal, fn)\` {#setRippleNumber}\r
\r
设置波纹数量\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | RadiationPoint对象的ID |\r
| \`newVal\` | \`number\` | 新波纹数量，取值范围：[0~5]，单位：个 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.radiationPoint.setRippleNumber(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示RadiationPoint\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | RadiationPoint对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.radiationPoint.show('1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有RadiationPoint\r
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
fdapi.radiationPoint.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个RadiationPoint对象\r
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
    id: '1',\r
    coordinate: [494479.71875, 2491462.25, 0],\r
    radius: 100,\r
    rippleNumber: 2,\r
    color: [0, 1, 0, 1],\r
    intensity: 0.5,\r
    autoHeight: true\r
}\r
await fdapi.radiationPoint.update(o);\r
fdapi.radiationPoint.focus(o.id);\r
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
await fdapi.radiationPoint.updateEnd();\r
\`\`\`\r
`;export{n as default};
