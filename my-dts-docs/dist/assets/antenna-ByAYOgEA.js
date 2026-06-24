const n=`---\r
title: Antenna\r
sidebar_label: Antenna\r
description: "Antenna 以方向图形式可视化天线的辐射/增益方向特性。"\r
---\r
\r
# Antenna\r
\r
天线方向图对象，提供Antenna对象的操作方法\r
\r
通过api.antenna调用\r
\r
通过 \`api.antenna\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：Antenna 以方向图形式可视化天线的辐射/增益方向特性。\r
- **别名 / 不同行业叫法**：天线 / 天线方向图 / 方向图 / 波瓣图 / 基站天线 / 雷达天线。\r
- **适用行业**：通信(5G/基站)、国防雷达、广电、物联网、低空通信\r
- **使用场景**：\r
  - 基站、雷达天线方向图的三维展示\r
  - 覆盖与指向的规划评估\r
  - 电磁态势中的天线要素\r
- **注意事项**：\r
  - 方向图数据需规范\r
  - 通常与 Beam、SignalWave 配合表达完整信号链\r
  - 尺度需与场景匹配\r
\r
\r
## 构造函数\r
\r
\`\`\`js\r
new Antenna()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个天线方向图对象 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 清空场景中所有的天线方向图对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个天线方向图对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`get\`](#get) | 根据天线方向图ID获取天线方向图的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏天线方向图 | 按业务条件隐藏对象 |\r
| [\`show\`](#show) | 显示天线方向图 | 按业务条件显示对象 |\r
| [\`update\`](#update) | 修改一个或多个天线方向图对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个天线方向图对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 天线方向图包含的数据对象，可以是Object类型或者Array类型，对于每一个Antenna对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 天线方向图的唯一标识符ID |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`coordinate\` | \`array\` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`rotation\` | \`array\` | 坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`radius\` | \`number\` | 天线方向图半径 |\r
| \`radiationRange\` | \`array\` | 可选，辐射取值范围 |\r
| \`radiationOffset\` | \`array\` | 溢出位置偏移，[X,Y] |\r
| \`grid\` | \`object\` | 网格对象，包含以下属性 |\r
| \`grid.values\` | \`array\` | 网格热力值数组，二维数组，注意两个数组元素的长度相乘应该等于信号增益（gain）的长度，取值示例：[[val1,val2],[val3,val4,val5]] 即gain.length = 2*3 |\r
| \`colors\` | \`object\` | 配色卡信息，包含以下属性 |\r
| \`colors.gradient\` | \`boolean\` | 颜色是否渐变 |\r
| \`colors.invalidColor\` | \`array\` | 无效像素点的默认颜色，默认白色 |\r
| \`colors.colorStops\` | \`array\` | 色卡数组，包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;] |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
{\r
            "id": "radiationPattern",\r
            "coordinate": [\r
                494479.71875,\r
                2491462.25,\r
                2.11\r
            ],\r
            "rotation": [\r
                0,\r
                0,\r
                0\r
            ],\r
            "radius": 5,\r
            "radiationRange": [\r
                0,\r
                100\r
            ],\r
            "radiationOffset": [\r
                -5,\r
                5\r
            ],\r
            "grid": {\r
                "values": [\r
                    1,\r
                    2,\r
                    3,\r
                    4,\r
                    5,\r
                    6\r
                ]\r
            },\r
            "colors": {\r
                "gradient": true,\r
                "invalidColor": [\r
                    0,\r
                    0,\r
                    0,\r
                    1\r
                ],\r
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
                        "value": 0.25,\r
                        "color": [\r
                            0,\r
                            1,\r
                            1,\r
                            1\r
                        ]\r
                    },\r
                    {\r
                        "value": 0.5,\r
                        "color": [\r
                            0,\r
                            1,\r
                            0,\r
                            1\r
                        ]\r
                    },\r
                    {\r
                        "value": 0.75,\r
                        "color": [\r
                            1,\r
                            1,\r
                            0,\r
                            1\r
                        ]\r
                    },\r
                    {\r
                        "value": 1,\r
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
\`\`\`\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.antenna.delete('ap_1');\r
let ap1 = {\r
    "id": "ap_1",\r
    "coordinate": [\r
        493050.98875, 2492086.08, 6\r
    ],\r
    "rotation": [\r
        0,\r
        0,\r
        0\r
    ],\r
    "radius": 5,\r
    "radiationRange": [\r
        -72,\r
        25\r
    ],\r
    "radiationOffset": [\r
        -5,\r
        5\r
    ],\r
    "grid": {\r
        "gridSize": [360, 181],\r
        "values": gain\r
    },\r
    "colors": {\r
        "gradient": true,\r
        "invalidColor": [\r
            0,\r
            0,\r
            0,\r
            1\r
        ],\r
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
                "value": 0.25,\r
                "color": [\r
                    0,\r
                    1,\r
                    1,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 0.5,\r
                "color": [\r
                    0,\r
                    1,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 0.75,\r
                "color": [\r
                    1,\r
                    1,\r
                    0,\r
                    1\r
                ]\r
            },\r
            {\r
                "value": 1,\r
                "color": [\r
                    1,\r
                    0,\r
                    0,\r
                    1\r
                ]\r
            }\r
        ]\r
    }\r
};\r
await fdapi.antenna.add(ap1);\r
fdapi.antenna.focus('ap_1', 100, 1);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的天线方向图对象\r
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
fdapi.antenna.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个天线方向图对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的天线方向图对象ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.antenna.delete('ap_1');\r
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
| \`ids\` | \`string \\| array\` | 天线方向图对象的ID或者ID数组 |\r
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
fdapi.antenna.focus('ap_1', 100, 1);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据天线方向图ID获取天线方向图的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的天线方向图对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回天线方向图的详细信息 属性详情参见add方法参数\r
{\r
            "id":	"Antenna_1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "coordinateType": 0,\r
            "coordinate":	[1000,1000,1000],\r
            "radius": 100,\r
            "radiationRange": [1, 300],\r
            "radiationOffset": [-5,5]\r
            ...\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
fdapi.antenna.get('ap_1');\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏天线方向图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 天线方向图对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.antenna.hide('ap_1');\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示天线方向图\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 天线方向图对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.antenna.show('ap_1');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个天线方向图对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 天线方向图对象或对象数组，参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let ap = {\r
    "id": "ap_1",\r
    "coordinate": [\r
        492689.085, 2492085.44, 32\r
    ],\r
}\r
await fdapi.antenna.update(ap);\r
fdapi.antenna.focus('ap_1', 100, 1);\r
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
await fdapi.antenna.updateEnd();\r
\`\`\`\r
`;export{n as default};
