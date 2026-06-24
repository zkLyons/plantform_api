const n=`---\r
title: BattlefieldSimulation\r
sidebar_label: BattlefieldSimulation\r
description: "BattlefieldSimulation 加载并驱动装甲车、坦克、无人机、士兵等作战单元，模拟战场机动、编队与态势演进。"\r
---\r
\r
# BattlefieldSimulation\r
\r
BattlefieldSimulation 加载并驱动装甲车、坦克、无人机、士兵等作战单元，模拟战场机动、编队与态势演进。\r
\r
通过 \`api.battlefieldSimulation\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：BattlefieldSimulation 加载并驱动装甲车、坦克、无人机、士兵等作战单元，模拟战场机动、编队与态势演进。\r
- **别名 / 不同行业叫法**：战场仿真 / 兵棋推演 / 态势推演 / 军事仿真 / 作战模拟。\r
- **适用行业**：国防军事、军事训练、应急演练（可类比）、安防推演\r
- **使用场景**：\r
  - 作战方案推演与多兵种协同机动的可视化\r
  - 训练复盘与战场态势回放\r
  - 红蓝对抗与力量部署演示\r
- **注意事项**：\r
  - 作战单元数量大时需关注性能与 LOD\r
  - 机动轨迹与时序数据须规范\r
  - 通常与态势标绘(Plot)、波束(Beam)等配合呈现完整态势\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 初始化一个BattlefieldSimulation对象 | 向场景批量添加对象 |\r
| [\`delete\`](#delete) | 删除一个或多个BattlefieldSimulation对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`update\`](#update) | 更新一个时刻的BattlefieldSimulation对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(battlefieldSimulation, fn)\` {#add}\r
\r
初始化一个BattlefieldSimulation对象\r
\r
展示效果如下动图：\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`battlefieldSimulation\` | \`object\` | 战场仿真对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`battlefieldSimulation\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | BattlefieldSimulation对象的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组Id |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |\r
| \`noiseThreshold\` | \`number\` | 可选，车辆摆头的降噪距离，单位：米，默认值：0.05 |\r
| \`delay\` | \`number\` | 可选，控制车辆移动的延迟时间，单位：秒，默认值：0.5，设置0则不延时立刻移动 |\r
| \`timer\` | \`boolean\` | 设置为false使用dat数据内的时间字段time，设置为true则使用定时器的时间间隔，默认：false， |\r
| \`models\` | \`array\` | 战场仿真包含的作战单元对象模型类型数组，注意：只需要在add()方法执行时配置，每一个数组元素对象包含属性如下： |\r
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
                "userData": "战场仿真",\r
                "delay": 1,\r
                "noiseThreshold": 0.05,  //车辆降噪距离 \r
                "timer": false,// 禁用定时器时间间隔，使用dat数据内的time字段         \r
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
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个BattlefieldSimulation对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的BattlefieldSimulation对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.battlefieldSimulation.delete("battlefield");\r
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
| \`ids\` | \`string \\| array\` | BattlefieldSimulation对象的ID或者ID数组 |\r
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
fdapi.battlefieldSimulation.focus("battlefield", 100);\r
\`\`\`\r
\r
---\r
\r
### \`update(battlefieldSimulation, fn)\` {#update}\r
\r
更新一个时刻的BattlefieldSimulation对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`battlefieldSimulation\` | \`object\` | 战场仿真对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`battlefieldSimulation\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | BattlefieldSimulation对象的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组Id |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`file\` | \`string\` | 某个时刻的多辆车的轨迹点数据文件路径，包含：车辆id、车辆经度、车辆纬度、车辆类型、时间、车辆朝向。二进制文件格式(.dat)，包含内容如下：id(int 4字节),lon(double 8字节),lat(double 8字节),type(int 4字节),time(int 4字节),heading(float 4字节) |\r
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |\r
| \`noiseThreshold\` | \`number\` | 车辆摆头的降噪距离，单位：米，默认值：0.05 |\r
| \`timer\` | \`boolean\` | 设置为false使用dat数据内的时间字段time，设置为true则使用定时器的时间间隔，默认：false， |\r
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
        }\r
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
await fdapi.battlefieldSimulation.updateEnd();\r
\`\`\`\r
`;export{n as default};
