const r=`---\r
title: Marker3D\r
sidebar_label: Marker3D\r
description: "在三维场景中放置带特效的立体标注（动态标记），相较于二维 Marker 具有三维朝向、缩放、旋转与粒子/光效等表现力，并可叠加三维文字，用于强调重点目标或营造动态告警效果。"\r
---\r
\r
# Marker3D\r
\r
动态标记，实现对3D标注对象的操作\r
\r
\r
\r
![](/img/refdoc/api/marker3d_style.gif)\r
\r
通过 \`api.marker3d\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：在三维场景中放置带特效的立体标注（动态标记），相较于二维 Marker 具有三维朝向、缩放、旋转与粒子/光效等表现力，并可叠加三维文字，用于强调重点目标或营造动态告警效果。\r
- **别名 / 不同行业叫法**：三维标注、立体标牌、3D标注点、动态标记、立体告警点。\r
- **适用行业**：智慧城市、应急指挥、智慧交通、能源电力、智慧园区、国防/通信。\r
- **使用场景**：\r
  - 重点目标/重要设施的三维高亮标注与动态特效提示\r
  - 应急告警点位的立体闪烁、光柱等醒目动态表现\r
  - 带三维文字标牌的目标标识，文字可固定朝向或随视角变化\r
- **注意事项**：\r
  - pointName 特效名称需取自 Explorer 资源面板「动态标记」下的显示名称，否则无法显示；\r
  - 三维标注带特效，渲染开销高于普通 Marker，海量场景应控制数量；\r
  - 注意 coordinateType 坐标系与场景一致，pointScale/textScale 取值需合理；\r
  - 文字长度限制 [0~100]，超长会被截断。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new Marker3D()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个动态标记 | 向场景批量添加对象 |\r
| [\`attachObject\`](#attachObject) | 设置Marke3D贴合模型对象CustomObject对象，设置后Marker3D会跟随… |  |\r
| [\`callBPFunction\`](#callBPFunction) | 调用Marker3D对象包含的多个蓝图函数， |  |\r
| [\`clear\`](#clear) | 清空场景中所有的3D标注 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个3D标注对象 | 按 ID 移除指定对象 |\r
| [\`deleteByGroupId\`](#deleteByGroupId) | 根据分组ID删除动态标注 |  |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取3D标注的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`getBPFunction\`](#getBPFunction) | 根据marker3d对象的id查询其包含的蓝图函数信息 |  |\r
| [\`hide\`](#hide) | 隐藏3D标注 | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有3D标注 | 一键隐藏全部对象 |\r
| [\`hideByGroupId\`](#hideByGroupId) | 根据分组ID隐藏动态标注 |  |\r
| [\`setViewHeightRange\`](#setViewHeightRange) | 设置Marker3D对象的可视高度范围 |  |\r
| [\`show\`](#show) | 显示3D标注 | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有3D标注 | 一键显示全部对象 |\r
| [\`showByGroupId\`](#showByGroupId) | 根据分组ID显示动态标注 |  |\r
| [\`update\`](#update) | 修改一个或多个3D标注对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个动态标记\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 动态标记的数据，可以是Object类型或者Array类型，对于每一个3D标注点，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 3D标注的唯一标识符 |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`text\` | \`string\` | 3D标注显示文字，字符长度范围[0~100] |\r
| \`textSize\` | \`number\` | 3D标注显示文字字体大小，默认值：70 |\r
| \`textColor\` | [\`Color\`](/docs/api/types#color) | 3D标注显示文字颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`textOutlineSize\` | \`number\` | 3D标注显示文字轮廓大小 |\r
| \`textOutlineColor\` | [\`Color\`](/docs/api/types#color) | 3D标注显示文字轮廓颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`textFixed\` | \`boolean\` | 3D标注显示文字是否固定文本朝向，默认值：true |\r
| \`fixedSize\` | \`boolean\` | 3D标注是否使用固定尺寸，默认：false 近大远小 |\r
| \`textVisible\` | \`boolean\` | 3D标注显示文字是否显示文本，默认值：true |\r
| \`textLocation\` | \`array\` | 文字位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`textRotation\` | \`array\` | 文字旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`textScale\` | \`array\` | 文字缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |\r
| \`pointName\` | \`string\` | 3D标注展示的特效名称，取值详见Explorer资源面板-&gt;动态标记下的显示名称，取值示例：Point_B_特效编号 |\r
| \`pointVisible\` | \`boolean\` | 3D标注是否显示，默认值：true |\r
| \`pointScale\` | \`number\` | 3D标注整体缩放比例，取值范围：[0.01,任意正数] |\r
| \`coordinate\` | \`array\` | 3D标注的位置坐标: [X,Y,Z]，[取值示例](/docs/tutorials/coordinates) |\r
| \`coordinateType\` | \`number\` | 3D标注的坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`range\` | \`array\` | 3D标注的可视距离范围：[min,max]，单位：米 |\r
| \`viewHeightRange\` | \`array\` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |\r
| \`autoHeight\` | \`boolean\` | 自动判断下方是否有物体，设置正确高度，默认值：false |\r
| \`collision\` | \`boolean\` | 可选，设置Marker3D对象加载后是否开启碰撞，默认：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
let buildingCoordinates = [\r
    [493246.03750000003, 2492213.2800000003, 78],\r
    [493341.226875, 2492221.7600000002, 78],\r
    [493422.123125, 2492210.4, 86],\r
    [493419.294375, 2492088.16, 86],\r
    [493234.26937500003, 2492111.52, 86],\r
    [493404.545, 2491985.7600000002, 86],\r
    [493284.0425, 2491995.84, 86]\r
];\r
fdapi.marker3d.clear();\r
let marker3dArr = [];\r
for (let i = 0; i < buildingCoordinates.length; i++) {\r
\r
    let marker3d = {\r
        'id': 'm' + (i + 1),\r
        'groupId': 'marker3dTest',\r
        'text': 'Building ' + (i + 1),//可选 3D标注显示文字\r
        'textSize': 32,//3D标注显示文字大小\r
        'textColor': '#6BF4F7',//3D标注显示文字颜色\r
        'textOutlineSize': 1,//3D标注显示文字轮廓大小\r
        'textOutlineColor': Color.Black,// 3D标注显示文字轮廓颜色\r
        'textFixed': true,// 3D标注显示文字是否固定文本朝向\r
        'fixedSize': false,// 3D标注是否使用固定尺寸大小，默认：false 近大远小\r
        'textVisible': true,//3D标注显示文字是否显示文本\r
        'textLocation': [0, 0, 0],// 文字位置\r
        'textRotation': [0, 0, 0],// 文字旋转\r
        'textScale': [1, 1, 1],// 文字缩放\r
        'pointName': '3D_UI_C_3',//3D标注展示的特效名称\r
        'pointVisible': true,//3D标注是否显示\r
        'pointScale': 2,//3D标注整体缩放比例\r
        'coordinate': buildingCoordinates[i], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方\r
        'coordinateType': 0, //坐标系类型 \r
        'range': [1, 1000], //3D标注的可视距离范围：[min,max]，单位：米\r
        'viewHeightRange': [0, 1000],//可见高度范围\r
        'autoHeight': false,//自动判断下方是否有物体，设置正确高度，默认值：false\r
        'collision': true //默认开启碰撞\r
    }\r
    marker3dArr.push(marker3d);\r
\r
}\r
await fdapi.marker3d.add(marker3dArr);\r
fdapi.marker3d.focus('m1');\r
\r
//1、批量调用多个蓝图函数，修改文字和背景\r
fdapi.marker3d.callBPFunction([\r
    {\r
        id: 'm1',\r
        functionName: '文字',\r
        parameters: [\r
            { "name": "文字内容", "paramType": 5, "paramValue": "1号楼" },\r
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },\r
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },\r
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }\r
        ]\r
    },\r
    {\r
        id: 'm1',\r
        functionName: '图标',\r
        parameters: [\r
            { "name": "图标样式", "paramType": 16, "paramValue": "城市" },\r
            { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }\r
        ]\r
    },\r
    {\r
        id: 'm2',\r
        functionName: '文字',\r
        parameters: [\r
            { "name": "文字内容", "paramType": 5, "paramValue": "2号楼" },\r
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },\r
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },\r
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]\r
    },\r
    {\r
        id: 'm3',\r
        functionName: '文字',\r
        parameters: [\r
            { "name": "文字内容", "paramType": 5, "paramValue": "3号楼" },\r
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },\r
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },\r
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]\r
    },\r
    {\r
        id: 'm4',\r
        functionName: '文字',\r
        parameters: [\r
            { "name": "文字内容", "paramType": 5, "paramValue": "4号楼" },\r
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },\r
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },\r
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]\r
    },\r
    {\r
        id: 'm5',\r
        functionName: '文字',\r
        parameters: [\r
            { "name": "文字内容", "paramType": 5, "paramValue": "5号楼" },\r
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },\r
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },\r
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]\r
    },\r
    {\r
        id: 'm6',\r
        functionName: '文字',\r
        parameters: [\r
            { "name": "文字内容", "paramType": 5, "paramValue": "6号楼" },\r
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },\r
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },\r
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]\r
    },\r
    {\r
        id: 'm6',\r
        functionName: '图标',\r
        parameters: [\r
            { "name": "图标样式", "paramType": 16, "paramValue": "城市" },\r
            { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }\r
        ]\r
    },\r
    {\r
        id: 'm7',\r
        functionName: '文字',\r
        parameters: [\r
            { "name": "文字内容", "paramType": 5, "paramValue": "7号楼" },\r
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },\r
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },\r
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]\r
    }\r
]);\r
\`\`\`\r
\r
---\r
\r
### \`attachObject(data, fn)\` {#attachObject}\r
\r
设置Marke3D贴合模型对象CustomObject对象，设置后Marker3D会跟随模型运动\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 自定义对象和三维标注映射绑定的数据结构，可以是Object类型或者Array类型，对于每一个映射对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`marker3dId\` | \`string\` | 三维标注Marker3D对象id |\r
| \`objectId\` | \`string\` | 贴合的CustomObject自定义对象 |\r
| \`offset\` | \`array\` | 坐标偏移量，[X,Y,Z]，[取值示例](/docs/tutorials/coordinates) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.marker3d.attachObject(data);\r
\`\`\`\r
\r
---\r
\r
### \`callBPFunction(data, fn)\` {#callBPFunction}\r
\r
调用Marker3D对象包含的多个蓝图函数，注意：可以根据marker3d的对象id查询包含的所有蓝图函数 fdapi.misc.getBPFunction(id);\r
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
| \`id\` | \`string\` | CustomObject对象的ID |\r
| \`functionName\` | \`string\` | 蓝图函数名 |\r
| \`parameters\` | \`array\` | 蓝图函数包含的多个参数，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
蓝图函数调用的示例代码 注意：被调用函数传入的参数类型、参数顺序都必须和蓝图函数的参数类型、顺序完全保持一致！\r
 fdapi.marker3d.callBPFunction([\r
            {\r
                id: 'm1',\r
                functionName: '文字',\r
                parameters: [\r
                    { "name": "文字内容", "paramType": 5, "paramValue": "1号楼" },\r
                    { "name": "文字大小", "paramType": 2, "paramValue": 64 },\r
                    { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },\r
                    { "name": "背景倒角", "paramType": 3, "paramValue": 1 }\r
                ]\r
            },\r
            {\r
                id: 'm2',\r
                functionName: '图标',\r
                parameters: [\r
                    { "name": "图标样式", "paramType": 16, "paramValue": "城市" },\r
                    { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }\r
                ]\r
            }\r
        ]);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的3D标注\r
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
fdapi.marker3d.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个3D标注对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的3D标注对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.marker3d.delete(['m1', 'm2']);\r
\`\`\`\r
\r
---\r
\r
### \`deleteByGroupId(groupId, fn)\` {#deleteByGroupId}\r
\r
根据分组ID删除动态标注\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 动态标注创建时指定的分组ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：DeleteByGroupId\r
\r
\`\`\`js\r
fdapi.marker3d.deleteByGroupId('marker3dTest');\r
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
| \`ids\` | \`string \\| array\` | 3D标注对象的ID或者ID数组 |\r
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
fdapi.marker3d.focus('m1', 100, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取3D标注的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的3D标注对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回3DMarker的详细信息\r
{\r
        "id": "m1",\r
        "text": "3DMarker-Add",//3D标注显示文字\r
        "textSize" : 18,//3D标注显示文字大小\r
        "textColor ": Color.Blue,//3D标注显示文字颜色\r
        "textOutlineSize": 1,//3D标注显示文字轮廓大小\r
        "textOutlineColor" : Color.Black,// 3D标注显示文字轮廓颜色\r
        "textFixed": true,// 3D标注显示文字是否固定文本朝向\r
        "textVisible": true,//3D标注显示文字是否显示文本\r
        "textLocation": [0,0,0],// 文字位置\r
        "textRotation": [0,0,0],// 文字旋转\r
        "textScale": [1,1,1],// 文字缩放\r
        "pointName": "Point_B_1",//3D标注展示的特效名称\r
        "pointVisible": true,//3D标注是否显示\r
        "pointScale": 5,//3D标注整体缩放比例\r
        "coordinate": [0, 0, 10]//3D标注的位置坐标\r
    }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.marker3d.get('m1');\r
fdapi.marker3d.get(['m1', 'm2']);\r
\`\`\`\r
\r
---\r
\r
### \`getBPFunction(ids, fn)\` {#getBPFunction}\r
\r
根据marker3d对象的id查询其包含的蓝图函数信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 3D标注对象ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：GetBPFunction\r
\r
\`\`\`js\r
fdapi.marker3d.getBPFunction(['m1', 'm2']);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏3D标注\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 3D标注对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.marker3d.hide(['m1']);\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有3D标注\r
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
fdapi.marker3d.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`hideByGroupId(groupId, fn)\` {#hideByGroupId}\r
\r
根据分组ID隐藏动态标注\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 动态标注创建时指定的分组ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideByGroupId\r
\r
\`\`\`js\r
fdapi.marker3d.hideByGroupId('marker3dTest');\r
\`\`\`\r
\r
---\r
\r
### \`setViewHeightRange(id, minVisibleHeight, maxVisibleHeight, fn)\` {#setViewHeightRange}\r
\r
设置Marker3D对象的可视高度范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Marker3D对象的ID |\r
| \`minVisibleHeight\` | \`number\` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`maxVisibleHeight\` | \`number\` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetViewHeightRange\r
\r
\`\`\`js\r
fdapi.marker3d.setViewHeightRange('m1', 1, 1000);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示3D标注\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 3D标注对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.marker3d.show('m1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有3D标注\r
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
fdapi.marker3d.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`showByGroupId(groupId, fn)\` {#showByGroupId}\r
\r
根据分组ID显示动态标注\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 动态标注创建时指定的分组ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowByGroupId\r
\r
\`\`\`js\r
fdapi.marker3d.showByGroupId('marker3dTest');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个3D标注对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`data \\| array\` | 3D标注点的数据，参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let o = {\r
    'id': 'm1',\r
    'text': 'Building No.1',\r
    'pointScale': 3,//整体缩放\r
    'textSize': 20,\r
    'pointName': 'Point_B_5',\r
    'textColor': [1, 0, 0, 1]\r
}\r
await fdapi.marker3d.update(o);\r
fdapi.marker3d.focus(o.id);\r
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
await fdapi.marker3d.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> AttachObject\r
\r
\`\`\`js\r
let pathArr = [[493136.3984375, 2492031.250371094, 2.11556640625], [493132.4771875, 2492031.4994921875, 2.11556640625], [493128.74062500003, 2492031.5835742187, 2.11556640625], [493124.98, 2492031.840625, 2.1155712890625002], [493120.6296875, 2492032.08796875, 2.1155615234375], [493117.944375, 2492032.153203125, 2.1155615234375], [493114.4884375, 2492032.482265625, 2.1155712890625002], [493110.6075, 2492032.656621094, 2.11556640625], [493107.4746875, 2492032.7945117187, 2.11556640625], [493103.60375, 2492032.8875390626, 2.11556640625], [493099.8784375, 2492033.1425195313, 2.1155712890625002], [493096.0109375, 2492033.379375, 2.11556640625], [493090.8096875, 2492033.5093359374, 2.11556640625], [493086.20875, 2492033.771933594, 2.1155615234375], [493082.2109375, 2492034.0263476563, 2.11556640625], [493078.205625, 2492034.1098046876, 2.11556640625]];\r
fdapi.marker3d.clear();\r
let o = {\r
    'id': 'm3d1',\r
    'groupId': 'marker3dTest',\r
    'text': '',//3D标注显示文字\r
    'textSize': 64,//3D标注显示文字大小\r
    'textColor': '#6BF4F7',//3D标注显示文字颜色\r
    'textOutlineSize': 1,//3D标注显示文字轮廓大小\r
    'textOutlineColor': Color.Black,// 3D标注显示文字轮廓颜色\r
    'textFixed': false,// 3D标注显示文字是否固定文本朝向\r
    'fixedSize': true,// 默认尺寸 非近大远小\r
    'textVisible': true,//3D标注显示文字是否显示文本\r
    'textLocation': [0, 0, 0],// 文字位置\r
    'textRotation': [90, 0, 0],// 文字旋转\r
    'textScale': [1, 1, 1],// 文字缩放\r
    'pointName': 'Point_B_7',//3D标注展示的特效名称\r
    'pointVisible': true,//3D标注是否显示\r
    'pointScale': 2,//3D标注整体缩放比例\r
    'coordinate': pathArr[0], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方\r
    'coordinateType': 0, //坐标系类型 \r
    'range': [1, 10000], //3D标注的可视距离范围：[min,max]，单位：米\r
    'autoHeight': false,//自动判断下方是否有物体，设置正确高度，默认值：false\r
    'collision': true //默认开启碰撞\r
}\r
fdapi.marker3d.add(o);\r
\r
//添加前清空所有customObject 防止id重复\r
fdapi.customObject.clear();\r
//添加车辆\r
let co = {\r
    id: 'co1', //自定义对象唯一id\r
    pakFilePath: '@path:DTS_Library.pak', //pak文件路径\r
    assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe', //资源目录，自定义对象在pak文件资源包里的相对路径\r
    location: pathArr[0], //位置坐标\r
    coordinateType: 0, // 坐标系类型 \r
    rotation: [0, 0, 0], //旋转\r
    scale: [1, 1, 1], //缩放\r
    smoothMotion: 1, //1: 平滑插值，0: 跳跃\r
};\r
fdapi.customObject.add(co);\r
\r
//设置贴合，支持数组类型，多个对象贴合\r
fdapi.marker3d.attachObject([{\r
    marker3dId: 'm3d1', //三维标注id\r
    objectId: 'co1', //自定义对象id\r
    offset: [0, 0, 2.2] //偏移量\r
}]);\r
\r
//构造移动路径点数组\r
let pathPointArr = [];\r
for (let i = 0; i < pathArr.length; i++) {\r
    //构造数组元素 每1秒移动一次\r
    let elementPoint = { 'time': (i) * 0.5, 'coordinate': pathArr[i] };\r
    pathPointArr.push(elementPoint);\r
}\r
//设置相机自动跟随\r
fdapi.customObject.focus('co1', -1);\r
//设置自定义相机跟随\r
//fdapi.customObject.focus('co1', 5, 0, [-30, 4, 0], ActionMode.Follow);\r
//车辆按GPS轨迹移动\r
fdapi.customObject.startMove('co1', 0, pathPointArr);\r
\`\`\`\r
\r
> CallBPFunction\r
\r
\`\`\`js\r
//查询蓝图函数包含的参数信息 \r
let res = await fdapi.marker3d.getBPFunction(['m1', 'm2']);\r
let functionArr = res.data[0].params;\r
\r
fdapi.marker3d.focus('m1', 20);\r
\r
//蓝图函数 使用自定义图片修改图标\r
fdapi.marker3d.callBPFunction([\r
    {\r
        id: 'm1',\r
        functionName: '文字',\r
        parameters: [\r
            { "name": "文字内容", "paramType": 5, "paramValue": "1号楼民居" },\r
            { "name": "文字大小", "paramType": 2, "paramValue": 100 },\r
            { "name": "背景颜色", "paramType": 6, "paramValue": [1, 1, 0, 1] },\r
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }\r
        ]\r
    },\r
    {\r
        id: 'm1',\r
        functionName: 'H_自定义图标',\r
        parameters: [\r
            { "name": "图标路径", "paramType": 17, "paramValue": HostConfig.Path + "/locale/zh/images/tag.png" },\r
        ]\r
    }\r
]);\r
\`\`\`\r
`;export{r as default};
