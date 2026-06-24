const n=`---\r
title: TopologyLine\r
sidebar_label: TopologyLine\r
description: "TopologyLine 绘制连接图层树上模型/对象之间的拓扑连接线，表达对象间的关系与连接。"\r
---\r
\r
# TopologyLine\r
\r
拓扑线对象，提供绘制连接图层树上模型的拓扑线的相关操作方法\r
\r
通过 \`api.topologyLine\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：TopologyLine 绘制连接图层树上模型/对象之间的拓扑连接线，表达对象间的关系与连接。\r
- **别名 / 不同行业叫法**：拓扑线 / 连接线 / 关系线 / 管网拓扑 / 连接关系 / 逻辑连线。\r
- **适用行业**：能源管网、通信网络、智慧园区（设备关系）、工业、智慧水务\r
- **使用场景**：\r
  - 设备/节点间连接关系的可视化\r
  - 管网、线缆拓扑的表达\r
  - 系统逻辑连接示意\r
- **注意事项**：\r
  - 依赖图层树上的目标对象存在\r
  - 连接数量多时注意可读性与性能\r
  - 目标对象删除/移动时需联动更新\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个TopologyLine对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的TopologyLine | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个TopologyLine对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取TopologyLine的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏TopologyLine对象 | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有TopologyLine对象 | 一键隐藏全部对象 |\r
| [\`show\`](#show) | 显示TopologyLine对象 | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有TopologyLine对象 | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个·TopologyLine对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个TopologyLine对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 待添加的拓扑线数据，可以是Object类型或者Array类型，对于每一个TopologyLine对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`objectIds\` | \`array\` | 待连接的拓扑线的模型节点ID，即图层树上模型的ID数组，取值示例：["E78C50304F64ED20151624970CFA4FED","8ECFECA747068210E87C618F8DF0B3E5"...], |\r
| \`range\` | \`array\` | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |\r
| \`thickness\` | \`number\` | 线宽，单位：米，默认值20 |\r
| \`intensity\` | \`number\` | 亮度，取值范围：[0~1000]，默认值：0.5 |\r
| \`flowRate\` | \`number\` | 流速，取值范围：[0~1.0]，默认值：0.5 |\r
| \`depthTest\` | \`boolean\` | 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡 |\r
| \`shape\` | \`number\` | 样式，0：直线， 1：曲线，注意：设置为曲线坐标点多的时候会非常影响添加添加效率 |\r
| \`style\` | [\`PolylineStyle\`](/docs/api/types#polylinestyle) | (\`PolylineStyle\`) 折线样式，箭头/光流/贴地/实线/虚线等，取值范围：[0~7]，详情参考 \`PolylineStyle\` |\r
| \`tiling\` | \`number\` | 可选参数，材质贴图平铺比例，和PolylineStyle取值有关，目前仅部分样式支持此参数，从起始位置开始平铺，超过的部分会按此比例生成新的区域，类似CSS的repeat。如果这个值 &lt;= 0 使用自动计算按Polyline长度比例平铺， &gt;0使用用户输入的值去平铺 |\r
| \`material\` | \`string\` | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |\r
| \`scalarParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |\r
| \`vectorParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
await fdapi.topologyLine.delete(['p1']);\r
let p1 = {\r
    id: 'p1',\r
    objectIds: ["08E0B7A340EEA389C811C19FA0E12B0F", "D5752FAD42C62BD7705E51882CC427A2", "FF1AC0C34935106BB6A464A6431EA0CC"], //待连接的拓扑线的模型节点ID，即图层树上模型的ID数组\r
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]\r
    color: Color.Red,//折线颜色\r
    thickness: 0.2,//折线宽度\r
    intensity: 1,//亮度\r
    flowRate: 1,//流速\r
    shape: 0, //折线类型 0：直线， 1：曲线\r
    depthTest: false,//是否做深度检测 开启后会被地形高度遮挡\r
    style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle\r
    tiling: 0//材质贴图平铺比例\r
};\r
await fdapi.topologyLine.add(p1);\r
fdapi.topologyLine.focus(p1.id);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的TopologyLine\r
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
fdapi.topologyLine.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个TopologyLine对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的TopologyLine对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.topologyLine.delete('p1');\r
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
| \`ids\` | \`string \\| array\` | TopologyLine对象的ID或者ID数组 |\r
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
fdapi.topologyLine.focus('p1', 880, 1);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取TopologyLine的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的TopologyLine对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
TopologyLine的详细信息\r
[\r
        {\r
            "id": "p1",\r
            "objectIds": [\r
                "E78C50304F64ED20151624970CFA4FED",\r
                "8ECFECA747068210E87C618F8DF0B3E5",\r
                "1F95B7BD4A993AF2D9C4ECA3A214EA77"\r
            ],\r
            "range": [\r
                1,\r
                10000\r
            ],\r
            "color": [\r
                1,\r
                0,\r
                0,\r
                1\r
            ],\r
            "thickness": 100,\r
            "flowRate": 1.5,\r
            "shape": 1,\r
            "depthTest": false,\r
            "style": 0,\r
            "tiling": 3,\r
            "brightness": 0.8\r
        }\r
        ]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.topologyLine.get('p1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏TopologyLine对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | TopologyLine对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.topologyLine.hide('p1');\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有TopologyLine对象\r
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
fdapi.topologyLine.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示TopologyLine对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | TopologyLine对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.topologyLine.show('p1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有TopologyLine对象\r
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
fdapi.topologyLine.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(topologyLine, fn)\` {#update}\r
\r
修改一个或多个·TopologyLine对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`topologyLine\` | \`object \\| array\` | 对象数据结构，结构参考add()方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let p1 = {\r
    id: 'p1',\r
    shape: 0, //折线类型 0：直线， 1：曲线\r
    depthTest: false,//是否做深度检测 开启后会被地形高度遮挡\r
    style: PolylineStyle.Arrow,//折线样式 参考样式枚举：PolylineStyle\r
    tiling: 0//材质贴图平铺比例\r
};\r
await fdapi.topologyLine.update(p1);\r
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
await fdapi.topologyLine.updateEnd();\r
\`\`\`\r
`;export{n as default};
