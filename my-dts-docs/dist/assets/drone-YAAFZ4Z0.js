const r=`---\r
title: Drone\r
sidebar_label: Drone\r
description: "在三维场景中加载与驱动无人机模型，支持坐标定位、姿态旋转、moveTo 移动、轨迹线、自发光灯与标牌，模拟无人机的飞行与巡检过程。"\r
---\r
\r
# Drone\r
\r
在三维场景中加载与驱动无人机模型，支持坐标定位、姿态旋转、moveTo 移动、轨迹线、自发光灯与标牌，模拟无人机的飞行与巡检过程。\r
\r
通过 \`api.drone\` 访问。\r
\r
---\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Drone 用于在三维场景中加载与驱动无人机模型，支持坐标定位、姿态旋转、moveTo 移动、轨迹线绘制、自发光灯及标牌等，模拟无人机的飞行与巡检过程。\r
- **别名 / 不同行业叫法**：无人机 / UAV / 低空飞行器 / 无人飞行器 / 飞行平台 / 巡检无人机。\r
- **适用行业**：低空经济、应急、智慧城市、能源、国防军事、园区。\r
- **使用场景**：\r
  - 低空经济航线与无人机物流配送的可视化飞行模拟与航迹回放。\r
  - 应急救援、电力/管线/能源设施的无人机巡检路径与状态展示。\r
  - 城市治理、园区安防的无人机空中巡逻与目标跟踪轨迹呈现。\r
- **注意事项**：\r
  - 通过 \`assetPath\` 引用资源库无人机模型，\`coordinate\` 与 \`coordinateType\`（Projection/WGS84）需匹配；轨迹线 \`trailDuration\`、\`trailType\` 等影响渲染开销。\r
  - \`delay\` 控制 moveTo 移动延迟，设为 0 立即移动；大量无人机同时驱动时应关注性能与轨迹持续时间设置。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个无人机对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 清空场景中所有的无人机对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个无人机对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取无人机对象的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏一个或多个无人机对象 | 按业务条件隐藏对象 |\r
| [\`moveTo\`](#moveTo) | 设置无人机对象飞行移动 | 驱动对象移动到目标位置 |\r
| [\`show\`](#show) | 显示一个或多个无人机对象 | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个无人机对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个无人机对象\r
\r
路径参数assetPath获取方法如下动图：\r
\r
\r
\r
![](/img/refdoc/api/copy_actor_path.gif)\r
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
| \`id\` | \`string\` | 无人机对象的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`assetPath\` | \`string\` | 资源库无人机的路径，类似CustomObject对象的assetPath，示例值：'/AirCityPlugin/ArtResources/Drone/Drone' |\r
| \`coordinate\` | \`array\` | 无人机初始位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |\r
| \`delay\` | \`number\` | 可选，控制无人机moveTo()接口移动的延迟时间，单位：秒，默认值：0.5，设置0则不延时立刻移动 |\r
| \`rotation\` | \`array\` | 可选，无人机旋转，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
| \`localOffset\` | \`array\` | 可选，无人机基于原始位置坐标的偏移量，默认值：[0,0,0] |\r
| \`scale\` | \`array\` | 可选，无人机缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |\r
| \`visible\` | \`boolean\` | 可选，设置无人机对象加载后是否显示，默认：true |\r
| \`trailType\` | [\`DroneTrailStyle\`](/docs/api/types#dronetrailstyle) | (\`DroneTrailStyle\`) 可选，轨迹线样式枚举，详情参考 \`DroneTrailStyle\`，默认值：0 |\r
| \`trailThickness\` | \`number\` | 可选，像素线宽度，注意：仅设置像素线样式枚举时生效 |\r
| \`trailColor\` | [\`Color\`](/docs/api/types#color) | 可选，轨迹线颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`trailDuration\` | \`number\` | 可选，轨迹持续时间，单位：秒，默认值：3秒 |\r
| \`lightColor\` | [\`Color\`](/docs/api/types#color) | 可选，无人机自发光灯颜色亮度，取值示例：[1, 0, 0, 10]，注意：alpha是无人机亮度，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`label\` | \`object\` | 可选，无人机的标牌对象，默认不显示，包含可配置的参数如下： |\r
| \`label.visible\` | \`boolean\` | 无人机标牌是否可见，默认值：false |\r
| \`label.offset\` | \`array\` | 无人机标牌偏移，默认值：[0, 0, 0] |\r
| \`label.cullDistance\` | \`number\` | 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米 |\r
| \`label.text\` | \`string\` | 无人机标牌显示的字符串 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
//设置后期 泛光 减少灯光秀光晕 关闭反走样\r
fdapi.settingsPanel.setPostProcessMode({ bloomIntensity: 0.7, antiAliasing: false });\r
\r
//设置夜晚 展示灯光秀\r
fdapi.weather.setDateTime(2025, 12, 25, 22, 10, false);\r
\r
//添加100架无人机\r
await fdapi.drone.clear();\r
let basePoint = [492548, 2491830, 200];\r
let d100 = [];\r
for (let i = 0; i < 100; i++) {\r
    let drone = {\r
        "id": "drone" + i,\r
        "coordinateType": 0,\r
        "coordinate": [basePoint[0] + Math.random() * 500, basePoint[1] + Math.random() * 500, 200],\r
        "assetPath": "/JC_CustomAssets/UAVLibrary/Exhibition/UAV_1",\r
        "rotation": [0, 0, 0],\r
        "autoHeight": true,\r
        "delay": 1,\r
        "localOffset": [0, 0, 0],\r
        "scale": [3, 3, 3], //模型缩放\r
        "visible": 1, //加载后可见\r
        "enableDecal": true,\r
        "trailType": DroneTrailStyle.Pixel_Line1, //轨迹样式枚举\r
        "trailThickness": 2, //像素线宽度，注意：仅开启像素线样式枚举时生效\r
        "trailColor": [Math.random(), Math.random(), Math.random(), 1],//轨迹线颜色\r
        "trailDuration": 6, //轨迹线持续时长 0表示一直显示\r
        "lightColor": [Math.random(), Math.random(), Math.random(), 10],//灯光秀颜色、亮度\r
        "label": {\r
            "visible": true,//标牌可见性\r
            "cullDistance": 100, // 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米\r
            "offset": [0, 0, 0],//标牌偏移\r
            "text": "空A " + Math.round(Math.random() * 1000000) //标牌显示的文字\r
        }\r
    };\r
    d100.push(drone);\r
}\r
fdapi.drone.add(d100);\r
fdapi.drone.focus('drone5');\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的无人机对象\r
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
fdapi.drone.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个无人机对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的无人机对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.drone.delete('drone5');\r
\`\`\`\r
\r
---\r
\r
### \`focus(ids, followEnable, distance, flyTime, viewPitch, viewYaw, sensitivity, offset, fn)\` {#focus}\r
\r
自动定位到合适的观察距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 无人机对象的ID或者ID数组 |\r
| \`followEnable\` | \`boolean\` | 可选参数，是否开启相机自动跟随(开启后相机交互会被自动托管)，默认值：false |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以用来模拟无人机观察视角 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`viewPitch\` | \`number\` | 可选参数，观察欧拉角的Pitch，取值范围：[-90~90] |\r
| \`viewYaw\` | \`number\` | 可选参数，观察欧拉角的Yaw，取值范围： [-180~180] |\r
| \`sensitivity\` | \`number\` | 可选参数，无人机灵敏度，取值范围： [0~1] |\r
| \`offset\` | \`array\` | 可选参数，无人机视角的偏移量，单位：米，默认值：[0,0,0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Focus\r
\r
\`\`\`js\r
//设置相机跟随\r
fdapi.drone.focus('drone5', false, 8, 2, -45, 10, [0, 0, 0], 0.02);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取无人机对象的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的无人机对象的无人机对象的ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
CustomObject的详细信息\r
[{\r
            "id":"vc1",\r
            "groupId": "car_main_road",\r
            "userData": "car_info",\r
            "coordinateType":0,\r
            "coordinate":[-1499.8984375, -2804.5328125000001,1],\r
            "assetPath":"/JC_CustomAssets/DroneLibrary/Exhibition/Drone",\r
            "rotation":[0, -10, 0],\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.drone.get('drone5');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏一个或多个无人机对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 无人机对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.drone.hide('drone5');\r
\`\`\`\r
\r
---\r
\r
### \`moveTo(data, fn)\` {#moveTo}\r
\r
设置无人机对象飞行移动\r
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
| \`id\` | \`string\` | 无人机对象的ID |\r
| \`coordinate\` | \`array\` | 无人机对象移动目标点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`rotation\` | \`array\` | 可选，无人机的旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
| \`astern\` | \`boolean\` | 可选，是否开启倒档，默认值：false |\r
| \`time\` | \`number\` | 可选，无人机对象移动目标点对应的时间戳 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：MoveTo\r
\r
\`\`\`js\r
let basePoint = [492548, 2491830, 200];\r
let index = 0;\r
let currTime = new Date().getTime();\r
let timer = setInterval(function () {\r
    if (index < 100) {\r
        let time = currTime + 1000 * index;\r
\r
        let d10 = []\r
        for (let i = 0; i < 100; i++) {\r
            d10.push({\r
                "id": "drone" + i,\r
                "coordinate": [basePoint[0] + Math.random() * 500, basePoint[1] + Math.random() * 500, 200],\r
                "time": time,\r
                "rotation": [0, 0, 0]\r
            });\r
        }\r
        fdapi.drone.moveTo(d10);\r
        ++index;\r
    }\r
    else {\r
        clearInterval(timer);\r
        fdapi.camera.cancelFollow();\r
    }\r
}, 1000);\r
//定位\r
fdapi.drone.focus('drone5', false, 8, 2, -45, 10, [0, 0, 0], 0.02);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示一个或多个无人机对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 无人机对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.drone.show('drone5');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个无人机对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 无人机对象或者数组，以下属性支持更新 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 根据无人机对象的ID更新无人机相关属性 |\r
| \`trailType\` | \`number\` | (\`DroneTrailStyle\`) 可选，轨迹线样式枚举，详情参考 \`DroneTrailStyle\`，默认值：0 |\r
| \`trailColor\` | [\`Color\`](/docs/api/types#color) | 可选，轨迹线颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`trailDuration\` | \`number\` | 可选，轨迹持续时间，单位：秒，默认值：3 |\r
| \`trailThickness\` | \`number\` | 可选，像素线宽度，注意：仅设置像素线样式枚举时生效 |\r
| \`lightColor\` | [\`Color\`](/docs/api/types#color) | 可选，无人机自发光灯颜色亮度，取值示例：[1, 0, 0, 10]，注意：alpha是无人机亮度，支持四种格式，[取值示例](/docs/tutorials/color)，默认：关闭 |\r
| \`label\` | \`object\` | 可选，无人机的标牌对象，默认不显示，包含可配置的参数如下： |\r
| \`label.visible\` | \`boolean\` | 无人机标牌是否可见，默认值：false |\r
| \`label.offset\` | \`array\` | 无人机标牌偏移，默认值：[0, 0, 0] |\r
| \`label.cullDistance\` | \`number\` | 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米 |\r
| \`label.text\` | \`string\` | 无人机标牌显示的字符串 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let d100 = []\r
for (let i = 0; i < 100; i++) {\r
    d100.push({\r
        "id": "drone" + i,\r
        "trailType": 0, //轨迹线样式\r
        "trailColor": [1, 1, 0, 1],//轨迹线颜色\r
        "trailDuration": 3, //轨迹线持续时长\r
        "lightColor": [1, 0, 0, 1],//灯光秀颜色\r
        "label": {\r
            "visible": true,//标牌可见性\r
            "cullDistance": 1000, // 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米\r
            "offset": [0, 0, 0],//标牌偏移\r
            "text": "空A " + Math.round(Math.random() * 1000000) //标牌显示的文字\r
        }\r
    });\r
}\r
fdapi.drone.update(d100);\r
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
await fdapi.Drone.updateEnd();\r
\`\`\`\r
`;export{r as default};
