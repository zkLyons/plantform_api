const r=`---\r
title: GeoJSONLayer\r
sidebar_label: GeoJSONLayer\r
description: "从本地文件或 URL 加载标准 GeoJSON 矢量数据并进行符号化渲染，支持点、线、面（含 Polygon3D 拉伸体块）多种可视化类型与渲染器，可配合文字标注、贴地与可视范围控制。"\r
---\r
\r
# GeoJSONLayer\r
\r
从本地文件或 URL 加载标准 GeoJSON 矢量数据并进行符号化渲染，支持点、线、面（含 Polygon3D 拉伸体块）多种可视化类型与渲染器，可配合文字标注、贴地与可视范围控制。\r
\r
通过 \`api.geoJSONLayer\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：从本地文件或 URL 加载标准 GeoJSON 矢量数据并进行符号化渲染，支持点、线、面（含 Polygon3D 拉伸体块）多种可视化类型与渲染器，可配合文字标注、贴地与可视范围控制。\r
- **别名 / 不同行业叫法**：GeoJSON 矢量图层 / GeoJSON 图层 / 矢量数据图层 / 业务专题图层。\r
- **适用行业**：智慧城市、智慧水利、应急管理、测绘 GIS、智慧园区、智慧交通。\r
- **使用场景**：\r
  - 加载行政区划、地块、管线、路网等矢量数据并按属性字段做唯一值/分类专题渲染。\r
  - 用 Polygon3D 体块按属性高度拉伸展示楼栋、地块容积或淹没/积水范围等专题分析结果。\r
  - 加载点位数据并用属性字段做文字标注，展示监测站、事件点等业务图层。\r
- **注意事项**：\r
  - 大体量 GeoJSON 会显著影响加载与渲染性能，建议精简要素或分层加载。\r
  - needProject 控制是否做投影转换，需结合源数据坐标系与工程坐标系正确设置以保证套合。\r
  - depthTest 与 enableAntialias 存在互斥关系（深度检测仅在反走样关闭时生效），贴地/遮挡效果需按需配置；自定义材质渲染器须按规范单独打包。\r
\r
## 构造函数\r
\r
\`\`\`js\r
new GeoJSONLayer()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 从GeoJSON文件或者url下载链接加载GeoJSON并进行符号化展示 | 向场景批量添加对象 |\r
| [\`clear\`](#clear) | 清空场景中所有的GeoJSONLayer图层对象 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个GeoJSONLayer图层对象 | 按 ID 移除指定对象 |\r
| [\`focus\`](#focus) | 自动定位到GeoJSONLayer图层对象 | 相机定位到目标，点击联动跳转 |\r
| [\`focusFeature\`](#focusFeature) | 定位到GeoJSONLayer图层的某一块要素区域 |  |\r
| [\`hide\`](#hide) | 隐藏一个或多个GeoJSONLayer图层对象 | 按业务条件隐藏对象 |\r
| [\`highlightFeature\`](#highlightFeature) | 高亮GeoJSONLayer图层对象内部的某一块要素区域 |  |\r
| [\`highlightFeatureByProperty\`](#highlightFeatureByProperty) | 根据要素包含的属性字段名称和对应的值来高亮GeoJSONLayer图层对象内部对应的要素区域 |  |\r
| [\`highlightFeatures\`](#highlightFeatures) | 高亮GeoJSONLayer图层对象内部的多块要素区域 |  |\r
| [\`setViewHeightRange\`](#setViewHeightRange) | 设置GeoJSONLayer对象的可视高度范围， |  |\r
| [\`show\`](#show) | 显示一个或多个GeoJSONLayer图层对象 | 按业务条件显示对象 |\r
| [\`unHighlightAllFeaturesById\`](#unHighlightAllFeaturesById) | 取消高亮一个或者多个GeoJSONLayer图层的所有高亮要素区域 |  |\r
| [\`unHighlightFeature\`](#unHighlightFeature) | 取消高亮GeoJSONLayer图层对象内部的某一块要素区域 |  |\r
| [\`unHighlightFeatureByProperty\`](#unHighlightFeatureByProperty) | 根据要素包含的属性字段名称和对应的值来取消高亮GeoJSONLayer图层对象内部对应的… |  |\r
| [\`unHighlightFeatures\`](#unHighlightFeatures) | 取消高亮GeoJSONLayer图层对象内部的多块要素区域 |  |\r
| [\`update\`](#update) | 更新GeoJSONLayer图层对象的符号化显示效果 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(option, fn)\` {#add}\r
\r
从GeoJSON文件或者url下载链接加载GeoJSON并进行符号化展示\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`option\` | \`object\` | 加载GeoJSON的配置项对象，包含以下属性 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`option\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 必选，字符串类型唯一id |\r
| \`url\` | \`string\` | 二选一，GeoJSON文件本地磁盘路径或者对应的url地址 |\r
| \`sourceJson\` | \`Object\` | 二选一，GeoJSON标准对象（JsonObject） |\r
| \`visible\` | \`boolean\` | 可选，设置图层加载后是否显示，默认：true |\r
| \`rotation\` | \`array\` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |\r
| \`offset\` | \`array\` | 可选，基于原始位置的偏移量，默认值：[0,0,0] |\r
| \`range\` | \`array\` | 点的可视范围: [近裁距离, 远裁距离]，默认值: [0, 10000]，注意：此参数仅对point类型的GeoJSON生效 |\r
| \`viewHeightRange\` | \`array\` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |\r
| \`needProject\` | \`boolean\` | 可选，是否进行投影转换，默认：true |\r
| \`textField\` | \`string\` | 可选，使用Geojson的属性字段显示文字标注 |\r
| \`textRange\` | \`array\` | 可选，文字标注的可视范围: [近裁距离, 远裁距离]，单位：米 |\r
| \`textSize\` | \`number\` | 可选，文字标注的字体大小，默认大小：24 |\r
| \`textColor\` | [\`Color\`](/docs/api/types#color) | 可选，文字标注的字体颜色，默认颜色：[1,1,1,1] |\r
| \`onTerrain\` | \`boolean\` | 可选，设置图层加载后是否贴地，默认：false |\r
| \`collision\` | \`boolean\` | 是否开启碰撞，默认值：true |\r
| \`depthTest\` | \`boolean\` | 是否做深度检测，默认开启：true，true会被地形遮挡，false不会被地形遮挡，注意：深度检测参数仅在反走样参数关闭时(enableAntialias=false)生效 |\r
| \`enableAntialias\` | \`boolean\` | 是否开启反走样(仅对polyline类型生效)，默认开启：true |\r
| \`renderer\` | \`object\` | 必选，渲染器配置对象参数如下： **注意：使用此自定义材质需单独按规范打包，具体参考相关教程。** |\r
| \`renderer.rendererType\` | [\`RendererType\`](/docs/api/types#renderertype) | (\`RendererType\`) 渲染器类型，包含三种：简单渲染器、唯一值渲染器、分类渲染器 |\r
| \`renderer.generateTop\` | \`boolean\` | 可选参数，是否生成顶面，默认：true |\r
| \`renderer.generateBottom\` | \`boolean\` | 可选参数，是否生成底面，默认：true |\r
| \`renderer.style\` | \`-\` | \`Polygon3DStyle\` 仅对Polygon3D渲染生效，设置Polygon3D的样式 |\r
| \`renderer.type\` | [\`VisualType\`](/docs/api/types#visualtype) | (\`VisualType\`) 控制显示的可视化类型枚举 |\r
| \`renderer.field\` | \`string\` | GeoJSON文件内的属性字段名称 |\r
| \`renderer.fieldType\` | [\`FieldType\`](/docs/api/types#fieldtype) | (\`FieldType\`) GeoJSON文件内的属性字段类型，枚举支持数值类型和字符串类型 |\r
| \`renderer.gradient\` | \`boolean\` | 颜色是否渐变 |\r
| \`renderer.materials\` | \`array\` | 可选，自定义材质配置列表，每一个材质对象包含的参数如下： |\r
| \`renderer.index\` | \`number\` | 自定义材质索引 |\r
| \`renderer.material\` | \`string\` | 自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |\r
| \`renderer.scalarParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |\r
| \`renderer.vectorParameters\` | \`array\` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数组类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |\r
| \`renderer.defaultSymbol\` | \`object\` | 必选，默认符号化配置参数如下： |\r
| \`renderer.symbolType\` | \`number\` | 符号化类型，0 simple-marker圆形点填充 1 simple-line线填充(注意：目前仅支持1px的线宽) 2 simple-fill面填充 3 polygon3d填充 |\r
| \`renderer.size\` | \`number\` | 可选，点的默认尺寸，仅针对simple-marker圆形填充生效； |\r
| \`renderer.height\` | \`number\` | 可选，polygon3d的默认高度，仅针对polygon3d填充生效； |\r
| \`renderer.color\` | \`array\` | 默认填充颜色 |\r
| \`renderer.outline\` | \`object\` | 默认轮廓线，包含线宽和颜色，注意：目前仅支持1px的线宽。对象结构示例：&#123;width: 1,color: [1, 1, 1, 1]&#125; |\r
| \`renderer.uniqueValueInfos\` | \`array\` | 可选，唯一值渲染器配置数组，对象结构如下： |\r
| \`renderer.value\` | \`any\` | field字段对应值 |\r
| \`renderer.symbol\` | \`object\` | 各唯一值对应的符号化配置对象，结构如下： |\r
| \`renderer.color\` | [\`Color\`](/docs/api/types#color) | 可选，三选一，唯一值对应的颜色 |\r
| \`renderer.size\` | \`number\` | 可选，三选一，唯一值对应的尺寸 |\r
| \`renderer.height\` | \`number\` | 可选，三选一，唯一值对应的高度 |\r
| \`renderer.classBreakInfos\` | \`array\` | 可选，分类渲染器配置数组，对象结构如下： |\r
| \`renderer.minValue\` | \`number\` | 区间最小值 |\r
| \`renderer.maxValue\` | \`number\` | 区间最大值 |\r
| \`renderer.symbol\` | \`object\` | 不同分类的符号化配置对象，结构如下： |\r
| \`renderer.color\` | [\`Color\`](/docs/api/types#color) | 可选，二选一，区间值对应的颜色 |\r
| \`renderer.size\` | \`number\` | 可选，二选一，区间值对应的尺寸 |\r
| \`renderer.height\` | \`number\` | 可选，三选一，区间值对应的高度 |\r
| \`renderer.visualVariables\` | \`array\` | 简单渲染器支持根据字段属性控制颜色、尺寸和透明度的显示，参数如下： |\r
| \`visibleRenderer\` | \`object\` | 可选，要素可见性渲染器配置对象，包含的参数结构如下： |\r
| \`visibleRenderer.rendererType\` | [\`RendererType\`](/docs/api/types#renderertype) | (\`RendererType\`) 渲染器类型：可见性渲染器 |\r
| \`visibleRenderer.field\` | \`string\` | GeoJSON文件内的属性字段名称 |\r
| \`visibleRenderer.fieldType\` | [\`FieldType\`](/docs/api/types#fieldtype) | (\`FieldType\`) GeoJSON文件内的属性字段类型，枚举支持数值类型和字符串类型 |\r
| \`visibleRenderer.defaultVisible\` | \`boolean\` | 全局要素默认是否可见，默认值：true 可见 |\r
| \`visibleRenderer.visibleValueInfos\` | \`array\` | 可选，分类渲染器配置数组，对象结构如下： |\r
| \`visibleRenderer.value\` | \`any\` | 可选，field字段对应类型的值 |\r
| \`visibleRenderer.minValue\` | \`number\` | 可选，区间最小值，注意：数值类型字段可以使用此属性 |\r
| \`visibleRenderer.maxValue\` | \`number\` | 可选，区间最大值，注意：数值类型字段可以使用此属性 |\r
| \`visibleRenderer.visible\` | \`boolean\` | 必选，根据字段值或区间控制要素块是否显隐 |\r
| \`materialRenderer\` | \`object\` | 可选，自定义材质渲染器配置对象，包含的参数结构如下： |\r
| \`materialRenderer.rendererType\` | [\`RendererType\`](/docs/api/types#renderertype) | (\`RendererType\`) 渲染器类型：自定义材质渲染器 |\r
| \`materialRenderer.field\` | \`string\` | GeoJSON文件内的属性字段名称 |\r
| \`materialRenderer.fieldType\` | [\`FieldType\`](/docs/api/types#fieldtype) | (\`FieldType\`) GeoJSON文件内的属性字段类型，枚举支持数值类型和字符串类型 |\r
| \`materialRenderer.defaultMaterial\` | \`boolean\` | 全局默认使用的自定义材质索引，默认值：0 |\r
| \`materialRenderer.materialValueInfos\` | \`array\` | 可选，自定义材质渲染器配置数组，每一个对象结构如下： |\r
| \`materialRenderer.index\` | \`number\` | 必选，根据字段值或区间控制要素块是否显隐 |\r
| \`materialRenderer.value\` | \`any\` | 可选，field字段对应类型的值 |\r
| \`materialRenderer.minValue\` | \`number\` | 可选，区间最小值，注意：数值类型字段可以使用此属性 |\r
| \`materialRenderer.maxValue\` | \`number\` | 可选，区间最大值，注意：数值类型字段可以使用此属性 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
\`\`\`js\r
请求参数示例\r
  \r
  //简单渲染器\r
  let simpleRenderer = {\r
            //渲染器类型\r
            rendererType: RendererType.SimpleRenderer,\r
            //默认符号化配置\r
            defaultSymbol: {\r
                //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
                symbolType: 3,\r
                //默认高度\r
                height: 10,\r
                //默认填充颜色\r
                color: [0, 0, 1, 1],\r
                //默认轮廓线\r
                outline: {\r
                    //线宽\r
                    width: 1,\r
                    //颜色\r
                    color: [1, 1, 1, 1],\r
                }\r
            },\r
            //简单渲染器支持根据字段属性控制颜色、尺寸和透明度的显示\r
            visualVariables: [{\r
                //控制可视化显示的类型： 颜色color、尺寸size、高度height和不透明度opacity\r
                type: VisualType.Height,\r
                //属性字段名称\r
                field: "hight",\r
                //属性字段类型\r
                fieldType: FieldType.Number,\r
            }]\r
        };\r
\r
    //唯一值渲染器\r
    let uniqueValueRenderer = {\r
        //渲染器类型\r
        rendererType: RendererType.UniqueValueRenderer,\r
        //渲染字段名称\r
        field: "name",\r
        //属性字段类型\r
        fieldType: FieldType.String,\r
        //控制可视化显示的类型： 颜色color、尺寸size、高度height和不透明度opacity\r
        type: VisualType.Color,\r
        //默认符号化配置\r
        defaultSymbol: {\r
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
            symbolType: 2,\r
            //填充色\r
            color: [0, 1, 1, 1],\r
            //轮廓线\r
            outline: {\r
                //线宽\r
                width: 1,\r
                //颜色\r
                color: [1, 1, 1, 1]\r
            },\r
        },\r
        //根据颜色字段的唯一值进行符号化填充\r
        uniqueValueInfos: [{\r
            // 深圳湾体育馆填充为蓝色\r
            value: "深圳湾体育馆",\r
            symbol: {\r
                //填充色\r
                color: [0, 0, 1, 1]\r
            }\r
        }, {\r
            // 北京师大南山附属学校小学部填充为红色\r
            value: "北京师大南山附属学校小学部",\r
            symbol: {\r
                color: [1, 0, 0, 1]\r
            }\r
        }, {\r
            // 腾讯滨海大厦填充为绿色\r
            value: "腾讯滨海大厦",\r
            symbol: {\r
                color: [0, 1, 0, 1]\r
            }\r
        }, {\r
            // 科技第三幼儿园填充为黄色\r
            value: "科技第三幼儿园",\r
            symbol: {\r
                color: [1, 1, 0, 1]\r
            }\r
        }]\r
    };\r
\r
\r
    //分类渲染对应颜色\r
    let less25 = {\r
      color: [0,0,1,1]\r
    };\r
\r
    let less50 = {\r
      color: [0,1,0,1]\r
    };\r
\r
    let less75 = {\r
      color: [1,1,0,1]\r
    };\r
\r
    let less100 = {\r
      color: [1,0,0,1]\r
    };\r
\r
    //分类渲染器    \r
    let classBreaksRenderer = {\r
        rendererType: RendererType.ClassBreaksRenderer,\r
        field: "hight",\r
        //属性字段类型\r
        fieldType: FieldType.Number,\r
        //控制可视化显示的类型： 颜色color、尺寸size、高度height和不透明度opacity\r
        type: VisualType.Color,\r
        //默认符号化配置\r
        defaultSymbol: {\r
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
            symbolType: 2,\r
            //填充色\r
            color: [0, 1, 1, 1],\r
            //轮廓线\r
            outline: {\r
                //线宽\r
                width: 1,\r
                //颜色\r
                color: [1, 1, 1, 1]\r
            },\r
        },\r
        //根据hight字段的不同区间值使用不同的符号化配置\r
        classBreakInfos: [\r
            {\r
                minValue: 0,\r
                maxValue: 25,\r
                symbol: less25\r
            },\r
            {\r
                minValue: 25,\r
                maxValue: 50,\r
                symbol: less50\r
            },\r
            {\r
                minValue: 50,\r
                maxValue: 75,\r
                symbol: less75\r
            },\r
            {\r
                minValue: 75,\r
                maxValue: 100,\r
                symbol: less100\r
            }\r
        ]\r
    };\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
清空场景中所有的GeoJSONLayer图层对象\r
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
fdapi.geoJSONLayer.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个GeoJSONLayer图层对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的GeoJSONLayer对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.geoJSONLayer.delete(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);\r
\`\`\`\r
\r
---\r
\r
### \`focus(ids, distance, flyTime, rotation, fn)\` {#focus}\r
\r
自动定位到GeoJSONLayer图层对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | GeoJSONLayer图层对象的ID或者ID数组 |\r
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
fdapi.geoJSONLayer.focus("layer1", 100);\r
\`\`\`\r
\r
---\r
\r
### \`focusFeature(id, featureId, distance, flyTime, rotation, fn)\` {#focusFeature}\r
\r
定位到GeoJSONLayer图层的某一块要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | GeoJSONLayer图层对象的ID |\r
| \`featureId\` | \`number\` | 要素区域Feature的ID |\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：定位GeoJSONLayer内部某个要素区域：FocusFeature\r
\r
\`\`\`js\r
//相机定位到要素3\r
fdapi.geoJSONLayer.focusFeature("layer3", 3, 100, 1);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏一个或多个GeoJSONLayer图层对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | GeoJSONLayer对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.geoJSONLayer.hide(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);\r
\`\`\`\r
\r
---\r
\r
### \`highlightFeature(id, featureId, fn)\` {#highlightFeature}\r
\r
高亮GeoJSONLayer图层对象内部的某一块要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | GeoJSONLayer图层对象的ID |\r
| \`featureId\` | \`number\` | GeoJSONLayer图层对象内部的要素区域ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：高亮GeoJSONLayer内部单个要素区域：HighlightFeature\r
\r
\`\`\`js\r
//设置高亮颜色\r
fdapi.settings.setHighlightColor(Color.Red);\r
//高亮要素块\r
fdapi.geoJSONLayer.highlightFeature('layer3', 1);\r
\`\`\`\r
\r
---\r
\r
### \`highlightFeatureByProperty(object, fn)\` {#highlightFeatureByProperty}\r
\r
根据要素包含的属性字段名称和对应的值来高亮GeoJSONLayer图层对象内部对应的要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`object\` | \`object\` | 待高亮要素对象支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`object\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | GeoJSONLayer图层对象的ID |\r
| \`fieldName\` | \`string\` | GeoJSONLayer图层对象内部的要素包含的属性字段名称 |\r
| \`fieldType\` | \`number\` | GeoJSONLayer图层对象内部的要素包含的属性字段类型 |\r
| \`values\` | \`array\` | GeoJSONLayer图层对象内部的要素区域ID，数组元素类型为number |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：根据字段属性高亮GeoJSONLayer内部要素区域：HighlightFeatureByProperty\r
\r
\`\`\`js\r
//设置高亮颜色\r
fdapi.settings.setHighlightColor(Color.Yellow);\r
//高亮属性对应的要素块\r
fdapi.geoJSONLayer.highlightFeatureByProperty({\r
    id: 'layer3',\r
    fieldName: "NOWNAME",\r
    fieldType: FieldType.String,\r
    values: ["天利中央广场", "天利中央广场二期", "海岸城西座", "海岸城广场"]\r
});\r
\`\`\`\r
\r
---\r
\r
### \`highlightFeatures(data, fn)\` {#highlightFeatures}\r
\r
高亮GeoJSONLayer图层对象内部的多块要素区域\r
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
| \`id\` | \`string\` | GeoJSONLayer图层对象的ID |\r
| \`featureIds\` | \`array\` | GeoJSONLayer图层对象内部的要素区域ID，数组元素类型为number |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：高亮GeoJSONLayer内部多个要素区域：HighlightFeatures\r
\r
\`\`\`js\r
//设置高亮颜色\r
fdapi.settings.setHighlightColor(Color.LightSeaGreen);\r
fdapi.geoJSONLayer.highlightFeatures([{ "id": "layer3", "featureIds": [1, 2, 3] }]);\r
\`\`\`\r
\r
---\r
\r
### \`setViewHeightRange(id, minViewHeight, maxViewHeight, fn)\` {#setViewHeightRange}\r
\r
设置GeoJSONLayer对象的可视高度范围，注意：当GeoJSONLayer使用贴地模式时，此方法会失效\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | GeoJSONLayer对象的ID |\r
| \`minViewHeight\` | \`number\` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`maxViewHeight\` | \`number\` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetViewHeightRange\r
\r
\`\`\`js\r
fdapi.geoJSONLayer.setViewHeightRange('layer5', 1, 1000);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示一个或多个GeoJSONLayer图层对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | GeoJSONLayer对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.geoJSONLayer.show(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightAllFeaturesById(ids, fn)\` {#unHighlightAllFeaturesById}\r
\r
取消高亮一个或者多个GeoJSONLayer图层的所有高亮要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | GeoJSONLayer图层对象的ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.geoJSONLayer.unHighlightAllFeaturesById(ids);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightFeature(id, featureId, fn)\` {#unHighlightFeature}\r
\r
取消高亮GeoJSONLayer图层对象内部的某一块要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | GeoJSONLayer图层对象的ID |\r
| \`featureId\` | \`number\` | GeoJSONLayer图层对象内部的要素区域ID |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.geoJSONLayer.unHighlightFeature(id, featureId);\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightFeatureByProperty(object, fn)\` {#unHighlightFeatureByProperty}\r
\r
根据要素包含的属性字段名称和对应的值来取消高亮GeoJSONLayer图层对象内部对应的要素区域\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`object\` | \`object\` | 待高亮要素对象支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`object\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | GeoJSONLayer图层对象的ID |\r
| \`fieldName\` | \`string\` | GeoJSONLayer图层对象内部的要素包含的属性字段名称 |\r
| \`fieldType\` | \`number\` | GeoJSONLayer图层对象内部的要素包含的属性字段类型 |\r
| \`values\` | \`array\` | GeoJSONLayer图层对象内部的要素区域ID，数组元素类型为number |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：根据字段属性取消高亮GeoJSONLayer内部要素区域：UnHighlightFeatureByProperty\r
\r
\`\`\`js\r
//取消高亮属性对应的要素块\r
fdapi.geoJSONLayer.unHighlightFeatureByProperty({\r
    id: 'layer3',\r
    fieldName: "NOWNAME",\r
    fieldType: FieldType.String,\r
    values: ["天利中央广场", "天利中央广场二期", "海岸城西座", "海岸城广场"]\r
});\r
\`\`\`\r
\r
---\r
\r
### \`unHighlightFeatures(data, fn)\` {#unHighlightFeatures}\r
\r
取消高亮GeoJSONLayer图层对象内部的多块要素区域\r
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
| \`id\` | \`string\` | GeoJSONLayer图层对象的ID |\r
| \`featureIds\` | \`array\` | GeoJSONLayer图层对象内部的要素区域ID，数组元素类型为number |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.geoJSONLayer.unHighlightFeatures(data);\r
\`\`\`\r
\r
---\r
\r
### \`update(option, fn)\` {#update}\r
\r
更新GeoJSONLayer图层对象的符号化显示效果\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`option\` | \`object\` | 加载GeoJSON的配置项对象，结构参考add()方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
//简单渲染器\r
let simpleRenderer = {\r
    //渲染器类型\r
    rendererType: RendererType.SimpleRenderer,\r
    //默认符号化配置\r
    defaultSymbol: {\r
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
        symbolType: 0,\r
        //点的默认尺寸 针对simple-marker圆形填充\r
        size: 100,\r
        //填充颜色更新为黄色 \r
        color: [1, 1, 0, 1]\r
    },\r
    //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 \r
    visualVariables: [{\r
        //控制显示的类型：颜色尺寸高度不透明度\r
        type: VisualType.Size,\r
        //属性字段名称 用id的值显示尺寸\r
        field: "id",\r
        //属性字段类型\r
        fieldType: FieldType.Number,\r
    }],\r
\r
};\r
\r
//用简单渲染器更新GeoJSONLayer 黄色\r
fdapi.geoJSONLayer.update({\r
    id: 'layer1',\r
    visible: true,//加载后是否显示\r
    range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效\r
    rotation: [0, 0, 0],//图层旋转\r
    offset: [0, 0, 10],//基于原始位置的偏移量\r
    needProject: true,//开启投影转换\r
    collision: true, //开启碰撞\r
\r
    url: HostConfig.Path + "/assets/geojson/point_84.geojson",\r
    renderer: simpleRenderer\r
});\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer1", 100);\r
}, 2000);\r
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
await fdapi.geoJSONLayer.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> AddJson(simple-point)\r
\r
\`\`\`js\r
//添加前先清除保证id唯一\r
fdapi.geoJSONLayer.clear();\r
\r
//简单渲染器\r
let simpleRenderer = {\r
    //渲染器类型\r
    rendererType: RendererType.SimpleRenderer,\r
    //默认符号化配置\r
    defaultSymbol: {\r
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
        symbolType: 0,\r
        //点的默认尺寸 针对simple-marker圆形填充\r
        size: 100,\r
        //默认填充颜色\r
        color: [1, 0, 0, 1]\r
    },\r
    //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 \r
    visualVariables: [{\r
        //控制显示的类型：颜色尺寸高度不透明度\r
        type: VisualType.Size,\r
        //属性字段名称\r
        field: "value",\r
        //属性字段类型\r
        fieldType: FieldType.Number\r
    }],\r
};\r
\r
let geojsonObj = {\r
    "type": "FeatureCollection",\r
    "name": "point",\r
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },\r
    "features": [\r
        { "type": "Feature", "properties": { "id": 0, "value": 100 }, "geometry": { "type": "Point", "coordinates": [113.913964837915572, 22.527855618646743] } },\r
        { "type": "Feature", "properties": { "id": 1, "value": 110 }, "geometry": { "type": "Point", "coordinates": [113.935580614470155, 22.529374559033467] } },\r
        { "type": "Feature", "properties": { "id": 2, "value": 120 }, "geometry": { "type": "Point", "coordinates": [113.91334163255496, 22.522039210087012] } },\r
        { "type": "Feature", "properties": { "id": 3, "value": 130 }, "geometry": { "type": "Point", "coordinates": [113.938253660934748, 22.522895425421694] } },\r
        { "type": "Feature", "properties": { "id": 4, "value": 140 }, "geometry": { "type": "Point", "coordinates": [113.943235589288946, 22.529515368348097] } },\r
        { "type": "Feature", "properties": { "id": 5, "value": 150 }, "geometry": { "type": "Point", "coordinates": [113.947122954386941, 22.518850089699615] } },\r
        { "type": "Feature", "properties": { "id": 6, "value": 160 }, "geometry": { "type": "Point", "coordinates": [113.940269986516199, 22.520865455198059] } },\r
        { "type": "Feature", "properties": { "id": 7, "value": 170 }, "geometry": { "type": "Point", "coordinates": [113.944205038437318, 22.524855691721285] } },\r
        { "type": "Feature", "properties": { "id": 8, "value": 180 }, "geometry": { "type": "Point", "coordinates": [113.929114005720194, 22.526566527370296] } },\r
        { "type": "Feature", "properties": { "id": 9, "value": 190 }, "geometry": { "type": "Point", "coordinates": [113.925636733672405, 22.514011157833803] } },\r
        { "type": "Feature", "properties": { "id": 10, "value": 200 }, "geometry": { "type": "Point", "coordinates": [113.941561038097902, 22.52800839633241] } },\r
    ]\r
};\r
\r
//用简单渲染器添加GeoJSONLayer\r
fdapi.geoJSONLayer.add({\r
    id: 'layer_json',\r
    visible: true,//加载后是否显示\r
    range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效\r
    rotation: [0, 0, 0],//图层旋转\r
    offset: [0, 0, 0],//基于原始位置的偏移量\r
    needProject: true,//开启投影转换\r
    sourceJson: geojsonObj,\r
    collision: true, //开启碰撞\r
    renderer: simpleRenderer\r
});\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer_json", 100);\r
}, 2000);\r
\`\`\`\r
\r
> AddFile(simple-point)\r
\r
\`\`\`js\r
//添加前先清除保证id唯一\r
fdapi.geoJSONLayer.clear();\r
\r
//简单渲染器\r
let simpleRenderer = {\r
    //渲染器类型\r
    rendererType: RendererType.SimpleRenderer,\r
    //默认符号化配置\r
    defaultSymbol: {\r
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
        symbolType: 0,\r
        //点的默认尺寸 针对simple-marker圆形填充\r
        size: 80,\r
        //默认填充颜色\r
        color: [1, 1, 0, 1]\r
    },\r
    //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 \r
    visualVariables: [{\r
        //控制显示的类型：颜色尺寸高度不透明度\r
        type: VisualType.Size,\r
        //属性字段名称 用id的值显示尺寸\r
        field: "id",\r
        //属性字段类型\r
        fieldType: FieldType.Number,\r
    }],\r
\r
};\r
\r
//用简单渲染器添加GeoJSONLayer\r
fdapi.geoJSONLayer.add({\r
    id: 'layer1',\r
    visible: true,//加载后是否显示\r
    range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效\r
    rotation: [0, 0, 0],//图层旋转\r
    offset: [0, 0, 10],//基于原始位置的偏移量\r
    needProject: true,//开启投影转换\r
    collision: true, //开启碰撞\r
    url: HostConfig.Path + "/assets/geojson/point_84.geojson",\r
    renderer: simpleRenderer\r
});\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer1", 100);\r
}, 2000);\r
\`\`\`\r
\r
> AddFile(simple-polyline)\r
\r
\`\`\`js\r
//添加前先清除保证id唯一\r
fdapi.geoJSONLayer.clear();\r
\r
//简单渲染器\r
let simpleRenderer = {\r
    //渲染器类型\r
    rendererType: RendererType.SimpleRenderer,\r
    //默认符号化配置\r
    defaultSymbol: {\r
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
        symbolType: 1,\r
        //填充颜色\r
        color: [1, 1, 0, 1],\r
        //默认轮廓线\r
        outline: {\r
            //线宽\r
            width: 2\r
        }\r
    }\r
};\r
\r
//用简单渲染器添加GeoJSONLayer\r
fdapi.geoJSONLayer.add({\r
    id: 'layer2',\r
    visible: true,//加载后是否显示\r
    rotation: [0, 0, 0],//图层旋转\r
    offset: [0, 0, 0],//基于原始位置的偏移量\r
    needProject: true,//开启投影转换\r
    collision: true, //开启碰撞\r
    onTerrain: true,//是否贴地\r
    enableAntialias: false,//是否开启反走样\r
    depthTest: false,//是否开启深度检测 注意：深度检测参数仅在反走样参数关闭时(enableAntialias=false)生效\r
    url: HostConfig.Path + "/assets/geojson/polyline_84.geojson",\r
    renderer: simpleRenderer\r
});\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer2", 100);\r
}, 2000);\r
\`\`\`\r
\r
> AddFile(simple-polygon)\r
\r
\`\`\`js\r
//添加前先清除保证id唯一\r
fdapi.geoJSONLayer.clear();\r
\r
//简单渲染器\r
let simpleRenderer = {\r
\r
    //渲染器类型\r
    rendererType: RendererType.SimpleRenderer,\r
    //是否生成顶面\r
    generateTop: false,\r
    //是否生成底面\r
    generateBottom: false,\r
    //默认符号化配置\r
    defaultSymbol: {\r
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
        symbolType: 3,\r
        //默认高度\r
        height: 10,\r
        //默认填充颜色\r
        color: [0, 0, 1, 1],\r
        //默认轮廓线\r
        outline: {\r
            //线宽\r
            width: 1,\r
            //颜色\r
            color: [1, 1, 1, 1],\r
        }\r
    },\r
    //根据字段高度拉高polygon，支持控制颜色、尺寸和透明度的插值显示 \r
    visualVariables: [{\r
        //控制显示的类型：颜色尺寸高度不透明度\r
        type: VisualType.Height,\r
        //属性字段名称\r
        field: "BLDG_HEIGH",\r
        //属性字段类型\r
        fieldType: FieldType.Number,\r
    }]\r
};\r
\r
//用简单渲染器添加GeoJSONLayer\r
fdapi.geoJSONLayer.add({\r
    id: 'layer3',\r
    visible: true,//加载后是否显示\r
    rotation: [0, 0, 0],//图层旋转\r
    offset: [0, 0, 0],//基于原始位置的偏移量\r
    needProject: true,//开启投影转换\r
    textField: "NOWNAME",//geojson文件内的属性字段名称\r
    textRange: [0, 280],//文字标注可见范围\r
    textSize: 22,//文字标注大小\r
    textColor: [0, 1, 0, 1],//文字标注颜色\r
    onTerrain: false,//是否贴地\r
    collision: true, //开启碰撞\r
\r
    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",\r
    renderer: simpleRenderer\r
});\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer3", 100);\r
}, 2000);\r
\`\`\`\r
\r
> AddFile(unique)\r
\r
\`\`\`js\r
//添加前先清除保证id唯一\r
fdapi.geoJSONLayer.clear();\r
//唯一值渲染器\r
let uniqueValueRenderer = {\r
    //渲染器类型\r
    rendererType: RendererType.UniqueValueRenderer,\r
    //是否生成顶面\r
    generateTop: false,\r
    //是否生成底面\r
    generateBottom: false,\r
    //渲染字段名称\r
    field: "NOWNAME",\r
    //属性字段类型\r
    fieldType: FieldType.String,\r
    //控制可视化显示的类型：颜色\r
    type: VisualType.Color,\r
    //默认符号化配置\r
    defaultSymbol: {\r
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
        symbolType: 2,\r
        //填充色\r
        color: [0, 1, 1, 1],\r
        //轮廓线\r
        outline: {\r
            //线宽\r
            width: 1,\r
            //颜色\r
            color: [1, 1, 1, 1]\r
        },\r
    },\r
    //根据NOWNAME字段的值进行不同颜色填充\r
    uniqueValueInfos: [\r
        {\r
            value: "滨海之窗1栋住宅",\r
            symbol: {\r
                //填充蓝色\r
                color: [0, 0, 1, 1],\r
            }\r
        },\r
        {\r
            value: "南山第二外国语学校",\r
            symbol: {\r
                //填充绿色\r
                color: [0, 1, 0, 1],\r
            }\r
        },\r
        {\r
            value: "保利城文化广场",\r
            symbol: {\r
                //填充黄色\r
                color: [1, 1, 0, 1],\r
            }\r
        },\r
        {\r
            value: "海岸城东座",\r
            symbol: {\r
                //填充红色\r
                color: [1, 0, 0, 1],\r
            }\r
        }\r
    ]\r
};\r
\r
\r
//可见性渲染器\r
let visibleRenderer = {\r
    //渲染器类型\r
    rendererType: RendererType.VisibleRenderer,\r
    //渲染字段名称\r
    field: "CQNAME",\r
    //属性字段类型\r
    fieldType: FieldType.String,\r
    //全局要素默认是否可见\r
    defaultVisible: true,\r
    //根据CQNAME字段的值进行显隐\r
    visibleValueInfos: [\r
        {\r
            value: "滨海之窗花园4栋",\r
            visible: false,\r
        },\r
        {\r
            value: "南油生活A区25栋",\r
            visible: false,\r
        },\r
        {\r
            value: "滨海之窗花园幼儿园",\r
            visible: false,\r
        },\r
        {\r
            value: "南油单身宿舍B20栋",\r
            visible: false,\r
        }\r
    ]\r
};\r
\r
//用唯一值渲染器添加GeoJSONLayer\r
fdapi.geoJSONLayer.add({\r
    id: 'layer4',\r
    visible: true,//加载后是否显示\r
    rotation: [0, 0, 0],//图层旋转\r
    offset: [0, 0, 0],//基于原始位置的偏移量\r
    needProject: true,//开启投影转换\r
    textField: "NOWNAME",//geojson文件内的属性字段名称\r
    textRange: [0, 200],//文字标注可见范围\r
    textSize: 22,//文字标注大小\r
    textColor: [0, 1, 0, 1],//文字标注颜色\r
    onTerrain: true,//是否贴地\r
    collision: true, //开启碰撞\r
\r
    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",\r
    renderer: uniqueValueRenderer,\r
    visibleRenderer: visibleRenderer\r
});\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer4", 100);\r
}, 2000);\r
\`\`\`\r
\r
> AddFile(class)\r
\r
\`\`\`js\r
//添加前先清除保证id唯一\r
fdapi.geoJSONLayer.clear();\r
\r
//分类渲染器 按区间值范围进行分类符号化\r
const less25 = {\r
    color: [255 / 255, 0 / 255, 0 / 255, 1],\r
};\r
\r
const less50 = {\r
    color: [193 / 255, 235 / 255, 233 / 255, 1],\r
};\r
\r
const less75 = {\r
    color: [51 / 255, 128 / 255, 174 / 255, 1],\r
};\r
\r
const less100 = {\r
    color: [239 / 255, 237 / 255, 234 / 255, 1],\r
};\r
\r
//分类渲染器\r
let classBreaksRenderer = {\r
    rendererType: RendererType.ClassBreaksRenderer,\r
    //是否生成顶面\r
    generateTop: false,\r
    //是否生成底面\r
    generateBottom: false,\r
    //按属性取值分类着色\r
    field: "BLDG_HEIGH",\r
    //属性字段类型\r
    fieldType: FieldType.Number,\r
    //控制可视化显示的类型：颜色\r
    type: VisualType.Color,\r
    //开启颜色范围插值\r
    gradient: false,\r
    //材质样式\r
    // style: 11,\r
    //默认符号化配置\r
    defaultSymbol: {\r
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
        symbolType: 2,\r
        //填充色\r
        color: [1, 1, 0, 1],\r
        //轮廓线\r
        outline: {\r
            //线宽\r
            width: 1,\r
            //颜色\r
            color: [0.1, 0.1, 0.1, 1]\r
        },\r
    },\r
    //按field高度属性拉高面\r
    visualVariables: [{\r
        //控制可视化显示的类型：高度\r
        type: VisualType.Height,\r
        //属性字段名称\r
        field: "BLDG_HEIGH",\r
        //属性字段类型\r
        fieldType: FieldType.Number,\r
    }],\r
    //根据BLDG_HEIGH字段的不同区间值使用不同的符号化配置颜色\r
    classBreakInfos: [\r
        {\r
            minValue: 0,\r
            maxValue: 25,\r
            symbol: less25\r
        },\r
        {\r
            minValue: 25,\r
            maxValue: 50,\r
            symbol: less50\r
        },\r
        {\r
            minValue: 50,\r
            maxValue: 75,\r
            visible: true,\r
            symbol: less75\r
        },\r
        {\r
            minValue: 75,\r
            maxValue: 100,\r
            symbol: less100\r
        }\r
    ]\r
};\r
\r
//可见性渲染器\r
let visibleRenderer = {\r
    //渲染器类型\r
    rendererType: RendererType.VisibleRenderer,\r
    //渲染字段名称\r
    field: "BLDG_HEIGH",\r
    //属性字段类型\r
    fieldType: FieldType.Number,\r
    //全局要素默认是否可见\r
    defaultVisible: true,\r
    //根据BLDG_HEIGH字段的值的范围进行显隐  大于高度50米则显示\r
    visibleValueInfos: [\r
        {\r
            minValue: 0,\r
            maxValue: 25,\r
            visible: true,\r
        },\r
        {\r
            minValue: 25,\r
            maxValue: 50,\r
            visible: true,\r
        },\r
        {\r
            minValue: 50,\r
            maxValue: 75,\r
            visible: true,\r
        },\r
        {\r
            minValue: 75,\r
            maxValue: 200,\r
            visible: true,\r
        }\r
    ]\r
};\r
\r
//用分类渲染器添加GeoJSONLayer\r
fdapi.geoJSONLayer.add({\r
    id: 'layer5',\r
    visible: true,//加载后是否显示\r
    rotation: [0, 0, 0],//图层旋转\r
    offset: [0, 0, 0],//基于原始位置的偏移量\r
    needProject: true,//开启投影转换\r
    textField: "NOWNAME",//geojson文件内的属性字段名称\r
    textRange: [0, 280],//文字标注可见范围\r
    textSize: 22,//文字标注大小\r
    textColor: [0, 1, 0, 1],//文字标注颜色\r
    onTerrain: false,//是否贴地\r
    collision: true, //开启碰撞\r
\r
    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",\r
    renderer: classBreaksRenderer,\r
    visibleRenderer: visibleRenderer,\r
});\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer5", 100);\r
}, 2000);\r
\`\`\`\r
\r
> AddFile(visible)\r
\r
\`\`\`js\r
//添加前先清除保证id唯一\r
fdapi.geoJSONLayer.clear();\r
\r
//分类渲染器 按区间值范围进行分类符号化\r
const less25 = {\r
    color: [0, 0, 1, 1],\r
};\r
\r
const less50 = {\r
    color: [0, 1, 0, 1],\r
};\r
\r
const less75 = {\r
    color: [1, 1, 0, 1],\r
};\r
\r
const less100 = {\r
    color: [1, 0, 0, 1],\r
};\r
\r
//分类渲染器\r
let classBreaksRenderer = {\r
    rendererType: RendererType.ClassBreaksRenderer,\r
    //按属性取值分类着色\r
    field: "BLDG_HEIGH",\r
    //属性字段类型\r
    fieldType: FieldType.Number,\r
    //控制可视化显示的类型：颜色\r
    type: VisualType.Color,\r
    //开启颜色范围插值\r
    gradient: true,\r
    //默认符号化配置\r
    defaultSymbol: {\r
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充\r
        symbolType: 2,\r
        //填充色\r
        color: [1, 1, 0, 1],\r
        //轮廓线\r
        outline: {\r
            //线宽\r
            width: 1,\r
            //颜色\r
            color: [1, 1, 1, 1]\r
        },\r
    },\r
    //按field高度属性拉高面\r
    visualVariables: [{\r
        //控制可视化显示的类型：高度\r
        type: VisualType.Height,\r
        //属性字段名称\r
        field: "BLDG_HEIGH",\r
        //属性字段类型\r
        fieldType: FieldType.Number,\r
    }],\r
    //根据BLDG_HEIGH字段的不同区间值使用不同的符号化配置颜色\r
    classBreakInfos: [\r
        {\r
            minValue: 0,\r
            maxValue: 25,\r
            symbol: less25\r
        },\r
        {\r
            minValue: 25,\r
            maxValue: 50,\r
            symbol: less50\r
        },\r
        {\r
            minValue: 50,\r
            maxValue: 75,\r
            visible: true,\r
            symbol: less75\r
        },\r
        {\r
            minValue: 75,\r
            maxValue: 100,\r
            symbol: less100\r
        }\r
    ]\r
};\r
\r
//可见性渲染器\r
let visibleRenderer = {\r
    //渲染器类型\r
    rendererType: RendererType.VisibleRenderer,\r
    //渲染字段名称\r
    field: "BLDG_HEIGH",\r
    //属性字段类型\r
    fieldType: FieldType.Number,\r
    //全局要素默认是否可见\r
    defaultVisible: true,\r
    //根据BLDG_HEIGH字段的值的范围进行显隐  大于高度50米则显示\r
    visibleValueInfos: [\r
        {\r
            minValue: 0,\r
            maxValue: 25,\r
            visible: false,\r
        },\r
        {\r
            minValue: 25,\r
            maxValue: 50,\r
            visible: false,\r
        },\r
        {\r
            minValue: 50,\r
            maxValue: 75,\r
            visible: true,\r
        },\r
        {\r
            minValue: 75,\r
            maxValue: 100,\r
            visible: true,\r
        }\r
    ]\r
};\r
\r
//用分类渲染器和可见性渲染器添加GeoJSONLayer\r
fdapi.geoJSONLayer.add({\r
    id: 'layer5',\r
    visible: true,//加载后是否显示\r
    rotation: [0, 0, 0],//图层旋转\r
    offset: [0, 0, 0],//基于原始位置的偏移量\r
    needProject: true,//开启投影转换\r
    textField: "NOWNAME",//geojson文件内的属性字段名称\r
    textRange: [0, 280],//文字标注可见范围\r
    textSize: 22,//文字标注大小\r
    textColor: [0, 1, 0, 1],//文字标注颜色\r
    onTerrain: false,//是否贴地\r
    collision: true, //开启碰撞\r
\r
    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",\r
    renderer: classBreaksRenderer,\r
    visibleRenderer: visibleRenderer,\r
});\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer5", 100);\r
}, 2000);\r
\`\`\`\r
\r
> AddFile(materials)\r
\r
\`\`\`js\r
//添加前先清除保证id唯一\r
fdapi.geoJSONLayer.clear();\r
\r
//自定义材质示例\r
let layer6 = {\r
    id: "layer6",\r
    visible: true,\r
    rotation: [\r
        0,\r
        0,\r
        0\r
    ],\r
    offset: [\r
        0,\r
        0,\r
        0\r
    ],\r
    needProject: true,\r
    textField: "NOWNAME",//geojson文件内的属性字段名称\r
    textRange: [\r
        0,\r
        280\r
    ],\r
    onTerrain: false,\r
    collision: true,\r
\r
    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",\r
    renderer: {\r
        rendererType: 2,\r
        materials: [\r
            {\r
                index: 0,\r
                material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",\r
                scalarParameters: [{ "name": "不透明度", "value": 0.2 }, { "name": "类型", "value": 0 }],\r
                vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]\r
            },\r
            {\r
                index: 1,\r
                material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",\r
                scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 1 }],\r
                vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]\r
            },\r
            {\r
                index: 2,\r
                material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",\r
                scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 2 }],\r
                vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]\r
            },\r
            {\r
                index: 3,\r
                material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",\r
                scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 3 }],\r
                vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]\r
            }\r
        ],\r
        field: "BLDG_HEIGH",\r
        fieldType: 1,\r
        type: 0,\r
        gradient: true,\r
        defaultSymbol: {\r
            symbolType: 2,\r
            color: [\r
                1,\r
                1,\r
                0,\r
                1\r
            ],\r
            outline: {\r
                width: 1,\r
                color: [\r
                    1,\r
                    1,\r
                    1,\r
                    1\r
                ]\r
            }\r
        },\r
        visualVariables: [\r
            {\r
                type: 1,\r
                field: "BLDG_HEIGH",\r
                fieldType: 1\r
            }\r
        ],\r
        classBreakInfos: [\r
            {\r
                minValue: 0,\r
                maxValue: 25,\r
                symbol: {\r
                    color: [\r
                        0,\r
                        0,\r
                        1,\r
                        1\r
                    ]\r
                }\r
            },\r
            {\r
                minValue: 25,\r
                maxValue: 50,\r
                symbol: {\r
                    color: [\r
                        0,\r
                        1,\r
                        0,\r
                        1\r
                    ]\r
                }\r
            },\r
            {\r
                minValue: 50,\r
                maxValue: 75,\r
                visible: true,\r
                symbol: {\r
                    color: [\r
                        1,\r
                        1,\r
                        0,\r
                        1\r
                    ]\r
                }\r
            },\r
            {\r
                minValue: 75,\r
                maxValue: 100,\r
                symbol: {\r
                    color: [\r
                        1,\r
                        0,\r
                        0,\r
                        1\r
                    ]\r
                }\r
            }\r
        ]\r
    },\r
    materialRenderer: {\r
        rendererType: 3,\r
        field: "BLDG_HEIGH",\r
        fieldType: 1,\r
        defaultMaterial: 0,\r
        materialValueInfos: [\r
            {\r
                minValue: 0,\r
                maxValue: 25,\r
                index: 0\r
            },\r
            {\r
                minValue: 25,\r
                maxValue: 50,\r
                index: 1\r
            },\r
            {\r
                minValue: 50,\r
                maxValue: 75,\r
                index: 2\r
            },\r
            {\r
                minValue: 75,\r
                maxValue: 100,\r
                index: 3\r
            }\r
        ]\r
    },\r
    visibleRenderer: {\r
        rendererType: 1,\r
        field: "BLDG_HEIGH",\r
        fieldType: 1,\r
        defaultVisible: true,\r
        visibleValueInfos: [\r
            {\r
                minValue: 0,\r
                maxValue: 25,\r
                visible: true\r
            },\r
            {\r
                minValue: 25,\r
                maxValue: 50,\r
                visible: true\r
            },\r
            {\r
                minValue: 50,\r
                maxValue: 75,\r
                visible: true\r
            },\r
            {\r
                minValue: 75,\r
                maxValue: 100,\r
                visible: true\r
            }\r
        ]\r
    }\r
};\r
fdapi.geoJSONLayer.add(layer6);\r
\r
setTimeout(function () {\r
    fdapi.geoJSONLayer.focus("layer6", 100);\r
}, 2000);\r
\`\`\`\r
\r
> 取消高亮GeoJSONLayer内部单个要素区域：UnHighlightFeature\r
\r
\`\`\`js\r
fdapi.geoJSONLayer.unHighlightFeature('layer3', 1);\r
\`\`\`\r
\r
> 取消高亮GeoJSONLayer内部多个要素区域：UnHighlightFeatures\r
\r
\`\`\`js\r
fdapi.geoJSONLayer.unHighlightFeatures([{ "id": "layer3", "featureIds": [1, 2, 3] }]);\r
\`\`\`\r
\r
> 取消高亮GeoJSONLayer内部所有要素区域：UnHighlightAllFeaturesById\r
\r
\`\`\`js\r
fdapi.geoJSONLayer.unHighlightAllFeaturesById(["layer1", "layer2", "layer3"]);\r
\`\`\`\r
`;export{r as default};
