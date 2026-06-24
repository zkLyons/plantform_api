const n=`---\r
title: Polygon3D\r
sidebar_label: Polygon3D\r
description: "在二维多边形基础上拉伸出高度，绘制三维体块面，用于表达有体量的区域，如建筑体块、围墙、立体淹没水体等，支持带洞与多 Part 复合多边形。"\r
---\r
\r
# Polygon3D\r
\r
在二维多边形基础上拉伸出高度，绘制三维体块面，用于表达有体量的区域，如建筑体块、围墙、立体淹没水体等，支持带洞与多 Part 复合多边形。\r
\r
![](/img/refdoc/api/3DPolugon.Update.gif)\r
\r
**下面Example代码的运行效果图：**\r
\r
1. 最简单的Polygon3D\r
\r
\`\`\`js\r
let coords1 = [[872.16, -9485.86, 5.8], [864.77, -9196.58, 5.7], [624.34, -9209.29, 6.05], [482.58, -9373.57, 7.38]];\r
\`\`\`\r
\r
![](/img/refdoc/api/Polygon3D1.png)\r
\r
2. 带2个洞的Polygon3D\r
\r
\`\`\`js\r
let coords2 = [\r
        [[9665.22, -11366.88, 5.7], [9765.4, -4511.22, 5.7], [4155.2, -4036.94, 5.7], [3098, -11010.32, 5.7], [6445.79, -12717.28, 6.78]],\r
        [[8706.9, -9457.89, 5.7], [8824.84, -8055.4, 6.64], [7619.37, -8859.47, 6.72]],\r
        [[5744.8, -7795.59, 5.7], [6205.21, -5724.74, 5.7], [4460.01, -5839.38, 6.05], [3966.28, -7712.46, 7.17]]\r
    ];\r
\`\`\`\r
\r
![](/img/refdoc/api/Polygon3D2.png)\r
\r
3. 2个Part的Polygon3D，每个Polygon3D有一个或多个洞\r
\r
\`\`\`js\r
 let coords3 = [\r
        //part1\r
        [\r
            [[9665.22, -11366.88, 5.7], [9765.4, -4511.22, 5.7], [4155.2, -4036.94, 5.7], [3098, -11010.32, 5.7], [6445.79, -12717.28, 6.78]],\r
            [[8706.9, -9457.89, 5.7], [8824.84, -8055.4, 6.64], [7619.37, -8859.47, 6.72]],\r
            [[5744.8, -7795.59, 5.7], [6205.21, -5724.74, 5.7], [4460.01, -5839.38, 6.05], [3966.28, -7712.46, 7.17]]\r
        ],\r
\r
        //part2\r
        [\r
            [[-4477.25, -4353.11, 5.7], [-1803.2, -6744.65, 5.7], [-562.18, -4590.14, 5.7], [-2271.85, -2595.33, 5.7]],\r
            [[-2867.3, -4342.53, 5.7], [-2381.34, -5043.33, 5.7], [-1723.21, -4566.1, 6.25], [-1938.83, -3757.59, 5.7]]\r
        ]\r
    ];\r
\`\`\`\r
\r
![](/img/refdoc/api/Polygon3D3.png)\r
\r
通过 \`api.polygon3d\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：在二维多边形基础上拉伸出高度，绘制三维体块面，用于表达有体量的区域，如建筑体块、围墙、立体淹没水体等，支持带洞与多 Part 复合多边形。\r
- **别名 / 不同行业叫法**：三维面、立体面、体块、拉伸多边形、白模、立体区域、淹没体。\r
- **适用行业**：智慧城市、智慧水利、应急、园区、测绘、国防。\r
- **使用场景**：\r
  - 城市规划中的建筑白模、体块快速生成与分区高度可视化。\r
  - 水利防汛中按水位拉伸的立体淹没水体与蓄滞洪区体量表达。\r
  - 园区/国防中的围墙、电子围栏、立体警戒区域的体块展示。\r
- **注意事项**：\r
  - 相比 Polygon 多了高度/拉伸维度，仅需贴地平面区域时使用 Polygon 更轻量。\r
  - 坐标按"外环+内环(洞)"及多 Part 的层级数组组织，注意嵌套结构与拉伸高度参数。\r
  - 大量体块或高顶点数会增加渲染开销，建议控制数量并简化边界。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Polygon3D对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的3DPolygon | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个3DPolygon对象 | 按 ID 移除指定对象 |\r
| [\`disableClip\`](#disableClip) | 禁止Polygon3D参与剖切 |  |\r
| [\`enableClip\`](#enableClip) | 设置Polygon3D参与剖切 |  |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取3DPolygon的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`glow\`](#glow) | 闪烁 |  |\r
| [\`hide\`](#hide) | 隐藏3DPolygon | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有3DPolygon | 一键隐藏全部对象 |\r
| [\`highlight\`](#highlight) | 高亮，目前仅部分样式支持高亮，和材质有关 |  |\r
| [\`setColor\`](#setColor) | 设置颜色 |  |\r
| [\`setCoordinates\`](#setCoordinates) | 设置坐标 |  |\r
| [\`setDepthTest\`](#setDepthTest) | 设置是否做深度检测 |  |\r
| [\`setHeight\`](#setHeight) | 设置高度 |  |\r
| [\`setIntensity\`](#setIntensity) | 设置亮度 |  |\r
| [\`setStyle\`](#setStyle) | 设置样式 |  |\r
| [\`setTillingX\`](#setTillingX) | 设置TillingX |  |\r
| [\`setTillingY\`](#setTillingY) | 设置TillingY |  |\r
| [\`setViewHeightRange\`](#setViewHeightRange) | 设置Polygon3D对象的可视高度范围 |  |\r
| [\`show\`](#show) | 显示3DPolygon | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有3DPolygon | 一键显示全部对象 |\r
| [\`stopGlow\`](#stopGlow) | 停止闪烁 |  |\r
| [\`unHighlight\`](#unHighlight) | 停止高亮 |  |\r
| [\`update\`](#update) | 修改一个或多个3DPolygon对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Polygon3D对象\r
\r
如何获取自定义材质路径(material)见如下动图：\r
\r
\r
\r
![](/img/refdoc/api/copy_material_path.gif)\r
\r
如何获取自定义材质包含的参数请调用如下方法：\r
\r
let res = await fdapi.misc.getMaterial(material);\r
\r
let params = res.data[0].params;\r
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
| \`coordinates\` | \`array\` | 多边形坐标数组，[取值示例](/docs/tutorials/coordinates) |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`height\` | \`number\` | 3D多边形的高度，取值范围：[任意正数] |\r
| \`intensity\` | \`number\` | 亮度，取值范围：[0~1000] |\r
| \`viewHeightRange\` | \`array\` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |\r
| \`style\` | \`number\` | 3DPolygon的样式，参考 \`Polygon3DStyle\` |\r
| \`tillingX\` | \`number\` | 可选参数，仅当3DPolygon的样式支持贴图显示时，设置贴图横向平铺，取值范围：[任意数值] |\r
| \`tillingY\` | \`number\` | 可选参数，仅当3DPolygon的样式支持贴图显示时，设置贴图纵向平铺，取值范围：[任意数值] |\r
| \`material\` | \`string\` | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |\r
| \`scalarParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |\r
| \`vectorParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |\r
| \`generateTop\` | \`boolean\` | 可选参数，是否生成顶面，默认：true |\r
| \`generateSide\` | \`boolean\` | 可选参数，是否生成侧面，默认：true |\r
| \`generateBottom\` | \`boolean\` | 可选参数，是否生成底面，默认：true |\r
| \`bClip\` | \`boolean\` | 可选参数，是否参与剖切，默认：false |\r
| \`depthTest\` | \`boolean\` | 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡，注意：非半透明材质不支持深度检测 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
polygon3d对象示例\r
\r
 let polygon3d = {\r
        id: 'polygon3d',\r
        coordinates: coordinates,\r
        coordinateType: 0,\r
        color: [1, 1, 1, 1],\r
        height: 50,   \r
        intensity: 1.0,  \r
        style: Polygon3DStyle.WaveTransparent, \r
        tillingX: 0, \r
        tillingY: 0, \r
        material: "/JC_CustomAssets/Material/M_material",\r
        scalarParameters: [{ "name": "U重复", "value":  0.1 }], \r
        vectorParameters: [{ "name": "color", "value": [1,0,0] }],\r
        generateTop: true,\r
        generateSide: true,\r
        generateBottom: true,\r
        bClip: true,\r
        depthTest: true\r
    }\r
\`\`\`\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.polygon3d.clear();\r
////使用Polygon3DStyle样式的polygon3d\r
let o1 = {\r
    id: 'p3d1',\r
    coordinates: [\r
        [489152.96875, 2492427, 0],\r
        [489155.34375, 2492386.75, 0],\r
        [489119.875, 2492387.75, 0],\r
        [489115.375, 2492417.25, 0],\r
    ],\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    color: [1, 0, 1, 1],        //颜色值\r
    height: 10,                //3D多边形的高度\r
    intensity: 1.0,             //亮度\r
    viewHeightRange: [0, 1000], //可见高度范围\r
    style: Polygon3DStyle.SingleColorWithLight, //3DPolygon的样式 请参照API开发文档选取枚举\r
    tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺  \r
    tillingY: 0,  //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺\r
    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_16", //自定义材质路径\r
    scalarParameters: [{ "name": "亮度", "value": 1.0 }],  //材质数值类型参数\r
    vectorParameters: [{ "name": "颜色", "value": [1, 1, 1] }], //材质数组类型参数\r
    generateTop: true, //是否生成顶面\r
    generateSide: true,//是否生成侧面\r
    generateBottom: true,//是否生成底面\r
    bClip: false, //是否支持剖切\r
    depthTest: true //深度检测\r
};\r
\r
//自定义材质的polygon3d\r
let o2 = {\r
    id: 'p3d2',\r
    coordinates: [\r
        [489267.53125, 2492406, 0],\r
        [489264.9375, 2492356.5, 0],\r
        [489235.84375, 2492355.75, 0],\r
        [489227.96875, 2492397.75, 0],\r
    ],\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    color: [1, 0, 0, 1],        //颜色值\r
    height: 20,                //3D多边形的高度\r
    intensity: 1.0,             //亮度\r
    viewHeightRange: [0, 1000], //可见高度范围\r
    style: Polygon3DStyle.SingleColorWithLight, //3DPolygon的样式 请参照API开发文档选取枚举\r
    tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺  \r
    tillingY: 0,  //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺\r
    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_8", //自定义材质路径 使用自定义材质后style相关参数会失效\r
    scalarParameters: [{ "name": "亮度", "value": 1.0 }],  //材质数值类型参数\r
    vectorParameters: [{ "name": "颜色", "value": [1, 1, 1] }], //材质数组类型参数\r
    generateTop: true, //是否生成顶面\r
    generateSide: true,//是否生成侧面\r
    generateBottom: true,//是否生成底面\r
    bClip: false, //是否支持剖切\r
    depthTest: true //深度检测\r
};\r
let p3dArr = [];\r
p3dArr.push(o1);\r
p3dArr.push(o2);\r
await fdapi.polygon3d.add(p3dArr);\r
fdapi.polygon3d.focus('p3d1', 50);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的3DPolygon\r
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
fdapi.polygon3d.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个3DPolygon对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的3DPolygon对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.polygon3d.delete(['p3d1', 'p3d2']);\r
\`\`\`\r
\r
---\r
\r
### \`disableClip(ids, fn)\` {#disableClip}\r
\r
禁止Polygon3D参与剖切\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`number \\| array\` | Polygon3D对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：DisableClip\r
\r
\`\`\`js\r
fdapi.polygon3d.disableClip(['p3d1', 'p3d2']);\r
\`\`\`\r
\r
---\r
\r
### \`enableClip(ids, fn)\` {#enableClip}\r
\r
设置Polygon3D参与剖切\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`number \\| array\` | Polygon3D对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：EnableClip\r
\r
\`\`\`js\r
fdapi.polygon3d.enableClip(['p3d1', 'p3d2']);\r
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
| \`ids\` | \`string \\| array\` | 3DPolygon对象的ID或者ID数组 |\r
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
fdapi.polygon3d.focus('p3d1', 10);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取3DPolygon的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的3DPolygon对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
3DPolygon的详细信息\r
{\r
            "id":	"1",\r
            "groupId":	"",\r
            "style":	10,\r
            "color":	[1.000000, 0.000000, 1.000000, 1.000000],\r
            "height":	500.000000,\r
            "intensity":	4.000000\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.polygon3d.get(['p3d1', 'p3d2']);\r
\`\`\`\r
\r
---\r
\r
### \`glow(data)\` {#glow}\r
\r
闪烁\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polygon3D的ID |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 闪烁的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`duration\` | \`number\` | 闪烁持续时间，单位：秒，取值范围：[0.01~任意正数] |\r
| \`interval\` | \`number\` | 闪烁间隔时间，单位：秒，取值范围：[0.01~任意正数]，注意：间隔时间要小于持续闪烁时间 |\r
\r
**返回：** 无返回值。\r
\r
> 示例：Glow\r
\r
\`\`\`js\r
fdapi.polygon3d.glow([{\r
    id: 'p3d1',\r
    color: [1, 1, 1, 1],\r
    duration: 5, //持续闪烁5秒\r
    interval: 1  //每隔1秒闪烁一次\r
}]);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏3DPolygon\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 3DPolygon对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.polygon3d.hide(['p3d1', 'p3d2']);\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有3DPolygon\r
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
fdapi.polygon3d.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`highlight(ids, fn)\` {#highlight}\r
\r
高亮，目前仅部分样式支持高亮，和材质有关\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polygon3D的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Highlight\r
\r
\`\`\`js\r
//仅部分样式支持高亮闪烁，和材质有关\r
fdapi.polygon3d.highlight('p3d1');\r
\`\`\`\r
\r
---\r
\r
### \`setColor(id, newColor, fn)\` {#setColor}\r
\r
设置颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polygon3D的ID |\r
| \`newColor\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.setColor(id, newColor);\r
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
| \`id\` | \`string\` | Polygon3D的ID |\r
| \`newVal\` | \`array\` | 新坐标值，[取值示例](/docs/tutorials/coordinates) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.setCoordinates(id, newVal);\r
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
| \`id\` | \`any\` | Polygon3D的ID |\r
| \`newVal\` | \`boolean\` | 是否做深度检测 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.setDepthTest(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setHeight(id, newVal, fn)\` {#setHeight}\r
\r
设置高度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polygon3D的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.setHeight(id, newVal);\r
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
| \`id\` | \`string\` | Polygon3D的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.setIntensity(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setStyle(id, newVal, fn)\` {#setStyle}\r
\r
设置样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polygon3D的ID |\r
| \`newVal\` | \`number\` | 新3DPolygon的样式，参考 \`Polygon3DStyle\` |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.setStyle(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setTillingX(id, newVal, fn)\` {#setTillingX}\r
\r
设置TillingX\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polygon3D的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.setTillingX(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setTillingY(id, newVal, fn)\` {#setTillingY}\r
\r
设置TillingY\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polygon3D的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.setTillingY(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setViewHeightRange(id, minViewHeight, maxViewHeight, fn)\` {#setViewHeightRange}\r
\r
设置Polygon3D对象的可视高度范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polygon3D对象的ID |\r
| \`minViewHeight\` | \`number\` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`maxViewHeight\` | \`number\` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetViewHeightRange\r
\r
\`\`\`js\r
fdapi.polygon3d.setViewHeightRange('p3d1', 1, 1000);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示3DPolygon\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 3DPolygon对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.polygon3d.show(['p3d1', 'p3d2']);\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有3DPolygon\r
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
fdapi.polygon3d.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`stopGlow(ids, fn)\` {#stopGlow}\r
\r
停止闪烁\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polygon3D的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：StopGlow\r
\r
\`\`\`js\r
fdapi.polygon3d.stopGlow('p3d1');\r
\`\`\`\r
\r
---\r
\r
### \`unHighlight(ids, fn)\` {#unHighlight}\r
\r
停止高亮\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polygon3D的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon3d.unHighlight(ids);\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个3DPolygon对象\r
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
    id: 'p3d1',\r
    coordinates: [\r
        [489152.96875, 2492427, 0],\r
        [489155.34375, 2492386.75, 0],\r
        [489119.875, 2492387.75, 0],\r
        [489113.8125, 2492454, 0],\r
    ],\r
    color: '#33561A',    //颜色值\r
    height: 20,            //3D多边形的高度\r
    intensity: 10.0,         //亮度\r
    style: 1\r
};\r
await fdapi.polygon3d.update(o);\r
fdapi.polygon3d.focus(o.id);\r
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
await fdapi.polygon3d.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> UnHighlight\r
\r
\`\`\`js\r
fdapi.polygon3d.unHighlight('p3d1');\r
\`\`\`\r
`;export{n as default};
