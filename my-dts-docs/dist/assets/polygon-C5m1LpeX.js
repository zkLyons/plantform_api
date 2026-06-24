const n=`---\r
title: Polygon\r
sidebar_label: Polygon\r
description: "绘制贴地的二维多边形面，用于表达区域、地块与范围，支持多边形带洞（孔洞）及多 Part 复合多边形，可填充颜色表达分区属性。"\r
---\r
\r
# Polygon\r
\r
Polygon 相关的操作， 通过api.polygon调用其方法\r
\r
\r
\r
![](/img/refdoc/api/Polugon.Update.gif)\r
\r
**下面Example代码的运行效果图：**\r
\r
1. 最简单的Polygon\r
\r
\`\`\`js\r
let coords1 = [[872.16, -9485.86, 5.8], [864.77, -9196.58, 5.7], [624.34, -9209.29, 6.05], [482.58, -9373.57, 7.38]];\r
\`\`\`\r
\r
![](/img/refdoc/api/Polygon1.png)\r
\r
2. 带2个洞的Polygon\r
\r
\`\`\`js\r
let coords2 = [\r
        [[9665.22, -11366.88, 5.7], [9765.4, -4511.22, 5.7], [4155.2, -4036.94, 5.7], [3098, -11010.32, 5.7], [6445.79, -12717.28, 6.78]],\r
        [[8706.9, -9457.89, 5.7], [8824.84, -8055.4, 6.64], [7619.37, -8859.47, 6.72]],\r
        [[5744.8, -7795.59, 5.7], [6205.21, -5724.74, 5.7], [4460.01, -5839.38, 6.05], [3966.28, -7712.46, 7.17]]\r
    ];\r
\`\`\`\r
\r
![](/img/refdoc/api/Polygon2.png)\r
\r
3. 2个Part的Polygon，每个Polygon有一个或多个洞\r
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
![](/img/refdoc/api/Polygon3.png)\r
\r
通过 \`api.polygon\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：绘制贴地的二维多边形面，用于表达区域、地块与范围，支持多边形带洞（孔洞）及多 Part 复合多边形，可填充颜色表达分区属性。\r
- **别名 / 不同行业叫法**：面、区域、地块、红线范围、宗地、辖区、淹没范围、责任区、网格面。\r
- **适用行业**：智慧城市、智慧水利、应急、测绘、园区、国防、交通。\r
- **使用场景**：\r
  - 行政区划、网格化管理单元、园区分区等区域边界与属性着色。\r
  - 水利淹没范围、应急受灾区域/警戒区、防汛责任区的范围标绘。\r
  - 规划用地红线、宗地地块、用地性质分类的面状展示。\r
- **注意事项**：\r
  - 多边形支持带洞与多 Part 结构，坐标按"外环+内环(洞)"、"多 Part"的层级数组组织，注意嵌套层数正确。\r
  - 为贴地二维面，表达有高度的立体体块（如建筑、围墙、淹没水体）应使用 Polygon3D。\r
  - 顶点数量过多或多边形数量庞大时注意性能，建议简化边界点位。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Polygon对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的Polygon | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Polygon对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取Polygon的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`glow\`](#glow) | 闪烁 |  |\r
| [\`hide\`](#hide) | 隐藏Polygon | 按业务条件隐藏对象 |\r
| [\`highlight\`](#highlight) | 高亮 |  |\r
| [\`setColor\`](#setColor) | 设置颜色 |  |\r
| [\`setCoordinates\`](#setCoordinates) | 设置坐标 |  |\r
| [\`setDepthTest\`](#setDepthTest) | 设置是否做深度检测 |  |\r
| [\`setViewHeightRange\`](#setViewHeightRange) | 设置Polygon对象的可视高度范围， |  |\r
| [\`show\`](#show) | 显示Polygon | 按业务条件显示对象 |\r
| [\`unHighlight\`](#unHighlight) | 停止高亮 |  |\r
| [\`update\`](#update) | 修改一个或多个Polygon对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Polygon对象\r
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
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`coordinates\` | \`array\` | 多边形坐标数组，[取值示例](/docs/tutorials/coordinates) |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`arcType\` | \`number\` | 球面地形下绘制多边形贴地弧线的类型，0：劣弧 1：优弧，默认值：0 |\r
| \`range\` | \`array\` | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |\r
| \`viewHeightRange\` | \`array\` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |\r
| \`priority\` | \`number\` | 设置Polygon显示的优先级，值越大越靠上，取值范围：[-1000,1000] |\r
| \`frameColor\` | [\`Color\`](/docs/api/types#color) | 边框颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`frameThickness\` | \`number\` | 边框厚度，单位：米。（当frameThickness设置为0的时候，不创建轮廓） |\r
| \`depthTest\` | \`boolean\` | 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡 |\r
| \`intensity\` | \`number\` | 亮度，取值范围：[0~1000]，注：目前仅单色模式下生效[style:PolygonStyle.SingleColor] |\r
| \`style\` | [\`PolygonStyle\`](/docs/api/types#polygonstyle) | (\`PolygonStyle\`) 多边形样式，单色/圆点/体积/渐变/波纹/贴地等，取值范围：[0~10]，详情参考 \`PolygonStyle\`，注意：如果设置贴地模式，有环的polygon对象内环方向需要与外环方向相反，否则贴地时内环会不显示 |\r
| \`gradualWidth\` | \`number\` | 多边形填充的透明度渐变的间隔宽度，单位：米，默认值：10，注意：此参数仅当style样式设置为AlphaGradualBorder时生效 |\r
| \`outerAlpha\` | \`number\` | 多边形填充的透明度渐变的起始值，取值范围：[0~1]，默认值：0.3，注意：此参数仅当style样式设置为AlphaGradualBorder时生效 |\r
| \`innerAlpha\` | \`number\` | 多边形填充的透明度渐变的结束值，取值范围：[0~1]，默认值：1，注意：此参数仅当style样式设置为AlphaGradualBorder时生效 |\r
| \`material\` | \`string\` | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |\r
| \`scalarParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |\r
| \`vectorParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.polygon.clear();\r
//使用PolygonStyle样式的面\r
let p1 = {\r
    id: 'polygon1',\r
    coordinates: [[488545.9375, 2491134.5, 1.0], [488235.9375, 2490811.5, 1.0], [487774.5625, 2491299.25, 1.0], [488081.59375, 2491625.5, 1.0]],\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]\r
    viewHeightRange: [0, 10000], //可见高度范围\r
    color: [0, 0, 1, 0.8],//多边形的填充颜色\r
    frameColor: Color.Red,//边框颜色\r
    frameThickness: 5,//边框厚度\r
    intensity: 1, //亮度\r
    style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举\r
    depthTest: false, //是否做深度检测 开启后会被地形高度遮挡\r
    priority: 1 //叠加显示的优先级 值越大显示越靠上\r
};\r
\r
\r
//自定义材质的面\r
let p2 = {\r
    id: 'polygon2',\r
    coordinates: [\r
        [487716.1875, 2490398.75, -0.14265625178813934],\r
        [487608.46875, 2490988, -0.65734374523162842],\r
        [486995.9375, 2490574.5, -1.7621874809265137]\r
    ],\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]\r
    viewHeightRange: [0, 10000], //可见高度范围\r
    color: [0, 0, 1, 1],//多边形的填充颜色\r
    frameColor: Color.Red,//边框颜色\r
    frameThickness: 5,//边框厚度\r
    intensity: 0.5, //亮度\r
    style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举\r
    depthTest: false, //是否做深度检测 开启后会被地形高度遮挡\r
    priority: 2, //叠加显示的优先级 值越大显示越靠上\r
    material: "/JC_CustomAssets/PolygonLibrary/Exhibition/平面_5", //自定义材质路径 设置后style相关参数会失效\r
    scalarParameters: [{ "name": "亮度", "value": 0.5 }],  //材质数值类型参数\r
    vectorParameters: [{ "name": "颜色", "value": [0, 1, 0] }], //材质数组类型参数\r
};\r
\r
let pArr = [];\r
pArr.push(p1);\r
pArr.push(p2);\r
await fdapi.polygon.add(pArr);\r
fdapi.polygon.focus('polygon2', 10);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的Polygon\r
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
fdapi.polygon.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Polygon对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Polygon对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
let ids = ['polygon1', 'polygon2'];\r
fdapi.polygon.delete(ids);\r
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
| \`ids\` | \`string \\| array\` | Polygon对象的ID或者ID数组 |\r
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
fdapi.polygon.focus('polygon1', 100, 1);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Polygon的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Polygon对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
Polygon的详细信息\r
{\r
            "id":	"polygon1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "depthTest":	0,\r
            "color":	[0.000000, 0.000000, 1.000000, 1.000000],\r
            "style":	0,\r
            "brightness":	1.000000\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.polygon.get(['polygon1', 'polygon2']);\r
\`\`\`\r
\r
---\r
\r
### \`glow(ids, duration, fn)\` {#glow}\r
\r
闪烁\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polygon的ID或者ID数组 |\r
| \`duration\` | \`any\` | 闪烁持续时间，取值说明，-1一直闪烁 0永不闪烁 &gt;0按指定时间间隔闪烁，单位秒 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon.glow(ids, duration);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏Polygon\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polygon对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
let ids = ['polygon1', 'polygon2'];\r
fdapi.polygon.hide(ids);\r
\`\`\`\r
\r
---\r
\r
### \`highlight(ids, fn)\` {#highlight}\r
\r
高亮\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polygon的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Highlight\r
\r
\`\`\`js\r
let ids = ['polygon1', 'polygon2'];\r
fdapi.polygon.highlight(ids);\r
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
| \`id\` | \`string\` | Polygon的ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon.setColor(id, newVal);\r
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
| \`id\` | \`string\` | Polygon的ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon.setCoordinates(id, newVal);\r
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
| \`id\` | \`any\` | Polygon的ID |\r
| \`newVal\` | \`boolean\` | 是否做深度检测 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon.setDepthTest(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setViewHeightRange(id, minViewHeight, maxViewHeight, fn)\` {#setViewHeightRange}\r
\r
设置Polygon对象的可视高度范围，注意：当Polygon对象使用贴地模式时，此方法会失效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polygon对象的ID |\r
| \`minViewHeight\` | \`number\` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`maxViewHeight\` | \`number\` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetViewHeightRange\r
\r
\`\`\`js\r
fdapi.polygon.setViewHeightRange('polygon1', 0, 1000);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示Polygon\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polygon对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
let ids = ['polygon1', 'polygon2'];\r
fdapi.polygon.show(ids);\r
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
| \`ids\` | \`string \\| array\` | Polygon的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.polygon.unHighlight(ids);\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Polygon对象\r
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
    id: 'polygon1',\r
    coordinates: [\r
        [[488545.9375, 2491134.5, 1.0], [488235.9375, 2490811.5, 1.0], [487774.5625, 2491299.25, 1.0], [488081.59375, 2491625.5, 1.0]],\r
        [[488248.65625, 2491142.25, 1], [488215.46875, 2491330.25, 1], [488057.71875, 2491184.25, 1]]\r
    ],\r
    color: Color.Green,\r
    intensity: 0.5,\r
    depthTest: true\r
};\r
await fdapi.polygon.update(o);\r
fdapi.polygon.focus('polygon1', 200, 1);\r
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
await fdapi.polygon.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> UnHighlight\r
\r
\`\`\`js\r
let ids = ['polygon1', 'polygon2'];\r
fdapi.polygon.unHighlight(ids);\r
\`\`\`\r
`;export{n as default};
