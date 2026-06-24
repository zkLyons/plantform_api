const r=`---\r
title: Coord\r
sidebar_label: Coord\r
description: "Coord 提供坐标系之间的转换工具（投影、经纬度、场景坐标互转等）。"\r
---\r
\r
# Coord\r
\r
Coord 提供坐标系之间的转换工具（投影、经纬度、场景坐标互转等）。\r
\r
通过 \`api.coord\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Coord 提供坐标系之间的转换工具（投影、经纬度、场景坐标互转等）。\r
- **别名 / 不同行业叫法**：坐标转换 / 投影转换 / 经纬度互转 / 坐标工具 / 坐标系换算。\r
- **适用行业**：GIS、测绘、智慧城市、智慧水利、智慧交通（凡涉及空间数据）\r
- **使用场景**：\r
  - 业务经纬度与场景投影坐标互转\r
  - 多源数据坐标系的统一\r
  - 接口取值前的坐标换算\r
- **注意事项**：\r
  - 需明确源/目标坐标系与基准\r
  - 高程基准易被忽略\r
  - 批量转换注意精度与性能\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`gcs2pcs\`](#gcs2pcs) | 地理坐标转投影坐标 | 接入 GPS/北斗经纬度数据时转换为场景坐标 |\r
| [\`pcs2gcs\`](#pcs2gcs) | 投影坐标转地理坐标 | 将场景拾取坐标回传 GIS / 上报经纬度 |\r
| [\`screen2World\`](#screen2World) | 屏幕坐标转为投影坐标 | 视频流的屏幕像素位置转换为三维场景内的真实投影坐标 |\r
| [\`world2Screen\`](#world2Screen) | 投影坐标转为屏幕坐标 | 在三维物体上叠加 HTML 标签/弹窗定位 |\r
\r
## 方法（Methods）\r
\r
### \`gcs2pcs(coordinates, coordinateType, fn)\` {#gcs2pcs}\r
\r
地理坐标转投影坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)\r
\r
注意：在调用接口之前，需要设置工程的坐标系，否则转换失败，错误代码-4\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`coordinates\` | \`array\` | 坐标值，支持以下几种格式： [0,0] [0,0,0] [[0,0], [0,0], [0,0] ...] [[0,0,0], [0,0,0], [0,0,0] ...] |\r
| \`coordinateType\` | \`number\` | 地理坐标的坐标系类型，取值范围：1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：1 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：地理坐标转为投影坐标：GCS2PCS\r
\r
\`\`\`js\r
//WGS84经纬度转工程坐标系对应的投影坐标 注意：工程需要设置对应的坐标系\r
fdapi.coord.gcs2pcs([113.98259824550810, 30.297492106590411], 1);\r
\`\`\`\r
\r
---\r
\r
### \`pcs2gcs(coordinates, coordinateType, fn)\` {#pcs2gcs}\r
\r
投影坐标转地理坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`coordinates\` | \`array\` | 坐标值，支持以下几种格式： [0,0] [0,0,0] [[0,0], [0,0], [0,0] ...] [[0,0,0], [0,0,0], [0,0,0] ...] |\r
| \`coordinateType\` | \`number\` | 地理坐标的坐标系类型，取值范围：1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：1 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：投影坐标转为地理坐标：PCS2GCS\r
\r
\`\`\`js\r
//投影转WGS84经纬度 注意：工程需要设置对应的坐标系\r
fdapi.coord.pcs2gcs([498326, 3353092], 1);\r
\`\`\`\r
\r
---\r
\r
### \`screen2World(x, y, fn)\` {#screen2World}\r
\r
屏幕坐标转为投影坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)\r
\r
注意：这里的屏幕坐标是相对渲染窗口的坐标，坐标原点位于渲染窗口的左上角。\r
\r
对于Explorer来说，屏幕坐标就是Explorer窗口坐标；\r
\r
对于Cloud来说，屏幕坐标是相对视频流画面的坐标而不是Video元素的坐标\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`x\` | \`number\` | 屏幕坐标值x |\r
| \`y\` | \`number\` | 屏幕坐标值y |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
fdapi.coord.screen2World(643.466, 392.872);\r
\`\`\`\r
\r
> 示例：屏幕坐标转为世界坐标：Screen2World\r
\r
\`\`\`js\r
//屏幕坐标转投影 \r
let res = await fdapi.coord.screen2World(600, 400);\r
log('Screen2World Result: ' + res.worldLocation);\r
\`\`\`\r
\r
---\r
\r
### \`world2Screen(x, y, z, fn)\` {#world2Screen}\r
\r
投影坐标转为屏幕坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)\r
\r
注意：这里的屏幕坐标是相对渲染窗口的坐标，坐标原点位于渲染窗口的左上角。\r
\r
对于Explorer来说，屏幕坐标就是Explorer窗口坐标；\r
\r
对于Cloud来说，屏幕坐标是相对视频流画面的坐标而不是Video元素的坐标\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`x\` | \`number\` | 世界坐标点x |\r
| \`y\` | \`number\` | 世界坐标点y |\r
| \`z\` | \`number\` | 世界坐标点z |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
fdapi.coord.world2Screen(-27.39, -9020.16, 82.69);\r
\`\`\`\r
\r
> 示例：世界坐标转为屏幕坐标：World2Screen\r
\r
\`\`\`js\r
//设置位置\r
fdapi.camera.set(492616.92625, 2492173.455781, 69.874717, -54.843128, -90.117546, 0);\r
\r
\r
//投影坐标转屏幕坐标\r
let res = await fdapi.coord.world2Screen(492577.2846875, 2492224.9596875003, 2.7180029296875);\r
log('World2Screen Result: ' + res.screenPosition);\r
\`\`\`\r
`;export{r as default};
