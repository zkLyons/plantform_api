const n=`---\r
title: Panorama\r
sidebar_label: Panorama\r
description: "Panorama 在三维场景的指定坐标处加载并展示 360° 全景照片，使用户可在该点位沉浸式查看真实环境，实现三维模型与实景全景的融合浏览。"\r
---\r
\r
# Panorama\r
\r
Panorama 在三维场景的指定坐标处加载并展示 360° 全景照片，使用户可在该点位沉浸式查看真实环境，实现三维模型与实景全景的融合浏览。\r
\r
\r
\r
![](/img/refdoc/api/Panorama.Add.gif)\r
\r
通过 \`api.panorama\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Panorama 在三维场景的指定坐标处加载并展示 360° 全景照片，使用户可在该点位沉浸式查看真实环境，实现三维模型与实景全景的融合浏览。\r
- **别名 / 不同行业叫法**：全景、全景照片、街景、720 全景、球面全景、实景点位、全景漫游。\r
- **适用行业**：智慧城市、园区、交通、智慧水利、安防、应急管理。\r
- **使用场景**：\r
  - 园区 / 城市：在关键点位嵌入全景照片，实现重点场所的实景漫游与现场还原。\r
  - 水利 / 交通：闸站、桥隧、道路节点的现场全景记录与巡查回看。\r
  - 应急 / 安防：事故现场、重点目标的全景留存与沉浸式查看。\r
- **注意事项**：\r
  - \`onTerrain\` 设为贴地后 \`offset\` 偏移量的 Z 轴会失效，需手动控制高度时应关闭贴地。\r
  - \`yaw\` 用于校正全景图朝向，使全景方位与真实地理方位一致。\r
  - 全景图片分辨率较高时加载有一定耗时，建议对图片做合理压缩与本地化部署。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Panorama全景图对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 清空场景中所有的Panorama | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个Panorama对象 | 按 ID 移除指定对象 |\r
| [\`enter\`](#enter) | 进入全景图模式 |  |\r
| [\`exit\`](#exit) | 退出全景图模式 |  |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取Panorama的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`switchMode\`](#switchMode) | 切换显示模式，即全景图模式和三维场景模式切换 |  |\r
| [\`update\`](#update) | 修改一个或多个Panorama对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个Panorama全景图对象\r
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
| \`id\` | \`string\` | 全景图ID，字符串类型 |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`imagePath\` | \`string\` | 图片路径，支持本地路径，[资源引入说明](/docs/tutorials/resources) |\r
| \`coordinate\` | \`array\` | 坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`yaw\` | \`number\` | 方向，取值范围：[-360~360] |\r
| \`onTerrain\` | \`boolean\` | 全景图是否贴地，默认值：true，注意：设置为贴地后offset偏移量的Z轴会失效 |\r
| \`offset\` | \`array\` | 偏移量，[X,Y,Z]，数组取值范围：[任意数值]，单位：米 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.panorama.clear();\r
await fdapi.panorama.add({\r
    id: 'p1',\r
    imagePath: HostConfig.Path + '/assets/image/panorama1.jpg',\r
    coordinate: [492706.53125, 2491819.75, 23],\r
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 \r
    yaw: 75, //方向\r
    onTerrain: true, //是否贴地，注意：设置为贴地后offset偏移量的Z轴会失效\r
    offset: [0, 0, 0] //偏移量\r
});\r
fdapi.panorama.focus('p1');\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的Panorama\r
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
fdapi.panorama.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个Panorama对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的Panorama对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.panorama.delete('p1');\r
\`\`\`\r
\r
---\r
\r
### \`enter(id, fn)\` {#enter}\r
\r
进入全景图模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 要进入的全景图id |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Enter\r
\r
\`\`\`js\r
fdapi.panorama.enter('p1');\r
\`\`\`\r
\r
---\r
\r
### \`exit(fn)\` {#exit}\r
\r
退出全景图模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Exit\r
\r
\`\`\`js\r
fdapi.panorama.exit();\r
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
| \`ids\` | \`string \\| array\` | Panorama对象的ID或者ID数组 |\r
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
fdapi.panorama.focus('p1');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取Panorama的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的Panorama对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
Panorama的详细信息\r
[{\r
            "id":	"p1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "imagePath":	"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\Cloud\\\\SDK/media/panorama1.jpg",\r
            "coordinates":	[495302.625000, 2491061.500000, 30.152344],\r
            "yaw":	75.000000\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.panorama.get('p1');\r
\`\`\`\r
\r
---\r
\r
### \`switchMode(fn)\` {#switchMode}\r
\r
切换显示模式，即全景图模式和三维场景模式切换\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SwitchMode\r
\r
\`\`\`js\r
fdapi.panorama.switchMode();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个Panorama对象\r
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
await fdapi.panorama.update({\r
    id: 'p1',\r
    imagePath: HostConfig.Path + '/assets/image/panorama2.jpg',\r
    yaw: 75,\r
    onTerrain: false, //是否贴地\r
    offset: [0, 0, 0] //偏移量\r
});\r
fdapi.panorama.focus('p1');\r
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
await fdapi.panorama.updateEnd();\r
\`\`\`\r
`;export{n as default};
