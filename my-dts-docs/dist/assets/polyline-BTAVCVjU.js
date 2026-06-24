const n=`---\r
title: Polyline\r
sidebar_label: Polyline\r
description: "绘制由多个坐标点连成的折线/路径，支持箭头、光流、贴地、实线/虚线等样式与自定义材质，是表达道路、管线、轨迹、边界等线状要素的基础对象。"\r
---\r
\r
# Polyline\r
\r
绘制由多个坐标点连成的折线/路径，支持箭头、光流、贴地、实线/虚线等样式与自定义材质，是表达道路、管线、轨迹、边界等线状要素的基础对象。\r
\r
\r
\r
![](/img/refdoc/api/Polyline.Update.gif)\r
\r
通过 \`api.polyline\` 访问。\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：绘制由多个坐标点连成的折线/路径，支持箭头、光流、贴地、实线/虚线等多种样式与自定义材质，是表达线状要素（道路、管线、轨迹、边界）的基础对象。\r
- **别名 / 不同行业叫法**：折线、路径、线、管线、道路中心线、轨迹线、河道中心线、巡逻路线、边界线。\r
- **适用行业**：智慧城市、交通、智慧水利、能源、应急、园区、测绘、国防、海洋。\r
- **使用场景**：\r
  - 道路/轨道/河道等线状基础设施的路网与中心线展示。\r
  - 给排水、燃气、电力、热力等市政管线的走向与流向（光流样式）表达。\r
  - 车辆/船舶/人员的历史与实时运动轨迹绘制。\r
- **注意事项**：\r
  - 为贴地/空间折线，若需带粗细体量的三维管道/线缆模型应使用 SplineMesh；若按图层树模型 ID 自动连线表达拓扑请用 TopologyLine。\r
  - 注意 coordinateType 与场景坐标系一致，贴地球面弧线可通过 arcType 控制劣弧/优弧。\r
  - 海量点位或大量折线会影响性能，建议抽稀坐标点并合理设置可视范围 range。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new Polyline()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Polyline对象 | 向场景批量添加对象 |\r
| [\`attachObject\`](#attachObject) | 设置一个或多个Polyline对象的起点和终点跟随对应的模型移动 |  |\r
| [\`clear\`](#clear) | 删除场景中所有的Polyline | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Polyline对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取Polyline的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏Polyline | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有Polyline | 一键隐藏全部对象 |\r
| [\`setBrightness\`](#setBrightness) | 设置新的亮度 |  |\r
| [\`setColor\`](#setColor) | 设置新的颜色值 |  |\r
| [\`setCoordinates\`](#setCoordinates) | 设置坐标值 |  |\r
| [\`setDepthTest\`](#setDepthTest) | 设置是否做深度检测 |  |\r
| [\`setFlowRate\`](#setFlowRate) | 设置新的流速 |  |\r
| [\`setShape\`](#setShape) | 设置shape新的样式 |  |\r
| [\`setStyle\`](#setStyle) | 设置新的样式 |  |\r
| [\`setThickness\`](#setThickness) | 设置新的厚度 |  |\r
| [\`setViewHeightRange\`](#setViewHeightRange) | 设置Polyline对象的可视高度范围， |  |\r
| [\`show\`](#show) | 显示Polyline | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有Polyline | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个Polyline对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Polyline对象\r
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
| \`coordinates\` | \`array\` | 坐标点数组，[取值示例](/docs/tutorials/coordinates) |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`arcType\` | \`number\` | 球面地形下绘制贴地弧线的类型，0：劣弧 1：优弧，默认值：0 |\r
| \`range\` | \`array\` | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |\r
| \`viewHeightRange\` | \`array\` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |\r
| \`thickness\` | \`number\` | 线宽，单位：米，默认值20 |\r
| \`intensity\` | \`number\` | 亮度，取值范围：[0~1000]，默认值：0.5 |\r
| \`flowRate\` | \`number\` | 流速，取值范围：[0~1.0]，默认值：0.5 |\r
| \`depthTest\` | \`boolean\` | 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡 |\r
| \`shape\` | \`number\` | 样式，0：直线， 1：曲线，注意：设置为曲线坐标点多的时候会影响添加添加效率 |\r
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
await fdapi.polyline.delete(['p1', 'p2']);\r
//使用PolylineStyle样式的折线\r
let p1 = {\r
    id: 'p1',//折线唯一标识id\r
    coordinates: [\r
        [493711.15625, 2488656.25, 7.0],\r
        [493698.09375, 2490060.25, 8.4],\r
        [494434.78125, 2490056, 5.4],\r
        [494663.90625, 2491221, 3.8]\r
    ],//构成折线的坐标点数组\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]\r
    viewHeightRange: [0, 10000], //可见高度范围\r
    color: [1, 0, 0, 1],//折线颜色\r
    thickness: 20,//折线宽度\r
    intensity: 1,//亮度\r
    flowRate: 0.5,//流速\r
    shape: 0, //折线类型 0：直线， 1：曲线\r
    depthTest: false,//是否做深度检测 开启后会被地形高度遮挡\r
    style: PolylineStyle.Arrow,//折线样式 参考样式枚举：PolylineStyle\r
    tiling: 0//材质贴图平铺比例\r
};\r
\r
//自定义材质的折线\r
let p2 = {\r
    id: 'p2',//折线唯一标识id\r
    coordinates: [\r
        [493061.53125, 2490053.5, 0.00015624999650754035],\r
        [492508.28125, 2490032.25, 8.7195310592651367],\r
        [492532, 2490584.75, 5.5993747711181641],\r
        [492131.28125, 2490606.25, 9.4026565551757813]\r
\r
    ],//构成折线的坐标点数组\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]\r
    viewHeightRange: [0, 10000], //可见高度范围\r
    color: [0, 1, 0, 0.5],//折线颜色绿色 半透明\r
    thickness: 120,//折线宽度\r
    intensity: 0.1,//亮度\r
    flowRate: 0.5,//流速\r
    shape: 0, //折线类型 0：直线， 1：曲线  注意：设置为曲线非常影响添加效率\r
    depthTest: false,//是否做深度检测 开启后会被地形高度遮挡\r
    style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle\r
    tiling: 0,//材质贴图平铺比例\r
    material: "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_4", //设置后style相关参数会失效 自定义材质路径 可以查询材质包含的参数 \r
    scalarParameters: [\r
        { "name": "亮度1", "value": 0.5 },\r
        { "name": "亮度2", "value": 0.5 },\r
        { "name": "v缩放", "value": 100 },\r
        { "name": "u缩放", "value": 1 },\r
        { "name": "速度", "value": 0.1 },\r
\r
    ],  //材质数值类型参数\r
    vectorParameters: [{ "name": "颜色1", "value": [0, 1, 0] }], //材质数组类型参数\r
};\r
\r
let pArr = [];\r
pArr.push(p1);\r
pArr.push(p2);\r
await fdapi.polyline.add(pArr);\r
fdapi.polyline.focus(p1.id, 50);\r
\`\`\`\r
\r
---\r
\r
### \`attachObject(data, fn)\` {#attachObject}\r
\r
设置一个或多个Polyline对象的起点和终点跟随对应的模型移动\r
\r
注意：设置贴合后只有Polyline的起点和终点会跟随相应的模型一起平滑移动，支持的对象类型：Satellite\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | Polyline对象id和模型对象Id的数据映射对象数组，可以是Object类型或者Array类型，对于每一个映射对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`polylineId\` | \`string\` | Polyline对象ID |\r
| \`startObjectId\` | \`string\` | Polyline起点跟随移动对应的模型ID |\r
| \`endObjectId\` | \`string\` | Polyline终点跟随移动对应的模型ID |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
示例代码：\r
\r
fdapi.polyline.attachObject([\r
            {\r
                polylineId: "line1",\r
                startObjectId: "satellite1",\r
                endObjectId: "satellite2"\r
            },\r
            {\r
                polylineId: "line2",\r
                startObjectId: "satellite2",\r
                endObjectId: "satellite3"\r
            },\r
      ]);\r
\`\`\`\r
\r
> 示例：AttachObject\r
\r
\`\`\`js\r
//折线的起点和终点贴合模型移动\r
fdapi.polyline.attachObject([\r
    {\r
        polylineId: "line1",\r
        startObjectId: "satellite1",\r
        endObjectId: "satellite2"\r
    },\r
    {\r
        polylineId: "line2",\r
        startObjectId: "satellite2",\r
        endObjectId: "satellite3"\r
    },\r
]);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的Polyline\r
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
fdapi.polyline.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Polyline对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Polyline对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.polyline.delete('p1');\r
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
| \`ids\` | \`string \\| array\` | Polyline对象的ID或者ID数组 |\r
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
fdapi.polyline.focus('p1', 880, 1);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Polyline的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Polyline对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
Polyline的详细信息\r
{\r
            "id":	"p1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "coordinates":	[[493711.156250, 2488656.250000, 7.000000], [493698.093750, 2490060.250000, 8.400000], [494434.781250, 2490056.000000, 5.400000], [494663.906250, 2491221.000000, 3.800000]],\r
            "shape":	0,\r
            "style":	0,\r
            "thickness":	150.000000,\r
            "color":	[1.000000, 0.000000, 0.000000, 1.000000],\r
            "flowRate":	0.500000,\r
            "brightness":	0.800000,\r
            "tiling":	0.000000,\r
            "depthTest":	0\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.polyline.get('p1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏Polyline\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polyline对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.polyline.hide('p1');\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有Polyline\r
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
fdapi.polyline.hideAll();\r
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
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置新的亮度：SetBrightness\r
\r
\`\`\`js\r
fdapi.polyline.setBrightness("p1", 2);\r
\`\`\`\r
\r
---\r
\r
### \`setColor(id, newVal, fn)\` {#setColor}\r
\r
设置新的颜色值\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置新的颜色值：SetColor\r
\r
\`\`\`js\r
fdapi.polyline.setColor("p1", [0, 1, 0, 0.5]);\r
\`\`\`\r
\r
---\r
\r
### \`setCoordinates(id, newVal, fn)\` {#setCoordinates}\r
\r
设置坐标值\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`array\` | 新坐标值，[取值示例](/docs/tutorials/coordinates) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置坐标值：SetCoordinates\r
\r
\`\`\`js\r
fdapi.polyline.setCoordinates("p1", [\r
    [493711.15625, 2488656.25, 7.0],\r
    [493698.09375, 2490060.25, 8.4],\r
    [494152.4375, 2489572, 6.9823436737060547],\r
    [494434.78125, 2490056, 5.4],\r
    [494663.90625, 2491221, 3.8]\r
]);\r
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
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`boolean\` | 是否做深度检测 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置是否做深度检测：SetDepthTest\r
\r
\`\`\`js\r
//true会被地形遮挡\r
fdapi.polyline.setDepthTest("p1", false);\r
\`\`\`\r
\r
---\r
\r
### \`setFlowRate(id, newVal, fn)\` {#setFlowRate}\r
\r
设置新的流速\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置新的流速：SetFlowRate\r
\r
\`\`\`js\r
fdapi.polyline.setFlowRate("p1", 2);\r
\`\`\`\r
\r
---\r
\r
### \`setShape(id, newVal, fn)\` {#setShape}\r
\r
设置shape新的样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值， 0： 直线， 1： 曲线 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置新的形状：SetShape\r
\r
\`\`\`js\r
fdapi.polyline.setShape("p1", 1);\r
\`\`\`\r
\r
---\r
\r
### \`setStyle(id, newVal, fn)\` {#setStyle}\r
\r
设置新的样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | PolylineStyle新样式，取值范围：[0~5]，参考 \`PolylineStyle\` |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置新的样式：SetStyle\r
\r
\`\`\`js\r
//参考折线样式枚举PolylineStyle\r
fdapi.polyline.setStyle("p1", PolylineStyle.Arrow);\r
\`\`\`\r
\r
---\r
\r
### \`setThickness(id, newVal, fn)\` {#setThickness}\r
\r
设置新的厚度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置新的厚度：SetThickness\r
\r
\`\`\`js\r
fdapi.polyline.setThickness("p1", 60);\r
\`\`\`\r
\r
---\r
\r
### \`setViewHeightRange(id, minViewHeight, maxViewHeight, fn)\` {#setViewHeightRange}\r
\r
设置Polyline对象的可视高度范围，注意：当Polyline对象使用贴地模式时，此方法会失效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Polyline对象的ID |\r
| \`minViewHeight\` | \`number\` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`maxViewHeight\` | \`number\` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置可视高度范围：SetViewHeightRange\r
\r
\`\`\`js\r
fdapi.polyline.setViewHeightRange("p1", 0, 1000);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示Polyline\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Polyline对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.polyline.show('p1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有Polyline\r
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
fdapi.polyline.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Polyline对象\r
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
fdapi.polyline.updateBegin();\r
fdapi.polyline.setStyle('p1', PolylineStyle.Arrow);//折线样式\r
fdapi.polyline.setColor('p1', Color.Yellow);\r
fdapi.polyline.setThickness('p1', 10);\r
fdapi.polyline.setBrightness('p1', 0.5);\r
fdapi.polyline.setFlowRate('p1', 0.8);\r
fdapi.polyline.setDepthTest('p1', true);//深度检测 会被地面高度遮挡\r
fdapi.polyline.updateEnd();\r
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
await fdapi.polyline.updateEnd();\r
\`\`\`\r
`;export{n as default};
