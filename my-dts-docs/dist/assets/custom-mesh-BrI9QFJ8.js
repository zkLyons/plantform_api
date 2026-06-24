const r=`---\r
title: CustomMesh\r
sidebar_label: CustomMesh\r
description: "CustomMesh 通过顶点/索引自定义三维网格几何体并着色，构建非标准的面片/体对象。"\r
---\r
\r
# CustomMesh\r
\r
CustomMesh 通过顶点/索引自定义三维网格几何体并着色，构建非标准的面片/体对象。\r
\r
通过 \`api.customMesh\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：CustomMesh 通过顶点/索引自定义三维网格几何体并着色，构建非标准的面片/体对象。\r
- **别名 / 不同行业叫法**：自定义网格 / 几何体 / Mesh / 面片 / 程序化模型。\r
- **适用行业**：工业仿真、能源、科研可视化、智慧城市、BIM\r
- **使用场景**：\r
  - 程序化生成不规则几何（管片、地质体、异形构件）\r
  - 自定义分析结果面/等值面\r
  - 特殊形状的标识体或包络体\r
- **注意事项**：\r
  - 顶点/索引须正确，法线与缠绕方向影响正反面显隐\r
  - 大网格注意性能\r
  - 坐标需与场景一致\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个CustomMesh对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的CustomMesh | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个CustomMesh对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取CustomMesh的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏CustomMesh | 按业务条件隐藏对象 |\r
| [\`setColor\`](#setColor) | 设置颜色 |  |\r
| [\`setCoordinates\`](#setCoordinates) | 设置顶点坐标 |  |\r
| [\`setIndices\`](#setIndices) | 设置顶点索引 |  |\r
| [\`show\`](#show) | 显示CustomMesh | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个CustomMesh对象 | 运行时动态更新对象属性/状态 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个CustomMesh对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | CustomMesh数据，可以是Object类型或者Array类型，对于每一个CustomMesh，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`coordinates\` | \`array\` | 顶点坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`colors\` | \`array\` | 顶点颜色数组，数组长度要和coordinates一致。支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`createCollision\` | \`boolean\` | 是否创建碰撞体，默认值：false |\r
| \`indices\` | \`array\` | 顶点坐标的索引，用来绘制三角网格；数组元素类型：(number)；数组元素顺序：顶点索引顺序需构成三角网格且同为顺时针或逆时针方向；数组元素取值范围：[0~coordinates.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`material\` | \`string\` | 可选参数，替换材质的文件路径，UE工程里材质文件对应资源的相对路径，用于控制材质的不透明度和颜色等效果 |\r
| \`scalarParameters\` | \`array\` | 可选参数，替换材质包含的数值参数，一般用来控制材质不透明度，包含name/value键值对的数组，其中name是字符串，value为数值 |\r
| \`vectorParameters\` | \`array\` | 可选参数，替换材质包含的数组参数，一般用来控制材质颜色，包含name/value键值对的数组，其中name是字符串，value为数组 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.customMesh.clear();\r
await fdapi.customMesh.add({\r
    id: 'sm1',\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    coordinates: [\r
        [492610.125, 2491332.75, 12],\r
        [492866.0625, 2491273.75, 12.23140625655651093],\r
        [492829.21875, 2491114.5, 12.3060156106948853],\r
        [492598.9375, 2491150.75, 14.8240623474121094]\r
    ],//顶点坐标\r
    colors: [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],//顶点颜色\r
    createCollision: false, //不创建碰撞体\r
    indices: [2, 0, 3, 0, 2, 1],// 顶点坐标的索引构成的数组\r
    color: [0.2, 0.5, 0.7, 1], //填充颜色\r
    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/水/水面1",//资源库自带的透明水材质\r
    scalarParameters: [{ "name": "不透明度", "value": 0.5 }], //材质不透明度\r
    vectorParameters: [{ "name": "颜色", "value": [0.2, 0.5, 0.7, 1] }] //材质颜色\r
});\r
fdapi.customMesh.focus('sm1', 120);\r
\r
await fdapi.customMesh.add({\r
    id: 'sm2',\r
    coordinateType: 0,\r
    coordinates: [\r
        [492573.375, 2491107.5, 14.9681248664855957],\r
        [492829.84375, 2491038.25, 14.1167187690734863],\r
        [492822.5, 2490854.75, 13.7651562690734863],\r
        [492560.9375, 2490875.25, 14.2671875953674316]\r
    ],\r
    indices: [2, 0, 3, 0, 2, 1],\r
    color: [0.2, 0.5, 0.7, 1]\r
});\r
fdapi.customMesh.focus('sm2', 100);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的CustomMesh\r
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
fdapi.customMesh.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个CustomMesh对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的CustomMesh对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.customMesh.delete('sm1');\r
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
| \`ids\` | \`string \\| array\` | CustomMesh对象的ID或者ID数组 |\r
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
fdapi.customMesh.focus('sm1', 0);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取CustomMesh的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的CustomMesh对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
CustomMesh的详细信息\r
{\r
            "id":	"sm1",\r
            "groupId":	"",\r
            "userData":	""\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.customMesh.get(['sm1', 'sm2']);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏CustomMesh\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | CustomMesh对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.customMesh.hide(['sm1', 'sm2']);\r
\`\`\`\r
\r
---\r
\r
### \`setColor(id, newVal, fn)\` {#setColor}\r
\r
设置颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 唯一标识符 |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.customMesh.setColor(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setCoordinates(id, newVal, fn)\` {#setCoordinates}\r
\r
设置顶点坐标\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 唯一标识符 |\r
| \`newVal\` | \`array\` | 新的顶点坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.customMesh.setCoordinates(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setIndices(id, newVal, fn)\` {#setIndices}\r
\r
设置顶点索引\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 唯一标识符 |\r
| \`newVal\` | \`array\` | 新顶点坐标的索引，数组元素类型：(number)，数组元素取值范围：[0~coordinates.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.customMesh.setIndices(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示CustomMesh\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | CustomMesh对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.customMesh.show(['sm1', 'sm2']);\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个CustomMesh对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | CustomMesh数据，参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
await fdapi.customMesh.update({\r
    id: 'sm1',\r
    color: [0.2, 0.5, 0.7, 1]\r
});\r
fdapi.customMesh.focus('sm1');\r
\`\`\`\r
`;export{r as default};
