const n=`---\r
title: SettingsPanel\r
sidebar_label: SettingsPanel\r
description: "SettingsPanel 提供对内置设置面板里各项参数进行读写操作的接口对象。"\r
---\r
\r
# SettingsPanel\r
\r
SettingsPanel 提供对内置设置面板里各项参数进行读写操作的接口对象。\r
\r
通过 \`api.settingsPanel\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：SettingsPanel 提供对内置设置面板里各项参数进行读写操作的接口对象。\r
- **别名 / 不同行业叫法**：设置面板 / 参数面板 / 配置面板（无明显行业别称）。\r
- **适用行业**：通用（各行业项目的场景设置）\r
- **使用场景**：\r
  - 程序化调整画质、特效、显示项\r
  - 按业务预设切换面板参数\r
  - 联动业务流程的场景配置\r
- **注意事项**：\r
  - 面板项随版本/工程而异\r
  - 部分设置为全局影响\r
  - 与 Settings 接口区分（面板 UI vs 参数）\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`getCameraMode\`](#getCameraMode) | 获取参数 相机面板 |  |\r
| [\`getControlMode\`](#getControlMode) | 获取参数 控制面板 |  |\r
| [\`getMapMode\`](#getMapMode) | 获取地图样式 |  |\r
| [\`getPostProcessMode\`](#getPostProcessMode) | 获取参数 后期面板 |  |\r
| [\`getReportMode\`](#getReportMode) | 获取参数 汇报模式面板 |  |\r
| [\`setCameraMode\`](#setCameraMode) | 设置参数 相机面板 |  |\r
| [\`setControlMode\`](#setControlMode) | 设置参数 控制面板 |  |\r
| [\`setMapMode\`](#setMapMode) | 设置地图样式 |  |\r
| [\`setPakFile\`](#setPakFile) | 设置-工程面板自定义资源挂载的pak自定义资源文件 |  |\r
| [\`setPakFolder\`](#setPakFolder) | 设置-工程面板下自定义资源加载的pak自定义资源文件目录 |  |\r
| [\`setPostProcessMode\`](#setPostProcessMode) | 设置参数，后期面板， |  |\r
| [\`setReportMode\`](#setReportMode) | 设置参数 汇报模式面板 |  |\r
\r
## 方法（Methods）\r
\r
### \`getCameraMode(fn)\` {#getCameraMode}\r
\r
获取参数 相机面板\r
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
            "nearClipPlane":	100.000000,//近裁距离\r
            "fovH":	90.000000,             //水平视角\r
            "minCamHeight":	-50.000000,     //最低相机高度\r
            "maxCamHeight": 100000,         //最大相机高度\r
            "darkCorners": 0.2      //暗角\r
        }\r
\`\`\`\r
\r
> 示例：设置面板--获取相机参数：GetCameraMode\r
\r
\`\`\`js\r
fdapi.settingsPanel.getCameraMode();\r
\`\`\`\r
\r
---\r
\r
### \`getControlMode(fn)\` {#getControlMode}\r
\r
获取参数 控制面板\r
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
            "speed":	0.200000,//第一人称移动速度\r
            "yawSpeed":	1.000000,//视角左右旋转速度\r
            "rotateSelf":	1,   //是否开启自由交互右键自传\r
            "useFemale":	0    //是否使用第三人称使用女性角色\r
        }\r
\`\`\`\r
\r
> 示例：设置面板--获取控制参数：GetControlMode\r
\r
\`\`\`js\r
fdapi.settingsPanel.getControlMode();\r
\`\`\`\r
\r
---\r
\r
### \`getMapMode(fn)\` {#getMapMode}\r
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
返回地图样式\r
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
> 示例：设置面板--获取地图模式：GetMapMode\r
\r
\`\`\`js\r
fdapi.settingsPanel.getMapMode();\r
\`\`\`\r
\r
---\r
\r
### \`getPostProcessMode(fn)\` {#getPostProcessMode}\r
\r
获取参数 后期面板\r
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
            "contrast":	10, //对比度\r
            "saturation":	10, //饱和度\r
            "lensFlareIntensity":	0.000000, //光晕强度\r
            "ambientIntensity":	60, //环境光遮罩强度\r
            "bloomIntensity": 0, //泛光\r
            "lutMode": 0,//LUT调色模式\r
            "lutIntensity": 0.5,//LUT调色强度\r
            "screenPercentage":	125, //屏幕百分比\r
            "terrainGlobalAlpha":	1, //地形不透明度\r
            "terrainGlobalLitStatus":	1, //地形是否参与光照\r
            "osgbGlobalLitStatus":	0, //倾斜摄影是否参与光照\r
            "osgbGlobalAlpha": 1,//倾斜摄影不透明度\r
            "antiAliasing":	1, //是否开启反走样\r
            "tonemapper":	1, //是否开启色彩优化\r
            "postProcessEffects":	0, //滤镜效果\r
            "dofMode":	1, //景深效果 对焦距离\r
            "wireThickness":	1, //线框效果 线框大小\r
            "receiveDecalMode":	1 //对象贴合模式\r
            ......\r
        }\r
\`\`\`\r
\r
> 示例：设置面板--获取后期参数：GetPostProcessMode\r
\r
\`\`\`js\r
fdapi.settingsPanel.getPostProcessMode();\r
\`\`\`\r
\r
---\r
\r
### \`getReportMode(fn)\` {#getReportMode}\r
\r
获取参数 汇报模式面板\r
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
            "alignment":1,      //汇报演示窗口位置\r
            "playMode":	1,      //汇报演示播放模式\r
            "moveInOtherView":1 //多视口相机是否联动\r
        }\r
\`\`\`\r
\r
> 示例：设置面板--获取汇报模式：GetReportMode\r
\r
\`\`\`js\r
fdapi.settingsPanel.getReportMode();\r
\`\`\`\r
\r
---\r
\r
### \`setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight, fn)\` {#setCameraMode}\r
\r
设置参数 相机面板\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`nearClipPlane\` | \`number\` | 近裁距离，取值范围：[0.1~100]，单位：米，默认值：1.0 |\r
| \`fovH\` | \`number\` | 水平视角，取值范围：[45~134]，单位：度，默认值：90 |\r
| \`minCameraHeight\` | \`number\` | 最小相机高度，取值范围：[-100~正无穷]，单位：米，默认值：-100米 |\r
| \`maxCameraHeight\` | \`number\` | 最大相机高度，取值范围：[100000~正无穷]，单位：米，默认值：100000米，即100公里 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置面板--设置相机参数：SetCameraMode\r
\r
\`\`\`js\r
/**\r
 * @param {number}  nearClipPlane 近裁距离，取值范围：[0.1~100]，单位：米，默认值：1.0\r
 * @param {number}  fovH          水平视角，取值范围：[45~134]，单位：度，默认值：90\r
 * @param {boolean} minCameraHeight  最小相机高度，取值范围：[-100~正无穷]，单位：米，默认值：-100米\r
 * @param {boolean} maxCameraHeight  最大相机高度，取值范围：[100000~正无穷]，单位：米，默认值：100000米，即100公里\r
 */\r
let nearClipPlane = 10;\r
let fovH = 100;\r
let minCameraHeight = -5;\r
let maxCameraHeight = 100000;\r
fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);\r
\`\`\`\r
\r
---\r
\r
### \`setControlMode(speed, yawSpeed, isRotateSelf, isUseMaleRole, viewType, fn)\` {#setControlMode}\r
\r
设置参数 控制面板\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`speed\` | \`number\` | 第一人称移动速度 取值范围：[0~1.0]，值越大移动速度越快，默认值：0.2 |\r
| \`yawSpeed\` | \`number\` | 视角左右旋转速度 取值范围：[0~1.0]，值越大旋转速度越快，默认值：1.0 |\r
| \`isRotateSelf\` | \`boolean\` | 是否开启自由交互右键自传 取值：true开启，false不开启，默认false |\r
| \`isUseMaleRole\` | \`boolean\` | 第三人称交互是否使用男性角色 取值：true使用男性角色，false使用女性角色，默认false |\r
| \`viewType\` | \`number\` | 角色漫游使用第三人称或第一人称，取值范围：[0,1]，0角色漫游使用第三人称，1角色漫游使用第一人称，默认值：0 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置面板--设置控制参数：SetControlMode\r
\r
\`\`\`js\r
/**\r
 * @param {number}  speed        第一人称移动速度 取值范围：[0~1.0]，值越大移动速度越快，默认值：0.2\r
 * @param {number}  yawSpeed     视角左右旋转速度 取值范围：[0~1.0]，值越大旋转速度越快，默认值：1.0\r
 * @param {boolean} isRotateSelf 是否开启自由交互右键自传 取值：true开启，false不开启，默认false\r
 * @param {boolean} isUseMaleRole  第三人称交互是否使用男性角色 取值：true使用男性角色，false使用女性角色，默认false\r
 * @param {number}  viewType       角色漫游使用第三人称或第一人称，取值范围：[0,1]，0角色漫游使用第三人称，1角色漫游使用第一人称，默认值：0\r
 */\r
fdapi.settingsPanel.setControlMode(0.5, 0.5, true, true, 1);\r
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
| \`options\` | \`object\` | 地图模式相关的参数，目前支持的选项有下面这些（如果某个参数没有设置，会使用默认值）： serviceType: 服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox serviceProvider: 服务提供厂商，1：ArcGIS； 2：GeoServer； 3：SuperMap超图； 4：Mapbox；5：tianditu天地图 coordType: 坐标系类型，0：经纬度；1：本地（默认值是0） mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]） longitude: 经度，取值范围：[0~180]（默认值是0.0） latitude: 纬度，取值范围：[0~90]（默认值是0.0） cache: 缓存路径，字符串地址，（默认值是 ":memory:"） style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"） groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0） renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0） decalMode: 大地图贴地模式下的贴合模式，0：都不接受 1：贴合所有 2：仅贴合地形；默认值：1，注意：此参数仅在renderMode设置为3时生效 serverURL : WMTS风格路径，二维数组，元素说明：index[0]服务id，index[1]服务地址；取值示例：[['111', 'http://192.168.1.29:81'], ['222', 'http://192.168.1.29:82'], ['333', 'http://192.168.1.29:83']] coordOrder: 坐标顺序，0: XY; 1: YX，默认值：0 maxLevel : WMTS服务最大显示层级，取值范围：[0~22]，默认值：10 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置面板--设置地图模式：SetMapMode\r
\r
\`\`\`js\r
fdapi.settingsPanel.setMapMode(MapMode.BigMap, {\r
    //地图模式相关的参数，具体请参考API帮助文档\r
    /**\r
     *  serviceType: 服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox\r
     *  coordType: 坐标系类型，0：经纬度；1：本地（默认值是0）\r
     *  mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]）\r
     *  longitude: 经度，取值范围：[0~180]（默认值是0.0）\r
     *  latitude: 纬度，取值范围：[0~90]（默认值是0.0）\r
     *  cache: 缓存路径，字符串地址，（默认值是 ":memory:"）\r
     *  style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）\r
     *  groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0）\r
     *  renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）\r
     *  serverURL: WMTS风格路径，二维数组，元素说明：index[0]服务id，index[1]服务地址；取值示例：[['server1', 'http://192.168.1.29:81/xxx'], ['server2', 'http://192.168.1.29:82/xxx'], ['server3', 'http://192.168.1.29:83/xxx']]\r
     *  coordOrder: 坐标顺序，0: XY; 1: YX（默认值为0）\r
     *  maxLevel: WMTS服务最大显示层级，取值范围：[0~22]，默认值：10\r
     */\r
    'coordType': 0,\r
    'serviceType': 1,\r
    'mapPoint': [0, 0],\r
    'longitude': 0.0,\r
    'latitude': 0.0,\r
    'cache': ':memory:',\r
    'style': 'http://192.168.1.29:82/B34兴趣点_居名点',\r
    'groundHeight': 10,\r
    'renderMode': 0,\r
    'serverURL': [['1', 'http://192.168.1.29:82'], ['2', 'http://192.168.1.29:82'], ['3', 'http://192.168.1.29:82']],\r
    'coordOrder': 0,\r
    'maxLevel': 10\r
\r
}, () => {\r
    log('设置大地图模式完成');\r
});\r
\`\`\`\r
\r
---\r
\r
### \`setPakFile(pakfilePathArr, fn)\` {#setPakFile}\r
\r
设置-工程面板自定义资源挂载的pak自定义资源文件\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`pakfilePathArr\` | \`string \\| array\` | 要挂载的自定义资源文件路径或路径数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settingsPanel.setPakFile(pakfilePathArr);\r
\`\`\`\r
\r
---\r
\r
### \`setPakFolder(dirArr, fn)\` {#setPakFolder}\r
\r
设置-工程面板下自定义资源加载的pak自定义资源文件目录\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`dirArr\` | \`string \\| array\` | 要加载的自定义资源文件目录或目录数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.settingsPanel.setPakFolder(dirArr);\r
\`\`\`\r
\r
---\r
\r
### \`setPostProcessMode(postProcessOptions, fn)\` {#setPostProcessMode}\r
\r
设置参数，后期面板，注意：支持设置单个参数或同时设置多个参数\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`postProcessOptions\` | \`object\` | 后期面板配置参数对象，支持以下属性 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`postProcessOptions\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`globalIllumination\` | \`-\` | &#123;boolean&#125; 屏幕空间全局光照，默认值：false |\r
| \`tonemapper\` | \`-\` | &#123;boolean&#125; 是否开启色彩优化，默认值：true |\r
| \`contrast\` | \`-\` | &#123;number&#125; 对比度，取值范围：[1~2]，默认值：1 |\r
| \`saturation\` | \`-\` | &#123;number&#125; 饱和度，取值范围：[1~2]，默认值：1 |\r
| \`bloomIntensity\` | \`-\` | &#123;number&#125; 泛光，取值范围：[0~10.0]，默认值：0 |\r
| \`chromaticAberration\` | \`-\` | &#123;number&#125; 透镜色差，取值范围：[0~5]，默认值：0 |\r
| \`ambientIntensity\` | \`-\` | &#123;number&#125; 环境光遮罩强度，取值范围：[0~1]，默认值：0.6 |\r
| \`ambientRadius\` | \`-\` | &#123;number&#125; 环境光遮罩半径，取值范围：[0.1~5]，单位：米，默认值：0.1 |\r
| \`ambientFadeDistance\` | \`-\` | &#123;number&#125; 环境光遮罩淡出距离，取值范围：[0~20000]，单位：米，默认值：12000 |\r
| \`exposureEnabled\` | \`-\` | &#123;boolean&#125; 是否开启自动曝光，默认值：false |\r
| \`exposureCompensation\` | \`-\` | &#123;number&#125; 曝光补偿，取值范围：[0~15]，默认值：0 |\r
| \`lensFlareIntensity\` | \`-\` | &#123;number&#125; 镜头光晕强度 ，取值范围：[0~1.0]，默认值：0 |\r
| \`darkCorner\` | \`-\` | &#123;number&#125; 镜头暗角，取值范围：[0~1]，单位：百分比，默认值：0 |\r
| \`depthFiethSwitch\` | \`-\` | &#123;boolean&#125; 是否开启景深，默认值：false |\r
| \`focalLength\` | \`-\` | &#123;number&#125; 焦距，取值范围：[0~10000]，单位：米，默认值：10000 |\r
| \`aperture\` | \`-\` | &#123;number&#125; 光圈，取值范围：[1~32]，默认值：4 |\r
| \`deepBlur\` | \`-\` | &#123;number&#125; 深度模糊，取值范围：[0~4]，默认值：2 |\r
| \`lutMode\` | \`-\` | &#123;number&#125; LUT调色模式，取值范围：[0~30]，默认值：0（关闭调色模式），1-30对应不同LUT调色效果 |\r
| \`lutIntensity\` | \`-\` | &#123;number&#125; LUT调色强度，类型为百分比，取值范围：[0~1.0]，默认值：0，即小数对应的百分比 |\r
| \`screenPercentage\` | \`-\` | &#123;number&#125; 屏幕百分比，取值范围：[50~200]，默认值：125 |\r
| \`terrainGlobalAlpha\` | \`-\` | &#123;number&#125; 地形不透明度，取值范围：[0~1.0]，默认值：1.0 |\r
| \`terrainGlobalLitStatus\` | \`-\` | &#123;boolean&#125; 地形是否参与光照，默认值：true |\r
| \`osgbGlobalLitStatus\` | \`-\` | &#123;boolean&#125; 倾斜摄影是否参与光照，默认值：false |\r
| \`osgbGlobalAlpha\` | \`-\` | &#123;number&#125; 倾斜摄影不透明度，取值范围：[0~1.0],默认值：1.0 |\r
| \`antiAliasing\` | \`-\` | &#123;boolean&#125; 是否开启反走样，默认值：true |\r
| \`postProcessEffects\` | \`-\` | &#123;number&#125; 特效(滤镜效果)，取值范围：0【默认无效果】 1【景深效果】 2【线框效果】，3【圆珠笔】，4【白框】，5【蓝图】，6【原色黑边】， 默认值：0 |\r
| \`wireThickness\` | \`-\` | &#123;number&#125; 可选参数，仅在线框效果下生效，线框大小，取值范围：[1.0~3.0]，默认值：1.0 |\r
| \`dofMode\` | \`-\` | &#123;number&#125; 可选参数，仅在景深效果下生效，对焦距离，取值：0【近距离0.5km】 1【中远距离2km】 2【中远距离5km】 3【远距离10km】，默认值：0 |\r
| \`receiveDecalMode\` | \`-\` | &#123;number&#125; 对象贴合模式，取值：0【无】 1【所有对象】 2【仅地形】，默认值：1 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置面板--设置后期参数：SetPostProcessMode\r
\r
\`\`\`js\r
//后期配置参数\r
let options1 = {\r
\r
    globalIllumination: false, //屏幕空间全局光照;	\r
    chromaticAberration: 0, //透镜色差;\r
    ambientRadius: 100, //环境光遮罩半径\r
    ambientFadeDistance: 12000, //环境光遮罩淡出距离\r
    exposureEnabled: false,//自动曝光\r
    exposureCompensation: 0, //曝光补偿\r
    depthFiethSwitch: false,//景深开关\r
    focalLength: 10000,//   焦距\r
    aperture: 4,//   光圈\r
    deepBlur: 2,//   深度模糊\r
\r
    contrast: 10,//对比度，取值范围：[0~100]，默认值：10\r
    saturation: 10,//饱和度，取值范围：[0~100]，默认值：10\r
    lensFlareIntensity: 0.5,//光晕强度 ，取值范围：[0~1.0]，默认值：0\r
    ambientIntensity: 60,//环境光遮罩强度，取值范围：[0~100]，默认值：60\r
    bloomIntensity: 0.1,//泛光，取值范围：[0~10.0]，默认值：0\r
    darkCorner: 0.1,//暗角，取值范围：[0~1]，单位：百分比，默认值：0\r
    lutMode: 10,   //   LUT调色模式，取值范围：[0~30]，默认值：0（关闭调色模式），1-30对应不同LUT调色效果\r
    lutIntensity: 0.5, // LUT调色强度，类型为百分比，取值范围：[0~1.0]，默认值：0，即小数对应的百分比\r
    screenPercentage: 50,//屏幕百分比，取值范围：[50~200]，默认值：125\r
    terrainGlobalAlpha: 0.5,//地形不透明度，取值范围：[0~1.0]，默认值：1.0\r
    terrainGlobalLitStatus: false,//地形是否参与光照，默认值：true\r
    osgbGlobalLitStatus: true,//倾斜摄影是否参与光照，默认值：false\r
    osgbGlobalAlpha: 0.8,//倾斜摄影不透明度，取值范围：[0~1.0],默认值：1.0\r
    antiAliasing: false,//是否开启反走样，默认值：true\r
    tonemapper: false,//是否开启色彩优化，默认值：true  \r
    postProcessEffects: 1,//滤镜效果，取值范围：0【默认无效果】 1【景深效果】 2【线框效果】，3【圆珠笔】，4【白框】，5【蓝图】，6【原色黑边】， 默认值：0\r
    dofMode: 1,//可选参数，仅在景深效果下生效，对焦距离，取值：0【近距离0.5km】 1【中远距离2km】 2【中远距离5km】 3【远距离10km】，默认值：0\r
    receiveDecalMode: 0//对象贴合模式，取值：0【无】 1【所有对象】 2【仅地形】，默认值：1\r
};\r
//设置多个参数 滤镜线框效果\r
fdapi.settingsPanel.setPostProcessMode(options1);\r
\r
\r
//支持只设置单个参数 地形不透明度\r
fdapi.settingsPanel.setPostProcessMode({ terrainGlobalAlpha: 0.6 });\r
\`\`\`\r
\r
---\r
\r
### \`setReportMode(showAlign, playMode, isLinkage, fn)\` {#setReportMode}\r
\r
设置参数 汇报模式面板\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`showAlign\` | \`number\` | 汇报演示窗口位置 取值：0【底部】，1【居左】，2【居右】，默认0 |\r
| \`playMode\` | \`number\` | 汇报演示播放模式 取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0 |\r
| \`isLinkage\` | \`boolean\` | 多视口相机是否联动 取值：联动true，不联动false，默认不联动false |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：设置面板--设置汇报模式：SetReportMode\r
\r
\`\`\`js\r
/**\r
 * @param {number}  showAlign 汇报演示窗口位置   取值：0【底部】，1【居左】，2【居右】，默认0\r
 * @param {number}  playMode  汇报演示播放模式   取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0\r
 * @param {boolean} isLinkage 多视口相机是否联动 取值：联动true，不联动false，默认不联动false\r
 */\r
fdapi.settingsPanel.setReportMode(1, 1, true);\r
\`\`\`\r
`;export{n as default};
