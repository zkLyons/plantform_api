const n=`---\r
title: ExcavationAnalysis\r
sidebar_label: ExcavationAnalysis\r
description: "ExcavationAnalysis 对比设计面与实际开挖/实测面，计算超挖、欠挖的体积与分布，并以三维云图着色呈现开挖偏差。"\r
---\r
\r
# ExcavationAnalysis\r
\r
超欠挖分析类对象，提供超挖欠挖分析相关操作\r
\r
通过 \`api.excavationAnalysis\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：ExcavationAnalysis 对比设计面与实际开挖/实测面，计算超挖、欠挖的体积与分布，并以三维云图着色呈现开挖偏差。\r
- **别名 / 不同行业叫法**：超欠挖分析 / 开挖分析 / 土方分析 / 基坑分析；隧道领域称“掌子面超欠挖”，矿山称“采剥超挖控制”。\r
- **适用行业**：隧道与地下工程、矿山、土木基建、智慧水利（渠道/基坑）、市政工程\r
- **使用场景**：\r
  - 隧道掘进中掌子面的超挖/欠挖检测与进尺质量评估\r
  - 基坑、边坡开挖的土方量核算与偏差着色\r
  - 矿山采剥进度与超挖控制可视化\r
- **注意事项**：\r
  - 依赖高精度设计面与实测面（点云/DEM）且需配准对齐\r
  - 设计面与实测面坐标系、高程基准须一致\r
  - 大范围高精度计算开销较大，注意范围与精度的平衡\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个ExcavationAnalysis对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的ExcavationAnalysis | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个ExcavationAnalysis对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取ExcavationAnalysis的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏ExcavationAnalysis对象 | 按业务条件隐藏对象 |\r
| [\`show\`](#show) | 显示ExcavationAnalysis对象 | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个ExcavationAnalysis对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(excavationAnalysis, fn)\` {#add}\r
\r
添加一个ExcavationAnalysis对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`excavationAnalysis\` | \`object\` | 对象数据结构，对象支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`excavationAnalysis\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`filePath\` | \`string\` | ply文件路径，资源文件引入方式：*.ply，[资源引入说明](/docs/tutorials/resources) |\r
| \`objectId\` | \`string\` | 自定义对象模型的Id |\r
| \`pointSize\` | \`number\` | 点云尺寸，单位：米，默认值：0.01 |\r
| \`colors\` | \`object\` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
let path = HostConfig.Path + "/assets/";\r
\r
fdapi.tileLayer.delete('1');\r
await fdapi.tileLayer.add({\r
    id: '1',\r
    fileName: path + "3dt/tunnel.3dt",\r
    location: [0, 0, 0],//坐标位置\r
    rotation: [0, 0, 0],//旋转角度\r
    scale: [1, 1, 1]    //缩放大小\r
});\r
fdapi.tileLayer.focus('1', 18);\r
fdapi.tileLayer.hide('1');\r
\r
//添加前清空所有customObject 防止id重复\r
await fdapi.customObject.clear();\r
//添加的3dt的图层id\r
let tileLayerId = '1';\r
//查询图层内部包含的构件objectIds\r
let result = await fdapi.tileLayer.getObjectIDs(tileLayerId);\r
let objectIds = result.data[0].objectIds;\r
//执行合并复制\r
await fdapi.customObject.addByTileLayer({\r
    id: "tunnel",\r
    tileLayerId: tileLayerId,\r
    objectId: objectIds,\r
});\r
\r
await fdapi.excavationAnalysis.delete('ea1');\r
let ea1 = {\r
    id: "ea1",\r
    filePath: path + "ply/tunnel.ply", //参与对比的点云模型\r
    pointSize: 0.01,//  点云尺寸\r
    objectId: "tunnel",//参与对比的自定义模型ID\r
}\r
fdapi.excavationAnalysis.add(ea1);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的ExcavationAnalysis\r
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
fdapi.excavationAnalysis.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个ExcavationAnalysis对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的ExcavationAnalysis对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.excavationAnalysis.delete('ea1');\r
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
| \`ids\` | \`string \\| array\` | ExcavationAnalysis对象的ID或者ID数组 |\r
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
fdapi.excavationAnalysis.focus('ea1');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取ExcavationAnalysis的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的ExcavationAnalysis对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
ExcavationAnalysis的详细信息\r
[{\r
            "id":	"ea1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "filePath":	"D:\\\\test.ply",\r
            "customObjectId":	"test1,\r
            "pointSize":	0.01\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.excavationAnalysis.get('ea1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏ExcavationAnalysis对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | ExcavationAnalysis对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.excavationAnalysis.hide('ea1');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示ExcavationAnalysis对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | ExcavationAnalysis对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.excavationAnalysis.show('ea1');\r
\`\`\`\r
\r
---\r
\r
### \`update(excavationAnalysis, fn)\` {#update}\r
\r
修改一个ExcavationAnalysis对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`excavationAnalysis\` | \`object \\| array\` | 对象数据结构，结构参考add()方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let ea1_update = {\r
    id: "ea1",\r
    pointSize: 0.03,\r
}\r
fdapi.excavationAnalysis.update(ea1_update);\r
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
await fdapi.excavationAnalysis.updateEnd();\r
\`\`\`\r
`;export{n as default};
