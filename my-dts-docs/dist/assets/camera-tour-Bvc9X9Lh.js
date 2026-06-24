const r=`---\r
title: CameraTour\r
sidebar_label: CameraTour\r
description: "CameraTour 定义并播放相机沿关键帧的导览/漫游动画，实现自动巡游、镜头切换与定点轮巡。"\r
---\r
\r
# CameraTour\r
\r
CameraTour 定义并播放相机沿关键帧的导览/漫游动画，实现自动巡游、镜头切换与定点轮巡。\r
\r
通过 \`api.cameraTour\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：CameraTour 定义并播放相机沿关键帧的导览/漫游动画，实现自动巡游、镜头切换与定点轮巡。\r
- **别名 / 不同行业叫法**：导览 / 漫游 / 巡游 / 飞行路线 / 镜头动画 / 自动巡检视角。\r
- **适用行业**：智慧城市、展厅汇报、文旅、智慧园区、能源巡检\r
- **使用场景**：\r
  - 领导汇报时的自动巡游与镜头脚本\r
  - 项目沿预设路线的全景展示\r
  - 重点部位定点轮巡视角切换\r
- **注意事项**：\r
  - 关键帧之间需平滑过渡，避免镜头跳变与眩晕\r
  - 与业务事件联动时注意时序\r
  - 路线过长时提供可暂停/跳转的控制\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 创建一个或多个CameraTour对象 | 向场景批量添加对象 |\r
| [\`delete\`](#delete) | 删除一个或多个CameraTour对象 | 按 ID 移除指定对象 |\r
| [\`exportVideo\`](#exportVideo) | 根据CameraTour的ID导出视频文件， |  |\r
| [\`pause\`](#pause) | 暂停播放导览动画 | 暂停播放 |\r
| [\`play\`](#play) | 开始播放导览动画 | 播放动画/导览 |\r
| [\`resume\`](#resume) | 恢复播放导览动画 | 恢复播放 |\r
| [\`setDuration\`](#setDuration) | 设置时间长度 |  |\r
| [\`setKeyFrames\`](#setKeyFrames) | 设置导览动画关键帧 |  |\r
| [\`setMouseClickToPause\`](#setMouseClickToPause) | 设置播放导览时点击鼠标是否暂停 |  |\r
| [\`setName\`](#setName) | 设置名称 |  |\r
| [\`setTime\`](#setTime) | 设置导览从某时刻开始播放 |  |\r
| [\`setUserData\`](#setUserData) | 设置用户数据 |  |\r
| [\`stop\`](#stop) | 停止播放导览动画 | 停止播放 |\r
| [\`update\`](#update) | 修改一个或多个CameraTour对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
创建一个或多个CameraTour对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`CameraTourData \\| array\` | [\`CameraTourData\`](/docs/api/camera/camera-tour-data)类的对象或者数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
await fdapi.cameraTour.delete('1');\r
//通过接口添加导览并播放\r
let frames = [];\r
//注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算\r
frames.push(new CameraTourKeyFrame(0, 1.0, [492501.90625, 2483838.75, 5898.237305], [-55.95829, -89.993935, 0]));\r
frames.push(new CameraTourKeyFrame(1, 2.0, [493538.75, 2487061.5, 1166.874878], [-36.769756, -91.261223, 0]));\r
frames.push(new CameraTourKeyFrame(2, 3.0, [493364.78125, 2487789.25, 504.430054], [-23.049517, -91.261223, 0]));\r
frames.push(new CameraTourKeyFrame(3, 4.0, [495635.78125, 2491133.75, 183.135956], [-24.96583, -172.325165, 0]));\r
frames.push(new CameraTourKeyFrame(4, 5.0, [495270, 2491256.75, 67.038582], [-25.314354, 108.269859, 0]));\r
\r
let o = new CameraTourData('1', 'test', frames);\r
await fdapi.cameraTour.add(o);\r
fdapi.cameraTour.play('1');\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个CameraTour对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的CameraTour对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.cameraTour.delete('1');\r
\`\`\`\r
\r
---\r
\r
### \`exportVideo(id, path)\` {#exportVideo}\r
\r
根据CameraTour的ID导出视频文件，注意：导出的视频文件默认格式为*.mp4，分辨率：1920X1080，帧速率：30\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | CameraTour的ID |\r
| \`path\` | \`string\` | 导出的相机导览视频文件的磁盘保存路径，注意：此路径需要在渲染服务器端存在，因为导出视频文件保存在渲染服务器的磁盘上，取值示例：D:/videos/test.mp4 |\r
\r
**返回：** 返回查询结果。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.cameraTour.exportVideo(id, path);\r
\`\`\`\r
\r
---\r
\r
### \`pause()\` {#pause}\r
\r
暂停播放导览动画\r
\r
**返回：** 无返回值。\r
\r
> 示例：Pause\r
\r
\`\`\`js\r
fdapi.cameraTour.pause();\r
\`\`\`\r
\r
---\r
\r
### \`play(id, fn)\` {#play}\r
\r
开始播放导览动画\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | CameraTour的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Play\r
\r
\`\`\`js\r
fdapi.cameraTour.play('1');\r
\`\`\`\r
\r
---\r
\r
### \`resume()\` {#resume}\r
\r
恢复播放导览动画\r
\r
**返回：** 无返回值。\r
\r
> 示例：Resume\r
\r
\`\`\`js\r
fdapi.cameraTour.resume();\r
\`\`\`\r
\r
---\r
\r
### \`setDuration(id, val, fn)\` {#setDuration}\r
\r
设置时间长度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | CameraTour的ID |\r
| \`val\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.cameraTour.setDuration(id, val);\r
\`\`\`\r
\r
---\r
\r
### \`setKeyFrames(id, val, fn)\` {#setKeyFrames}\r
\r
设置导览动画关键帧\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | CameraTour的ID |\r
| \`val\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.cameraTour.setKeyFrames(id, val);\r
\`\`\`\r
\r
---\r
\r
### \`setMouseClickToPause(id, bool, fn)\` {#setMouseClickToPause}\r
\r
设置播放导览时点击鼠标是否暂停\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 相机导览的ID |\r
| \`bool\` | \`boolean\` | 播放导览时点击鼠标是否暂停，默认：true |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetMouseClickToPause\r
\r
\`\`\`js\r
fdapi.cameraTour.setMouseClickToPause('1', false);\r
\`\`\`\r
\r
---\r
\r
### \`setName(id, val, fn)\` {#setName}\r
\r
设置名称\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | CameraTour的ID |\r
| \`val\` | \`string\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.cameraTour.setName(id, val);\r
\`\`\`\r
\r
---\r
\r
### \`setTime(id, time, fn)\` {#setTime}\r
\r
设置导览从某时刻开始播放\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 相机导览的ID |\r
| \`time\` | \`number\` | 导览开始播放的时刻 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetTime\r
\r
\`\`\`js\r
fdapi.cameraTour.setTime('1', 3);\r
\`\`\`\r
\r
---\r
\r
### \`setUserData(id, val, fn)\` {#setUserData}\r
\r
设置用户数据\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | CameraTour的ID |\r
| \`val\` | \`string\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.cameraTour.setUserData(id, val);\r
\`\`\`\r
\r
---\r
\r
### \`stop(fn)\` {#stop}\r
\r
停止播放导览动画\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Stop\r
\r
\`\`\`js\r
fdapi.cameraTour.stop();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个CameraTour对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`CameraTourData \\| array\` | [\`CameraTourData\`](/docs/api/camera/camera-tour-data)类的对象或者数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
//调整关键帧\r
let frames = [];\r
//注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算\r
frames.push(new CameraTourKeyFrame(0, 1.0, [492101.90625, 2483338.75, 5898.237305], [-25.95829, -29.993935, 0]));\r
frames.push(new CameraTourKeyFrame(1, 2.0, [493238.75, 2487261.5, 1166.874878], [-46.769756, -11.261223, 0]));\r
frames.push(new CameraTourKeyFrame(2, 3.0, [493364.78125, 2487489.25, 504.430054], [-23.049517, -21.261223, 0]));\r
\r
let o = new CameraTourData('1', 'test', frames);\r
await fdapi.cameraTour.update(o);\r
fdapi.cameraTour.play('1');\r
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
await fdapi.cameraTour.updateEnd();\r
\`\`\`\r
`;export{r as default};
