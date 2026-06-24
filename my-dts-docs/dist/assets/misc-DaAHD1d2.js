const n=`---\r
title: Misc\r
sidebar_label: Misc\r
description: "Misc 提供一些杂项/辅助功能接口（如图片按钮、提示等通用辅助能力，具体以方法为准）。"\r
---\r
\r
# Misc\r
\r
Misc 提供一些杂项/辅助功能接口（如图片按钮、提示等通用辅助能力，具体以方法为准）。\r
\r
通过 \`api.misc\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Misc 提供一些杂项/辅助功能接口（如图片按钮、提示等通用辅助能力，具体以方法为准）。\r
- **别名 / 不同行业叫法**：杂项 / 辅助接口 / 工具杂项（无明显行业别称）。\r
- **适用行业**：通用\r
- **使用场景**：\r
  - 添加自定义图片按钮/控件\r
  - 通用提示与辅助交互\r
  - 零散功能的调用\r
- **注意事项**：\r
  - 功能较杂，按需取用\r
  - UI 类接口注意与页面布局协调\r
  - 不同版本可能存在差异\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`addAnimatedImageButtons\`](#addAnimatedImageButtons) | 添加动画按钮 |  |\r
| [\`addImageButtons\`](#addImageButtons) | 添加图片按钮 |  |\r
| [\`callBPFunction\`](#callBPFunction) | 调用整个渲染场景内指定的蓝图函数 |  |\r
| [\`deleteImageButtons\`](#deleteImageButtons) | 删除动画按钮 |  |\r
| [\`enterMultiViewportMode\`](#enterMultiViewportMode) | 进入多视口模式 |  |\r
| [\`enterReportMode\`](#enterReportMode) | 进入汇报演示模式 |  |\r
| [\`exitMultiViewportMode\`](#exitMultiViewportMode) | 退出多视口模式 |  |\r
| [\`exitReportMode\`](#exitReportMode) | 退出汇报演示模式 |  |\r
| [\`getActiveViewport\`](#getActiveViewport) | 查询当前激活的视口信息 |  |\r
| [\`getBPFunction\`](#getBPFunction) | 根据模型Actor路径或者对象id查询模型包含的蓝图函数信息，支持查询单个模型和多个模型… |  |\r
| [\`getConvexPolygon\`](#getConvexPolygon) | 从一组离散点中获取凸多边形的顶点索引 |  |\r
| [\`getMaterial\`](#getMaterial) | 根据材质路径查询材质包含的图片纹理和材质参数信息，同时支持查询单个材质和多个材质包含的信息 |  |\r
| [\`hideAllFoliages\`](#hideAllFoliages) | 隐藏Explorer里创建的植物 |  |\r
| [\`isApiVersionMatched\`](#isApiVersionMatched) | 判断JS-API的版本和云渲染服务器的接口版本是否一致 |  |\r
| [\`playMovie\`](#playMovie) | 全屏播放影片（播放过程中会暂停三维渲染以提高性能） |  |\r
| [\`playVideo\`](#playVideo) | 播放视频（显示播放窗口） |  |\r
| [\`playVideoAlone\`](#playVideoAlone) | 在独立的进程播放视频， |  |\r
| [\`projectAssetCount\`](#projectAssetCount) | 统计ACP工程包含各类资产信息 |  |\r
| [\`projectAssetCountAll\`](#projectAssetCountAll) | 统计ACP工程包含的全部资产信息 |  |\r
| [\`reloadPak\`](#reloadPak) | 从Cloud的文件资源配置中重新挂载新添加的pak文件，避免重启服务引起的实例关闭 |  |\r
| [\`setActiveViewport\`](#setActiveViewport) | 激活一个或多个视口， |  |\r
| [\`setApiVersionReceived\`](#setApiVersionReceived) | 设置服务器返回版本号的回调函数 |  |\r
| [\`setMultiviewportInteractSync\`](#setMultiviewportInteractSync) | 多视口模式下设置相机是否同步 |  |\r
| [\`setReportModeAlign\`](#setReportModeAlign) | 设置汇报模式下的窗口位置 |  |\r
| [\`setReportModePlayMode\`](#setReportModePlayMode) | 设置汇报模式下窗口的播放模式 |  |\r
| [\`setReportModeViewPortLinkage\`](#setReportModeViewPortLinkage) | 设置汇报模式下展示多视口时，相机是否联动  取值：联动true，不联动false，默认不… |  |\r
| [\`showAllFoliages\`](#showAllFoliages) | 显示Explorer里创建的植物 |  |\r
| [\`stopMovie\`](#stopMovie) | 停止全屏播放影片 |  |\r
| [\`stopPlayVideo\`](#stopPlayVideo) | 停止播放视频（播放窗口会消失） |  |\r
| [\`stopPlayVideoAlone\`](#stopPlayVideoAlone) | 停止在独立的进程播放视频， |  |\r
| [\`switchShortcutKey\`](#switchShortcutKey) | 控制Explorer快捷键的开关， |  |\r
\r
## 方法（Methods）\r
\r
### \`addAnimatedImageButtons(data, fn)\` {#addAnimatedImageButtons}\r
\r
添加动画按钮\r
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
| \`id\` | \`number\` | 按钮的ID |\r
| \`x\` | \`number\` | 图片按钮的位置:x坐标 |\r
| \`y\` | \`number\` | 图片按钮的位置:y坐标 |\r
| \`width\` | \`number\` | 图片按钮的宽度，单位像素 |\r
| \`height\` | \`number\` | 图片按钮的高度，单位像素 |\r
| \`imageSequecePath\` | \`string\` | 序列贴图的路径，[资源引入说明](/docs/tutorials/resources) |\r
| \`imageSequeceLength\` | \`string\` | 序列贴图的图片数量，也就是帧数 |\r
| \`loop\` | \`boolean\` | 是否循环播放序列贴图 |\r
| \`interactable\` | \`boolean\` | 是否可以用鼠标点击操作 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.misc.addAnimatedImageButtons(data);\r
\`\`\`\r
\r
---\r
\r
### \`addImageButtons(data, fn)\` {#addImageButtons}\r
\r
添加图片按钮\r
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
| \`id\` | \`string\` | 按钮的ID |\r
| \`x\` | \`number\` | Button的屏幕坐标X |\r
| \`y\` | \`number\` | Button的屏幕坐标Y |\r
| \`width\` | \`number\` | Button的宽度 |\r
| \`height\` | \`number\` | Button的高度 |\r
| \`normalImage\` | \`string\` | Button正常显示的图片 |\r
| \`hoverImage\` | \`string\` | 鼠标移上去后显示的图片 |\r
| \`tooltip\` | \`string\` | Button的文字提示 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.misc.addImageButtons(data);\r
\`\`\`\r
\r
---\r
\r
### \`callBPFunction(data, fn)\` {#callBPFunction}\r
\r
调用整个渲染场景内指定的蓝图函数 注意：调用前请先确认被调用的蓝图函数已存在，并和设计蓝图函数的开发人员沟通确认相关参数取值后再调用\r
\r
\r
\r
![](/img/refdoc/api/Blueprints.gif)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object\` | 支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`actorTag\` | \`string\` | 发布蓝图函数时在模型包含的Actor上添加的tag，调用前需和设计蓝图函数的开发人员确认 |\r
| \`objectName\` | \`string\` | 模型包含的Actor对象的ID，可以根据__g.tileLayer.getObjectIDs(tileLayerIds)方法获取 |\r
| \`functionName\` | \`string\` | 待调用的蓝图函数名称，调用前需和设计蓝图函数的开发人员确认此函数已存在 |\r
| \`paramType\` | [\`BPFuncParamType\`](/docs/api/types#bpfuncparamtype) | 传入单个参数，待传入参数类型 参考\`BPFuncParamType\`，如果需传递对象类型参数可以把Json对象定义为StringArray类型，在蓝图函数内部自己实现反序列化解析。 |\r
| \`paramValue\` | \`any\` | 传入单个参数，根据参数类型设置对应参数值 |\r
| \`parameters\` | \`array\` | 传入多个参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：调用蓝图函数：CallBPFunction\r
\r
\`\`\`js\r
// 先移动相机镜头到动画场景范围内\r
fdapi.camera.set(492411.977813, 2491993.023516, 102.233096, -33.122059, 118.372009, 1);\r
\r
/**\r
* 蓝图函数说明：UE4引擎自带的一种图形化程序开发界面，旨在降低开发人员门槛。蓝图的本质类似于宏程序脚本，包含有输入输出参数和自定的参数数据类型。\r
* 以下示例代码为调用蓝图函数演示模型动画效果\r
* 注意：调用前请先确认被调用的蓝图函数已存在，并和设计UE蓝图函数的开发人员沟通确认相关参数取值后再调用\r
*/\r
fdapi.misc.callBPFunction({\r
    // 创建蓝图函数时在模型包含的Actor上添加的tag，调用前需和设计蓝图函数的开发人员确认\r
    actorTag: 'function',\r
    // 执行动画效果的Actor对象的ID，可以根据__g.tileLayer.getObjectIDs(tileLayerIds)方法获取\r
    objectName: 'BP_Explode_function_2',\r
    // 待调用的蓝图函数名称，调用前需和设计蓝图函数的开发人员确认此函数已存在\r
    functionName: 'BPF_Explode_Animation',\r
    // 传入参数类型  参考BPFuncParamType枚举\r
    paramType: BPFuncParamType.Vector,\r
    // 根据传入参数类型设置对应参数值\r
    paramValue: [1, 0, 0]\r
});\r
\`\`\`\r
\r
---\r
\r
### \`deleteImageButtons(ids, fn)\` {#deleteImageButtons}\r
\r
删除动画按钮\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`array\` | 按钮的ID或数组（可以一次删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.misc.deleteImageButtons(ids);\r
\`\`\`\r
\r
---\r
\r
### \`enterMultiViewportMode(viewportMode, lineColor, lineSize, fn)\` {#enterMultiViewportMode}\r
\r
进入多视口模式\r
\r
\r
\r
![视口布局类型](/img/refdoc/api/viewport_mode.png)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`viewportMode\` | \`number\` | 视口布局类型，取值范围：[1~7]，参考上图从上到下从左到右计数，即录制导览动画时的视口布局 |\r
| \`lineColor\` | [\`Color\`](/docs/api/types#color) | 可选参数，激活后视口边框线的颜色，默认值：#DEA309，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`lineSize\` | \`number\` | 可选参数，激活后视口边框线的宽度，单位：像素，默认值：2px |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：进入多视口模式：EnterMultiViewportMode\r
\r
\`\`\`js\r
//视口布局类型，取值范围：[1~7]\r
let viewportMode = 5;\r
//可选参数，激活后视口边框线的颜色\r
let lineColor = "#DEA309";\r
//可选参数，激活后视口边框线的宽度，单位：像素px\r
let lineSize = 2;\r
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);\r
\`\`\`\r
\r
---\r
\r
### \`enterReportMode(fn)\` {#enterReportMode}\r
\r
进入汇报演示模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：进入汇报演示模式：EnterReportMode\r
\r
\`\`\`js\r
fdapi.misc.enterReportMode();\r
\`\`\`\r
\r
---\r
\r
### \`exitMultiViewportMode(fn)\` {#exitMultiViewportMode}\r
\r
退出多视口模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：退出多视口模式：ExitMultiViewportMode\r
\r
\`\`\`js\r
//退出多视口\r
fdapi.misc.exitMultiViewportMode();\r
\`\`\`\r
\r
---\r
\r
### \`exitReportMode(fn)\` {#exitReportMode}\r
\r
退出汇报演示模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：退出汇报演示模式：ExitReportMode\r
\r
\`\`\`js\r
fdapi.misc.exitReportMode();\r
\`\`\`\r
\r
---\r
\r
### \`getActiveViewport(fn)\` {#getActiveViewport}\r
\r
查询当前激活的视口信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：获取当前激活视口：GetActiveViewport\r
\r
\`\`\`js\r
//获取当前激活的视口\r
fdapi.misc.getActiveViewport();\r
\`\`\`\r
\r
---\r
\r
### \`getBPFunction(assetPath, fn)\` {#getBPFunction}\r
\r
根据模型Actor路径或者对象id查询模型包含的蓝图函数信息，支持查询单个模型和多个模型包含的蓝图函数信息\r
\r
如何获取assetPath参数见如下动图：\r
\r
\r
\r
![](/img/refdoc/api/copy_actor_path.gif)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`assetPath\` | \`string \\| array\` | 模型Actor的路径或路径数组，可以从资源库的模型列表复制获取 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
[{\r
            "idOrPath":	"/JC_CustomAssets/EffectLibrary/Exhibition/3DUI/3D_UI_C_3",\r
            "objectType":	"Actor",\r
            "params":	[{\r
                    "functionName":	"特效",\r
                    "functionParams":	[{\r
                            "name":	"点特效样式",\r
                            "type":	16,\r
                            "defaultValue":	""\r
                        }, {\r
                            "name":	"线特效样式",\r
                            "type":	16,\r
                            "defaultValue":	""\r
                        }]\r
                }, {\r
                    "functionName":	"图标",\r
                    "functionParams":	[{\r
                            "name":	"图标样式",\r
                            "type":	16,\r
                            "defaultValue":	""\r
                        }, {\r
                            "name":	"图标背景",\r
                            "type":	16,\r
                            "defaultValue":	""\r
                        }]\r
                }, {\r
                    "functionName":	"动画",\r
                    "functionParams":	[{\r
                            "name":	"启用动画",\r
                            "type":	0,\r
                            "defaultValue":	0\r
                        }, {\r
                            "name":	"反向动画",\r
                            "type":	0,\r
                            "defaultValue":	0\r
                        }]\r
                }, {\r
                    "functionName":	"文字",\r
                    "functionParams":	[{\r
                            "name":	"文字内容",\r
                            "type":	5,\r
                            "defaultValue":	""\r
                        }, {\r
                            "name":	"文字大小",\r
                            "type":	2,\r
                            "defaultValue":	0\r
                        }, {\r
                            "name":	"背景颜色",\r
                            "type":	6,\r
                            "defaultValue":	[1.000000, 1.000000, 1.000000, 1.000000]\r
                        }, {\r
                            "name":	"背景倒角",\r
                            "type":	3,\r
                            "defaultValue":	0.000000\r
                        }]\r
                }]\r
        }]\r
\`\`\`\r
\r
> 示例：查询蓝图函数信息：GetBPFunction\r
\r
\`\`\`js\r
//查询蓝图函数包含的参数信息\r
let res = await fdapi.misc.getBPFunction("/JC_CustomAssets/EffectLibrary/Exhibition/3DUI/3D_UI_C_3");\r
\r
//函数名称\r
let functionName = res.data[0].params[3].functionName;\r
//函数参数信息\r
let functionParams = res.data[0].params[3].functionParams;\r
log("函数名称：" + functionName);\r
log("包含参数名称：" + functionParams[0].name);\r
log("包含参数类型：" + functionParams[0].type);\r
log("包含参数默认值：" + functionParams[0].defaultValue);\r
\`\`\`\r
\r
---\r
\r
### \`getConvexPolygon(pointArray, fn)\` {#getConvexPolygon}\r
\r
从一组离散点中获取凸多边形的顶点索引\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`pointArray\` | \`boolean\` | 离散点坐标数组，数组元素格式：[X,Y] 注意：没有高度Z |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：获取凸多边形顶点索引：GetConvexPolygon\r
\r
\`\`\`js\r
let pointArr = [\r
    [492350.96875, 2492321.5],\r
    [492387.46875, 2492318.75],\r
    [492433.09375, 2492304.25],\r
    [492459.0625, 2492281.75],\r
    [492507.625, 2492271.5],\r
    [492485.78125, 2492239],\r
    [492473.6875, 2492223.75],\r
    [492446.375, 2492224],\r
    [492420.15625, 2492228.75],\r
    [492394.3125, 2492236.25],\r
    [492365.90625, 2492249.25],\r
    [492342.71875, 2492274],\r
    [492339.71875, 2492302.25],\r
    [492407.21875, 2492287.75],\r
    [492441.71875, 2492271.5],\r
    [492447.96875, 2492241.75]\r
];\r
\r
\r
let res = await fdapi.misc.getConvexPolygon(pointArr);\r
let indices = res.data;\r
\r
//添加marker\r
fdapi.marker.clear();\r
let markerArr = [];\r
for (let i = 0; i < pointArr.length; i++) {\r
    let fontColor = Color.Red;\r
    if (indices.includes(i)) {\r
        fontColor = Color.Blue;\r
    }\r
    let markerTemp = {\r
        id: "m_" + i,\r
        text: "" + i,\r
        fontColor: fontColor,\r
        coordinate: pointArr[i],\r
        displayMode: 2\r
    };\r
    markerArr.push(markerTemp);\r
}\r
fdapi.marker.add(markerArr);\r
\r
let polygon = [];\r
for (let i = 0; i < indices.length; i++) {\r
    let point = pointArr[indices[i]];\r
    polygon.push(point);\r
}\r
\r
\r
fdapi.polygon.clear();\r
let polygon1 = {\r
    id: 'polygon1',\r
    coordinates: polygon,\r
    coordinateType: 0,\r
    range: [1, 10000],\r
    color: [0, 0, 1, 0.8],\r
    frameColor: Color.White,\r
    frameThickness: 0.5,\r
    intensity: 1,\r
    style: PolygonStyle.SingleColor,\r
    depthTest: false\r
};\r
fdapi.polygon.add(polygon1);\r
fdapi.polygon.focus('polygon1');\r
\`\`\`\r
\r
---\r
\r
### \`getMaterial(materialPath, fn)\` {#getMaterial}\r
\r
根据材质路径查询材质包含的图片纹理和材质参数信息，同时支持查询单个材质和多个材质包含的信息\r
\r
如何获取materialPath参数见如下动图：\r
\r
\r
\r
![](/img/refdoc/api/copy_material_path.gif)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`materialPath\` | \`string \\| array\` | 单个材质路径或路径数组，可以从资源库的材质列表复制获取 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
[{\r
            "idOrPath":	"/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_1",\r
            "objectType":	"Material",\r
            "params":	[{\r
                    "name":	"颜色",\r
                    "type":	6,\r
                    "defaultValue":	[1.000000, 1.000000, 1.000000, 1.000000]\r
                }, {\r
                    "name":	"脏迹颜色",\r
                    "type":	6,\r
                    "defaultValue":	[0.400000, 0.400000, 0.400000, 1.000000]\r
                }, {\r
                    "name":	"亮度",\r
                    "type":	3,\r
                    "defaultValue":	1.300000\r
                }, {\r
                    "name":	"金属度",\r
                    "type":	3,\r
                    "defaultValue":	0.000000\r
                }, {\r
                    "name":	"法线强度",\r
                    "type":	3,\r
                    "defaultValue":	1.000000\r
                }, {\r
                    "name":	"粗糙度",\r
                    "type":	3,\r
                    "defaultValue":	1.616593\r
                }]\r
        }]\r
\`\`\`\r
\r
> 示例：查询模型材质信息：GetMaterial\r
\r
\`\`\`js\r
//查询材质包含的参数信息\r
let res = await fdapi.misc.getMaterial("/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_1");\r
\r
//颜色参数名称\r
let colorParamName = res.data[0].params[0].name;\r
//颜色参数默认值\r
let colorParamValue = res.data[0].params[0].defaultValue;\r
log(colorParamName + ":" + colorParamValue);\r
\r
//亮度参数名称\r
let opacityParamName = res.data[0].params[2].name;\r
//亮度默认值\r
let opacityParamValue = res.data[0].params[2].defaultValue;\r
log(opacityParamName + ":" + opacityParamValue);\r
\`\`\`\r
\r
---\r
\r
### \`hideAllFoliages(fn)\` {#hideAllFoliages}\r
\r
隐藏Explorer里创建的植物\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：隐藏所有植物：HideAllFoliages\r
\r
\`\`\`js\r
//调整相机至植物区域\r
fdapi.camera.set(492533.392539, 2491957.60625, 58.362656, -49.696117, -66.419853, 2);\r
//隐藏Explorer里创建的所有植物\r
fdapi.misc.hideAllFoliages();\r
\`\`\`\r
\r
---\r
\r
### \`isApiVersionMatched()\` {#isApiVersionMatched}\r
\r
判断JS-API的版本和云渲染服务器的接口版本是否一致\r
\r
**返回：** 如果一致返回true，否则返回false\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.misc.isApiVersionMatched();\r
\`\`\`\r
\r
---\r
\r
### \`playMovie(url, loop, fn)\` {#playMovie}\r
\r
全屏播放影片（播放过程中会暂停三维渲染以提高性能）\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`url\` | \`string\` | 影片文件路径，支持本地绝对路径和流媒体网络路径，注意：不支持工程本地的相对路径 |\r
| \`loop\` | \`boolean\` | 是否循环播放（from V2021.03.09） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：全屏播放影片：PlayMovie\r
\r
\`\`\`js\r
fdapi.misc.playMovie(HostConfig.Path + '/assets/video/video1.webm', true);\r
\`\`\`\r
\r
---\r
\r
### \`playVideo(id, x, y, width, height, url, fn)\` {#playVideo}\r
\r
播放视频（显示播放窗口）\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`x\` | \`number\` | 视频窗口的位置X |\r
| \`y\` | \`number\` | 视频窗口的位置Y |\r
| \`width\` | \`number\` | 视频窗口的宽度 |\r
| \`height\` | \`number\` | 视频窗口的高度 |\r
| \`url\` | \`string\` | 视频文件路径，支持本地绝对路径和流媒体网络路径，注意：不支持工程本地的相对路径 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：在窗口指定位置播放视频：PlayVideo\r
\r
\`\`\`js\r
fdapi.misc.playVideo(1, 20, 20, 400, 300, HostConfig.Path + '/assets/video/video2.mov');\r
\`\`\`\r
\r
---\r
\r
### \`playVideoAlone(url, options, fn)\` {#playVideoAlone}\r
\r
在独立的进程播放视频，注意：此接口仅在基于Explorer进行二次开发时生效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`url\` | \`string\` | 视频地址，支持网络地址或者本地文件。 |\r
| \`options\` | \`object\` | 视频播放窗口配置参数，支持以下参数： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`options\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`mute\` | \`boolean\` | 是否静音。 |\r
| \`x\` | \`number\` | 视频播放窗口左上角距离显示器屏幕左侧的坐标 |\r
| \`y\` | \`number\` | 视频播放窗口左上角距离显示器屏幕顶部的坐标 |\r
| \`cx\` | \`number\` | 视频播放窗口宽度，默认值400 |\r
| \`cy\` | \`number\` | 视频播放窗口高度，默认值300 |\r
| \`title\` | \`string\` | 视频播放窗口标题栏文本，如果不设置，标题栏默认显示视频地址 |\r
| \`opacity\` | \`number\` | 视频播放窗口的透明度，取值范围：(0, 1] |\r
| \`style\` | \`enum\` | 视频播放窗口样式。 取值0：无标题栏，1：有标题栏，2：有标题栏，可拖动边框改变大小。 默认值为2。 |\r
| \`hideBuffering\` | \`boolean\` | 是否隐藏标题栏显示的视频流缓冲进度，默认不隐藏 |\r
| \`maximizeBox\` | \`boolean\` | 是否在标题栏显示最大化按钮，默认不显示 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：在独立的进程播放视频：PlayVideoAlone\r
\r
\`\`\`js\r
let result = await fdapi.misc.playVideoAlone('rtsp://192.168.1.4:555/live', {\r
    x: 100,\r
    y: 100,\r
    cx: 400,\r
    cy: 260,\r
    opacity: 1,\r
    style: 2,\r
    title: '北三环东路5号入口',\r
    hideBuffering: false,\r
    maximizeBox: false\r
});\r
__playVideoAloneId = result.processId;\r
\`\`\`\r
\r
---\r
\r
### \`projectAssetCount(type, fn)\` {#projectAssetCount}\r
\r
统计ACP工程包含各类资产信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`type\` | \`number\` | ACP工程包含的资产类型，枚举类型详情请参考 \`AssetType\` |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.misc.projectAssetCount(type);\r
\`\`\`\r
\r
---\r
\r
### \`projectAssetCountAll(fn)\` {#projectAssetCountAll}\r
\r
统计ACP工程包含的全部资产信息\r
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
await fdapi.misc.projectAssetCountAll();\r
\`\`\`\r
\r
---\r
\r
### \`reloadPak(fn)\` {#reloadPak}\r
\r
从Cloud的文件资源配置中重新挂载新添加的pak文件，避免重启服务引起的实例关闭\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：重新加载pak文件：ReloadPak\r
\r
\`\`\`js\r
//从Cloud的文件资源配置中重新挂载新添加的pak文件，从而避免重启服务引起的实例关闭\r
    fdapi.misc.reloadPak();\r
}\r
\r
// function test_misc_download() {\r
//     //把文件下载到cloud服务器的指定磁盘路径\r
//     fdapi.misc.download('https://www.freedoonline.com/public/static/home2022/images/ewm1.png', 'C:/gzh/', 'wx.png');\r
//\r
\`\`\`\r
\r
---\r
\r
### \`setActiveViewport(index, fn)\` {#setActiveViewport}\r
\r
激活一个或多个视口，注意：仅在多视口模式下生效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`index\` | \`number \\| array\` | 被激活视口的索引或索引数组（同时激活多个视口），索引取值范围：[0~3] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置当前激活视口：SetActiveViewport\r
\r
\`\`\`js\r
//设置激活一个视口\r
fdapi.misc.setActiveViewport(1);\r
\`\`\`\r
\r
---\r
\r
### \`setApiVersionReceived(fnCallback)\` {#setApiVersionReceived}\r
\r
设置服务器返回版本号的回调函数\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fnCallback\` | \`function\` | 回调函数，当收到服务器返回的版本信息后调用 |\r
\r
**返回：** 无返回值。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.misc.setApiVersionReceived(fnCallback);\r
\`\`\`\r
\r
---\r
\r
### \`setMultiviewportInteractSync(isSync, fn)\` {#setMultiviewportInteractSync}\r
\r
多视口模式下设置相机是否同步\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`isSync\` | \`boolean\` | 相机是否同步，默认不联动：false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置多视口同步：SetMultiviewportInteractSync\r
\r
\`\`\`js\r
//多视口模式下设置相机是否同步\r
fdapi.misc.setMultiviewportInteractSync(true);\r
\`\`\`\r
\r
---\r
\r
### \`setReportModeAlign(align, fn)\` {#setReportModeAlign}\r
\r
设置汇报模式下的窗口位置\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`align\` | \`number\` | 位置取值：0【底部】，1【居左】，2【居右】，默认0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置汇报模式下的窗口位置：SetReportModeAlign\r
\r
\`\`\`js\r
//位置取值：0【底部】，1【居左】，2【居右】，默认0\r
fdapi.misc.setReportModeAlign(0);\r
\`\`\`\r
\r
---\r
\r
### \`setReportModePlayMode(playMode, fn)\` {#setReportModePlayMode}\r
\r
设置汇报模式下窗口的播放模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`playMode\` | \`number\` | 播放模式取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置汇报模式下窗口的播放模式：SetReportModePlayMode\r
\r
\`\`\`js\r
//播放模式取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0\r
fdapi.misc.setReportModePlayMode(0);\r
\`\`\`\r
\r
---\r
\r
### \`setReportModeViewPortLinkage(isLinkage, fn)\` {#setReportModeViewPortLinkage}\r
\r
设置汇报模式下展示多视口时，相机是否联动  取值：联动true，不联动false，默认不联动false\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`isLinkage\` | \`boolean\` | 相机是否联动 取值：联动true，不联动false，默认不联动false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置汇报模式下展示多视口时相机是否联动：SetReportModeViewPortLinkage\r
\r
\`\`\`js\r
//相机是否联动  取值：联动true，不联动false，默认不联动false \r
fdapi.misc.setReportModeViewPortLinkage(false);\r
\`\`\`\r
\r
---\r
\r
### \`showAllFoliages(fn)\` {#showAllFoliages}\r
\r
显示Explorer里创建的植物\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示所有植物：ShowAllFoliages\r
\r
\`\`\`js\r
//调整相机至植物区域\r
fdapi.camera.set(492533.392539, 2491957.60625, 58.362656, -49.696117, -66.419853, 2);\r
//显示Explorer里创建的所有植物\r
fdapi.misc.showAllFoliages();\r
\`\`\`\r
\r
---\r
\r
### \`stopMovie(fn)\` {#stopMovie}\r
\r
停止全屏播放影片\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：停止全屏播放影片：StopMovie\r
\r
\`\`\`js\r
fdapi.misc.stopMovie();\r
\`\`\`\r
\r
---\r
\r
### \`stopPlayVideo(id, fn)\` {#stopPlayVideo}\r
\r
停止播放视频（播放窗口会消失）\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：停止视频播放并隐藏视频窗口：StopPlayVideo\r
\r
\`\`\`js\r
fdapi.misc.stopPlayVideo(1);\r
\`\`\`\r
\r
---\r
\r
### \`stopPlayVideoAlone(id, fn)\` {#stopPlayVideoAlone}\r
\r
停止在独立的进程播放视频，注意：此接口仅在基于Explorer进行二次开发时生效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`number\` | 成功调用playVideoAlone后返回的processId |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：停止在独立的进程播放视频：StopPlayVideoAlone\r
\r
\`\`\`js\r
fdapi.misc.stopPlayVideoAlone(__playVideoAloneId);\r
\`\`\`\r
\r
---\r
\r
### \`switchShortcutKey(onOff, fn)\` {#switchShortcutKey}\r
\r
控制Explorer快捷键的开关，注意：仅针对explorer下webui开发方式生效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`onOff\` | \`boolean\` | 打开关闭快捷键：true打开，false关闭 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.misc.switchShortcutKey(onOff);\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> 添加图片按钮：AddImageButton\r
\r
\`\`\`js\r
fdapi.misc.addImageButtons({\r
    id: '1',\r
    x: 100,\r
    y: 100,\r
    width: 64,\r
    height: 64,\r
    normalImage: HostConfig.Path + '/locale/zh/images/custom.png',\r
    hoverImage: HostConfig.Path + '/locale/zh/images/hilightarea.png',\r
    tooltip: 'Test'\r
});\r
\`\`\`\r
\r
> 删除图片按钮：DeleteImageButton\r
\r
\`\`\`js\r
fdapi.misc.deleteImageButtons('1');\r
\`\`\`\r
\r
> 添加动画按钮：AddAnimatedImageButton\r
\r
\`\`\`js\r
let x = 100;//图片按钮的位置:x坐标\r
let y = 100;//图片按钮的位置:y坐标\r
let width = 208;//图片按钮的宽度，单位像素\r
let height = 150;//图片按钮的高度，单位像素\r
let imageSequecePath = 'D:/tmp3/loopplay2s';//序列贴图的目录\r
let imageSequeceLength = 2;//序列贴图的图片数量，也就是帧数\r
let loop = true;//是否循环播放序列贴图\r
let interactable = true;//是否可以用鼠标点击操作\r
let o = new AnimatedImageButtonData(1, x, y, width, height, imageSequecePath, imageSequeceLength, loop, interactable);\r
fdapi.misc.addAnimatedImageButtons(o);\r
\`\`\`\r
\r
> 统计工程包含的全部资产：ProjectCountAll\r
\r
\`\`\`js\r
//统计ACP工程包含的全部资产\r
fdapi.misc.projectAssetCountAll();\r
\`\`\`\r
\r
> 统计工程包含的各类资产：ProjectCount\r
\r
\`\`\`js\r
//统计3dt信息\r
fdapi.misc.projectAssetCount(AssetType.EPT_Scene);\r
\`\`\`\r
`;export{n as default};
