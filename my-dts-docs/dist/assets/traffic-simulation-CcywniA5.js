const n=`---\r
title: TrafficSimulation\r
sidebar_label: TrafficSimulation\r
description: "TrafficSimulation 提供城市级交通仿真能力，支持十万级别车辆的微观交通仿真，可通过 .dat 数据驱动大批量车辆按时间/定时器移动，并内置交通热力图模式与多车型配置。"\r
---\r
\r
# TrafficSimulation\r
\r
TrafficSimulation 提供城市级交通仿真能力，支持十万级别车辆的微观交通仿真，可通过 .dat 数据驱动大批量车辆按时间/定时器移动，并内置交通热力图模式与多车型配置。\r
\r
通过 \`api.trafficSimulation\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：TrafficSimulation 提供城市级交通仿真能力，支持十万级别车辆的微观交通仿真，可通过 .dat 数据驱动大批量车辆按时间/定时器移动，并内置交通热力图模式与多车型配置。\r
- **别名 / 不同行业叫法**：交通仿真 / 车流仿真 / 微观交通 / 交通流仿真 / 城市级车流模拟 / 交通态势仿真。\r
- **适用行业**：智慧交通、智慧城市、应急、园区、能源（路网调度）。\r
- **使用场景**：\r
  - 城市级路网车流推演、拥堵分析与信号配时/交通组织优化评估。\r
  - 重大活动、突发事件下的交通疏散与应急通行方案仿真。\r
  - 区域交通态势热力展示与城市数字孪生中的车流底座呈现。\r
- **注意事项**：\r
  - 面向超大规模车辆（十万级），对硬件与渲染性能要求高，应控制可视范围与车型数量；车型 \`models\` 仅在 add() 时配置，\`type\` 需与 .dat 数据字段对应。\r
  - \`timer\` 决定按数据时间字段还是定时器间隔驱动；热力图 \`bbox\`、坐标依赖 \`coordinateType\`（Projection/WGS84），需与路网数据坐标系一致。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 初始化一个TrafficSimulation对象，支持十万级别的城市交通车辆仿真模拟 | 向场景批量添加对象 |\r
| [\`autoHighlight\`](#autoHighlight) | 根据相机高度自动高亮TrafficSimulation对象包含的所有车辆 |  |\r
| [\`delete\`](#delete) | 删除一个或多个TrafficSimulation对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`hide\`](#hide) | 隐藏TrafficSimulation对象包含的所有车辆 | 按业务条件隐藏对象 |\r
| [\`hideHeatMap\`](#hideHeatMap) | 隐藏TrafficSimulation对象的热力图效果 |  |\r
| [\`hideTextLabel\`](#hideTextLabel) | 隐藏TrafficSimulation对象包含的所有车辆文字标签 |  |\r
| [\`highlight\`](#highlight) | 高亮TrafficSimulation对象包含的所有车辆 |  |\r
| [\`show\`](#show) | 显示TrafficSimulation对象包含的所有车辆 | 按业务条件显示对象 |\r
| [\`showHeatMap\`](#showHeatMap) | 显示TrafficSimulation对象的热力图效果 |  |\r
| [\`showTextLabel\`](#showTextLabel) | 显示TrafficSimulation对象包含的所有车辆文字标签 |  |\r
| [\`unHighlight\`](#unHighlight) | 取消高亮TrafficSimulation对象包含的所有车辆 |  |\r
| [\`update\`](#update) | 更新一个时刻的TrafficSimulation对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(trafficSimulation, fn)\` {#add}\r
\r
初始化一个TrafficSimulation对象，支持十万级别的城市交通车辆仿真模拟\r
\r
展示效果如下动图：\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`trafficSimulation\` | \`object\` | 交通仿真对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`trafficSimulation\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TrafficSimulation对象的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组Id |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |\r
| \`noiseThreshold\` | \`number\` | 车辆摆头的降噪距离，单位：米，默认值：0.05 |\r
| \`timer\` | \`boolean\` | 设置为false使用dat数据内的时间字段time，设置为true则使用定时器的时间间隔，默认：false， |\r
| \`heatmap\` | \`object\` | 交通仿真热力图模式配置对象，包含结构如下： |\r
| \`heatmap.bbox\` | \`array\` | 热力图覆盖的范围：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`heatmap.visible\` | \`boolean\` | 热力图是否可见，默认值：false |\r
| \`heatmap.blur\` | \`number\` | 热力图模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |\r
| \`heatmap.heatRadiusScale\` | \`number\` | 热力点影像半径，单位：米，取值范围：[任意数值] |\r
| \`heatmap.gradient\` | \`boolean\` | 是否渐变 |\r
| \`heatmap.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`heatmap.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`heatmap.color\` | [\`Color\`](/docs/api/types#color) | 值对应的调色板颜色 |\r
| \`heatmap.value\` | \`number\` | 值 |\r
| \`models\` | \`array\` | 交通仿真包含的车辆模型类型数组，注意：只需要在add()方法执行时配置，每一个数组元素对象包含属性如下： |\r
| \`models.type\` | \`number\` | 车辆类型，注意这个数值会写入更新方法使用的.dat文件内。 |\r
| \`models.package\` | \`string\` | 资源库车辆载具路径，取值类似CustomObject对象的assetPath，示例值：'/AirCityPlugin/ArtResources/Traffic/SUVTemplete' |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
请求参数示例\r
\r
\r
            {   \r
                "id": "traffic",\r
                "coordinateType": 1,\r
                "groupId": "groupAll",\r
                "userData": "交通仿真",\r
                "noiseThreshold": 0.05,  //车辆降噪距离 \r
                "timer": false,// 禁用定时器时间间隔，使用dat数据内的time字段            \r
                "heatmap": {\r
                    "bbox": [491439.1, 2490518, -5, 494439.1, 2493518.6, 20],\r
                    "visible": false,\r
                    "blur": 0.7,\r
                    "heatRadiusScale": 5,\r
                    "colors": {\r
                        "gradient": true,\r
                        "size": 256,\r
                        "colorStops": [\r
                            {\r
                                "value": 0,\r
                                "color": [\r
                                    0,\r
                                    0,\r
                                    1,\r
                                    1\r
                                ]\r
                            },\r
                            {\r
                                "value": 0.25,\r
                                "color": [\r
                                    0,\r
                                    1,\r
                                    1,\r
                                    1\r
                                ]\r
                            },\r
                            {\r
                                "value": 0.5,\r
                                "color": [\r
                                    0,\r
                                    1,\r
                                    0,\r
                                    1\r
                                ]\r
                            },\r
                            {\r
                                "value": 0.75,\r
                                "color": [\r
                                    1,\r
                                    1,\r
                                    0,\r
                                    1\r
                                ]\r
                            },\r
                            {\r
                                "value": 1,\r
                                "color": [\r
                                    1,\r
                                    0,\r
                                    0,\r
                                    1\r
                                ]\r
                            }\r
                        ]\r
                    }\r
                },\r
                "models": [\r
                    {\r
                        "type": 1,\r
                        "package": "/AirCityPlugin/ArtResources/Traffic/SUVTemplete"\r
                    },\r
                    {\r
                        "type": 2,\r
                        "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/公交车_04"\r
                    },\r
                    {\r
                        "type": 3,\r
                        "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/迷你巴士_01"\r
                    }\r
                ]\r
            }\r
\`\`\`\r
\r
> 示例：Add\r
\r
\`\`\`js\r
//设置夜景\r
fdapi.weather.setDateTime(2025, 9, 9, 22, 22, false);\r
//设置相机视角\r
fdapi.camera.set(491858.270625, 2491886.711035, 502.750039, -52.415585, -90.921097, 0);\r
\r
\r
fdapi.trafficSimulation.delete("traffic");\r
let trafficSimulation = {\r
    "id": "traffic",\r
    "coordinateType": 1,\r
    "groupId": "",\r
    "userData": "",\r
    "noiseThreshold": 0.06,  //车辆降噪距离 \r
    "timer": false,// 禁用计时器 用dat的time            \r
    "heatmap": {\r
        "bbox": [474853.14, 2484137.02, 0, 562179.26, 2528221.135, 383.999922],//交通仿真的范围\r
        "visible": false,//初始化是否默认显示热力图\r
        "blur": 0.8,\r
        "heatRadiusScale": 60,\r
        "colors": {\r
            "gradient": true,\r
            "size": 256,\r
            "colorStops": [\r
                {\r
                    "value": 0,\r
                    "color": [\r
                        0,\r
                        0,\r
                        1,\r
                        0\r
                    ]\r
                },\r
                {\r
                    "value": 0.25,\r
                    "color": [\r
                        0,\r
                        1,\r
                        1,\r
                        0\r
                    ]\r
                },\r
                {\r
                    "value": 0.5,\r
                    "color": [\r
                        0,\r
                        1,\r
                        0,\r
                        0.2\r
                    ]\r
                },\r
                {\r
                    "value": 0.75,\r
                    "color": [\r
                        1,\r
                        1,\r
                        0,\r
                        1\r
                    ]\r
                },\r
                {\r
                    "value": 1,\r
                    "color": [\r
                        1,\r
                        0,\r
                        0,\r
                        1\r
                    ]\r
                }\r
            ]\r
        }\r
    },\r
    "models": [\r
        {\r
            "type": 1,\r
            "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/轿车_02"\r
        },\r
        {\r
            "type": 2,\r
            "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/公交车_04"\r
        },\r
        {\r
            "type": 3,\r
            "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/迷你巴士_01"\r
        }\r
    ]\r
};\r
fdapi.trafficSimulation.add(trafficSimulation);\r
//开启根据高度自动高亮\r
fdapi.trafficSimulation.autoHighlight("traffic", 100);\r
\r
//打开交通热力图\r
fdapi.trafficSimulation.showHeatMap("traffic");\r
\r
//按500ms更新dat数据\r
let index = 0;\r
timer = setInterval(async function () {\r
    index++;\r
    if (index < 25) {\r
        fdapi.trafficSimulation.update({\r
            "id": "traffic",\r
            "file": HostConfig.Path + "/assets/dat/vehicle_" + index + ".dat",\r
        });\r
    } else {\r
        clearInterval(timer);\r
    }\r
}, 500);\r
\`\`\`\r
\r
---\r
\r
### \`autoHighlight(id, distance, fn)\` {#autoHighlight}\r
\r
根据相机高度自动高亮TrafficSimulation对象包含的所有车辆\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 要高亮TrafficSimulation对象的id |\r
| \`distance\` | \`number\` | 达到此相机高度则车辆自动高亮，默认值：600米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：AutoHighlight\r
\r
\`\`\`js\r
fdapi.trafficSimulation.autoHighlight("traffic", 100);\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个TrafficSimulation对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的TrafficSimulation对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.trafficSimulation.delete("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`focus(ids, distance, flyTime, rotation, distanceRotation, fn)\` {#focus}\r
\r
自动定位到合适的观察距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | TrafficSimulation对象的ID或者ID数组 |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`distanceRotation\` | \`array\` | 可选参数，跟车相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Focus\r
\r
\`\`\`js\r
fdapi.trafficSimulation.focus("traffic", 100);\r
\`\`\`\r
\r
---\r
\r
### \`hide(id, fn)\` {#hide}\r
\r
隐藏TrafficSimulation对象包含的所有车辆\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string \\| array\` | TrafficSimulation对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.trafficSimulation.hide("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`hideHeatMap(id, fn)\` {#hideHeatMap}\r
\r
隐藏TrafficSimulation对象的热力图效果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TrafficSimulation对象的id |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideHeatMap\r
\r
\`\`\`js\r
fdapi.trafficSimulation.hideHeatMap("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`hideTextLabel(id, fn)\` {#hideTextLabel}\r
\r
隐藏TrafficSimulation对象包含的所有车辆文字标签\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TrafficSimulation对象的id |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideTextLabel\r
\r
\`\`\`js\r
fdapi.trafficSimulation.hideTextLabel("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`highlight(id, fn)\` {#highlight}\r
\r
高亮TrafficSimulation对象包含的所有车辆\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 要高亮TrafficSimulation对象的id |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Highlight\r
\r
\`\`\`js\r
fdapi.trafficSimulation.highlight("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`show(id, fn)\` {#show}\r
\r
显示TrafficSimulation对象包含的所有车辆\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TrafficSimulation对象的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.trafficSimulation.show("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`showHeatMap(id, fn)\` {#showHeatMap}\r
\r
显示TrafficSimulation对象的热力图效果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TrafficSimulation对象的id |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowHeatMap\r
\r
\`\`\`js\r
fdapi.trafficSimulation.showHeatMap("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`showTextLabel(id, fn)\` {#showTextLabel}\r
\r
显示TrafficSimulation对象包含的所有车辆文字标签\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TrafficSimulation对象的id |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowTextLabel\r
\r
\`\`\`js\r
fdapi.trafficSimulation.showTextLabel("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`unHighlight(id, fn)\` {#unHighlight}\r
\r
取消高亮TrafficSimulation对象包含的所有车辆\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 要高亮TrafficSimulation对象的id |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：UnHighlight\r
\r
\`\`\`js\r
fdapi.trafficSimulation.unHighlight("traffic");\r
\`\`\`\r
\r
---\r
\r
### \`update(trafficSimulation, fn)\` {#update}\r
\r
更新一个时刻的TrafficSimulation对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`trafficSimulation\` | \`object\` | 交通仿真对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`trafficSimulation\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TrafficSimulation对象的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组Id |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`file\` | \`string\` | 某个时刻的多辆车的轨迹点数据文件路径，包含：车辆id、车辆经度、车辆纬度、车辆类型、时间。二进制文件格式(.dat)，包含内容如下：id(int 4字节),lon(double 8字节),lat(double 8字节),type(int 4字节),time(int 4字节) |\r
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |\r
| \`noiseThreshold\` | \`number\` | 车辆摆头的降噪距离，单位：米，默认值：0.05 |\r
| \`timer\` | \`boolean\` | 设置为false使用dat数据内的时间字段time，设置为true则使用定时器的时间间隔，默认：false， |\r
| \`heatmap\` | \`object\` | 交通仿真热力图模式配置对象，包含结构如下： |\r
| \`heatmap.bbox\` | \`array\` | 热力图覆盖的范围：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`heatmap.visible\` | \`boolean\` | 热力图是否可见，默认值：false |\r
| \`heatmap.blur\` | \`number\` | 热力图模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |\r
| \`heatmap.heatRadiusScale\` | \`number\` | 热力点影像半径，单位：米，取值范围：[任意数值] |\r
| \`heatmap.gradient\` | \`boolean\` | 是否渐变 |\r
| \`heatmap.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`heatmap.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`heatmap.color\` | [\`Color\`](/docs/api/types#color) | 值对应的调色板颜色 |\r
| \`heatmap.value\` | \`number\` | 值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
请求参数示例\r
\r
{\r
            "id": "traffic",\r
            "coordinateType": 1,\r
            "groupId": "",\r
            "userData": "",\r
            "file": "F:\\\\vehicle\\\\vehicle_" + index + ".dat",\r
            "heatmap":\r
            {\r
                "bbox": [474853.14,2484137.02,0,562179.26,2528221.135,383.999922],\r
                "visible": true,\r
                "blur": 0.1,\r
                "heatRadiusScale": 10,\r
                "colors":\r
                {\r
                    "gradient": true,\r
                    "size": 256,\r
                    "colorStops":\r
                        [\r
                            {\r
                                "value": 0,\r
                                "color": [0, 0, 1, 0]\r
                            },\r
                            {\r
                                "value": 0.25,\r
                                "color": [0, 1, 1, 0]\r
                            },\r
                            {\r
                                "value": 0.5,\r
                                "color": [0, 1, 0, 1]\r
                            },\r
                            {\r
                                "value": 0.75,\r
                                "color": [1, 1, 0, 1]\r
                            },\r
                            {\r
                                "value": 1,\r
                                "color": [1, 0, 0, 1]\r
                            }\r
                        ]\r
                }\r
        }\r
\`\`\`\r
\r
> 示例：Update\r
\r
\`\`\`js\r
clearInterval(timer);\r
\r
//按1s更新dat数据\r
let index = 0;\r
timer = setInterval(async function () {\r
    index++;\r
    if (index < 25) {\r
        fdapi.trafficSimulation.update({\r
            "id": "traffic",\r
            "file": HostConfig.Path + "/assets/dat/vehicle_" + index + ".dat",\r
        });\r
    } else {\r
        clearInterval(timer);\r
    }\r
}, 1000);\r
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
await fdapi.trafficSimulation.updateEnd();\r
\`\`\`\r
`;export{n as default};
