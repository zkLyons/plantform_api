const n=`---\r
title: Cesium3DTileset\r
sidebar_label: Cesium3DTileset\r
description: "加载、定位与管理 Cesium 3D Tiles（3DTiles）服务图层，通过服务 URL 流式加载海量三维瓦片数据，支持位置偏移与是否参与光照等控制。"\r
---\r
\r
# Cesium3DTileset\r
\r
加载、定位与管理 Cesium 3D Tiles（3DTiles）服务图层，通过服务 URL 流式加载海量三维瓦片数据，支持位置偏移与是否参与光照等控制。\r
\r
通过 \`api.cesium3DTileset\` 访问。\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Cesimu3DTileset接口可以用来添加3dtiles服务，3dtiles服务是cesium推出的一个服务标准，同时也已纳入OGC标准规范，跟Arcgis的I3S和超图的S3M类似，是目前主流的三维GIS数据的服务标准。谷歌通过Google Maps Platform 的 Map Tiles API​ 正式提供 Photorealistic 3D Tiles，格式也是OGC 3D Tiles标准。用于加载、定位与管理 Cesium 3D Tiles（3DTiles）服务图层，通过服务 URL 流式加载海量三维瓦片数据，支持位置偏移与是否参与光照等控制。\r
- **别名 / 不同行业叫法**：3DTiles 图层 / Cesium三维网络图层服务 / b3dm 倾斜模型服务 / Cesium 三维服务图层。\r
- **适用行业**：智慧城市、测绘 GIS、智慧园区、应急管理、智慧交通。\r
- **使用场景**：\r
  - 加载大范围城市级倾斜摄影或精模三维瓦片服务，构建城市数字底座。\r
  - 接入第三方厂商或自建切片服务发布的 3DTiles 数据，实现跨平台三维数据共享。\r
  - 通过 offset 偏移微调三维瓦片与地形、底图的空间套合。\r
- **注意事项**：\r
  - 数据通过网络流式加载，add 方法存在加载耗时，focus/定位等操作建议在加载完成后或延时执行。\r
  - 海量瓦片对显存与带宽要求较高，注意控制同屏加载的服务数量与可见层级。\r
  - 需关注服务发布坐标系与工程坐标系是否一致，必要时通过偏移与重投影对齐。\r
  - 坐标系：3dtiles服务默认是wgs84地理坐标系，如果当前工程也是地理坐标系（wgs84或cgs2000）可以直接加载，如果工程坐标系是PCS投影坐标系，也可以加载，系统会自动完成实时重投影，但是如果工程没有指定坐标系，或者说是Unknown坐标系，则无法加载。\r
  - 目前支持3dtiles的版本包括6.x和7.x版本\r
\r
## 构造函数\r
\r
\`\`\`js\r
new Cesium3DTileset()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Cesium3DTileset对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的Cesium3DTileset | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Cesium3DTileset对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取Cesium3DTileset的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏Cesium3DTileset | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有Cesium3DTileset | 一键隐藏全部对象 |\r
| [\`setTileURL\`](#setTileURL) | 设置URL |  |\r
| [\`show\`](#show) | 显示Cesium3DTileset | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有Cesium3DTileset | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个Cesium3DTileset对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Cesium3DTileset对象\r
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
| \`tileURL\` | \`string\` | 服务URL地址 |\r
| \`enableLighting\` | \`boolean\` | 可选，服务是否参与光照，默认值：true |\r
| \`offset\` | \`array\` | 可选，基于原始位置的偏移量，默认值：[0,0,0]，单位：米 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.cesium3DTileset.clear();\r
let o = {\r
    id: 'fd1',\r
    offset: [0, 0, 0], //偏移\r
    enableLighting: false, //可选，服务是否参与光照，默认值：true\r
    tileURL: '' //cesium3DTileset服务地址 请先替换参数\r
};\r
//注意：此add方法需要网络加载耗时 \r
//await fdapi.cesium3DTileset.add(o);\r
//延时1s执行focus\r
//window.setTimeout(focus,1000);\r
\r
function focus() {\r
    fdapi.cesium3DTileset.focus(o.id);\r
}\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的Cesium3DTileset\r
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
fdapi.cesium3DTileset.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Cesium3DTileset对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Cesium3DTileset对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.cesium3DTileset.delete('fd1');\r
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
| \`ids\` | \`string \\| array\` | Cesium3DTileset对象的ID或者ID数组 |\r
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
fdapi.cesium3DTileset.focus('fd1');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Cesium3DTileset的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Cesium3DTileset对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
Cesium3DTileset的详细信息\r
{\r
        id: 'fd1',\r
        tileURL: ''\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.cesium3DTileset.get('fd1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏Cesium3DTileset\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Cesium3DTileset对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.cesium3DTileset.hide('fd1');\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有Cesium3DTileset\r
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
fdapi.cesium3DTileset.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`setTileURL(id, newVal, fn)\` {#setTileURL}\r
\r
设置URL\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`string\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.cesium3DTileset.setTileURL(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示Cesium3DTileset\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Cesium3DTileset对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.cesium3DTileset.show('fd1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有Cesium3DTileset\r
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
fdapi.cesium3DTileset.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Cesium3DTileset对象\r
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
    tileURL: '' //cesium3DTileset服务地址\r
}\r
//await fdapi.cesium3DTileset.update(o);\r
//fdapi.cesium3DTileset.focus(o.id);\r
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
await fdapi.cesium3DTileset.updateEnd();\r
\`\`\`\r
`;export{n as default};
