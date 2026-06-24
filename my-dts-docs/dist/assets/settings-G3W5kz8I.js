const n=`---\r
slug: /api/settings/settings\r
title: Settings\r
sidebar_label: Settings\r
description: "Settings 提供场景全局参数设置接口（画质、后期、显示、特效等）。"\r
---\r
\r
# Settings\r
\r
Settings 提供场景全局参数设置接口（画质、后期、显示、特效等）。\r
\r
通过 \`api.settings\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Settings 提供场景全局参数设置接口（画质、后期、显示、特效等）。\r
- **别名 / 不同行业叫法**：全局设置 / 场景设置 / 参数设置（无明显行业别称）。\r
- **适用行业**：通用（各行业项目的场景设置）\r
- **使用场景**：\r
  - 统一设定场景画质与后期效果\r
  - 按汇报/分析模式切换显示项\r
  - 批量配置全局参数\r
- **注意事项**：\r
  - 多为全局生效，影响整个场景\r
  - 部分参数性能开销较大\r
  - 与 SettingsPanel（面板 UI）配合使用\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`enableRightClickMousePick\`](#enableRightClickMousePick) | 控制鼠标右键的点击拾取，默认关闭 |  |\r
| [\`getCharacterAssetPath\`](#getCharacterAssetPath) | 查询当前工程已经挂载的pak文件包含的自定义的人物角色模型路径 |  |\r
| [\`getDroneAssetPath\`](#getDroneAssetPath) | 查询当前工程已经挂载的pak文件包含的自定义的无人机模型路径 |  |\r
| [\`getInteractiveMode\`](#getInteractiveMode) | 查询当前交互模式 |  |\r
| [\`getLabelLayer\`](#getLabelLayer) | 获取场景内所有的VTPK标注信息 |  |\r
| [\`getMapMode\`](#getMapMode) | 获取地图样式 |  |\r
| [\`getProjectWKT\`](#getProjectWKT) | 获取ACP工程的坐标系配准(wkt字符串) |  |\r
| [\`hidePropertiesPanel\`](#hidePropertiesPanel) | 隐藏图层树上对象的属性面板 |  |\r
| [\`removeLabelLayer\`](#removeLabelLayer) | 移除当前显示的VTPK的标注 |  |\r
| [\`setAmbientFadeDistance\`](#setAmbientFadeDistance) | 设置环境光遮罩淡出距离 |  |\r
| [\`setAmbientIntensity\`](#setAmbientIntensity) | 设置环境光遮罩强度 |  |\r
| [\`setAmbientRadius\`](#setAmbientRadius) | 设置环境光遮罩采样半径 |  |\r
| [\`setAntiAliasing\`](#setAntiAliasing) | 设置反走样（Anti-Aliasing）开关 |  |\r
| [\`setAperture\`](#setAperture) | 设置景深光圈大小 |  |\r
| [\`setBloomIntensity\`](#setBloomIntensity) | 设置泛光强度 |  |\r
| [\`setCameraAutoRotateOnRightDoubleClick\`](#setCameraAutoRotateOnRightDoubleClick) | 设置双击鼠标右键的默认行为，即双击右键是否自动开始相机旋转 |  |\r
| [\`setCampassPosition\`](#setCampassPosition) | 设置指北针位置 |  |\r
| [\`setCampassVisible\`](#setCampassVisible) | 设置指北针可见性 |  |\r
| [\`setCharacterAssetPath\`](#setCharacterAssetPath) | 人物漫游模式下，设置自定义的人物角色模型 |  |\r
| [\`setCharacterRoaming\`](#setCharacterRoaming) | 设置人物交互模式的落脚点、人物朝向和观察距离 |  |\r
| [\`setCharacterRotation\`](#setCharacterRotation) | 设置角色旋转朝向 |  |\r
| [\`setChromaticAberration\`](#setChromaticAberration) | 设置透镜色差强度 |  |\r
| [\`setContrast\`](#setContrast) | 设置画面对比度 |  |\r
| [\`setDarkCorner\`](#setDarkCorner) | 设置暗角强度 |  |\r
| [\`setDeepBlur\`](#setDeepBlur) | 设置景深深度模糊强度 |  |\r
| [\`setDepthFiethSwitch\`](#setDepthFiethSwitch) | 设置景深开关 |  |\r
| [\`setDofMode\`](#setDofMode) | 设置景深对焦距离模式，仅在景深滤镜效果（postProcessEffects=1）下生效 |  |\r
| [\`setDroneAssetPath\`](#setDroneAssetPath) | 无人机漫游模式下，设置自定义的无人机模型 |  |\r
| [\`setEnableCameraMovingEvent\`](#setEnableCameraMovingEvent) | 设置是否触发CameraMoving事件，CameraMoving事件默认是关闭的，如果… |  |\r
| [\`setEnableInteract\`](#setEnableInteract) | 设置交互开关，禁用后可以通过API设置交互。 |  |\r
| [\`setExposureCompensation\`](#setExposureCompensation) | 设置曝光补偿值 |  |\r
| [\`setExposureEnabled\`](#setExposureEnabled) | 设置自动曝光开关 |  |\r
| [\`setFocalLength\`](#setFocalLength) | 设置景深焦距 |  |\r
| [\`setFovX\`](#setFovX) | 设置水平视场角 |  |\r
| [\`setGroundHeight\`](#setGroundHeight) | 设置工程场景的海拔（地面高度） |  |\r
| [\`setHighlightColor\`](#setHighlightColor) | 设置高亮颜色 |  |\r
| [\`setImageryLayerEnableDecal\`](#setImageryLayerEnableDecal) | 设置网络图层服务(WMTS、WMS、MVT等)是否贴合地形或对象 |  |\r
| [\`setImageryLayerLevelOffset\`](#setImageryLayerLevelOffset) | 设置网络图层服务的裂分等级的偏移量，如果图层服务当前某处的裂分等级为6级，参数设置为1则… |  |\r
| [\`setInteractiveMode\`](#setInteractiveMode) | 设置交互模式 |  |\r
| [\`setLabelLayer\`](#setLabelLayer) | 设置显示对应VTPK的标注 |  |\r
| [\`setLabelLayerDepthTestHeight\`](#setLabelLayerDepthTestHeight) | 设置VTPK标注的深度检测的相机高度阈值 |  |\r
| [\`setLabelLayerLineSpace\`](#setLabelLayerLineSpace) | 设置VTPK线性标注的间隔 |  |\r
| [\`setLabelLayerScaleRatio\`](#setLabelLayerScaleRatio) | 设置VTPK标注的缩放显示百分比 |  |\r
| [\`setLabelLayerSymbolAvoidance\`](#setLabelLayerSymbolAvoidance) | 设置VTPK标注符号避让方式 |  |\r
| [\`setLensFlareIntensity\`](#setLensFlareIntensity) | 设置镜头光晕强度 |  |\r
| [\`setLutIntensity\`](#setLutIntensity) | 设置 LUT 调色强度 |  |\r
| [\`setLutMode\`](#setLutMode) | 设置 LUT 调色模式 |  |\r
| [\`setMainPanelPos\`](#setMainPanelPos) | 设置左侧资源面板的位置偏移 |  |\r
| [\`setMainUIVisibility\`](#setMainUIVisibility) | 设置主界面UI元素的可见性 |  |\r
| [\`setMapMode\`](#setMapMode) | 设置地图样式 |  |\r
| [\`setMaxCameraHeight\`](#setMaxCameraHeight) | 设置相机的最大观察高度 |  |\r
| [\`setMinCameraHeight\`](#setMinCameraHeight) | 设置相机的最小观察高度 |  |\r
| [\`setMouseHoverTime\`](#setMouseHoverTime) | 设置鼠标悬浮事件返回的时间间隔 |  |\r
| [\`setMouseMoveTime\`](#setMouseMoveTime) | 设置鼠标移动事件返回的时间间隔 |  |\r
| [\`setMousePickMask\`](#setMousePickMask) | 设置鼠标拾取功能，目前有三种拾取状态：鼠标左键点击（MouseClick: 0x1)、鼠… |  |\r
| [\`setMoveSpeed\`](#setMoveSpeed) | 设置交互的默认移动速度 |  |\r
| [\`setNearClipPlane\`](#setNearClipPlane) | 设置相机的近裁距离（最近可渲染距离），用于控制相机视野 |  |\r
| [\`setOceanColor\`](#setOceanColor) | 设置海洋颜色 |  |\r
| [\`setOsgbGlobalAlpha\`](#setOsgbGlobalAlpha) | 设置倾斜摄影全局不透明度 |  |\r
| [\`setOsgbGlobalLitStatus\`](#setOsgbGlobalLitStatus) | 设置倾斜摄影是否参与光照计算 |  |\r
| [\`setPlayerName\`](#setPlayerName) | 联网模式（会议室）下设置角色漫游和无人机漫游模式时模型上方显示的文字名称 |  |\r
| [\`setPostProcessEffects\`](#setPostProcessEffects) | 设置滤镜后期处理效果 |  |\r
| [\`setPropertiesPanelPos\`](#setPropertiesPanelPos) | 设置图层树上对象的属性面板的屏幕位置偏移 |  |\r
| [\`setReceiveDecalMode\`](#setReceiveDecalMode) | 设置对象贴合模式 |  |\r
| [\`setRenderedCursorVisible\`](#setRenderedCursorVisible) | 设置多客户端访问时渲染鼠标同步显示 |  |\r
| [\`setRoamViewMode\`](#setRoamViewMode) | 设置角色漫游使用的默认视角，即第三人称或第一人称 |  |\r
| [\`setRoleGender\`](#setRoleGender) | 设置第三人称交互使用人物角色默认使用的性别 |  |\r
| [\`setSaturation\`](#setSaturation) | 设置画面饱和度 |  |\r
| [\`setScreenControlsVisible\`](#setScreenControlsVisible) | 当交互模式为人物或无人机模式时，设置屏幕操纵杆UI的可见性 |  |\r
| [\`setScreenPercentage\`](#setScreenPercentage) | 设置屏幕渲染百分比（分辨率缩放） |  |\r
| [\`setTerrainAlpha\`](#setTerrainAlpha) | :::caution 已废弃 |  |\r
| [\`setTerrainGlobalAlpha\`](#setTerrainGlobalAlpha) | 设置地形全局不透明度 |  |\r
| [\`setTerrainGlobalLitStatus\`](#setTerrainGlobalLitStatus) | 设置地形是否参与光照计算 |  |\r
| [\`setTonemapper\`](#setTonemapper) | 设置色彩优化（Tonemapping）开关 |  |\r
| [\`setToolbarVisible\`](#setToolbarVisible) | 设置屏幕右侧工具栏的可见性 |  |\r
| [\`setWMTSLayerOpacity\`](#setWMTSLayerOpacity) | 设置WMTS图层的透明度 |  |\r
| [\`setWMTSLayerVisible\`](#setWMTSLayerVisible) | 设置WMTS图层的可见性 |  |\r
| [\`setYawSpeed\`](#setYawSpeed) | 设置水平视角的默认旋转速度，即按住鼠标右键拖拽水平视角旋转的速度 |  |\r
| [\`showPropertiesPanel\`](#showPropertiesPanel) | 显示图层树上对象的属性面板 |  |\r
\r
## 方法（Methods）\r
\r
### \`enableRightClickMousePick(enable, fn)\` {#enableRightClickMousePick}\r
\r
控制鼠标右键的点击拾取，默认关闭\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`enable\` | \`boolean\` | 是否开启鼠标右键的点击拾取，默认值：false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.enableRightClickMousePick(enable);\r
\`\`\`\r
\r
---\r
\r
### \`getCharacterAssetPath(fn)\` {#getCharacterAssetPath}\r
\r
查询当前工程已经挂载的pak文件包含的自定义的人物角色模型路径\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.getCharacterAssetPath();\r
\`\`\`\r
\r
---\r
\r
### \`getDroneAssetPath(fn)\` {#getDroneAssetPath}\r
\r
查询当前工程已经挂载的pak文件包含的自定义的无人机模型路径\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.getDroneAssetPath();\r
\`\`\`\r
\r
---\r
\r
### \`getInteractiveMode(fn)\` {#getInteractiveMode}\r
\r
查询当前交互模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：获取交互模式：GetInteractiveMode\r
\r
\`\`\`js\r
fdapi.settings.getInteractiveMode();\r
\`\`\`\r
\r
---\r
\r
### \`getLabelLayer(fn, fn)\` {#getLabelLayer}\r
\r
获取场景内所有的VTPK标注信息\r
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
        {\r
            "result":	0,\r
            "resultMessage":	"OK",\r
            "vtpks":	["Shenzhen_vtpk_3dt_0802:05C60E664E65269092E5C5AA945EE5E1", "shenzhenbldg:67CD8535419F3F3176B7C49986783B4B"]\r
        }\r
\`\`\`\r
\r
---\r
\r
### \`getMapMode(fn, fn)\` {#getMapMode}\r
\r
获取地图样式\r
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
地图样式\r
{\r
        "mode":	2, // 地图样式，0：指南针；1：小地图；2：大地图，参见MapMode\r
        "coordType":	0, //坐标系类型，0：经纬度；1：本地（默认值是0）\r
        "mapPoint":	[0.000000, 0.000000], //同名点，取值范围：[x,y]，（默认值是[0, 0]）\r
        "longitude":	0.000000,//经度，取值范围：[0~180]（默认值是0.0）\r
        "latitude":	0.000000,//取值范围：[0~90]（默认值是0.0）\r
        "cache":	":memory:",//缓存路径，字符串地址，（默认值是 ":memory:"）\r
        "style":	"http://192.168.1.29:82/B34兴趣点_居名点",//风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）\r
        "serverURL":	[],//WMTS风格路径，二维数组，参考setMapMode参数说明\r
        "groundHeight":	0.000000,//地面高度，取值范围：[0~任意数值]（默认值是0.0）\r
        "renderMode":	0, //渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）\r
        "coordOrder":	0, //坐标顺序，0: XY; 1: YX，默认值：0\r
        "maxLevel": 10 // WMTS服务最大显示层级，取值范围：[0~22]，默认值：10\r
        }\r
\`\`\`\r
\r
> 示例：获取地图模式：GetMapMode\r
\r
\`\`\`js\r
fdapi.settings.getMapMode();\r
\`\`\`\r
\r
---\r
\r
### \`getProjectWKT(fn)\` {#getProjectWKT}\r
\r
获取ACP工程的坐标系配准(wkt字符串)\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：获取ACP工程的坐标系配准：GetProjectWKT\r
\r
\`\`\`js\r
fdapi.settings.getProjectWKT();\r
\`\`\`\r
\r
---\r
\r
### \`hidePropertiesPanel(fn)\` {#hidePropertiesPanel}\r
\r
隐藏图层树上对象的属性面板\r
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
await fdapi.settings.hidePropertiesPanel();\r
\`\`\`\r
\r
---\r
\r
### \`removeLabelLayer(fn)\` {#removeLabelLayer}\r
\r
移除当前显示的VTPK的标注\r
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
await fdapi.settings.removeLabelLayer();\r
\`\`\`\r
\r
---\r
\r
### \`setAmbientFadeDistance(ambientFadeDistance, fn)\` {#setAmbientFadeDistance}\r
\r
设置环境光遮罩淡出距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ambientFadeDistance\` | \`number\` | 环境光遮罩的淡出距离（单位：米），默认值：12000 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置环境光遮罩淡出距离：SetAmbientFadeDistance\r
\r
\`\`\`js\r
//环境光遮罩的淡出距离（单位：米），默认值：12000\r
fdapi.settings.setAmbientFadeDistance(8000);\r
\`\`\`\r
\r
---\r
\r
### \`setAmbientIntensity(ambientIntensity, fn)\` {#setAmbientIntensity}\r
\r
设置环境光遮罩强度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ambientIntensity\` | \`number\` | 环境光遮罩强度，取值范围：[0~100]，默认值：60 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置环境光遮罩强度：SetAmbientIntensity\r
\r
\`\`\`js\r
//环境光遮罩强度，取值范围：[0~100]，默认值：60\r
fdapi.settings.setAmbientIntensity(80);\r
\`\`\`\r
\r
---\r
\r
### \`setAmbientRadius(ambientRadius, fn)\` {#setAmbientRadius}\r
\r
设置环境光遮罩采样半径\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ambientRadius\` | \`number\` | 环境光遮罩采样半径，默认值：100 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置环境光遮罩采样半径：SetAmbientRadius\r
\r
\`\`\`js\r
//环境光遮罩的淡出距离（单位：米），默认值：12000\r
fdapi.settings.setAmbientFadeDistance(8000);\r
\`\`\`\r
\r
---\r
\r
### \`setAntiAliasing(antiAliasing, fn)\` {#setAntiAliasing}\r
\r
设置反走样（Anti-Aliasing）开关\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`antiAliasing\` | \`boolean\` | 是否开启反走样，默认值：true |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置反走样开关：SetAntiAliasing\r
\r
\`\`\`js\r
// 是否开启反走样，默认值：true\r
fdapi.settings.setAntiAliasing(true);\r
\`\`\`\r
\r
---\r
\r
### \`setAperture(aperture, fn)\` {#setAperture}\r
\r
设置景深光圈大小\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`aperture\` | \`number\` | 光圈值（f 值），值越小景深越浅，默认值：4 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置景深光圈大小：SetAperture\r
\r
\`\`\`js\r
// 光圈值（f 值），值越小景深越浅，默认值：4\r
fdapi.settings.setAperture(2.8);\r
\`\`\`\r
\r
---\r
\r
### \`setBloomIntensity(bloomIntensity, fn)\` {#setBloomIntensity}\r
\r
设置泛光强度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`bloomIntensity\` | \`number\` | 泛光强度，取值范围：[0~10.0]，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置泛光强度：SetBloomIntensity\r
\r
\`\`\`js\r
// 泛光强度，取值范围：[0~10.0]，默认值：0\r
fdapi.settings.setBloomIntensity(0.5);\r
\`\`\`\r
\r
---\r
\r
### \`setCameraAutoRotateOnRightDoubleClick(enable, fn)\` {#setCameraAutoRotateOnRightDoubleClick}\r
\r
设置双击鼠标右键的默认行为，即双击右键是否自动开始相机旋转\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`enable\` | \`boolean\` | 设置双击右键是否开启相机自传，取值：true 启用，false 禁用，默认值：true |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setCameraAutoRotateOnRightDoubleClick(enable);\r
\`\`\`\r
\r
---\r
\r
### \`setCampassPosition(left, top, fn)\` {#setCampassPosition}\r
\r
设置指北针位置\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`left\` | \`number\` | 指北针距离视频流左侧原点像素距离，类似CSS内绝对定位left，注意：如果设置为负值则恢复到原始位置。 |\r
| \`top\` | \`number\` | 指北针距离视频流上方原点像素距离，类似CSS内绝对定位top，注意：如果设置为负值则恢复到原始位置。 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置指北针位置：SetCampassPosition\r
\r
\`\`\`js\r
fdapi.settings.setCampassPosition(100, 100);\r
\`\`\`\r
\r
---\r
\r
### \`setCampassVisible(visible, fn)\` {#setCampassVisible}\r
\r
设置指北针可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`visible\` | \`boolean\` | 指北针是否可见 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示|隐藏指北针：SetCampassVisible\r
\r
\`\`\`js\r
__campassVisible = !__campassVisible;\r
fdapi.settings.setCampassVisible(__campassVisible);\r
\`\`\`\r
\r
---\r
\r
### \`setCharacterAssetPath(assetPath, fn)\` {#setCharacterAssetPath}\r
\r
人物漫游模式下，设置自定义的人物角色模型\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`assetPath\` | \`string\` | 自定义打包pak文件内的人物角色模型路径，可以通过getCharacterAssetPath()方法查询获取 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：角色漫游下设置人物模型：SetCharacterAssetPath\r
\r
\`\`\`js\r
//设置人物漫游交互模式\r
fdapi.settings.setInteractiveMode(1);\r
\r
//查询已经挂载的自定义人物角色模型\r
let pathArr = await fdapi.settings.getCharacterAssetPath();\r
//设置自定义的人物角色\r
//fdapi.settings.setCharacterAssetPath('/JC_CustomAssets/PlayerLibrary/Exhibition/工人_2');\r
fdapi.settings.setCharacterAssetPath(pathArr.paths[0]);\r
\`\`\`\r
\r
---\r
\r
### \`setCharacterRoaming(location, rotation, distance, fn)\` {#setCharacterRoaming}\r
\r
设置人物交互模式的落脚点、人物朝向和观察距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`location\` | \`array\` | 人物落脚点 |\r
| \`rotation\` | \`array\` | 人物朝向 |\r
| \`distance\` | \`number\` | 相机观察人物的距离 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置人物漫游：SetCharacterRoaming\r
\r
\`\`\`js\r
fdapi.settings.setCharacterRoaming([493080.27, 2492091.36, 2.31], [-20, 8, 0], 10);\r
\`\`\`\r
\r
---\r
\r
### \`setCharacterRotation(rotation, fn)\` {#setCharacterRotation}\r
\r
设置角色旋转朝向\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`rotation\` | \`array\` | 旋转角度 [Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setCharacterRotation(rotation);\r
\`\`\`\r
\r
---\r
\r
### \`setChromaticAberration(chromaticAberration, fn)\` {#setChromaticAberration}\r
\r
设置透镜色差强度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`chromaticAberration\` | \`number\` | 色差强度值，取值范围：[0~5]，默认值：0（关闭） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置透镜色差强度：SetChromaticAberration\r
\r
\`\`\`js\r
//色差强度值，取值范围：[0~5]，默认值：0（关闭）\r
fdapi.settings.setChromaticAberration(1);\r
\`\`\`\r
\r
---\r
\r
### \`setContrast(contrast, fn)\` {#setContrast}\r
\r
设置画面对比度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`contrast\` | \`number\` | 对比度，取值范围：[0~100]，默认值：10 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置画面对比度：SetContrast\r
\r
\`\`\`js\r
// 对比度，取值范围：[0~100]，默认值：10\r
fdapi.settings.setContrast(20);\r
\`\`\`\r
\r
---\r
\r
### \`setDarkCorner(darkCorner, fn)\` {#setDarkCorner}\r
\r
设置暗角强度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`darkCorner\` | \`number\` | 暗角强度（百分比），取值范围：[0~1]，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置暗角强度：SetDarkCorner\r
\r
\`\`\`js\r
// 暗角强度（百分比），取值范围：[0~1]，默认值：0\r
fdapi.settings.setDarkCorner(0.2);\r
\`\`\`\r
\r
---\r
\r
### \`setDeepBlur(deepBlur, fn)\` {#setDeepBlur}\r
\r
设置景深深度模糊强度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`deepBlur\` | \`number\` | 深度模糊强度，默认值：2 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置景深深度模糊强度：SetDeepBlur\r
\r
\`\`\`js\r
//深度模糊强度，默认值：2\r
fdapi.settings.setDeepBlur(3);\r
\`\`\`\r
\r
---\r
\r
### \`setDepthFiethSwitch(depthFiethSwitch, fn)\` {#setDepthFiethSwitch}\r
\r
设置景深开关\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`depthFiethSwitch\` | \`boolean\` | 是否启用景深效果，默认值：false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置景深开关：SetDepthFiethSwitch\r
\r
\`\`\`js\r
//是否启用景深效果，默认值：false\r
fdapi.settings.setDepthFiethSwitch(true);\r
\`\`\`\r
\r
---\r
\r
### \`setDofMode(dofMode, fn)\` {#setDofMode}\r
\r
设置景深对焦距离模式，仅在景深滤镜效果（postProcessEffects=1）下生效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`dofMode\` | \`number\` | 对焦距离模式，取值：0【近距离 0.5km】1【中远距离 2km】2【中远距离 5km】3【远距离 10km】，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置景深对焦距离模式：SetDofMode\r
\r
\`\`\`js\r
// {0|1|2|3} mode - 对焦距离模式，仅在景深滤镜效果（postProcessEffects=1）下生效\r
/*   - \`0\` 近距离（0.5km）\r
*   - \`1\` 中远距离（2km）\r
*   - \`2\` 中远距离（5km）\r
*   - \`3\` 远距离（10km）\r
*   默认值：0\r
*/\r
fdapi.settings.setDofMode(2);\r
\`\`\`\r
\r
---\r
\r
### \`setDroneAssetPath(assetPath, fn)\` {#setDroneAssetPath}\r
\r
无人机漫游模式下，设置自定义的无人机模型\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`assetPath\` | \`string\` | 自定义打包pak文件内的无人机模型路径，可以通过getDroneAssetPath()方法查询获取 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：无人机漫游下设置无人机模型：SetDroneAssetPath\r
\r
\`\`\`js\r
//设置无人机漫游交互模式\r
fdapi.settings.setInteractiveMode(2);\r
//查询已经挂载的自定义人物角色模型\r
let pathArr = await fdapi.settings.getDroneAssetPath();\r
//设置自定义的无人机模型\r
fdapi.settings.setDroneAssetPath('/JC_CustomAssets/UAVLibrary/Exhibition/Drone_A');\r
\`\`\`\r
\r
---\r
\r
### \`setEnableCameraMovingEvent(bEnable, period, fn)\` {#setEnableCameraMovingEvent}\r
\r
设置是否触发CameraMoving事件，CameraMoving事件默认是关闭的，如果需要接收相机移动消息，可以调用此方法\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`bEnable\` | \`boolean\` | 是否开启相机移动事件 |\r
| \`period\` | \`number\` | 可选参数，事件触发的间隔帧数，默认间隔：20帧，即每20帧返回一次事件，注意：值越小事件返回的越快，取值范围：[0~100] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：开启相机事件：SetEnableCameraMovingEvent\r
\r
\`\`\`js\r
//是否开启相机移动事件监听\r
__bEnableCameraMovingEvent = !__bEnableCameraMovingEvent;\r
//相机事件触发的间隔帧数，默认间隔：20帧，即每20帧返回一次事件，注意：值越小事件返回的越快，取值范围：[0~100]\r
let period = 20;\r
fdapi.settings.setEnableCameraMovingEvent(__bEnableCameraMovingEvent, period);\r
\`\`\`\r
\r
---\r
\r
### \`setEnableInteract(bEnable, fn, fn)\` {#setEnableInteract}\r
\r
设置交互开关，禁用后可以通过API设置交互。\r
\r
- 对于Explorer，目前支持启用和禁用鼠标交互；\r
- 对于Cloud，支持启用和禁用键盘、鼠标、触摸三种交互\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`bEnable\` | \`boolean\` | 是否开启鼠标交互 |\r
| \`fn\` | \`function\` | 可选的回调函数。 注意：对于Cloud二次开发，此参数无效。 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置交互开关：SetEnableInteract\r
\r
\`\`\`js\r
__bEnableInteract = !__bEnableInteract;\r
fdapi.settings.setEnableInteract(__bEnableInteract);\r
\`\`\`\r
\r
---\r
\r
### \`setExposureCompensation(exposureCompensation, fn)\` {#setExposureCompensation}\r
\r
设置曝光补偿值\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`exposureCompensation\` | \`number\` | 曝光补偿量，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置曝光补偿值：SetExposureCompensation\r
\r
\`\`\`js\r
//曝光补偿量，默认值：0\r
fdapi.settings.setExposureCompensation(1.5);\r
\`\`\`\r
\r
---\r
\r
### \`setExposureEnabled(exposureEnabled, fn)\` {#setExposureEnabled}\r
\r
设置自动曝光开关\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`exposureEnabled\` | \`boolean\` | 是否启用自动曝光，默认值：false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置自动曝光开关：SetExposureEnabled\r
\r
\`\`\`js\r
//是否启用自动曝光，默认值：false\r
fdapi.settings.setExposureEnabled(true);\r
\`\`\`\r
\r
---\r
\r
### \`setFocalLength(focalLength, fn)\` {#setFocalLength}\r
\r
设置景深焦距\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`focalLength\` | \`number\` | 焦距值（单位：毫米），默认值：10000 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置景深焦距：SetFocalLength\r
\r
\`\`\`js\r
// 焦距值（单位：毫米），默认值：10000\r
fdapi.settings.setFocalLength(5000);\r
\`\`\`\r
\r
---\r
\r
### \`setFovX(fovX, fn)\` {#setFovX}\r
\r
设置水平视场角\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fovX\` | \`number\` | 水平视场角 取值范围：[10~135] 单位：度 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置相机水平视场角：SetFovX\r
\r
\`\`\`js\r
fdapi.settings.setFovX(100);\r
\`\`\`\r
\r
---\r
\r
### \`setGroundHeight(height, fn)\` {#setGroundHeight}\r
\r
设置工程场景的海拔（地面高度）\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`height\` | \`number\` | 工程场景的海拔（地面高度） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置图层服务的高度：SetGroundHeight\r
\r
\`\`\`js\r
fdapi.settings.setGroundHeight(10);\r
\`\`\`\r
\r
---\r
\r
### \`setHighlightColor(color, fn)\` {#setHighlightColor}\r
\r
设置高亮颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置全局高亮的颜色：SetHighlightColor\r
\r
\`\`\`js\r
fdapi.settings.setHighlightColor(Color.Red);\r
\`\`\`\r
\r
---\r
\r
### \`setImageryLayerEnableDecal(receiveDecalMode, fn)\` {#setImageryLayerEnableDecal}\r
\r
设置网络图层服务(WMTS、WMS、MVT等)是否贴合地形或对象\r
\r
**注意：若需要控制单独网络图层的贴合支持，请使用方法： fdapi.tileLayer.enableImageLayerDecal(data);**\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`receiveDecalMode\` | \`number\` | 对象贴合模式，取值：0【无】 1【所有对象】 2【仅地形】，默认值：1 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setImageryLayerEnableDecal(receiveDecalMode);\r
\`\`\`\r
\r
---\r
\r
### \`setImageryLayerLevelOffset(levelOffset, fn)\` {#setImageryLayerLevelOffset}\r
\r
设置网络图层服务的裂分等级的偏移量，如果图层服务当前某处的裂分等级为6级，参数设置为1则当前图层服务的裂分等级增加1变为7级。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`levelOffset\` | \`number\` | 网络图层服务当前某处的裂分等级的偏移量 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置网络图层服务的裂分等级的偏移量：SetImageryLayerLevelOffset\r
\r
\`\`\`js\r
fdapi.settings.setImageryLayerLevelOffset(6);\r
\`\`\`\r
\r
---\r
\r
### \`setInteractiveMode(mode, fn)\` {#setInteractiveMode}\r
\r
设置交互模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`mode\` | \`number\` | 五种交互模式，取值范围：[0,1,2,3,4]，默认值：0；【0：漫游，1：人物，2：无人机，3：中心漫游（物体观察），4：地图】 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置交互模式：SetInteractiveMode\r
\r
\`\`\`js\r
//设置交互模式 【0：漫游，1：人物，2：无人机，3：中心漫游（物体观察），4：地图】\r
if (++__interactiveMode > 2)\r
    __interactiveMode = 0;\r
fdapi.settings.setInteractiveMode(__interactiveMode);\r
\`\`\`\r
\r
---\r
\r
### \`setLabelLayer(name, fn)\` {#setLabelLayer}\r
\r
设置显示对应VTPK的标注\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`name\` | \`string\` | VTPK标注名称，标注名称可以根据getVTPK()查询获取。 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setLabelLayer(name);\r
\`\`\`\r
\r
---\r
\r
### \`setLabelLayerDepthTestHeight(depthTestHeight, fn)\` {#setLabelLayerDepthTestHeight}\r
\r
设置VTPK标注的深度检测的相机高度阈值\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`depthTestHeight\` | \`number\` | 深度检测的相机高度阈值，高于此值不再进行深度检测，标签将不会被遮挡；低于该高度，绘制标签会做深度检测，会有正确的遮挡关系。默认值：2000米，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置VTPK标注的深度检测的相机高度阈值：SetLabelLayerDepthTestHeight\r
\r
\`\`\`js\r
fdapi.settings.setLabelLayerDepthTestHeight(2000);\r
\`\`\`\r
\r
---\r
\r
### \`setLabelLayerLineSpace(lineSpace, fn)\` {#setLabelLayerLineSpace}\r
\r
设置VTPK线性标注的间隔\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`lineSpace\` | \`number\` | 线性标注间隔，单位：米，取值范围：[0~1000]，默认值：250 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置VTPK线性标注间隔：SetLabelLayerLineSpace\r
\r
\`\`\`js\r
fdapi.settings.setLabelLayerLineSpace(300);\r
\`\`\`\r
\r
---\r
\r
### \`setLabelLayerScaleRatio(scale, fn)\` {#setLabelLayerScaleRatio}\r
\r
设置VTPK标注的缩放显示百分比\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`scale\` | \`number\` | VTPK标注的标注缩放显示比例，百分比，取值范围：[0~1000]，默认值：100 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置VTPK标注显示百分比：SetLabelLayerScaleRatio\r
\r
\`\`\`js\r
fdapi.settings.setLabelLayerScaleRatio(200);\r
\`\`\`\r
\r
---\r
\r
### \`setLabelLayerSymbolAvoidance(type, fn)\` {#setLabelLayerSymbolAvoidance}\r
\r
设置VTPK标注符号避让方式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`type\` | \`number\` | 符号避让三种方式，取值范围：[0,1,2]，取值说明：0避让 1堆叠 2使用样式文件 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置VTPK标注符号避让方式：SetLabelLayerSymbolAvoidance\r
\r
\`\`\`js\r
fdapi.settings.setLabelLayerSymbolAvoidance(2);\r
\`\`\`\r
\r
---\r
\r
### \`setLensFlareIntensity(lensFlareIntensity, fn)\` {#setLensFlareIntensity}\r
\r
设置镜头光晕强度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`lensFlareIntensity\` | \`number\` | 光晕强度，取值范围：[0~1.0]，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置镜头光晕强度：SetLensFlareIntensity\r
\r
\`\`\`js\r
//光晕强度，取值范围：[0~1.0]，默认值：0\r
fdapi.settings.setLensFlareIntensity(0.3);\r
\`\`\`\r
\r
---\r
\r
### \`setLutIntensity(lutIntensity, fn)\` {#setLutIntensity}\r
\r
设置 LUT 调色强度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`lutIntensity\` | \`number\` | LUT 调色强度（百分比小数），取值范围：[0~1.0]，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置LUT调色强度：SetLutIntensity\r
\r
\`\`\`js\r
// LUT 调色强度（百分比小数），取值范围：[0~1.0]，默认值：0\r
fdapi.settings.setLutIntensity(0.8);\r
\`\`\`\r
\r
---\r
\r
### \`setLutMode(lutMode, fn)\` {#setLutMode}\r
\r
设置 LUT 调色模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`lutMode\` | \`number\` | LUT 调色预设模式，取值范围：[0~30]，0 表示关闭，1~30 对应不同 LUT 调色效果，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置LUT调色模式：SetLutMode\r
\r
\`\`\`js\r
/** \r
 * LUT 调色预设模式，取值范围：[0~30]    \r
 *   - \`0\` 关闭调色\r
 *   - \`1~30\` 对应不同 LUT 调色效果\r
 *   默认值：0\r
 */\r
fdapi.settings.setLutMode(5);\r
\`\`\`\r
\r
---\r
\r
### \`setMainPanelPos(left, top, fn)\` {#setMainPanelPos}\r
\r
设置左侧资源面板的位置偏移\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`left\` | \`number\` | 左侧资源面板距离视频流左侧屏幕原点像素距离，类似CSS内绝对定位left，注意：如果设置为0则恢复到原始位置。 |\r
| \`top\` | \`number\` | 左侧资源面板距离视频流上方屏幕原点像素距离，类似CSS内绝对定位top，注意：如果设置为0则恢复到原始位置。 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setMainPanelPos(left, top);\r
\`\`\`\r
\r
---\r
\r
### \`setMainUIVisibility(visible, fn)\` {#setMainUIVisibility}\r
\r
设置主界面UI元素的可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`visible\` | \`boolean\` | 主界面UI元素是否可见 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示|隐藏主界面UI：SetMainUIVisibility\r
\r
\`\`\`js\r
__uiVisible = !__uiVisible;\r
fdapi.settings.setMainUIVisibility(__uiVisible);\r
\`\`\`\r
\r
---\r
\r
### \`setMapMode(mode, options, fn)\` {#setMapMode}\r
\r
设置地图样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`mode\` | [\`MapMode\`](/docs/api/types#mapmode) | 地图样式，0：指南针；1：鹰眼图；2：大地图，参见\`MapMode\` 注意：设置大地图模式后，不再支持设置vtpk标注，两者互斥 |\r
| \`options\` | \`object\` | 地图模式相关的参数，目前支持的选项有下面这些（如果某个参数没有设置，会使用默认值）： serviceType: 服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox serviceProvider: 服务提供厂商，1：ArcGIS； 2：GeoServer； 3：SuperMap超图； 4：Mapbox；5：tianditu天地图 coordType: 坐标系类型，0：经纬度；1：本地（默认值是0） mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]） longitude: 经度，取值范围：[0~180]（默认值是0.0） latitude: 纬度，取值范围：[0~90]（默认值是0.0） cache: 缓存路径，字符串地址，（默认值是 ":memory:"） style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"） groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0） renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0） decalMode: 大地图贴地模式下的贴合模式，0：都不接受 1：贴合所有 2：仅贴合地形；默认值：1，注意：此参数仅在renderMode设置为3时生效 serverURL : WMTS服务路径，二维数组，元素说明：index[0]服务id，index[1]服务地址；取值示例：[['111', 'http://192.168.1.29:81'], ['222', 'http://192.168.1.29:82'], ['333', 'http://192.168.1.29:83']] coordOrder: 坐标顺序，0: XY; 1: YX（默认值为0） maxLevel : WMTS服务最大显示层级，取值范围：[0~22]，默认值：10 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置地图模式：SetMapMode\r
\r
\`\`\`js\r
//恢复为指南针模式\r
//fdapi.settings.setMapMode(MapMode.Campass, {});\r
\r
//使用mapbox 设置大地图模式\r
fdapi.settings.setMapMode(MapMode.BigMap, {\r
    'coordType': 0, //坐标系类型，0：经纬度；1：本地（默认值是0）\r
    'serviceType': 4,//服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox\r
    'mapPoint': [492848.00, 2491968.00],//同名点，取值范围：[x,y]，（默认值是[0, 0]）\r
    'longitude': 113.9354020,//经度，取值范围：[0~180]（默认值是0.0）\r
    'latitude': 22.5222660,//纬度，取值范围：[0~90]（默认值是0.0）\r
    'style': 'mapbox://styles/mapbox/streets-v10',//风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）\r
    'coordOrder': 0,//坐标顺序，0: XY; 1: YX（默认值为0）\r
    'cache': ':memory:',//缓存路径，字符串地址，（默认值是 ":memory:"）\r
    'renderMode': 0,//渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）\r
    'groundHeight': 1,//地面高度，取值范围：[0~任意数值]（默认值是0.0）\r
    //'serverURL': []\r
}, () => {\r
    log('设置大地图模式完成');\r
});\r
\`\`\`\r
\r
---\r
\r
### \`setMaxCameraHeight(maxCameraHeight, fn)\` {#setMaxCameraHeight}\r
\r
设置相机的最大观察高度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`maxCameraHeight\` | \`number\` | 最大相机高度，取值范围：[100000~正无穷]，单位：米，默认值：100000米，即100公里 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置相机最大高度：SetMaxCameraHeight\r
\r
\`\`\`js\r
fdapi.settings.setMaxCameraHeight(100000);\r
\`\`\`\r
\r
---\r
\r
### \`setMinCameraHeight(minCameraHeight, fn)\` {#setMinCameraHeight}\r
\r
设置相机的最小观察高度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`minCameraHeight\` | \`number\` | 最小相机高度，取值范围：[-100~正无穷]，单位：米，默认值：-100米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置相机最小高度：SetMinCameraHeight\r
\r
\`\`\`js\r
fdapi.settings.setMinCameraHeight(-5);\r
\`\`\`\r
\r
---\r
\r
### \`setMouseHoverTime(time, fn)\` {#setMouseHoverTime}\r
\r
设置鼠标悬浮事件返回的时间间隔\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`time\` | \`number\` | 鼠标悬浮事件返回的时间间隔，单位：秒，默认值：1s |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置鼠标悬浮事件返回的时间间隔：SetMouseHoverTime\r
\r
\`\`\`js\r
//设置鼠标悬浮事件返回的时间间隔为0.1秒\r
fdapi.settings.setMouseHoverTime(0.1);\r
\`\`\`\r
\r
---\r
\r
### \`setMouseMoveTime(time, fn)\` {#setMouseMoveTime}\r
\r
设置鼠标移动事件返回的时间间隔\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`time\` | \`number\` | 鼠标移动事件返回的时间间隔，单位：秒，默认值：1s |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置鼠标移动事件返回的时间间隔：SetMouseMoveTime\r
\r
\`\`\`js\r
//设置鼠标移动事件返回的时间间隔为0.1秒\r
fdapi.settings.setMouseMoveTime(0.1);\r
\`\`\`\r
\r
---\r
\r
### \`setMousePickMask(mask, fn, fn)\` {#setMousePickMask}\r
\r
设置鼠标拾取功能，目前有三种拾取状态：鼠标左键点击（MouseClick: 0x1)、鼠标移动（MouseMove: 0x2）、鼠标停留（MouseHover: 0x4）     *\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`mask\` | \`number\` | 掩码，请参考\`MousePickMask\` |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
function test_settings_setMousePickMask() {\r
            //此处可以用枚举，也可以直接设置数字，数字含义如下：\r
            //7: click, move, hover: 全开\r
            //0: click, move, hover: 全关\r
            let mask = MousePickMask.MouseClick | MousePickMask.MouseMove | MousePickMask.MouseHover;\r
            fdapi.settings.setMousePickMask(mask);\r
        }\r
\`\`\`\r
\r
> 示例：开启鼠标事件：SetMousePickMask\r
\r
\`\`\`js\r
//此处可以用枚举，也可以直接设置数字，数字含义如下：\r
//7: click, move, hover: 全开 \r
//0: click, move, hover: 全关 \r
\r
//开启鼠标悬浮和移动的监听事件\r
let mask = MousePickMask.MouseMove | MousePickMask.MouseHover;\r
fdapi.settings.setMousePickMask(mask);\r
\r
//设置鼠标悬浮事件返回的时间间隔为0.1秒\r
fdapi.settings.setMouseHoverTime(0.1);\r
//设置鼠标移动事件返回的时间间隔为0.1秒\r
fdapi.settings.setMouseMoveTime(0.1);\r
\`\`\`\r
\r
---\r
\r
### \`setMoveSpeed(speed, fn)\` {#setMoveSpeed}\r
\r
设置交互的默认移动速度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`speed\` | \`number\` | 交互移动速度 取值范围：[0~1.0]，值越大移动速度越快，默认值：0.2 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置交互移动速度：SetMoveSpeed\r
\r
\`\`\`js\r
//设置交互的默认移动速度\r
fdapi.settings.setMoveSpeed(0.2);\r
\`\`\`\r
\r
---\r
\r
### \`setNearClipPlane(nearClipPlane, fn)\` {#setNearClipPlane}\r
\r
设置相机的近裁距离（最近可渲染距离），用于控制相机视野\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`nearClipPlane\` | \`number\` | 近裁距离，取值范围：[0.1~100]，单位：米，默认值：1.0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置相机近裁距离：SetNearClipPlane\r
\r
\`\`\`js\r
fdapi.settings.setNearClipPlane(10);\r
\`\`\`\r
\r
---\r
\r
### \`setOceanColor(color, fn)\` {#setOceanColor}\r
\r
设置海洋颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置全局海洋颜色：SetOceanColor\r
\r
\`\`\`js\r
fdapi.settings.setOceanColor(Color.Blue);\r
\`\`\`\r
\r
---\r
\r
### \`setOsgbGlobalAlpha(osgbGlobalAlpha, fn)\` {#setOsgbGlobalAlpha}\r
\r
设置倾斜摄影全局不透明度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`osgbGlobalAlpha\` | \`number\` | 倾斜摄影模型不透明度，取值范围：[0~1.0]，默认值：1.0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置倾斜摄影全局不透明度：SetOsgbGlobalAlpha\r
\r
\`\`\`js\r
// 倾斜摄影模型不透明度，取值范围：[0~1.0]，默认值：1.0\r
fdapi.settings.setOsgbGlobalAlpha(0.5);\r
\`\`\`\r
\r
---\r
\r
### \`setOsgbGlobalLitStatus(osgbGlobalLitStatus, fn)\` {#setOsgbGlobalLitStatus}\r
\r
设置倾斜摄影是否参与光照计算\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`osgbGlobalLitStatus\` | \`boolean\` | 倾斜摄影模型是否参与全局光照，默认值：false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置倾斜摄影是否参与光照：SetOsgbGlobalLitStatus\r
\r
\`\`\`js\r
// 倾斜摄影模型是否参与全局光照，默认值：false\r
fdapi.settings.setOsgbGlobalLitStatus(true);\r
\`\`\`\r
\r
---\r
\r
### \`setPlayerName(name, size, fn)\` {#setPlayerName}\r
\r
联网模式（会议室）下设置角色漫游和无人机漫游模式时模型上方显示的文字名称\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`name\` | \`string\` | 角色或者无人机上方显示的文字名称 |\r
| \`size\` | \`number\` | 角色或者无人机上方显示的文字尺寸 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：无人机漫游/角色漫游时设置模型上方显示的文字名字：SetPlayerName\r
\r
\`\`\`js\r
//联网模式（会议室）下设置角色漫游和无人机漫游时模型上方显示的文字名称\r
fdapi.settings.setPlayerName("角色名称", 28);\r
\`\`\`\r
\r
---\r
\r
### \`setPostProcessEffects(postProcessEffects, fn)\` {#setPostProcessEffects}\r
\r
设置滤镜后期处理效果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`postProcessEffects\` | \`number\` | 滤镜效果类型，取值：0【无效果】1【景深效果】2【线框效果】3【圆珠笔】4【白框】5【蓝图】6【原色黑边】，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置滤镜后期处理效果：SetPostProcessEffects\r
\r
\`\`\`js\r
/**\r
  *  @param {0|1|2|3|4|5|6} effect - 滤镜效果类型\r
  *   - \`0\` 无效果（默认）\r
  *   - \`1\` 景深效果\r
  *   - \`2\` 线框效果\r
  *   - \`3\` 圆珠笔\r
  *   - \`4\` 白框\r
  *   - \`5\` 蓝图\r
  *   - \`6\` 原色黑边\r
  *   默认值：0\r
  */\r
// 线框效果\r
fdapi.settings.setPostProcessEffects(2);\r
\`\`\`\r
\r
---\r
\r
### \`setPropertiesPanelPos(left, top, fn)\` {#setPropertiesPanelPos}\r
\r
设置图层树上对象的属性面板的屏幕位置偏移\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`left\` | \`number\` | 属性面板距离视频流左侧屏幕原点像素距离，类似CSS内绝对定位left，注意：如果设置为0则恢复到原始位置。 |\r
| \`top\` | \`number\` | 属性面板距离视频流上方屏幕原点像素距离，类似CSS内绝对定位top，注意：如果设置为0则恢复到原始位置。 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setPropertiesPanelPos(left, top);\r
\`\`\`\r
\r
---\r
\r
### \`setReceiveDecalMode(receiveDecalMode, fn)\` {#setReceiveDecalMode}\r
\r
设置对象贴合模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`receiveDecalMode\` | \`number\` | 对象贴合模式，取值：0【无】1【所有对象】2【仅地形】，默认值：1 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置对象贴合模式：SetReceiveDecalMode\r
\r
\`\`\`js\r
/** \r
 * @param {0|1|2} mode - 对象贴合模式\r
 *   - \`0\` 无贴合\r
 *   - \`1\` 所有对象均参与贴合\r
 *   - \`2\` 仅地形参与贴合\r
 *   默认值：1\r
 */\r
fdapi.settings.setReceiveDecalMode(2); // 仅地形\r
\`\`\`\r
\r
---\r
\r
### \`setRenderedCursorVisible(bEnable, fn)\` {#setRenderedCursorVisible}\r
\r
设置多客户端访问时渲染鼠标同步显示\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`bEnable\` | \`boolean\` | 多客户端访问时鼠标是否渲染同步显示，默认值：false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setRenderedCursorVisible(bEnable);\r
\`\`\`\r
\r
---\r
\r
### \`setRoamViewMode(viewMode, fn)\` {#setRoamViewMode}\r
\r
设置角色漫游使用的默认视角，即第三人称或第一人称\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`viewMode\` | \`number\` | 角色漫游采用的视角类型，取值范围：[0,1]，0角色漫游使用第三人称，1角色漫游使用第一人称，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置漫游视角：SetRoamViewModeractiveMode\r
\r
\`\`\`js\r
//0角色漫游使用第三人称，1角色漫游使用第一人称\r
fdapi.settings.setRoamViewMode(1);\r
\`\`\`\r
\r
---\r
\r
### \`setRoleGender(gender, fn)\` {#setRoleGender}\r
\r
设置第三人称交互使用人物角色默认使用的性别\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`gender\` | \`number\` | 第三人称交互是否使用男性角色，取值范围：[0,1]，0女性角色，1男性角色，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置第三人称角色性别：SetRoleGender\r
\r
\`\`\`js\r
//0女性角色，1男性角色\r
fdapi.settings.setRoleGender(1);\r
\`\`\`\r
\r
---\r
\r
### \`setSaturation(saturation, fn)\` {#setSaturation}\r
\r
设置画面饱和度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`saturation\` | \`number\` | 饱和度，取值范围：[0~100]，默认值：10 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置画面饱和度：SetSaturation\r
\r
\`\`\`js\r
// 饱和度，取值范围：[0~100]，默认值：10\r
fdapi.settings.setSaturation(30);\r
\`\`\`\r
\r
---\r
\r
### \`setScreenControlsVisible(visible, fn)\` {#setScreenControlsVisible}\r
\r
当交互模式为人物或无人机模式时，设置屏幕操纵杆UI的可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`visible\` | \`boolean\` | 操纵杆UI元素是否可见 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setScreenControlsVisible(visible);\r
\`\`\`\r
\r
---\r
\r
### \`setScreenPercentage(screenPercentage, fn)\` {#setScreenPercentage}\r
\r
设置屏幕渲染百分比（分辨率缩放）\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`screenPercentage\` | \`number\` | 屏幕渲染分辨率百分比，取值范围：[50~200]，默认值：125 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置屏幕渲染百分比：SetScreenPercentage\r
\r
\`\`\`js\r
// 屏幕渲染分辨率百分比，取值范围：[50~200]，默认值：125 值越高画质越好，性能消耗越大\r
fdapi.settings.setScreenPercentage(100);\r
\`\`\`\r
\r
---\r
\r
### \`setTerrainAlpha(alpha, fn)\` {#setTerrainAlpha}\r
\r
:::caution 已废弃\r
\r
过时方法，推荐setTerrainGlobalAlpha()\r
\r
:::\r
\r
设置地形透明度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`alpha\` | \`number\` | 透明度，取值范围：[0,1] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.setTerrainAlpha(alpha);\r
\`\`\`\r
\r
---\r
\r
### \`setTerrainGlobalAlpha(terrainGlobalAlpha, fn)\` {#setTerrainGlobalAlpha}\r
\r
设置地形全局不透明度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`terrainGlobalAlpha\` | \`number\` | 地形不透明度，取值范围：[0~1.0]，默认值：1.0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置地形全局不透明度：SetTerrainGlobalAlpha\r
\r
\`\`\`js\r
// 地形不透明度，取值范围：[0~1.0]，默认值：1.0  \`0\` 完全透明  \`1\` 完全不透明\r
fdapi.settings.setTerrainGlobalAlpha(0.7);\r
\`\`\`\r
\r
---\r
\r
### \`setTerrainGlobalLitStatus(terrainGlobalLitStatus, fn)\` {#setTerrainGlobalLitStatus}\r
\r
设置地形是否参与光照计算\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`terrainGlobalLitStatus\` | \`boolean\` | 地形是否参与全局光照，默认值：true |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置地形是否参与光照：SetTerrainGlobalLitStatus\r
\r
\`\`\`js\r
//地形是否参与全局光照，默认值：true\r
fdapi.settings.setTerrainGlobalLitStatus(false);\r
\`\`\`\r
\r
---\r
\r
### \`setTonemapper(tonemapper, fn)\` {#setTonemapper}\r
\r
设置色彩优化（Tonemapping）开关\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`tonemapper\` | \`boolean\` | 是否开启色彩优化，默认值：true |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置色彩优化开关：SetTonemapper\r
\r
\`\`\`js\r
//是否开启色彩优化，默认值：true\r
fdapi.settings.setTonemapper(false);\r
\`\`\`\r
\r
---\r
\r
### \`setToolbarVisible(visible, fn)\` {#setToolbarVisible}\r
\r
设置屏幕右侧工具栏的可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`visible\` | \`boolean\` | 屏幕右侧工具栏是否可见 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示|隐藏右侧工具栏：SetToolbarVisible\r
\r
\`\`\`js\r
__toolBarVisible = !__toolBarVisible;\r
fdapi.settings.setToolbarVisible(__toolBarVisible);\r
\`\`\`\r
\r
---\r
\r
### \`setWMTSLayerOpacity(data, fn)\` {#setWMTSLayerOpacity}\r
\r
设置WMTS图层的透明度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`array\` | WMTS图层服务透明度设置，参数类型：二维数组对象，数组元素index[0]：WMTS服务id 字符串id ；数组元素index[1]：不透明度 数值[0~1] ，详细描述如下： id &#123;string&#125; 即WMTS图层服务的id，类型为字符串类型ID opacity &#123;number&#125; 图层服务不透明度，取值范围：[0~1] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
fdapi.settings.setWMTSLayerOpacity([['111', 0.5], ['222', 0.8]]);\r
\`\`\`\r
\r
> 示例：设置WMTS图层的透明度：SetWMTSLayerOpacity\r
\r
\`\`\`js\r
fdapi.settings.setWMTSLayerOpacity([["1", 0.5], ["2", 0.8]]);\r
\`\`\`\r
\r
---\r
\r
### \`setWMTSLayerVisible(data, fn)\` {#setWMTSLayerVisible}\r
\r
设置WMTS图层的可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`array\` | 控制设置地图模式时添加的WMTS网络图层服务，参数类型：二维数组，数组元素index[0]：WMTS服务id 字符串id ；数组元素index[1]：服务是否可见 boolean ；取值示例：[['111', true], ['222', false]]，打开图层服务[111] 关闭图层服务[222] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
fdapi.settings.setWMTSLayerVisible([['111', true], ['222', false]]);\r
\`\`\`\r
\r
> 示例：设置WMTS图层的可见性：SetWMTSLayerVisible\r
\r
\`\`\`js\r
fdapi.settings.setWMTSLayerVisible([["1", false], ["2", true], ["3", false]]);\r
\`\`\`\r
\r
---\r
\r
### \`setYawSpeed(yawSpeed, fn)\` {#setYawSpeed}\r
\r
设置水平视角的默认旋转速度，即按住鼠标右键拖拽水平视角旋转的速度\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`yawSpeed\` | \`number\` | 水平视角的旋转速度 取值范围：[0~1.0]，值越大旋转速度越快，默认值：1.0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置视角旋转速度：SetYawSpeed\r
\r
\`\`\`js\r
//设置水平视角的默认旋转速度，即按住鼠标右键拖拽水平视角旋转的速度\r
fdapi.settings.setYawSpeed(1);\r
\`\`\`\r
\r
---\r
\r
### \`showPropertiesPanel(id, fn)\` {#showPropertiesPanel}\r
\r
显示图层树上对象的属性面板\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 图层树上对象的id |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settings.showPropertiesPanel(id);\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> 显示|隐藏操纵杆UI：SetScreenControlsVisible\r
\r
\`\`\`js\r
__joystickVisible = !__joystickVisible;\r
fdapi.settings.setScreenControlsVisible(__joystickVisible);\r
\`\`\`\r
\r
> 设置资源面板位置偏移：SetMainPanelPos\r
\r
\`\`\`js\r
await fdapi.settings.setMainPanelPos(100, 100);\r
\`\`\`\r
\r
> 显示图层树上对象的属性面板：ShowPropertiesPanel\r
\r
\`\`\`js\r
await fdapi.settings.showPropertiesPanel("3649A68E40EB53793C35EDA9AF7F007F");\r
\`\`\`\r
\r
> 隐藏图层树上对象的属性面板：HidePropertiesPanel\r
\r
\`\`\`js\r
await fdapi.settings.hidePropertiesPanel();\r
\`\`\`\r
\r
> 设置图层树上对象属性面板的位置偏移：SetPropertiesPanelPos\r
\r
\`\`\`js\r
await fdapi.settings.setPropertiesPanelPos(500, 280);\r
\`\`\`\r
\r
> 设置渲染端鼠标显示：SetRenderedCursorVisible\r
\r
\`\`\`js\r
//开启多客户端访问时鼠标同步\r
fdapi.settings.setRenderedCursorVisible(true);\r
\`\`\`\r
\r
> 开启鼠标右键点击拾取：EnableRightClickMousePick\r
\r
\`\`\`js\r
//开启鼠标右键点击拾取\r
fdapi.settings.enableRightClickMousePick(true);\r
\`\`\`\r
\r
> 设置双击鼠标右键是否控制相机自转：SetCameraAutoRotateOnRightDoubleClick\r
\r
\`\`\`js\r
//禁用双击鼠标右键触发相机旋转的默认行为\r
fdapi.settings.setCameraAutoRotateOnRightDoubleClick(false);\r
\`\`\`\r
\r
> 获取所有的VTPK标注：GetLabelLayer\r
\r
\`\`\`js\r
fdapi.settings.getLabelLayer();\r
\`\`\`\r
\r
> 设置当前显示的VTPK标注：SetLabelLayer\r
\r
\`\`\`js\r
let resultArr = await fdapi.settings.getLabelLayer();\r
fdapi.settings.setLabelLayer(resultArr.vtpks[0]);\r
\`\`\`\r
\r
> 移除当前显示的VTPK标注：RemoveLabelLayer\r
\r
\`\`\`js\r
fdapi.settings.removeLabelLayer();\r
\`\`\`\r
\r
> 设置网络图层服务是否贴合地形或对象：SetImageryLayerEnableDecal\r
\r
\`\`\`js\r
fdapi.settings.setImageryLayerEnableDecal(2);\r
\`\`\`\r
\r
> 设置屏幕空间全局光照：SetGlobalIllumination\r
\r
\`\`\`js\r
//是否启用屏幕空间全局光照，默认值：false\r
fdapi.settings.setGlobalIllumination(true);\r
\`\`\`\r
`;export{n as default};
