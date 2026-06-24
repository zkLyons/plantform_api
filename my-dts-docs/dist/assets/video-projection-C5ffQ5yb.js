const n=`---\r
title: VideoProjection\r
sidebar_label: VideoProjection\r
description: "VideoProjection 将视频/实时流以投影方式贴合到三维场景表面，实现视频与三维的融合。"\r
---\r
\r
# VideoProjection\r
\r
VideoProjection 将视频/实时流以投影方式贴合到三维场景表面，实现视频与三维的融合。\r
\r
\r
VideoProjection的效果图：\r
\r
\r
\r
![](/img/refdoc/api/VideoProjection.jpg)\r
\r
通过 \`api.videoProjection\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：VideoProjection 将视频/实时流以投影方式贴合到三维场景表面，实现视频与三维的融合。\r
- **别名 / 不同行业叫法**：视频投影 / 视频融合 / 实景融合 / 视频上图 / AR 融合。\r
- **适用行业**：安防监控、智慧城市、智慧园区、智慧交通、智慧水利\r
- **使用场景**：\r
  - 监控视频投射到对应建筑/路口，实现“一张图看实景”\r
  - 重点区域的视频融合监看\r
  - 指挥大屏的实景增强\r
- **注意事项**：\r
  - 投影面与相机参数需标定对齐，否则画面错位\r
  - 多路视频流注意带宽与解码性能\r
  - 流地址需鉴权与时效管理\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个VideoProjection对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的VideoProjection对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个VideoProjection对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取VideoProjection的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏VideoProjection | 按业务条件隐藏对象 |\r
| [\`setAspectRatio\`](#setAspectRatio) | 设置纵横比 |  |\r
| [\`setDepthCulling\`](#setDepthCulling) | 设置是否背面剔除 |  |\r
| [\`setDistance\`](#setDistance) | 设置距离 |  |\r
| [\`setFovy\`](#setFovy) | 设置垂直夹角 |  |\r
| [\`setFrustumColor\`](#setFrustumColor) | 设置投影线框颜色 |  |\r
| [\`setLocation\`](#setLocation) | 设置位置 |  |\r
| [\`setRotation\`](#setRotation) | 设置旋转值 |  |\r
| [\`setVideoURL\`](#setVideoURL) | 设置视频地址 |  |\r
| [\`show\`](#show) | 显示VideoProjection | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个VideoProjection对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个VideoProjection对象\r
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
| \`coordinateType\` | \`number\` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |\r
| \`videoURL\` | \`string\` | 视频地址，支持本地文件和网络文件，同时支持rtsp协议、http协议等实时流媒体地址 |\r
| \`location\` | \`array\` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`rotation\` | \`array\` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`fov\` | \`number\` | 垂直夹角，取值范围：[0~160]，单位：度 |\r
| \`aspectRatio\` | \`number\` | 宽高比，常见比例如：16:9或4:3等，取值范围：[0.1~10.0] |\r
| \`exposure\` | \`number\` | 曝光度，取值范围：[0~3]，默认值：0.6 |\r
| \`screen\` | \`boolean\` | 是否显示投影幕布，默认值：false |\r
| \`screenDistance\` | \`number\` | 投影幕布的显示距离，单位：米，默认值：100米 |\r
| \`distance\` | \`number\` | 投影距离，取值范围：[0~1000000.0]，单位：米 |\r
| \`minDistance\` | \`number\` | 近裁距离，取值范围：[0~1000000.0]，单位：米 |\r
| \`depthCulling\` | \`boolean\` | 是否背面剔除，默认值：false |\r
| \`frustumVisible\` | \`boolean\` | 是否显示投影线框，默认值：false |\r
| \`frustumColor\` | [\`Color\`](/docs/api/types#color) | 投影线框颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`texturePath\` | \`string\` | 自定义投影蒙版图片路径，可以是本地路径，也支持网络路径，[资源引入说明](/docs/tutorials/resources) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.videoProjection.delete('vp1');\r
let o = {\r
    id: "vp1",\r
    videoURL: HostConfig.Path + "/assets/video/video2.mov",//视频地址\r
    location: [492753.3125, 2491942.25, 60],\r
    rotation: [-10, 10, 0],\r
    fov: 90,//垂直夹角\r
    aspectRatio: 1.5,//纵横比\r
    exposure: 0.6, //曝光度\r
    distance: 100,//投影距离\r
    minDistance: 5,//近裁距离\r
    depthCulling: true,//是否背面剔除 即背面不显示投影\r
    frustumVisible: true,//是否显示投影线框\r
    frustumColor: [1, 1, 1, 1], //投影线框颜色\r
    texturePath: HostConfig.Path + '/assets/image/decal2.png', //自定义投影蒙版图片路径\r
    screen: true, //是否显示投影幕布，默认值：false\r
    screenDistance: 120 //投影幕布的显示距离，单位：米，默认值：100米\r
}\r
await fdapi.videoProjection.add(o);\r
fdapi.videoProjection.focus(o.id, 50);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的VideoProjection对象\r
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
fdapi.videoProjection.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个VideoProjection对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的VideoProjection对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.videoProjection.delete('vp1');\r
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
| \`ids\` | \`string \\| array\` | VideoProjection对象的ID或者ID数组 |\r
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
fdapi.videoProjection.focus('vp1', 100);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取VideoProjection的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的VideoProjection对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
VideoProjection的详细信息\r
[{\r
            "id":	"vp1",\r
            "groupId":	"",\r
            "videoURL":	"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\Cloud\\\\SDK/media/video/video2.mov",\r
            "mediaType":	153,\r
            "location":	[495333.593750, 2490901.000000, 20.000000],\r
            "rotation":	[-49.999992, 0.000000, 0.000000],\r
            "fov":	90.000000,\r
            "aspectRatio":	1.770000,\r
            "distance":	100.000000,\r
            "depthCulling":	1,\r
            "frustumColor":	[0.000000, 0.000000, 1.000000, 1.000000]\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.videoProjection.get('vp1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏VideoProjection\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | VideoProjection对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.videoProjection.hide('vp1');\r
\`\`\`\r
\r
---\r
\r
### \`setAspectRatio(id, newVal, fn)\` {#setAspectRatio}\r
\r
设置纵横比\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | VideoProjection对象的ID |\r
| \`newVal\` | \`number\` | 新纵横比，取值范围：[0.1~10.0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置纵横比：SetAspectRatio\r
\r
\`\`\`js\r
fdapi.videoProjection.setAspectRatio('vp1', 3);\r
\`\`\`\r
\r
---\r
\r
### \`setDepthCulling(id, newVal, fn)\` {#setDepthCulling}\r
\r
设置是否背面剔除\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | VideoProjection对象的ID |\r
| \`newVal\` | \`boolean\` | 是否背面剔除，默认值：false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置是否背面剔除：SetDepthCulling\r
\r
\`\`\`js\r
fdapi.videoProjection.setDepthCulling('vp1', false);\r
\`\`\`\r
\r
---\r
\r
### \`setDistance(id, newVal, fn)\` {#setDistance}\r
\r
设置距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | VideoProjection对象的ID |\r
| \`newVal\` | \`number\` | 新距离值，取值范围：[0~1000000.0]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置距离：SetDistance\r
\r
\`\`\`js\r
fdapi.videoProjection.setDistance('vp1', 200);\r
\`\`\`\r
\r
---\r
\r
### \`setFovy(id, newVal, fn)\` {#setFovy}\r
\r
设置垂直夹角\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | VideoProjection对象的ID |\r
| \`newVal\` | \`number\` | 新垂直夹角，取值范围：[0~160]，单位：度 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置垂直夹角：SetFovy\r
\r
\`\`\`js\r
fdapi.videoProjection.setFovy('vp1', 100);\r
\`\`\`\r
\r
---\r
\r
### \`setFrustumColor(id, newVal, fn)\` {#setFrustumColor}\r
\r
设置投影线框颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | VideoProjection对象的ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置投影线框颜色：SetFrustumColor\r
\r
\`\`\`js\r
fdapi.videoProjection.setFrustumColor('vp1', Color.Red);\r
\`\`\`\r
\r
---\r
\r
### \`setLocation(id, newVal, fn)\` {#setLocation}\r
\r
设置位置\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | VideoProjection对象的ID |\r
| \`newVal\` | \`array\` | 新位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置位置：SetLocation\r
\r
\`\`\`js\r
fdapi.videoProjection.setLocation('vp1', [492728.4375, 2491908, 68]);\r
\`\`\`\r
\r
---\r
\r
### \`setRotation(id, newVal, fn)\` {#setRotation}\r
\r
设置旋转值\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | VideoProjection对象的ID |\r
| \`newVal\` | \`array\` | 新旋转值：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置旋转值：SetRotation\r
\r
\`\`\`js\r
fdapi.videoProjection.setRotation('vp1', [-100, 0, 0]);\r
\`\`\`\r
\r
---\r
\r
### \`setVideoURL(id, newVal, fn)\` {#setVideoURL}\r
\r
设置视频地址\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | VideoProjection对象的ID |\r
| \`newVal\` | \`string\` | 新视频地址，支持本地文件和网络地址，同时支持rtsp实时视频流协议，注意：mp4文件视频只支持H264/AVC编码格式的 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置视频地址：SetVideoURL\r
\r
\`\`\`js\r
fdapi.videoProjection.setVideoURL('vp1', HostConfig.Path + "/assets/video/video1.webm");\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示VideoProjection\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | VideoProjection对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.videoProjection.show('vp1');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个VideoProjection对象\r
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
let o = {\r
    id: "vp1",\r
    rotation: [-90, 120, 0],\r
    fov: 90,\r
    exposure: 1, //曝光度\r
    aspectRatio: 1,\r
    distance: 120,\r
    texturePath: '' //自定义投影蒙版图片路径\r
}\r
await fdapi.videoProjection.update(o);\r
fdapi.videoProjection.focus(o.id, 50);\r
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
await fdapi.videoProjection.updateEnd();\r
\`\`\`\r
`;export{n as default};
