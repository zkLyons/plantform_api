const n=`---\r
title: SignalWave\r
sidebar_label: SignalWave\r
description: "SignalWave 以波/涟漪扩散形式表达信号或电磁波的传播与覆盖。"\r
---\r
\r
# SignalWave\r
\r
SignalWave 以波/涟漪扩散形式表达信号或电磁波的传播与覆盖。\r
\r
通过 \`api.signalWave\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：SignalWave 以波/涟漪扩散形式表达信号或电磁波的传播与覆盖。\r
- **别名 / 不同行业叫法**：信号波 / 电磁波 / 信号覆盖 / 传播波 / 涟漪波 / 扩散波。\r
- **适用行业**：通信、国防、物联网、应急通信、广电\r
- **使用场景**：\r
  - 信号源覆盖扩散的动态表达\r
  - 通信/广播传播示意\r
  - 事件信号传播的可视化\r
- **注意事项**：\r
  - 为示意性可视化，非精确传播模型\r
  - 扩散参数需结合业务设定\r
  - 与 Antenna、Beam 配合使用\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个SignalWave波束对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的SignalWave | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个SignalWave对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取SignalWave的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏SignalWave | 按业务条件隐藏对象 |\r
| [\`show\`](#show) | 显示SignalWave | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个SignalWave对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个SignalWave波束对象\r
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
| \`alpha\` | \`number\` | 波束的透明度，取值范围：[0~1] |\r
| \`range\` | \`array\` | 距离波束发射点A的衰减范围，[min,max]，在min和max之间显示透明度渐变，大于max则波束消失。 |\r
| \`valA\` | \`array\` | 构造波束的位置坐标A: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |\r
| \`valB\` | \`array\` | 构造波束的位置坐标B: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |\r
| \`valC\` | \`array\` | 构造波束的位置坐标C: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |\r
| \`valD\` | \`array\` | 构造波束的位置坐标D: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |\r
| \`valE\` | \`array\` | 构造波束的位置坐标E: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |\r
| \`valF\` | \`array\` | 构造波束的位置坐标F: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |\r
| \`valG\` | \`array\` | 构造波束的位置坐标G: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.signalWave.clear();\r
let signalWave = {\r
    id: 'signalWave',\r
    groupId: 'group1',\r
    userData: '波束',\r
    alpha: 0.2,//透明度\r
    range: [20, 100],\r
    valA: [\r
        492894.75,\r
        2492212.5,\r
        0\r
    ], valB: [\r
        492984.56999999995,\r
        2492121.8,\r
        0\r
    ], valC: [\r
        492994.20999999996,\r
        2492134.01,\r
        0\r
    ], valD: [\r
        493003.83999999997,\r
        2492146.22,\r
        0\r
    ], valE: [\r
        492963.9,\r
        2492157.93,\r
        0\r
    ], valF: [\r
        493066.92000000004,\r
        2492076.63,\r
        0\r
    ], valG: [\r
        492894.75,\r
        2492212.5,\r
        26.93\r
    ]\r
}\r
fdapi.signalWave.add(signalWave);\r
fdapi.signalWave.focus('signalWave');\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的SignalWave\r
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
fdapi.signalWave.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个SignalWave对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的SignalWave对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.signalWave.delete('signalWave');\r
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
| \`ids\` | \`string \\| array\` | SignalWave对象的ID或者ID数组 |\r
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
fdapi.signalWave.focus('signalWave');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取SignalWave的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的SignalWave对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
结构示例\r
[\r
        {\r
            "id": "signalWave",\r
            "groupId": "group1",\r
            "userData": "波束",\r
            "valA": [\r
                -20,\r
                0,\r
                0\r
            ],\r
            "valB": [\r
                0,\r
                -10,\r
                0\r
            ],\r
            "valC": [\r
                0,\r
                0,\r
                0\r
            ],\r
            "valD": [\r
                0,\r
                10,\r
                0\r
            ],\r
            "valE": [\r
                -10,\r
                0,\r
                0\r
            ],\r
            "valF": [\r
                100,\r
                0,\r
                0\r
            ],\r
            "valG": [\r
                -20,\r
                0,\r
                30\r
            ]\r
        }\r
    ]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.signalWave.get('signalWave');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏SignalWave\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | SignalWave对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.signalWave.hide('signalWave');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示SignalWave\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | SignalWave对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.signalWave.show('signalWave');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个SignalWave对象\r
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
let signalWave = {\r
    id: 'signalWave',\r
    groupId: 'group1',\r
    userData: '波束',\r
    alpha: 0.5,//透明度\r
    range: [20, 100],\r
    valA: [-50, 0, 0],\r
    valB: [0, -20, 0],\r
    valC: [0, 0, 0],\r
    valD: [0, 20, 0],\r
    valE: [-20, 0, 0],\r
    valF: [300, 0, 0],\r
    valG: [-20, 0, 30],\r
}\r
fdapi.signalWave.update(signalWave);\r
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
await fdapi.signalWave.updateEnd();\r
\`\`\`\r
`;export{n as default};
