const n=`---\r
slug: /api/camera/camera\r
title: Camera\r
sidebar_label: Camera\r
description: "Camera 是三维场景的相机（视角）控制核心，负责观察位置、朝向、飞行进入/退出场景、定位到目标、以及对 CustomObject、Vehicle、Train 等对象的自动跟随。"\r
---\r
\r
# Camera\r
\r
Camera 是三维场景的相机（视角）控制核心，负责观察位置、朝向、飞行进入/退出场景、定位到目标、以及对 CustomObject、Vehicle、Train 等对象的自动跟随。\r
\r
通过 \`api.camera\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Camera 是三维场景的相机（视角）控制核心，负责观察位置、朝向、飞行进入/退出场景、定位到目标、以及对 CustomObject、Vehicle、Train 等对象的自动跟随。\r
- **别名 / 不同行业叫法**：相机 / 视角 / 视点 / 镜头 / 摄像机；汇报演示中也常称“看点”“机位”。\r
- **适用行业**：智慧城市、应急指挥、智慧交通、能源（电力/油气）、智慧园区、展厅汇报。\r
- **使用场景**：\r
  - 大屏汇报时一键飞入场景并定位到重点区域、楼宇或设备。\r
  - 应急/交通调度中相机跟随移动目标（车辆、列车、无人机）实时观察。\r
  - 联动业务事件，自动切换到告警点或热点位置形成视角聚焦。\r
- **注意事项**：\r
  - 坐标与朝向需与工程坐标系（Projection/WGS84 等）保持一致，否则定位偏移。\r
  - 设置飞行时间（flyTime）可获得平滑过渡，避免视角生硬跳变影响演示连贯性。\r
  - 跟随结束后需调用 cancelFollow 取消，避免与后续手动操作或漫游冲突。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`cancelFollow\`](#cancelFollow) | 取消相机自动跟随，支持取消CustomObject、Vehicle、Vehicle2、T… |  |\r
| [\`enterWorld\`](#enterWorld) | 进入世界（三维场景），即从地球飞入到三维场景 |  |\r
| [\`exitWorld\`](#exitWorld) | 退出世界（三维场景），即从三维场景飞入到地球 |  |\r
| [\`exportOrthoImage\`](#exportOrthoImage) | 根据传入的参数导出相机位置对应的正交投影图片 |  |\r
| [\`flyAround\`](#flyAround) | 相机环绕指定位置旋转一周 |  |\r
| [\`get\`](#get) | 获取当前的相机位置 | 查询对象信息，用于业务联动 |\r
| [\`getAnimationImage\`](#getAnimationImage) | 根据导览名称获取对应导览缩略图的base64字符串，默认图片格式png，尺寸：128*128 |  |\r
| [\`getAnimationList\`](#getAnimationList) | 获取当前acp里所有导览的信息 |  |\r
| [\`getEulerAngle\`](#getEulerAngle) | 根据空间两点计算欧拉角 |  |\r
| [\`lockByBBox\`](#lockByBBox) | 锁定相机的交互范围，仅允许在BBox内交互 |  |\r
| [\`lookAt\`](#lookAt) | 通过观察点设置相机位置 |  |\r
| [\`lookAtBBox\`](#lookAtBBox) | 通过BBox设置相机 |  |\r
| [\`moveBackward\`](#moveBackward) | 后退 |  |\r
| [\`moveDown\`](#moveDown) | 下降 |  |\r
| [\`moveForward\`](#moveForward) | 前进 |  |\r
| [\`moveLeft\`](#moveLeft) | 左移 |  |\r
| [\`moveRight\`](#moveRight) | 右移 |  |\r
| [\`moveUp\`](#moveUp) | 上升 |  |\r
| [\`pauseAnimation\`](#pauseAnimation) | 暂停播放动画导航 |  |\r
| [\`playAnimation\`](#playAnimation) | 按传入索引序号的顺序播放一个或多个动画导览 |  |\r
| [\`resumeAnimation\`](#resumeAnimation) | 恢复播放动画导航 |  |\r
| [\`set\`](#set) | 设置相机位置，这是最常见的参数形式，另外两种参数形式， |  |\r
| [\`stop\`](#stop) | 停止 | 停止播放 |\r
| [\`stopAnimation\`](#stopAnimation) | 停止播放动画导航 |  |\r
| [\`turnDown\`](#turnDown) | 低头 |  |\r
| [\`turnLeft\`](#turnLeft) | 左转 |  |\r
| [\`turnRight\`](#turnRight) | 右转 |  |\r
| [\`turnUp\`](#turnUp) | 抬头 |  |\r
| [\`unlock\`](#unlock) | 解锁相机的交互范围，恢复自由交互 |  |\r
| [\`useOldDataFormat\`](#useOldDataFormat) | 设置是否使用旧版本的数据格式（2021.03.17之前的版本），这是一个全局的设置。 |  |\r
\r
## 方法（Methods）\r
\r
### \`cancelFollow(fn)\` {#cancelFollow}\r
\r
取消相机自动跟随，支持取消CustomObject、Vehicle、Vehicle2、Train等对象的自动跟随\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：取消相机跟随：CancelFollow\r
\r
\`\`\`js\r
fdapi.camera.cancelFollow();\r
\`\`\`\r
\r
---\r
\r
### \`enterWorld(fn)\` {#enterWorld}\r
\r
进入世界（三维场景），即从地球飞入到三维场景\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：进入世界：EnterWorld\r
\r
\`\`\`js\r
fdapi.camera.enterWorld();\r
\r
//params：x, y, z, pitch, yaw, flyTime 控制相机set()、lookAt()方法也可以实现进入世界效果，同时可以设置进入的具体位置和视角 \r
//fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 0);\r
\`\`\`\r
\r
---\r
\r
### \`exitWorld(fn)\` {#exitWorld}\r
\r
退出世界（三维场景），即从三维场景飞入到地球\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：退出世界：ExitWorld\r
\r
\`\`\`js\r
fdapi.camera.exitWorld();\r
\`\`\`\r
\r
---\r
\r
### \`exportOrthoImage(path, imageSize, orthoWidth, location, rotation, backGroundColor, fn)\` {#exportOrthoImage}\r
\r
根据传入的参数导出相机位置对应的正交投影图片\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`path\` | \`string\` | 导出正交投影图片的磁盘保存路径，注意：目前出图支持png和jpg格式，此路径需要在渲染服务器端存在，因为导出图片文件保存在渲染服务器的磁盘上 |\r
| \`imageSize\` | \`array\` | 导出正交投影图片的宽高分辨率：[width,height]，取值示例：[1920,1080] |\r
| \`orthoWidth\` | \`number\` | 导出正交投影图片的景深长度，单位：米 |\r
| \`location\` | \`array\` | 相机位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`rotation\` | \`array\` | 相机朝向欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0]，默认值：[0,90,0] |\r
| \`backGroundColor\` | [\`Color\`](/docs/api/types#color) | 导出正交投影图片的背景颜色，默认值：黑色[0, 0, 0, 1]，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：导出正交投影图片：ExportOrthoImage\r
\r
\`\`\`js\r
// 导出正交投影图片\r
fdapi.camera.exportOrthoImage("D:\\\\orthoImage.png", [1920, 1080], 88, [492513.613438, 2492183.068945, 40.035171], [-29.806171, -40.45295, 0.000002], [0, 0, 0, 1]);\r
\`\`\`\r
\r
---\r
\r
### \`flyAround(location, rotation, distance, time, fn)\` {#flyAround}\r
\r
相机环绕指定位置旋转一周\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`location\` | \`array\` | 必选，相机环绕位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`rotation\` | \`array\` | 可选，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0]，默认值：[0,90,0] |\r
| \`distance\` | \`number\` | 可选，相机观察距离，单位：米，默认值：[1000] |\r
| \`time\` | \`number\` | 可选，相机环绕一周的时间，取值范围：[0~任意正数]，单位：秒，默认值10秒 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置相机环绕：FlyAround\r
\r
\`\`\`js\r
//环绕参数：location,rotation, distance, time\r
fdapi.camera.flyAround([492552, 2491465, 200], [-54, -150, 0], 300, 5);\r
\`\`\`\r
\r
---\r
\r
### \`get(fn)\` {#get}\r
\r
获取当前的相机位置\r
\r
回调返回的数据格式如下：\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
{\r
            "x":	491433.656250,\r
            "y":	2486907.500000,\r
            "z":	685.200928,\r
            "pitch":	-38.999985,\r
            "yaw":	-64.000023,\r
            "roll":	0.000000,\r
            "camera":	[491433.656250, 2486907.500000, 685.200928, -38.999985, -64.000023, 0.000000]\r
        }\r
\`\`\`\r
\r
camera属性值有6个元素，依次为 \`[X, Y, Z, Pitch, Yaw, Roll]\`\r
\r
x, y, z, pitch, yaw, roll几个值即可以在camera数组里取，也可以直接获取。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
\`\`\`js\r
fdapi.camera.get( (r) => {\r
     var str = \`Camera: \${r.x}, \${r.y}, \${r.z}, \${r.pitch}, \${r.yaw}\`;\r
     //或者这样调用\r
     var str = \`Camera: \${r.camera.join(',')}\`;\r
     log(str);\r
})\r
\`\`\`\r
\r
> 示例：获取相机位置：Get\r
\r
\`\`\`js\r
fdapi.camera.get(function (res) {\r
    log('This is the output information of the callback function of camera.get, which can be reset to the current position by the following code:\\n');\r
    let str = \`fdapi.camera.set(\${res.x}, \${res.y}, \${res.z}, \${res.pitch}, \${res.yaw}, 0);\\n\`;\r
    log(str);\r
})\r
\`\`\`\r
\r
---\r
\r
### \`getAnimationImage(name, fn)\` {#getAnimationImage}\r
\r
根据导览名称获取对应导览缩略图的base64字符串，默认图片格式png，尺寸：128*128\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`name\` | \`string\` | 导览名称，可以根据getAnimationList()方法获取 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
{\r
  "image":	"base64示例内容太长......" //image是导览缩略图的base64字符串 默认图片格式png，尺寸：128*128\r
}\r
\r
base64类型图片使用说明：\r
//js可以直接把base64字符串设置为img标签的src属性值，代码示例如下：\r
fdapi.camera.getAnimationImage("animationName1").then(result=>{\r
   //设置base64类型图片\r
   document.getElementById("img1").setAttribute("src","data:image/png;base64,"+result.image);\r
});\r
\`\`\`\r
\r
> 示例：获取导览缩略图：GetAnimationImage\r
\r
\`\`\`js\r
//参数：导览名称，可以根据getAnimationList()方法获取\r
//注意：因为返回字符串过长，执行此方法前请不要勾选日志的【自动清屏】，具体使用方法请参考api文档\r
fdapi.camera.getAnimationImage("导览1");\r
\`\`\`\r
\r
---\r
\r
### \`getAnimationList(fn)\` {#getAnimationList}\r
\r
获取当前acp里所有导览的信息\r
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
获取当前场景所有导览的列表\r
[{\r
            "id":	0, \r
            "name":	"导览1",\r
            "type": 0, //0导览 1动画\r
            "uuid": "E858A16A4E1940E76C916C80869B373F", //唯一id\r
            "filename": "AnimRecorder0.sav", //导览文件名称\r
            "foldername": "导览目录" //所在文件夹名称 acp工程内全局唯一  \r
        },\r
        {\r
            "id":	1,\r
            "name":	"导览2",\r
            "type": 0, //0导览 1动画\r
            "uuid": "5403B9254286B7EFE9A28DB6A7BC7A08", //唯一id\r
            "filename": "AnimRecorder1.sav", //导览文件名称\r
            "foldername": "导览目录" //所在文件夹名称 acp工程内全局唯一  \r
        }]\r
\`\`\`\r
\r
> 示例：获取导览列表：GetAnimationList\r
\r
\`\`\`js\r
fdapi.camera.getAnimationList();\r
\`\`\`\r
\r
---\r
\r
### \`getEulerAngle(startPoint, endPoint)\` {#getEulerAngle}\r
\r
根据空间两点计算欧拉角\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`startPoint\` | \`\` | 起始点坐标位置，[取值示例](/docs/tutorials/coordinates) |\r
| \`endPoint\` | \`\` | 结束点坐标位置，[取值示例](/docs/tutorials/coordinates) |\r
\r
**返回：** 返回查询结果。\r
\r
\`\`\`js\r
返回欧拉角数组： [Pitch,Yaw,Roll] \r
\r
俯仰-Pitch：上下旋转角度，欧拉角向量的X轴，取值范围：[-90~+90]\r
航向-Yaw：左右旋转角度，欧拉角向量的Y轴，取值范围：[-180~+180]\r
翻滚-Roll：翻滚角度，欧拉角向量的Z轴\r
\`\`\`\r
\r
> 示例：获取两点的欧拉角：GetEulerAngle\r
\r
\`\`\`js\r
let startPoint = [492552.40625, 2492217.25, 0];\r
let endPoint = [492547.75, 2492249.5, 0];\r
fdapi.polyline.clear();\r
let o = {\r
    id: 'p1',//折线唯一标识id\r
    coordinates: [startPoint, endPoint],//构成折线的坐标点数组\r
    range: [1, 10000],//可视范围\r
    color: Color.Red,//折线颜色\r
    style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle\r
    thickness: 1,//折线宽度\r
    intensity: 0.2,//亮度\r
    flowRate: 0.5,//流速\r
    tiling: 0,//材质贴图平铺比例\r
    shape: 0, //折线类型 0：直线， 1：曲线\r
    depthTest: false//是否做深度检测\r
};\r
fdapi.polyline.add(o);\r
fdapi.polyline.focus(o.id);\r
let eulerAngle = fdapi.camera.getEulerAngle(startPoint, endPoint);\r
log("根据空间两点计算的欧拉角:" + eulerAngle);\r
\`\`\`\r
\r
---\r
\r
### \`lockByBBox(bbox, fn)\` {#lockByBBox}\r
\r
锁定相机的交互范围，仅允许在BBox内交互\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`bbox\` | \`\` | 即3D Bounding Box，3D物体的包围盒，用于表示三维物体坐标的取值边界，格式示例：[minX,minY,minZ,maxX,maxY,maxZ] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.camera.lockByBBox(bbox);\r
\`\`\`\r
\r
---\r
\r
### \`lookAt(x, y, z, distance, pitch, yaw, flyTime, fn)\` {#lookAt}\r
\r
通过观察点设置相机位置\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`x\` | \`number\` | 观察点坐标X |\r
| \`y\` | \`number\` | 观察点坐标Y |\r
| \`z\` | \`number\` | 观察点坐标Z |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`pitch\` | \`number\` | 上下旋转角度（俯仰），单位是度。可选参数，如果没有设置或者设置为0，系统会自动设置默认值。 |\r
| \`yaw\` | \`number\` | 左右旋转角度（航向），单位是度。可选参数，如果没有设置或者设置为0，系统会自动设置默认值。 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
fdapi.camera.lookAt(-913.18, -10852.01, 82.49, 200.0, 90.0, -50.0);\r
\`\`\`\r
\r
> 示例：通过观察点设置相机位置：LookAt\r
\r
\`\`\`js\r
__distance += 200.0;\r
//lookAt参数：x, y, z, distance,  pitch, yaw, flyTime\r
fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, __distance, -15.0, -173.0, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`lookAtBBox(bbox, pitch, yaw, flyTime, fn)\` {#lookAtBBox}\r
\r
通过BBox设置相机\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`bbox\` | \`array\` | bounding box |\r
| \`pitch\` | \`number\` | 上下旋转角度（俯仰），单位是度。 此参数可选，如果没有设置或者设置为0，系统会自动设置默认值。 |\r
| \`yaw\` | \`number\` | 左右旋转角度（航向），单位是度。 此参数可选，如果没有设置或者设置为0，系统会自动设置默认值。 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
let bbox = [1083.27, -12907.29, 81.79, 1308.18, -12759.77, 201.51];\r
let yaw = 90.0;\r
let pitch = -50.0;\r
fdapi.camera.lookAtBBox(bbox, yaw, pitch);\r
\`\`\`\r
\r
> 示例：进入物体观察模式：LookAtBBox\r
\r
\`\`\`js\r
//设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式\r
fdapi.settings.setInteractiveMode(3);\r
//[minx,miny,minz,maxx,maxy,maxz]\r
let bbox = [492552.837539, 2492211.111875, -6.922683, 492597.469727, 2492256.456250, 11.040344];\r
//lookAtBBox参数：bbox,  pitch, yaw, flyTime\r
fdapi.camera.lookAtBBox(bbox, -54.0, -173.0, 0.5);\r
\`\`\`\r
\r
> 示例：进入自由交互模式：LookAtBBox\r
\r
\`\`\`js\r
//设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式\r
fdapi.settings.setInteractiveMode(0);\r
//[minx,miny,minz,maxx,maxy,maxz]\r
let bbox = [491904.634063, 2491122.173437, -879.369063, 493670.376758, 2492887.915938, 886.373594];\r
//lookAtBBox参数：bbox,  pitch, yaw, flyTime\r
fdapi.camera.lookAtBBox(bbox, -15.0, -173.0, 0.5);\r
\`\`\`\r
\r
---\r
\r
### \`moveBackward(fn)\` {#moveBackward}\r
\r
后退\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-后退：MoveBackward\r
\r
\`\`\`js\r
fdapi.camera.moveBackward();\r
\`\`\`\r
\r
---\r
\r
### \`moveDown(fn)\` {#moveDown}\r
\r
下降\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-下降：MoveDown\r
\r
\`\`\`js\r
fdapi.camera.moveDown();\r
\`\`\`\r
\r
---\r
\r
### \`moveForward(fn)\` {#moveForward}\r
\r
前进\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-前进：MoveForward\r
\r
\`\`\`js\r
fdapi.camera.moveForward();\r
\`\`\`\r
\r
---\r
\r
### \`moveLeft(fn)\` {#moveLeft}\r
\r
左移\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-左移：MoveLeft\r
\r
\`\`\`js\r
fdapi.camera.moveLeft();\r
\`\`\`\r
\r
---\r
\r
### \`moveRight(fn)\` {#moveRight}\r
\r
右移\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-右移：MoveRight\r
\r
\`\`\`js\r
fdapi.camera.moveRight();\r
\`\`\`\r
\r
---\r
\r
### \`moveUp(fn)\` {#moveUp}\r
\r
上升\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-上升：MoveUp\r
\r
\`\`\`js\r
fdapi.camera.moveUp();\r
\`\`\`\r
\r
---\r
\r
### \`pauseAnimation(fn)\` {#pauseAnimation}\r
\r
暂停播放动画导航\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：暂停播放动画导航：PauseAnimation\r
\r
\`\`\`js\r
fdapi.camera.pauseAnimation();\r
\`\`\`\r
\r
---\r
\r
### \`playAnimation(ids, mask, fn)\` {#playAnimation}\r
\r
按传入索引序号的顺序播放一个或多个动画导览\r
\r
\r
\r
![](/img/refdoc/api/PlayAnimation.gif)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`number \\| array\` | 待播放的动画导览的索引编号或索引编号数组 |\r
| \`mask\` | \`number\` | 可选，播放导览时传入对应掩码则使用录制导览时的工程对应设置，包含四类掩码：相机位置(Camera:0x1) 环境天气(Environment:0x2) 工程树属性(ProjectTree:0x4) 导览设置(Settings:0x8)，请参考 \`AnimationMask\` |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：开始播放动画导航：PlayAnimation\r
\r
\`\`\`js\r
//index：录制导览的索引序号，按数组元素传入的顺序依次播放   \r
//mask ：播放导览时的配置掩码：相机位置(Camera:0x1) 环境天气(Environment:0x2) 工程树属性(ProjectTree:0x4) 导览设置(Settings:0x8)\r
fdapi.camera.playAnimation([1, 0], AnimationMask.Camera | AnimationMask.Environment);\r
\`\`\`\r
\r
---\r
\r
### \`resumeAnimation(fn)\` {#resumeAnimation}\r
\r
恢复播放动画导航\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：恢复播放动画导航：ResumeAnimation\r
\r
\`\`\`js\r
fdapi.camera.resumeAnimation();\r
\`\`\`\r
\r
---\r
\r
### \`set(x, y, z, pitch, yaw, flyTime, fn)\` {#set}\r
\r
设置相机位置，这是最常见的参数形式，另外两种参数形式，请参考[二次开发：关于设置相机位置的三种形式](/docs/tutorials/camera)\r
\r
![](/img/refdoc/api/Camera.Set.gif)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`x\` | \`number\` | 坐标X |\r
| \`y\` | \`number\` | 坐标Y |\r
| \`z\` | \`number\` | 坐标Z |\r
| \`pitch\` | \`number\` | 上下旋转角度（俯仰），单位是度。 此参数可选，如果没有设置或者设置为0，系统会自动设置默认值。 |\r
| \`yaw\` | \`number\` | 左右旋转角度（航向），单位是度。 此参数可选，如果没有设置或者设置为0，系统会自动设置默认值。 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
fdapi.camera.set(-178.14, -8038.16, 250.47, -50.0, 90.0);\r
\`\`\`\r
\r
> 示例：设置相机位置：Set\r
\r
\`\`\`js\r
//参数：x, y, z, pitch, yaw, flyTime\r
fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 0);\r
\`\`\`\r
\r
> 示例：设置相机位置（通过数组参数）：Set\r
\r
\`\`\`js\r
//最后一个元素无用，会忽略\r
let cam = [492552.395391, 2491465.370000, 840.020625, -54.823574, -64.677055, 0.000003];\r
fdapi.camera.set(cam, 0.2);\r
\`\`\`\r
\r
> 示例：设置相机位置（通过对象参数）：Set\r
\r
\`\`\`js\r
let cam = {\r
    "x": 492552.395391,\r
    "y": 2491465.370000,\r
    "z": 1031.461914,\r
    "pitch": -54.823574,\r
    "yaw": -152.668823,\r
    "roll": 0.0     //该参数无用，会自动忽略\r
};\r
fdapi.camera.set(cam, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`stop(fn)\` {#stop}\r
\r
停止\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-停止：Stop\r
\r
\`\`\`js\r
fdapi.camera.stop();\r
\`\`\`\r
\r
---\r
\r
### \`stopAnimation(fn)\` {#stopAnimation}\r
\r
停止播放动画导航\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：停止播放动画导航：StopAnimation\r
\r
\`\`\`js\r
fdapi.camera.stopAnimation();\r
\`\`\`\r
\r
---\r
\r
### \`turnDown(fn)\` {#turnDown}\r
\r
低头\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-低头：TurnDown\r
\r
\`\`\`js\r
fdapi.camera.turnDown();\r
\`\`\`\r
\r
---\r
\r
### \`turnLeft(fn)\` {#turnLeft}\r
\r
左转\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-左转：TurnLeft\r
\r
\`\`\`js\r
fdapi.camera.turnLeft();\r
\`\`\`\r
\r
---\r
\r
### \`turnRight(fn)\` {#turnRight}\r
\r
右转\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-右转：TurnRight\r
\r
\`\`\`js\r
fdapi.camera.turnRight();\r
\`\`\`\r
\r
---\r
\r
### \`turnUp(fn)\` {#turnUp}\r
\r
抬头\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：相机控制-抬头：TurnUp\r
\r
\`\`\`js\r
fdapi.camera.turnUp();\r
\`\`\`\r
\r
---\r
\r
### \`unlock(fn)\` {#unlock}\r
\r
解锁相机的交互范围，恢复自由交互\r
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
await fdapi.camera.unlock();\r
\`\`\`\r
\r
---\r
\r
### \`useOldDataFormat(bUse)\` {#useOldDataFormat}\r
\r
设置是否使用旧版本的数据格式（2021.03.17之前的版本），这是一个全局的设置。\r
\r
受影响的方法有：camera对象的set、lookAt、lookAtBBox，以camera.set举例：\r
\r
之前版本的方法定义如下：\`(x, y, z, heading, tilt, flyTime, fn)\`\r
\r
现在的定义如下：\`set(x, y, z, pitch, yaw, flyTime, fn)\`\r
\r
两个的区别就是heading(yaw), tilt(pitch)的顺序互换了一下\r
\r
如果调用了useOldDataFormat()，可以让用户代码保持兼容（不用修改就可以在新版本上运行）\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`bUse\` | \`boolean\` | 可选参数，默认为true。 |\r
\r
**返回：** 无返回值。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.camera.useOldDataFormat(bUse);\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> 锁定相机交互范围：LockByBBox\r
\r
\`\`\`js\r
//限制相机交互范围\r
let bbox = [492552.837539, 2492211.111875, 0, 492597.469727, 2492256.456250, 20]\r
fdapi.camera.lockByBBox(bbox);\r
\`\`\`\r
\r
> 解锁相机交互范围：UnLock\r
\r
\`\`\`js\r
fdapi.camera.unlock();\r
\`\`\`\r
`;export{n as default};
