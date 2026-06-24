const r=`---\r
title: FiniteElement2\r
sidebar_label: FiniteElement2\r
description: "FiniteElement2 是有限元仿真对象（增强版），在结果云图基础上支持更复杂/大规模的有限元仿真过程与动态演示。"\r
---\r
\r
# FiniteElement2\r
\r
FiniteElement2有限元仿真对象，实现对有限元仿真对象的操作\r
\r
通过 \`api.finiteElement2\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：FiniteElement2 是有限元仿真对象（增强版），在结果云图基础上支持更复杂/大规模的有限元仿真过程与动态演示。\r
- **别名 / 不同行业叫法**：有限元仿真 / FEM(增强) / 结构动态仿真 / 形变演示 / CAE 仿真可视化。\r
- **适用行业**：土木工程、水利水电、桥梁隧道、机械与装备、能源电力\r
- **使用场景**：\r
  - 复杂结构在时序荷载下的动态仿真演示\r
  - 大规模有限元结果的云图与形变可视化\r
  - 多工况对比与安全评估\r
- **注意事项**：\r
  - 相比 FiniteElement 数据与计算量更大，更需 LOD 与分级加载\r
  - 时序结果需统一时间基准\r
  - 色带/量纲映射与坐标对齐须正确\r
\r
\r
## 构造函数\r
\r
\`\`\`js\r
new FiniteElement2()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 根据VTK文件添加一个或多个有限元仿真对象 | 向场景批量添加对象 |\r
| [\`applyBoxClipFilter\`](#applyBoxClipFilter) | 盒子过滤器 |  |\r
| [\`applyContourFilter\`](#applyContourFilter) | 根据等值线对应的数值添加过滤器并展示过滤后的有限元模型分析结果 |  |\r
| [\`applyCylinderClipFilter\`](#applyCylinderClipFilter) | 圆柱过滤器 |  |\r
| [\`applyPlaneClipFilter\`](#applyPlaneClipFilter) | 切面过滤器 |  |\r
| [\`applySphereClipFilter\`](#applySphereClipFilter) | 球型过滤器 |  |\r
| [\`applyThresholdFilter\`](#applyThresholdFilter) | 根据模型属性字段对应的区间值添加过滤器并展示过滤后的有限元模型分析结果 |  |\r
| [\`clear\`](#clear) | 清空场景中所有的有限元仿真对象 | 清空全部对象，重置图层 |\r
| [\`clearFilter\`](#clearFilter) | 清空指定的有限元模型对象添加的所有过滤器 |  |\r
| [\`delete\`](#delete) | 删除一个或多个有限元仿真对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据有限元分析ID获取有限元分析的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏有限元分析 | 按业务条件隐藏对象 |\r
| [\`removeFilter\`](#removeFilter) | 移除指定的有限元模型对象添加的相关过滤器 |  |\r
| [\`show\`](#show) | 显示有限元分析 | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个有限元仿真对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
根据VTK文件添加一个或多个有限元仿真对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象的数据结构，可以是Object类型或者Array类型，对于每一个FiniteElement2对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元仿真对象的唯一标识符ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`filePath\` | \`string\` | 必选，包含有限元仿真对象数据的VTK文件路径，取值示例：D:/xxx.vtk |\r
| \`location\` | \`array\` | 有限元仿真对象位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`rotation\` | \`array\` | 有限元仿真对象旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
| \`collision\` | \`boolean\` | 有限元仿真对象创建后是否开启碰撞，默认：true |\r
| \`showMesh\` | \`boolean\` | 是否显示有限元仿真模型，默认值：true |\r
| \`edge\` | \`object\` | 网格线边框样式对象，包含以下参数： |\r
| \`edge.type\` | \`number\` | 线框样式，取值范围：[0,1,2]，0：隐藏 1：网格线 2：特征线 |\r
| \`edge.featureAngel\` | \`number\` | 特征性二面角 |\r
| \`edge.color\` | \`string\` | 可选，线框颜色，默认值：[0.1, 0,1, 0.1, 1]，[取值示例](/docs/tutorials/color) |\r
| \`pointField\` | \`object\` | 设置有限元仿真对象的点属性字段，包含以下参数： |\r
| \`pointField.field\` | \`string\` | 可选，属性字段名称 |\r
| \`pointField.component\` | \`string\` | 可选，属性字段对应的分量名称 |\r
| \`arrow\` | \`object\` | 设置有限元仿真对象的箭头效果，包含以下参数： |\r
| \`arrow.vectorField\` | \`string\` | 使用此属性字段名称对应的值符号化显示箭头 |\r
| \`arrow.lengthScale\` | \`number\` | 可选，箭头长度缩放值 |\r
| \`arrow.sizeScale\` | \`number\` | 可选，箭头尺寸 |\r
| \`arrow.colorField\` | \`string\` | 颜色属性字段名称 |\r
| \`arrow.colorComponent\` | \`string\` | 颜色属性字段对应的分量名称 |\r
| \`colors\` | \`object\` | 有限元仿真对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
对象结构示例：\r
\r
let fe2 = {\r
            "id":"fe_2",\r
            "filePath":"C:/HHKBZ.vtk",\r
            "location":[2209.658125,22.4936328125,8.699999389648437],\r
            "rotation":[0,0,0],\r
            "collision":true,\r
            "showMesh": true,\r
            "edge": {\r
                "type": 1,\r
                "featureAngel": 30,\r
                "color": [0.1, 0,1, 0.1, 1]\r
            },\r
            "pointField":{\r
                "field":"U",\r
                "component": "XY"\r
            },\r
            "arrow":{\r
                "vectorField":"stress",\r
                "lengthScale": 1000,\r
                "sizeScale":   1000,\r
                "colorComponent": "XY"\r
            },\r
            "colors":\r
            {\r
                "colorStops":[\r
                    {\r
                        "value":0,\r
                        "color":[0.231373,0.298039,0.752941,1]\r
                    },\r
                    {\r
                        "value":0.5,\r
                        "color":[0.865,0.865,0.865,1]\r
                    },\r
                    {\r
                        "value":1,\r
                        "color":[0.705882,0.015686,0.14902,1]\r
                    }\r
                ]\r
            }\r
        };\r
\`\`\`\r
\r
> 示例：Add(Arrow)\r
\r
\`\`\`js\r
let min = 2.80;\r
let max = 4.12;\r
let diff = (max - min) / 10;\r
let colorStops = [\r
    {\r
        "value": min,\r
        "color": [0, 0, 1, 1]\r
    },\r
    {\r
        "value": min + diff,\r
        "color": [0, 93 / 255, 1, 1]\r
    }, {\r
        "value": min + diff * 2,\r
        "color": [0, 185 / 255, 1, 1]\r
    }, {\r
        "value": min + diff * 3,\r
        "color": [0, 1, 232 / 255, 1]\r
    }, {\r
        "value": min + diff * 4,\r
        "color": [0, 1, 139 / 255, 1]\r
    }, {\r
        "value": min + diff * 5,\r
        "color": [0, 1, 46 / 255, 1]\r
    }, {\r
        "value": min + diff * 6,\r
        "color": [139 / 255, 1, 0, 1]\r
    }, {\r
        "value": min + diff * 7,\r
        "color": [232 / 255, 1, 0, 1]\r
    }, {\r
        "value": min + diff * 8,\r
        "color": [1, 185 / 255, 0, 1]\r
    }, {\r
        "value": min + diff * 9,\r
        "color": [1, 93 / 255, 0, 1]\r
    }, {\r
        "value": min + diff * 10,\r
        "color": [1, 0, 0, 1]\r
    }\r
]\r
\r
fdapi.finiteElement2.clear();\r
//有限元分析对象2\r
let fe2 = {\r
    "id": "fe_2",\r
    "filePath": HostConfig.Path + "/assets/vtk/compress.vtu",//vtu文件路径\r
    "location": [493126.241875, 2492054.3999609374, 3],\r
    "rotation": [0, 0, 0],\r
    "collision": true,\r
    "showMesh": true,\r
    "edge": {\r
        "type": 1,\r
        "featureAngel": 30,\r
        "color": [0.1, 0.1, 0.1, 0.65]\r
    },\r
    "arrow": {\r
        "vectorField": "nodevelocity",\r
        "lengthScale": 0.1,\r
        "sizeScale": 0.1,\r
        "colorField": "nodevelocity",\r
        "colorComponent": "Y"\r
    },\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [0, 0, 0, 1],\r
        "colorStops": colorStops\r
    },\r
\r
};\r
await fdapi.finiteElement2.add(fe2);\r
fdapi.finiteElement2.focus('fe_2');\r
\`\`\`\r
\r
> 示例：Add(PointField)\r
\r
\`\`\`js\r
let min = -0.133858\r
let max = 0.00677916\r
let diff = (max - min) / 10;\r
let colorStops = [\r
    {\r
        "value": min,\r
        "color": [0, 0, 1, 1]\r
    },\r
    {\r
        "value": min + diff,\r
        "color": [0, 93 / 255, 1, 1]\r
    }, {\r
        "value": min + diff * 2,\r
        "color": [0, 185 / 255, 1, 1]\r
    }, {\r
        "value": min + diff * 3,\r
        "color": [0, 1, 232 / 255, 1]\r
    }, {\r
        "value": min + diff * 4,\r
        "color": [0, 1, 139 / 255, 1]\r
    }, {\r
        "value": min + diff * 5,\r
        "color": [0, 1, 46 / 255, 1]\r
    }, {\r
        "value": min + diff * 6,\r
        "color": [139 / 255, 1, 0, 1]\r
    }, {\r
        "value": min + diff * 7,\r
        "color": [232 / 255, 1, 0, 1]\r
    }, {\r
        "value": min + diff * 8,\r
        "color": [1, 185 / 255, 0, 1]\r
    }, {\r
        "value": min + diff * 9,\r
        "color": [1, 93 / 255, 0, 1]\r
    }, {\r
        "value": min + diff * 10,\r
        "color": [1, 0, 0, 1]\r
    }\r
]\r
\r
fdapi.finiteElement2.clear();\r
//有限元分析对象2\r
let fe2 = {\r
    "id": "fe_2",\r
    "filePath": HostConfig.Path + "/assets/vtk/finiteElement2.vtk",//vtk文件路径\r
    "location": [493071.733125, 2492216.8000000003, 150],\r
    "rotation": [0, 90, 0],\r
    "collision": true,\r
    "showMesh": true,\r
    "edge": {\r
        "type": 1,\r
        "featureAngel": 30,\r
        "color": [0.1, 0.1, 0.1, 0.65]\r
    },\r
    "pointField": {\r
        "field": "U",\r
        "component": "D3" //可选\r
    },\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [0, 0, 0, 1],\r
        "colorStops": colorStops\r
    },\r
};\r
await fdapi.finiteElement2.add(fe2);\r
//添加耗时 延迟5s定位\r
setTimeout(function () {\r
    fdapi.finiteElement2.focus('fe_2');\r
}, 5000);\r
\`\`\`\r
\r
---\r
\r
### \`applyBoxClipFilter(data, fn)\` {#applyBoxClipFilter}\r
\r
盒子过滤器\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象盒子过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元仿真对象的唯一标识符ID |\r
| \`filterId\` | \`string\` | 过滤器ID |\r
| \`clipBBox\` | \`array\` | 剖切盒子的范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`clipRotation\` | \`array\` | 剖切盒子的旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`crinkleClip\` | \`boolean\` | 是否对切面上的网格体进行剖切并只显示剖切区域的一侧，默认值：false 平滑切面效果，设置为true，则显示褶皱效果 |\r
| \`invertClip\` | \`boolean\` | 是否打开剖切反转，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ApplyBoxClipFilter\r
\r
\`\`\`js\r
//清空过滤器\r
fdapi.finiteElement2.clearFilter("fe_2");\r
//按盒子范围过滤\r
fdapi.finiteElement2.applyBoxClipFilter({\r
    "id": "fe_2",\r
    "filterId": "filter4",\r
    "clipBBox": [493062.5725, 2492167.255, 117.1850439453125, 493124.398125, 2492192.105, 153.7712841796875],\r
    "clipRotation": [0, 0, 0],\r
    "crinkleClip": false,\r
    "invertClip": true\r
});\r
\`\`\`\r
\r
---\r
\r
### \`applyContourFilter(data, fn)\` {#applyContourFilter}\r
\r
根据等值线对应的数值添加过滤器并展示过滤后的有限元模型分析结果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元仿真对象的唯一标识符ID |\r
| \`filterId\` | \`string\` | 过滤器ID |\r
| \`fieldName\` | \`string\` | 有限元模型对象包含等值线值的属性字段名称，支持点属性字段 |\r
| \`contourValues\` | \`array\` | 等值线对应的数值数组，数组元素的取值类型: number，取值示例：[100,200,300,500] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ApplyContourFilter\r
\r
\`\`\`js\r
//清空过滤器\r
fdapi.finiteElement2.clearFilter("fe_2");\r
//根据等值线/面过滤\r
fdapi.finiteElement2.applyContourFilter({\r
    id: "fe_2",\r
    filterId: "filter2",\r
    fieldName: "E_Mises",\r
    contourValues: [0, 0.001, 0.002]\r
});\r
\`\`\`\r
\r
---\r
\r
### \`applyCylinderClipFilter(data, fn)\` {#applyCylinderClipFilter}\r
\r
圆柱过滤器\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象圆柱过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元仿真对象的唯一标识符ID |\r
| \`filterId\` | \`string\` | 过滤器ID |\r
| \`clipOrigin\` | \`array\` | 圆柱体的柱心坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`clipRadius\` | \`array\` | 圆柱体的半径，单位：米，取值范围：[0,任意正数] |\r
| \`clipAxis\` | \`array\` | 圆柱体的轴心朝向，即垂直于圆柱底面的法线向量，取值示例：[0,0,1] |\r
| \`crinkleClip\` | \`boolean\` | 是否对切面上的网格体进行剖切并只显示剖切区域的一侧，默认值：false 平滑切面效果，设置为true，则显示褶皱效果 |\r
| \`invertClip\` | \`boolean\` | 是否打开剖切反转，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ApplyCylinderClipFilter\r
\r
\`\`\`js\r
//清空过滤器\r
fdapi.finiteElement2.clearFilter("fe_2");\r
//按圆柱体过滤\r
fdapi.finiteElement2.applyCylinderClipFilter({\r
    "id": "fe_2",\r
    "filterId": "filter6",\r
    "clipOrigin": [493110.26125, 2492224.32, 140],\r
    "clipRadius": 10,\r
    "clipAxis": [0, 1, 0],\r
    "crinkleClip": false,\r
    "invertClip": true\r
});\r
\`\`\`\r
\r
---\r
\r
### \`applyPlaneClipFilter(data, fn)\` {#applyPlaneClipFilter}\r
\r
切面过滤器\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象切面过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元仿真对象的唯一标识符ID |\r
| \`filterId\` | \`string\` | 过滤器ID |\r
| \`clipOrigin\` | \`array\` | 切面的原点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`clipNormal\` | \`array\` | 切面的法线向量，取值示例：[1,0,0] |\r
| \`crinkleClip\` | \`boolean\` | 是否对切面上的网格体进行剖切并只显示剖切区域的一侧，默认值：false 平滑切面效果，设置为true，则显示褶皱效果 |\r
| \`invertClip\` | \`boolean\` | 是否打开剖切反转，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ApplyPlaneClipFilter\r
\r
\`\`\`js\r
//清空过滤器\r
fdapi.finiteElement2.clearFilter("fe_2");\r
//按面过滤\r
fdapi.finiteElement2.applyPlaneClipFilter({\r
    "id": "fe_2",\r
    "filterId": "filter3",\r
    "clipNormal": [1, 0, 0],\r
    "clipOrigin": [493104.82, 2492261.7600000002, 143.5202734375],\r
    "crinkleClip": false,\r
    "invertClip": true\r
});\r
\`\`\`\r
\r
---\r
\r
### \`applySphereClipFilter(data, fn)\` {#applySphereClipFilter}\r
\r
球型过滤器\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象球型过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元仿真对象的唯一标识符ID |\r
| \`filterId\` | \`string\` | 过滤器ID |\r
| \`clipOrigin\` | \`array\` | 球的球心坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`clipRadius\` | \`array\` | 球的半径，单位：米，取值范围：[0,任意正数] |\r
| \`crinkleClip\` | \`boolean\` | 是否对切面上的网格体进行剖切并只显示剖切区域的一侧，默认值：false 平滑切面效果，设置为true，则显示褶皱效果 |\r
| \`invertClip\` | \`boolean\` | 是否打开剖切反转，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ApplySphereClipFilter\r
\r
\`\`\`js\r
//清空过滤器\r
fdapi.finiteElement2.clearFilter("fe_2");\r
//按球体过滤\r
fdapi.finiteElement2.applySphereClipFilter({\r
    "id": "fe_2",\r
    "filterId": "filter5",\r
    "clipOrigin": [493102.69875, 2492223.52, 140],\r
    "clipRadius": 22,\r
    "crinkleClip": false,\r
    "invertClip": true\r
});\r
\`\`\`\r
\r
---\r
\r
### \`applyThresholdFilter(data, fn)\` {#applyThresholdFilter}\r
\r
根据模型属性字段对应的区间值添加过滤器并展示过滤后的有限元模型分析结果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元仿真对象的唯一标识符ID |\r
| \`filterId\` | \`string\` | 过滤器ID |\r
| \`fieldName\` | \`string\` | 有限元模型对象包含的区间类型的属性字段名称，支持cell属性字段和点属性字段 |\r
| \`range\` | \`array\` | 字段属性值的区间范围: [min~max]，区间范围的取值类型: number，取值示例：[10,20] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ApplyThresholdFilter\r
\r
\`\`\`js\r
//清空过滤器\r
fdapi.finiteElement2.clearFilter("fe_2");\r
//根据区间字段过滤\r
fdapi.finiteElement2.applyThresholdFilter({\r
    id: "fe_2",\r
    filterId: "filter1",\r
    fieldName: "E_Mises",\r
    component: "E_Mises",\r
    range: [0, 0.003]\r
\r
});\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的有限元仿真对象\r
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
fdapi.finiteElement2.clear();\r
\`\`\`\r
\r
---\r
\r
### \`clearFilter(ids, fn)\` {#clearFilter}\r
\r
清空指定的有限元模型对象添加的所有过滤器\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 有限元仿真对象的ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ClearFilter\r
\r
\`\`\`js\r
fdapi.finiteElement2.clearFilter("fe_2");\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个有限元仿真对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的有限元仿真对象ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.finiteElement2.delete(['fe_2']);\r
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
| \`ids\` | \`string \\| array\` | 有限元仿真对象的ID或者ID数组 |\r
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
fdapi.finiteElement2.focus('fe_2');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据有限元分析ID获取有限元分析的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的有限元仿真对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回FiniteElement的详细信息\r
\r
{\r
            "id":"fe_2",\r
            "filePath":"C:/HHKBZ.vtk",\r
            "location":[2209.658125,22.4936328125,8.699999389648437],\r
            "rotation":[0,0,0],\r
            "collision":true,\r
            "edgeColor": [0.1, 0.1, 0.1, 1],\r
            "showMesh":false,\r
            "edge": {\r
                "type": 1,\r
                "featureAngel": 30,\r
                "color": [0.1, 0,1, 0.1, 1]\r
            },\r
            "pointField":{\r
                "field":"U",\r
                //"component": "XY" //可选\r
            },\r
            "colors":\r
            {\r
                "colorStops":[\r
                    {\r
                        "value":0,\r
                        "color":[0.231373,0.298039,0.752941,1]\r
                    },\r
                    {\r
                        "value":0.5,\r
                        "color":[0.865,0.865,0.865,1]\r
                    },\r
                    {\r
                        "value":1,\r
                        "color":[0.705882,0.015686,0.14902,1]\r
                    }\r
                ]\r
            }\r
        };\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.finiteElement2.get(['fe_2']);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏有限元分析\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 有限元仿真对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.finiteElement2.hide(['fe_2']);\r
\`\`\`\r
\r
---\r
\r
### \`removeFilter(data, fn)\` {#removeFilter}\r
\r
移除指定的有限元模型对象添加的相关过滤器\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象过滤器的数据结构，可以是Object类型或者Array类型 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元仿真对象的唯一标识符ID |\r
| \`filterIds\` | \`array\` | 过滤器ID数组 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：RemoveFilter\r
\r
\`\`\`js\r
fdapi.finiteElement2.removeFilter({ id: "fe_2", filterIds: ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6"] });\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示有限元分析\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 有限元仿真对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.finiteElement2.show(['fe_2']);\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个有限元仿真对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元仿真对象或对象数组，参考add方法参数。注意：不支持更新文件路径参数(filePath)，需先删除再添加 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
//有限元分析对象\r
let fe2 = {\r
    "id": "fe_2",\r
    "edge": {\r
        "type": 2,\r
        "featureAngel": 30,\r
        "color": [0.1, 0, 1, 0.1, 1]\r
    }\r
\r
};\r
await fdapi.finiteElement2.update(fe2);\r
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
await fdapi.finiteElement2.updateEnd();\r
\`\`\`\r
`;export{r as default};
