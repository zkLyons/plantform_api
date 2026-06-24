const n=`---\r
title: SplineMesh\r
sidebar_label: SplineMesh\r
description: "沿坐标轨迹放样生成带截面体量的三维路径模型，将模型沿样条曲线延展，用于表达具有真实粗细的管道、线缆、管廊等线状实体，支持内置样式或自定义模型路径。"\r
---\r
\r
# SplineMesh\r
\r
沿坐标轨迹放样生成带截面体量的三维路径模型，将模型沿样条曲线延展，用于表达具有真实粗细的管道、线缆、管廊等线状实体，支持内置样式或自定义模型路径。\r
\r
通过 \`api.splineMesh\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：沿坐标轨迹放样生成带截面体量的三维路径模型，将模型沿样条曲线延展，用于表达具有真实粗细的管道、线缆、管廊等线状实体，支持内置样式或自定义模型路径。\r
- **别名 / 不同行业叫法**：样条管线、管道、管线模型、线缆、管廊、放样模型、路径模型、传送带。\r
- **适用行业**：能源、智慧水利、智慧城市、园区、交通、国防。\r
- **使用场景**：\r
  - 给排水、油气、电力、热力等管线的三维实体建模与管径可视化。\r
  - 综合管廊、地下管网的立体路径展示与漫游巡检。\r
  - 输送带、缆车索道、轨道等连续线状设施的体量化表达。\r
- **注意事项**：\r
  - 相比 Polyline 的贴地/空间折线，SplineMesh 是有截面体量的三维实体，渲染开销更高，数量多时需控制。\r
  - curveType 与 segment 控制曲线插值类型与分段数，分段过密会增加面数、影响性能。\r
  - style 与 meshPath 二选一，传入 meshPath 自定义样式会自动覆盖内置 style。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个SplineMesh对象，绘制路径模型 | 向场景批量添加对象 |\r
| [\`callBPFunction\`](#callBPFunction) | 调用splineMesh对象包含的多个蓝图函数 |  |\r
| [\`clear\`](#clear) | 清空场景中所有的SplineMesh对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个SplineMesh对象 | 按 ID 移除指定对象 |\r
| [\`deleteByGroupId\`](#deleteByGroupId) | 根据分组ID删除SplineMesh |  |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取SplineMesh对象的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`getBPFunction\`](#getBPFunction) | 根据splineMesh对象的id查询其包含的蓝图函数信息 |  |\r
| [\`hide\`](#hide) | 隐藏一个或多个SplineMesh对象 | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有SplineMesh对象 | 一键隐藏全部对象 |\r
| [\`hideByGroupId\`](#hideByGroupId) | 根据分组ID隐藏SplineMesh |  |\r
| [\`show\`](#show) | 显示一个或多个SplineMesh对象 | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有SplineMesh对象 | 一键显示全部对象 |\r
| [\`showByGroupId\`](#showByGroupId) | 根据分组ID显示SplineMesh |  |\r
| [\`update\`](#update) | 修改一个或多个SplineMesh对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个SplineMesh对象，绘制路径模型\r
\r
展示效果如下动图：\r
\r
\r
\r
![](/img/refdoc/api/SplineMesh.gif)\r
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
| \`id\` | \`string\` | SplineMesh对象的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |\r
| \`coordinates\` | \`array\` | 必选，路径模型的轨迹坐标数组，取值示例：[取值示例](/docs/tutorials/coordinates) |\r
| \`style\` | [\`SplineMeshStyle\`](/docs/api/types#splinemeshstyle) | (\`SplineMeshStyle\`) 可选(二选一)，路径模型内置样式枚举，取值详情参考 \`SplineMeshStyle\` |\r
| \`meshPath\` | \`string\` | 可选(二选一)，路径模型自定义样式的打包路径，注意：若传入此路径会自动覆盖style样式 |\r
| \`range\` | \`array\` | 可选，可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |\r
| \`scale\` | \`number\` | 可选，路径模型的整体缩放，默认值：1 |\r
| \`curveType\` | \`number\` | 可选，路径模型绘制时曲线的插值类型，取值范围：[0,1]，默认值：0 |\r
| \`segment\` | \`number\` | 可选，路径模型的绘制时曲线的插值的分段数量，默认值：10 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
//添加前清空\r
fdapi.splineMesh.clear();\r
//执行添加\r
await fdapi.splineMesh.add([{\r
    id: 'splineMesh0',\r
    groupId: "group_sm",\r
    userData: "路径模型0",\r
    coordinateType: 0,// 坐标系类型\r
    coordinates: [\r
        //围挡样式需要坐标的顺序和闭合关系\r
        [493323.92, 2491434.1803125, 0],\r
        [493024.968125, 2491471.44875, 0],\r
        [492990.035625, 2491309.6234375, 0],\r
        [493249.5775, 2491251.4575, 0],\r
        [493323.92, 2491434.1803125, 0],\r
\r
    ],//路径模型坐标数组\r
    range: [0, 10000],// 可见范围\r
    scale: 10, //路径模型的缩放值，默认值：1\r
    style: SplineMeshStyle.Fence_2 //样式枚举\r
}, {\r
    id: 'splineMesh1',\r
    groupId: "group_sm",\r
    userData: "路径模型1",\r
    coordinateType: 0,// 坐标系类型\r
    coordinates: [\r
        [492922.25, 2491069.25, 2],\r
        [493187.5, 2490997.5, 2],\r
        [493247.875, 2491182, 2],\r
        [492972.53125, 2491265, 2],\r
    ],//路径模型坐标数组\r
    range: [0, 10000],// 可见范围\r
    scale: 10, //路径模型的缩放值，默认值：1\r
    style: SplineMeshStyle.Pipe //样式枚举\r
}, {\r
    id: 'splineMesh2',\r
    groupId: "group_sm",\r
    userData: "路径模型2",\r
    coordinateType: 0,// 坐标系类型\r
    coordinates: [[493381.7971875, 2490992.06375, 10],\r
    [493488.2153125, 2491400.73046875, 20],\r
    [493602.3565625, 2491485.768984375, 30],\r
    [493731.93343750003, 2491515.048671875, 50],\r
    [493789.85281250003, 2491384.991640625, 60],\r
    [493776.03625, 2491302.76265625, 80],\r
    [493750.6428125, 2491173.12140625, 99]],//路径模型坐标数组\r
    range: [0, 10000],// 可见范围\r
    scale: 10, //路径模型的缩放值，默认值：1\r
    meshPath: "/JC_CustomAssets/SplineLibrary/Exhibition/其他/矩形管道" //自定义样式的路径 注意：传入后会自动覆盖style参数\r
}]);\r
fdapi.splineMesh.focus('splineMesh1', 50);\r
\r
//批量调用多个蓝图函数，函数名称为【颜色】【透明度】【矩形】的蓝图函数\r
fdapi.splineMesh.callBPFunction([\r
    {\r
        id: 'splineMesh1',\r
        functionName: '透明度',\r
        parameters: [\r
            { "paramType": 3, "paramValue": 5 }\r
        ]\r
    },\r
    {\r
        id: 'splineMesh1',\r
        functionName: '颜色',\r
        parameters: [\r
            { "paramType": 6, "paramValue": [1, 1, 0, 1] }\r
        ]\r
    }, {\r
        id: 'splineMesh2',\r
        functionName: "矩形",\r
        parameters: [{\r
            name: "矩形颜色",\r
            paramType: 6,\r
            paramValue: [0, 1, 0, 1]\r
        }, {\r
            name: "矩形亮度",\r
            paramType: 3,\r
            paramValue: 10\r
        }, {\r
            name: "矩形不透明度",\r
            paramType: 3,\r
            paramValue: 1\r
        }, {\r
            name: "光流速度",\r
            paramType: 3,\r
            paramValue: 0.1\r
        }, {\r
            name: "光流密度",\r
            paramType: 2,\r
            paramValue: 0\r
        }]\r
    }\r
]);\r
\`\`\`\r
\r
---\r
\r
### \`callBPFunction(data, fn)\` {#callBPFunction}\r
\r
调用splineMesh对象包含的多个蓝图函数\r
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
> 示例：CallBPFunction\r
\r
\`\`\`js\r
//查询蓝图函数包含的参数信息 \r
let res = await fdapi.splineMesh.getBPFunction(['splineMesh1']);\r
let functionArr = res.data[0].params;\r
\r
//批量调用多个蓝图函数，函数名称为【颜色】【透明度】的蓝图函数\r
fdapi.splineMesh.callBPFunction([\r
    {\r
        id: 'splineMesh1',\r
        functionName: '透明度',\r
        parameters: [\r
            { "paramType": 3, "paramValue": 10 }\r
        ]\r
    },\r
    {\r
        id: 'splineMesh1',\r
        functionName: '颜色',\r
        parameters: [\r
            { "paramType": 6, "paramValue": [1, 0, 0, 1] }\r
        ]\r
    },\r
    {\r
        id: 'splineMesh2',\r
        functionName: '颜色',\r
        parameters: [\r
            { "paramType": 6, "paramValue": [1, 1, 0, 1] }\r
        ]\r
    },\r
    {\r
        id: 'splineMesh2',\r
        functionName: '透明度',\r
        parameters: [\r
            { "paramType": 3, "paramValue": 8 }\r
        ]\r
    },\r
]);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的SplineMesh对象\r
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
fdapi.splineMesh.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个SplineMesh对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的SplineMesh对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.splineMesh.delete(['splineMesh1', 'splineMesh2']);\r
\`\`\`\r
\r
---\r
\r
### \`deleteByGroupId(groupId, fn)\` {#deleteByGroupId}\r
\r
根据分组ID删除SplineMesh\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 创建SplineMesh对象时指定的分组ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：DeleteByGroupId\r
\r
\`\`\`js\r
fdapi.splineMesh.deleteByGroupId('group_sm');\r
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
| \`ids\` | \`string \\| array\` | SplineMesh对象的ID或者ID数组 |\r
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
fdapi.splineMesh.focus('splineMesh1', 100);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取SplineMesh对象的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的SplineMesh对象的SplineMesh对象的ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
splineMesh对象的详细信息\r
[{\r
            "id":"vc1",\r
            "groupId": "car_main_road",\r
            "userData": "car_info"\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.splineMesh.get(['splineMesh1', 'splineMesh2']);\r
\`\`\`\r
\r
---\r
\r
### \`getBPFunction(ids, fn)\` {#getBPFunction}\r
\r
根据splineMesh对象的id查询其包含的蓝图函数信息\r
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
fdapi.splineMesh.getBPFunction(['splineMesh1']);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏一个或多个SplineMesh对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | SplineMesh对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.splineMesh.hide(['splineMesh1', 'splineMesh2']);\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有SplineMesh对象\r
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
fdapi.splineMesh.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`hideByGroupId(groupId, fn)\` {#hideByGroupId}\r
\r
根据分组ID隐藏SplineMesh\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 创建SplineMesh对象时指定的分组ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideByGroupId\r
\r
\`\`\`js\r
fdapi.splineMesh.hideByGroupId('group_sm');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示一个或多个SplineMesh对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | SplineMesh对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.splineMesh.show(['splineMesh1', 'splineMesh2']);\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有SplineMesh对象\r
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
fdapi.splineMesh.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`showByGroupId(groupId, fn)\` {#showByGroupId}\r
\r
根据分组ID显示SplineMesh\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 创建SplineMesh对象时指定的分组ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowByGroupId\r
\r
\`\`\`js\r
fdapi.splineMesh.showByGroupId('group_sm');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个SplineMesh对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | SplineMesh对象或者数组，支持更新以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 根据SplineMesh对象的ID更新以下属性 |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinates\` | \`array\` | 路径模型的轨迹坐标数组，取值示例：[取值示例](/docs/tutorials/coordinates) |\r
| \`range\` | \`array\` | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |\r
| \`forwardAxis\` | \`number\` | 路径模型的轴朝向，取值范围：[0,1,2] 分别对应X、Y、Z三个轴 |\r
| \`scale\` | \`number\` | 路径模型轴朝向的缩放值，默认值：1 |\r
| \`style\` | [\`SplineMeshStyle\`](/docs/api/types#splinemeshstyle) | (\`SplineMeshStyle\`) 路径模型样式枚举，取值详情参考 \`SplineMeshStyle\` |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
await fdapi.splineMesh.update({\r
    id: 'splineMesh1',\r
    coordinates: [\r
        [492972.53125, 2491265, 22],\r
        [493247.875, 2491182, 82],\r
        [493187.5, 2490997.5, 108],\r
        [492922.25, 2491069.25, 286],\r
    ],//路径模型坐标数组\r
    range: [0, 5000],// 可见范围\r
    scale: 10,\r
});\r
fdapi.splineMesh.focus('splineMesh1', 100);\r
\r
\r
//批量调用多个蓝图函数，函数名称为【颜色】【透明度】的蓝图函数\r
fdapi.splineMesh.callBPFunction([\r
    {\r
        id: 'splineMesh1',\r
        functionName: '透明度',\r
        parameters: [\r
            { "paramType": 3, "paramValue": 3 }\r
        ]\r
    },\r
    {\r
        id: 'splineMesh1',\r
        functionName: '颜色',\r
        parameters: [\r
            { "paramType": 6, "paramValue": [1, 0, 0, 1] }\r
        ]\r
    },\r
    {\r
        id: 'splineMesh2',\r
        functionName: '透明度',\r
        parameters: [\r
            { "paramType": 3, "paramValue": 3 }\r
        ]\r
    },\r
    {\r
        id: 'splineMesh2',\r
        functionName: '颜色',\r
        parameters: [\r
            { "paramType": 6, "paramValue": [1, 0, 1, 1] }\r
        ]\r
    }\r
]);\r
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
await fdapi.splineMesh.updateEnd();\r
\`\`\`\r
`;export{n as default};
