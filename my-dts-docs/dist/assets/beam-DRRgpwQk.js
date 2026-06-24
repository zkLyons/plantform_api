const n=`---\r
title: Beam\r
sidebar_label: Beam\r
description: "Beam 可视化雷达/通信波束的指向、形状与扫描，表达探测/覆盖扇区。"\r
---\r
\r
# Beam\r
\r
Beam 可视化雷达/通信波束的指向、形状与扫描，表达探测/覆盖扇区。\r
\r
\r
\r
![](/img/refdoc/api/Beam.Add.gif)\r
\r
通过 \`api.beam\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Beam 可视化雷达/通信波束的指向、形状与扫描，表达探测/覆盖扇区。\r
- **别名 / 不同行业叫法**：波束 / 信号波束 / 雷达波束 / 探测扇区 / 扫描波束 / 覆盖锥。\r
- **适用行业**：国防雷达、通信、低空监管、安防、航空管制\r
- **使用场景**：\r
  - 雷达探测范围与扫描动态的展示\r
  - 通信波束指向与覆盖\r
  - 低空目标探测态势\r
- **注意事项**：\r
  - 为范围/示意表达，非精确电磁计算\r
  - 波束数量多时注意性能\r
  - 与天线、信号波配合使用\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Beam对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的Beam | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Beam对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取Beam的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏Beam | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有Beam | 一键隐藏全部对象 |\r
| [\`setColor\`](#setColor) | 设置Color |  |\r
| [\`setCoordinates\`](#setCoordinates) | 设置Coordinates |  |\r
| [\`setDuration\`](#setDuration) | 设置Duration |  |\r
| [\`setInterval\`](#setInterval) | 设置Interval |  |\r
| [\`setThickness\`](#setThickness) | 设置Thickness |  |\r
| [\`setVelocity\`](#setVelocity) | 设置Velocity |  |\r
| [\`show\`](#show) | 显示Beam | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有Beam | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个Beam对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Beam对象\r
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
| \`duration\` | \`number\` | 光流粒子的生命周期，取值范围：[0.1~3.0]，单位：秒 |\r
| \`thickness\` | \`number\` | 光流线的宽度，取值范围： [0.01~10.0]，单位：因Beam是粒子加上自发光不能精确单位,故目前按比例显示,需要精确单位的推荐使用Polyline |\r
| \`interval\` | \`number\` | 光流粒子发射间隔，取值范围：[1.0~10.0]，单位：秒 |\r
| \`velocity\` | \`number\` | 光流粒子的速度，取值范围：[0.1~5.0] |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 光流的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`coordinates\` | \`array\` | 光流的polyline的坐标数组 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.beam.clear();\r
let o1 = {\r
    id: 'beam1',\r
    coordinates: [[491599.5, 2490045, 11.3046875], [492483.5, 2490050.5, 8.1779689788818359], [492621.1875, 2489262.5, 11.311718940734863], [493609.71875, 2489372.25, -0.071562498807907104],],\r
    duration: 3,        //光流粒子的生命周期\r
    thickness: 3,     //光流线的宽度比例\r
    interval: 2,       //光流粒子发射间隔\r
    velocity: 5,        //光流粒子的速度\r
    color: [0, 1, 0, 0.8]  //光流的颜色\r
};\r
\r
let o2 = {\r
    id: 'beam2',\r
    coordinates: [\r
        [491669.84375, 2488333.75, 9.8704690933227539],\r
        [492160.0625, 2488250.5, 11.376718521118164],\r
        [492468.4375, 2487725.75, 4.851874828338623]\r
    ],\r
    duration: 3,        //光流粒子的生命周期\r
    thickness: 3,     //光流线的宽度比例\r
    interval: 2,       //光流粒子发射间隔\r
    velocity: 5,        //光流粒子的速度\r
    color: [0.5, 0.8, 0, 0.8]  //光流的颜色\r
};\r
let beamArr = [];\r
beamArr.push(o1);\r
beamArr.push(o2);\r
await fdapi.beam.add(beamArr);\r
\r
fdapi.beam.focus(o1.id, 600);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的Beam\r
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
fdapi.beam.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Beam对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Beam对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
let ids = ['beam1', 'beam2'];\r
fdapi.beam.delete(ids);\r
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
| \`ids\` | \`string \\| array\` | Beam对象的ID或者ID数组 |\r
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
fdapi.beam.focus('beam1', 200);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Beam的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Beam对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
Beam的详细信息\r
{\r
            "id":	"1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "duration":	3.000000,\r
            "thickness":	0.800000,\r
            "interval":	0.500000,\r
            "velocity":	5.000000,\r
            "color":	[1.000000, 0.000000, 0.000000],\r
            "coordinates":	[[491599.500000, 2490045.000000, 11.304688], [492483.500000, 2490050.500000, 8.177969], [492621.187500, 2489262.500000, 11.311719]]\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.beam.get(['beam1', 'beam2']);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏Beam\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Beam对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.beam.hide('beam1');\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有Beam\r
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
fdapi.beam.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`setColor(id, newVal, fn)\` {#setColor}\r
\r
设置Color\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Beam对象的ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.beam.setColor(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setCoordinates(id, newVal, fn)\` {#setCoordinates}\r
\r
设置Coordinates\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Beam对象的ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.beam.setCoordinates(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setDuration(id, newVal, fn)\` {#setDuration}\r
\r
设置Duration\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | Beam对象的ID |\r
| \`newVal\` | \`any\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.beam.setDuration(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setInterval(id, newVal, fn)\` {#setInterval}\r
\r
设置Interval\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Beam对象的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.beam.setInterval(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setThickness(id, newVal, fn)\` {#setThickness}\r
\r
设置Thickness\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Beam对象的ID |\r
| \`newVal\` | \`number\` | 新厚度值，取值范围：[0.01-100] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetThickness\r
\r
\`\`\`js\r
fdapi.beam.setThickness('beam1', 15);\r
\`\`\`\r
\r
---\r
\r
### \`setVelocity(id, newVal, fn)\` {#setVelocity}\r
\r
设置Velocity\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Beam对象的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.beam.setVelocity(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示Beam\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Beam对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.beam.show('beam1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有Beam\r
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
fdapi.beam.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Beam对象\r
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
    id: 'beam1',\r
    coordinates: [[491599.5, 2490045, 11.3046875], [492483.5, 2490050.5, 8.1779689788818359], [492520.28125, 2490873.25, 9.8798437118530273]],\r
    duration: 5,\r
    thickness: 3,\r
    interval: 0.2,\r
    velocity: 5,\r
    color: Color.Blue\r
}\r
fdapi.beam.update(o);\r
fdapi.beam.focus(o.id);\r
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
await fdapi.beam.updateEnd();\r
\`\`\`\r
`;export{n as default};
