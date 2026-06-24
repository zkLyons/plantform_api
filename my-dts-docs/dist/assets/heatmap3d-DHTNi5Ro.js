const r=`---\r
title: HeatMap3D\r
sidebar_label: HeatMap3D\r
description: "HeatMap3D 在三维空间内构建体热力图，支持空间图片、离散点、体素、稀疏体素等多种构建方式，以体积雾、体素、盒子或贴花等显示模式表达数据在三维空间中的分布与浓度。"\r
---\r
\r
# HeatMap3D\r
\r
HeatMap3D三维热力图相关的操作，三维热力图有以下几种构建方式：\r
\r
1、根据16张空间图片构建 addByImages()\r
\r
2、根据空间离散点和对应的热力值构建 addByHeatPoints()\r
\r
3、根据三维体素的热力值构建  addByVoxels()\r
\r
4、根据稀疏体素构建      addBySparseVoxels()\r
\r
HeatMap3D 效果图如下：\r
\r
\r
\r
![](/img/refdoc/api/HeatMap3D.gif)\r
\r
通过 \`api.heatmap3d\` 访问。\r
\r
---\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：HeatMap3D 在三维空间内构建体热力图，支持空间图片、离散点、体素、稀疏体素等多种构建方式，以体积雾、体素、盒子或贴花等显示模式表达数据在三维空间中的分布与浓度。\r
- **别名 / 不同行业叫法**：三维热力、体热力、空间热力图、体积热力、立体热区、浓度场。\r
- **适用行业**：应急管理、能源、海洋、智慧城市、国防军事、智慧水利。\r
- **使用场景**：\r
  - 应急行业：模拟有毒有害气体、烟雾、污染物在空间中的三维扩散浓度场。\r
  - 海洋 / 水利：温盐、流速、溶解氧等水体要素在不同深度的三维分布展示。\r
  - 能源 / 气象：风场、温度场、辐射强度等空间体数据的立体可视化。\r
- **注意事项**：\r
  - \`voxelShape\` 设为球体（Sphere）时构建非常耗时，体素数量大时建议使用盒子（Box）模式。\r
  - \`displayMode\` 为 0/1（体积雾/体素）时与全局剖切方法联动，模式 2（盒子）需自行传入 \`clipBox\`。\r
  - 体素分辨率（\`voxelSize\`/\`voxelGridSize\`）与纹理尺寸直接影响显存与性能，海量数据需控制规模。\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`addByHeatPoints\`](#addByHeatPoints) | 根据空间离散点和对应热力值构建三维热力图 |  |\r
| [\`addByImages\`](#addByImages) | 根据16张空间图片构建三维热力图 |  |\r
| [\`addBySparseVoxels\`](#addBySparseVoxels) | 根据稀疏体素构建三维热力图 |  |\r
| [\`addByTif\`](#addByTif) | 根据tif文件构建三维热力图 |  |\r
| [\`addByVoxels\`](#addByVoxels) | 根据纯热力值构建三维热力图 |  |\r
| [\`addHeatPoints\`](#addHeatPoints) | 动态往HeatMap3D对象内添加离散热力点， |  |\r
| [\`clear\`](#clear) | 清空场景中所有的HeatMap3D | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个HeatMap3D对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据ID获取HeatMap3D的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏HeatMap3D | 按业务条件隐藏对象 |\r
| [\`load\`](#load) | 预加载的三维热力图动画，包含多个Tif文件，加载后可以使用play()方法播放三维热力图… |  |\r
| [\`pause\`](#pause) | 暂停播放三维热力图动画 | 暂停播放 |\r
| [\`play\`](#play) | 播放预加载的三维热力图动画 | 播放动画/导览 |\r
| [\`queryVoxel\`](#queryVoxel) | 根据ID和坐标位置获取对应HeatMap3D对象包含体素块的详细信息 |  |\r
| [\`setDisplayMode\`](#setDisplayMode) | 设置三维热力图的显示模式 |  |\r
| [\`setTime\`](#setTime) | 从第几秒开始播放三维热力图动画 |  |\r
| [\`setViewportVisible\`](#setViewportVisible) | 设置HeatMap3D对象在进入多视口状态下视口可见性 |  |\r
| [\`show\`](#show) | 显示HeatMap3D | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改HeatMap3D | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`addByHeatPoints(data, fn)\` {#addByHeatPoints}\r
\r
根据空间离散点和对应热力值构建三维热力图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |\r
| \`displayMode\` | \`number\` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |\r
| \`brightness\` | \`number\` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |\r
| \`indices\` | \`array\` | 离散热力点坐标的索引；数组元素类型：(number)；取值示例：[2, 0, 3, 0, 2, 1]，注意：仅在voxelShape=2四面体模式下生效 |\r
| \`voxels\` | \`array\` | 离散热力点的坐标数组，包含热力点坐标、热力值影响半径(或盒子范围)、热力值和不透明度四个属性，结构示例：[&#123;"coordinate": [0,0,0],"radius": 5,"heatValue": 0.5,"alpha": 1&#125;] |\r
| \`voxels.coordinate\` | \`array\` | 离散热力点的坐标位置，示例：[x,y,z] |\r
| \`voxels.heatValue\` | \`array\` | 热力点对应的热力值，用于匹配colors参数的colorStops数组内颜色 |\r
| \`voxels.radius\` | \`number\` | 可选，二选一，热力点的半径，当voxelShape=0球体时生效 |\r
| \`voxels.extent\` | \`array\` | 可选，二选一，热力点的盒子范围，即长方体的长宽高：[xSize,ySize,zSize]，voxelShape=1盒子时生效 |\r
| \`voxels.alpha\` | \`number\` | 热力点不透明度 |\r
| \`voxelAlphaMode\` | \`number\` | 三维体素块透明模式，取值：[0,1]，0 : 使用色带colors的透明度值（默认值） 1 : 使用点的热力值在heatValueRange范围内按[0~1]线性插值生成alpha，注意：仅离散点构建时生效 |\r
| \`voxelShape\` | \`number\` | 三维体素块形状，取值：[0,1,2]，0 : Sphere球（注意体素设置为球时构建非常耗时） 1 : Box盒子（默认值） 2 : 四面体，注意：仅离散点构建时生效 |\r
| \`voxelSize\` | \`number\` | 三维体素块尺寸，支持仅传入Voxels和VoxelSize参数，则自动计算Bounds和TextureSize |\r
| \`voxelGridSize\` | \`array\` | 三维体素块网格尺寸，默认使用纹理尺寸，取值示例： [1,1,256] |\r
| \`textureSize\` | \`number\` | 纹理尺寸，取值范围：[128~512]，默认：128 |\r
| \`denoise\` | \`number\` | 降噪级别，取值范围：[0,1,2,3,4,5]，默认值：0 不做降噪；1~5 五级，注意：值越大添加越耗时 |\r
| \`bbox\` | \`array\` | 三维热力图的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`boundsColor\` | \`array\` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |\r
| \`volumeBoxLocation\` | \`array\` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxRotation\` | \`array\` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxSize\` | \`array\` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |\r
| \`heatValueMode\` | \`number\` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |\r
| \`heatValueRange\` | \`array\` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |\r
| \`blendMode\` | \`number\` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |\r
| \`colors\` | \`object\` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：AddByHeatPoints\r
\r
\`\`\`js\r
let bbox = [491066.28125, 2488747.75, 1, 491207.125, 2488888.5, 100];\r
\r
let pointsArr = [];\r
for (let i = 0; i < 1000; i++) {\r
\r
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX\r
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY\r
    let z = getRandNumBetween(bbox[2], bbox[5]);    //minZ ~ maxZ\r
\r
    let coordinate = [x, y, z];\r
    let heatValue = Math.random() * 100;\r
    let o = {\r
        "coordinate": coordinate,\r
        "extent": [1, 1, 1],\r
        // "radius": Math.random() * 5, //球体时生效\r
        "heatValue": heatValue\r
    };\r
    pointsArr.push(o);\r
}\r
\r
let indicesTemp = [];\r
for (let i = 0; i < 2000; i++) {\r
    indicesTemp.push(i)\r
}\r
\r
//添加前先删除\r
fdapi.heatmap3d.clear();\r
let heatmap3d = [{\r
    "id": "heatmap3d_byHeatPoints",\r
    "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果\r
    "brightness": 10,\r
    "volumeBoxLocation": [491353.46875, 2488833, 16],\r
    "heatValueMode": 0,\r
    "voxelAlphaMode": 0,\r
    "voxelShape": 1,\r
    "heatValueRange": [0, 100],\r
    "textureSize": 256,\r
    "denoise": 0,\r
    "colors": {\r
        "gradient": false,\r
        "invalidColor": [1, 1, 1, 1],//无效像素设置为完全透明\r
        "colorStops": [\r
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
        ]\r
    },\r
    "voxels": pointsArr,\r
    "indices": indicesTemp\r
}];\r
await fdapi.heatmap3d.addByHeatPoints(heatmap3d);\r
fdapi.heatmap3d.focus('heatmap3d_byHeatPoints', 50);\r
\`\`\`\r
\r
---\r
\r
### \`addByImages(data, fn)\` {#addByImages}\r
\r
根据16张空间图片构建三维热力图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |\r
| \`imagesArray\` | \`array\` | 二选一，16张1024*1024的空间热力图图片的路径，空间位置从低到高，参考示例代码，注意：仅空间图片构建时生效 |\r
| \`imageFiles\` | \`array\` | 二选一，构成空间热力图图片对象数组，每一个图片对象包含以下属性： |\r
| \`imageFiles.size\` | \`array\` | 图片尺寸 |\r
| \`imageFiles.images\` | \`array\` | 图片对象数组，每一个对象包含一下属性： |\r
| \`imageFiles.filePath\` | \`string\` | 图片文件路径 |\r
| \`imageFiles.minValue\` | \`number\` | 最小值 |\r
| \`imageFiles.maxValue\` | \`number\` | 最大值 |\r
| \`volumeBoxLocation\` | \`array\` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxRotation\` | \`array\` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`bbox\` | \`array\` | 三维热力图的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`boundsColor\` | \`array\` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |\r
| \`volumeBoxSize\` | \`array\` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |\r
| \`brightness\` | \`number\` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |\r
| \`displayMode\` | \`number\` | 显示模式，取值范围：[0,1,2,3] ，支持四类效果：0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |\r
| \`blendMode\` | \`number\` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |\r
| \`colors\` | \`object\` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：AddByImages\r
\r
\`\`\`js\r
//添加前先删除\r
fdapi.heatmap3d.clear();\r
//构造16张图片\r
let imagePathArr = [];\r
for (let i = 0; i < 16; i++) {\r
    let imageName = "LAY" + i + ".png";\r
    let imagePath = HostConfig.Path + "/assets/heatmap3d/" + imageName;\r
    imagePathArr.push(imagePath);\r
}\r
let heatmap3d = {\r
    id: "heatmap3d_byImages", //对象唯一id\r
    imagesArray: imagePathArr,//16张1024*1024的空间热力图图片的路径，空间位置从低到高\r
    volumeBoxLocation: [491616.6875, 2488984.75, 14.832968711853027], //三维热力图坐标位置\r
    volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转\r
    volumeBoxSize: [100, 100, 100], //三维热力图盒范围\r
    boundsColor: [0, 1, 0, 1],//三维热力图盒线框颜色\r
    brightness: 1, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明\r
    displayMode: 1 //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果\r
};\r
await fdapi.heatmap3d.addByImages(heatmap3d);\r
fdapi.heatmap3d.focus('heatmap3d_byImages');\r
\`\`\`\r
\r
---\r
\r
### \`addBySparseVoxels(data, fn)\` {#addBySparseVoxels}\r
\r
根据稀疏体素构建三维热力图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |\r
| \`sparseVoxels\` | \`object\` | ) 稀疏类型体素构建三维热力对象 |\r
| \`sparseVoxels.voxels\` | \`array\` | 稀疏体素数组 |\r
| \`sparseVoxels.voxel\` | \`array\` | 稀疏体素纹理坐标索引，取值类型：[i,j,k]，i、j、k均需要小于体素尺寸size |\r
| \`sparseVoxels.value\` | \`number\` | 纹理坐标对应的值 |\r
| \`sparseVoxels.data\` | \`string\` | 用户自定义数据 |\r
| \`sparseVoxels.size\` | \`array\` | 稀疏体素的纹理坐标[i,j,k]的最大值，取值示例：[256,256,256]，即i、j、k的最大值为256 |\r
| \`displayMode\` | \`number\` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |\r
| \`brightness\` | \`number\` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |\r
| \`bbox\` | \`array\` | 三维热力图的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`boundsColor\` | \`array\` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |\r
| \`volumeBoxLocation\` | \`array\` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxRotation\` | \`array\` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxSize\` | \`array\` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |\r
| \`voxelAlphaMode\` | \`number\` | 三维体素块透明模式，取值：[0,1]，0 : 使用色带colors的透明度值（默认值） 1 : 使用点的热力值在heatValueRange范围内按[0~1]线性插值生成alpha，注意：仅离散点构建时生效 |\r
| \`voxelShape\` | \`number\` | 三维体素块形状，取值：[0,1,2]，0 : Sphere球（注意体素设置为球时构建非常耗时） 1 : Box盒子（默认值） 2 : 四面体，注意：仅离散点构建时生效 |\r
| \`blendMode\` | \`number\` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |\r
| \`heatValueMode\` | \`number\` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |\r
| \`heatValueRange\` | \`array\` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |\r
| \`colors\` | \`object\` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：AddBySparseVoxels\r
\r
\`\`\`js\r
fdapi.heatmap3d.clear();\r
\r
let voxels = [];\r
for (let i = 0; i < 2000; i++) {\r
    let heatValue = Math.random() * 100;\r
\r
    let a = Math.round(Math.random() * 256);\r
    let b = Math.round(Math.random() * 256);\r
    let c = Math.round(Math.random() * 256);\r
    let o = {\r
        voxel: [a, b, c],\r
        value: heatValue,\r
        data: "abc" //用户自定义数据\r
    }\r
    voxels.push(o);\r
}\r
\r
let heatmap3d = {\r
    id: "heatmap3dBySparseVoxels", //对象唯一id\r
    sparseVoxels:\r
    {\r
        voxels: voxels,\r
        size: [256, 256, 256]\r
    },\r
    volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转\r
    volumeBoxLocation: [493041.969375, 2492117.6, 2.313291015625],\r
    volumeBoxSize: [256, 256, 256],\r
    brightness: 10, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明\r
    displayMode: 1, //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果\r
    voxelAlphaMode: 1,\r
    heatValueRange: [0, 68],\r
    colors: {\r
        gradient: true,\r
        invalidColor: [1, 0, 0, 1],\r
        colorStops: [{\r
            value: 0,\r
            color: [1, 0, 0, 1]\r
        }, {\r
            value: 0.2,\r
            color: [1, 1, 1, 1]\r
        }, {\r
            value: 0.4,\r
            color: [1, 1, 1, 0.6]\r
        }, {\r
            value: 0.6,\r
            color: [1, 1, 1, 0.6]\r
        }, {\r
            value: 0.8,\r
            color: [0, 1, 1, 1]\r
        }]\r
    },\r
};\r
await fdapi.heatmap3d.addBySparseVoxels(heatmap3d);\r
fdapi.heatmap3d.focus('heatmap3dBySparseVoxels', 10);\r
\`\`\`\r
\r
---\r
\r
### \`addByTif(data, fn)\` {#addByTif}\r
\r
根据tif文件构建三维热力图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |\r
| \`tifFiles\` | \`object\` | 生成三维热力图的tif文件对象属性如下： |\r
| \`tifFiles.files\` | \`array\` | 二进制文件路径数组，示例：["D:\\\\xxx1.tif","D:\\\\xxx2.tif","D:\\\\xxx3.tif"...] |\r
| \`tifFiles.size\` | \`array\` | 可选，纹理分辨率，注意：纹理尺寸不能超过2048，最大值示例：[2048,2048] |\r
| \`tifFiles.needProject\` | \`boolean\` | 是否需要重投影 |\r
| \`tifFiles.minHeight\` | \`number\` | 可选，最小高度 |\r
| \`tifFiles.maxHeight\` | \`number\` | 可选，最大高度 |\r
| \`brightness\` | \`number\` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |\r
| \`displayMode\` | \`number\` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |\r
| \`clipBox\` | \`array\` | 三维热力图盒子剖切的bbox范围，取值格式示例：[minX,minY,minZ,maxX,maxY,maxZ]，元素取值范围：[0~volumeBoxSize] |\r
| \`clipVoxel\` | \`boolean\` | 三维热力图执行盒子剖切时是否裁切体素(displayMode:1)，默认值：true |\r
| \`volumeBoxLocation\` | \`array\` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxRotation\` | \`array\` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxSize\` | \`array\` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |\r
| \`voxelGridSize\` | \`array\` | 三维体素块网格尺寸，默认使用纹理尺寸，取值示例： [1,1,256] |\r
| \`voxelAlphaMode\` | \`number\` | 三维体素块透明模式，取值：[0,1]，0 : 使用色带colors的透明度值（默认值） 1 : 使用点的热力值在heatValueRange范围内按[0~1]线性插值生成alpha，注意：仅离散点构建时生效 |\r
| \`voxelShape\` | \`number\` | 三维体素块形状，取值：[0,1,2]，0 : Sphere球（注意体素设置为球时构建非常耗时） 1 : Box盒子（默认值） 2 : 四面体，注意：仅离散点构建时生效 |\r
| \`boundsColor\` | \`array\` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |\r
| \`heatValueMode\` | \`number\` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |\r
| \`heatValueRange\` | \`array\` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |\r
| \`textureSize\` | \`number\` | 纹理尺寸，取值范围：[128~512]，默认：128 |\r
| \`blendMode\` | \`number\` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |\r
| \`opacityMaskClip\` | \`number\` | 三维热力图clipbox剖切支持的透明度阈值，色带colors参数内配置的颜色透明度值如果大于此值则进行剖切 |\r
| \`colors\` | \`object\` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
| \`billboards\` | \`object\` | 三维热力图对象始终朝向相机（广告牌效果），仅体素模式下displayMode=1生效，包含参数如下： |\r
| \`billboards.scale\` | \`number\` | 可选，面向屏幕的缩放值 |\r
| \`billboards.size\` | \`array\` | 可选，XYZ方向分层的数量，默认值：[128,128,32] |\r
| \`billboards.crop\` | \`boolean\` | 可选，是否对填充范围进行缩放后的溢出部分进行裁切，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap3d.addByTif(data);\r
\`\`\`\r
\r
---\r
\r
### \`addByVoxels(data, fn)\` {#addByVoxels}\r
\r
根据纯热力值构建三维热力图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`updateTime\` | \`number\` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |\r
| \`displayMode\` | \`number\` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |\r
| \`brightness\` | \`number\` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |\r
| \`bbox\` | \`array\` | 三维热力图的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |\r
| \`boundsColor\` | \`array\` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |\r
| \`volumeBoxLocation\` | \`array\` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxRotation\` | \`array\` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`volumeBoxSize\` | \`array\` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |\r
| \`heatValueMode\` | \`number\` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |\r
| \`heatValueRange\` | \`array\` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |\r
| \`blendMode\` | \`number\` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |\r
| \`heatValues\` | \`object\` | 构建三维热力图的热力值对象，注意：此参数需要根据纯热力值构建 |\r
| \`heatValues.size\` | \`array\` | 体素尺寸，取值示例：[x, y, z]，x*y*z就是包含的热力值数量，即values数组的长度等于x*y*z |\r
| \`heatValues.values\` | \`array\` | 体素的热力值，数组长度需要等于x*y*z。注意：如果某个体素的值不在heatValueRange范围内则属于无效体素不做渲染。 |\r
| \`heatValues.alphas\` | \`array\` | 可选参数，透明度数组，不传则默认使用colors的透明度 |\r
| \`colors\` | \`object\` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：AddByVoxels\r
\r
\`\`\`js\r
//随机生成10*10*10个热力值\r
let heatValueArr = [];\r
for (let i = 0; i < 1000; i++) {\r
    let heatValue = getRandNumBetween(0, 100);\r
    heatValueArr.push(heatValue);\r
}\r
//添加空间体素的热力值构建heatmap3d对象（纯热力值构建）\r
fdapi.heatmap3d.clear();\r
let heatmap3d = [{\r
    "id": "heatmap3d_byHeatValues",\r
    "displayMode": 1,\r
    "brightness": 0.5,\r
    "volumeBoxLocation": [491353.46875, 2488833, 16],\r
    "volumeBoxSize": [500, 500, 300],\r
    "heatValueRange": [0, 68],\r
    "heatValues": {\r
        "size": [10, 10, 10],//相乘结果就是包含的热力值数量1000\r
        "values": heatValueArr,\r
        "alphas": []\r
    },\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [1, 1, 1, 1],\r
        "colorStops": [\r
            {\r
                "value": 0,\r
                "color": [0, 0, 1, 1]\r
            }, {\r
                "value": 10.001801,\r
                "color": [0, 0, 1, 1]\r
            },\r
            {\r
                "value": 20.003603,\r
                "color": [0, 0.4, 1, 1]\r
            },\r
            {\r
                "value": 30.005404,\r
                "color": [0, 0.8, 1, 1]\r
            },\r
            {\r
                "value": 40.007206,\r
                "color": [0, 1, 0.8, 1]\r
            },\r
            {\r
                "value": 50.009007,\r
                "color": [0, 1, 0.4, 1]\r
            },\r
            {\r
                "value": 60.01081,\r
                "color": [0, 1, 0, 1]\r
            },\r
\r
            {\r
                "value": 70.01261,\r
                "color": [0, 1, 0, 1]\r
            },\r
            {\r
                "value": 80.01441,\r
                "color": [0.4, 1, 0, 1]\r
            },\r
            {\r
                "value": 90,\r
                "color": [0.8, 1, 0, 1]\r
            },\r
\r
            {\r
                "value": 93,\r
                "color": [1, 0, 0, 1]\r
            },\r
            {\r
                "value": 96.01902,\r
                "color": [1, 0, 0, 1]\r
            },\r
            {\r
                "value": 100.02162,\r
                "color": [1, 0, 0, 1]\r
            }\r
        ]\r
    }\r
}];\r
await fdapi.heatmap3d.addByVoxels(heatmap3d);\r
fdapi.heatmap3d.focus('heatmap3d_byHeatValues');\r
\`\`\`\r
\r
---\r
\r
### \`addHeatPoints(data, fn)\` {#addHeatPoints}\r
\r
动态往HeatMap3D对象内添加离散热力点，注意：仅支持空间离散点构造方法addByHeatPoints()\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | Voxel对象或对象数组，对于每个对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`voxels\` | \`array\` | 离散热力点信息坐标数组，包含热力点坐标、热力值影响半径（或盒子范围）、热力值和不透明度等属性，结构示例：[&#123;"coordinate": [0,0,0],"radius": 5,"heatValue": 0.5,"alpha": 1&#125;] |\r
| \`voxels.coordinate\` | \`array\` | 热力点的坐标位置，示例：[x,y,z] |\r
| \`voxels.heatValue\` | \`array\` | 热力点对应的热力值 |\r
| \`voxels.radius\` | \`number\` | 可选，热力点的半径，当voxelShape=0球体时生效 |\r
| \`voxels.extent\` | \`array\` | 可选，热力点的盒子范围，即长方体的长宽高：[xSize,ySize,zSize]，voxelShape=1盒子时生效 |\r
| \`voxels.alpha\` | \`number\` | 热力点不透明度 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
参数结构示例\r
[\r
            {\r
                "id": "heatmap3d_v1",\r
                "voxels": [\r
                    {\r
                        "coordinate": [\r
                            -1121,\r
                            89,\r
                            75\r
                        ],\r
                        "radius": 50,\r
                        //"extent": [2,2,2],\r
                        "heatValue": 0.0234818,\r
                        "alpha": 1\r
                    },\r
                    {\r
                        "coordinate": [\r
                            -1121,\r
                            89,\r
                            75\r
                        ],\r
                        "radius": 50,\r
                        //"extent": [2,2,2],\r
                        "heatValue": 0.0234818,\r
                        "alpha": 1\r
                    }\r
                ]\r
            },\r
            {\r
                "id": "heatmap3d_v2",\r
                "voxels": [\r
                    {\r
                        "coordinate": [\r
                            -1121,\r
                            89,\r
                            75\r
                        ],\r
                        "radius": 50,\r
                        //"extent": [2,2,2],\r
                        "heatValue": 0.0234818,\r
                        "alpha": 1\r
                    },\r
                    {\r
                        "coordinate": [\r
                            -1121,\r
                            89,\r
                            75\r
                        ],\r
                        "radius": 50,\r
                        //"extent": [2,2,2],\r
                        "heatValue": 0.0234818,\r
                        "alpha": 1\r
                    }\r
                ]\r
            }\r
        ]\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的HeatMap3D\r
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
fdapi.heatmap3d.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个HeatMap3D对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的HeatMap3D对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.heatmap3d.delete('heatmap3d_byImages');\r
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
| \`ids\` | \`string \\| array\` | HeatMap3D对象的ID或者ID数组 |\r
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
fdapi.heatmap3d.focus('heatmap3d_byImages', 100);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取HeatMap3D的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的HeatMap3D对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
HeatMap3D的详细信息\r
[{\r
            "id":   "heatmap3d",\r
            "groupId":  "",\r
            "userData": "",\r
            "imagesArray":  [\r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY0.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY1.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY2.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY3.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY4.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY5.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY6.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY7.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY8.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY9.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY10.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY11.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY12.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY13.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY14.png", \r
                "D:\\\\Aircity_workspace\\\\dev\\\\SDK\\\\JS/media/heatmap3d/LAY15.png"\r
            ],\r
            "volumeBoxLocation":    [1057.934937, 2643.727539, 5.702500],\r
            "volumeBoxRotation":    [0.000000, 0.000000, 0.000000],\r
            "volumeBoxSize":    [100.000000, 100.000000, 100.000000],\r
            "displayMode":  0\r
        }]\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.heatmap3d.get('heatmap3d_byImages');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏HeatMap3D\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | HeatMap3D对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.heatmap3d.hide('heatmap3d_byImages');\r
\`\`\`\r
\r
---\r
\r
### \`load(data, fn)\` {#load}\r
\r
预加载的三维热力图动画，包含多个Tif文件，加载后可以使用play()方法播放三维热力图动画。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 字符串类型的ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`tifAnimation\` | \`object\` | 生成三维热力图的tif文件对象属性如下： |\r
| \`tifAnimation.minHeight\` | \`number\` | 最小高度 |\r
| \`tifAnimation.maxHeight\` | \`number\` | 最大高度 |\r
| \`tifAnimation.totalSeconds\` | \`number\` | 动画播放默认的总时长，单位：秒 |\r
| \`tifAnimation.time\` | \`number\` | 从第几秒开始播放，默认值：0 |\r
| \`tifAnimation.files\` | \`array\` | tif文件路径二维数组，结构示例：[["D:\\\\Time0_1.tif","D:\\\\Time0_2.tif"],["D:\\\\Time1_1.tif","D:\\\\Time1_2.tif"]...] ，注意：tif文件纹理尺寸不能超过8192，最大值示例：[8192,8192] |\r
| \`brightness\` | \`number\` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |\r
| \`displayMode\` | \`number\` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |\r
| \`heatValueMode\` | \`number\` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |\r
| \`heatValueRange\` | \`array\` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |\r
| \`voxelAlphaMode\` | \`number\` | 三维体素块透明模式，取值：[0,1]，0 : 使用色带colors的透明度值（默认值） 1 : 使用点的热力值在heatValueRange范围内按[0~1]线性插值生成alpha，注意：仅离散点构建时生效 |\r
| \`voxelGridSize\` | \`array\` | 三维体素块网格尺寸，默认使用纹理尺寸，取值示例： [1,1,256] |\r
| \`textureSize\` | \`number\` | 纹理尺寸，取值范围：[128~512]，默认：128 |\r
| \`blendMode\` | \`number\` | 各图层之间的混合模式，取值范围：[0,1] |\r
| \`colors\` | \`object\` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Load\r
\r
\`\`\`js\r
let path = HostConfig.Path + "\\\\assets\\\\tif\\\\time0\\\\";\r
fdapi.heatmap3d.clear();\r
let heatmap3d = {\r
    "id": "heatmap3d-anima",\r
    "textureSize": 512,\r
    "brightness": 1,\r
    "displayMode": 1,\r
    "heatValueMode": 0,\r
    "blendMode": 1,\r
    "voxelGridSize": [\r
        1,\r
        1,\r
        128\r
    ],\r
    "voxelAlphaMode": 0,\r
    "alphaMode": 0,\r
    "heatValueRange": [\r
        268,\r
        307\r
    ],\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [\r
            0,\r
            0,\r
            0,\r
            0\r
        ],\r
        "colorStops": [\r
            {\r
                "value": 268,\r
                "color": [\r
                    0.1843137254901961,\r
                    0.30980392156862746,\r
                    0.30980392156862746,\r
                    0.5254901960784314\r
                ]\r
            },\r
            {\r
                "value": 268.64,\r
                "color": [\r
                    0.4117647058823529,\r
                    0.4117647058823529,\r
                    0.4117647058823529,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 269.28,\r
                "color": [\r
                    0.4666666666666667,\r
                    0.5333333333333333,\r
                    0.6,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 269.92,\r
                "color": [\r
                    0.9411764705882353,\r
                    1,\r
                    0.9411764705882353,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 270.56,\r
                "color": [\r
                    0.7568627450980392,\r
                    0.803921568627451,\r
                    0.7568627450980392,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 271.2,\r
                "color": [\r
                    0.10588235294117647,\r
                    0.043137254901960784,\r
                    0.5098039215686274,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 271.84,\r
                "color": [\r
                    0.11764705882352941,\r
                    0.20784313725490197,\r
                    0.7254901960784313,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 272.48,\r
                "color": [\r
                    0.11764705882352941,\r
                    0.5647058823529412,\r
                    1,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 273.11,\r
                "color": [\r
                    0.09411764705882353,\r
                    0.4549019607843137,\r
                    0.803921568627451,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 273.75,\r
                "color": [\r
                    0.41568627450980394,\r
                    0.35294117647058826,\r
                    0.803921568627451,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 274.39,\r
                "color": [\r
                    0.5411764705882353,\r
                    0.16862745098039217,\r
                    0.8862745098039215,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 275.03,\r
                "color": [\r
                    0.5803921568627451,\r
                    0,\r
                    0.8274509803921568,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 275.67,\r
                "color": [\r
                    0.6078431372549019,\r
                    0.18823529411764706,\r
                    1,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 276.31,\r
                "color": [\r
                    0.5686274509803921,\r
                    0.17254901960784313,\r
                    0.9333333333333333,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 276.95,\r
                "color": [\r
                    0.5176470588235295,\r
                    0.4392156862745098,\r
                    1,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 277.59,\r
                "color": [\r
                    1,\r
                    0.8823529411764706,\r
                    1,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 278.23,\r
                "color": [\r
                    0.803921568627451,\r
                    0.7098039215686275,\r
                    0.803921568627451,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 278.87,\r
                "color": [\r
                    1,\r
                    0.8549019607843137,\r
                    0.7254901960784313,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 279.51,\r
                "color": [\r
                    1,\r
                    0.9803921568627451,\r
                    0.803921568627451,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 280.15,\r
                "color": [\r
                    0.803921568627451,\r
                    0.788235294117647,\r
                    0.6470588235294118,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 280.79,\r
                "color": [\r
                    0.050980392156862744,\r
                    0.396078431372549,\r
                    0.611764705882353,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 281.43,\r
                "color": [\r
                    0.47843137254901963,\r
                    0.9254901960784314,\r
                    0.9254901960784314,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 282.07,\r
                "color": [\r
                    0.08235294117647059,\r
                    0.6470588235294118,\r
                    0.7568627450980392,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 282.7,\r
                "color": [\r
                    0,\r
                    0.7490196078431373,\r
                    1,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 283.34,\r
                "color": [\r
                    0,\r
                    0.807843137254902,\r
                    0.8196078431372549,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 283.98,\r
                "color": [\r
                    0.2823529411764706,\r
                    0.8196078431372549,\r
                    0.8,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 284.62,\r
                "color": [\r
                    0.4980392156862745,\r
                    1,\r
                    0.8313725490196079,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 285.26,\r
                "color": [\r
                    0,\r
                    1,\r
                    0.4980392156862745,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 285.9,\r
                "color": [\r
                    0.4,\r
                    0.803921568627451,\r
                    0.6666666666666666,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 286.54,\r
                "color": [\r
                    0,\r
                    0.803921568627451,\r
                    0.4,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 287.18,\r
                "color": [\r
                    0.5647058823529412,\r
                    0.9333333333333333,\r
                    0.5647058823529412,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 287.82,\r
                "color": [\r
                    0.7529411764705882,\r
                    1,\r
                    0.24313725490196078,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 288.46,\r
                "color": [\r
                    0.6039215686274509,\r
                    0.803921568627451,\r
                    0.19607843137254902,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 289.1,\r
                "color": [\r
                    0.07450980392156863,\r
                    0.6588235294117647,\r
                    0.32941176470588235,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 289.74,\r
                "color": [\r
                    0.2235294117647059,\r
                    0.8431372549019608,\r
                    0.050980392156862744,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 290.38,\r
                "color": [\r
                    0.7607843137254902,\r
                    0.7019607843137254,\r
                    0.047058823529411764,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 291.02,\r
                "color": [\r
                    1,\r
                    1,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 291.66,\r
                "color": [\r
                    1,\r
                    0.8431372549019608,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 292.3,\r
                "color": [\r
                    0.803921568627451,\r
                    0.803921568627451,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 292.93,\r
                "color": [\r
                    1,\r
                    0.6470588235294118,\r
                    0.30980392156862746,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 293.57,\r
                "color": [\r
                    1,\r
                    0.4980392156862745,\r
                    0.1411764705882353,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 294.21,\r
                "color": [\r
                    1,\r
                    0.6470588235294118,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 294.85,\r
                "color": [\r
                    1,\r
                    0.4980392156862745,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 295.49,\r
                "color": [\r
                    0.792156862745098,\r
                    0.4588235294117647,\r
                    0.027450980392156862,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 296.13,\r
                "color": [\r
                    1,\r
                    0.4470588235294118,\r
                    0.33725490196078434,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 296.77,\r
                "color": [\r
                    1,\r
                    0.38823529411764707,\r
                    0.2784313725490196,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 297.41,\r
                "color": [\r
                    1,\r
                    0.41568627450980394,\r
                    0.41568627450980394,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 298.05,\r
                "color": [\r
                    0.803921568627451,\r
                    0.3333333333333333,\r
                    0.3333333333333333,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 298.69,\r
                "color": [\r
                    1,\r
                    0.0784313725490196,\r
                    0.5764705882352941,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 299.33,\r
                "color": [\r
                    1,\r
                    0,\r
                    0.592156862745098,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 299.97,\r
                "color": [\r
                    1,\r
                    0.43137254901960786,\r
                    0.7058823529411765,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 300.61,\r
                "color": [\r
                    1,\r
                    0.2784313725490196,\r
                    0.4666666666666667,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 301.25,\r
                "color": [\r
                    0.8588235294117647,\r
                    0.35294117647058826,\r
                    0.4196078431372549,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 301.89,\r
                "color": [\r
                    0.788235294117647,\r
                    0.21568627450980393,\r
                    0.33725490196078434,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 302.52,\r
                "color": [\r
                    0.7843137254901961,\r
                    0.23529411764705882,\r
                    0.13725490196078433,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 303.16,\r
                "color": [\r
                    0.8745098039215686,\r
                    0.29411764705882354,\r
                    0.047058823529411764,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 303.8,\r
                "color": [\r
                    0.9333333333333333,\r
                    0.25098039215686274,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 304.44,\r
                "color": [\r
                    1,\r
                    0.27058823529411763,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 305.08,\r
                "color": [\r
                    0.8784313725490196,\r
                    0.011764705882352941,\r
                    0.011764705882352941,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 305.72,\r
                "color": [\r
                    0.6352941176470588,\r
                    0.12549019607843137,\r
                    0.2549019607843137,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 307,\r
                "color": [\r
                    0.9490196078431372,\r
                    0.047058823529411764,\r
                    0,\r
                    1\r
                ]\r
            }\r
        ]\r
    },\r
    "tifAnimation": {\r
        "files": [\r
            [path + "isobaricInhPa1/p_time0_isobaricInhPa1.tif", path + "isobaricInhPa2/p_time0_isobaricInhPa2.tif", path + "isobaricInhPa3/p_time0_isobaricInhPa3.tif"],\r
            [path + "isobaricInhPa4/p_time0_isobaricInhPa4.tif", path + "isobaricInhPa5/p_time0_isobaricInhPa5.tif", path + "isobaricInhPa6/p_time0_isobaricInhPa6.tif"],\r
            [path + "isobaricInhPa7/p_time0_isobaricInhPa7.tif", path + "isobaricInhPa8/p_time0_isobaricInhPa8.tif", path + "isobaricInhPa9/p_time0_isobaricInhPa9.tif"],\r
            [path + "isobaricInhPa10/p_time0_isobaricInhPa10.tif", path + "isobaricInhPa11/p_time0_isobaricInhPa11.tif", path + "isobaricInhPa12/p_time0_isobaricInhPa12.tif"],\r
            [path + "isobaricInhPa13/p_time0_isobaricInhPa13.tif", path + "isobaricInhPa14/p_time0_isobaricInhPa14.tif", path + "isobaricInhPa15/p_time0_isobaricInhPa15.tif"],\r
            [path + "isobaricInhPa16/p_time0_isobaricInhPa16.tif", path + "isobaricInhPa17/p_time0_isobaricInhPa17.tif", path + "isobaricInhPa18/p_time0_isobaricInhPa18.tif"],\r
            [path + "isobaricInhPa19/p_time0_isobaricInhPa19.tif", path + "isobaricInhPa20/p_time0_isobaricInhPa20.tif", path + "isobaricInhPa21/p_time0_isobaricInhPa21.tif"],\r
            [path + "isobaricInhPa22/p_time0_isobaricInhPa22.tif", path + "isobaricInhPa23/p_time0_isobaricInhPa23.tif", path + "isobaricInhPa24/p_time0_isobaricInhPa24.tif"],\r
            [path + "isobaricInhPa25/p_time0_isobaricInhPa25.tif", path + "isobaricInhPa26/p_time0_isobaricInhPa26.tif", path + "isobaricInhPa27/p_time0_isobaricInhPa27.tif"],\r
            [path + "isobaricInhPa28/p_time0_isobaricInhPa28.tif", path + "isobaricInhPa29/p_time0_isobaricInhPa29.tif", path + "isobaricInhPa30/p_time0_isobaricInhPa30.tif"],\r
            [path + "isobaricInhPa31/p_time0_isobaricInhPa31.tif", path + "isobaricInhPa32/p_time0_isobaricInhPa32.tif", path + "isobaricInhPa33/p_time0_isobaricInhPa33.tif"],\r
            [path + "isobaricInhPa34/p_time0_isobaricInhPa34.tif", path + "isobaricInhPa35/p_time0_isobaricInhPa35.tif", path + "isobaricInhPa36/p_time0_isobaricInhPa36.tif"]\r
        ],\r
        "minHeight": 0,\r
        "maxHeight": 1000000,\r
        "totalSeconds": 10\r
    }\r
}\r
fdapi.heatmap3d.load(heatmap3d);\r
fdapi.camera.set(8687397.494102, 8426718.222344, 10390890.88, -62.999722, 33.423145, 0);\r
\`\`\`\r
\r
---\r
\r
### \`pause(id, fn)\` {#pause}\r
\r
暂停播放三维热力图动画\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap3D对象的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Pause\r
\r
\`\`\`js\r
fdapi.heatmap3d.pause("heatmap3d-anima");\r
\`\`\`\r
\r
---\r
\r
### \`play(id, fn)\` {#play}\r
\r
播放预加载的三维热力图动画\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap3D对象的ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Play\r
\r
\`\`\`js\r
fdapi.heatmap3d.play("heatmap3d-anima");\r
\`\`\`\r
\r
---\r
\r
### \`queryVoxel(id, coordinate, fn)\` {#queryVoxel}\r
\r
根据ID和坐标位置获取对应HeatMap3D对象包含体素块的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap3D对象ID |\r
| \`coordinate\` | \`array\` | 坐标位置 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：QueryVoxel\r
\r
\`\`\`js\r
//使用稀疏体素的贴画模式构建 再根据点击的坐标查询 \r
fdapi.heatmap3d.queryVoxel('heatmap3dBySparseVoxels', [493071.401875, 2492076.96, 2.313291015625]);\r
\`\`\`\r
\r
---\r
\r
### \`setDisplayMode(id, displayMode, fn)\` {#setDisplayMode}\r
\r
设置三维热力图的显示模式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`any\` | HeatMap3D的ID |\r
| \`displayMode\` | \`array\` | 显示模式，取值范围：0是VolumeFog,1是InstanceMesh,2是Box |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.heatmap3d.setDisplayMode(id, displayMode);\r
\`\`\`\r
\r
---\r
\r
### \`setTime(id, startTime, fn)\` {#setTime}\r
\r
从第几秒开始播放三维热力图动画\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap3D对象的ID |\r
| \`startTime\` | \`number\` | 可选，从第几秒开始播放，默认值：0秒 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetTime\r
\r
\`\`\`js\r
fdapi.heatmap3d.setTime("heatmap3d-anima", 5);\r
\`\`\`\r
\r
---\r
\r
### \`setViewportVisible(id, vp, fn)\` {#setViewportVisible}\r
\r
设置HeatMap3D对象在进入多视口状态下视口可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | HeatMap3D对象ID |\r
| \`vp\` | [\`Viewport\`](/docs/api/types#viewport) | 视口掩码（Viewport位运算） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetViewportVisible\r
\r
\`\`\`js\r
//视口布局类型，取值范围：[1~7]\r
let viewportMode = 5;\r
//可选参数，激活后视口边框线的颜色\r
let lineColor = "#FFFFFF";\r
//可选参数，激活后视口边框线的宽度，单位：像素px\r
let lineSize = 2;\r
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);\r
\r
//设置1和3视口可见\r
fdapi.heatmap3d.setViewportVisible('heatmap3d_byHeatPoints', Viewport.V1 | Viewport.V3);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示HeatMap3D\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | HeatMap3D对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.heatmap3d.show('heatmap3d_byImages');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改HeatMap3D\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | HeatMap3D对象或数组，参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
//构造16张图片\r
let imagePathArr = [];\r
for (let i = 0; i < 16; i++) {\r
    let imageName = "LAY" + i + ".png";\r
    let imagePath = HostConfig.Path + "/assets/heatmap3d/" + imageName;\r
    imagePathArr.push(imagePath);\r
}\r
let heatmap3d_for_update = {\r
    id: "heatmap3d_byImages", //对象唯一id\r
    imagesArray: imagePathArr,//16张1024*1024的空间热力图图片的路径，空间位置从低到高\r
    volumeBoxLocation: [491616.6875, 2488984.75, 14.832968711853027], //三维热力图坐标位置\r
    volumeBoxRotation: [0, 90, 0], //三维热力图坐标旋转\r
    volumeBoxSize: [100, 100, 150], //三维热力图盒范围\r
    brightness: 1, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明\r
    displayMode: 1 //显示模式\r
};\r
await fdapi.heatmap3d.update(heatmap3d_for_update);\r
fdapi.heatmap3d.focus('heatmap3d_byImages');\r
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
await fdapi.heatmap3d.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> AddHeatPointsToBox\r
\r
\`\`\`js\r
//包围盒\r
let bbox = [491066.28125, 2488747.75, 0, 491207.125, 2488888.5, 500];\r
\r
//添加前先删除\r
fdapi.heatmap3d.clear();\r
//创建空白的盒子范围 往盒子里添加体素块\r
let heatmap3d = [{\r
    "id": "heatmap3d_byVolumeBox",\r
    "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果\r
    "brightness": 10,\r
    "volumeBoxLocation": [491353.46875, 2488833, 20],\r
    "volumeBoxSize": [800, 800, 500],\r
    "heatValueMode": 0,\r
    "voxelAlphaMode": 0,\r
    "voxelGridSize": [256, 256, 256],\r
    "voxelShape": 1, // 0是圆球 1是盒子 \r
    "heatValueRange": [0, 100],\r
    "textureSize": 256,\r
    "denoise": 0,\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [1, 1, 1, 1],//无效像素设置为完全透明\r
        "colorStops": [\r
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
        ]\r
    }\r
}];\r
await fdapi.heatmap3d.add(heatmap3d);\r
fdapi.heatmap3d.focus('heatmap3d_byVolumeBox', 200);\r
\r
//往空白盒子添加100个体素块\r
let voxelsArr = {\r
    "id": "heatmap3d_byVolumeBox",\r
    "voxels": []\r
};\r
for (let i = 0; i < 10; i++) {\r
\r
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX\r
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY\r
    let z = getRandNumBetween(bbox[2], bbox[5]);    //minZ ~ maxZ\r
    let coordinate = [x, y, z];\r
    let heatValue = Math.random() * 100;\r
    let voxel = {\r
        "coordinate": coordinate,\r
        "extent": [8, 8, 8],\r
        // "radius": Math.random() * 5, //球体时生效\r
        "heatValue": heatValue,\r
        "alpha": 1\r
    };\r
    voxelsArr.voxels.push(voxel);\r
}\r
//往heatmap3d对象添加三维像素块\r
await fdapi.heatmap3d.addHeatPoints(voxelsArr);\r
\`\`\`\r
\r
> AddVoxels\r
\r
\`\`\`js\r
let bbox = [491066.28125, 2488747.75, 1, 491207.125, 2488888.5, 100];\r
\r
let voxelsArr = [{\r
    "id": "heatmap3d_byVolumePoints",\r
    "voxels": [\r
        {\r
            "coordinate": [\r
                getRandNumBetween(bbox[0], bbox[3]),\r
                getRandNumBetween(bbox[1], bbox[4]),\r
                getRandNumBetween(bbox[2], bbox[5])\r
            ],\r
            "radius": 50,\r
            "heatValue": 80,\r
            "alpha": 1\r
        },\r
        {\r
            "coordinate": [\r
                getRandNumBetween(bbox[0], bbox[3]),\r
                getRandNumBetween(bbox[1], bbox[4]),\r
                getRandNumBetween(bbox[2], bbox[5])\r
            ],\r
            "radius": 50,\r
            "heatValue": 20,\r
            "alpha": 1\r
        }\r
    ]\r
}];\r
//往heatmap3d对象添加三维像素块\r
await fdapi.heatmap3d.addVoxels(voxelsArr);\r
\`\`\`\r
\r
> ClipTest\r
\r
\`\`\`js\r
//定时器进行动态剖切\r
let heatmap3d_for_update = {\r
    id: "heatmap3d_byVolumePoints", //对象唯一id\r
    clipBox: [0, 0, 1, 500, 500, 100],//剖切盒子范围 注意：仅对displayMode=2盒子模式下生效\r
};\r
\r
let index = 0;\r
let timer = setInterval(async () => {\r
    index++;\r
    if (index < 10) {\r
        let box = [0, 0, 0, 500, 500, 100 - 10 * index];\r
        heatmap3d_for_update.clipBox = box;\r
        await fdapi.heatmap3d.update(heatmap3d_for_update);\r
    } else {\r
        //清除定时器\r
        clearInterval(timer);\r
    }\r
}, 1000);\r
\`\`\`\r
`;export{r as default};
