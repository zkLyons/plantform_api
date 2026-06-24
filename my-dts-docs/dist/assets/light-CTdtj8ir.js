const n=`---\r
title: Light\r
sidebar_label: Light\r
description: "Light 用于在三维场景中添加点光源、聚光源、矩形光源等动态光源，可设置颜色、亮度、衰减、阴影并支持按系统时间自动开关，营造真实的照明与夜景氛围。"\r
---\r
\r
# Light\r
\r
Light光源对象，实现对光源对象的操作\r
\r
通过 \`api.light\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Light 用于在三维场景中添加点光源、聚光源、矩形光源等动态光源，可设置颜色、亮度、衰减、阴影并支持按系统时间自动开关，营造真实的照明与夜景氛围。\r
- **别名 / 不同行业叫法**：灯光、照明、光源、点光源、聚光灯、路灯、补光、夜景灯光。\r
- **适用行业**：智慧城市、园区、交通、能源、智慧水利、国防军事。\r
- **使用场景**：\r
  - 智慧城市 / 园区：夜景照明仿真、路灯亮化、楼宇泛光与景观灯光联动展示。\r
  - 交通行业：隧道照明、道路路灯、机场跑道灯光等照明设施模拟。\r
  - 能源 / 安防：探照灯、聚光投射、重点区域补光照明的可视化表达。\r
- **注意事项**：\r
  - 开启 \`castShadows\` 阴影及批量添加多个光源时非常耗性能，建议默认关闭阴影并控制光源数量。\r
  - \`automate\` 开启后光源随系统时间昼灭夜亮，调试时需先用天气接口设置为夜晚时间才能看到效果。\r
  - \`outerConAngle\` 仅聚光源（type=2）生效，\`thickness\` 仅矩形光源（type=3）生效，不同类型参数不可混用。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new Light()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个光源对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 清空场景中所有的光源对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个光源对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据光源ID获取光源的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏光源 | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有光源 | 一键隐藏全部对象 |\r
| [\`show\`](#show) | 显示光源 | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有光源 | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个光源对象，支持更新以下属性： | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个光源对象  注意：当批量添加多个光源时，渲染阴影效果会非常耗性能，建议默认关闭\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 动态标记的数据，可以是Object类型或者Array类型，对于每一个Light对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 光源的唯一标识符ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`type\` | \`number\` | 光源类型: 1点光源 2聚光源 3矩形光源 |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`coordinates\` | \`array\` | 光源位置坐标，二维数组，光源类型是点光源和聚光源时参数为单个坐标点： [[X,Y,Z]]，光源类型是矩形光源时参数为包含起始点的坐标数组：[[X1,Y1,Z1], [X2,Y2,Z2]]，[取值示例](/docs/tutorials/coordinates) |\r
| \`color\` | \`array\` | 光源颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`rotation\` | \`array\` | 光源旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
| \`intensity\` | \`number\` | 光源亮度，单位：烛光，取值范围：[0~任意数值]，默认值：8 |\r
| \`distance\` | \`number\` | 光源的可视距离，单位：米，取值范围：[1~任意正数]，默认值：5000米 |\r
| \`attenuationRadius\` | \`number\` | 光源衰减半径，单位：米，取值范围：[0~任意数值] |\r
| \`castShadows\` | \`boolean\` | 光源是否开启阴影效果，注意：当添加多个光源时非常耗性能，默认关闭false |\r
| \`outerConAngle\` | \`number\` | 可选参数，聚光源投射的扇形夹角，单位：度，取值范围：[0~180]，默认值：45度，仅光源类型为聚光源时(type=2)生效 |\r
| \`thickness\` | \`number\` | 可选参数，矩形光源的宽度，单位：米，取值范围：[0.1~20000]，默认值：3米，仅光源类型为矩形光源时(type=3)生效 |\r
| \`automate\` | \`boolean\` | 可选参数，是否根据系统时间自动开关，即开启后晚上自动亮白天自动灭，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
//设置系统时间为晚上 灯光才会生效\r
fdapi.weather.setDateTime(2022, 10, 16, 22, 11, false);\r
\r
//设置相机进入灯光范围\r
fdapi.camera.set(492569.575508, 2492231.830801, 5.683483, -39.005371, -8.399526, 0);\r
\r
fdapi.light.clear();\r
\r
//点光源\r
let light_1 = {\r
    "id": "light_1",// 光源唯一标识\r
    "type": 1, //光源类型: 1点光源 2聚光灯 3平面光\r
    "coordinates": [[492573.0625, 2492232.5, 4.0301661491394043]],//光源坐标位置 平面光位置是二维数组 两个点\r
    "color": [0, 0, 1, 1], //光源颜色\r
    "coordinateType": 0,//坐标系类型：0投影 1经纬度\r
    "rotation": [0, 0, 0],//光源角度\r
    "intensity": 200,//光源亮度\r
    "distance": 1000,//光源可视距离\r
    "attenuationRadius": 100000,//光源衰减半径\r
    "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭\r
    "automate": true //是否根据系统时间自动开关，默认值：true\r
}\r
await fdapi.light.add(light_1);\r
\r
\r
//聚光灯(射灯)\r
let light_2 = {\r
    "id": "light_2",// 光源唯一标识\r
    "type": 2, //光源类型: 1点光源 2聚光灯 3平面光\r
    "coordinates": [[492571.875, 2492234.75, 8]],//光源位置坐标\r
    "color": [1, 0, 0, 1], //光源颜色\r
    "coordinateType": 0,//坐标系类型：0投影 1经纬度\r
    "rotation": [0, 0, 0],//光源角度\r
    "intensity": 200,//光源亮度\r
    "distance": 1000,//光源可视距离\r
    "outerConAngle": 95,//聚光灯投射扇形角度，仅光源类型为聚光灯时此参数生效\r
    "attenuationRadius": 100,//光源衰减半径\r
    "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭\r
    "automate": true //是否根据系统时间自动开关，默认值：true\r
};\r
await fdapi.light.add(light_2);\r
fdapi.camera.set(492571.784414, 2492225.354062, 2.769375, 25.300514, -80.777634, 0);\r
\r
//平面光\r
let light_3 = {\r
    "id": "light_3",// 光源唯一标识\r
    "type": 3, //光源类型: 1点光源 2聚光灯 3平面光\r
    "coordinates": [[492573.0625, 2492232.5, 4.0301661491394043], [492573.0625, 2492233.5, 4.0301661491394043]],//光源坐标位置 平面光位置是二维数组 两个点\r
    "color": [0, 1, 0, 1], //光源颜色\r
    "coordinateType": 0,//坐标系类型：0投影 1经纬度\r
    "rotation": [0, 0, 0],//光源角度\r
    "intensity": 200,//光源亮度\r
    "distance": 1000,//光源可视距离\r
    "attenuationRadius": 100000,//光源衰减半径\r
    "thickness": 2,//平面光宽度，仅光源类型为平面光时此参数生效\r
    "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭\r
    "automate": true //是否根据系统时间自动开关，默认值：true\r
}\r
await fdapi.light.add(light_3);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的光源对象\r
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
fdapi.light.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个光源对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的光源对象ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.light.delete(['light_1', 'light_2']);\r
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
| \`ids\` | \`string \\| array\` | 光源对象的ID或者ID数组 |\r
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
fdapi.light.focus('light_1', 100, 1);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据光源ID获取光源的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的光源对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回Light的详细信息 属性详情参见add方法参数\r
{\r
            "id":	"light_1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "rotation":	[0.000000, 0.000000, 0.000000],\r
            "type":	1,\r
            "intensity":	20000.000000,\r
            "distance": 1000,\r
            "outerConAngle":	45.000000,\r
            "attenuationRadius":	100000.000000,\r
            "castShadows":	0,\r
            "thickness":	3.000000,\r
            "color":	[0.000000, 1.000000, 0.000000, 1.000000]\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.light.get('light_1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏光源\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 光源对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.light.hide(['light_1', 'light_2']);\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有光源\r
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
fdapi.light.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示光源\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 光源对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.light.show('light_1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有光源\r
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
fdapi.light.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个光源对象，支持更新以下属性：\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`data \\| array\` | 光源对象或对象数组，支持更新以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 根据Light对象ID更新以下属性 |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinates\` | \`array\` | 光源位置坐标，二维数组，光源类型是点光源和聚光源时参数为单个坐标点： [[X,Y,Z]]，光源类型是矩形光源时参数为包含起始点的坐标数组：[[X1,Y1,Z1], [X2,Y2,Z2]]，[取值示例](/docs/tutorials/coordinates) |\r
| \`color\` | \`array\` | 光源颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`rotation\` | \`array\` | 光源旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
| \`intensity\` | \`number\` | 光源亮度，单位：烛光，取值范围：[0~任意数值]，默认值：8 |\r
| \`distance\` | \`number\` | 光源的可视距离，单位：米，取值范围：[1~任意正数]，默认值：5000米 |\r
| \`attenuationRadius\` | \`number\` | 光源衰减半径，单位：米，取值范围：[0~任意数值] |\r
| \`castShadows\` | \`boolean\` | 光源是否开启阴影效果，注意：当添加多个光源时非常耗性能，默认关闭false |\r
| \`outerConAngle\` | \`number\` | 可选参数，聚光源投射的扇形夹角，单位：度，取值范围：[0~180]，默认值：45度，仅光源类型为聚光源时(type=2)生效 |\r
| \`thickness\` | \`number\` | 可选参数，矩形光源的宽度，单位：米，取值范围：[0.1~20000]，默认值：3米，仅光源类型为矩形光源时(type=3)生效 |\r
| \`automate\` | \`boolean\` | 可选参数，是否根据系统时间自动开关，即开启后晚上自动亮白天自动灭，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
//不支持修改光源类型\r
let o = {\r
    "id": "light_1", // 光源唯一标识\r
    "color": [0, 1, 0, 1], //光源颜色\r
    "intensity": 100, //光源亮度\r
    "automate": false //是否根据系统时间自动开关 \r
}\r
await fdapi.light.update(o);\r
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
await fdapi.light.updateEnd();\r
\`\`\`\r
`;export{n as default};
