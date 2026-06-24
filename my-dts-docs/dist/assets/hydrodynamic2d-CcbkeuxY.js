const r=`---\r
title: HydroDynamic2D\r
sidebar_label: HydroDynamic2D\r
description: "HydroDynamic2D 是现行的二维水动力模型对象，基于真实数据驱动，支持 tif 栅格与 shp 矢量两类数据源，可按时序回放水深、流速流向，提供真实水样式、热力图样式、流场样式及流向箭头，是面状洪水演进与淹没动态展示的核心对象。"\r
---\r
\r
# HydroDynamic2D\r
\r
二维水动力模型对象，基于真实数据驱动生成水动力模型，支持2种格式数据源：.tif文件（栅格） | .shp文件（矢量）\r
\r
通过 \`api.hydrodynamic2d\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：HydroDynamic2D 是现行的二维水动力模型对象，基于真实数据驱动，支持 tif 栅格与 shp 矢量两类数据源，可按时序回放水深、流速流向，提供真实水样式、热力图样式、流场样式及流向箭头，是面状洪水演进与淹没动态展示的核心对象。\r
- **别名 / 不同行业叫法**：二维水动力 / 2D 水动力仿真 / 二维洪水演进模型 / 漫滩淹没仿真；本对象为 HydrodynamicModel/HydrodynamicModel2 的现行替代。\r
- **适用行业**：智慧水利、应急管理、智慧城市（防洪排涝）、能源电力（库区/电站）、海洋气象（风暴潮/漫滩）。\r
- **使用场景**：\r
  - 流域、城区面状洪水演进的时序回放，动态展示水深扩散与流速流向变化。\r
  - 溃坝、超标洪水的淹没过程仿真与受淹范围演示，支撑应急研判与撤离决策。\r
  - 河道行洪、漫滩淹没的流场样式/热力图样式展示，配合调色板表达水深或流速分布。\r
- **注意事项**：\r
  - shp 方式要求投影坐标系（PCS）且单位为米；update() 更新用 .dat 文件，且只含有水网格面以减小文件、提升更新效率。\r
  - 真实水样式（displayMode=0）下 waterColor 生效，热力/流场样式需配置 depthRange/speedRange 与调色板；开启 collision 会影响加载效率。\r
  - 数据量大时注意分辨率与时序文件规模对加载与播放性能的影响；新项目请优先用本对象而非已废弃的 HydrodynamicModel 系列。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`addByShp\`](#addByShp) | 添加一个或多个HydroDynamic2D二维水动力模型对象，添加的数据源为(.shp)… |  |\r
| [\`addByTif\`](#addByTif) | 添加一个或多个HydroDynamic2D二维水动力模型对象，数据源为.tif文件。 |  |\r
| [\`clear\`](#clear) | 删除场景中所有的HydroDynamic2D | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个HydroDynamic2D对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取HydroDynamic2D的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏HydroDynamic2D | 按业务条件隐藏对象 |\r
| [\`show\`](#show) | 显示HydroDynamic2D | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个HydroDynamic2D对象 | 运行时动态更新对象属性/状态 |\r
\r
## 方法（Methods）\r
\r
### \`addByShp(data, fn)\` {#addByShp}\r
\r
添加一个或多个HydroDynamic2D二维水动力模型对象，添加的数据源为(.shp)文件，注意：SHP文件必需是投影坐标系（PCS），同时单位是米。\r
\r
**注意：使用shp方式来添加二维水动力模型对象，执行update()更新方法时需使用.dat类型文件，同时dat文件只需要包含有水的网格面，确保dat文件尽量小，从而提高更新效率。详情参考shpDataFilePath字段描述**\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 构造二维水动力模型对象HydroDynamic2D的数据对象，可以是Object类型或者Array类型，对于每一个HydroDynamic2D对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HydroDynamic2D对象ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`offset\` | \`array\` | 可选，二维水动力模型的整体偏移，默认值：[0, 0, 0] |\r
| \`collision\` | \`boolean\` | 是否开启模型碰撞，默认值：false，注意：开启后会影响加载效率 |\r
| \`displayMode\` | [\`HydroDynamic2DStyle\`](/docs/api/types#hydrodynamic2dstyle) | (\`HydroDynamic2DStyle\`) 二维水动力模型的显示样式，取值范围：[0,1,2]，0真实水样式（默认值），1热力图样式,2流场样式 |\r
| \`waterMode\` | [\`WaterMode\`](/docs/api/types#watermode) | (\`WaterMode\`) 真实水样式的水面材质类型，取值范围：[0,1,2]，默认值：0，注意：水面材质支持和热力图样式叠加 |\r
| \`waterColor\` | [\`Color\`](/docs/api/types#color) | 可选，水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) ，注意：此参数仅在displayMode设置为真实水样式时生效，如果不传则使用waterMode自带水材质颜色 |\r
| \`waveBrightness\` | \`number\` | 可选，水波纹的显示亮度，取值范围：[0~1000]，值越大亮度越高水波纹越明显，默认值：1 |\r
| \`depthRange\` | \`array\` | 可选，二维水动力模型水深对应的数值区间，如果不传则系统会自动计算并使用dat数据的水深范围 |\r
| \`alphaMode\` | \`number\` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用dat数据包含的水深字段自动控制不透明度，默认值：1 |\r
| \`alphaGradientDepthRange\` | \`array\` | 边缘羽化的水深范围，默认值：[0,2]，单位：米，对应的alpha区间为[0,1]，注意：仅在alphaMode=1时生效 |\r
| \`arrowColor\` | [\`Color\`](/docs/api/types#color) | 箭头颜色和透明度，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`arrowTiling\` | \`number\` | 箭头平铺系数 |\r
| \`arrowDisplayMode\` | \`number\` | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响），默认值：0 |\r
| \`arrowAlphaMode\` | \`number\` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度，默认值：0 |\r
| \`arrowColors\` | \`object\` | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`arrowColors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`arrowColors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`arrowColors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`arrowColors.color\` | [\`Color\`](/docs/api/types#color) | 流速UV值对应的调色板颜色，注意arrowDisplayMode=1时，此颜色值的透明度生效 |\r
| \`arrowColors.value\` | \`number\` | 流速UV值 |\r
| \`alphaComposite\` | \`boolean\` | 是否使用混合透明度，默认：true |\r
| \`rippleDensity\` | \`number\` | 可选，水波纹辐射强度，默认值：1 |\r
| \`rippleTiling\` | \`number\` | 可选，水波纹辐射平铺系数，默认值：1 |\r
| \`speedRange\` | \`array\` | 可选，流速范围，默认值：[0.1,3] |\r
| \`speedFactor\` | \`number\` | 可选，速度因子，控制水波纹或者粒子的速度，默认值：1 |\r
| \`flowThreshold\` | \`array\` | 可选，水浪效果漫延的深度区间范围，区间外不生成浪头效果，默认值：[0.1,0.4] |\r
| \`crestWaterSpeedRange\` | \`array\` | 可选，水浪效果漫延的流速区间范围，默认值：[0,1]，注意：和深度区间表现为叠加的效果，区间内的水流速度值越大浪头越来越明显 |\r
| \`shpFilePath\` | \`string\` | 添加二维水动力模型整体范围的shp文件路径，取值示例："C:/shpFile/xxx.shp"。注意：此shp文件包含水动力模型所有网格的范围，类型为Polygon，坐标系必须是PCS类型，单位是米，同时shp文件属性表字段必须包含ID和Elev两个字段：ID是网格ID，int类型；Elev是网格的高程值，double类型，单位是米 |\r
| \`shpDataFilePath\` | \`string\` | 可选参数，仅在update()方法执行生效。更新二维水动力模型时包含水面网格的dat类型文件路径，取值示例："C:/datFile/xxx.dat"。注意：dat文件是一种二进制文件，它提取了某一时刻包含的所有水面网格的信息，并把这些信息依次写入了二进制文件dat，一个水面网格信息包含如下一组四个值：id,h,u,v。id对应shp属性表ID字段（int类型），h是网格对应的水深（double类型，单位是米），uv是流速和流向（double类型，单位米/秒，u朝东，v朝北）。 |\r
| \`updateTime\` | \`number\` | 可选参数，更新动画的插值时间，注意：仅update()更新方法执行时生效，默认值：1s |\r
| \`arrowVisibleDistance\` | \`number\` | 可选参数，动态箭头显示的最大距离，单位：米 |\r
| \`dynamicArrow\` | \`object\` | 可选参数，动态箭头的配置参数对象 |\r
| \`dynamicArrow.numArrows\` | \`number\` | 箭头数量 |\r
| \`dynamicArrow.speedFactor\` | \`number\` | 速度因子 |\r
| \`dynamicArrow.sizeScale\` | \`number\` | 尺寸缩放因子 |\r
| \`colors\` | \`object\` | 二维水动力模型自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 水深值对应的调色板颜色，注意alphaMode=0时，此颜色值的透明度生效 |\r
| \`colors.value\` | \`number\` | 水深值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.hydrodynamic2d.addByShp(data);\r
\`\`\`\r
\r
---\r
\r
### \`addByTif(data, fn)\` {#addByTif}\r
\r
添加一个或多个HydroDynamic2D二维水动力模型对象，数据源为.tif文件。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 构造二维水动力模型对象HydroDynamic2D的数据对象，可以是Object类型或者Array类型，对于每一个HydroDynamic2D对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HydroDynamic2D对象ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`bbox\` | \`array\` | 可选，二维水动力模型的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`offset\` | \`array\` | 可选，二维水动力模型的整体偏移，默认值：[0, 0, 0] |\r
| \`dataSize\` | \`array\` | 可选，二维水动力模型的数据分辨率，取值示例：[X,Y] |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，注意：参数仅update()更新方法执行时生效 |\r
| \`waterDepth\` | \`string\` | 必选，二维水动力模型tif数据文件路径（水深文件tif），取值示例："C:/tifFile/xxx1.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |\r
| \`flowField\` | \`string\` | 可选，二维水动力模型tif数据文件路径（流速流向文件tif），取值示例："C:/tifFile/xxx2.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |\r
| \`dem\` | \`string\` | 可选，二维水动力模型tif数据文件路径（河道DEM文件tif），取值示例："C:/tifFile/xxx3.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |\r
| \`collision\` | \`boolean\` | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |\r
| \`displayMode\` | [\`HydroDynamic2DStyle\`](/docs/api/types#hydrodynamic2dstyle) | (\`HydroDynamic2DStyle\`) 二维水动力模型的显示样式，取值范围：[0,1,2]，0真实水样式（默认值），1热力图样式，2流场样式 |\r
| \`waterMode\` | [\`WaterMode\`](/docs/api/types#watermode) | (\`WaterMode\`) 真实水样式的水面材质类型，取值范围：[0,1,2]，默认值：0，注意：水面材质支持和热力图样式叠加 |\r
| \`waterColor\` | [\`Color\`](/docs/api/types#color) | 可选，水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) ，注意：此参数仅在displayMode设置为真实水样式时生效，如果不传则使用waterMode自带水材质颜色 |\r
| \`waveBrightness\` | \`number\` | 可选，水波纹的显示亮度，取值范围：[0~1000]，值越大亮度越高水波纹越明显，默认值：1 |\r
| \`depthRange\` | \`array\` | 可选，二维水动力模型水深对应的数值区间，如果不传则系统会自动计算并使用tif数据的水深范围 |\r
| \`alphaGradientDepthRange\` | \`array\` | 边缘羽化的水深范围，默认值：[0,2]，单位：米，对应的alpha区间为[0,1]，注意：仅在alphaMode=1时生效 |\r
| \`alphaMode\` | \`number\` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用tif数据包含的水深字段自动控制不透明度，默认值：1 |\r
| \`arrowColor\` | [\`Color\`](/docs/api/types#color) | 箭头颜色和透明度，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`arrowTiling\` | \`number\` | 箭头平铺系数 |\r
| \`arrowDisplayMode\` | \`number\` | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响），默认值：0 |\r
| \`arrowAlphaMode\` | \`number\` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度，默认值：0 |\r
| \`arrowColors\` | \`object\` | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`arrowColors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`arrowColors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`arrowColors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`arrowColors.color\` | [\`Color\`](/docs/api/types#color) | 流速UV值对应的调色板颜色，注意arrowDisplayMode=1时，此颜色值的透明度生效 |\r
| \`arrowColors.value\` | \`number\` | 流速UV值 |\r
| \`rippleDensity\` | \`number\` | 可选，水波纹辐射强度，默认值：1 |\r
| \`rippleTiling\` | \`number\` | 可选，水波纹辐射平铺系数，默认值：1 |\r
| \`speedRange\` | \`array\` | 可选，流速范围，默认值：[0.1,3] |\r
| \`speedFactor\` | \`number\` | 可选，速度因子，控制水波纹或者粒子的速度，默认值：1 |\r
| \`flowThreshold\` | \`array\` | 可选，水浪漫延效果产生的深度区间，区间外不生成水浪效果，默认值：[0.1,0.4] |\r
| \`crestWaterSpeedRange\` | \`array\` | 可选，水浪漫延效果产生的流速区间，默认值：[0.2, 0.6]，注意：和深度区间表现为叠加的效果，区间内的水流速度值越大浪头越来越明显，如果流速大于区间最大值则和最大值的浪头效果一致。 |\r
| \`colors\` | \`object\` | 二维水动力模型自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 水深值对应的调色板颜色，注意alphaMode=0时，此颜色值的透明度生效 |\r
| \`colors.value\` | \`number\` | 水深值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
请求数据结构示例 \r
        [{\r
        "id": "hdm",\r
        "displayMode": 0,\r
        "waterMode": 0,\r
        "alphaMode": 1,\r
        "depthRange": [0, 3],\r
        "waterDepth":"d:\\\\waterDepth.tif",\r
        "flowField":"d:\\\\flowField.tif",\r
        "dem":"d:\\\\dem.tif",\r
        "colors": {\r
            "gradient": true,\r
            "invalidColor": [0, 0, 0, 1],\r
            "colorStops": [\r
                {\r
                    "value": 0,\r
                    "color": [0, 0, 1, 1]\r
                },\r
                {\r
                    "value": 0.25,\r
                    "color": [0, 1, 1, 1]\r
                },\r
                {\r
                    "value": 0.5,\r
                    "color": [0, 1, 0, 1]\r
                },\r
                {\r
                    "value": 0.75,\r
                    "color": [1, 1, 0, 1]\r
                },\r
                {\r
                    "value": 1,\r
                    "color": [1, 0, 0, 1]\r
                }\r
            ]\r
        }]\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的HydroDynamic2D\r
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
fdapi.hydrodynamic2d.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个HydroDynamic2D对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的HydroDynamic2D对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.hydrodynamic2d.delete('hdm_shp_clip');\r
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
| \`ids\` | \`string \\| array\` | HydroDynamic2D对象的ID或者ID数组 |\r
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
fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取HydroDynamic2D的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的HydroDynamic2D对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.hydrodynamic2d.get('hdm_shp_clip');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏HydroDynamic2D\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | HydroDynamic2D对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.hydrodynamic2d.hide('hdm_shp_clip');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示HydroDynamic2D\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | HydroDynamic2D对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.hydrodynamic2d.show('hdm_shp_clip');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个HydroDynamic2D对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | HydroDynamic2D对象或者数组，以下属性支持更新 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 根据HydroDynamic2D对象的ID更新以下属性 |\r
| \`vertexWaterDepth\` | \`boolean\` | 是否根据顶点水深插值，默认值：true，设置为false使用网格面插值 |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，注意：仅update()更新方法执行时生效，默认值：1s |\r
| \`shpDataFilePath\` | \`string\` | 更新二维水动力模型时包含水面网格的dat类型文件路径，取值示例："C:/datFile/xxx.dat"。注意：dat文件是一种二进制文件，它提取了某一时刻包含的所有水面网格的信息，并把这些信息依次写入了二进制文件dat，一个水面网格信息包含如下一组四个值：id,h,u,v。id对应shp属性表ID字段（int类型），h是网格对应的水深（double类型，单位是米），uv是流速和流向（double类型，单位米/秒，u朝东，v朝北）。id h u v四个字段分别对应4+8+8+8字节数据，id是int类型，其他double，按小端字节顺序（ByteOrder.LITTLE_ENDIAN）写入二进制dat文件 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
读取和写入dat文件的Java示例代码如下：\r
\r
\r
//读取dat\r
       public void readDat(){\r
\r
            String datFilePath = "C:\\\\dat\\\\test01.dat";\r
            byte[] bytes = new byte[4 + 8 + 8 + 8];\r
            FileInputStream fis = new FileInputStream(new File(datFilePath));\r
            while (fis.read(bytes, 0, bytes.length) != -1) {\r
\r
                int id = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 0, 4)).order(ByteOrder.LITTLE_ENDIAN).getInt();\r
                Double h = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 4, 12)).order(ByteOrder.LITTLE_ENDIAN).getDouble();\r
                Double u = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 12, 20)).order(ByteOrder.LITTLE_ENDIAN).getDouble();\r
                Double v = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 20, 28)).order(ByteOrder.LITTLE_ENDIAN).getDouble();\r
                //输出网格的id 对应的水深h 流速流向u v\r
                System.out.println("id:"+ id);\r
                System.out.println("h:"+ h);\r
                System.out.println("u:"+ u);\r
                System.out.println("v:"+ v);\r
            }\r
        }\r
    \r
        //写入dat\r
        public void writeDat(){\r
            String datFilePath = "D:\\\\dat\\\\test01.dat";\r
            OutputStream fos = new BufferedOutputStream(Files.newOutputStream(Paths.get(datFilePath)));\r
\r
            //网格的id\r
            int id = 0;\r
            //写入100个网格数据\r
            for(int i=0;i<100;i++){\r
                id = i;\r
                //网格对应的水深\r
                double h = Math.random();\r
                //uv 流速\r
                double u = Math.random();\r
                double v = Math.random();\r
                byte[] bytes = ByteBuffer.allocate(4 + 8 + 8 + 8).order(ByteOrder.LITTLE_ENDIAN).putInt(id).putDouble(h).putDouble(u).putDouble(v).array();\r
                fos.write(bytes);\r
            }\r
            fos.close();\r
        }\r
\`\`\`\r
\r
> 示例：Update\r
\r
\`\`\`js\r
fdapi.hydrodynamic2d.clear()\r
let path = HostConfig.Path;\r
let hydrodynamic2d_add = {\r
    id: 'hdm_shp_clip', // HydroDynamic2D对象ID\r
    displayMode: 1, // 水流场样式： 0水面 1热力 2流场\r
    collision: true, //开启碰撞\r
    shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp\r
    arrowVisibleDistance: 5000000, ////动态箭头距离\r
    dynamicArrow: { //动态箭头配置\r
        numArrows: 5000,\r
        speedFactor: 10,\r
        sizeScale: 0.1\r
    }\r
}\r
await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)\r
//  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);\r
fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);\r
\r
let index = 0;\r
let hydrodynamicModel_for_update = {\r
    "id": "hdm_shp_clip",\r
    "updateTime": 1,\r
    "vertexWaterDepth": true,\r
    "shpDataFilePath": ""\r
}\r
\r
//使用dat数据填充shp网格\r
let updateTimer = setInterval(async () => {\r
    index = index + 1;\r
    hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";\r
\r
    if (index > 3) {\r
        clearInterval(updateTimer)\r
    } else {\r
        await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);\r
    }\r
}, 3000);\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> AddByShp(水面)\r
\r
\`\`\`js\r
fdapi.hydrodynamic2d.clear()\r
let path = HostConfig.Path;\r
let hydrodynamic2d_add = {\r
    id: 'hdm_shp_clip', // HydroDynamic2D对象ID\r
    displayMode: 0, // 水流场样式： 0水面 1热力 2流场\r
    collision: true, //开启碰撞\r
    shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp\r
}\r
await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)\r
//  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);\r
fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);\r
\r
let index = 0;\r
let hydrodynamicModel_for_update = {\r
    "id": "hdm_shp_clip",\r
    "updateTime": 1,\r
    "vertexWaterDepth": true,\r
    "shpDataFilePath": ""\r
}\r
\r
//使用dat数据填充shp网格\r
let updateTimer = setInterval(async () => {\r
    index = index + 1;\r
    hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";\r
\r
    if (index > 3) {\r
        clearInterval(updateTimer)\r
    } else {\r
        await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);\r
    }\r
}, 3000);\r
\`\`\`\r
\r
> AddByShp(热力)\r
\r
\`\`\`js\r
fdapi.hydrodynamic2d.clear()\r
let path = HostConfig.Path;\r
let hydrodynamic2d_add = {\r
    id: 'hdm_shp_clip', // HydroDynamic2D对象ID\r
    displayMode: 1, // 水流场样式： 0水面 1热力 2流场\r
    collision: true, //开启碰撞\r
    shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp\r
    arrowVisibleDistance: 5000000, ////动态箭头距离\r
    dynamicArrow: { //动态箭头配置\r
        numArrows: 5000,\r
        speedFactor: 10,\r
        sizeScale: 0.1\r
    }\r
}\r
await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)\r
//  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);\r
fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);\r
\r
let index = 0;\r
let hydrodynamicModel_for_update = {\r
    "id": "hdm_shp_clip",\r
    "updateTime": 1,\r
    "vertexWaterDepth": true,\r
    "shpDataFilePath": ""\r
}\r
\r
//使用dat数据填充shp网格\r
let updateTimer = setInterval(async () => {\r
    index = index + 1;\r
    hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";\r
\r
    if (index > 3) {\r
        clearInterval(updateTimer)\r
    } else {\r
        await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);\r
    }\r
}, 3000);\r
\`\`\`\r
\r
> AddByShp(流场)\r
\r
\`\`\`js\r
fdapi.hydrodynamic2d.clear()\r
let path = HostConfig.Path;\r
let hydrodynamic2d_add = {\r
    id: 'hdm_shp_clip', // HydroDynamic2D对象ID\r
    displayMode: 2, // 水流场样式： 0水面 1热力 2流场\r
    collision: true, //开启碰撞\r
    shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp\r
}\r
await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)\r
//  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);\r
fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);\r
\r
let index = 0;\r
let hydrodynamicModel_for_update = {\r
    "id": "hdm_shp_clip",\r
    "updateTime": 1,\r
    "vertexWaterDepth": true,\r
    "shpDataFilePath": ""\r
}\r
\r
//使用dat数据填充shp网格\r
let updateTimer = setInterval(async () => {\r
    index = index + 1;\r
    hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";\r
\r
    if (index > 3) {\r
        clearInterval(updateTimer)\r
    } else {\r
        await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);\r
    }\r
}, 3000);\r
\`\`\`\r
\r
> AddByTif(水面)\r
\r
\`\`\`js\r
//添加tif数据源\r
fdapi.hydrodynamic2d.clear();\r
let path = HostConfig.Path;\r
let hydrodynamic2d_add = {\r
    "id": "hdm_tif",\r
    "displayMode": 0,//真实水样式\r
    "waterMode": 0, //水面材质类型\r
    "alphaMode": 0,//使用colors色带透明度\r
    "alphaGradientDepthRange": [0, 2],//羽化范围\r
    "collision": true,//开启碰撞\r
    "arrowColor": [1, 1, 1, 0.18],//可选\r
    "arrowTiling": 2,//可选\r
    "rippleDensity": 1,//可选\r
    "rippleTiling": 1,//可选\r
    "speedFactor": 1,//可选\r
    "speedRange": [0, 1],//可选\r
    "alphaComposite": true,\r
    "waterDepth": path + "/assets/tif/depth.tif",\r
    "flowField": path + "/assets/tif/uv.tif",\r
    "dem": path + "/assets/tif/dem.tif",\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [0, 0, 0, 1],\r
        "colorStops": [\r
            { "value": 0, "color": [0, 1, 0, 0] },\r
            { "value": 0.1, "color": [0.2196, 0.6549, 0, 0] },\r
            { "value": 0.5, "color": [0.4314, 0.7608, 0.0118, 0.11] },\r
            { "value": 1, "color": [0.6902, 0.8784, 0.0039, 0] },\r
            { "value": 1.5, "color": [1, 1, 0, 1] },\r
            { "value": 2.5, "color": [1, 0.3333, 0, 1] },\r
            { "value": 3, "color": [1, 0, 0, 1] }\r
        ]\r
    }\r
};\r
fdapi.hydrodynamic2d.addByTif(hydrodynamic2d_add);\r
//fdapi.hydrodynamic2d.focus('hdm_tif', 1000);\r
fdapi.camera.set(431187.23375, 4415879.210312, 48.861699, -31.722942, 40.740395, 0);\r
\`\`\`\r
`;export{r as default};
