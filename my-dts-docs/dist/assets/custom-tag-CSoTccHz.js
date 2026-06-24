const n=`---\r
title: CustomTag\r
sidebar_label: CustomTag\r
description: "用于在三维场景中加载基于网页（HTML）的自定义标签，将外部网页内容贴合到指定坐标点，可承载富文本、图表、视频等网页化信息展示。该对象已停止更新，新项目推荐使用功能更丰富的 Marker 对象。"\r
---\r
\r
# CustomTag\r
\r
CustomTag已停止更新，推荐使用功能更丰富的标注对象Marker\r
\r
:::caution 已废弃\r
\r
用户自定义标签类 通过api.customTag调用其方法\r
\r
:::\r
\r
通过 \`api.customTag\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：用于在三维场景中加载基于网页（HTML）的自定义标签，将外部网页内容贴合到指定坐标点，可承载富文本、图表、视频等网页化信息展示。该对象已停止更新，新项目推荐使用功能更丰富的 Marker 对象。\r
- **别名 / 不同行业叫法**：自定义标签、HTML标牌、信息牌、网页标签、网页贴牌。\r
- **适用行业**：智慧城市、智慧园区、文博展陈、应急指挥、交通枢纽。\r
- **使用场景**：\r
  - 在建筑、设施上方挂接网页化信息卡，展示名称、地址、简介等内容\r
  - 点击标签弹出包含详情页、统计图表或监控视频的弹窗窗口\r
  - 园区/展馆点位的图文导览与交互式信息牌\r
- **注意事项**：\r
  - 本对象已废弃且停止更新，新项目应优先选用 Marker；\r
  - contentURL 的本地路径中不能含有空格，资源引入需遵循资源说明；\r
  - 网页标签依赖浏览器内核渲染，数量过多会影响性能，建议结合 range 控制显示范围；\r
  - 坐标需与场景坐标系一致，注意 pivot 中心点与弹窗尺寸的合理设置。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个CustomTag对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的CustomTag | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个CustomTag对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`focusAll\`](#focusAll) | 自动定位到能观察所有CustomTag对象的合适距离 | 相机定位到全部对象的合适视角 |\r
| [\`get\`](#get) | 根据ID获取CustomTag的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏CustomTag | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有CustomTag | 一键隐藏全部对象 |\r
| [\`setAutoHidePopupWindow\`](#setAutoHidePopupWindow) | 设置是否自动关闭标签的弹出窗口 |  |\r
| [\`show\`](#show) | 显示CustomTag | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有CustomTag | 一键显示全部对象 |\r
| [\`update\`](#update) | 修改一个或多个CustomTag对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个CustomTag对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | CustomTag类的对象或者数组，对于每一个CustomTag，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinate\` | \`array\` | 坐标值，[取值示例](/docs/tutorials/coordinates) |\r
| \`contentURL\` | \`string\` | 网页URL（本地地址或者网络地址），注意：本地地址中不能有空格 |\r
| \`contentSize\` | \`array\` | 网页窗口尺寸： [width, height]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |\r
| \`popupURL\` | \`string\` | 弹出窗口的网页地址，[资源引入说明](/docs/tutorials/resources) |\r
| \`popupSize\` | \`array\` | 弹出窗口的尺寸：[width, height]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |\r
| \`pivot\` | \`array\` | 中心点：[0.5,0.5]，数组元素类型：(number)，数组元素取值范围：[0~1] |\r
| \`range\` | \`array\` | 显示范围：[min, max]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |\r
| \`autoHidePopupWindow\` | \`boolean\` | 是否自动关闭弹出窗口，默认会自动关闭：true |\r
| \`popupPos\` | \`array\` | 弹窗位置: [x, y]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
let o = {\r
            id: 'ct1',\r
            coordinate: [495113.71875, 2491218, 0.4],\r
            contentURL: HostConfig.Path + '/locale/zh/popup_simple.html?icon=images/ctag1.png&title=北医三院&address=海淀区花园北路',\r
            contentSize: [220, 52],\r
            popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',\r
            popupSize: [600, 480],\r
            pivot: [0.5, 0.5],\r
            range: [1, 5000],\r
            autoHidePopupWindow: true,\r
            popupPos: [100,200]\r
        }\r
        fdapi.customTag.add(o);\r
\`\`\`\r
\r
> 示例：Add\r
\r
\`\`\`js\r
//注意：5.1版本之后不再推荐使用tag和customTag对象创建标注（存在性能问题且后续版本不再维护），推荐统一使用marker或者marker3d对象创建标注\r
await fdapi.customTag.clear();\r
let o = {\r
    id: 'ct1',\r
    coordinate: [492618.0625, 2492039.25, 15],\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    contentURL: HostConfig.Path + '/locale/zh/popup_simple.html?icon=../images/ctag1.png&title=北医三院&address=海淀区花园北路',// 网页URL\r
    contentSize: [220, 52],//网页窗口宽高 [width, height]\r
    popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',//弹窗地址url\r
    popupSize: [600, 480],//弹窗尺寸\r
    popupPos: [100, 200], //弹窗位置: [x, y]\r
    pivot: [0.5, 0.5],// 中心点\r
    range: [1, 5000],//显示范围：[min, max]\r
    autoHidePopupWindow: true//失去焦点后是否自动关闭弹出窗口\r
};\r
await fdapi.customTag.add(o);\r
fdapi.customTag.focus(o.id, 50, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的CustomTag\r
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
fdapi.customTag.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个CustomTag对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的CustomTag对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.customTag.delete('ct1');\r
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
| \`ids\` | \`string \\| array\` | CustomTag对象的ID或者ID数组 |\r
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
fdapi.customTag.focus('ct1', 50, 0.1);\r
\`\`\`\r
\r
---\r
\r
### \`focusAll(distance, flyTime, rotation, fn)\` {#focusAll}\r
\r
自动定位到能观察所有CustomTag对象的合适距离\r
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
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.customTag.focusAll(distance, flyTime, rotation);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取CustomTag的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的CustomTag对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
CustomTag的详细信息\r
{\r
            "id":	"ct1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "coordinate":	[495113.718750, 2491218.000000, 0.400000],\r
            "contentURL":	"G:\\\\TEMP\\\\Explorer\\\\SDK\\\\JS/simple.html?icon=images/ctag1.png&title=北医三院&address=海淀区花园北路",\r
            "popupURL":	"G:\\\\TEMP\\\\Explorer\\\\SDK\\\\JS/simple.html",\r
            "contentSize":	[220.000000, 52.000000],\r
            "popupSize":	[600.000000, 480.000000],\r
            "pivot":	[0.500000, 0.500000],\r
            "range":	[1.000000, 5000.000000],\r
            "autoHidePopupWindow":	1\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.customTag.get('ct1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏CustomTag\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | CustomTag对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.customTag.hide('ct1');\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有CustomTag\r
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
fdapi.customTag.hideAll();\r
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
await fdapi.customTag.setAutoHidePopupWindow(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示CustomTag\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | CustomTag对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.customTag.show('ct1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有CustomTag\r
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
fdapi.customTag.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个CustomTag对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | CustomTag类的对象或者数组，参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let o = {\r
    id: 'ct1',\r
    coordinate: [492649.84375, 2492012, 14],\r
    contentURL: HostConfig.Path + '/locale/zh/popup_simple.html?icon=../images/ctag1.png&title=中关村医院&address=中关村南路12号',\r
    contentSize: [220, 52],\r
    popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',\r
    popupSize: [600, 480],\r
    pivot: [0.5, 0.5],\r
    range: [1, 5000]\r
};\r
await fdapi.customTag.update(o);\r
fdapi.customTag.focus(o.id, 50, 0.2);\r
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
await fdapi.customTag.updateEnd();\r
\`\`\`\r
`;export{n as default};
