const n=`---\r
title: Vehicle\r
sidebar_label: Vehicle\r
description: "Vehicle 加载车辆模型并沿路径行驶，模拟交通流与车辆运动。"\r
---\r
\r
# Vehicle\r
\r
Vehicle 加载车辆模型并沿路径行驶，模拟交通流与车辆运动。\r
\r
通过 \`api.vehicle\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Vehicle 加载车辆模型并沿路径行驶，模拟交通流与车辆运动。\r
- **别名 / 不同行业叫法**：车辆 / 车流 / 载具 / 交通流 / 机动车。\r
- **适用行业**：智慧交通、智慧城市、智慧园区、物流、应急\r
- **使用场景**：\r
  - 道路车流仿真与可视化\r
  - 车辆轨迹回放与事件还原\r
  - 救援/巡逻等事件车辆的运动\r
- **注意事项**：\r
  - 大量车辆需用实例化/LOD 控制性能\r
  - 行驶路径需与路网匹配\r
  - 坐标系需与地形贴合\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Vehicle对象 | 向场景批量添加对象 |\r
| [\`callBatchFunction\`](#callBatchFunction) | 调用多个Vehicle对象的多个蓝图函数 |  |\r
| [\`clear\`](#clear) | 清空场景中所有的Vehicle对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Vehicle对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取Vehicle对象的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏一个或多个Vehicle对象 | 按业务条件隐藏对象 |\r
| [\`moveTo\`](#moveTo) | 设置Vehicle对象行驶（根据实时获取的GPS数据运动） | 驱动对象移动到目标位置 |\r
| [\`pause\`](#pause) | 暂停指定的载具运动 | 暂停播放 |\r
| [\`resume\`](#resume) | 恢复指定的载具运动 | 恢复播放 |\r
| [\`setWayPoint\`](#setWayPoint) | 设置Vehicle对象行驶的路径点（已知路径点 轨迹动画） |  |\r
| [\`show\`](#show) | 显示一个或多个Vehicle对象 | 按业务条件显示对象 |\r
| [\`start\`](#start) | 启动指定的载具在某个时刻开始运动 | 启动该功能/交互 |\r
| [\`stop\`](#stop) | 停止指定的载具运动 | 停止播放 |\r
| [\`update\`](#update) | 修改一个或多个Vehicle对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Vehicle对象\r
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
| \`id\` | \`string\` | Vehicle对象的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`assetPath\` | \`string\` | 资源库车辆载具路径，类似CustomObject对象的assetPath，示例值：'/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01' |\r
| \`coordinate\` | \`array\` | 载具初始位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |\r
| \`autoHeight\` | \`boolean\` | 可选，是否自动计算载具行驶高度，默认值：true，注意：当设置为false时会使用载具坐标的高度Z |\r
| \`useInitZ\` | \`boolean\` | 可选，是否使用添加载具初始化坐标的高度Z，默认：false |\r
| \`delay\` | \`number\` | 可选，控制载具moveTo()接口移动的延迟时间，单位：秒，默认值：0.5，设置0则不延时立刻移动 |\r
| \`rotation\` | \`array\` | 可选，载具旋转，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
| \`colorType\` | \`number\` | 可选，载具使用内置涂装颜色的类型，取值范围：[0~任意正整数]，默认值：0 随机使用涂装颜色，大于0则使用其他固定的涂装颜色。 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 可选，载具自定义涂装颜色，注意：若传入此颜色参数会覆盖掉内置的涂装颜色（colorType），支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`localOffset\` | \`array\` | 可选，载具基于原始位置坐标的偏移量，默认值：[0,0,0] |\r
| \`enableDecal\` | \`boolean\` | 可选，是否支持贴画贴合，默认值：true |\r
| \`visible\` | \`boolean\` | 可选，设置载具对象加载后是否显示，默认：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
await fdapi.vehicle.delete('vc1');\r
let vc1 = {\r
    "id": "vc1",\r
    "coordinateType": 0,\r
    "coordinate": [493132.125, 2492028.25, 2.1155664920806885],\r
    "assetPath": "/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01",//资源库车辆路径\r
    "rotation": [0, 0, 0],\r
    "colorType": 0, //0: 使用随机涂装颜色  大于0的正整数: 使用固定涂装颜色\r
    "color": [1, 1, 0, 1],// 开启自定义颜色 则会覆盖colorType涂装颜色\r
    "autoHeight": true,//开启自动高度 贴地移动\r
    "delay": 1,//控制载具moveTo()接口移动的延迟时间 单位：秒\r
    "useInitZ": false,//是否使用添加载具初始化坐标的高度Z\r
    "localOffset": [0, 0, 0],\r
    "enableDecal": true,\r
    "visible": true, //默认可见性\r
};\r
fdapi.vehicle.add(vc1);\r
fdapi.vehicle.focus('vc1');\r
\r
//注意：focus方法同时支持第一人称视角 具体参考API文档\r
//fdapi.vehicle.focus('vc1',true,0,0,[-16.27,1.969612,0],[0,0,0],[0,-0.3,1.3]);\r
\`\`\`\r
\r
---\r
\r
### \`callBatchFunction(data, fn)\` {#callBatchFunction}\r
\r
调用多个Vehicle对象的多个蓝图函数\r
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
| \`id\` | \`string\` | Vehicle对象的ID |\r
| \`functionName\` | \`string\` | 蓝图函数名 |\r
| \`parameters\` | \`array\` | 蓝图函数包含的多个参数结构，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.drone.callBatchFunction(data);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的Vehicle对象\r
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
fdapi.vehicle.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Vehicle对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Vehicle对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.vehicle.delete('vc1');\r
\`\`\`\r
\r
---\r
\r
### \`focus(ids, followEnable, distance, flyTime, rotation, distanceRotation, offset, fn)\` {#focus}\r
\r
自动定位到合适的观察距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Vehicle对象的ID或者ID数组 |\r
| \`followEnable\` | \`boolean\` | 可选参数，是否开启相机自动跟随(开启后相机交互会被自动托管)，默认值：false |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以用来模拟驾驶员视角 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`distanceRotation\` | \`array\` | 可选参数，跟车相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`offset\` | \`array\` | 可选参数，定位后载具视角的偏移量，单位：米，默认值：[0,0,0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Focus\r
\r
\`\`\`js\r
//注意：focus方法支持第一人称视角 具体参考API文档\r
fdapi.vehicle.focus('vc1', true, 6, 2, [2, 6, 0], [5, 0, 0]);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Vehicle对象的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Vehicle对象的Vehicle对象的ID或者ID数组（可以获取一个或者多个） |\r
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
            "assetPath":"/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01",\r
            "rotation":[0, -10, 0],\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.vehicle.get('vc1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏一个或多个Vehicle对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Vehicle对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.vehicle.hide('vc1');\r
\`\`\`\r
\r
---\r
\r
### \`moveTo(data, fn)\` {#moveTo}\r
\r
设置Vehicle对象行驶（根据实时获取的GPS数据运动）\r
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
| \`id\` | \`string\` | Vehicle对象的ID |\r
| \`coordinate\` | \`array\` | 车辆移动目标点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`gear\` | \`number\` | 车辆档位：0驻车档 1倒挡 2空挡 3前进挡 |\r
| \`heading\` | \`number\` | 车辆转向角度，取值范围：[0,360] |\r
| \`time\` | \`number\` | 车辆移动耗时，单位：秒 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
数据结构示例\r
\r
[{"id": "vc1","coordinate": [-1498, -2804,0],"gear": 3,"heading":0,"time": 1}]\r
\`\`\`\r
\r
> 示例：MoveTo\r
\r
\`\`\`js\r
//模拟实时gps坐标\r
let realTimeGPSPoint = [\r
    [493136.5625, 2492028, 2.1],\r
    [493141.09375, 2492028, 2.1],\r
    [493143.71875, 2492027.75, 2.1],\r
    [493146.46875, 2492027.75, 2.1],\r
    [493150.1875, 2492027.25, 2.1],\r
    [493153.625, 2492027, 2.1],\r
    [493152.84375, 2492023.25, 2.1],\r
    [493150.59375, 2492019, 2.1],\r
    [493148.75, 2492015, 2.1],\r
    [493148.03125, 2492012.25, 1.1],\r
];\r
//模拟1秒获取一个坐标位置 并设置载具运动MoveTo方法\r
let index = 0;\r
let timer = setInterval(function () {\r
    index++;\r
    if (index < 10) {\r
        let moveToArr = [\r
            { "id": "vc1", "coordinate": realTimeGPSPoint[index - 1], "gear": 3, "time": 1 },\r
        ];\r
        //实时移动\r
        fdapi.vehicle.moveTo(moveToArr);\r
    } else {\r
        //运动结束后清除定时器\r
        clearInterval(timer);\r
    }\r
}, 1000);\r
\`\`\`\r
\r
---\r
\r
### \`pause(ids, fn)\` {#pause}\r
\r
暂停指定的载具运动\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Vehicle对象的ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Pause\r
\r
\`\`\`js\r
fdapi.vehicle.pause('vc1');\r
\`\`\`\r
\r
---\r
\r
### \`resume(id, fn)\` {#resume}\r
\r
恢复指定的载具运动\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string \\| array\` | Vehicle对象的ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Resume\r
\r
\`\`\`js\r
fdapi.vehicle.resume('vc1');\r
\`\`\`\r
\r
---\r
\r
### \`setWayPoint(data, fn)\` {#setWayPoint}\r
\r
设置Vehicle对象行驶的路径点（已知路径点 轨迹动画）\r
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
| \`id\` | \`string\` | Vehicle对象的ID |\r
| \`wayPoints\` | \`array\` | 载具运动的路径点数组，数组每一个元素的对象属性如下： |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
数据结构示例\r
[{\r
        "id": "vc1",\r
        "wayPoints": \r
            [\r
                {\r
                    "timeStamp": 0,\r
                    "coordinate": [-1498,-2804,0],\r
                    "gear": 3\r
                },\r
                {\r
                    "timeStamp": 1,\r
                    "coordinate": [-1469,-2800,0],\r
                    "gear": 3\r
                    \r
                },\r
                {\r
                    "timeStamp": 2,\r
                    "coordinate": [-1465,-2783,0],\r
                    "gear": 3\r
                    \r
                }\r
            ]\r
        }]\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示一个或多个Vehicle对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Vehicle对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.vehicle.show('vc1');\r
\`\`\`\r
\r
---\r
\r
### \`start(data, fn)\` {#start}\r
\r
启动指定的载具在某个时刻开始运动\r
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
| \`id\` | \`string\` | Vehicle对象的ID |\r
| \`timeStamp\` | \`number\` | Vehicle对象开始运动的时间 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
请求参数结构示例\r
以下参数表示三辆载具开始运动，v1第一秒开始运动，v2第五秒开始运动，v3第七秒开始运动\r
[\r
{"id":"vc1","timeStamp":1},\r
{"id":"vc2","timeStamp":5},\r
{"id":"vc3","timeStamp":7}\r
]\r
\`\`\`\r
\r
> 示例：Start\r
\r
\`\`\`js\r
fdapi.vehicle.start([{\r
    id: 'vc1',\r
    timeStamp: 0,//设置载具v1从wayPoints的第0秒开始运动\r
}]);\r
\`\`\`\r
\r
---\r
\r
### \`stop(ids, fn)\` {#stop}\r
\r
停止指定的载具运动\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Vehicle对象的ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Stop\r
\r
\`\`\`js\r
fdapi.vehicle.stop('vc1');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Vehicle对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | Vehicle对象或者数组，以下属性支持更新 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 根据Vehicle对象的ID更新载具属性 |\r
| \`coordinate\` | \`array\` | 载具初始位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`autoHeight\` | \`boolean\` | 可选，是否自动计算载具行驶高度，默认值：true，注意：当设置为false时会使用载具坐标的高度Z |\r
| \`rotation\` | \`array\` | 可选，载具旋转，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
| \`localOffset\` | \`array\` | 可选，载具基于原始位置坐标的偏移量，默认值：[0,0,0] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
//定位到车辆位置\r
//fdapi.camera.set(493127.98886, 2492019.294375, 7.895526, -22.705507, -63.62706, 1);\r
\r
let vc1 = {\r
    "id": "vc1",\r
    "rotation": [0, 90, 0],\r
};\r
fdapi.vehicle.update(vc1);\r
//注意：focus方法支持第一人称视角 具体参考API文档\r
fdapi.vehicle.focus('vc1');\r
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
await fdapi.drone.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> SetWayPoint\r
\r
\`\`\`js\r
let wayPoints = [{\r
    "id": "vc1",\r
    "wayPoints":\r
        [\r
            { "coordinate": [493136.5625, 2492028, 2.1], "gear": 3, "timeStamp": 0 },\r
            { "coordinate": [493141.09375, 2492028, 2.1], "gear": 3, "timeStamp": 1 },\r
            { "coordinate": [493143.71875, 2492027.75, 2.1], "gear": 3, "timeStamp": 2 },\r
            { "coordinate": [493146.46875, 2492027.75, 2.1], "gear": 3, "timeStamp": 3 },\r
            { "coordinate": [493150.1875, 2492027.25, 2.1], "gear": 3, "timeStamp": 4 },\r
            { "coordinate": [493153.625, 2492027, 2.1], "gear": 3, "timeStamp": 5 },\r
            { "coordinate": [493152.84375, 2492023.25, 2.1], "gear": 3, "timeStamp": 6 },\r
            { "coordinate": [493150.59375, 2492019, 2.1], "gear": 3, "timeStamp": 7 },\r
            { "coordinate": [493148.75, 2492015, 2.1], "gear": 3, "timeStamp": 8 },\r
            { "coordinate": [493148.03125, 2492012.25, 1.1], "gear": 3, "timeStamp": 9 }\r
        ]\r
}];\r
fdapi.vehicle.setWayPoint(wayPoints);\r
\`\`\`\r
`;export{n as default};
