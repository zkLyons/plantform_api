const n=`---\r
title: ODLine\r
sidebar_label: ODLine\r
description: "以起点(O)到终点(D)的弧线表达两点间的流向与流量关系，支持弯曲度、流速、亮度等参数，常用大量 OD 线表现迁徙、流动与关联强度。"\r
---\r
\r
# ODLine\r
\r
以起点(O)到终点(D)的弧线表达两点间的流向与流量关系，支持弯曲度、流速、亮度等参数，常用大量 OD 线表现迁徙、流动与关联强度。\r
\r
\r
\r
![](/img/refdoc/api/odline.gif)\r
\r
\r
\r
迁徙线样式参数示例\r
\r
\r
\r
![](/img/refdoc/api/ODLine.png)\r
\r
通过 \`api.odline\` 访问。\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：以起点(O)到终点(D)的弧线表达两点之间的流向与流量关系，支持弯曲度、流速、亮度等参数，常用大量 OD 线表现迁徙、流动与关联强度。\r
- **别名 / 不同行业叫法**：OD线、迁徙线、流向线、流量线、起讫线、关系线。\r
- **适用行业**：智慧城市、交通、应急、园区、能源、海洋。\r
- **使用场景**：\r
  - 人口迁徙、客流/车流的起讫分析与城市间迁徙可视化。\r
  - 物流、资金、能源调度等起点到终点的流量与流向展示。\r
  - 通信/网络访问关系、设备间数据流向的关联表达。\r
- **注意事项**：\r
  - 每条 ODLine 的 coordinates 仅含起点与终点 2 个坐标，多段路径请用 Polyline。\r
  - 大批量 OD 线（如全国迁徙）数据量大，建议按权重过滤或聚合后绘制以保证性能。\r
  - 通过 bendDegree 弯曲度区分往返方向，避免双向线重叠混淆。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new ODLine()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个ODLine对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的ODLine | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个ODLine对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取ODLine的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏ODLine | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有ODLine | 一键隐藏全部对象 |\r
| [\`setBendDegree\`](#setBendDegree) | 设置新的弯曲度 |  |\r
| [\`setBrightness\`](#setBrightness) | 设置新的亮度 |  |\r
| [\`setColor\`](#setColor) | 设置新的颜色值 |  |\r
| [\`setCoordinates\`](#setCoordinates) | 设置坐标值 |  |\r
| [\`setEndLabelShape\`](#setEndLabelShape) | 设置EndLabel样式 |  |\r
| [\`setEndPointShape\`](#setEndPointShape) | 设置EndPoint样式 |  |\r
| [\`setflowPointSizeScale\`](#setflowPointSizeScale) | 设置运动点的缩放 |  |\r
| [\`setFlowRate\`](#setFlowRate) | 设置新的流速 |  |\r
| [\`setFlowShape\`](#setFlowShape) | 设置ODLine发光点样式 |  |\r
| [\`setLabelSizeScale\`](#setLabelSizeScale) | 设置两端点的缩放值 |  |\r
| [\`setLineShape\`](#setLineShape) | 设置ODLine模型样式 |  |\r
| [\`setLineStyle\`](#setLineStyle) | 设置ODLine材质样式 |  |\r
| [\`setLineThickness\`](#setLineThickness) | 设置线的厚度 |  |\r
| [\`setStartLabelShape\`](#setStartLabelShape) | 设置StartLabel样式 |  |\r
| [\`setStartPointShape\`](#setStartPointShape) | 设置StartPoint样式 |  |\r
| [\`setTiling\`](#setTiling) | 设置材质贴图平铺 |  |\r
| [\`show\`](#show) | 显示ODLine | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有ODLine | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个ODLine对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个ODLine对象\r
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
| \`coordinates\` | \`array\` | 坐标点数组，只有2个元素，第1个元素是起点坐标，第2个元素是终点坐标 |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`flowRate\` | \`number\` | 流速，取值范围：[0~1.0]，默认值：0.5 |\r
| \`intensity\` | \`number\` | 亮度，取值范围：[0.1~1000]，默认值：0.5 |\r
| \`bendDegree\` | \`number\` | 弯曲度，取值范围：[0~1.0]，默认值：0.5 |\r
| \`tiling\` | \`number\` | 材质贴图平铺比例，从起始位置开始平铺，超过的部分会按此比例生成新的区域，类似CSS的repeat。如果这个值 &lt;= 0 使用自动计算按Polyline长度比例平铺， &gt;0使用用户输入的值去平铺 |\r
| \`lineThickness\` | \`number\` | 线宽，单位：米，默认值20 |\r
| \`flowPointSizeScale\` | \`number\` | 运动点的缩放值，默认值20， 单位米 |\r
| \`labelSizeScale\` | \`number\` | 两端点的缩放值，默认值100， 单位米 |\r
| \`lineShape\` | \`number\` | ODLine模型样式 0:平面 1:柱体，默认值1 |\r
| \`lineStyle\` | \`number\` | ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1） |\r
| \`flowShape\` | \`number\` | ODLine发光点样式 0:无 1:球体，默认值0（Shape为0即删除/隐藏，当Shape为0时设置Style无效） |\r
| \`startPointShape\` | \`number\` | StartPoint样式， default 0 ( 0 : None 1 : Sphere ) |\r
| \`endPointShape\` | \`number\` | EndPoint样式， default 0 ( 0 : None 1 : Sphere ) |\r
| \`startLabelShape\` | \`number\` | StartLabel样式， default 0 ( 0 : None 1 : Circle ) |\r
| \`endLabelShape\` | \`number\` | EndLabel样式， default 0 ( 0 : None 1 : Circle ) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
//开启黑暗模式 调整时间\r
fdapi.weather.setDarkMode(true);\r
fdapi.weather.setDateTime(2025, 5, 13, 7, 18, false);\r
\r
//降低场景亮度\r
let style = 0; //样式， 0：默认；1：X光；2：纯色；3：水晶体\r
//以下四个属性仅在默认样式0下生效\r
let saturation = 0.1;//饱和度\r
let brightness = 0.1;//亮度\r
let contrast = 1;//对比度\r
let contrastBase = 0.18;//对比度基准\r
fdapi.tileLayer.setStyle("E637D8FE42335EE96C58A1840BCAD0CE", style, Color.White, saturation, brightness, contrast, contrastBase);\r
\r
fdapi.odline.clear();\r
let od1 = {\r
    id: 'od1',//ODLine唯一标识\r
    color: [0, 1, 0, 1],//填充颜色  \r
    coordinates: [[492303.65625, 2487534.5, 4.195], [490960.8075, 2490754.4, 5.26578125]],//构成ODLine的坐标点数组\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    flowRate: 0.5,//流速\r
    intensity: 10,//亮度\r
    bendDegree: 0.5,//弯曲度\r
    tiling: 100000,//材质贴图平铺比例\r
    lineThickness: 60,//折线宽度\r
    flowPointSizeScale: 80,//运动点的缩放值\r
    labelSizeScale: 1000,//两端点的缩放值\r
\r
    lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1\r
    lineStyle: 2,  //ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1）\r
    flowShape: 1,  //ODLine发光点样式 0:无 1:球体，默认值0\r
\r
    startPointShape: 2,//点的样式\r
    endPointShape: 1,//点的样式\r
    startLabelShape: 1,//点的样式\r
    endLabelShape: 1//点的样式\r
};\r
\r
let od2 = {\r
    id: 'od2',//ODLine唯一标识\r
    color: [1, 1, 0, 1],//填充颜色 \r
    coordinates: [\r
        [494192.193125, 2491025.2800000003, 0.304375],\r
        [491403.55, 2491384.96, 9.85701171875]\r
    ],//构成ODLine的坐标点数组\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    flowRate: 1,//流速\r
    intensity: 6,//亮度\r
    bendDegree: 0.5,//弯曲度\r
    tiling: 10,//材质贴图平铺比例\r
    lineThickness: 60,//折线宽度\r
    flowPointSizeScale: 80,//运动点的缩放值\r
    labelSizeScale: 1000,//两端点的缩放值\r
\r
    lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1\r
    lineStyle: 3,  //ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1）\r
    flowShape: 0,  //ODLine发光点样式 0:无 1:球体，默认值0\r
\r
    startPointShape: 2,//点的样式\r
    endPointShape: 1,//点的样式\r
    startLabelShape: 1,//点的样式\r
    endLabelShape: 1//点的样式\r
};\r
await fdapi.odline.add([od1, od2]);\r
fdapi.odline.focus(od1.id);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的ODLine\r
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
fdapi.odline.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个ODLine对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的ODLine对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.odline.delete('od1');\r
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
| \`ids\` | \`string \\| array\` | ODLine对象的ID或者ID数组 |\r
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
fdapi.odline.focus('od1', 600, 1);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取ODLine的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的ODLine对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
ODLine的详细信息\r
{\r
            "id":	"od1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "coordinates":	[[492303.656250, 2487534.500000, 4.195000], [491391.562500, 2487777.500000, 4.200000]],\r
            "color":	[0.000000, 0.500000, 0.000000, 1.000000],\r
            "flowRate":	1.000000,\r
            "Brightness":	1.000000,\r
            "bendDegree":	0.500000,\r
            "tiling":	0.500000,\r
            "lineThickness":	15.000000,\r
            "flowSizeScale":	30.000000,\r
            "labelSizeScale":	1000.000000,\r
            "lineShape":	1,\r
            "lineStyle":	0,\r
            "flowShape":	1,\r
            "flowStyle":	0,\r
            "startPointShape":	1,\r
            "startPointStyle":	0,\r
            "endPointShape":	1,\r
            "endPointStyle":	0,\r
            "startLabelShape":	1,\r
            "startLabelStyle":	0,\r
            "endLabelShape":	1,\r
            "endLabelStyle":	0\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.odline.get('od1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏ODLine\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | ODLine对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.odline.hide('od1');\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有ODLine\r
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
fdapi.odline.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`setBendDegree(id, newVal, fn)\` {#setBendDegree}\r
\r
设置新的弯曲度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setBendDegree(id, newVal);\r
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
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setBrightness(id, newVal);\r
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
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setColor(id, newVal);\r
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
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setCoordinates(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setEndLabelShape(id, newVal, fn)\` {#setEndLabelShape}\r
\r
设置EndLabel样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setEndLabelShape(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setEndPointShape(id, newVal, fn)\` {#setEndPointShape}\r
\r
设置EndPoint样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setEndPointShape(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setflowPointSizeScale(id, newVal, fn)\` {#setflowPointSizeScale}\r
\r
设置运动点的缩放\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setflowPointSizeScale(id, newVal);\r
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
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setFlowRate(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setFlowShape(id, newVal, fn)\` {#setFlowShape}\r
\r
设置ODLine发光点样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setFlowShape(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setLabelSizeScale(id, newVal, fn)\` {#setLabelSizeScale}\r
\r
设置两端点的缩放值\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setLabelSizeScale(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setLineShape(id, newVal, fn)\` {#setLineShape}\r
\r
设置ODLine模型样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setLineShape(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setLineStyle(id, newVal, fn)\` {#setLineStyle}\r
\r
设置ODLine材质样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setLineStyle(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setLineThickness(id, newVal, fn)\` {#setLineThickness}\r
\r
设置线的厚度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setLineThickness(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setStartLabelShape(id, newVal, fn)\` {#setStartLabelShape}\r
\r
设置StartLabel样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setStartLabelShape(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setStartPointShape(id, newVal, fn)\` {#setStartPointShape}\r
\r
设置StartPoint样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setStartPointShape(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setTiling(id, newVal, fn)\` {#setTiling}\r
\r
设置材质贴图平铺\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.odline.setTiling(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示ODLine\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | ODLine对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.odline.show('od1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有ODLine\r
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
fdapi.odline.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个ODLine对象\r
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
    id: 'od1',\r
    color: [1, 1, 1, 1],\r
};\r
await fdapi.odline.update(o);\r
fdapi.odline.focus(o.id);\r
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
await fdapi.odline.updateEnd();\r
\`\`\`\r
`;export{n as default};
