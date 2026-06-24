const r=`---\r
title: TileLayer\r
sidebar_label: TileLayer\r
description: "TileLayer 加载3dt图层模型（倾斜摄影、BIM、人工模型），支持增删改查、单体化高亮、样式与剖切等。"\r
---\r
\r
# TileLayer\r
\r
TileLayer 加载3dt图层模型（倾斜摄影、BIM、人工模型），支持增删改查、单体化高亮、样式与剖切等。\r
\r
通过 \`api.tileLayer\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：TileLayer 加载3dt图层模型（倾斜摄影、BIM、人工模型），支持增删改查、单体化高亮、样式与剖切等。\r
- **别名 / 不同行业叫法**：3DTiles / 倾斜摄影模型 / 实景三维 / 白模 / BIM 图层 / 瓦片模型。\r
- **适用行业**：智慧城市与实景三维、智慧园区、规划设计、智慧水利、能源\r
- **使用场景**：\r
  - 城市级实景三维底座的加载与浏览\r
  - 建筑/部件单体化与点选高亮\r
  - 专题样式着色与剖切分析\r
- **注意事项**：\r
  - 海量瓦片依赖 LOD 与缓存，注意带宽与显存\r
  - 坐标与高程基准需对齐\r
  - 单体化能力取决于数据是否已切分\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个TileLayer对象 | 向场景批量添加对象 |\r
| [\`addHole\`](#addHole) | 根据挖洞多边形的坐标添加一个或多个挖洞操作， |  |\r
| [\`addHoleByShapeFile\`](#addHoleByShapeFile) | 根据shapeFile添加一个或多个挖洞操作 |  |\r
| [\`addModifier\`](#addModifier) | 添加一个压平操作 |  |\r
| [\`addModifierByShapeFile\`](#addModifierByShapeFile) | 根据shapeFile添加一个或多个压平操作 |  |\r
| [\`addModifiers\`](#addModifiers) | 根据多边形的坐标添加一个或多个压平操作， |  |\r
| [\`clear\`](#clear) | 清空接口添加的所有图层对象 | 清空全部对象，重置图层 |\r
| [\`clearHole\`](#clearHole) | 清空所有挖洞操作 |  |\r
| [\`clearModifier\`](#clearModifier) | 清空所有压平操作 |  |\r
| [\`createQuery\`](#createQuery) | 创建数据库查询条件对象 |  |\r
| [\`delete\`](#delete) | 删除一个或多个TileLayer对象 | 按 ID 移除指定对象 |\r
| [\`deleteHole\`](#deleteHole) | 删除一个挖洞操作 |  |\r
| [\`deleteModifier\`](#deleteModifier) | 删除一个压平操作 |  |\r
| [\`disableClip\`](#disableClip) | 禁止TileLayer图层参与剖切 |  |\r
| [\`disableXRay\`](#disableXRay) | 禁用X光 |  |\r
| [\`enableClip\`](#enableClip) | 设置TileLayer图层参与剖切 |  |\r
| [\`enableDecal\`](#enableDecal) | 设置贴花类型对象是否支持贴合TileLayer图层，影响的贴花类型对象包含：Decal、… |  |\r
| [\`enableFluid\`](#enableFluid) | 设置图层对水流体对象Fluid的支持， |  |\r
| [\`enableImageLayerDecal\`](#enableImageLayerDecal) | 设置指定图层是否支持对网络图层服务(WMTS、WMS、MVT等)进行贴合 |  |\r
| [\`enableXRay\`](#enableXRay) | 启用X光， |  |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`focusActor\`](#focusActor) | 定位一个Actor |  |\r
| [\`focusActors\`](#focusActors) | 定位一个或多个Actor |  |\r
| [\`get\`](#get) | 根据ID获取TileLayer的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`getActorInfo\`](#getActorInfo) | 通过OID查询Actor的矩阵和bound等信息 |  |\r
| [\`getActorInfoFromDB\`](#getActorInfoFromDB) | 从空间数据库获取TileLayer下指定Actor的详细属性信息 |  |\r
| [\`getAllFlattenInfo\`](#getAllFlattenInfo) | 查询所有图层是否支持压平 |  |\r
| [\`getCollision\`](#getCollision) | 查询图层包含的碰撞检测信息 |  |\r
| [\`getDBTabID\`](#getDBTabID) | 设置点云盒子的颜色， |  |\r
| [\`getObjectIDs\`](#getObjectIDs) | 获取指定TileLayer包含的所有Actor对象的ID |  |\r
| [\`hide\`](#hide) | 隐藏TileLayer图层 | 按业务条件隐藏对象 |\r
| [\`hideActor\`](#hideActor) | 隐藏Actor |  |\r
| [\`hideActors\`](#hideActors) | 隐藏一个或多个Actor |  |\r
| [\`hideAllActors\`](#hideAllActors) | 隐藏指定tilelayer的所有Actor |  |\r
| [\`highlightActor\`](#highlightActor) | 高亮一个Actor， |  |\r
| [\`highlightActors\`](#highlightActors) | 高亮多个Actor，同时支持高亮多个图层的Actor |  |\r
| [\`highlightActorsWithColor\`](#highlightActorsWithColor) | 使用颜色去高亮多个Actor，支持设置不同的高亮颜色去高亮不同的Actor |  |\r
| [\`highlightActorWithColor\`](#highlightActorWithColor) | 使用颜色去高亮一个Actor，支持设置不同的高亮颜色去高亮不同的Actor |  |\r
| [\`highlightPoints\`](#highlightPoints) | 根据点云的属性字段值高亮点云匹配到点 |  |\r
| [\`query\`](#query) | 根据TileLayer的ID在PG数据库中查询 |  |\r
| [\`setAltitudeHeatMap\`](#setAltitudeHeatMap) | 根据海拔高度设置TileLayer的分层热力样式， |  |\r
| [\`setCollision\`](#setCollision) | 设置TileLayer是否参与碰撞检测 |  |\r
| [\`setFileName\`](#setFileName) | 修改TileLayer图层的3dt文件路径 |  |\r
| [\`setLocation\`](#setLocation) | 设置平移 |  |\r
| [\`setPointCloudBoxVisible\`](#setPointCloudBoxVisible) | 设置点云盒子的可见性， |  |\r
| [\`setPointCloudSize\`](#setPointCloudSize) | 设置TileLayer图层的点云大小， |  |\r
| [\`setPointCloudStyle\`](#setPointCloudStyle) | 根据点云的属性字段来设置点云模型的渲染颜色 |  |\r
| [\`setRotation\`](#setRotation) | 设置旋转 |  |\r
| [\`setScale\`](#setScale) | 设置缩放 |  |\r
| [\`setStyle\`](#setStyle) | 设置TileLayer的样式 |  |\r
| [\`setViewHeightRange\`](#setViewHeightRange) | 设置TileLayer图层的可视高度范围 |  |\r
| [\`setViewportVisible\`](#setViewportVisible) | 多视口状态下，设置图层在各视口的可见性 |  |\r
| [\`show\`](#show) | 显示TileLayer图层 | 按业务条件显示对象 |\r
| [\`showActor\`](#showActor) | 显示Actor |  |\r
| [\`showActors\`](#showActors) | 显示一个或多个Actor |  |\r
| [\`showAllActors\`](#showAllActors) | 显示指定tilelayer的所有Actor |  |\r
| [\`unHighlightActor\`](#unHighlightActor) | 取消高亮一个Actor |  |\r
| [\`unHighlightActors\`](#unHighlightActors) | 停止高亮多个Actor，同时支持停止高亮多个图层的Actor |  |\r
| [\`unHighlightAllActors\`](#unHighlightAllActors) | 停止高亮所有Actor |  |\r
| [\`unHighlightAllPoints\`](#unHighlightAllPoints) | 取消高亮点云包含所有点的高亮效果 |  |\r
| [\`unHighlightPoints\`](#unHighlightPoints) | 根据点云的属性字段值取消高亮 |  |\r
| [\`update\`](#update) | 修改一个或多个TileLayer对象，支持更新以下属性： | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
| [\`updateHole\`](#updateHole) | 修改一个挖洞操作 |  |\r
| [\`updateModifier\`](#updateModifier) | 修改一个压平操作 |  |\r
| [\`updateRecord\`](#updateRecord) | 更新TileLayer关联的数据库记录 |  |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个TileLayer对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`fileName\` | \`string\` | 3dt文件路径，推荐使用@path 方式管理添加3dt图层资源 |\r
| \`password\` | \`string\` | 可选，3dt文件路径的私有秘钥 |\r
| \`wkt\` | \`string\` | 可选，球面坐标系下支持对倾斜摄影类型的3dt进行重投影，格式支持EPSG编码如："EPSG:4547"或常规的wkt字符串 |\r
| \`visible\` | \`boolean\` | 可选，添加后是否可见，默认值：true 可见 |\r
| \`viewHeightRange\` | \`array\` | 可选，可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |\r
| \`releaseWhenHidden\` | \`boolean\` | 可选，隐藏图层时是否释放资源，默认值：false 不释放 |\r
| \`location\` | \`array\` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，注意：如果工程是球面坐标系则此参数相当于offset，仅表示图层位置的偏移量，非坐标值，单位：米 |\r
| \`rotation\` | \`array\` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`scale\` | \`array\` | 缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：从文件添加TileLayer图层：Add\r
\r
\`\`\`js\r
fdapi.tileLayer.delete('1');\r
await fdapi.tileLayer.add({\r
    id: '1',\r
    fileName: HostConfig.Path + "/assets/3dt/terrain.3dt",//3dt文件路径\r
    location: [0, 0, 0],//坐标位置\r
    rotation: [0, 0, 0],//旋转角度\r
    scale: [1, 1, 1]    //缩放大小\r
});\r
fdapi.tileLayer.focus('1', 18000);\r
\`\`\`\r
\r
---\r
\r
### \`addHole(data, fn)\` {#addHole}\r
\r
根据挖洞多边形的坐标添加一个或多个挖洞操作，注意：同时只能对一个图层id进行挖洞操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 挖洞操作唯一标识符 |\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`coordinates\` | \`array\` | 挖洞多边形的坐标数组，二维数组，数组元素类型：挖洞多边形的坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`innerRings\` | \`array\` | 挖洞多边形的内环，三维数组，数组元素类型：挖洞多边形的坐标数组 |\r
| \`isReverseCut\` | \`boolean\` | 挖洞多边形是否反转，默认值：false |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.addHole(data);\r
\`\`\`\r
\r
---\r
\r
### \`addHoleByShapeFile(data, fn)\` {#addHoleByShapeFile}\r
\r
根据shapeFile添加一个或多个挖洞操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`shapeFilePath\` | \`string\` | shapeFilePath文件路径，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.addHoleByShapeFile(data);\r
\`\`\`\r
\r
---\r
\r
### \`addModifier(id, tileLayerId, coordinates, ententBufferSize, fn)\` {#addModifier}\r
\r
添加一个压平操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 唯一标识符 |\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`coordinates\` | \`array\` | 压平多边形的坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`ententBufferSize\` | \`number\` | 羽化范围，取值范围：[任意正浮点数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.addModifier(id, tileLayerId, coordinates, ententBufferSize);\r
\`\`\`\r
\r
---\r
\r
### \`addModifierByShapeFile(data, fn)\` {#addModifierByShapeFile}\r
\r
根据shapeFile添加一个或多个压平操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 压平操作唯一标识符 |\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`shapeFilePath\` | \`string\` | shapeFilePath文件路径，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.addModifierByShapeFile(data);\r
\`\`\`\r
\r
---\r
\r
### \`addModifiers(data, fn)\` {#addModifiers}\r
\r
根据多边形的坐标添加一个或多个压平操作，注意：同时只能对一个图层id进行压平操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 压平操作唯一标识符 |\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`coordinates\` | \`array\` | 压平多边形的坐标数组，二维数组，数组元素类型：压平多边形的坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`innerRings\` | \`array\` | 压平多边形的内环，三维数组，数组元素类型：压平多边形的坐标数组 |\r
| \`ententBufferSize\` | \`number\` | 羽化范围，取值范围：[任意正浮点数]，单位：米 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.addModifiers(data);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空接口添加的所有图层对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：清空TileLayer：Clear\r
\r
\`\`\`js\r
fdapi.tileLayer.clear();\r
\`\`\`\r
\r
---\r
\r
### \`clearHole(ids, fn)\` {#clearHole}\r
\r
清空所有挖洞操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | TileLayer对象的ID或数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.clearHole(ids);\r
\`\`\`\r
\r
---\r
\r
### \`clearModifier(ids, fn)\` {#clearModifier}\r
\r
清空所有压平操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | TileLayer对象的ID或数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.clearModifier(ids);\r
\`\`\`\r
\r
---\r
\r
### \`createQuery()\` {#createQuery}\r
\r
创建数据库查询条件对象\r
\r
**返回：** QueryOption类的对象\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.createQuery();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个TileLayer对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的TileLayer对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：删除TileLayer图层：Delete\r
\r
\`\`\`js\r
fdapi.tileLayer.delete('1');\r
\`\`\`\r
\r
---\r
\r
### \`deleteHole(id, tileLayerId, fn)\` {#deleteHole}\r
\r
删除一个挖洞操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 唯一标识符 |\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.deleteHole(id, tileLayerId);\r
\`\`\`\r
\r
---\r
\r
### \`deleteModifier(id, tileLayerId, fn)\` {#deleteModifier}\r
\r
删除一个压平操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 唯一标识符 |\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.deleteModifier(id, tileLayerId);\r
\`\`\`\r
\r
---\r
\r
### \`disableClip(ids, fn)\` {#disableClip}\r
\r
禁止TileLayer图层参与剖切\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`number \\| array\` | TileLayer的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.disableClip(ids);\r
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
| \`ids\` | \`number \\| array\` | TileLayer的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：停用X光效果：DisableXRay\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.disableXRay(villaId);\r
\`\`\`\r
\r
---\r
\r
### \`enableClip(ids, fn)\` {#enableClip}\r
\r
设置TileLayer图层参与剖切\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`number \\| array\` | TileLayer的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.enableClip(ids);\r
\`\`\`\r
\r
---\r
\r
### \`enableDecal(data, fn)\` {#enableDecal}\r
\r
设置贴花类型对象是否支持贴合TileLayer图层，影响的贴花类型对象包含：Decal、HeatMap、Polyline、Polygon、GeoJSONLayer，\r
\r
**注意：若需要设置ImageryLayer网络图层的贴合支持，请使用fdapi.tileLayer.enableImageLayerDecal(data)方法**\r
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
| \`tileLayerId\` | \`string\` | 图层Id |\r
| \`enable\` | \`boolean\` | 图层是否支持对贴花类型对象的贴合 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.enableDecal(data);\r
\`\`\`\r
\r
---\r
\r
### \`enableFluid(data, fn)\` {#enableFluid}\r
\r
设置图层对水流体对象Fluid的支持，注意：设置false不支持时则水流体的物理碰撞会忽略此图层\r
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
| \`tileLayerId\` | \`string\` | 图层Id |\r
| \`supportFluid\` | \`boolean\` | 图层是否支持水流体对象Fluid，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：打开支持流体仿真功能：EnableFluid\r
\r
\`\`\`js\r
//控制图层是否支持水流体效果\r
fdapi.tileLayer.enableFluid([\r
    {\r
        "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",\r
        "supportFluid": false //关闭图层对水流体效果的支持\r
    }\r
]);\r
\`\`\`\r
\r
---\r
\r
### \`enableImageLayerDecal(data, fn)\` {#enableImageLayerDecal}\r
\r
设置指定图层是否支持对网络图层服务(WMTS、WMS、MVT等)进行贴合\r
\r
**注意：若需要设置所有对象和地形的贴合控制，请使用设置方法： fdapi.settings.setImageryLayerEnableDecal(1);**\r
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
| \`tileLayerId\` | \`string\` | 图层ID |\r
| \`enable\` | \`boolean\` | 网络图层服务是否贴合该3dt图层 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.enableImageLayerDecal(data);\r
\`\`\`\r
\r
---\r
\r
### \`enableXRay(ids, color, fn)\` {#enableXRay}\r
\r
启用X光，效果图如下：\r
\r
\r
\r
![](/img/refdoc/api/TileLayer.EnableXRay.png)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`number \\| array\` | TileLayer的ID或者ID数组 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：启用X光效果：EnableXRay\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.enableXRay(villaId, [1, 1, 1, 0.0381]);\r
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
| \`ids\` | \`string \\| array\` | TileLayer对象的ID或者ID数组 |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：定位TileLayer：Focus\r
\r
\`\`\`js\r
fdapi.tileLayer.focus('1');\r
\`\`\`\r
\r
---\r
\r
### \`focusActor(id, objectId, distance, flyTime, rotation, fn)\` {#focusActor}\r
\r
定位一个Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectId\` | \`string\` | Actor的ID |\r
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
await fdapi.tileLayer.focusActor(id, objectId, distance, flyTime, rotation);\r
\`\`\`\r
\r
---\r
\r
### \`focusActors(data, distance, flyTime, rotation, fn)\` {#focusActors}\r
\r
定位一个或多个Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object\` | 数据对象，对象支持以下属性： |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectIds\` | \`array\` | TileLayer里的Actor的ObjectID（单个或者数组） |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.focusActors(data, distance, flyTime, rotation);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取TileLayer的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的TileLayer对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回TileLayer的详细信息\r
{\r
            "id":	"1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "dbTabId": "", //存储在空间数据库的tileLayer对应的数据库表id\r
            "fileName":	"G:\\\\TEMP\\\\Explorer\\\\SDK\\\\JS\\\\media\\\\project\\\\demo_files\\\\SDKDemo.3dt",\r
            "location":	[174.309998, -589.890015, 0.000000],\r
            "rotation":	[0.000000, 0.000000, 0.000000],\r
            "scale":	[1.000000, 1.000000, 1.000000],\r
            "minVisibleHeight": 1, //最小可见高度\r
            "maxVisibleHeight": 100000,//最大可见高度\r
            "bFlattenSupported": 0 //图层是否支持压平\r
            "bbox":	[-501384.875000, -1520.400024, -1499.900024, -498384.875000, 1479.599976, 1500.099976] //三维图层包围盒\r
        }\r
\`\`\`\r
\r
> 示例：获取TileLayer图层信息：Get\r
\r
\`\`\`js\r
fdapi.tileLayer.get('1');\r
\`\`\`\r
\r
> 示例：查询所有图层是否支持压平：GetAllFlattenInfo\r
\r
\`\`\`js\r
//查询所有图层是否支持压平\r
fdapi.tileLayer.getAllFlattenInfo();\r
\`\`\`\r
\r
---\r
\r
### \`getActorInfo(data, fn)\` {#getActorInfo}\r
\r
通过OID查询Actor的矩阵和bound等信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer对象的ID |\r
| \`objectIds\` | \`array\` | TileLayer里的Actor的ObjectID字符串（单个或者数组） |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
\`\`\`js\r
fdapi.tileLayer.getActorInfo({\r
            id: 1,\r
            objectIds: ["SM_outdoor_wall_01_2"]\r
        });\r
\`\`\`\r
\r
> 示例：查询Actor的矩阵和bound信息：GetActorInfo\r
\r
\`\`\`js\r
fdapi.tileLayer.getActorInfo({\r
    id: villaId,\r
    objectIds: [\r
        "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea1b",\r
        "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea21",\r
        "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea29",\r
        "2fc77d67-1af0-4a43-aa66-c544d411df04-000690ee",\r
        "0e567bfb-4f86-412b-af6a-7a1cdb731324-0007692f"\r
    ]\r
});\r
\`\`\`\r
\r
---\r
\r
### \`getActorInfoFromDB(data, fn)\` {#getActorInfoFromDB}\r
\r
从空间数据库获取TileLayer下指定Actor的详细属性信息 注意:调用前需先配置Explorer里空间库的对应信息，配置示例如下图：\r
\r
\r
\r
![](/img/refdoc/api/TileLayer.getInformation.png)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`array \\| object\` | 对象或数组类型，如果是数组类型，每个元素有以下属性：tileLayerId, objectIds |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`objectIds\` | \`array\` | TileLayer里的Actor的ObjectID字符串（单个或者数组） |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
\`\`\`js\r
    //getActorInfoFromDB方法的参数可以是object或者array\r
			fdapi.tileLayer.getActorInfoFromDB([{ "tileLayerId": "91B748AB429AF0823D12EEBFA6334EBF", "objectIds":["SM1","SM2","SM3"] },{ "tileLayerId": "6388C5CC461B85523F69C2B04144BF2E", "objectIds":["Floor1","Floor2"] }]);\r
\`\`\`\r
\r
> 示例：查询空间库的Actor信息：GetActorInfoFromDB\r
\r
\`\`\`js\r
//注意：调用前请先保证模型属性信息入库并配置数据库连接信息或已生成sdb文件并和模型3dt存放同级目录，目前只支持bim模型属性查询，具体请参考API文档\r
fdapi.tileLayer.getActorInfoFromDB([{ "tileLayerId": villaId, "objectIds": ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce", "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856"] }]);\r
\`\`\`\r
\r
---\r
\r
### \`getAllFlattenInfo(fn)\` {#getAllFlattenInfo}\r
\r
查询所有图层是否支持压平\r
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
返回所有TileLayer是否支持压平\r
[{\r
            "id":	"0",\r
            "bFlattenSupported":	0 //不支持压平\r
        },{\r
            "id":	"1",\r
            "bFlattenSupported":	1 //支持压平\r
        },{\r
            "id":	"1",\r
            "bFlattenSupported":	1 //支持压平\r
        }]\r
\`\`\`\r
\r
---\r
\r
### \`getCollision(tileLayerIds, fn)\` {#getCollision}\r
\r
查询图层包含的碰撞检测信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`tileLayerIds\` | \`string \\| array\` | TileLayer对象的ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
[{\r
            "id":	"E637D8FE42335EE96C58A1840BCAD0CE",\r
            "enabled":	1,\r
            "mouseInteract":	1,\r
            "mouseFunction":	1,\r
            "characterCollision":	1\r
        }]\r
\`\`\`\r
\r
---\r
\r
### \`getDBTabID(data, fn)\` {#getDBTabID}\r
\r
设置点云盒子的颜色，注意：仅Box渲染模式下生效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) \`setPointCloudBoxColor(data, fn){ data = ac_utils.makeArray(data); if(data instanceof Array){ for(let i=0;i<data.length;i++){ data[i].bCustomColor = true; data[i].customColor = data[i].color; } } return this.int.call({ 'command': CommandType.TileLayer_PointCloud_Highlight, 'data': data }, fn); }\` |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 点云图层的Id |\r
| \`name\` | \`string\` | 点云图层包含的字段名称 |\r
| \`values\` | \`array\` | 点云图层包含的字段名称对应的取值数组，支持多个匹配到的值 |\r
| \`color\` | \`number\` | 匹配到的box盒子待设置的颜色 |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.getDBTabID(data);\r
\`\`\`\r
\r
---\r
\r
### \`getObjectIDs(ids, fn)\` {#getObjectIDs}\r
\r
获取指定TileLayer包含的所有Actor对象的ID\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | TileLayer的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回TileLayer的所有ObjectID信息结构示例\r
[{\r
            "id":	"1",\r
            "objectIds":	["WorldSettings", "Brush_0", "SM_colum_02_2", "SM_colum_3", "SM_floor_130", "SM_floor_195", "SM_floor_313", "SM_floor_352", "SM_colum_24", "SM_colum_25", "SM_floor_399", "SM_Road_04_5", "SM_Road_05_8", "SM_Road_5", "SM_Road_6", "SM_floor_400", "SM_floor_401", "SM_floor_402", "SM_floor_403", "SM_entrance_roof_01_11", "P_raunfall2", "P_raunfall4", "SM_pot_4", "SM_pot_9", "PointLight13", "PointLight14", "SM_wall_30", "SM_main_door_02_2", "SM_main_door_3", "SM_wall_51", "SM_outdoor_wall_01_2", "SM_column_04_2", "SM_column_24", "SM_column_29", "SM_column_35", "SM_ATM_4", "SM_wall_140", "SM_wall_141", "SM_wall_142", "SM_floor_01_28", "SM_floor_2", "SM_floor_3", "SM_floor_4", "SM_floor_5", "SM_floor_6", "SM_floor_7", "SM_floor_8", "SM_floor_9", "SM_floor_10", "SM_floor_11", "SM_floor_12", "SM_floor_03_414", "SM_floor_05_15", "SM_floor_06_57", "SM_sofa_3", "SM_sofa_4", "Palm_01_30", "Palm_02_33", "Palm_04_36", "Palm_03_39", "SM_pot_5", "SM_pot_6", "SM_pot_7", "SM_pot_8", "SM_reception_01_2", "PointLight22", "PointLight23", "PointLight24", "PointLight27", "SM_column_03_17", "SM_column_4", "SM_column_5", "SM_wall_55", "SM_wall_56", "SM_wall_57", "PointLight38", "PointLight69", "SM_elevator_glass_fence_31", "SM_colum_13", "SM_colum_20", "SM_glass_window_01_4", "SM_glass_window_2", "SM_glass_window_3", "SM_glass_window_4", "SM_glass_window_5", "SM_elevator_wall_03_15", "SM_table_3", "SM_table_4", "SM_bed_6", "SM_bed_7", "SM_ATM_01_2", "DecalActor75_2", "DecalActor77", "SM_wall_352", "SM_ATM_6", "EmergencyRoom_C_3"]\r
        }]\r
\`\`\`\r
\r
> 示例：获取指定TileLayer包含的所有Actor对象的ID：GetObjectIDs\r
\r
\`\`\`js\r
//查询小别墅包含的构件id\r
fdapi.tileLayer.getObjectIDs(villaId);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏TileLayer图层\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | TileLayer对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：隐藏TileLayer图层：Hide\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
\r
fdapi.tileLayer.hide(villaId);\r
\`\`\`\r
\r
---\r
\r
### \`hideActor(id, objectId, fn)\` {#hideActor}\r
\r
隐藏Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectId\` | \`string\` | Actor的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.hideActor(id, objectId);\r
\`\`\`\r
\r
---\r
\r
### \`hideActors(data, fn)\` {#hideActors}\r
\r
隐藏一个或多个Actor\r
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
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectIds\` | \`array\` | TileLayer里的Actor的ObjectID（单个或者数组） |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.hideActors(data);\r
\`\`\`\r
\r
---\r
\r
### \`hideAllActors(tileLayerIds)\` {#hideAllActors}\r
\r
隐藏指定tilelayer的所有Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`tileLayerIds\` | \`string \\| array\` | TileLayer的ID或ID数组 |\r
\r
**返回：** 无返回值。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.hideAllActors(tileLayerIds);\r
\`\`\`\r
\r
---\r
\r
### \`highlightActor(id, objectId, fn)\` {#highlightActor}\r
\r
高亮一个Actor，效果图如下：\r
\r
\r
\r
![](/img/refdoc/api/tilelayer.HighlightActor.gif)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectId\` | \`string\` | Actor的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.highlightActor(id, objectId);\r
\`\`\`\r
\r
---\r
\r
### \`highlightActors(data, fn)\` {#highlightActors}\r
\r
高亮多个Actor，同时支持高亮多个图层的Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectIds\` | \`array\` | TileLayer里的Actor的ObjectID（单个或者数组） |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.highlightActors(data);\r
\`\`\`\r
\r
---\r
\r
### \`highlightActorsWithColor(data, fn)\` {#highlightActorsWithColor}\r
\r
使用颜色去高亮多个Actor，支持设置不同的高亮颜色去高亮不同的Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectIds\` | \`array\` | TileLayer里的Actor的ObjectID（单个或者数组） |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | Actor的高亮颜色，默认值:Color.Blue，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`bWireframe\` | \`boolean\` | 高亮时是否使用线框模式，默认值：true，设置为false则是填充模式 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.highlightActorsWithColor(data);\r
\`\`\`\r
\r
---\r
\r
### \`highlightActorWithColor(id, objectId, color, bWireframe, fn)\` {#highlightActorWithColor}\r
\r
使用颜色去高亮一个Actor，支持设置不同的高亮颜色去高亮不同的Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectId\` | \`string\` | Actor的ID |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | Actor的高亮颜色，默认值:Color.Blue，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`bWireframe\` | \`boolean\` | 高亮时是否使用线框模式，默认值：true，设置为false则是填充模式 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.highlightActorWithColor(id, objectId, color, bWireframe);\r
\`\`\`\r
\r
---\r
\r
### \`highlightPoints(data, fn)\` {#highlightPoints}\r
\r
根据点云的属性字段值高亮点云匹配到点\r
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
| \`id\` | \`string\` | 点云图层的Id |\r
| \`name\` | \`string\` | 点云图层包含的字段名称 |\r
| \`values\` | \`array\` | 点云图层包含的字段名称对应的取值数组，支持高亮多个匹配到的值 |\r
| \`glow\` | \`boolean\` | 高亮时是否闪烁，默认值：true |\r
| \`bCustomColor\` | \`boolean\` | 是否开启自定义颜色，默认值：false |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 自定义颜色值，仅当bCustomColor开启后自定义颜色生效，默认值:Color.White，支持四种格式，[取值示例](/docs/tutorials/color) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：高亮点云对应的特征值点(仅对点云模型生效)：HighlightPoints\r
\r
\`\`\`js\r
fdapi.tileLayer.highlightPoints([{\r
    id: "pcs",\r
    name: "oid",\r
    values: ["1", "3", "6", "9", "5839", "5849", "5859"],\r
    glow: false,\r
    bCustomColor: true,\r
    color: [1, 0, 0, 1]\r
}]);\r
\`\`\`\r
\r
---\r
\r
### \`query(queryOption, fn)\` {#query}\r
\r
根据TileLayer的ID在PG数据库中查询\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`queryOption\` | \`QueryOption\` | 查询条件对象 请参考： [\`QueryOption\`](/docs/api/analysis/query-option) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.query(queryOption);\r
\`\`\`\r
\r
---\r
\r
### \`setAltitudeHeatMap(tileLayerIds, colors, fn)\` {#setAltitudeHeatMap}\r
\r
根据海拔高度设置TileLayer的分层热力样式，注意：如果是球面坐标系工程，则使用Engine发布3dt图层时需要添加 -terUserHotMap 参数才可以支持热力样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`tileLayerIds\` | \`string \\| array\` | TileLayer的ID或ID数组 |\r
| \`colors\` | \`array\` | 颜色分层调色板数组，数组包含的每一个对象包含高度属性和对应颜色值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`colors\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`value\` | \`number\` | 3dt图层的高度 |\r
| \`color\` | \`array\` | 高度对应的颜色值，示例：[1,0,0,1] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.setAltitudeHeatMap(tileLayerIds, colors);\r
\`\`\`\r
\r
---\r
\r
### \`setCollision(tileLayerIds, enabled, mouseInteract, mouseFunction, characterCollision, fn)\` {#setCollision}\r
\r
设置TileLayer是否参与碰撞检测\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`tileLayerIds\` | \`string \\| array\` | TileLayer对象的ID或ID数组 |\r
| \`enabled\` | \`boolean\` | 是否开启碰撞检测的总开关，如果此参数设置为false，则下面三个参数均会失效 |\r
| \`mouseInteract\` | \`boolean\` | 是否开启鼠标交互，默认值：true 开启 |\r
| \`mouseFunction\` | \`boolean\` | 是否开启鼠标相关的功能交互，包含鼠标拾取、分析工具、测量工具等，默认值：true 开启 |\r
| \`characterCollision\` | \`boolean\` | 是否开启角色碰撞，默认值：true 开启角色碰撞 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.setCollision(tileLayerIds, enabled, mouseInteract, mouseFunction, characterCollision);\r
\`\`\`\r
\r
---\r
\r
### \`setFileName(id, newVal, fn)\` {#setFileName}\r
\r
修改TileLayer图层的3dt文件路径\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`newVal\` | \`string\` | 3dt文件路径 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.setFileName(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setLocation(id, newVal, fn)\` {#setLocation}\r
\r
设置平移\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`newVal\` | \`array\` | 新的位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.setLocation(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setPointCloudBoxVisible(data, fn)\` {#setPointCloudBoxVisible}\r
\r
设置点云盒子的可见性，注意：仅Box渲染模式下生效\r
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
| \`id\` | \`string\` | 点云图层的Id |\r
| \`name\` | \`string\` | 点云图层包含的字段名称 |\r
| \`values\` | \`array\` | 点云图层包含的字段名称对应的取值数组，支持多个匹配到的值 |\r
| \`visible\` | \`number\` | 点云字段匹配到的值的box的可见性，0不可见 1可见 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.setPointCloudBoxVisible(data);\r
\`\`\`\r
\r
---\r
\r
### \`setPointCloudSize(id, pointCloudSize, fn)\` {#setPointCloudSize}\r
\r
设置TileLayer图层的点云大小，注意：仅对点云数据转换的3dt图层模型生效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`pointCloudSize\` | \`number\` | 点云缩放的倍数，取值范围：[0.01~4] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置点云尺寸(仅对点云模型生效)：SetPointCloudSize\r
\r
\`\`\`js\r
//添加点云模型\r
fdapi.tileLayer.delete('pcs');\r
await fdapi.tileLayer.add({\r
    id: 'pcs',\r
    fileName: HostConfig.Path + "/assets/3dt/pointcloud.3dt",//3dt文件路径\r
    location: [0, 0, 0],\r
    rotation: [0, 0, 0],\r
    scale: [1, 1, 1]\r
});\r
fdapi.tileLayer.focus('pcs', 800);\r
\r
fdapi.tileLayer.setPointCloudSize('pcs', 1);\r
\`\`\`\r
\r
---\r
\r
### \`setPointCloudStyle(data)\` {#setPointCloudStyle}\r
\r
根据点云的属性字段来设置点云模型的渲染颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 点云图层的Id |\r
| \`collision\` | \`boolean\` | 是否开启碰撞 |\r
| \`renderer\` | \`object\` | 必选，渲染器配置对象参数如下： |\r
| \`renderer.rendererType\` | [\`RendererType\`](/docs/api/types#renderertype) | (\`RendererType\`) 渲染器类型，包含三种：简单渲染器、唯一值渲染器、分类渲染器 |\r
| \`renderer.materialType\` | \`number\` | 渲染材质类型，取值：[0,1,2]，分别对应三种：X光、Mask不透明、半透明 |\r
| \`renderer.type\` | [\`VisualType\`](/docs/api/types#visualtype) | (\`VisualType\`) 控制显示的可视化类型枚举 |\r
| \`renderer.renderBox\` | \`number\` | 是否开启盒子模式渲染，取值：[0,1]，默认值：0 |\r
| \`renderer.boxSize\` | \`array\` | 盒子模式下体块的尺寸，即长宽高[X,Y,Z]，单位：米 |\r
| \`renderer.renderBoxWireframe\` | \`number\` | 盒子模式下是否显示线框，取值：[0,1,2]，0不显示 1显示 2仅显示线框（隐藏面） |\r
| \`renderer.wireframeColor\` | \`color\` | 盒子模式下线框的颜色 |\r
| \`renderer.wireThickness\` | \`number\` | 盒子模式下线框的尺寸 |\r
| \`renderer.lightFactor\` | \`number\` | 亮度因子 |\r
| \`renderer.intensity\` | \`number\` | 亮度值 |\r
| \`renderer.frequency\` | \`number\` | 频次 |\r
| \`renderer.splitFactor\` | \`number\` | 点云裂分因子，值越大绘制精度越低，值越小绘制精度则越高（会更消耗显卡资源），取值范围：[0,任意正数] |\r
| \`renderer.autoScaleDepth\` | \`number\` | 盒子模式下，盒子尺寸自动缩放的相机临界深度，取值范围：[0,任意正数] |\r
| \`renderer.field\` | \`string\` | 点云图层包含的属性字段名称 |\r
| \`renderer.fieldType\` | [\`FieldType\`](/docs/api/types#fieldtype) | (\`FieldType\`) 点云图层包含的属性字段类型，枚举支持数值类型和字符串类型 |\r
| \`renderer.gradient\` | \`boolean\` | 颜色是否差值渐变 |\r
| \`renderer.defaultSymbol\` | \`object\` | 必选，默认符号化配置参数如下： |\r
| \`renderer.symbolType\` | \`number\` | 符号化类型，0 simple-marker圆形点填充 1 simple-line线填充(注意：目前仅支持1px的线宽) 2 simple-fill面填充 3 polygon3d填充 |\r
| \`renderer.size\` | \`number\` | 可选，点的默认尺寸，仅针对simple-marker圆形填充生效； |\r
| \`renderer.height\` | \`number\` | 可选，polygon3d的默认高度，仅针对polygon3d填充生效； |\r
| \`renderer.color\` | \`array\` | 默认填充颜色 |\r
| \`renderer.outline\` | \`-\` | — |\r
| \`renderer.uniqueValueInfos\` | \`array\` | 可选，唯一值渲染器配置数组，对象结构如下： |\r
| \`renderer.value\` | \`any\` | field字段对应值 |\r
| \`renderer.symbol\` | \`object\` | 各唯一值对应的符号化配置对象，结构如下： |\r
| \`renderer.color\` | [\`Color\`](/docs/api/types#color) | 可选，三选一，唯一值对应的颜色 |\r
| \`renderer.size\` | \`number\` | 可选，三选一，唯一值对应的尺寸 |\r
| \`renderer.height\` | \`number\` | 可选，三选一，唯一值对应的高度 |\r
\r
**返回：** 无返回值。\r
\r
> 示例：设置点云样式(仅对点云模型生效)：SetPointCloudStyle\r
\r
\`\`\`js\r
//添加点云模型\r
fdapi.tileLayer.delete('pcs');\r
fdapi.tileLayer.add({\r
    id: 'pcs',\r
    fileName: HostConfig.Path + "/assets/3dt/pointcloud.3dt",//3dt文件路径\r
    location: [0, 0, 0],\r
    rotation: [0, 0, 0],\r
    scale: [1, 1, 1]\r
});\r
fdapi.tileLayer.focus('pcs', 2500);\r
\r
\r
let size = 128;\r
let dataRender = {\r
    id: "pcs",\r
    collision: true,\r
    renderer: {\r
        wireThickness: 0.6,\r
        lightFactor: 10,\r
        boxSize: [size, size, size],\r
        renderBox: 1,\r
        renderBoxWireframe: 1,\r
        wireframeColor: [1, 1, 1, 1],\r
        intensity: 0.001,\r
        frequency: 1,\r
        materialType: 2,\r
        rendererType: 1,\r
        field: "test",\r
        fieldType: 1,\r
        splitFactor: 0,\r
        autoScaleDepth: 10000,\r
        type: 0,\r
        gradient: true,\r
        defaultSymbol: {\r
            symbolType: 3,\r
            color: [1, 0, 0, 0.1],\r
        },\r
        uniqueValueInfos: [\r
            {\r
                value: 20,\r
                symbol: {\r
                    color: [0, 1, 0, 0.51]\r
                }\r
            },\r
            {\r
                value: 30,\r
                symbol: {\r
                    color: [1, 1, 0, 0.51]\r
                }\r
            },\r
\r
        ]\r
    }\r
};\r
//根据点云的test属性设置样式\r
fdapi.tileLayer.setPointCloudStyle(dataRender);\r
\`\`\`\r
\r
---\r
\r
### \`setRotation(id, newVal, fn)\` {#setRotation}\r
\r
设置旋转\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`newVal\` | \`array\` | 新的旋转坐标：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.setRotation(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setScale(id, newVal, fn)\` {#setScale}\r
\r
设置缩放\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`newVal\` | \`any\` | 新的缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.setScale(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setStyle(tileLayerIds, style, color, saturation, brightness, contrast, contrastBase, fn)\` {#setStyle}\r
\r
设置TileLayer的样式\r
\r
\r
\r
![](/img/refdoc/api/TileLayer.SetStyle.gif)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`tileLayerIds\` | \`string \\| array\` | TileLayer的ID或ID数组 |\r
| \`style\` | \`number\` | 样式， 0：默认；1：X光；2：纯色；3：水晶体；4：暗黑；5：科幻；6：扩散 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色，默认值:Color.White，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`saturation\` | \`number\` | 饱和度，仅在默认样式0下生效，取值范围：[0~2]，默认值：1.0 |\r
| \`brightness\` | \`number\` | 亮度 ，仅在默认样式0下生效，取值范围：[0.1~10]，默认值：1.0 |\r
| \`contrast\` | \`number\` | 对比度，仅在默认样式0下生效，取值范围：[0.2~5]，默认值：1.0 |\r
| \`contrastBase\` | \`number\` | 对比度基准，仅在默认样式0下生效，取值范围：[0.036~0.9]，默认值：0.18 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.setStyle(tileLayerIds, style, color, saturation, brightness, contrast, contrastBase);\r
\`\`\`\r
\r
---\r
\r
### \`setViewHeightRange(id, minViewHeight, maxViewHeight, fn)\` {#setViewHeightRange}\r
\r
设置TileLayer图层的可视高度范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`minViewHeight\` | \`number\` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`maxViewHeight\` | \`number\` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置TileLayer可视高度范围：SetViewHeightRange\r
\r
\`\`\`js\r
fdapi.camera.set(492448.667813, 2492094.840469, 143.587646, -37.938152, -39.432201, 0);\r
//设置小别墅的可见高度范围\r
fdapi.tileLayer.setViewHeightRange(villaId, 1, 100);\r
\`\`\`\r
\r
---\r
\r
### \`setViewportVisible(id, vp, fn)\` {#setViewportVisible}\r
\r
多视口状态下，设置图层在各视口的可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer唯一标识符 |\r
| \`vp\` | [\`Viewport\`](/docs/api/types#viewport) | 视口掩码（Viewport位运算） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置图层在多视口下可见性：SetViewportVisible\r
\r
\`\`\`js\r
//视口布局类型，取值范围：[1~7]\r
let viewportMode = 5;\r
//可选参数，激活后视口边框线的颜色\r
let lineColor = "#FFFFFF";\r
//可选参数，激活后视口边框线的宽度，单位：像素px\r
let lineSize = 2;\r
//进入多视口\r
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);\r
\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
\r
//小别墅 仅视口1和视口3可见\r
fdapi.tileLayer.setViewportVisible(villaId, Viewport.V1 | Viewport.V3);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示TileLayer图层\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | TileLayer对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示TileLayer图层：Show\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
\r
fdapi.tileLayer.show(villaId);\r
\`\`\`\r
\r
---\r
\r
### \`showActor(id, objectId, fn)\` {#showActor}\r
\r
显示Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectId\` | \`string\` | Actor的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.showActor(id, objectId);\r
\`\`\`\r
\r
---\r
\r
### \`showActors(data, fn)\` {#showActors}\r
\r
显示一个或多个Actor\r
\r
\r
\r
![](/img/refdoc/api/tilelayer.HideActor.gif)\r
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
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectIds\` | \`array\` | TileLayer里的Actor的ObjectID（单个或者数组） |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.showActors(data);\r
\`\`\`\r
\r
---\r
\r
### \`showAllActors(tileLayerIds)\` {#showAllActors}\r
\r
显示指定tilelayer的所有Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`tileLayerIds\` | \`string \\| array\` | TileLayer的ID或ID数组 |\r
\r
**返回：** 无返回值。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.showAllActors(tileLayerIds);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightActor(id, objectId, fn)\` {#unHighlightActor}\r
\r
取消高亮一个Actor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectId\` | \`string\` | Actor的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.unHighlightActor(id, objectId);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightActors(data, fn)\` {#unHighlightActors}\r
\r
停止高亮多个Actor，同时支持停止高亮多个图层的Actor\r
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
| \`id\` | \`string\` | TileLayer的ID |\r
| \`objectIds\` | \`array\` | TileLayer里的Actor的ObjectID（单个或者数组） |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.unHighlightActors(data);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightAllActors(fn)\` {#unHighlightAllActors}\r
\r
停止高亮所有Actor\r
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
await fdapi.tileLayer.unHighlightAllActors();\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightAllPoints(fn)\` {#unHighlightAllPoints}\r
\r
取消高亮点云包含所有点的高亮效果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：取消点云所有点高亮(仅对点云模型生效)：UnHighlightAllPoints\r
\r
\`\`\`js\r
fdapi.tileLayer.unHighlightAllPoints();\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightPoints(data, fn)\` {#unHighlightPoints}\r
\r
根据点云的属性字段值取消高亮\r
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
| \`id\` | \`string\` | 点云图层的Id |\r
| \`name\` | \`string\` | 点云图层包含的字段名称 |\r
| \`values\` | \`array\` | 点云图层包含的字段名称对应的取值数组，支持取消高亮多个匹配到的值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：取消高亮点云对应的特征值点(仅对点云模型生效)：UnHighlightPoints\r
\r
\`\`\`js\r
fdapi.tileLayer.unHighlightPoints([{\r
    id: "pcs",\r
    name: "oid",\r
    values: ["1", "3", "5839", "5849"],\r
}]);\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个TileLayer对象，支持更新以下属性：\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，支持更新以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 根据TileLayer对象的ID更新以下属性 |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`fileName\` | \`string\` | 3dt文件路径，推荐使用@path 方式管理添加3dt图层资源 |\r
| \`location\` | \`array\` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`rotation\` | \`array\` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`scale\` | \`array\` | 缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：修改TileLayer图层：Update\r
\r
\`\`\`js\r
await fdapi.tileLayer.update({\r
    id: '1',\r
    rotation: [0, 90, 0],//旋转角度\r
    scale: [1, 1, 1]    //缩放大小\r
});\r
fdapi.tileLayer.focus('1', 18000);\r
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
await fdapi.tileLayer.updateEnd();\r
\`\`\`\r
\r
---\r
\r
### \`updateHole(id, tileLayerId, holeCoordinate, isReverseCut, fn)\` {#updateHole}\r
\r
修改一个挖洞操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 唯一标识符 |\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`holeCoordinate\` | \`array\` | 待修改挖洞的坐标，[取值示例](/docs/tutorials/coordinates) |\r
| \`isReverseCut\` | \`boolean\` | 挖洞多边形是否反转，默认值：false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.updateHole(id, tileLayerId, holeCoordinate, isReverseCut);\r
\`\`\`\r
\r
---\r
\r
### \`updateModifier(id, tileLayerId, coordinates, ententBufferSize, fn)\` {#updateModifier}\r
\r
修改一个压平操作\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 唯一标识符 |\r
| \`tileLayerId\` | \`string\` | TileLayer对象的ID |\r
| \`coordinates\` | \`array\` | 压平多边形的坐标 |\r
| \`ententBufferSize\` | \`number\` | 羽化范围，取值范围：[任意正浮点数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.updateModifier(id, tileLayerId, coordinates, ententBufferSize);\r
\`\`\`\r
\r
---\r
\r
### \`updateRecord(id, newValMap, where, fn)\` {#updateRecord}\r
\r
更新TileLayer关联的数据库记录\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | tileLayer的ID |\r
| \`newValMap\` | \`object\` | 要设置的新值格式：&#123;Key:Value&#125; |\r
| \`where\` | \`string\` | 查询条件 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.tileLayer.updateRecord(id, newValMap, where);\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> 隐藏Actor：HideActor\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.hideActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");\r
\`\`\`\r
\r
> 显示Actor：ShowActor\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.showActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");\r
\`\`\`\r
\r
> 隐藏图层中指定的多个Actor：HideActors\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.hideActors([{\r
    "id": villaId,\r
    "objectIds": [\r
        "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",\r
        "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",\r
        "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",\r
        "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"\r
    ]\r
}]);\r
\`\`\`\r
\r
> 显示图层中指定的多个Actor：ShowActors\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.showActors([{\r
    "id": villaId,\r
    "objectIds": [\r
        "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",\r
        "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",\r
        "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",\r
        "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"\r
    ]\r
}]);\r
\`\`\`\r
\r
> 隐藏图层的所有Actor：HideAllActors\r
\r
\`\`\`js\r
//相机移动到对应actors范围内\r
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);\r
fdapi.tileLayer.hideAllActors(villaId);\r
\`\`\`\r
\r
> 显示图层的所有Actor：ShowAllActors\r
\r
\`\`\`js\r
//相机移动到对应actors范围内\r
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);\r
fdapi.tileLayer.showAllActors(villaId);\r
\`\`\`\r
\r
> 定位当前选中的Actor：FocusActor\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.focusActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", 10, 1, [-45, 45, 0]);\r
\`\`\`\r
\r
> 定位多个Actors：FocusActors\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.focusActors({\r
    'id': villaId, 'objectIds': [\r
        "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",\r
        "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",\r
        "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",\r
        "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"\r
    ]\r
}, 20, 1, [-45, 90, 0]);\r
\`\`\`\r
\r
> 高亮Actor：HighlightActor\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
\r
//设置高亮颜色（全局生效）\r
fdapi.settings.setHighlightColor(Color.Blue);\r
\r
//高亮小别墅房顶构件\r
fdapi.tileLayer.highlightActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");\r
\`\`\`\r
\r
> 自定义颜色高亮Actor：HighlightActorWithColor\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.highlightActorWithColor(villaId, ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", "98e2f96c-ccbd-4abb-a697-e7e5136106ee-000cf488"], [0, 1, 0, 0.1], false);\r
\`\`\`\r
\r
> 停止高亮Actor：UnHighlightActor\r
\r
\`\`\`js\r
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);\r
fdapi.tileLayer.unHighlightActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");\r
\`\`\`\r
\r
> 高亮多个Actors：HighlightActors\r
\r
\`\`\`js\r
//相机移动到对应actors范围内\r
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);\r
\r
//高亮多个Actor 支持高亮不同图层的actor\r
let result = await fdapi.tileLayer.getObjectIDs(villaId);\r
let objectIds = result.data[0].objectIds;\r
fdapi.tileLayer.highlightActors([{ "id": villaId, "objectIds": objectIds }]);\r
\`\`\`\r
\r
> 高亮多个Actors：HighlightActorsWithColor\r
\r
\`\`\`js\r
//相机移动到对应actors范围内\r
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);\r
\r
//高亮多个Actor 支持高亮不同图层的actor\r
let result = await fdapi.tileLayer.getObjectIDs(villaId);\r
let objectIds = result.data[0].objectIds;\r
\r
fdapi.tileLayer.highlightActorsWithColor([{\r
    id: villaId,\r
    objectIds: ["1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce"],\r
    color: [1, 1, 0, 0.1],\r
    bWireframe: false\r
}, {\r
    id: villaId,\r
    objectIds: ["98e2f96c-ccbd-4abb-a697-e7e5136106ee-000cf488"],\r
    color: [1, 0, 0, 0.1],\r
    bWireframe: true\r
}, {\r
    id: villaId,\r
    objectIds: ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a"],\r
    color: [0, 0, 1, 0.1],\r
    bWireframe: false\r
}]);\r
\`\`\`\r
\r
> 停止高亮多个Actors：UnHighlightActors\r
\r
\`\`\`js\r
//相机移动到对应actors范围内\r
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);\r
\r
\r
//停止高亮多个Actor\r
let result = await fdapi.tileLayer.getObjectIDs('979A4C034E29728F8A2635AD747B72A3');\r
let objectIds = result.data[0].objectIds;\r
fdapi.tileLayer.unHighlightActors([{ "id": "979A4C034E29728F8A2635AD747B72A3", "objectIds": objectIds }, { "id": "5664455F43C097E98F4FB3AA6B8B1E84", "objectIds": ["Group1608", "SM_LuDeng385", "archexteriors9_01_2531"] }]);\r
\`\`\`\r
\r
> 停止高亮所有Actors：UnHighlightAllActors\r
\r
\`\`\`js\r
//停止所有Actor高亮\r
fdapi.tileLayer.unHighlightAllActors();\r
\`\`\`\r
\r
> 设置图层对贴花类型对象的贴合支持：EnableDecal\r
\r
\`\`\`js\r
fdapi.tileLayer.enableDecal([\r
    {\r
        "tileLayerId": "4DECD1704AD8119E33CF658A64A70AD2",\r
        "enable": false\r
    }, {\r
        "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",\r
        "enable": false\r
    }\r
]);\r
\`\`\`\r
\r
> 开启图层剖切：EnableClip\r
\r
\`\`\`js\r
fdapi.tileLayer.enableClip("E637D8FE42335EE96C58A1840BCAD0CE");\r
\`\`\`\r
\r
> 关闭图层剖切：DisableClip\r
\r
\`\`\`js\r
fdapi.tileLayer.disableClip("E637D8FE42335EE96C58A1840BCAD0CE");\r
\`\`\`\r
\r
> 设置图层样式：SetStyle\r
\r
\`\`\`js\r
fdapi.camera.set(492961.030781, 2491283.131953, 511.248242, -38.79187, -92.09137, 0);\r
\r
let style = 1; //样式， 0：默认；1：X光；2：纯色；3：水晶体\r
//以下四个属性仅在默认样式0下生效\r
let saturation = 1;//饱和度\r
let brightness = 1;//亮度\r
let contrast = 1;//对比度\r
let contrastBase = 0.18;//对比度基准\r
fdapi.tileLayer.setStyle("4DECD1704AD8119E33CF658A64A70AD2", style, [1, 1, 1, 0.11], saturation, brightness, contrast, contrastBase);\r
\`\`\`\r
\r
> 设置图层海拔热力样式：SetAltitudeHeatMap\r
\r
\`\`\`js\r
fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);\r
\r
fdapi.tileLayer.setAltitudeHeatMap("4DECD1704AD8119E33CF658A64A70AD2", [\r
    {\r
        "value": 0,\r
        "color": [0, 0, 1, 1]\r
    }, {\r
        "value": 10,\r
        "color": [0, 0, 1, 1]\r
    },\r
    {\r
        "value": 20,\r
        "color": [0, 0.4, 1, 1]\r
    },\r
    {\r
        "value": 30,\r
        "color": [0, 0.8, 1, 1]\r
    },\r
    {\r
        "value": 40,\r
        "color": [0, 1, 0.8, 1]\r
    },\r
    {\r
        "value": 50,\r
        "color": [0, 1, 0.4, 1]\r
    },\r
    {\r
        "value": 55,\r
        "color": [0, 1, 0, 1]\r
    },\r
\r
    {\r
        "value": 60,\r
        "color": [0, 1, 0, 1]\r
    },\r
    {\r
        "value": 70,\r
        "color": [0.4, 1, 0, 1]\r
    },\r
    {\r
        "value": 80,\r
        "color": [0.8, 1, 0, 1]\r
    },\r
\r
    {\r
        "value": 90,\r
        "color": [1, 0.8, 0, 1]\r
    },\r
    {\r
        "value": 95,\r
        "color": [1, 0.4, 0, 1]\r
    },\r
    {\r
        "value": 100,\r
        "color": [1, 0, 0, 1]\r
    }\r
]);\r
\`\`\`\r
\r
> 为TileLayer图层恢复样式：ResetStyle\r
\r
\`\`\`js\r
fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);\r
let style = 0; //样式， 0：默认；1：X光；2：纯色；3：水晶体\r
//以下四个属性仅在默认样式0下生效\r
let saturation = 1;//饱和度\r
let brightness = 1;//亮度\r
let contrast = 1;//对比度\r
let contrastBase = 0.18;//对比度基准\r
fdapi.tileLayer.setStyle("4DECD1704AD8119E33CF658A64A70AD2", style, Color.White, saturation, brightness, contrast, contrastBase);\r
\`\`\`\r
\r
> 设置TileLayer图层碰撞信息：SetCollision\r
\r
\`\`\`js\r
fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);\r
let enabled = true;//是否开启碰撞总开关，如果此参数设置为false，则下面三个参数均会失效\r
let mouseInteract = true;//是否开启鼠标交互\r
let mouseFunction = true;//是否开启鼠标相关的功能交互，包含鼠标拾取、分析工具、测量工具等\r
let characterCollision = true; //是否开启角色碰撞\r
fdapi.tileLayer.setCollision("4DECD1704AD8119E33CF658A64A70AD2", enabled, mouseInteract, mouseFunction, characterCollision);\r
\`\`\`\r
\r
> 获取TileLayer图层碰撞信息：GetCollision\r
\r
\`\`\`js\r
fdapi.tileLayer.getCollision("4DECD1704AD8119E33CF658A64A70AD2");\r
\`\`\`\r
\r
> 设置TileLayer是否支持对网络图层服务进行贴合：EnableImageLayerDecal\r
\r
\`\`\`js\r
fdapi.tileLayer.enableImageLayerDecal([\r
    {\r
        "tileLayerId": "4DECD1704AD8119E33CF658A64A70AD2",\r
        "enable": true\r
    }, {\r
        "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",\r
        "enable": false\r
    }\r
]);\r
\`\`\`\r
\r
> 添加单个压平：AddModifier\r
\r
\`\`\`js\r
//相机定位到压平区域\r
fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);\r
\r
//隐藏遮挡的植物\r
fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);\r
\r
//隐藏遮挡的风车 按文件夹隐藏\r
fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);\r
\r
//添加前删除 防止id重复\r
fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');\r
\r
let coordinates = [\r
    [488501.21875, 2488108, 19.438125610351563],\r
    [489722.4375, 2490857, 4.0191407203674316],\r
    [491464.96875, 2489233.5, 18.179296493530273],\r
    [490473.125, 2486914.5, 2.1426563262939453],\r
];\r
//添加压平 注意：此方法会在图层树上创建压平对象\r
fdapi.tileLayer.addModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE', coordinates, 0);\r
\`\`\`\r
\r
> 修改压平操作：UpdateModifier\r
\r
\`\`\`js\r
let coordinates = [\r
    [489199.34375, 2489516.25, 18.1796875],\r
    [490395.125, 2490211, 22.756874084472656],\r
    [490688.53125, 2488826, 26.404375076293945],\r
];\r
fdapi.tileLayer.updateModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE', coordinates, 0);\r
\`\`\`\r
\r
> 删除压平操作：DeleteModifier\r
\r
\`\`\`js\r
fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');\r
\`\`\`\r
\r
> 添加多个压平：AddModifiers\r
\r
\`\`\`js\r
//相机定位到压平区域\r
fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);\r
\r
//隐藏遮挡的植物\r
fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);\r
\r
//隐藏遮挡的风车 按文件夹隐藏\r
fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);\r
\r
//添加前先删除\r
fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');\r
fdapi.tileLayer.deleteModifier('m2', 'E637D8FE42335EE96C58A1840BCAD0CE');\r
\r
//第一个压平对象\r
let id1 = 'm1';\r
let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';\r
let coordinates1 = [\r
    [489199.34375, 2489516.25, 18.1796875],\r
    [490395.125, 2490211, 22.756874084472656],\r
    [490688.53125, 2488826, 26.404375076293945],\r
];\r
//多个坐标构成内环 没有可以不设置\r
let innerRings1 = [\r
\r
];\r
//羽化范围\r
let ententBufferSize1 = 10;\r
\r
//第二个压平对象\r
let id2 = 'm2';\r
let coordinates2 = [\r
    [488527.96875, 2488053, 24.532032012939453],\r
    [488768.40625, 2488719.75, 12.159375190734863],\r
    [490239.5, 2488199.75, 46.452499389648438],\r
    [489931.5, 2487190.5, 39.267032623291016],\r
];\r
//多个坐标构成内环 没有可以不设置\r
let innerRings2 = [\r
\r
];\r
//羽化范围\r
let ententBufferSize2 = 10;\r
\r
let data = [\r
    { 'id': id1, 'tileLayerId': tileLayerId, 'coordinates': coordinates1, 'innerRings': innerRings1, 'ententBufferSize': ententBufferSize1 },\r
    { 'id': id2, 'tileLayerId': tileLayerId, 'coordinates': coordinates2, 'innerRings': innerRings2, 'ententBufferSize': ententBufferSize2 }\r
\r
];\r
fdapi.tileLayer.addModifiers(data);\r
\`\`\`\r
\r
> 添加ShapeFile压平：AddModifierByShapeFile\r
\r
\`\`\`js\r
//相机定位到压平区域\r
fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);\r
\r
//隐藏遮挡的植物\r
fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);\r
\r
//隐藏遮挡的风车 按文件夹隐藏\r
fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);\r
\r
//压平的地形图层ID\r
let tileLayerId = "E637D8FE42335EE96C58A1840BCAD0CE";\r
\r
//根据shapefile文件压平地形 \r
let id = 'm3';\r
let shapeFilePath = HostConfig.Path + '/assets/shapefile/ypwd.shp';\r
let data = { 'id': id, 'tileLayerId': tileLayerId, 'shapeFile': shapeFilePath };\r
//注意：示例代码内预先准备了压平范围对应的yaping.shp 请提前准备好对应范围shp文件再执行addModifierByShapeFile\r
fdapi.tileLayer.addModifierByShapeFile(data);\r
\`\`\`\r
\r
> 清空压平操作：ClearModifier\r
\r
\`\`\`js\r
//注意：清除地形的所有压平后 地形高度会遮挡模型 \r
fdapi.tileLayer.clearModifier('E637D8FE42335EE96C58A1840BCAD0CE');\r
\`\`\`\r
\r
> 添加ShapeFile挖洞：AddHoleByShapeFile\r
\r
\`\`\`js\r
//相机移动到挖洞区域\r
fdapi.camera.set(492084.543438, 2488554.227031, 2181.706875, -43.213093, -169.203659, 0);\r
\r
//隐藏遮挡的植物\r
fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);\r
\r
//隐藏遮挡的风车 按文件夹隐藏\r
fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);\r
\r
//根据shape文件对地形挖洞 \r
//注意：示例代码内预先准备了挖洞范围对应的shapeFile文件 请提前准备好对应范围shp文件再执行addHoleByShapeFile\r
let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';\r
let shapeFilePath = HostConfig.Path + '/assets/shapefile/ypwd.shp';\r
let data = { 'tileLayerId': tileLayerId, 'shapeFile': shapeFilePath };\r
fdapi.tileLayer.addHoleByShapeFile(data);\r
\`\`\`\r
\r
> 添加挖洞：AddHole\r
\r
\`\`\`js\r
//添加前先清空\r
let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';\r
fdapi.tileLayer.clearHole(tileLayerId);\r
\r
\r
let id1 = "hole1";\r
//多个坐标 二维数组\r
let coordinates1 = [\r
    [491280.3125, 2490323, 5.8794140815734863],\r
    [491294.375, 2490340.5, 5.577080249786377],\r
    [491324.9375, 2490327.75, 7.7592482566833496],\r
    [491319.8125, 2490308.75, 8.2433004379272461],\r
    [491296.125, 2490307.75, 7.195253849029541],\r
];\r
//多个坐标构成内环 三维数组\r
let innerRings1 = [];\r
\r
\r
let id2 = "hole2";\r
//多个坐标 二维数组\r
let coordinates2 = [\r
    [491342.09375, 2490333.25, 8.4353218078613281],\r
    [491349.34375, 2490346, 8.3129301071166992],\r
    [491366.15625, 2490332.25, 9.146367073059082],\r
    [491360.125, 2490321.5, 9.2895412445068359],\r
];\r
//多个坐标构成内环 三维数组\r
let innerRings2 = [];\r
let data = [\r
    { 'id': id1, 'tileLayerId': tileLayerId, 'coordinates': coordinates1, 'innerRings': innerRings1, 'isReverseCut': false },\r
    { 'id': id2, 'tileLayerId': tileLayerId, 'coordinates': coordinates2, 'innerRings': innerRings2, 'isReverseCut': false }\r
];\r
//批量添加\r
fdapi.tileLayer.addHole(data);\r
\r
fdapi.infoTree.focus('hole1');\r
\`\`\`\r
\r
> 修改挖洞操作：UpdateHole\r
\r
\`\`\`js\r
let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';\r
let holeCoordinate = [\r
    [491280.3125, 2490323, 5.8794140815734863],\r
    [491294.375, 2490340.5, 5.577080249786377],\r
    [491324.9375, 2490327.75, 7.7592482566833496],\r
    [491319.8125, 2490308.75, 8.2433004379272461]\r
];\r
await fdapi.tileLayer.updateHole("hole1", tileLayerId, holeCoordinate, false);\r
\`\`\`\r
\r
> 删除挖洞操作：DeleteHole\r
\r
\`\`\`js\r
fdapi.tileLayer.deleteHole("hole1", 'E637D8FE42335EE96C58A1840BCAD0CE');\r
\`\`\`\r
\r
> 清空挖洞操作：ClearHole\r
\r
\`\`\`js\r
//清空\r
fdapi.tileLayer.clearHole('E637D8FE42335EE96C58A1840BCAD0CE');\r
\`\`\`\r
`;export{r as default};
