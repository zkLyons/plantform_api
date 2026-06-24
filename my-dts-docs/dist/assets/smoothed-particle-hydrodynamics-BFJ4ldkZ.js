const r=`---\r
title: SmoothedParticleHydrodynamics\r
sidebar_label: SmoothedParticleHydrodynamics\r
description: "SmoothedParticleHydrodynamics（SPH）基于光滑粒子流体动力学模拟自由表面流体（溃坝、喷溅、漫流）的粒子级运动。"\r
---\r
\r
# SmoothedParticleHydrodynamics\r
\r
光滑粒子流体动力学仿真对象，实现对光滑粒子流体动力学仿真对象的操作\r
\r
通过 \`api.smoothedParticleHydrodynamics\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：SmoothedParticleHydrodynamics（SPH）基于光滑粒子流体动力学模拟自由表面流体（溃坝、喷溅、漫流）的粒子级运动。\r
- **别名 / 不同行业叫法**：SPH / 光滑粒子流体 / 无网格流体 / 溃坝粒子仿真 / 流体喷溅仿真。\r
- **适用行业**：智慧水利（溃坝）、应急管理、水电、科研仿真\r
- **使用场景**：\r
  - 溃坝/漫坝洪水演进的粒子级模拟\r
  - 闸门泄流、喷溅过程的可视化\r
  - 强非线性自由表面流体过程展示\r
- **注意事项**：\r
  - 粒子数量直接决定精度与性能，需权衡\r
  - 计算资源消耗大\r
  - 适合局部强动态场景，不适合大范围长历时模拟\r
\r
\r
## 构造函数\r
\r
\`\`\`js\r
new SmoothedParticleHydrodynamics()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`addByBin\`](#addByBin) | 根据bin时序文件添加一个或多个光滑粒子流体动力学仿真对象 |  |\r
| [\`addByVtk\`](#addByVtk) | 根据vtk时序文件添加一个或多个光滑粒子流体动力学仿真对象 |  |\r
| [\`clear\`](#clear) | 清空场景中所有的光滑粒子流体动力学仿真对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个光滑粒子流体动力学仿真对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据光滑粒子流体动力学仿真对象ID获取光滑粒子流体动力学仿真对象的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏光滑粒子流体动力学仿真对象 | 按业务条件隐藏对象 |\r
| [\`show\`](#show) | 显示光滑粒子流体动力学仿真对象 | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个光滑粒子流体动力学仿真对象，支持更新以下属性： | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`addByBin(data, fn)\` {#addByBin}\r
\r
根据bin时序文件添加一个或多个光滑粒子流体动力学仿真对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 光滑粒子流体动力学仿真对象，可以是Object类型或者Array类型，对于每一个SmoothedParticleHydrodynamics对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 光滑粒子流体动力学仿真对象的唯一标识符ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`origin\` | \`array\` | 仿真模型对象的原点，默认值：[0, 0, 0]，如果bin文件内坐标是相对坐标则此参数相当于offset |\r
| \`style\` | \`number\` | 光滑粒子流体动力学仿真对象样式，取值范围：[0,1,2,3,4]，取值描述：0热力样式 1~4四种水材质样式，默认值：0 |\r
| \`duration\` | \`number\` | 仿真的持续时间，单位：秒，默认值：30s |\r
| \`loop\` | \`boolean\` | 是否循环播放，默认值：false |\r
| \`play\` | \`boolean\` | 添加后是否开始播放，默认值：false |\r
| \`files\` | \`array\` | 按时序排列的二进制bin文件路径的二维数组，结构示例：["D:\\Time1.bin","D:\\Time2.bin"...]，bin文件格式描述：x,y,z,value，四个字段分别对应四个8字节的double字段，按小端字节顺序（ByteOrder.LITTLE_ENDIAN）写入二进制bin文件 |\r
| \`particleNumSides\` | \`number\` | 可选，粒子多边形的边的数量，控制粒子几何形状的复杂度，默认值：2 |\r
| \`particle\` | \`object\` | 光滑粒子样式属性如下： |\r
| \`particle.thickness\` | \`number\` | 每个粒子的基础水深，默认值：0.02米 |\r
| \`particle.radius\` | \`number\` | 每个粒子的默认半径，默认值：15米 |\r
| \`colors\` | \`object\` | 热力样式下的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效值对应的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
生成bin文件和读取bin文件的Java代码示例：\r
\r
\r
        public static void writeBinFile(){\r
            //二进制文件生成路径\r
            String binPath = "C:\\\\bin\\\\";\r
\r
            //8个坐标点+业务对应value\r
            double[][] sphParticleData = {\r
\r
                {\r
                    6557.337744,\r
                    5574.320115,\r
                    3238.832747,\r
                    48.890203\r
                },\r
                {\r
                    6473.064509,\r
                    5089.487075,\r
                    3168.192248,\r
                    43.51641\r
                },\r
                {\r
                    6707.48572,\r
                    4800.570737,\r
                    3048.399799,\r
                    46.022058\r
                },\r
                {\r
                    6894.066684,\r
                    4529.364945,\r
                    3002.244533,\r
                    38.003331\r
                },\r
                {\r
                    6886.204313,\r
                    4158.774802,\r
                    2936.036547,\r
                    26.771536\r
                },\r
                {\r
                    6890.049974,\r
                    3893.091258,\r
                    2888.343784,\r
                    32.719713\r
                },\r
                {\r
                    6890.719789,\r
                    3574.600717,\r
                    2857.614734,\r
                    32.38045\r
                },\r
                {\r
                    6991.981246,\r
                    3355.456008,\r
                    2832.723574,\r
                    18.700644\r
                }\r
            };\r
\r
            //把数据写入二进制bin文件\r
            for (int i = 0; i < sphParticleData.length; i++) {\r
                String path = binPath + "point" + i + ".bin";\r
                OutputStream fos = new BufferedOutputStream(Files.newOutputStream(Paths.get(path)));\r
                byte[] bytes = ByteBuffer.allocate(8 + 8 + 8 + 8).order(ByteOrder.LITTLE_ENDIAN).putDouble(sphParticleData[i][0]).putDouble(sphParticleData[i][1]).putDouble(sphParticleData[i][2]).putDouble(sphParticleData[i][3]).array();\r
                fos.write(bytes);\r
                fos.close();\r
            }\r
        }\r
\r
        public static void readBinFile(){\r
\r
            String binFilePath = "F:\\\\test.bin";\r
\r
            byte[] bytes = new byte[8 + 8 + 8 + 8];\r
            FileInputStream fis = new FileInputStream(binFilePath);\r
            while (fis.read(bytes, 0, bytes.length) != -1) {\r
\r
                Double x = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 0, 8)).order(ByteOrder.LITTLE_ENDIAN).getDouble();\r
                Double y = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 8, 16)).order(ByteOrder.LITTLE_ENDIAN).getDouble();\r
                Double z = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 16, 24)).order(ByteOrder.LITTLE_ENDIAN).getDouble();\r
                Double value = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 24, 32)).order(ByteOrder.LITTLE_ENDIAN).getDouble();\r
                //输出字段值\r
                System.out.println("x y z value : ["+  x + ","+ y + "," + z + "," + value +"]");\r
            }\r
        }\r
\`\`\`\r
\r
---\r
\r
### \`addByVtk(data, fn)\` {#addByVtk}\r
\r
根据vtk时序文件添加一个或多个光滑粒子流体动力学仿真对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 光滑粒子流体动力学仿真对象，可以是Object类型或者Array类型，对于每一个SmoothedParticleHydrodynamics对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 光滑粒子流体动力学仿真对象的唯一标识符ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`origin\` | \`array\` | 仿真模型对象的原点，默认值：[0, 0, 0]，如果bin文件内坐标是相对坐标则此参数相当于offset |\r
| \`style\` | \`number\` | 光滑粒子流体动力学仿真对象样式，取值范围：[0,1,2,3,4]，取值描述：0热力样式 1~4四种水材质样式，默认值：0 |\r
| \`duration\` | \`number\` | 仿真的持续时间，单位：秒，默认值：30s |\r
| \`loop\` | \`boolean\` | 是否循环播放，默认值：false |\r
| \`play\` | \`boolean\` | 添加后是否开始播放，默认值：false |\r
| \`files\` | \`array\` | 按时序排列的vtk文件数组，结构示例：["D:\\Time0.vtk","D:\\Time1.vtk","D:\\Time2.vtk"...] |\r
| \`heatValueFieldName\` | \`string\` | 粒子热力值使用的vtk字段名称 |\r
| \`idFieldName\` | \`string\` | 粒子ID使用的vtk字段名称 |\r
| \`particleNumSides\` | \`number\` | 可选，粒子多边形的边的数量，控制粒子几何形状的复杂度，默认值：2 |\r
| \`particle\` | \`object\` | 光滑粒子样式属性如下： |\r
| \`particle.thickness\` | \`number\` | 每个粒子的基础水深，默认值：0.02米 |\r
| \`particle.radius\` | \`number\` | 每个粒子的默认半径，默认值：15米 |\r
| \`colors\` | \`object\` | 热力样式下的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效值对应的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.smoothedParticleHydrodynamics.addByVtk(data);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的光滑粒子流体动力学仿真对象\r
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
fdapi.smoothedParticleHydrodynamics.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个光滑粒子流体动力学仿真对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的光滑粒子流体动力学仿真对象ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.smoothedParticleHydrodynamics.delete('sph');\r
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
| \`ids\` | \`string \\| array\` | 光滑粒子流体动力学仿真对象的ID或者ID数组 |\r
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
fdapi.smoothedParticleHydrodynamics.focus('sph');\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据光滑粒子流体动力学仿真对象ID获取光滑粒子流体动力学仿真对象的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的光滑粒子流体动力学仿真对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.smoothedParticleHydrodynamics.get('sph');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏光滑粒子流体动力学仿真对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 光滑粒子流体动力学仿真对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.smoothedParticleHydrodynamics.hide('sph');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示光滑粒子流体动力学仿真对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 光滑粒子流体动力学仿真对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.smoothedParticleHydrodynamics.show('sph');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个光滑粒子流体动力学仿真对象，支持更新以下属性：\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`data \\| array\` | 光滑粒子流体动力学仿真对象或对象数组，支持更新以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 根据SmoothedParticleHydrodynamics对象ID更新以下属性 |\r
| \`play\` | \`boolean\` | 可选，是否开始播放，默认值：false |\r
| \`particle\` | \`object\` | 可选，光滑粒子样式属性如下： |\r
| \`particle.thickness\` | \`number\` | 每个粒子的基础水深，默认值：0.02米 |\r
| \`particle.radius\` | \`number\` | 每个粒子的默认半径，默认值：15米 |\r
| \`colors\` | \`object\` | 可选，热力样式下的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.gradient\` | \`boolean\` | 是否渐变 |\r
| \`colors.invalidColor\` | [\`Color\`](/docs/api/types#color) | 无效值对应的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |\r
| \`colors.color\` | [\`Color\`](/docs/api/types#color) | 热力值对应的调色板颜色 |\r
| \`colors.value\` | \`number\` | 热力值 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let sph = {\r
    "id": "sph",\r
    "play": false, //暂停播放\r
    "particle":\r
    {\r
        "thickness": 0.2,\r
        "radius": 30\r
    }\r
}\r
fdapi.smoothedParticleHydrodynamics.update(sph);\r
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
await fdapi.smoothedParticleHydrodynamics.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> AddByBin\r
\r
\`\`\`js\r
fdapi.smoothedParticleHydrodynamics.delete('sph');\r
let sph =\r
{\r
    "id": "sph",\r
    "origin": [\r
        0,\r
        0,\r
        0\r
    ],\r
    "style": 0,//0热力 流体1~4\r
    "duration": 30,\r
    "play": true, //默认播放\r
    "loop": true,\r
    "files": [\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00000000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00010000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00020000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00030000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00040000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00050000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00060000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00070000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00080000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00090000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00110000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00120000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00130000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00140000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00150000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00160000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00170000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00180000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00190000.bin",\r
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00200000.bin",\r
    ],\r
    //"particleNumSides": 2,\r
    "particle": {\r
        "thickness": 0.02,\r
        "radius": 15\r
    },\r
    "colors": {\r
        "gradient": false,\r
        "invalidColor": [1, 1, 1, 1],\r
        "colorStops": [\r
            {\r
                "value": 0,\r
                "color": [\r
                    0,\r
                    0,\r
                    1,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 5,\r
                "color": [\r
                    0,\r
                    1,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 10,\r
                "color": [\r
                    1,\r
                    1,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 15,\r
                "color": [\r
                    1,\r
                    0.5,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 20,\r
                "color": [\r
                    1,\r
                    0,\r
                    0,\r
                    1\r
                ]\r
            }\r
        ]\r
    }\r
}\r
fdapi.smoothedParticleHydrodynamics.addByBin(sph);\r
fdapi.smoothedParticleHydrodynamics.focus('sph', 1000);\r
\`\`\`\r
\r
> AddByVtk\r
\r
\`\`\`js\r
fdapi.smoothedParticleHydrodynamics.delete('sph');\r
let sph =\r
{\r
    "id": "sph",\r
    "origin": [\r
        0,\r
        0,\r
        0\r
    ],\r
    "style": 0,//0热力 流体1~4\r
    "duration": 30,\r
    "play": true, //默认播放\r
    "loop": true,\r
    "files": [\r
        HostConfig.Path + "/assets/bin/sph/" + "1.vtk",\r
        HostConfig.Path + "/assets/bin/sph/" + "2.vtk",\r
        HostConfig.Path + "/assets/bin/sph/" + "3.vtk",\r
        HostConfig.Path + "/assets/bin/sph/" + "4.vtk",\r
        HostConfig.Path + "/assets/bin/sph/" + "5.vtk",\r
        HostConfig.Path + "/assets/bin/sph/" + "6.vtk",\r
    ],\r
    "heatValueFieldName": "Rhop",\r
    "idFieldName": "Idp",\r
    "particleNumSides": 2,\r
    "particle": {\r
        "thickness": 0.02,\r
        "radius": 15\r
    },\r
    "colors": {\r
        "gradient": false,\r
        "invalidColor": [1, 1, 1, 1],\r
        "colorStops": [\r
            {\r
                "value": 0,\r
                "color": [\r
                    0,\r
                    0,\r
                    1,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 5,\r
                "color": [\r
                    0,\r
                    1,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 10,\r
                "color": [\r
                    1,\r
                    1,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 15,\r
                "color": [\r
                    1,\r
                    0.5,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 20,\r
                "color": [\r
                    1,\r
                    0,\r
                    0,\r
                    1\r
                ]\r
            }\r
        ]\r
    }\r
}\r
fdapi.smoothedParticleHydrodynamics.addByVtk(sph);\r
fdapi.smoothedParticleHydrodynamics.focus('sph', 1000);\r
\`\`\`\r
`;export{r as default};
