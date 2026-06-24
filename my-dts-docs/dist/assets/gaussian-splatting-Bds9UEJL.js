const n=`---\r
title: GaussianSplatting\r
sidebar_label: GaussianSplatting\r
description: "GaussianSplatting 加载并渲染 3D 高斯泼溅(3DGS)重建成果，呈现照片级实景三维。"\r
---\r
\r
# GaussianSplatting\r
\r
GaussianSplatting类对象，提供3D高斯泼溅相关操作\r
\r
通过 \`api.gaussianSplatting\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：GaussianSplatting 加载并渲染 3D 高斯泼溅(3DGS)重建成果，呈现照片级实景三维。\r
- **别名 / 不同行业叫法**：高斯泼溅 / 3DGS / 高斯溅射 / 实景重建 / 照片级实景 / 辐射场重建。\r
- **适用行业**：实景三维、文博文旅、智慧城市、应急测绘、工业巡检\r
- **使用场景**：\r
  - 文物、设备、事故现场等小场景的高保真实景还原\r
  - 实景与传统模型混合展示\r
  - 高真实感的汇报与展示\r
- **注意事项**：\r
  - 3DGS 数据体量大，对显存敏感\r
  - 适合局部高保真，不适合大范围铺设\r
  - 与传统模型混排时注意遮挡与深度关系\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个GaussianSplatting对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的GaussianSplatting | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个GaussianSplatting对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取GaussianSplatting的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏GaussianSplatting对象 | 按业务条件隐藏对象 |\r
| [\`show\`](#show) | 显示GaussianSplatting对象 | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个GaussianSplatting对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(gaussianSplatting, fn)\` {#add}\r
\r
添加一个GaussianSplatting对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`gaussianSplatting\` | \`object\` | 对象数据结构，对象支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`gaussianSplatting\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`filePath\` | \`string\` | ply文件路径，资源文件引入方式：*.ply，[资源引入说明](/docs/tutorials/resources) |\r
| \`origin\` | \`array\` | 倾斜影像数据中心点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，设置bbox后参数失效 |\r
| \`rotation\` | \`array\` | 可选，旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`scale\` | \`array\` | 可选，缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数]，设置bbox后参数失效 |\r
| \`degree\` | \`number\` | 可选，色阶，取值范围 [0~3]，默认值：0 |\r
| \`splatScale\` | \`number\` | 可选，高斯点影响范围，默认：1.0 |\r
| \`spriteSize\` | \`number\` | 可选，绘制大小，默认值：3.0 |\r
| \`opacityCull\` | \`number\` | 可选，透明度剔除，取值范围：[0~1]，默认值：0.3 |\r
| \`collision\` | \`boolean\` | 可选，模型加载后是否开启碰撞，默认值：false |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
let path = HostConfig.Path + "/assets/";\r
await fdapi.gaussianSplatting.delete('gs3d');\r
let gs3d = {\r
    id: "gs3d",\r
    coordinateType: 0,\r
    filePath: path + "ply/gs3d.ply",\r
    origin: [0, 0, 0],//可选 数据中心点\r
    rotation: [0, 0, 0],//可选 对象旋转\r
    scale: [1, 1, 1],//可选 对象缩放\r
    degree: 0,//  可选 色阶 0-3\r
    splatScale: 1.0,//可选 高斯点影响范围 无限制\r
    spriteSize: 3.0,//可选 绘制大小 无限制\r
    opacityCull: 0.3,//可选 透明度剔除 0-1\r
    collision: false //可选 是否开启碰撞 开启后消耗性能\r
}\r
fdapi.gaussianSplatting.add(gs3d);\r
fdapi.gaussianSplatting.focus('gs3d');\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的GaussianSplatting\r
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
fdapi.gaussianSplatting.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个GaussianSplatting对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的GaussianSplatting对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.gaussianSplatting.delete('gs3d');\r
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
| \`ids\` | \`string \\| array\` | GaussianSplatting对象的ID或者ID数组 |\r
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
fdapi.gaussianSplatting.focus('gs3d');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取GaussianSplatting的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的GaussianSplatting对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
GaussianSplatting的详细信息\r
[{\r
            "id":	"d1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "location":	[494219.312500, 2490657.000000, -0.001055],\r
            "rotation":	[-90.000000, -0.000005, -179.999969],\r
            "scale":	[1.000000, 1.000000, 1.000000],\r
            "texturePath":	"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\Cloud\\\\SDK/media/image/1.png",\r
            "order":	1\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.gaussianSplatting.get('gs3d');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏GaussianSplatting对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | GaussianSplatting对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.gaussianSplatting.hide('gs3d');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示GaussianSplatting对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | GaussianSplatting对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.gaussianSplatting.show('gs3d');\r
\`\`\`\r
\r
---\r
\r
### \`update(gaussianSplatting, fn)\` {#update}\r
\r
修改一个GaussianSplatting对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`gaussianSplatting\` | \`object\` | 待更新的高斯泼溅对象，结构参考add()方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let path = HostConfig.Path + "/assets/";\r
let gs3d_update = {\r
    id: "gs3d",\r
    coordinateType: 0,\r
    filePath: path + "ply/gs3d.ply",\r
    origin: [0, 0, 0],//可选 数据中心点\r
    rotation: [90, 0, 0],//可选 对象旋转\r
    scale: [1, 1, 1],//可选 对象缩放\r
    degree: 2,//  可选 色阶 0-3\r
    splatScale: 1.0,//可选 高斯点影响范围 无限制\r
    spriteSize: 3.0,//可选 绘制大小 无限制\r
    opacityCull: 0.5,//可选 透明度剔除 0-1\r
    collision: true //可选 是否开启碰撞 开启后消耗性能\r
}\r
fdapi.gaussianSplatting.update(gs3d_update);\r
fdapi.gaussianSplatting.focus('gs3d');\r
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
await fdapi.gaussianSplatting.updateEnd();\r
\`\`\`\r
`;export{n as default};
