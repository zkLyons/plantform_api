const n=`---\r
title: GuideLine\r
sidebar_label: GuideLine\r
description: "在三维场景中绘制带流动动画的引导线，用于指示路径、动线与流向，支持直线/曲线样式、宽度与速度，常用于强调移动轨迹与导览路线。"\r
---\r
\r
# GuideLine\r
\r
在三维场景中绘制带流动动画的引导线，用于指示路径、动线与流向，支持直线/曲线样式、宽度与速度，常用于强调移动轨迹与导览路线。\r
\r
通过 \`api.guideLine\` 访问。\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：在三维场景中绘制带流动动画的引导线，用于指示路径、动线与流向，支持直线/曲线样式、宽度、速度等参数，常用于强调人/车/物的移动轨迹与导览路线。\r
- **别名 / 不同行业叫法**：导览线、引导线、路线、动线、参观路线、疏散路线。\r
- **适用行业**：智慧园区、智慧城市、交通、应急、智慧水利、文旅展馆。\r
- **使用场景**：\r
  - 园区/展馆参观导览，沿预设路线播放流动引导动画指引游客行进方向。\r
  - 应急疏散演练中可视化逃生路线与人员疏散动线。\r
  - 交通枢纽、停车场内的车行/人行引导，展示进出场动线与流向。\r
- **注意事项**：\r
  - shape 设为曲线（1）时坐标点过多会显著影响添加效率，长路径建议适度精简点位。\r
  - 注意 coordinateType 与场景坐标系一致（Projection/WGS84/GCJ02/BD09），避免引导线偏移。\r
  - 引导线偏重视觉指示与动画，若需表达管线/拓扑连接关系应改用 Polyline、SplineMesh 或 TopologyLine。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new GuideLine()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个GuideLine对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 清空场景中所有的GuideLine | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个GuideLine对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取GuideLine的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏GuideLine | 按业务条件隐藏对象 |\r
| [\`setCoordinates\`](#setCoordinates) | 设置坐标值 |  |\r
| [\`setDepthTest\`](#setDepthTest) | 设置是否做深度检测 |  |\r
| [\`setGuideSize\`](#setGuideSize) | 设置新的引导对象大小 |  |\r
| [\`setInterval\`](#setInterval) | 设置新的播放时间间隔 |  |\r
| [\`setRange\`](#setRange) | 设置GuideLine对象的可视范围 |  |\r
| [\`setShape\`](#setShape) | 设置新的shape样式 |  |\r
| [\`setSpeed\`](#setSpeed) | 设置新的速率 |  |\r
| [\`setWidth\`](#setWidth) | 设置新的宽度 |  |\r
| [\`show\`](#show) | 显示GuideLine | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个GuideLine对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个GuideLine对象\r
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
| \`coordinates\` | \`array\` | 坐标点数组，[取值示例](/docs/tutorials/coordinates) |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`range\` | \`array\` | 可视范围: [近裁距离, 远裁距离]，近裁/远裁取值范围: [0, 2000000]，默认值：[0, 1000000]， |\r
| \`depthTest\` | \`boolean\` | 是否做深度检测，true会被遮挡，false不会被遮挡，默认值：true |\r
| \`shape\` | \`number\` | 引导线样式，取值范围：[0,1]，0：直线， 1：曲线，默认值：0，注意：设置为曲线坐标点多的时候会影响添加添加效率 |\r
| \`width\` | \`number\` | 引导线宽度，单位：米，取值范围：[0~1000000]，默认值：30 |\r
| \`guideSize\` | \`number\` | 引导线动画对象的尺寸，单位：米，取值范围：[0~1000000]，默认值：30 |\r
| \`speed\` | \`number\` | 引导线动画播放的速率，单位：米/秒，取值范围：[0~100]，默认值：10 |\r
| \`interval\` | \`number\` | 引导动画播放的时间间隔，单位：秒，取值范围：[-1~20],默认值：-1，不循环播放 |\r
| \`style\` | \`object\` | 引导线包含的起点、终点和折线的样式，结构如下： |\r
| \`style.startPoint\` | \`object\` | 起点样式对象，支持以下属性： |\r
| \`style.material\` | \`string\` | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后材质默认参数会失效 |\r
| \`style.scalarParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |\r
| \`style.name\` | \`string\` | 材质包含的数值参数名称 |\r
| \`style.value\` | \`number\` | 材质包含的数值参数名称对应的数值 |\r
| \`style.vectorParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数组类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |\r
| \`style.name\` | \`string\` | 材质包含的数组参数名称 |\r
| \`style.value\` | \`array\` | 材质包含的数组参数名称对应的数组值，一般是颜色数组：[r, g, b, a] |\r
| \`style.polyline\` | \`object\` | 起点样式对象，支持以下属性： |\r
| \`style.material\` | \`string\` | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后默认材质参数会失效 |\r
| \`style.endPoint\` | \`object\` | 起点样式对象，支持以下属性： |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
GuideLine对象结构参考代码：\r
\r
{\r
            "id": "g1",\r
            "coordinates": [\r
                [\r
                    493210.2025,\r
                    2488496.863125,\r
                    -0.0026171875\r
                ],\r
                [\r
                    493173.76,\r
                    2488761.5340625,\r
                    -0.00078125\r
                ],\r
                [\r
                    493387.823125,\r
                    2488773.4715625,\r
                    -0.0198046875\r
                ],\r
                [\r
                    493347.726875,\r
                    2489081.4201562502,\r
                    -0.0143359375\r
                ],\r
                [\r
                    493138.6775,\r
                    2489075.9435937502,\r
                    -0.000078125\r
                ]\r
            ],\r
            "depthTest": false,\r
            "range": [\r
                0,\r
                100000\r
            ],\r
            "width": 1,\r
            "guideSize": 1,\r
            "speed": 20,\r
            "shape": 0,\r
            "interval": 1,\r
            "style": {\r
                "startPoint": {\r
                    "material": "/JC_CustomAssets/PolylineLibrary/GuideExhibition/空",\r
\r
                },\r
                "endPoint": {\r
                    "material": "/JC_CustomAssets/PolylineLibrary/GuideExhibition/空",\r
\r
                },\r
                "polyline": {\r
                    "material": "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_9",\r
                    "scalarParameters": [\r
                        {\r
                            "name": "不透明度",\r
                            "value": 0.5\r
                        },\r
                        {\r
                            "name": "亮度1",\r
                            "value": 10\r
                        },\r
                        {\r
                            "name": "亮度2",\r
                            "value": 1\r
                        }\r
                    ],\r
                    "vectorParameters": [\r
                        {\r
                            "name": "颜色1",\r
                            "value": [\r
                                0,\r
                                0.269323,\r
                                0.53125,\r
                                1\r
                            ]\r
                        },\r
                        {\r
                            "name": "颜色2",\r
                            "value": [\r
                                0,\r
                                0.142583,\r
                                0.28125,\r
                                1\r
                            ]\r
                        }\r
                    ]\r
                }\r
            }\r
        }\r
\`\`\`\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.guideLine.clear();\r
 let g1 = {\r
    "id": "g1",\r
    "coordinates": [\r
        [493210.2025, 2488496.863125, -0.0026171875], \r
        [493173.76, 2488761.5340625, -0.00078125], \r
        [493387.823125, 2488773.4715625, -0.0198046875],\r
        [493347.726875, 2489081.4201562502, -0.0143359375], \r
        [493138.6775, 2489075.9435937502, -0.000078125]\r
    ],\r
    "depthTest": false,\r
    "range": [\r
        0,\r
        100000\r
    ],\r
    "shape": 0,\r
    "width": 1,\r
    "guideSize": 1,\r
    "speed": 60,\r
    "interval": 1,  // -1不循环 \r
    //起点、终点和引导线样式\r
    "style": {\r
        "startPoint": { "material": "/JC_CustomAssets/PolylineLibrary/GuideExhibition/空", },\r
        "endPoint": { "material": "/JC_CustomAssets/PolylineLibrary/GuideExhibition/空", },\r
        "polyline": {\r
            "material": "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_9",\r
            "scalarParameters": [\r
                {\r
                    "name": "不透明度",\r
                    "value": 0.5\r
                },\r
                {\r
                    "name": "亮度1",\r
                    "value": 10\r
                },\r
                {\r
                    "name": "亮度2",\r
                    "value": 1\r
                }\r
            ],\r
            "vectorParameters": [\r
                {\r
                    "name": "颜色1",\r
                    "value": [\r
                        0, 0.269323, 0.53125, 1\r
                    ]\r
                },\r
                {\r
                    "name": "颜色2",\r
                    "value": [\r
                        0, 0.142583, 0.28125, 1\r
                    ]\r
                }\r
            ]\r
\r
        }\r
\r
\r
    }\r
} \r
await fdapi.guideLine.add(g1);\r
fdapi.guideLine.focus(g1.id, 200);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的GuideLine\r
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
fdapi.guideLine.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个GuideLine对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的GuideLine对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.guideLine.delete('g1');\r
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
| \`ids\` | \`string \\| array\` | GuideLine对象的ID或者ID数组 |\r
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
fdapi.guideLine.focus('g1');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取GuideLine的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的GuideLine对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.guideLine.get('g1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏GuideLine\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | GuideLine对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.guideLine.hide('g1');\r
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
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.guideLine.setCoordinates(id, newVal);\r
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
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.guideLine.setDepthTest(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setGuideSize(id, newVal, fn)\` {#setGuideSize}\r
\r
设置新的引导对象大小\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新的引导对象大小 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.guideLine.setGuideSize(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setInterval(id, newVal, fn)\` {#setInterval}\r
\r
设置新的播放时间间隔\r
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
await fdapi.guideLine.setInterval(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setRange(id, min, min, fn)\` {#setRange}\r
\r
设置GuideLine对象的可视范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | GuideLine对象的ID |\r
| \`min\` | \`number\` | 可视范围最小值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`min\` | \`number\` | 可视范围最大值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.guideLine.setRange(id, min, min);\r
\`\`\`\r
\r
---\r
\r
### \`setShape(id, newVal, fn)\` {#setShape}\r
\r
设置新的shape样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新值， 0： 直线， 1： 曲线 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.guideLine.setShape(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setSpeed(id, newVal, fn)\` {#setSpeed}\r
\r
设置新的速率\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`newVal\` | \`number\` | 新速率值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.guideLine.setSpeed(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setWidth(id, newVal, fn)\` {#setWidth}\r
\r
设置新的宽度\r
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
await fdapi.guideLine.setWidth(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示GuideLine\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | GuideLine对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.guideLine.show('g1');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个GuideLine对象\r
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
let g1 = {\r
    "id": "g1",\r
    "speed": 10,\r
    "interval": -1,  // -1不循环 \r
}\r
await fdapi.guideLine.update(g1);\r
fdapi.guideLine.focus(g1.id, 200);\r
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
await fdapi.guideLine.updateEnd();\r
\`\`\`\r
`;export{n as default};
