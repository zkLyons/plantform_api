const n=`---\r
title: HeatMap\r
sidebar_label: HeatMap\r
description: "HeatMap 根据离散热力点及其热力值，在地表生成二维平面热力图，通过颜色梯度直观表达数据在空间上的密度、强度或聚集分布。"\r
---\r
\r
# HeatMap\r
\r
HeatMap 根据离散热力点及其热力值，在地表生成二维平面热力图，通过颜色梯度直观表达数据在空间上的密度、强度或聚集分布。\r
\r
HeatMap 效果图如下：\r
\r
\r
\r
![](/img/refdoc/api/HeatMap.png)\r
\r
通过 \`api.heatmap\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：HeatMap 根据离散热力点及其热力值，在地表生成二维平面热力图，通过颜色梯度直观表达数据在空间上的密度、强度或聚集分布。\r
- **别名 / 不同行业叫法**：热力图、人流热区、OD 热力、密度图、分布图、强度图、色斑图。\r
- **适用行业**：智慧城市、安防、交通、园区、应急管理、海洋。\r
- **使用场景**：\r
  - 智慧城市 / 安防：展示人流密度、客流热区、POI 聚集度，辅助安保布防与公共空间管理。\r
  - 交通行业：OD 出行热力、路网拥堵强度、站点客流分布可视化。\r
  - 园区 / 环境监测：温度、噪声、空气质量等监测值的空间插值分布展示。\r
- **注意事项**：\r
  - 热力点 \`heatValue\` 须落在 \`range\` 设定范围内，超出范围的点将按无效处理。\r
  - \`textureSize\` 越大热力图越清晰但生成越耗时，海量热力点时应权衡纹理尺寸与性能。\r
  - 本对象为二维平面热力图，若需表达空间体积内的三维分布请使用 HeatMap3D。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`addByHeatPoints\`](#addByHeatPoints) | 根据热力点绘制热力图 |  |\r
| [\`addByTif\`](#addByTif) | 根据tif文件加载热力图 |  |\r
| [\`addPoints\`](#addPoints) | 为HeatMap添加热力点 |  |\r
| [\`clear\`](#clear) | 删除场景中所有的HeatMap | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个HeatMap对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取HeatMap的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏HeatMap | 按业务条件隐藏对象 |\r
| [\`highlightPixels\`](#highlightPixels) | 高亮通过Tif文件加载的热力图中指定的像素点， |  |\r
| [\`load\`](#load) | 预加载的热力图动画，包含多个Tif文件，加载后可以使用play()方法进行播放。 |  |\r
| [\`pause\`](#pause) | 暂停播放热力图动画 | 暂停播放 |\r
| [\`play\`](#play) | 播放预加载的热力图动画 | 播放动画/导览 |\r
| [\`removePoints\`](#removePoints) | 为HeatMap移除热力点 |  |\r
| [\`setBBox\`](#setBBox) | 设置BoundingBox 热力点坐标的范围 |  |\r
| [\`setRange\`](#setRange) | 设置热力值的范围 |  |\r
| [\`setTime\`](#setTime) | 从第几秒开始播放 |  |\r
| [\`show\`](#show) | 显示HeatMap | 按业务条件显示对象 |\r
| [\`unHighlightAllPixels\`](#unHighlightAllPixels) | 取消热力图内所有像素点高亮 |  |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateByHeatPoints\`](#updateByHeatPoints) | 更新热力图 |  |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`addByHeatPoints(heatmap, fn)\` {#addByHeatPoints}\r
\r
根据热力点绘制热力图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`heatmap\` | \`object\` | HeatMap对象属性如下： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`heatmap\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`bbox\` | \`array\` | 热力点坐标的范围 |\r
| \`range\` | \`array\` | 可选，热力值的范围 |\r
| \`data\` | \`array\` | 可选，热力图包含的热力点数据，（注意：点的heatValue取值要在range所设定的范围内） |\r
| \`data.id\` | \`string\` | 字符串类型的ID |\r
| \`data.coordinate\` | \`array\` | 热力点坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`data.radius\` | \`number\` | 热力点影像半径范围，取值范围：[任意数值] |\r
| \`data.heatValue\` | \`number\` | 热力值，取值范围：[range参数设定范围内的任意数值] |\r
| \`style\` | \`array\` | 可选参数，热力图样式枚举，详情参考 \`HeatMapStyle\` |\r
| \`textureSize\` | \`number\` | style=0或1时参数生效，纹理大小，默认值：1024，取值范围：[128~4096]，注意：值越大纹理越清晰但创建越耗时 |\r
| \`opacityMode\` | \`number\` | style=0或1时参数生效，不透明度模式，默认值：1，取值范围：0：使用自定义色卡颜色的不透明度 1：使用热力点的不透明度 |\r
| \`opacityRange\` | \`array\` | style=0或1时参数生效，不透明度范围，默认值：[0~1.0]，注意：仅opacityMode为1时有效 |\r
| \`blur\` | \`number\` | style=0或1时参数生效，热力点模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |\r
| \`colors\` | \`object\` | 可选，默认使用标准热力配色，当style=0或1时参数生效，自定义颜色卡区间数组，包含渐变控制参数、无效点颜色和颜色数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 值 |\r
| \`blendMode\` | \`number\` | 混合模式，取值范围：[0,1] |\r
| \`light\` | \`boolean\` | 是否参与光照，布尔类型，默认值：false |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，注意：参数仅更新方法执行时生效，离散点构造热力图还支持差值动画 |\r
| \`viewHeightRange\` | \`array\` | 可选，可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.addByHeatPoints(heatmap);\r
\`\`\`\r
\r
---\r
\r
### \`addByTif(heatmap, fn)\` {#addByTif}\r
\r
根据tif文件加载热力图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`heatmap\` | \`object\` | HeatMap对象属性如下： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`heatmap\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`style\` | \`array\` | 可选，热力图样式枚举，详情参考 \`HeatMapStyle\` |\r
| \`range\` | \`array\` | 可选，热力值的范围，数据结构参考add方法，如果不想设置range，可将此参数设置为null |\r
| \`opacityMode\` | \`number\` | style=0或1时参数生效，不透明度模式，默认值：1，取值范围：0：使用自定义色卡颜色的不透明度 1：使用热力点的不透明度 |\r
| \`opacityRange\` | \`array\` | style=0或1时参数生效，不透明度范围，默认值：[0~1.0]，注意：仅opacityMode为1时有效 |\r
| \`blur\` | \`number\` | style=0或1时参数生效，热力点模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |\r
| \`colors\` | \`object\` | style=0或1时参数生效，自定义颜色卡区间数组，包含渐变控制参数、无效点颜色和颜色数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 值 |\r
| \`blendMode\` | \`number\` | 混合模式，取值范围：[0,1] |\r
| \`light\` | \`boolean\` | 是否参与光照，布尔类型，默认值：false |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，注意：参数仅更新方法执行时生效 |\r
| \`tifFile\` | \`object\` | tif文件属性对象，包含属性如下： |\r
| \`tifFile.minHeight\` | \`number\` | 最小高度，默认值：-1000米，注意：设置贴地模式时 地形高度要在此范围内 |\r
| \`tifFile.maxHeight\` | \`number\` | 最大高度，默认值：10000米，注意：设置贴地模式时 地形高度要在此范围内 |\r
| \`tifFile.file\` | \`string\` | tif文件路径，路径示例："D:\\\\test.tif" |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.addByTif(heatmap);\r
\`\`\`\r
\r
---\r
\r
### \`addPoints(id, data, fn)\` {#addPoints}\r
\r
为HeatMap添加热力点\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap的ID |\r
| \`data\` | \`array\` | 热力点(可以是单个或数组,数据结构请参考add方法) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：AddPoints\r
\r
\`\`\`js\r
let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];\r
let newPoints = [];\r
for (let i = 0; i < 10; i++) {\r
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX\r
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY\r
    newPoints.push({\r
        id: "new_point_" + i,\r
        coordinate: [x, y, 0],                 //热力点的坐标\r
        radius: Math.random() * 200,           //热力点影像半径范围\r
        heatValue: Math.random() * 100        //热力值\r
    });\r
}\r
await fdapi.heatmap.addPoints("heatmap1", newPoints);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的HeatMap\r
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
clearInterval(__tidUpdateHeatMap);\r
fdapi.heatmap.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个HeatMap对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的HeatMap对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
clearInterval(__tidUpdateHeatMap);\r
fdapi.heatmap.delete('heatmap1');\r
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
| \`ids\` | \`string \\| array\` | HeatMap对象的ID或者ID数组 |\r
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
fdapi.heatmap.focus('heatmap1', 100);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取HeatMap的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的HeatMap对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
HeatMap的详细信息\r
{\r
            "id":   "heatmap1",\r
            "groupId":  "",\r
            "userData": "",\r
            "bbox": [488670.750000, -2488165.000000, 5.700000, 488670.750000, -2488165.000000, 5.700000],\r
            "range":    [0.000000, 100.000000],\r
            "data": []\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.heatmap.get('heatmap1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏HeatMap\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | HeatMap对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.heatmap.hide('heatmap1');\r
\`\`\`\r
\r
---\r
\r
### \`highlightPixels(id, pixelCoords, fn)\` {#highlightPixels}\r
\r
高亮通过Tif文件加载的热力图中指定的像素点，注意：像素点数组的取值范围必须在Tif文件分辨率内\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap的ID |\r
| \`pixelCoords\` | \`array\` | Tif文件像素点的坐标数组（取值范围在文件分辨率内），取值示例：[[pixel1_x,pixel1_y],[pixel2_x,pixel2_y]...] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HighlightPixels\r
\r
\`\`\`js\r
//随机像素位置 需要在tif文件分辨率内\r
let pixelCoords = [];\r
for (let i = 0; i < 100; i++) {\r
    let x = Math.round(Math.random() * 70);\r
    let y = Math.round(Math.random() * 22);\r
    pixelCoords.push([x, y]);\r
}\r
\r
//高亮Tif文件内的像素  \r
fdapi.heatmap.highlightPixels('heatmap6', pixelCoords);\r
\`\`\`\r
\r
---\r
\r
### \`load(heatmap, fn)\` {#load}\r
\r
预加载的热力图动画，包含多个Tif文件，加载后可以使用play()方法进行播放。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`heatmap\` | \`object\` | HeatMap对象属性如下： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`heatmap\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`range\` | \`array\` | 可选，热力值的范围，数据结构参考add方法，如果不想设置range，可将此参数设置为null |\r
| \`data\` | \`array\` | 可选，热力图包含的热力点 |\r
| \`style\` | \`array\` | 可选参数，热力图样式枚举，详情参考 \`HeatMapStyle\` |\r
| \`opacityMode\` | \`number\` | style=0或1时参数生效，不透明度模式，默认值：1，取值范围：0：使用自定义色卡颜色的不透明度 1：使用热力点的不透明度 |\r
| \`opacityRange\` | \`array\` | style=0或1时参数生效，不透明度范围，默认值：[0~1.0]，注意：仅opacityMode为1时有效 |\r
| \`blur\` | \`number\` | style=0或1时参数生效，热力点模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |\r
| \`colors\` | \`object\` | style=0或1时参数生效，自定义颜色卡区间数组，包含渐变控制参数、无效点颜色和颜色数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 值 |\r
| \`blendMode\` | \`number\` | 混合模式，取值范围：[0,1] |\r
| \`light\` | \`boolean\` | 是否参与光照，布尔类型，默认值：false |\r
| \`shadow\` | \`number\` | 阴影强度，取值范围：[0,任意正数] |\r
| \`tifAnimation\` | \`object\` | 预加载的tif文件列表对象，包含属性如下： |\r
| \`tifAnimation.minHeight\` | \`number\` | 最小高度 |\r
| \`tifAnimation.maxHeight\` | \`number\` | 最大高度 |\r
| \`tifAnimation.totalSeconds\` | \`number\` | 动画播放默认的总时长，单位：秒 |\r
| \`tifAnimation.time\` | \`number\` | 从第几秒开始播放，默认值：0 |\r
| \`tifAnimation.files\` | \`array\` | tif文件路径数组，结构示例：["D:\\\\0.tif","D:\\\\1.tif",...] ，注意：tif文件纹理尺寸不能超过8192，最大值示例：[8192,8192] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.load(heatmap);\r
\`\`\`\r
\r
---\r
\r
### \`pause(id, fn)\` {#pause}\r
\r
暂停播放热力图动画\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap对象的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.pause(id);\r
\`\`\`\r
\r
---\r
\r
### \`play(id, fn)\` {#play}\r
\r
播放预加载的热力图动画\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap对象的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.play(id);\r
\`\`\`\r
\r
---\r
\r
### \`removePoints(id, pointIds, fn)\` {#removePoints}\r
\r
为HeatMap移除热力点\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap的ID |\r
| \`pointIds\` | \`array\` | 热力点ID（单个或数组） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.removePoints(id, pointIds);\r
\`\`\`\r
\r
---\r
\r
### \`setBBox(id, newVal, fn)\` {#setBBox}\r
\r
设置BoundingBox 热力点坐标的范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | HeatMap的ID |\r
| \`newVal\` | \`array\` | 热力点坐标的范围：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.setBBox(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setRange(id, newVal, fn)\` {#setRange}\r
\r
设置热力值的范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | HeatMap的ID |\r
| \`newVal\` | \`array\` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.setRange(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setTime(id, startTime, fn)\` {#setTime}\r
\r
从第几秒开始播放\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap对象的ID |\r
| \`startTime\` | \`number\` | 可选，从第几秒开始播放，默认值：0秒 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.setTime(id, startTime);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示HeatMap\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | HeatMap对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.heatmap.show('heatmap1');\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightAllPixels(id, fn)\` {#unHighlightAllPixels}\r
\r
取消热力图内所有像素点高亮\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：UnHighlightAllPixels\r
\r
\`\`\`js\r
//取消高亮\r
fdapi.heatmap.unHighlightAllPixels('heatmap6');\r
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
### \`updateByHeatPoints(heatmap, fn)\` {#updateByHeatPoints}\r
\r
更新热力图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`heatmap\` | \`object\` | 对象请参考add方法结构 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap.updateByHeatPoints(heatmap);\r
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
await fdapi.heatmap.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> AddByHeatPoints\r
\r
\`\`\`js\r
await fdapi.heatmap.clear();\r
\r
let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];\r
let range = [0, 100];\r
let data = [];\r
for (let i = 0; i < 100; i++) {\r
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX\r
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY\r
    data.push({\r
        id: i.toString(),\r
        coordinate: [x, y, 0],                 //热力点的坐标\r
        radius: Math.random() * 200,           //热力点影像半径范围\r
        heatValue: Math.random() * 100        //热力值\r
    });\r
}\r
let style = HeatMapStyle.Normal;\r
let textureSize = 1024;\r
let opacityMode = 1;\r
let opacityRange = [0, 1];\r
let blur = 0.85;\r
let blendMode = 1;\r
let light = false;\r
let viewHeightRange = [0, 10000];\r
\r
let heatmap1 = {\r
    id: "heatmap1",\r
    bbox: bbox,\r
    range: range,\r
    data: data,\r
    style: style,\r
    textureSize: textureSize,\r
    opacityMode: opacityMode,\r
    opacityRange: opacityRange,\r
    blur: blur,\r
    blendMode: blendMode,\r
    light: light,\r
    updateTime: 1,\r
    viewHeightRange: viewHeightRange\r
};\r
await fdapi.heatmap.addByHeatPoints(heatmap1);\r
fdapi.heatmap.focus('heatmap1', 1500, 1);\r
\`\`\`\r
\r
> UpdateByPoints\r
\r
\`\`\`js\r
__tidUpdateHeatMap = setInterval(() => {\r
\r
    let data = [];\r
    for (let i = 0; i < 100; i++) {\r
        data.push({\r
            id: i.toString(),\r
            heatValue: Math.random() * 100        //热力值\r
        });\r
    }\r
\r
    let heatmap1 = {\r
        id: "heatmap1",\r
        data: data,\r
        updateTime: 1,\r
    };\r
\r
    fdapi.heatmap.updateByHeatPoints(heatmap1);\r
}, 1000);\r
\r
//清除定时器\r
window.setTimeout(function () {\r
    window.clearInterval(__tidUpdateHeatMap)\r
}, 5000);\r
\`\`\`\r
\r
> AddByHeatPoints(CustomColor)\r
\r
\`\`\`js\r
await fdapi.heatmap.clear();\r
let bbox = [488670.75, 2488165, 0, 491659.59375, 2490987.5, 344.58];\r
let range = [0, 1];\r
let data = [];\r
for (let i = 0; i < 100; i++) {\r
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX\r
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY\r
    data.push({\r
        id: i.toString(),\r
        coordinate: [x, y, 0],                 //热力点的坐标\r
        radius: Math.random() * 200,           //热力点影像半径范围\r
        heatValue: Math.random()       //热力值\r
    });\r
};\r
\r
let style = HeatMapStyle.CustomColor;\r
let textureSize = 1024;\r
let opacityMode = 1;\r
let opacityRange = [0, 1];\r
let blur = 0.85;\r
let blendMode = 1;\r
let light = false;\r
let viewHeightRange = [0, 10000];\r
let colors = {\r
    "gradient": true,\r
    "invalidColor": [0, 0, 0, 1],\r
    "colorStops": [\r
        {\r
            "value": 0,\r
            "color": [0, 0.968627, 0, 1]\r
        },\r
        {\r
            "value": 0.25,\r
            "color": [0.709804, 0.968627, 0, 1]\r
        },\r
        {\r
            "value": 0.5,\r
            "color": [1, 0.709804, 0, 1]\r
        },\r
        {\r
            "value": 0.75,\r
            "color": [0.868627, 0, 0, 1]\r
        },\r
        {\r
            "value": 1,\r
            "color": [1, 0, 0, 1]\r
        }\r
    ]\r
};\r
\r
\r
let heatmap2 = {\r
    id: "heatmap2",\r
    bbox: bbox,\r
    range: range,\r
    data: data,\r
    style: style,\r
    textureSize: textureSize,\r
    opacityMode: opacityMode,\r
    opacityRange: opacityRange,\r
    blur: blur,\r
    colors: colors,\r
    blendMode: blendMode,\r
    light: light,\r
    viewHeightRange: viewHeightRange\r
};\r
await fdapi.heatmap.addByHeatPoints(heatmap2);\r
fdapi.heatmap.focus('heatmap2', 1500, 1);\r
\`\`\`\r
\r
> AddByHeatPoints(CustomStyle)\r
\r
\`\`\`js\r
await fdapi.heatmap.clear();\r
let bbox = [488670.75, 2488165, -2, 491659.59375, 2490987.5, 600.58];\r
let range = [0, 10];\r
let data = [];\r
for (let i = 0; i < 1800; i++) {\r
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX\r
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY\r
    data.push({\r
        id: i.toString(),\r
        coordinate: [x, y, 0],                 //热力点的坐标\r
        radius: Math.random() * 250,           //热力点影像半径范围\r
        heatValue: Math.random() * 2    //热力值\r
    });\r
};\r
\r
let style = HeatMapStyle.CustomWave;\r
let textureSize = 1024;\r
let opacityMode = 0;\r
let opacityRange = [0, 1];\r
let blur = 0.85;\r
let blendMode = 1;\r
let light = false;\r
let viewHeightRange = [0, 10000];\r
let colors = {\r
    "gradient": true,\r
    "invalidColor": [0, 0, 0, 1],\r
    "colorStops": [\r
        {\r
            "value": 0,\r
            "color": [0, 0.968627, 0, 1]\r
        },\r
        {\r
            "value": 0.25,\r
            "color": [0.709804, 0.968627, 0, 1]\r
        },\r
        {\r
            "value": 0.5,\r
            "color": [1, 0.709804, 0, 1]\r
        },\r
        {\r
            "value": 0.75,\r
            "color": [0.868627, 0, 0, 0.2]\r
        },\r
        {\r
            "value": 1,\r
            //调整色卡的透明度\r
            "color": [1, 0, 0, 0.2]\r
        }\r
    ]\r
};\r
\r
let heatmap3 = {\r
    id: "heatmap2",\r
    bbox: bbox,\r
    range: range,\r
    data: data,\r
    style: style,\r
    textureSize: textureSize,\r
    opacityMode: opacityMode,\r
    opacityRange: opacityRange,\r
    blur: blur,\r
    colors: colors,\r
    blendMode: blendMode,\r
    light: light,\r
    viewHeightRange: viewHeightRange\r
};\r
await fdapi.heatmap.addByHeatPoints(heatmap3);\r
fdapi.heatmap.focus('heatmap3', 300, 1);\r
\`\`\`\r
\r
> AddByBin(云图)\r
\r
\`\`\`js\r
await fdapi.heatmap.clear();\r
let bbox = [499019, 2718, 0, 499186, 2976, 10];\r
\r
let style = 1;\r
let textureSize = 1024;\r
let opacityMode = 1;\r
let opacityRange = [0, 1];\r
let blur = 0.85;\r
let blendMode = 0;\r
let light = false;\r
\r
let colors = {\r
    "gradient": true,\r
    "invalidColor": [0, 0, 0, 1],\r
    "colorStops": [\r
        { "value": 0, "color": [0, 0, 0, 0] },\r
        { "value": 0.2, "color": [0, 0, 0, 0] },\r
        { "value": 0.2, "color": [0.5, 0.5, 0.5, 1] },\r
        { "value": 1, "color": [1, 1, 1, 1] }\r
    ]\r
};\r
\r
let binaryFile = {\r
    "size": [1250, 1250],\r
    "needProject": true,\r
    "left": 9809325,\r
    "top": 4865942,\r
    "right": 15794157,\r
    "bottom": -1118890,\r
    "minLongitude": 90,\r
    "maxLongitude": 140,\r
    "minLatitude": -10,\r
    "maxLatitude": 40,\r
    "file": HostConfig.Path + '/assets/bin/heatmap.bin'\r
};\r
await fdapi.heatmap.add('heatmap4', bbox, null, null, style, textureSize, opacityMode, opacityRange, blur, colors, blendMode, light, binaryFile);\r
fdapi.heatmap.focus('heatmap4', 100, 1);\r
\`\`\`\r
\r
> AddByTif(tifFile)\r
\r
\`\`\`js\r
await fdapi.heatmap.clear();\r
let heatmap5 = {\r
    "id": "heatmap5",\r
    "range": [-1, 1],\r
    "light": true,\r
    "style": HeatMapStyle.CustomWave, //也支持设置贴地样式 1\r
    "opacityMode": 0,\r
    "blendMode": 1,\r
    "tifFile": {\r
        "minHeight": -10,//设置贴地模式时 地形高度要在此范围内 [-10~50]\r
        "maxHeight": 50,//设置贴地模式时 地形高度要在此范围内 [-10~50]\r
        "file": HostConfig.Path + "/assets/tif/T2.tif"\r
    },\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [0, 0, 0, 1],\r
        "colorStops": [\r
            { "value": -1, "color": [0, 0, 1, 1] },\r
            { "value": 0.25, "color": [0, 1, 0, 1] },\r
            { "value": 0.5, "color": [1, 1, 0, 1] },\r
            { "value": 1, "color": [1, 0, 0, 1] },\r
        ]\r
    }\r
};\r
await fdapi.heatmap.addByTif(heatmap5);\r
fdapi.heatmap.focus('heatmap5', 60, 1);\r
\`\`\`\r
\r
> AddByTif(tifFile-onTerrain)\r
\r
\`\`\`js\r
await fdapi.heatmap.clear();\r
let heatmap6 = {\r
    "id": "heatmap6",\r
    "range": [-1, 1],\r
    "light": true,\r
    "style": HeatMapStyle.CustomColor, //设置贴地样式 1\r
    "opacityMode": 0,\r
    "blendMode": 1,\r
    "tifFile": {\r
        "minHeight": -10,//设置贴地模式时 地形高度要在此范围内 [-10~50]\r
        "maxHeight": 50,//设置贴地模式时 地形高度要在此范围内 [-10~50]\r
        "file": HostConfig.Path + "/assets/tif/T2.tif"\r
    },\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [0, 0, 0, 1],\r
        "colorStops": [\r
            { "value": -1, "color": [0, 0, 1, 1] },\r
            { "value": 0.25, "color": [0, 1, 0, 1] },\r
            { "value": 0.5, "color": [1, 1, 0, 1] },\r
            { "value": 1, "color": [1, 0, 0, 1] },\r
        ]\r
    }\r
};\r
await fdapi.heatmap.addByTif(heatmap5);\r
fdapi.heatmap.focus('heatmap5', 60, 1);\r
\`\`\`\r
\r
> AddByTif(tifFile-onTerrain)\r
\r
\`\`\`js\r
await fdapi.heatmap.clear();\r
let heatmap6 = {\r
    "id": "heatmap6",\r
    "range": [-1, 1],\r
    "light": true,\r
    "style": HeatMapStyle.CustomColor, //设置贴地样式 1\r
    "opacityMode": 0,\r
    "blendMode": 1,\r
    "tifFile": {\r
        "minHeight": -10,//设置贴地模式时 地形高度要在此范围内 [-10~50]\r
        "maxHeight": 50,//设置贴地模式时 地形高度要在此范围内 [-10~50]\r
        "file": HostConfig.Path + "/assets/tif/T2.tif"\r
    },\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [0, 0, 0, 1],\r
        "colorStops": [\r
            { "value": -1, "color": [0, 0, 1, 1] },\r
            { "value": 0.25, "color": [0, 1, 0, 1] },\r
            { "value": 0.5, "color": [1, 1, 0, 1] },\r
            { "value": 1, "color": [1, 0, 0, 1] },\r
        ]\r
    }\r
};\r
await fdapi.heatmap.addByTif(heatmap6);\r
fdapi.heatmap.focus('heatmap6', 60, 1);\r
\`\`\`\r
`;export{n as default};
