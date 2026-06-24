const n=`---\r
title: Satellite\r
sidebar_label: Satellite\r
description: "Satellite 用于球面坐标系场景中加载与表现卫星对象，支持像素点、缩略图与三维模型的多级可视化（按相机距离切换），并可设置标签文字、姿态旋转，用于卫星在轨与星座的可视化仿真。支持卫星按轨道运动，相机跟随运动，实现卫星运动伴随地球自转的晨昏线效果。支持使用卫星模型的蓝图函数实现打开关闭太阳帆，支持高亮闪烁像素点和缩略图。"\r
---\r
\r
# Satellite\r
\r
Satellite 用于在球面坐标系场景中加载与表现卫星对象，支持像素点、缩略图与三维模型的多级可视化（按相机距离切换），并可设置标签文字、姿态旋转，用于卫星在轨与星座的可视化仿真。支持卫星按轨道运动，相机跟随运动，实现卫星运动伴随地球自转的晨昏线效果。支持使用卫星模型的蓝图函数实现打开关闭太阳帆，支持高亮闪烁像素点和缩略图。\r
\r
通过 \`api.satellite\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Satellite 用于在大尺度空间场景中加载与表现卫星对象，支持像素点、缩略图与三维模型的多级可视化（按相机距离切换），并可设置标签文字、姿态旋转，用于卫星在轨与星座的可视化仿真。\r
- **别名 / 不同行业叫法**：卫星 / 在轨卫星 / 星座 / 遥感卫星 / 空间目标 / 在轨目标。\r
- **适用行业**：国防军事、智慧城市（空天信息）、应急、低空经济、能源。\r
- **使用场景**：\r
  - 卫星星座组网与在轨运行态势的全球尺度可视化展示。\r
  - 遥感/导航卫星过境、覆盖范围与对地观测任务的态势推演。\r
  - 空间目标监视、空天一体作战与应急通信保障的态势呈现。\r
- **注意事项**：\r
  - 卫星位于超大尺度空间，需配合相机模式（如 \`setCameraMode\` 设置 maxCameraHeight 至数十万公里）才能正常观察；\`textRange\`/\`modelRange\`/\`imageVisibleDistance\` 控制不同表现形式的可视距离。\r
  - 缩略图 \`imagePath\` 各分辨率需保持一致；\`coordinate\` 为大数值坐标，注意与坐标系及单位匹配，避免位置异常。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new Satellite()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个Satellite对象 | 向场景批量添加对象 |\r
| [\`addLinkage\`](#addLinkage) | 在两颗卫星之间添加连接线，卫星运动时连接线会跟随同步运动 |  |\r
| [\`callBPFunction\`](#callBPFunction) | 调用卫星模型包含的多个蓝图函数， |  |\r
| [\`clear\`](#clear) | 清空场景中所有的Satellite | 清空全部对象，重置图层 |\r
| [\`clearLinkage\`](#clearLinkage) | 清空场景中所有的卫星连接线 |  |\r
| [\`deleteLinkage\`](#deleteLinkage) | 根据卫星连接线的ID删除连接线 |  |\r
| [\`deleteSatellite\`](#deleteSatellite) | 删除一个或多个卫星模型和其对应的文字标签 |  |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据卫星模型的ID获取卫星的实时位置信息 | 查询对象信息，用于业务联动 |\r
| [\`getBPFunction\`](#getBPFunction) | 根据卫星模型ID查询其包含的蓝图函数信息， |  |\r
| [\`hideModel\`](#hideModel) | 隐藏一个或多个卫星模型 |  |\r
| [\`hideSatellite\`](#hideSatellite) | 隐藏一个或多个卫星模型和其对应的文字标签 |  |\r
| [\`hideText\`](#hideText) | 隐藏一个或多个卫星的文字标签 |  |\r
| [\`highlight\`](#highlight) | 打开指定卫星的缩略图的高亮效果 |  |\r
| [\`setFollow\`](#setFollow) | 设置卫星运动时自动跟随相机 |  |\r
| [\`showModel\`](#showModel) | 显示一个或多个卫星模型 |  |\r
| [\`showSatellite\`](#showSatellite) | 显示一个或多个卫星模型和其对应的文字标签 |  |\r
| [\`showText\`](#showText) | 显示一个或多个卫星的文字标签 |  |\r
| [\`unHighlight\`](#unHighlight) | 取消指定卫星缩略图的高亮效果 |  |\r
| [\`unHighlightAll\`](#unHighlightAll) | 取消所有卫星缩略图的高亮效果 |  |\r
| [\`update\`](#update) | 修改一个或多个Satellite对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
| [\`updateLinkage\`](#updateLinkage) | 更新卫星之间连接线 |  |\r
\r
## 方法（Methods）\r
\r
### \`add(data, textRange, modelRange, imageVisibleDistance, fn)\` {#add}\r
\r
添加一个或多个Satellite对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |\r
| \`textRange\` | \`array\` | 卫星文字的可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |\r
| \`modelRange\` | \`array\` | 卫星模型的可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |\r
| \`imageVisibleDistance\` | \`number\` | 卫星缩略图的可见距离，取值范围: [0~200000000] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 卫星字符串类型的ID |\r
| \`text\` | \`string\` | 卫星标签显示的文字内容 |\r
| \`assetPath\` | \`string\` | 蓝图Actor在UE工程的资源引用目录（相对路径），注意：模型必须是蓝图Actor类，即在使用UE打包pak文件时此自定义对象在UE工程内的相对路径 |\r
| \`coordinate\` | \`array\` | 卫星的坐标位置 |\r
| \`pointSize\` | \`number\` | 卫星像素点的像素尺寸，单位：像素 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 卫星像素点的显示颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`imagePath\` | \`number\` | 可选，卫星缩略图的文件路径，注意：参数配置的各缩略图的分辨率大小必须相同，[资源引入说明](/docs/tutorials/resources) |\r
| \`imageSize\` | \`array\` | 可选，卫星的缩略图尺寸，宽高取值：[width, height]，默认使用图片尺寸 |\r
| \`modelRotation\` | \`array\` | 可选，卫星的旋转姿态，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add(像素点)\r
\r
\`\`\`js\r
//设置最大相机高度maxCameraHeight\r
    let nearClipPlane = 10;\r
    let fovH = 90;\r
    let minCameraHeight = -5;\r
    let maxCameraHeight = 200000000;//20万公里\r
    fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);\r
\r
    //卫星像素颜色数组：蓝绿黄橙红\r
    let colorArr = [\r
        [1, 0, 0, 1],\r
        [1, 0.5, 0, 1],\r
        [1, 1, 0, 1],\r
        [0, 0, 1, 1],\r
        [0, 1, 0, 1],\r
    ];\r
\r
    //生成随机卫星文字名称\r
    function genRandomText() {\r
        // 1. 生成随机五位数（范围：10000 ~ 99999）\r
        const randomFiveNum = Math.floor(Math.random() * 90000 + 10000);\r
\r
        // 2. 定义可选的版本号列表\r
        const versions = ['v1.5', 'v2', 'v2 mini', 'v1.0'];\r
\r
        // 3. 随机选取一个版本号（通过随机索引获取）\r
        const randomVersion = versions[Math.floor(Math.random() * versions.length)];\r
\r
        // 4. 拼接字符串：五位数 + 换行符(\\n) + 随机版本号\r
        const result = \`* \${randomFiveNum}\\r\${randomVersion}\`;\r
\r
        return result;\r
    }\r
\r
    fdapi.satellite.clear();\r
    //模拟10000个卫星\r
    let count = 10000;\r
    //关闭日志自动输出\r
    document.getElementById("closeLog").checked = false;\r
\r
    let satelliteArr = [];\r
    let coordinatArr = [];\r
    for (let i = 0; i < count; i++) {\r
        //随机全球范围 -180~180\r
        let lon = (Math.random() * 2.0 - 1.0) * 180;\r
        //南极不出现卫星 -85~85\r
        let lat = (Math.random() * 2.0 - 1.0) * 85;\r
        let h = 1000000+ Math.random() * 1000000\r
        let coord = [lon, lat, h];\r
        coordinatArr.push(coord);\r
        //随机五种颜色其中的一种\r
        let colorIndex = Math.floor(Math.random() * 5 + 1) - 1;\r
        let satellite = {\r
            "id": i+"",\r
            "text": genRandomText(),//卫星显示的文字\r
           "assetPath": "/JC_CustomAssets/ObjectLibrary/Exhibition/卫星/Satellite_2",//卫星模型资源路径\r
		 //   "assetPath": "/SatelliteSystem/Object",\r
            "coordinate": coord,\r
            "pointSize": 12, //卫星圆点像素大小\r
            "color": colorArr[colorIndex], //卫星圆点像素颜色 随机使用五种颜色其中的一种\r
		    "modelRotation":[0,coord[0],0]//卫星模型旋转 需要再传，不需要不传，节省性能\r
        };\r
        satelliteArr.push(satellite);\r
    }\r
\r
\r
    //参数说明：卫星对象数组、卫星文字可见范围、卫星模型可见范围、卫星缩略图的最大可见距离\r
    fdapi.satellite.add(satelliteArr, [0, 500000], [0, 10000], 1000000);\r
\r
    let index = 0;\r
    let timer = setInterval(function () {\r
        if (index < 60) {\r
            for (let i = 0; i < count; i++) {\r
                //卫星模型位置\r
                coordinatArr[i][0] += ((Math.random() * 2.0 - 1.0) * 0.6);\r
                coordinatArr[i][1] += ((Math.random() * 2.0 - 1.0) * 0.6);\r
                coordinatArr[i][2] = satelliteArr[i].coordinate[2]\r
                satelliteArr[i].coordinate = coordinatArr[i];\r
                //卫星模型旋转\r
			    satelliteArr[i].modelRotation[0] = Math.random()*50\r
			    satelliteArr[i].modelRotation[1] = Math.random()*50\r
            }\r
            fdapi.satellite.update(satelliteArr, 1);\r
            index++;\r
        }\r
        else {\r
            clearInterval(timer);\r
        }\r
    }, 1000);\r
\`\`\`\r
\r
> 示例：Add(缩略图)\r
\r
\`\`\`js\r
//设置最大相机高度maxCameraHeight\r
let nearClipPlane = 10;\r
let fovH = 90;\r
let minCameraHeight = -5;\r
let maxCameraHeight = 200000000;//20万公里\r
fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);\r
\r
//卫星像素颜色数组：蓝绿黄橙红\r
let colorArr = [\r
    [1, 0, 0, 1],\r
    [1, 0.5, 0, 1],\r
    [1, 1, 0, 1],\r
    [0, 0, 1, 1],\r
    [0, 1, 0, 1],\r
];\r
\r
//生成随机卫星文字名称\r
function genRandomText() {\r
    // 1. 生成随机五位数（范围：10000 ~ 99999）\r
    const randomFiveNum = Math.floor(Math.random() * 90000 + 10000);\r
\r
    // 2. 定义可选的版本号列表\r
    const versions = ['v1.5', 'v2', 'v2 mini', 'v1.0'];\r
\r
    // 3. 随机选取一个版本号（通过随机索引获取）\r
    const randomVersion = versions[Math.floor(Math.random() * versions.length)];\r
\r
    // 4. 拼接字符串：五位数 + 换行符(\\n) + 随机版本号\r
    const result = \`* \${randomFiveNum}\\r\${randomVersion}\`;\r
\r
    return result;\r
}\r
\r
fdapi.satellite.clear();\r
//模拟1000个卫星\r
let count = 1000;\r
\r
//注意：各缩略图的分辨率需保证一致\r
let path = HostConfig.Path + '/locale/zh/images/';\r
let thumbnailPathArr = [path+"acp.png",path+"antennaPattern.png"];\r
\r
let satelliteArr = [];\r
let coordinatArr = [];\r
for (let i = 0; i < count; i++) {\r
    //随机全球范围 -180~180\r
    let lon = (Math.random() * 2.0 - 1.0) * 180;\r
    //南极不出现卫星 -85~85\r
    let lat = (Math.random() * 2.0 - 1.0) * 85;\r
    let h = 1000000 + (Math.random() * 1000000);//模拟低轨卫星高度\r
    let coord = [lon, lat, h];\r
    coordinatArr.push(coord);\r
    //随机五种颜色其中的一种\r
    let colorIndex = Math.floor(Math.random() * 5 + 1) - 1;\r
    let satellite = {\r
        "id": "" + i,\r
        "text": genRandomText(),//卫星显示的文字\r
        "assetPath": "/JC_CustomAssets/ObjectLibrary/Exhibition/卫星/Satellite_1",//卫星模型资源路径\r
        "coordinate": coord,\r
        "pointSize": 16, //卫星圆点像素大小\r
        "color": colorArr[colorIndex], //卫星圆点像素颜色 随机使用五种颜色其中的一种\r
        "imagePath": thumbnailPathArr[(Math.random()>0.5?0:1)],//卫星缩略图文件路径 随机thumbnailPathArr[]数组内的路径\r
        "imageSize": [48,48],//卫星缩略图尺寸\r
    };\r
    satelliteArr.push(satellite);\r
}\r
\r
\r
//参数说明：卫星对象数组、卫星文字可见范围、卫星模型可见范围、卫星缩略图的最大可见距离\r
fdapi.satellite.add(satelliteArr, [0, 500000], [0, 10000], 1000000);\r
\r
let index = 0;\r
let timer = setInterval(function () {\r
    if (index < 60) {\r
        for (let i = 0; i < count; i++) {\r
            coordinatArr[i][0] += ((Math.random() * 2.0 - 1.0) * 0.8);\r
            coordinatArr[i][1] += ((Math.random() * 2.0 - 1.0) * 0.8);\r
            coordinatArr[i][2] = satelliteArr[i].coordinate[2]\r
            satelliteArr[i].coordinate = coordinatArr[i];\r
        }\r
        fdapi.satellite.update(satelliteArr, 1);\r
        index++;\r
    }\r
    else {\r
        clearInterval(timer);\r
    }\r
}, 1000);\r
\`\`\`\r
\r
---\r
\r
### \`addLinkage(data, materials, fn)\` {#addLinkage}\r
\r
在两颗卫星之间添加连接线，卫星运动时连接线会跟随同步运动\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 卫星连接线的关系配置对象或数组，支持批量添加连接线，每个对象包含以下属性： |\r
| \`materials\` | \`array \\| object\` | 卫星连接线使用的所有材质信息数组，每个材质对象包含以下参数： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 卫星连接线的字符串类型的ID |\r
| \`material\` | \`string\` | 卫星连接线样式使用的材质路径，注意：材质路径需要在materials数组内存在 |\r
| \`startId\` | \`string\` | 卫星连接线起始点绑定的卫星ID |\r
| \`endId\` | \`string\` | 卫星连接线结束点绑定的卫星ID |\r
| \`thickness\` | \`number\` | 卫星连接线的线宽，单位：米，默认值：5 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 卫星连接线的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
\r
> **\`materials\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`material\` | \`string\` | 卫星连接线样式使用的材质路径，注意：材质路径需要在materials数组内存在 |\r
| \`scalarParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |\r
| \`vectorParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：AddLinkage(连接线)\r
\r
\`\`\`js\r
fdapi.satellite.clearLinkage();\r
let linkArr = []\r
for (let i = 0; i < 500; i++) {\r
    let linkage = {\r
        "id": "linkage_" + i,\r
        //"material": "/ScreenSpacePolyline/Material/Track_1",\r
        //"material": "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_3",\r
        "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",\r
        "startId": "" + i,\r
        "endId": "" + (i + 1),\r
        "thickness": 16,\r
        "color": [0, 1, 0, 1]\r
    }\r
    linkArr.push(linkage);\r
}\r
await fdapi.satellite.addLinkage(linkArr,[{\r
        "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",\r
        "scalarParameters": [\r
            {"paramName": "RepeatPx","paramValue": 128},\r
            {"paramName": "Speed","paramValue": 0.5},\r
            {"paramName": "Brightness","paramValue": 5},\r
            {"paramName": "PointBrightness","paramValue": 10}\r
        ],\r
        "vectorParameters": [\r
            {"paramName": "debug","paramValue": [0.1,0.2,0.3,0.4]}\r
        ],\r
}]);\r
\`\`\`\r
\r
---\r
\r
### \`callBPFunction(data, fn)\` {#callBPFunction}\r
\r
调用卫星模型包含的多个蓝图函数，注意：调用前请使用getBPFunction()函数来查询当前卫星模型包含的蓝图函数参数信息\r
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
| \`id\` | \`string\` | 卫星对象的ID |\r
| \`functionName\` | \`string\` | 蓝图函数名 |\r
| \`parameters\` | \`array\` | 蓝图函数包含的多个参数，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
蓝图函数调用示例代码 注意：被调用函数传入的参数类型、参数顺序都必须和蓝图函数的参数类型、顺序完全保持一致！\r
     fdapi.satellite.callBPFunction([\r
            {\r
                id: 'satellite_1',\r
                functionName: '打开太阳能电池板',\r
                parameters: [\r
                    { "paramType": 0, "paramValue": 1 }\r
                ]\r
            },\r
            {\r
                id: 'satellite_2',\r
                functionName: '关闭太阳能电池板',\r
                parameters: [\r
                    { "paramType": 0, "paramValue": 0 }\r
                ]\r
            }\r
        ]);\r
\`\`\`\r
\r
> 示例：CallBPFunction\r
\r
\`\`\`js\r
let bpFunctionArr = [{\r
        "id": "500",\r
        "functionName": "Scale",\r
        "parameters": [{ "paramType": 3, "paramValue": 2 }]\r
    }];\r
//把卫星模型缩放2倍\r
fdapi.satellite.callBPFunction(bpFunctionArr);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的Satellite\r
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
fdapi.satellite.clear();\r
\`\`\`\r
\r
---\r
\r
### \`clearLinkage(fn)\` {#clearLinkage}\r
\r
清空场景中所有的卫星连接线\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ClearLinkage(连接线)\r
\r
\`\`\`js\r
fdapi.satellite.clearLinkage();\r
\`\`\`\r
\r
---\r
\r
### \`deleteLinkage(ids, fn)\` {#deleteLinkage}\r
\r
根据卫星连接线的ID删除连接线\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的卫星的ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：DeleteLinkage(连接线)\r
\r
\`\`\`js\r
fdapi.satellite.deleteLinkage(["linkage_1","linkage_2","linkage_3"]);\r
\`\`\`\r
\r
---\r
\r
### \`deleteSatellite(ids, fn)\` {#deleteSatellite}\r
\r
删除一个或多个卫星模型和其对应的文字标签\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Satellite对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：DeleteSatellite\r
\r
\`\`\`js\r
fdapi.satellite.deleteSatellite(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`focus(ids, distance, flyTime, pitch, yaw, sensitivity, offset, fn)\` {#focus}\r
\r
自动定位到合适的观察距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 卫星对象的ID或者ID数组 |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以用来模拟内部观察视角 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`pitch\` | \`number\` | 可选参数，相机旋转的Pitch，取值范围：[-90~90] |\r
| \`yaw\` | \`number\` | 可选参数，相机旋转的Yaw，取值范围： [-180~180] |\r
| \`sensitivity\` | \`number\` | 可选参数，卫星灵敏度，取值范围： [0~1] |\r
| \`offset\` | \`array\` | 可选参数，跟随后卫星观察视角的偏移量，单位：米，默认值：[0,0,0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Focus\r
\r
\`\`\`js\r
fdapi.satellite.focus(["500"], 20, 0, -29, -30);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据卫星模型的ID获取卫星的实时位置信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的卫星的ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.satellite.get(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`getBPFunction(ids, fn)\` {#getBPFunction}\r
\r
根据卫星模型ID查询其包含的蓝图函数信息，注意：支持批量查询\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 卫星对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：GetBPFunction\r
\r
\`\`\`js\r
fdapi.satellite.getBPFunction(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`hideModel(ids, fn)\` {#hideModel}\r
\r
隐藏一个或多个卫星模型\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Satellite对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideModel\r
\r
\`\`\`js\r
fdapi.satellite.hideModel(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`hideSatellite(ids, fn)\` {#hideSatellite}\r
\r
隐藏一个或多个卫星模型和其对应的文字标签\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Satellite对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideSatellite\r
\r
\`\`\`js\r
fdapi.satellite.hideSatellite(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`hideText(ids, fn)\` {#hideText}\r
\r
隐藏一个或多个卫星的文字标签\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Satellite对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideText\r
\r
\`\`\`js\r
fdapi.satellite.hideText(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`highlight(ids, speed, scaleRange, alphaRange, intensityRange, fn)\` {#highlight}\r
\r
打开指定卫星的缩略图的高亮效果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 必选，卫星ID或ID数组 |\r
| \`speed\` | \`number\` | 可选，卫星缩略图高亮动画的频率 |\r
| \`scaleRange\` | \`number\` | 可选，卫星缩略图大小渐变的区间范围，取值示例：[minScale, maxScale] |\r
| \`alphaRange\` | \`number\` | 可选，卫星缩略图透明渐变的区间范围，取值示例：[minAlpha, maxAlpah] |\r
| \`intensityRange\` | \`number\` | 可选，卫星缩略图亮度渐变的区间范围，取值示例：[minIntensity, maxIntensity] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Highlight(缩略图)\r
\r
\`\`\`js\r
//高亮100个卫星\r
let count = 100;\r
let idsArr = [];\r
for (let i = 0; i < count; i++) {\r
    idsArr.push(i + "");\r
}\r
fdapi.satellite.highlight(idsArr, 2, [0.5, 2], [0.5, 1], [0.5, 3]);\r
\`\`\`\r
\r
---\r
\r
### \`setFollow(ids, distance, pitch, yaw, fn)\` {#setFollow}\r
\r
设置卫星运动时自动跟随相机\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 卫星对象的ID或者ID数组 |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以模拟卫星观察视角 |\r
| \`pitch\` | \`number\` | 可选参数，相机旋转的Pitch，取值范围：[-90~90] |\r
| \`yaw\` | \`number\` | 可选参数，相机旋转的Yaw，取值范围： [-180~180] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetFollow\r
\r
\`\`\`js\r
//跟随卫星模型 跟随不支持flyTime \r
fdapi.satellite.setFollow(["500"], 20, -29, -30);\r
\`\`\`\r
\r
---\r
\r
### \`showModel(ids, fn)\` {#showModel}\r
\r
显示一个或多个卫星模型\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Satellite对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowModel\r
\r
\`\`\`js\r
fdapi.satellite.showModel(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`showSatellite(ids, fn)\` {#showSatellite}\r
\r
显示一个或多个卫星模型和其对应的文字标签\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Satellite对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowSatellite\r
\r
\`\`\`js\r
fdapi.satellite.showSatellite(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`showText(ids, fn)\` {#showText}\r
\r
显示一个或多个卫星的文字标签\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | Satellite对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowText\r
\r
\`\`\`js\r
fdapi.satellite.showText(["500","501","502"]);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlight(ids, fn)\` {#unHighlight}\r
\r
取消指定卫星缩略图的高亮效果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 卫星ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：UnHighlight(缩略图)\r
\r
\`\`\`js\r
//取消高亮88个卫星\r
let count = 88;\r
let idsArr = [];\r
for (let i = 0; i < count; i++) {\r
    idsArr.push(i + "");\r
}\r
fdapi.satellite.unHighlight(idsArr);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightAll(ids, fn)\` {#unHighlightAll}\r
\r
取消所有卫星缩略图的高亮效果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 卫星ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：UnHighlightAll(缩略图)\r
\r
\`\`\`js\r
//全部取消高亮\r
fdapi.satellite.unHighlightAll();\r
\`\`\`\r
\r
---\r
\r
### \`update(data, duration, fn)\` {#update}\r
\r
修改一个或多个Satellite对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 数据结构，请参考add方法 |\r
| \`duration\` | \`number\` | 更新持续时间 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.coastline.update(data, duration);\r
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
await fdapi.coastline.updateEnd();\r
\`\`\`\r
\r
---\r
\r
### \`updateLinkage(data, materials, fn)\` {#updateLinkage}\r
\r
更新卫星之间连接线\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 卫星连接线的关系配置对象或数组，支持批量添加连接线，每个对象包含以下属性： |\r
| \`materials\` | \`array \\| object\` | 卫星连接线使用的所有材质信息数组，每个材质对象包含以下参数： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 卫星连接线的字符串类型的ID |\r
| \`material\` | \`string\` | 卫星连接线样式使用的材质路径，注意：材质路径需要在materials数组内存在 |\r
| \`startId\` | \`string\` | 卫星连接线起始点绑定的卫星ID |\r
| \`endId\` | \`string\` | 卫星连接线结束点绑定的卫星ID |\r
| \`thickness\` | \`number\` | 卫星连接线的线宽，单位：米，默认值：5 |\r
| \`color\` | [\`Color\`](/docs/api/types#color) | 卫星连接线的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
\r
> **\`materials\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`material\` | \`string\` | 卫星连接线样式使用的材质路径，注意：材质路径需要在materials数组内存在 |\r
| \`scalarParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |\r
| \`vectorParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：UpdateLinkage(连接线)\r
\r
\`\`\`js\r
let linkArr = []\r
for (let i = 0; i < 500; i++) {\r
    let linkage = {\r
        "id": "linkage_" + i,\r
        "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",\r
        "thickness": 20,\r
        "color": [1, 1, 0, 1]\r
    }\r
    linkArr.push(linkage);\r
}\r
await fdapi.satellite.updateLinkage(linkArr,[{\r
        "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",\r
        "scalarParameters": [\r
            {"paramName": "RepeatPx","paramValue": 128},\r
            {"paramName": "Speed","paramValue": 0.5},\r
            {"paramName": "Brightness","paramValue": 5},\r
            {"paramName": "PointBrightness","paramValue": 10}\r
        ],\r
        "vectorParameters": [\r
            {"paramName": "debug","paramValue": [0.1,0.2,0.3,0.4]}\r
        ],\r
}]);\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> CancelFollow\r
\r
\`\`\`js\r
fdapi.camera.cancelFollow();\r
\`\`\`\r
`;export{n as default};
