const n=`---\r
title: OceanHeatMap\r
sidebar_label: OceanHeatMap\r
description: "OceanHeatMap 基于真实海洋数据(.tif)生成海面要素热力图，呈现海温、叶绿素等场量的空间分布。"\r
---\r
\r
# OceanHeatMap\r
\r
海洋热力图对象，基于真实海洋数据驱动生成热力图，数据源格式：.tif文件\r
\r
通过 \`api.oceanHeatmap\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：OceanHeatMap 基于真实海洋数据(.tif)生成海面要素热力图，呈现海温、叶绿素等场量的空间分布。\r
- **别名 / 不同行业叫法**：海洋热力 / 海温场 / 叶绿素分布 / 海面要素场 / 海洋专题热力。\r
- **适用行业**：海洋气象、海洋环境、渔业、生态环保、海洋科研\r
- **使用场景**：\r
  - 海表温度、盐度、叶绿素分布的专题展示\r
  - 赤潮、水质监测与预警\r
  - 海洋环境要素的时序动态\r
- **注意事项**：\r
  - 依赖规范的 .tif 栅格数据与色带映射\r
  - 大范围高分辨率注意性能\r
  - 时序数据需统一基准与单位\r
\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个OceanHeatMap海洋热力图对象，数据源为.tif文件。 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 删除场景中所有的OceanHeatMap | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个OceanHeatMap对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取OceanHeatMap的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏OceanHeatMap | 按业务条件隐藏对象 |\r
| [\`show\`](#show) | 显示OceanHeatMap | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个OceanHeatMap对象 | 运行时动态更新对象属性/状态 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个OceanHeatMap海洋热力图对象，数据源为.tif文件。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 构造海洋热力图对象OceanHeatMap的数据对象，可以是Object类型或者Array类型，对于每一个OceanHeatMap对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | OceanHeatMap对象ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`offset\` | \`array\` | 可选，海洋热力图的整体偏移，默认值：[0, 0, 0] |\r
| \`collision\` | \`boolean\` | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |\r
| \`displayMode\` | [\`OceanHeatMapStyle\`](/docs/api/types#oceanheatmapstyle) | (\`OceanHeatMapStyle\`) 海洋热力图的显示样式枚举，支持箭头、流场和海浪三种显示样式，取值详情参考 \`OceanHeatMapStyle\` |\r
| \`alphaMode\` | \`number\` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用tif数据包含的水深字段自动控制不透明度，默认值：1 |\r
| \`valueFile\` | \`string\` | 必选，海洋热力图tif数据文件路径（水深文件tif），取值示例："C:/tifFile/value.tif"，注意：水深和流速这2个tif文件分辨率必须保持一致 |\r
| \`flowField\` | \`string\` | 必选，海洋热力图tif数据文件路径（流速流向uv文件tif），取值示例："C:/tifFile/uv.tif"，注意：水深和流速这2个tif文件分辨率必须保持一致 |\r
| \`valueRange\` | \`array\` | 可选，水深对应的数值区间，如果不传则系统会自动计算并使用valueFile数据的水深范围 |\r
| \`speedRange\` | \`array\` | 可选，流速范围，如果不传则系统会自动计算并使用flowField数据的速度范围 |\r
| \`alphaGradientValueRange\` | \`array\` | 边缘羽化的水深范围，默认值：[0,2]，单位：米，对应的alpha区间为[0,1]，注意：仅在alphaMode=1时生效 |\r
| \`rippleDensity\` | \`number\` | 可选，水波纹辐射强度，默认值：1 |\r
| \`rippleTiling\` | \`number\` | 可选，水波纹辐射平铺系数，默认值：1 |\r
| \`speedFactor\` | \`number\` | 可选，速度因子，控制水波纹或者粒子的速度，默认值：1 |\r
| \`foamIntensity\` | \`number\` | 可选，水泡沫的强度，默认值：1 |\r
| \`waveBrightness\` | \`number\` | 可选，水波纹的显示亮度，取值范围：[0~1000]，值越大亮度越高水波纹越明显，默认值：1 |\r
| \`shadowDensity\` | \`number\` | 可选，水波纹阴影强度，默认值：1 |\r
| \`arrowColor\` | \`array\` | 箭头的颜色和透明度，示例值：[1,1,1,0.5] |\r
| \`arrowDisplayMode\` | \`number\` | 箭头的显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响），默认值：0 |\r
| \`arrowAlphaMode\` | \`number\` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度，默认值：0 |\r
| \`particles\` | \`object\` | 可选参数，粒子动态效果对应参数的配置对象 |\r
| \`particles.displayMode\` | \`number\` | 可选，粒子的的显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响），默认值：0 |\r
| \`particles.alphaMode\` | \`number\` | 可选，粒子的透明度模式，仅在displayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度，默认值：0 |\r
| \`particles.color\` | \`array\` | 可选，粒子的颜色和透明度，示例值：[1,1,1,0.5] |\r
| \`particles.num\` | \`number\` | 可选，箭头数量 |\r
| \`particles.speedFactor\` | \`number\` | 可选，速度因子 |\r
| \`particles.sizeScale\` | \`number\` | 可选，尺寸缩放因子 |\r
| \`particles.fadeOpacity\` | \`number\` | 可选，不透明度渐隐系数 |\r
| \`particles.baseRespawnRate\` | \`number\` | 可选，重新生成箭头的基础因子 |\r
| \`particles.respawnSpeedFactor\` | \`number\` | 可选，重新生成箭头的速度因子 |\r
| \`flowVisualization\` | \`object\` | 可选参数，流场可视化效果配置参数对象 |\r
| \`flowVisualization.brightness\` | \`number\` | 可选，亮度 |\r
| \`flowVisualization.noisePuls\` | \`number\` | 可选，脉冲噪声 |\r
| \`flowVisualization.timeSpeed\` | \`number\` | 可选，时间加速因子 |\r
| \`flowVisualization.tilling\` | \`number\` | 可选，平铺因子 |\r
| \`flowVisualization.blendFactor\` | \`number\` | 可选，混合因子 |\r
| \`flowVisualization.renderSpeedRange\` | \`array\` | 可选，流速渲染范围 |\r
| \`lods\` | \`array\` | 可选参数，流场样式下，流场、远景水波纹、近景水波纹、水面浪花的四个显示距离： ![](/img/refdoc/api/OceanHeatMapLods.png) |\r
| \`lods.level\` | \`number\` | 四种显示类型 |\r
| \`lods.distance\` | \`number\` | 透明度开始衰变的相机距离 |\r
| \`colors\` | \`object\` | 海洋热力图自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 值对应的调色板颜色，注意alphaMode=0时，此颜色值的透明度生效 |\r
| \`colors.value\` | \`number\` | 值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
请求数据结构示例 \r
        {\r
            "id": "oceanHeatmap1",\r
            "offset": [0, 0, 0],\r
            "collision": true,\r
\r
            "alphaMode": 1,\r
            "displayMode": 1,\r
\r
            "valueRange":[0,0.3],\r
            "speedRange":[0,0.3],\r
            "alphaGradientValueRange": [0, 0.3],\r
\r
            "speedFactor": 500,\r
            "rippleDensity": 1,\r
            "rippleTiling": 1,\r
\r
            "foamIntensity": 3,\r
            "waveBrightness": 10,\r
            "shadowIntensity": 1,\r
\r
            "particles": {\r
                "alphaMode": 0,\r
                "color": [0, 0, 0, 1],\r
                "displayMode": 0,\r
                "num": 10000,\r
                "speedFactor": 5000,\r
                "sizeScale": 0.01,\r
                "fadeOpacity": 0.95,\r
                "baseRespawnRate": 0.03,\r
                "respawnSpeedFactor": 0.02\r
            },\r
            "lods": [\r
                {\r
                    "level": 1,\r
                    "distance": 50000,\r
                },\r
                {\r
                    "level": 2,\r
                    "distance": 100000,\r
                },\r
                {\r
                    "level": 3,\r
                    "distance": 500000,\r
                }\r
                ],\r
            "flowVisualization": {\r
                "brightness": 1.0,\r
                "noisePuls": 0.5,\r
                "timeSpeed": 0.75,\r
                "tilling": 0.5,\r
                "blendFactor": 0.5,\r
                "renderSpeedRange": [0, 0]\r
            },\r
\r
            "valueFile": path + "/assets/tif/oceanheatmap/value.tif",\r
            "flowField": path + "/assets/tif/oceanheatmap/uv.tif",\r
            "colors": {\r
                "gradient": true,\r
                "invalidColor": [0, 0, 0, 1],\r
                "colorStops": [{\r
                        "value": 0,\r
                        "color": [0.2, 0.4, 0.92, 0]\r
                },\r
                    {\r
                        "value": 0.2,\r
                        "color": [0.1, 0.85, 0.85, 1]\r
                },\r
                    {\r
                        "value": 0.3,\r
                        "color": [0.05, 0.9, 0.05, 1]\r
                },\r
                    {\r
                        "value": 0.5,\r
                        "color": [0.8, 0.8, 0.01, 1]\r
                },\r
                    {\r
                        "value": 1,\r
                        "color": [1, 0.15, 0.15, 1]\r
                }]\r
            }\r
        }\r
\`\`\`\r
\r
> 示例：Add(流场)\r
\r
\`\`\`js\r
fdapi.oceanHeatmap.clear();\r
let path = HostConfig.Path;\r
\r
\r
let oceanHeatmap1 = {\r
    "id": "oceanHeatmap_tif",\r
    "offset": [0, 0, 0],\r
    "collision": true,\r
    "displayMode": OceanHeatMapStyle.Flow, //流场\r
    "valueFile": path + "/assets/tif/oceanheatmap/value.tif",\r
    "flowField": path + "/assets/tif/oceanheatmap/uv.tif",\r
}\r
\r
fdapi.oceanHeatmap.add(oceanHeatmap1);\r
//fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);\r
fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);\r
\`\`\`\r
\r
> 示例：Add(箭头)\r
\r
\`\`\`js\r
fdapi.oceanHeatmap.clear();\r
let path = HostConfig.Path;\r
\r
\r
let oceanHeatmap1 = {\r
    "id": "oceanHeatmap_tif",\r
    "offset": [0, 0, 0],\r
    "collision": true,\r
    "displayMode": OceanHeatMapStyle.Arrow, //箭头\r
    "valueFile": path + "/assets/tif/oceanheatmap/value.tif",\r
    "flowField": path + "/assets/tif/oceanheatmap/uv.tif",\r
}\r
\r
fdapi.oceanHeatmap.add(oceanHeatmap1);\r
//fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);\r
fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);\r
\`\`\`\r
\r
> 示例：Add(波浪)\r
\r
\`\`\`js\r
fdapi.oceanHeatmap.clear();\r
let path = HostConfig.Path;\r
\r
\r
let oceanHeatmap1 = {\r
    "id": "oceanHeatmap_tif",\r
    "offset": [0, 0, 0],\r
    "collision": true,\r
    "displayMode": OceanHeatMapStyle.Wave, //波浪\r
    "valueFile": path + "/assets/tif/oceanheatmap/value.tif",\r
    "flowField": path + "/assets/tif/oceanheatmap/uv.tif",\r
}\r
\r
fdapi.oceanHeatmap.add(oceanHeatmap1);\r
//fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);\r
fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的OceanHeatMap\r
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
fdapi.oceanHeatmap.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个OceanHeatMap对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的OceanHeatMap对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.oceanHeatmap.delete('oceanHeatmap_tif');\r
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
| \`ids\` | \`string \\| array\` | OceanHeatMap对象的ID或者ID数组 |\r
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
fdapi.oceanHeatmap.focus('oceanHeatmap_tif', 200000);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取OceanHeatMap的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的OceanHeatMap对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.oceanHeatmap.get('oceanHeatmap_tif');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏OceanHeatMap\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | OceanHeatMap对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.oceanHeatmap.hide('oceanHeatmap_tif');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示OceanHeatMap\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | OceanHeatMap对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.oceanHeatmap.show('oceanHeatmap_tif');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个OceanHeatMap对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | OceanHeatMap对象或者数组，以下属性支持更新 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 根据OceanHeatMap对象的ID更新以下属性 |\r
| \`valueFile\` | \`string\` | 必选，海洋热力图tif数据文件路径（水深文件tif），取值示例："C:/tifFile/xxx1.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |\r
| \`flowField\` | \`string\` | 必选，海洋热力图tif数据文件路径（流速流向文件tif），取值示例："C:/tifFile/xxx2.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let path = HostConfig.Path;\r
let oceanHeatmap_update = {\r
    "id": "oceanHeatmap_tif",\r
    "valueFile": path + "/assets/tif/oceanheatmap/value.tif",\r
    "flowField": path + "/assets/tif/oceanheatmap/uv.tif",\r
}\r
fdapi.oceanHeatmap.update(oceanHeatmap_update);\r
\`\`\`\r
`;export{n as default};
