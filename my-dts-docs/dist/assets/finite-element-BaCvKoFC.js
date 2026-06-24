const n=`---\r
title: FiniteElement\r
sidebar_label: FiniteElement\r
description: "FiniteElement 加载有限元网格与计算结果（应力/应变/位移/温度等），以云图着色与形变动画三维呈现分析结果。"\r
---\r
\r
# FiniteElement\r
\r
FiniteElement有限元分析对象，实现对有限元分析对象的操作\r
\r
通过 \`api.finiteElement\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：FiniteElement 加载有限元网格与计算结果（应力/应变/位移/温度等），以云图着色与形变动画三维呈现分析结果。\r
- **别名 / 不同行业叫法**：有限元 / FEM / 结构仿真 / 应力分析 / 形变分析 / CAE 结果可视化。\r
- **适用行业**：土木工程、桥梁隧道、水利水电（大坝/闸门）、机械装备、能源电力\r
- **使用场景**：\r
  - 大坝、桥梁等结构的应力应变云图展示\r
  - 荷载作用下的结构形变动画\r
  - 结构安全评估与隐患部位可视化\r
- **注意事项**：\r
  - 网格与结果数据量大，需分级加载并关注性能\r
  - 色带与量纲须正确映射\r
  - 模型坐标需与工程坐标对齐\r
\r
\r
## 构造函数\r
\r
\`\`\`js\r
new FiniteElement()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个有限元分析对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 清空场景中所有的有限元分析对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个有限元分析对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据有限元分析ID获取有限元分析的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏有限元分析 | 按业务条件隐藏对象 |\r
| [\`show\`](#show) | 显示有限元分析 | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个有限元分析对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个有限元分析对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元分析对象的数据结构，可以是Object类型或者Array类型，对于每一个FiniteElement对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 有限元分析的唯一标识符ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`dataPath\` | \`string\` | 必选，包含有限元分析数据的二进制文件路径 |\r
| \`coordinate\` | \`array\` | 有限元分析位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`rotation\` | \`array\` | 有限元分析旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |\r
| \`type\` | \`number\` | 有限元分析类型，共12种，类型：整数，取值范围：[0~11]，以下为类型数值对应关系： |\r
| \`type.0\` | \`-\` | ： u1 沿X轴向空间位移 |\r
| \`type.1\` | \`-\` | ： u2 沿Y轴向空间位移 |\r
| \`type.2\` | \`-\` | ： u3 沿Z轴向空间位移 |\r
| \`type.3\` | \`-\` | ： s11 X轴向的应力，正值为拉应力，负值为压应力 |\r
| \`type.4\` | \`-\` | ： s22 Y轴向的应力，正值为拉应力，负值为压应力 |\r
| \`type.5\` | \`-\` | ： s33 Z轴向的应力，正值为拉应力，负值为压应力 |\r
| \`type.6\` | \`-\` | ： s12 在YZ平面上，沿Y向的剪力 |\r
| \`type.7\` | \`-\` | ： s13 在YZ平面上，沿Z向的剪力 |\r
| \`type.8\` | \`-\` | ： s23 在XZ平面上，沿Z向的剪力 |\r
| \`type.9\` | \`-\` | ： d1 X方向损伤 |\r
| \`type.10\` | \`-\` | ：d2 Y方向损伤 |\r
| \`type.11\` | \`-\` | ：d3 Z方向损伤 |\r
| \`valueRange\` | \`array\` | 有限元分析结果对应值的范围：[min,max]，数组元素类型：[任意浮点数] |\r
| \`characteristicLine\` | \`object\` | 有限元对象的特征线对象，包含以下参数： |\r
| \`characteristicLine.filePath\` | \`string\` | 包含特征线信息的文件路径 |\r
| \`characteristicLine.color\` | [\`Color\`](/docs/api/types#color) | 特征线的颜色 |\r
| \`showLine\` | \`boolean\` | 是否显示等值线，默认值：false |\r
| \`showColorLine\` | \`boolean\` | 是否显示等值线颜色，默认值：false |\r
| \`contourParams\` | \`array\` | 控制有限元分析对象热力效果，从valueRange的min/max分割而来，二维数组，取值示例：[[min,max],[min,max],[min,max]...] |\r
| \`sections\` | \`array\` | 有限元分析对象的各部分设置可见性 |\r
| \`sections.index\` | \`number\` | 待隐藏显示的模型索引 |\r
| \`sections.visible\` | \`boolean\` | 是否可见，默认值：true |\r
| \`colors\` | \`object\` | 有限元分析对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |\r
| \`colors.size\` | \`number\` | 调色板图片尺寸 |\r
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
let fe1 = {\r
        "id": "fe_1",\r
        "dataPath": "d:/out/",//目录\r
        "coordinate": [\r
            12984831,\r
            4800354.5,\r
            0\r
        ],\r
        "rotation": [\r
            0,\r
            0,\r
            0\r
        ],\r
        "type": 0,\r
        "valueRange": [\r
            -3,\r
            3\r
        ],\r
        "characteristicLine":{\r
            "filePath": "d:/aaa.json",\r
            "color": [1,1,0,1]\r
        },\r
        "sections": [\r
            {\r
                "index": 1,\r
                "visible": false\r
            },\r
            {\r
                "index": 2,\r
                "visible": false\r
            }\r
        ],\r
        "contourParams": [[-3,0],[0,1],[1,3]],//分割valueRange\r
        "showLine": true,\r
        "showColorLine": true,\r
        "colors": {\r
            "size": 2048,\r
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
        }\r
    };\r
\`\`\`\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.finiteElement.delete(['fe_1']);\r
//有限元文件资源目录\r
let dataPath = HostConfig.Path + "/assets/finiteElement/";\r
//有限元分析对象\r
let fe1 = {\r
    "id": "fe_1",\r
    "dataPath": dataPath, //有限元文件资源目录\r
    "coordinate": [\r
        493155.46875, 2492133.6, 100\r
    ],\r
    "rotation": [\r
        0,\r
        0,\r
        0\r
    ],\r
    "type": 10,\r
    "valueRange": [\r
        -0.348057,\r
        0.0360363\r
    ],\r
    "showLine": true,//显隐等值线\r
    "showColorLine": false,//是否显示成彩色线\r
    "contourParams": [\r
        [0.08333391912850335, 0.006], //等值线的位置，第二个参数是线宽。\r
        [0.16666783825700687, 0.006],\r
        [0.2500017573855102, 0.006],\r
        [0.3333330729799244, 0.006],\r
        [0.41666699210842784, 0.006],\r
        [0.5000009112369311, 0.003],\r
        [0.5833348303654347, 0.003],\r
        [0.6666669270200756, 0.003],\r
        [0.7500003254417611, 0.003],\r
        [0.8333334635100378, 0.003],\r
        [0.9166668358963824, 0.0007]\r
    ],\r
    "sections": [{\r
        "index": 0,\r
        "visible": true\r
    }, {\r
        "index": 1,\r
        "visible": true\r
    }],\r
    "colors": {\r
        "file": dataPath + "colorMap.png"\r
    }\r
};\r
await fdapi.finiteElement.add(fe1);\r
fdapi.finiteElement.focus('fe_1');\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的有限元分析对象\r
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
fdapi.finiteElement.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个有限元分析对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的有限元分析对象ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.finiteElement.delete(['fe_1']);\r
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
| \`ids\` | \`string \\| array\` | 有限元分析对象的ID或者ID数组 |\r
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
fdapi.finiteElement.focus('fe_1');\r
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
| \`ids\` | \`string \\| array\` | 要获取的有限元分析对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回FiniteElement的详细信息 属性详情参见add方法参数\r
\r
{\r
            "id": "h1",\r
            "dataPath": "C:/Users/Administrator/out",\r
            "coordinate": [\r
                12984831,\r
                4800354.5,\r
                0\r
            ],\r
            "rotation": [\r
                0,\r
                0,\r
                0\r
            ],\r
            "type": 0,\r
            "valueRange": [\r
                -0.000003,\r
                0.000003\r
            ],\r
            "colors": "base64..."\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.finiteElement.get(['fe_1']);\r
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
| \`ids\` | \`string \\| array\` | 有限元分析对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.finiteElement.hide(['fe_1']);\r
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
| \`ids\` | \`string \\| array\` | 有限元分析对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.finiteElement.show(['fe_1']);\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个有限元分析对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 有限元分析对象或对象数组，参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
//有限元文件资源目录\r
let dataPath = HostConfig.Path + "/assets/finiteElement/";\r
//有限元分析对象1\r
let fe1 = {\r
    "id": "fe_1",\r
    "type": 8,\r
    "rotation": [\r
        0,\r
        90,\r
        0\r
    ],\r
    "colors": {\r
        "file": dataPath + "colorMap.png"\r
    }\r
};\r
await fdapi.finiteElement.update(fe1);\r
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
await fdapi.finiteElement.updateEnd();\r
\`\`\`\r
`;export{n as default};
