const n=`---\r
title: Tag\r
sidebar_label: Tag\r
description: "在三维场景指定坐标处放置图文标签，支持图片、文字、牵引线及点击弹出网页/视频窗口，用于对场景要素进行注记与信息标注。（注意：Tag 已停止更新，推荐使用功能更丰富的 Marker。）"\r
---\r
\r
# Tag\r
\r
Tag已停止更新，推荐使用功能更丰富的标注对象Marker\r
\r
:::caution 已废弃\r
\r
标签类，实现标签对象的CURD（添加、修改、查询、删除） 通过api.tag调用其方法\r
\r
:::\r
\r
通过 \`api.tag\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：在三维场景指定坐标处放置图文标签，支持图片、文字、牵引线及点击弹出网页/视频窗口，用于对场景要素进行注记与信息标注。（注意：Tag 已停止更新，推荐使用功能更丰富的 Marker。）\r
- **别名 / 不同行业叫法**：标签、注记、标注、标牌、信息点、POI 点。\r
- **适用行业**：智慧城市、智慧园区、智慧水利、应急、交通、能源、文旅。\r
- **使用场景**：\r
  - 对建筑、设备、监测点等要素挂接名称与说明文字注记。\r
  - 点击标签弹出监控视频、详情网页等关联信息窗口。\r
  - 重点部位、POI 兴趣点的图文标识与可视范围控制显示。\r
- **注意事项**：\r
  - 该对象已废弃停止更新，新项目应优先使用 Marker，本对象仅用于存量兼容。\r
  - 通过 range/textRange 控制标签与文字的可见距离，避免远距离海量标签同时显示导致性能下降与画面拥挤。\r
  - 注意 coordinateType 与场景坐标系一致，autoHeight 可自动贴合下方物体高度。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Tag对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的Tag | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Tag对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`focusAll\`](#focusAll) | 自动定位到能观察所有Tag对象的合适距离 | 相机定位到全部对象的合适视角 |\r
| [\`get\`](#get) | 根据ID获取Tag的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏Tag | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有Tag | 一键隐藏全部对象 |\r
| [\`hideAllPopupWindow\`](#hideAllPopupWindow) | 隐藏所有标签的弹出窗口 |  |\r
| [\`hidePopupWindow\`](#hidePopupWindow) | 隐藏指定标签的弹出窗口 |  |\r
| [\`setAutoHidePopupWindow\`](#setAutoHidePopupWindow) | 设置是否自动关闭标签的弹出窗口 |  |\r
| [\`setCoordinate\`](#setCoordinate) | 设置标签的位置 |  |\r
| [\`setImagePath\`](#setImagePath) | 设置标签的图片 |  |\r
| [\`setImageSize\`](#setImageSize) | 设置标签图片的大小 |  |\r
| [\`setRange\`](#setRange) | 设置标签的可见范围 |  |\r
| [\`setShowLine\`](#setShowLine) | 设置标签是否显示垂直牵引线 |  |\r
| [\`setText\`](#setText) | 设置标签的文本 |  |\r
| [\`setTextBackgroundColor\`](#setTextBackgroundColor) | 设置标签文本的背景颜色 |  |\r
| [\`setTextBorderColor\`](#setTextBorderColor) | 设置标签文本的边框颜色 |  |\r
| [\`setTextColor\`](#setTextColor) | 设置标签文本颜色 |  |\r
| [\`setURL\`](#setURL) | 设置标签的URL |  |\r
| [\`show\`](#show) | 显示Tag | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有Tag | 一键显示全部对象 |\r
| [\`showAllPopupWindow\`](#showAllPopupWindow) | 显示所有标签的弹出窗口 |  |\r
| [\`showPopupWindow\`](#showPopupWindow) | 显示指定标签的弹出窗口 |  |\r
| [\`update\`](#update) | 修改一个或多个Tag对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Tag对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 标签数据，可以是Object类型或者Array类型，对于每一个标签，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinate\` | \`array\` | 坐标值：标签添加的位置坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`imagePath\` | \`string\` | 图片路径，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |\r
| \`imageSize\` | \`array\` | 图片尺寸[width,height]，取值范围：[0~任意正数] |\r
| \`url\` | \`string\` | 鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口，[资源引入说明](/docs/tutorials/resources) |\r
| \`popupBackgroundColor\` | [\`Color\`](/docs/api/types#color) | 弹窗背景色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`popupPos\` | \`array\` | 弹窗位置: [x, y]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |\r
| \`popupSize\` | \`array\` | 弹窗尺寸：[width, height]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |\r
| \`range\` | \`array\` | 标签的可见范围 [Min,Max]，Min和Max指摄像机相对于标签的最小和最大距离，在此范围内标签才可见，类型均为浮点数，元素取值范围：[1.0~100000.0]，单位：米 |\r
| \`text\` | \`string\` | 标签显示的文字 |\r
| \`textRange\` | \`number\` | 文字的可见范围，取值范围：[1.0~100000.0]，单位：米 |\r
| \`textSize\` | \`number\` | 文字大小，取值范围：[0~任意正整数] |\r
| \`textColor\` | [\`Color\`](/docs/api/types#color) | 文字颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`textBorderColor\` | [\`Color\`](/docs/api/types#color) | 文字边框颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`textBackgroundColor\` | [\`Color\`](/docs/api/types#color) | 文本背景颜色，默认值白色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`showLine\` | \`boolean\` | 标签下方是否显示垂直牵引线，默认值：true |\r
| \`hoverImagePath\` | \`string\` | 鼠标悬停时显示的图片路径，[资源引入说明](/docs/tutorials/resources) |\r
| \`autoHidePopupWindow\` | \`boolean\` | 是否自动关闭弹出窗口，默认值：true，失去焦点后会自动关闭 |\r
| \`autoHeight\` | \`boolean\` | 自动判断下方是否有物体，设置正确高度，默认值：false |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0(Projection), 1(WGS84)，如果不设置此参数，默认为0。 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
let o = {\r
            id: 'p1',//tag唯一标识\r
            coordinate: [495269.37, 2491073.25, 25.4],//坐标位置\r
            imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//图片路径\r
            imageSize: [100,100],//图片宽高[width,height]\r
            url: HostConfig.Path + '/locale/zh/popup_simple.html',//鼠标点击标签后弹出的网页的URL\r
            popupBackgroundColor: [1.0, 1.0, 1.0, 0.1],//弹窗背景色\r
            range: [1, 8000.0],//标签的可见范围 [Min,Max]\r
            showLine: true,//标签下方是否显示垂直牵引线\r
            text: '北京银行',//标签显示的文字\r
            textSize: 10,// 文字大小\r
            textRange: 3000,//文字的可见范围\r
            textColor: Color.Black,//文字颜色\r
            textBackgroundColor: Color.White,//文本背景颜色\r
            hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',//鼠标悬停时显示的图片路径\r
            autoHidePopupWindow: true, //失去焦点后会自动关闭弹出窗口\r
            autoHeight: true//自动判断下方是否有物体\r
        };\r
        fdapi.tag.add(o);\r
\`\`\`\r
\r
> 示例：Add\r
\r
\`\`\`js\r
//注意：5.1版本之后不再推荐使用tag和customTag对象创建标注（存在性能问题且后续版本不再维护），推荐统一使用marker或者marker3d对象创建标注\r
fdapi.tag.clear();\r
let o = {\r
    id: 'p1',//tag唯一标识\r
    coordinate: [492846.125, 2491822.75, 0],//坐标位置\r
    coordinateType: 0, //坐标系类型\r
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//图片路径\r
    imageSize: [100, 100],//图片宽高[width,height]\r
    url: HostConfig.Path + '/locale/zh/popup_simple.html',//鼠标点击标签后弹出的网页的URL\r
    popupBackgroundColor: [1.0, 1.0, 1.0, 0.1],//弹窗背景色\r
    range: [1, 8000.0],//标签的可见范围 [Min,Max]\r
    showLine: true,//标签下方是否显示垂直牵引线\r
    text: 'Building No.1',//标签显示的文字\r
    textSize: 10,// 文字大小\r
    textRange: 3000,//文字的可见范围\r
    textColor: Color.Black,//文字颜色\r
    textBorderColor: Color.Red,//文字边框颜色\r
    textBackgroundColor: Color.White,//文本背景颜色\r
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',//鼠标悬停时显示的图片路径\r
    autoHidePopupWindow: true, //失去焦点后会自动关闭弹出窗口\r
    autoHeight: true//自动判断下方是否有物体\r
\r
};\r
await fdapi.tag.add(o);\r
fdapi.tag.focus(o.id, 200, 1);\r
\r
o.id = 'p2';\r
o.text = "Building No.1";\r
o.coordinate = [492778.71875, 2491823, 0];\r
o.popupPos = [0, 0];\r
o.popupSize = [600, 400];\r
await fdapi.tag.add(o);\r
\`\`\`\r
\r
> 示例：用canvas绘制标签的imagePath属性：Add\r
\r
\`\`\`js\r
// 生成图片\r
if (!__canvas)\r
    __canvas = document.createElement("canvas");\r
\r
let img = new Image()\r
img.src = __base64_tagBg;\r
img.onload = () => {\r
\r
    __canvas.width = img.width;\r
    __canvas.height = img.height;\r
\r
    var ctx = __canvas.getContext("2d");\r
    ctx.drawImage(img, 0, 0);\r
    ctx.fillStyle = "#fff";\r
    ctx.font = "36px Bold Verdana";\r
    ctx.textBaseline = "middle";\r
    ctx.fillText("农村商业银行", 60, 50);\r
\r
\r
    let o = {\r
        id: 'canvas_tag1',\r
        coordinate: [492700.0625, 2491813, 20.719263076782227],\r
        imagePath: __canvas.toDataURL("image/jpg"),\r
        imageSize: [165, 63],\r
        text: '',\r
        url: HostConfig.Path + '/locale/zh/popup_simple.html',\r
        range: [1, 8000.0]\r
    };\r
    fdapi.tag.delete('canvas_tag1')\r
        .then(() => fdapi.tag.add(o))\r
        .then(() => fdapi.tag.focus('canvas_tag1', 200, 0.2));\r
}\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的Tag\r
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
fdapi.tag.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Tag对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Tag对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.tag.delete(['p1', 'p2']);\r
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
| \`ids\` | \`string \\| array\` | Tag对象的ID或者ID数组 |\r
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
fdapi.tag.focus('p1', 200, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`focusAll(distance, flyTime, rotation, fn)\` {#focusAll}\r
\r
自动定位到能观察所有Tag对象的合适距离\r
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
fdapi.tag.focusAll(200, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Tag的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Tag对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回Tag的详细信息\r
{\r
            "id":	"p1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "coordinate":	[495269.375000, 2491073.250000, 25.400000],\r
            "imageSize":	[28.000000, 28.000000],\r
            "url":	"G:\\\\TEMP\\\\Explorer\\\\SDK\\\\JS/simple.html",\r
            "imagePath":	"G:\\\\TEMP\\\\Explorer\\\\SDK\\\\JS/images/tag.png",\r
            "hoverImagePath":	"G:\\\\TEMP\\\\Explorer\\\\SDK\\\\JS/images/hilightarea.png",\r
            "popupPos":	[0.000000, 0.000000],\r
            "popupSize":	[0.000000, 0.000000],\r
            "text":	"北京银行",\r
            "textColor":	[0.000000, 0.000000, 0.000000, 1.000000],\r
            "textBackgroundColor":	[1.000000, 1.000000, 1.000000, 1.000000],\r
            "popupBackgroundColor":	[1.000000, 1.000000, 1.000000, 0.100000],\r
            "textBorderColor":	[0.000000, 0.000000, 0.000000, 0.000000],\r
            "range":	[1.000000, 8000.000000],\r
            "textRange":	3000.000000,\r
            "showLine":	1,\r
            "autoHidePopupWindow":	1,\r
            "textSize":	"10"\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
let res = await fdapi.tag.get('p1');\r
let o = res.data[0];\r
log(\`Get tags: \\n id: \${o.id} \\n text: \${o.text}\`);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏Tag\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Tag对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.tag.hide(['p1']);\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有Tag\r
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
fdapi.tag.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`hideAllPopupWindow(fn)\` {#hideAllPopupWindow}\r
\r
隐藏所有标签的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：隐藏所有弹出窗口：HideAllPopupWindow\r
\r
\`\`\`js\r
fdapi.tag.hideAllPopupWindow();\r
\`\`\`\r
\r
---\r
\r
### \`hidePopupWindow(ids, fn)\` {#hidePopupWindow}\r
\r
隐藏指定标签的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 标签的ID或者数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：隐藏标签的弹出窗口：HidePopupWindow\r
\r
\`\`\`js\r
fdapi.tag.hidePopupWindow('p1');\r
\`\`\`\r
\r
---\r
\r
### \`setAutoHidePopupWindow(id, newVal, fn)\` {#setAutoHidePopupWindow}\r
\r
设置是否自动关闭标签的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | \`boolean\` | 是否自动关闭标签的弹出窗口 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tag.setAutoHidePopupWindow(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setCoordinate(id, newVal, fn)\` {#setCoordinate}\r
\r
设置标签的位置\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新的位置坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Coordinate\r
\r
\`\`\`js\r
await fdapi.tag.setCoordinate('p1', [492477.1875, 2491878.25, 73.581634521484375]);\r
fdapi.tag.focus('p1', 200, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`setImagePath(id, newVal, fn)\` {#setImagePath}\r
\r
设置标签的图片\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新的图片路径，[资源引入说明](/docs/tutorials/resources) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ImagePath\r
\r
\`\`\`js\r
let path = HostConfig.Path + '/locale/zh/images/ctag.png';\r
fdapi.tag.setImagePath('p1', path);\r
\`\`\`\r
\r
---\r
\r
### \`setImageSize(id, newVal, fn)\` {#setImageSize}\r
\r
设置标签图片的大小\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新的图片尺寸[width,height]，取值范围：[0~任意正数] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ImageSize\r
\r
\`\`\`js\r
fdapi.tag.setImageSize('p1', [64, 64]);\r
\`\`\`\r
\r
---\r
\r
### \`setRange(id, newVal, fn)\` {#setRange}\r
\r
设置标签的可见范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新的可见范围 [Min,Max]，Min和Max指摄像机相对于标签的最小和最大距离，在此范围内标签才可见，类型均为浮点数，元素取值范围：[1.0~100000.0]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Range\r
\r
\`\`\`js\r
fdapi.tag.setRange('p1', [1, 800]);\r
\`\`\`\r
\r
---\r
\r
### \`setShowLine(id, newVal, fn)\` {#setShowLine}\r
\r
设置标签是否显示垂直牵引线\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | \`boolean\` | 是否显示垂直牵引线 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowLine\r
\r
\`\`\`js\r
fdapi.tag.setShowLine('p1', false);\r
\`\`\`\r
\r
---\r
\r
### \`setText(id, newVal, fn)\` {#setText}\r
\r
设置标签的文本\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新的文本值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Text\r
\r
\`\`\`js\r
fdapi.tag.setText('p1', 'Welcome!');\r
\`\`\`\r
\r
---\r
\r
### \`setTextBackgroundColor(id, newVal, fn)\` {#setTextBackgroundColor}\r
\r
设置标签文本的背景颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新的颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：TextBackgroundColor\r
\r
\`\`\`js\r
fdapi.tag.setTextBackgroundColor('p1', Color.Yellow);\r
\`\`\`\r
\r
---\r
\r
### \`setTextBorderColor(id, newVal, fn)\` {#setTextBorderColor}\r
\r
设置标签文本的边框颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新的颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：TextBorderColor\r
\r
\`\`\`js\r
fdapi.tag.setTextBorderColor('p1', Color.White);\r
\`\`\`\r
\r
---\r
\r
### \`setTextColor(id, newVal, fn)\` {#setTextColor}\r
\r
设置标签文本颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标签的唯一标识符ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新的颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：TextColor\r
\r
\`\`\`js\r
fdapi.tag.setTextColor('p1', Color.Blue);\r
\`\`\`\r
\r
---\r
\r
### \`setURL(id, newVal, fn)\` {#setURL}\r
\r
设置标签的URL\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新值，[资源引入说明](/docs/tutorials/resources) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：URL\r
\r
\`\`\`js\r
fdapi.tag.setURL('p1', 'http://www.163.com');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示Tag\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Tag对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.tag.show('p1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有Tag\r
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
fdapi.tag.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`showAllPopupWindow(fn)\` {#showAllPopupWindow}\r
\r
显示所有标签的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示所有弹出窗口：ShowAllPopupWindow\r
\r
\`\`\`js\r
fdapi.tag.showAllPopupWindow();\r
\`\`\`\r
\r
---\r
\r
### \`showPopupWindow(ids, fn)\` {#showPopupWindow}\r
\r
显示指定标签的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 标签的ID或者数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示标签的弹出窗口：ShowPopupWindow\r
\r
\`\`\`js\r
fdapi.tag.showPopupWindow('p1');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Tag对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 标签数据，参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
await fdapi.tag.update({\r
    id: 'p1',\r
    coordinate: [492902.59375, 2491822, 0],\r
    imagePath: 'data:image/png;base64,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',\r
    url: HostConfig.Path + '/locale/zh/popup_simple.html',\r
    imageSize: [28, 28],\r
    popupBackgroundColor: [1.0, 1.0, 1.0, 1.0],\r
    text: 'Building No.3',\r
    textColor: Color.Blue,\r
    textBackgroundColor: Color.Yellow,\r
    range: [1, 8000.0],\r
    showLine: false\r
});\r
fdapi.tag.focus('p1', 200, 0);\r
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
await fdapi.tag.updateEnd();\r
\`\`\`\r
`;export{n as default};
