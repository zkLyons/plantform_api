const r=`---\r
title: BoxTrigger\r
sidebar_label: BoxTrigger\r
description: "BoxTrigger 用于在三维场景中绘制一个长方体盒子热区，当 CustomObject 自定义对象或 Camera 相机进入/退出该范围时自动触发回调事件，是一种基于空间包围盒的进出检测机制。"\r
---\r
\r
# BoxTrigger\r
\r
BoxTrigger 用于在三维场景中绘制一个长方体盒子热区，当 CustomObject 自定义对象或 Camera 相机进入/退出该范围时自动触发回调事件，是一种基于空间包围盒的进出检测机制。\r
\r
通过 \`api.boxTrigger\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：BoxTrigger 用于在三维场景中绘制一个长方体盒子热区，当 CustomObject 自定义对象或 Camera 相机进入/退出该范围时自动触发回调事件，是一种基于空间包围盒的进出检测机制。\r
- **别名 / 不同行业叫法**：盒子触发器 / 电子围栏 / 触发区 / 检测框 / 空间感应区 / 越界检测区。\r
- **适用行业**：智慧交通、智慧城市、应急、国防军事、低空经济、园区。\r
- **使用场景**：\r
  - 园区/重点设施周界安防：人员或车辆越界进入禁区时自动告警联动。\r
  - 智慧交通卡口/隧道/收费站区域检测：车辆进出特定路段或检测断面触发统计与事件上报。\r
  - 应急与军事禁飞/警戒区：目标进入危险区或警戒空域时触发预警与处置流程。\r
- **注意事项**：\r
  - 通过 \`bbox\`（[minX,minY,minZ,maxX,maxY,maxZ]）定义热区，需与 \`coordinateType\` 坐标系（Projection/WGS84/GCJ02/BD09）一致，避免热区错位。\r
  - 仅对 CustomObject 与 Camera 进出生效；触发的是离散的进入/退出事件而非连续判定，盒子数量过多会增加检测开销，应合理规划区域粒度。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个BoxTrigger对象，当CustomObject对象或相机Camera… | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 清空场景中所有的BoxTrigger对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个BoxTrigger对象， | 按 ID 移除指定对象 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个BoxTrigger对象，当CustomObject对象或相机Camera对象进入和退出盒子热区范围触发事件相关的操作\r
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
| \`id\` | \`string\` | BoxTrigger对象的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`bbox\` | \`array\` | 绘制触发热区的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
以下为当CustomObject对象或者Camera相机对象进入或退出创建的盒子热区范围内触发返回的事件对象结构\r
\r
\r
CustomObject对象进入热区范围触发OnCustomObjectEnterTrigger事件\r
{\r
   "triggerId": "TriggerID",  //盒子热区范围对象id\r
   "eventtype": "OnCustomObjectEnterTrigger", //事件类型\r
   "objectId": "CustomObjectID" //自定义对象id\r
}\r
\r
CustomObject对象退出热区范围触发OnCustomObjectExitTrigger事件\r
{\r
   "triggerId": "TriggerID",\r
   "eventtype": "OnCustomObjectExitTrigger",\r
   "objectId": "CustomObjectID"\r
} \r
\r
\r
Camera进入热区范围触发OnCameraEnterTrigger事件\r
{\r
   "triggerId": "TriggerID",\r
   "eventtype": "OnCameraEnterTrigger",\r
}\r
\r
Camera退出热区范围触发OnCameraExitTrigger事件\r
{\r
   "triggerId": "TriggerID",\r
   "eventtype": "OnCameraExitTrigger",\r
}\r
\`\`\`\r
\r
> 示例：Add\r
\r
\`\`\`js\r
//十字路口包围盒范围\r
let boxTrigger1 = {\r
    id: "boxTrigger1",\r
    bbox: [\r
        493136.41250000003,\r
        2492002.72,\r
        0,\r
        493178.11375,\r
        2492054.72,\r
        3\r
    ]\r
}\r
fdapi.boxTrigger.clear();\r
//创建盒子范围热区\r
fdapi.boxTrigger.add(boxTrigger1);\r
\r
//创建并移动co对象 触发事件\r
fdapi.customObject.clear();\r
//投影坐标\r
let co_location = [492069.5, 2491585.5, 2.11];\r
let o = {\r
    id: 'o1',//自定义对象唯一id\r
    pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数\r
    assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',//资源目录，自定义对象在pak文件资源包里的相对路径\r
    location: co_location,//位置坐标\r
    coordinateType: 0,// 坐标系类型 \r
    rotation: [0, 0, 0],// 世界坐标系旋转\r
    range: [0, 1000],//可见范围\r
    groupId: "coGroup",//分组id\r
    localRotation: [0, 0, 0],//模型自身旋转\r
    scale: [1, 1, 1],//模型缩放\r
    smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动\r
    enableDecal: false, //可选，是否支持贴画贴合，默认值：true\r
    visible: true,//可选，设置自定义对象加载后是否显示，默认：true\r
    autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z\r
    collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true\r
};\r
await fdapi.customObject.add(o);\r
fdapi.customObject.focus(o.id);\r
\r
//gps轨迹\r
let positionArr = [\r
    [492069.5, 2491585.5, 2.11],\r
    [493136.5625, 2492028, 2.1155762672424316],\r
    [493141.09375, 2492028, 2.1155762672424316],\r
    [493143.71875, 2492027.75, 2.1155762672424316],\r
    [493146.46875, 2492027.75, 2.1155664920806885],\r
    [493150.1875, 2492027.25, 2.1155664920806885],\r
    [493153.625, 2492027, 2.1155664920806885],\r
    [493157.09375, 2492026.75, 2.1155762672424316],\r
    [493160.84375, 2492027, 2.1155567169189453],\r
    [493164.84375, 2492027, 2.1155762672424316],\r
    [493169, 2492026.5, 2.1155860424041748],\r
    [493173.84375, 2492026.25, 2.215576171875],\r
    [493178.125, 2492026.5, 2.1155664920806885],\r
    [493181.71875, 2492026.25, 2.1155762672424316],\r
    [493186.03125, 2492026, 2.1155762672424316],\r
    [493190.09375, 2492026.25, 2.1155664920806885],\r
    [493193.84375, 2492026, 2.1155567169189453],\r
    [493197.46875, 2492025.75, 2.1155664920806885],\r
    [493201.34375, 2492025.75, 2.1155664920806885],\r
    [493205.40625, 2492025.75, 2.1155664920806885]\r
];\r
//构造移动路径点数组\r
let pathPointArr = [];\r
for (let i = 0; i < positionArr.length; i++) {\r
    //构造数组元素 每1秒移动一次\r
    let elementPoint = { 'time': (i) * 0.5, 'coordinate': positionArr[i] };\r
    pathPointArr.push(elementPoint);\r
}\r
//设置相机自动跟随\r
//fdapi.customObject.focus('o1', -1);\r
//设置自定义相机跟随\r
fdapi.customObject.focus('o1', 5, 0, [-30, 4, 0], ActionMode.Follow);\r
//车辆按GPS轨迹移动\r
fdapi.customObject.startMove('o1', 0, pathPointArr);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的BoxTrigger对象\r
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
fdapi.boxTrigger.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个BoxTrigger对象，注意：删除对象后热区和对应触发事件均会删除\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的BoxTrigger对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.boxTrigger.delete('boxTrigger1');\r
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
\``;export{r as default};
