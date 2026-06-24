const n=`---\r
title: InfoTree\r
sidebar_label: InfoTree\r
description: "管理场景图层树（目录树），提供对树上对象的定位、显隐控制、查询及蓝图函数调用，是组织与联动场景内置对象的统一入口。"\r
---\r
\r
# InfoTree\r
\r
管理场景图层树（目录树），提供对树上对象的定位、显隐控制、查询及蓝图函数调用，是组织与联动场景内置对象的统一入口。\r
\r
通过 \`api.infoTree\` 访问。\r
\r
---\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：管理场景中的图层树（目录树）结构，提供对树上对象的定位（focus）、显隐控制、查询及调用对象所挂蓝图函数（callBPFunction）等操作，是组织和联动场景内置对象的统一入口。\r
- **别名 / 不同行业叫法**：图层树 / 目录树 / 场景树 / 图层目录 / Layers 树。\r
- **适用行业**：智慧城市、智慧园区、智慧水利、应急管理、智慧交通、能源电力。\r
- **使用场景**：\r
  - 通过图层树对场景中预置的模型/图层进行分组管理与一键显隐控制。\r
  - 根据树节点 id 定位（focus）到指定工程车、设备、楼栋等对象。\r
  - 调用树上对象绑定的蓝图函数批量驱动其颜色、状态等动态效果。\r
- **注意事项**：\r
  - callBPFunction 传入的参数类型与顺序必须与目标蓝图函数完全一致，否则执行结果异常；可先用 fdapi.misc.getBPFunction(id) 查询对象的蓝图函数。\r
  - 操作依赖图层树上对象的真实 id，需先确保对象已在工程中预置并具有正确节点结构。\r
  - 主要面向工程内置场景对象，与运行时通过各图层对象动态添加的数据需区分管理。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`callBPFunction\`](#callBPFunction) | 调用图层树上对象包含的多个蓝图函数， |  |\r
| [\`deleteByGroupId\`](#deleteByGroupId) | 通过GroupId删除各类API创建的对象 |  |\r
| [\`disableXRay\`](#disableXRay) | 禁用X光 |  |\r
| [\`enableXRay\`](#enableXRay) | 启用X光 |  |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 获取图层树信息 | 查询对象信息，用于业务联动 |\r
| [\`getBPFunction\`](#getBPFunction) | 根据图层树对象ID查询其包含的蓝图函数信息， |  |\r
| [\`hide\`](#hide) | 隐藏图层 | 按业务条件隐藏对象 |\r
| [\`hideByGroupId\`](#hideByGroupId) | 通过GroupId隐藏各类API创建的对象 |  |\r
| [\`highlightByGroupId\`](#highlightByGroupId) | 通过GroupId高亮各类API创建的对象 |  |\r
| [\`setVisibility\`](#setVisibility) | 设置图层的可见性 | 控制对象显隐 |\r
| [\`show\`](#show) | 显示图层 | 按业务条件显示对象 |\r
| [\`showByGroupId\`](#showByGroupId) | 通过GroupId显示各类API创建的对象 |  |\r
\r
## 方法（Methods）\r
\r
### \`callBPFunction(data, fn)\` {#callBPFunction}\r
\r
调用图层树上对象包含的多个蓝图函数，注意：可以根据图层树上的对象id查询包含的所有蓝图函数 fdapi.misc.getBPFunction(id);\r
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
| \`id\` | \`string\` | 图层树上对象的ID |\r
| \`functionName\` | \`string\` | 蓝图函数名 |\r
| \`parameters\` | \`array\` | 蓝图函数包含的多个参数，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
蓝图函数调用示例代码 注意：被调用函数传入的参数类型、参数顺序都必须和蓝图函数的参数类型、顺序完全保持一致！\r
     fdapi.infoTree.callBPFunction([\r
            {\r
                id: '2BC267114D436EA43BF695AC98DA4E08',\r
                functionName: '颜色',\r
                parameters: [\r
                    { "paramType": 16, "paramValue": "红色" }\r
                ]\r
            },\r
            {\r
                id: '2BC267114D436EA43BF695AC98DA4E08',\r
                functionName: '状态',\r
                parameters: [\r
                    { "paramType": 5, "paramValue": "载货" }\r
                ]\r
            }\r
        ]);\r
\`\`\`\r
\r
> 示例：调用图层树上对象的蓝图函数：CallBPFunction\r
\r
\`\`\`js\r
fdapi.infoTree.focus('2BC267114D436EA43BF695AC98DA4E08')\r
//批量调用工程车多个蓝图函数，函数名称为【颜色】【状态】的蓝图函数\r
fdapi.infoTree.callBPFunction([\r
    {\r
        id: '2BC267114D436EA43BF695AC98DA4E08',\r
        functionName: '颜色',\r
        parameters: [\r
            { "paramType": 16, "paramValue": "红色" }\r
        ]\r
    },\r
    {\r
        id: '2BC267114D436EA43BF695AC98DA4E08',\r
        functionName: '状态',\r
        parameters: [\r
            { "paramType": 5, "paramValue": "载货" }\r
        ]\r
    }\r
]);\r
\`\`\`\r
\r
---\r
\r
### \`deleteByGroupId(groupId, fn)\` {#deleteByGroupId}\r
\r
通过GroupId删除各类API创建的对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 创建对象时指定的groupId |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.infoTree.deleteByGroupId(groupId);\r
\`\`\`\r
\r
---\r
\r
### \`disableXRay(ids, fn)\` {#disableXRay}\r
\r
禁用X光\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 待禁用X光的图层ID（支持单个ID或ID数组） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.infoTree.disableXRay(ids);\r
\`\`\`\r
\r
---\r
\r
### \`enableXRay(ids, color, fn)\` {#enableXRay}\r
\r
启用X光\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 待启用X光的图层ID（支持单个ID或ID数组） |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.infoTree.enableXRay(ids, color);\r
\`\`\`\r
\r
---\r
\r
### \`focus(ids, fn)\` {#focus}\r
\r
自动定位到合适的观察距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 图层树对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：定位图层：Focus\r
\r
\`\`\`js\r
fdapi.infoTree.focus('979A4C034E29728F8A2635AD747B72A3');\r
\`\`\`\r
\r
---\r
\r
### \`get(fn)\` {#get}\r
\r
获取图层树信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
[{\r
		"iD":	"ProjectTree_Root",\r
		"index":	0,\r
		"parentIndex":	-1,\r
		"name":	"世界",\r
		"visiblity":	true,\r
		"type":	"EPT_Folder"\r
}]\r
\r
图层返回type字段说明：\r
\r
  文件夹：EPT_Folder\r
  场景：EPT_Scene\r
  场景模型：EPT_ModelActor\r
  测量：EPT_Measurement\r
  剖切体：EPT_Cut\r
  动态水：EPT_DynamicWater\r
  车辆：EPT_Vehicle\r
  标签：EPT_Tag\r
  灯光：EPT_Light\r
  贴花：EPT_Decal\r
  光流：EPT_LightBeam\r
  辐射圈：EPT_RadiationPoint\r
  面：EPT_Surface\r
  点Shape：EPT_ShpPoint\r
  折线Shape：EPT_ShpPolyline\r
  多边形Shape：EPT_ShpPolygon\r
  折线：EPT_Polyline\r
  视频投影：EPT_VideoProjector\r
  全景图：EPT_Panoramic\r
  压平：EPT_FlattenModifier\r
  Cesium3DTileset：EPT_Cesium\r
  挖洞：EPT_CutPolygonModifier\r
  动态标记：EPT_EffectPoint\r
  S3M Layer：EPT_S3MLayer\r
  粒子：EPT_ParticleActor\r
  角色：EPT_RoleActor\r
\`\`\`\r
\r
> 示例：获取图层树信息：Get\r
\r
\`\`\`js\r
let res = await fdapi.infoTree.get();\r
console.log(JSON.stringify(res.infotree));\r
\`\`\`\r
\r
---\r
\r
### \`getBPFunction(ids, fn)\` {#getBPFunction}\r
\r
根据图层树对象ID查询其包含的蓝图函数信息，注意：支持批量查询\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 图层树上对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：查询图层树上对象的蓝图函数：GetBPFunction\r
\r
\`\`\`js\r
fdapi.infoTree.getBPFunction('2BC267114D436EA43BF695AC98DA4E08')\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏图层\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要隐藏的图层ID（支持单个ID或ID数组） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
fdapi.infoTree.hide(['6C0888EC46B4C3D68635BF9E98628819', 'B0D8D4AF42F9EFB9BA4B258F3A9BC410']);\r
\`\`\`\r
\r
> 示例：隐藏图层：Hide\r
\r
\`\`\`js\r
//支持按图层树上文件夹id隐藏文件夹内所有模型\r
fdapi.infoTree.hide(['979A4C034E29728F8A2635AD747B72A3']);\r
\`\`\`\r
\r
---\r
\r
### \`hideByGroupId(groupId, fn)\` {#hideByGroupId}\r
\r
通过GroupId隐藏各类API创建的对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 创建对象时指定的groupId |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.infoTree.hideByGroupId(groupId);\r
\`\`\`\r
\r
---\r
\r
### \`highlightByGroupId(groupId, fn)\` {#highlightByGroupId}\r
\r
通过GroupId高亮各类API创建的对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 创建对象时指定的groupId |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.infoTree.highlightByGroupId(groupId);\r
\`\`\`\r
\r
---\r
\r
### \`setVisibility(data, fn)\` {#setVisibility}\r
\r
设置图层的可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 图层可见性对象或数组，每个对象有以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 图层id |\r
| \`visible\` | \`boolean\` | 可见性 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.infoTree.setVisibility(data);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示图层\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要显示的图层ID（支持单个ID或ID数组） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
fdapi.infoTree.show(['6C0888EC46B4C3D68635BF9E98628819', 'B0D8D4AF42F9EFB9BA4B258F3A9BC410']);\r
\`\`\`\r
\r
> 示例：显示图层：Show\r
\r
\`\`\`js\r
//支持按图层树上文件夹id显示文件夹内所有模型\r
fdapi.infoTree.show('979A4C034E29728F8A2635AD747B72A3');\r
\`\`\`\r
\r
---\r
\r
### \`showByGroupId(groupId, fn)\` {#showByGroupId}\r
\r
通过GroupId显示各类API创建的对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupId\` | \`string\` | 创建对象时指定的groupId |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.infoTree.showByGroupId(groupId);\r
\`\`\`\r
`;export{n as default};
