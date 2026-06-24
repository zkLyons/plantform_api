const n=`---\r
title: Decal\r
sidebar_label: Decal\r
description: "Decal 用于将一张贴图沿包围盒投影“喷涂”到三维场景的地表、模型或建筑表面，使图案自然贴合起伏地形与曲面，常用于在实景三维上叠加平面图形信息。"\r
---\r
\r
# Decal\r
\r
Decal 用于将一张贴图沿包围盒投影“喷涂”到三维场景的地表、模型或建筑表面，使图案自然贴合起伏地形与曲面，常用于在实景三维上叠加平面图形信息。\r
\r
\r
\r
![](/img/refdoc/api/Decal.Add.gif)\r
\r
通过 \`api.decal\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Decal 用于将一张贴图沿包围盒投影"喷涂"到三维场景的地表、模型或建筑表面，使图案自然贴合起伏地形与曲面，常用于在实景三维上叠加平面图形信息。\r
- **别名 / 不同行业叫法**：贴花、喷涂、路面标线、污染落区、漫延范围、地面投影、贴地图案、印花。\r
- **适用行业**：智慧城市、智慧水利、应急管理、交通、园区、国防军事。\r
- **使用场景**：\r
  - 应急行业：在三维地形上喷涂危化品泄漏、油污扩散、火场过火范围等污染落区，直观表达影响范围。\r
  - 交通行业：在路面投影车道线、导向箭头、停车位、施工警示标线等路面标记。\r
  - 智慧城市 / 园区：将平面规划图、用地红线、地块色块贴合到真实地表，叠加管理网格或区域标识。\r
- **注意事项**：\r
  - 设置 \`bbox\` 包围盒后 \`location\` 与 \`scale\` 参数失效，二者按需二选一使用。\r
  - \`order\` 层级决定多张贴花叠加时的覆盖关系，值越大越靠上；\`decalBlendMode\` 控制是否剔除 PNG 半透明背景。\r
  - 贴图沿包围盒方向投影，地形起伏过大或贴图分辨率过低时可能出现拉伸或锯齿，应合理选取分辨率与投影范围。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Decal对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的Decal | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Decal对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`focusAll\`](#focusAll) | 自动定位到能观察所有Decal对象的合适距离 | 相机定位到全部对象的合适视角 |\r
| [\`get\`](#get) | 根据ID获取Decal的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`update\`](#update) | 修改一个或多个Decal对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Decal对象\r
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
| \`decalBlendMode\` | \`number\` | 贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花；默认值：0 |\r
| \`order\` | \`number\` | 层级 ：高层级会覆盖掉低层级，即值越大显示越靠上，取值范围：[任意正整数] |\r
| \`texturePath\` | \`string\` | 贴图路径，[资源引入说明](/docs/tutorials/resources) |\r
| \`location\` | \`array\` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，设置bbox后参数失效 |\r
| \`rotation\` | \`array\` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`scale\` | \`array\` | 缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数]，设置bbox后参数失效 |\r
| \`bbox\` | \`array\` | 可选，贴花覆盖的包围盒范围，数组格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素：[任意浮点数]，注意：设置bbox参数后location、scale参数会失效， |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.decal.clear();\r
await fdapi.decal.add({\r
    id: 'd1',\r
    decalBlendMode: 0,//贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花（剔除png半透明）；默认值：0\r
    order: 1,//贴花层级，值越大层级越高，层级最高的显示在最上面一层\r
    texturePath: HostConfig.Path + '/assets/image/decal2.png',//贴图文件路径\r
    location: [494219.3125, 2490657, -0.001054687425494194],\r
    rotation: [-90, 180, 0],\r
    scale: [100, 100, 100]\r
});\r
fdapi.decal.focus('d1', 50);\r
\r
await fdapi.decal.add({\r
    id: 'd2',\r
    decalBlendMode: 1,//贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花；默认值：0\r
    order: 2,//贴花层级，值越大层级越高，层级最高的显示在最上面一层\r
    texturePath: HostConfig.Path + '/assets/image/decal1.png',//贴图文件路径\r
    rotation: [-90, 0, 0],\r
    bbox: [488670.75, 2488165, 0, 491659.59375, 2490987.5, 800.58]\r
});\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的Decal\r
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
fdapi.decal.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Decal对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Decal对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.decal.delete('d1');\r
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
| \`ids\` | \`string \\| array\` | Decal对象的ID或者ID数组 |\r
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
fdapi.decal.focus('d1', 20);\r
\`\`\`\r
\r
---\r
\r
### \`focusAll(distance, flyTime, rotation, fn)\` {#focusAll}\r
\r
自动定位到能观察所有Decal对象的合适距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：FocusAll\r
\r
\`\`\`js\r
fdapi.decal.focusAll();\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Decal的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Decal对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
Decal的详细信息\r
[{\r
            "id":	"d1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "location":	[494219.312500, 2490657.000000, -0.001055],\r
            "rotation":	[-90.000000, -0.000005, -179.999969],\r
            "scale":	[1.000000, 1.000000, 1.000000],\r
            "texturePath":	"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\Cloud\\\\SDK/media/image/decal1.png",\r
            "order":	1\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.decal.get('d1');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Decal对象\r
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
await fdapi.decal.update({\r
    id: 'd1',\r
    order: 1,\r
    decalBlendMode: 1,//剔除png半透明\r
    texturePath: HostConfig.Path + '/assets/image/decal2.png',\r
    rotation: [-90, 0, 0],\r
    scale: [50, 50, 50]\r
});\r
fdapi.decal.focus('d1', 50);\r
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
await fdapi.decal.updateEnd();\r
\`\`\`\r
`;export{n as default};
