const n=`---\r
title: ShapeFileLayer\r
sidebar_label: ShapeFileLayer\r
description: "ShapeFileLayer 加载并管理 Shapefile 矢量数据（点/线/面），在三维场景中按样式渲染与查询。"\r
---\r
\r
# ShapeFileLayer\r
\r
ShapeFileLayer 加载并管理 Shapefile 矢量数据（点/线/面），在三维场景中按样式渲染与查询。\r
\r
通过 \`api.shapeFileLayer\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：ShapeFileLayer 加载并管理 Shapefile 矢量数据（点/线/面），在三维场景中按样式渲染与查询。\r
- **别名 / 不同行业叫法**：SHP 图层 / 矢量图层 / Shapefile 图层 / GIS 矢量数据。\r
- **适用行业**：GIS 与规划、智慧城市、智慧水利、国土、测绘\r
- **使用场景**：\r
  - 行政区划、地块、路网等矢量底图加载\r
  - 专题要素按属性着色与分级\r
  - 矢量数据的空间与属性查询\r
- **注意事项**：\r
  - SHP 需带正确投影(.prj)，坐标系须一致\r
  - 要素量大时需简化或分级显示\r
  - 中文属性注意编码格式（避免乱码）\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个ShapeFileLayer对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的ShapeFileLayer | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个ShapeFileLayer对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`focusFeature\`](#focusFeature) | 定位到ShapeFileLayer的要素区域 |  |\r
| [\`get\`](#get) | 根据ID获取ShapeFileLayer的详细信息 包含模型属性和值 | 查询对象信息，用于业务联动 |\r
| [\`getFeature\`](#getFeature) | 获取ShapeFileLayer内部要素区域的详细信息 |  |\r
| [\`hide\`](#hide) | 隐藏ShapeFileLayer | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有ShapeFileLayer | 一键隐藏全部对象 |\r
| [\`highlightFeature\`](#highlightFeature) | 高亮ShapeFileLayer对象内部的某一块要素区域 |  |\r
| [\`highlightFeatures\`](#highlightFeatures) | 高亮ShapeFileLayer对象内部的多块要素区域 |  |\r
| [\`open\`](#open) | 打开ShapeFileLayer 返回模型包含的所有属性 |  |\r
| [\`show\`](#show) | 显示ShapeFileLayer | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有ShapeFileLayer | 一键显示全部对象 |\r
| [\`unHighlightFeature\`](#unHighlightFeature) | 取消高亮ShapeFileLayer对象内部的某一块要素区域 |  |\r
| [\`unHighlightFeatures\`](#unHighlightFeatures) | 取消高亮ShapeFileLayer对象内部的多块要素区域 |  |\r
| [\`update\`](#update) | 修改一个或多个ShapeFileLayer对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个ShapeFileLayer对象\r
\r
数据类型分三种：Polygon、Polyline、Point,对应不同对象属性\r
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
| \`file\` | \`String\` | ShapeFileLayer的文件路径，支持本地路径和网络路径 |\r
| \`offset\` | \`array\` | 偏移量：[X,Y,Z]，数组元素类型：(number)，默认值[0.000000, 0.000000, 0.000000] |\r
| \`rotation\` | \`array\` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值[0.000000, 0.000000, 0.000000] |\r
| \`defaultColor\` | [\`Color\`](/docs/api/types#color) | 支持四种格式，[取值示例](/docs/tutorials/color) 默认颜色：[0.000000, 0.000000, 1.000000, 1.000000] RGBA |\r
| \`polygonColorFieldName\` | \`String\` | 当type==Polygon时此属性可选，多边形颜色字段 |\r
| \`polygonHeightFieldName\` | \`String\` | 当type==Polygon时此属性可选，多边形高度字段 |\r
| \`polygonGroundHeightFieldName\` | \`String\` | 当type==Polygon时此属性可选，底面高度字段 |\r
| \`polygonTopHeightFieldName\` | \`String\` | 当type==Polygon时此属性可选，顶面高度字段 |\r
| \`polygonStyle\` | \`number\` | 当type==Polygon时此属性可选，多边形样式，共6种，取值范围：[0~5]，分别为 0：体块（半透明） 1：圆点 2：单色 3：体块（纯色）4：纯色（半透明） 5：X光 |\r
| \`polygonDefaultHeight\` | \`number\` | 当type==Polygon时此属性可选，多边形高度，单位米 |\r
| \`cacheAllField\` | \`boolean\` | 当type==Polygon时此属性可选，Polygon支持缓存所有字段，以便于高效动态更新Polygon不同字段的效果，默认值：false，注意：仅在只更新Polygon字段时生效 |\r
| \`polylineDefaultThickness\` | \`number\` | 当type==Polyline时此属性可选，折线宽度，单位米 |\r
| \`pointTextContentFieldName\` | \`String\` | 当type==Point时此属性可选，文本内容（点字段） |\r
| \`pointDisplayMode\` | \`number\` | 当type==Point时此属性可选，显示模式，取值说明如下： |\r
| \`clusterByImage\` | \`boolean\` | 当type==Point时此属性可选，是否按相同图片路径(pointImage)聚合显示 |\r
| \`pointImage\` | \`String\` | 当type==Point时此属性可选，图片路径 |\r
| \`pointContentRange\` | \`number\` | 当type==Point时此属性可选，文本可见距离，单位米 |\r
| \`pointRange\` | \`array\` | 当type==Point时此属性可选，可见距离（米）点坐标：[X,Y] |\r
| \`pointFontColor\` | [\`Color\`](/docs/api/types#color) | 当type==Point时此属性可选，字体颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`pointFontOutlineColor\` | [\`Color\`](/docs/api/types#color) | 当type==Point时此属性可选，字体轮廓颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`pointBackgroundColor\` | [\`Color\`](/docs/api/types#color) | 当type==Point时此属性可选，字体背景颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`pointShowLine\` | \`boolean\` | 当type==Point时此属性可选，是否显示线 默认false |\r
| \`pointOcclusionCull\` | \`boolean\` | 当type==Point时此属性可选，是否参与遮挡 默认true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.clear();\r
// 支持三种数据类型Polygon、Polyline、Point，当前示例为Point类型\r
// 不同数据类型对应对象属性不同，请参考API开发文档\r
// shapeFileLayer对象别名支持shapeFile和shp两种写法，向下兼容5.2/5.1版本 ，示例如下：\r
// fdapi.shapeFile.clear();\r
// fdapi.shp.clear();\r
let point = {\r
    id: "sp1",\r
    file: HostConfig.Path + '/assets/shapefile/point_marker.shp',\r
    pointTextContentFieldName: 'name',//点显示内容字段\r
    pointDisplayMode: 2,\r
    clusterByImage: true,\r
    pointImage: HostConfig.Path + '/locale/zh/images/radiation.png',\r
    pointContentRange: [0, 10000],\r
    pointRange: [0, 10000],\r
    pointFontColor: [0, 0, 0, 1],\r
    pointFontOutlineColor: [1, 1, 1, 1],\r
    pointBackgroundColor: [1, 1, 1, 1],\r
    pointShowLine: false,\r
    pointOcclusionCull: true,\r
    offset: [0, 0, 0],//坐标位置偏移量\r
    rotation: [0, 0, 0],//旋转\r
};\r
await fdapi.shapeFileLayer.add(point);\r
\r
\r
//当前示例为Polyline类型\r
let polyline = {\r
    id: "sp2",\r
    file: HostConfig.Path + '/assets/shapefile/polyline_road.shp', //shp文件路径\r
    polylineDefaultThickness: 5,//线宽\r
    defaultColor: [1, 0, 0, 1],\r
    offset: [0, 0, 0],//坐标位置偏移量\r
    rotation: [0, 0, 0],//旋转\r
};\r
await fdapi.shapeFileLayer.add(polyline);\r
\r
\r
//当前示例为Polygon类型\r
let polygon = {\r
    id: "sp3",\r
    file: HostConfig.Path + '/assets/shapefile/polygon_building.shp', //shp文件路径\r
    polygonColorFieldName: "COLOR",//颜色属性字段\r
    polygonHeightFieldName: 'B_HEIGHT',//高度属性字段\r
    polygonStyle: 0,//多边形样式 样式参考API枚举： PolygonStyle\r
    polygonDefaultHeight: 200.0,//多边形默认高度\r
    defaultColor: [1, 1, 1, 1],//多边形默认颜色\r
    offset: [0, 0, 0],//坐标位置偏移量\r
    rotation: [0, 0, 0],//旋转\r
};\r
await fdapi.shapeFileLayer.add(polygon);\r
fdapi.shapeFileLayer.focus(polygon.id);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的ShapeFileLayer\r
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
fdapi.shapeFileLayer.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个ShapeFileLayer对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的ShapeFileLayer对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.delete(['sp1', 'sp2', 'sp3']);\r
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
| \`ids\` | \`string \\| array\` | ShapeFileLayer对象的ID或者ID数组 |\r
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
fdapi.shapeFileLayer.focus('sp1');\r
\`\`\`\r
\r
---\r
\r
### \`focusFeature(shapeFileLayerId, featureId, distance, flyTime, rotation, fn)\` {#focusFeature}\r
\r
定位到ShapeFileLayer的要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`shapeFileLayerId\` | \`string\` | ShapeFileLayer对象的ID |\r
| \`featureId\` | \`number\` | 要素区域Feature的ID |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：定位ShapeFileLayer内部某个要素区域：FocusFeature\r
\r
\`\`\`js\r
//相机定位\r
fdapi.shapeFileLayer.focusFeature("sp3", 13, 80, 1);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取ShapeFileLayer的详细信息 包含模型属性和值\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的ShapeFileLayer对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回ShapeFileLayer的详细信息\r
{\r
            "id":	"sp1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "type":	"Polygon",\r
            "file":	"G:\\\\TEMP\\\\Explorer\\\\SDK\\\\JS/media/ShapeFileLayer/polygonColor.shp",\r
            "polygonColorFieldName":	"RGB",\r
            "polygonHeightFieldName":	"",\r
            "polygonGroundHeightFieldName":	"",\r
            "polygonTopHeightFieldName":	"",\r
            "polygonStyle":	0,\r
            "polygonDefaultHeight":	200.000000,\r
            "defaultColor":	[0.000000, 0.000000, 1.000000, 1.000000],\r
            "offset":	[0.000000, 0.000000, 0.000000],\r
            "rotation":	[0.000000, 0.000000, 0.000000],\r
            "scale":	[1.000000, 1.000000, 1.000000]\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.get(['sp1', 'sp2', 'sp3']);\r
\`\`\`\r
\r
---\r
\r
### \`getFeature(data, fn)\` {#getFeature}\r
\r
获取ShapeFileLayer内部要素区域的详细信息\r
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
| \`shpId\` | \`string\` | ShapeFileLayer对象的ID |\r
| \`featureIds\` | \`array\` | ShapeFileLayer对象内部的要素区域ID，数组元素类型为number |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
ShapeFileLayer内部要素区域的详细信息\r
	{\r
        "sp1":	{\r
            "29":	{\r
                "Type":	"shapefilelayer",\r
                "Id":	"sp1",\r
                "featureId":	"29",\r
                "height":	200.000000,\r
                "groundHeight":	0.000000,\r
                "Fields":	[{\r
                        "CMColor":	"4294901760"\r
                    }, {\r
                        "SLColor":	"255"\r
                    }, {\r
                        "RGB":	"255,0,0"\r
                    }]\r
            },\r
            "30":	{\r
                "Type":	"shapefilelayer",\r
                "Id":	"sp1",\r
                "featureId":	"30",\r
                "height":	200.000000,\r
                "groundHeight":	0.000000,\r
                "Fields":	[{\r
                        "CMColor":	"4294901760"\r
                    }, {\r
                        "SLColor":	"255"\r
                    }, {\r
                        "RGB":	"255,0,0"\r
                    }]\r
            },\r
            "32":	{\r
                "Type":	"shapefilelayer",\r
                "Id":	"sp1",\r
                "featureId":	"32",\r
                "height":	200.000000,\r
                "groundHeight":	0.000000,\r
                "Fields":	[{\r
                        "CMColor":	"4294901760"\r
                    }, {\r
                        "SLColor":	"255"\r
                    }, {\r
                        "RGB":	"255,0,0"\r
                    }]\r
            }\r
        }\r
    }\r
\`\`\`\r
\r
> 示例：查询ShapeFileLayer内部多个要素区域：GetFeature\r
\r
\`\`\`js\r
//查询单个\r
fdapi.shapeFileLayer.getFeature({ "shpId": "sp3", "featureIds": [12] });\r
//查询多个\r
fdapi.shapeFileLayer.getFeature([{ "shpId": "sp3", "featureIds": [21, 12, 13] }]);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏ShapeFileLayer\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | ShapeFileLayer对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.hide(['sp1', 'sp2', 'sp3']);\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有ShapeFileLayer\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideAll\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`highlightFeature(shapeFileLayerId, featureId, fn)\` {#highlightFeature}\r
\r
高亮ShapeFileLayer对象内部的某一块要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`shapeFileLayerId\` | \`string\` | ShapeFileLayer对象的ID |\r
| \`featureId\` | \`number\` | ShapeFileLayer对象内部的要素区域ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：高亮ShapeFileLayer内部单个要素区域：HighlightFeature\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.highlightFeature('sp3', 13);\r
\`\`\`\r
\r
---\r
\r
### \`highlightFeatures(data, fn)\` {#highlightFeatures}\r
\r
高亮ShapeFileLayer对象内部的多块要素区域\r
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
| \`shapeFileLayerId\` | \`string\` | ShapeFileLayer对象的ID |\r
| \`featureIds\` | \`array\` | ShapeFileLayer对象内部的要素区域ID，数组元素类型为number |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：高亮ShapeFileLayer内部多个要素区域：HighlightFeatures\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.highlightFeatures([{ "shpId": "sp3", "featureIds": [13, 12, 21] }]);\r
\`\`\`\r
\r
---\r
\r
### \`open(data, fn)\` {#open}\r
\r
打开ShapeFileLayer 返回模型包含的所有属性\r
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
| \`file\` | \`string\` | ShapeFileLayer文件的路径 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
返回模型包含的所有属性\r
{ "fieldName":	["CMColor", "SLColor", "RGB"]	}\r
\`\`\`\r
\r
> 示例：Open\r
\r
\`\`\`js\r
let shapeFilePathArr = { 'file': HostConfig.Path + '/assets/shapefile/polygon.shp' };\r
fdapi.shapeFileLayer.open(shapeFilePathArr);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示ShapeFileLayer\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | ShapeFileLayer对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.show(['sp1', 'sp2', 'sp3']);\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有ShapeFileLayer\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowAll\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightFeature(shapeFileLayerId, featureId, fn)\` {#unHighlightFeature}\r
\r
取消高亮ShapeFileLayer对象内部的某一块要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`shapeFileLayerId\` | \`string\` | ShapeFileLayer对象的ID |\r
| \`featureId\` | \`number\` | ShapeFileLayer对象内部的要素区域ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.shapeFileLayer.unHighlightFeature(shapeFileLayerId, featureId);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightFeatures(data, fn)\` {#unHighlightFeatures}\r
\r
取消高亮ShapeFileLayer对象内部的多块要素区域\r
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
| \`shapeFileLayerId\` | \`string\` | ShapeFileLayer对象的ID |\r
| \`featureIds\` | \`array\` | ShapeFileLayer对象内部的要素区域ID，数组元素类型为number |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.shapeFileLayer.unHighlightFeatures(data);\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个ShapeFileLayer对象\r
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
| \`id\` | \`string\` | 根据ShapeFileLayer对象的ID更新以下属性 |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`offset\` | \`array\` | 偏移量：[X,Y,Z]，数组元素类型：(number)，默认值[0.000000, 0.000000, 0.000000] |\r
| \`rotation\` | \`array\` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值[0.000000, 0.000000, 0.000000] |\r
| \`defaultColor\` | [\`Color\`](/docs/api/types#color) | 支持四种格式，[取值示例](/docs/tutorials/color) 默认颜色：[0.000000, 0.000000, 1.000000, 1.000000] RGBA |\r
| \`polygonColorFieldName\` | \`String\` | 当type==Polygon时此属性可选，多边形颜色字段 |\r
| \`polygonHeightFieldName\` | \`String\` | 当type==Polygon时此属性可选，多边形高度字段 |\r
| \`polygonGroundHeightFieldName\` | \`String\` | 当type==Polygon时此属性可选，底面高度字段 |\r
| \`polygonTopHeightFieldName\` | \`String\` | 当type==Polygon时此属性可选，顶面高度字段 |\r
| \`polygonStyle\` | \`number\` | 当type==Polygon时此属性可选，多边形样式，共6种，取值范围：[0~5]，分别为 0：体块（半透明） 1：圆点 2：单色 3：体块（纯色）4：纯色（半透明） 5：X光 |\r
| \`polygonDefaultHeight\` | \`number\` | 当type==Polygon时此属性可选，多边形高度，单位米 |\r
| \`cacheAllField\` | \`boolean\` | 当type==Polygon时此属性可选，Polygon支持缓存所有字段，以便于高效动态更新Polygon不同字段的效果，默认值：false，注意：仅在只更新Polygon字段时生效 |\r
| \`polylineDefaultThickness\` | \`number\` | 当type==Polyline时此属性可选，折线宽度，单位米 |\r
| \`pointTextContentFieldName\` | \`String\` | 当type==Point时此属性可选，文本内容（点字段） |\r
| \`pointDisplayMode\` | \`number\` | 当type==Point时此属性可选，显示模式，取值说明如下： |\r
| \`pointImage\` | \`String\` | 当type==Point时此属性可选，图片路径 |\r
| \`pointContentRange\` | \`number\` | 当type==Point时此属性可选，文本可见距离，单位米 |\r
| \`pointRange\` | \`array\` | 当type==Point时此属性可选，可见距离（米）点坐标：[X,Y] |\r
| \`pointFontColor\` | [\`Color\`](/docs/api/types#color) | 当type==Point时此属性可选，字体颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`pointFontOutlineColor\` | [\`Color\`](/docs/api/types#color) | 当type==Point时此属性可选，字体轮廓颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`pointBackgroundColor\` | [\`Color\`](/docs/api/types#color) | 当type==Point时此属性可选，字体背景颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`pointShowLine\` | \`boolean\` | 当type==Point时此属性可选，是否显示线 默认false |\r
| \`pointOcclusionCull\` | \`boolean\` | 当type==Point时此属性可选，是否参与遮挡 默认true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let obj = {\r
    "id": "sp1",\r
    pointFontColor: [1, 0, 0, 1],\r
    pointFontOutlineColor: [0, 0, 0, 1],\r
    pointBackgroundColor: [0, 0, 0, 1],\r
    pointShowLine: false,\r
};\r
await fdapi.shapeFileLayer.update(obj);\r
fdapi.shapeFileLayer.focus(obj.id);\r
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
await fdapi.shapeFileLayer.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> 取消高亮ShapeFileLayer内部单个要素区域：UnHighlightFeature\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.unHighlightFeature('sp3', 13);\r
\`\`\`\r
\r
> 取消高亮ShapeFileLayer内部多个要素区域：UnHighlightFeatures\r
\r
\`\`\`js\r
fdapi.shapeFileLayer.unHighlightFeatures([{ "shpId": "sp3", "featureIds": [13, 12, 21] }]);\r
\`\`\`\r
`;export{n as default};
