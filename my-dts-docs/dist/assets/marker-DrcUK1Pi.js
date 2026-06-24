const r=`---\r
slug: /api/marker/marker\r
title: Marker\r
sidebar_label: Marker\r
description: "在三维场景指定坐标处放置带图标与文字的标注点，是最常用的点位标记对象，支持图标、悬停图片、文字、可视范围、分组及交互事件，用于标识地物、设备、事件等关键点位。"\r
---\r
\r
# Marker\r
\r
标注点，实现对标注对象的操作\r
\r
Marker标注点的效果图：\r
\r
\r
\r
![](/img/refdoc/api/show_marker.gif)\r
\r
通过 \`api.marker\` 访问。\r
\r
## 业务场景 Skill\r
\r
> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。\r
\r
- **功能介绍**：在三维场景指定坐标处放置带图标与文字的标注点，是最常用的点位标记对象，支持图标、悬停图片、文字、可视范围、分组及交互事件，用于标识地物、设备、事件等关键点位。\r
- **别名 / 不同行业叫法**：标注点、标牌、POI、兴趣点、告警点、点位、图标点、报警点。\r
- **适用行业**：智慧城市、应急指挥、智慧交通、能源电力、智慧园区、文博展陈。\r
- **使用场景**：\r
  - 在地图/场景上批量标注监控点、传感器、消防栓、摄像头等设备点位\r
  - 应急场景下标注告警点、事故点、风险源并叠加状态图标与文字\r
  - 园区/楼宇的资产点位标识与点击查看详情交互\r
- **注意事项**：\r
  - 单次创建的 Marker 数量不要超过 5000 个，单工程内总量不要超过 20 万个，超量会影响性能；\r
  - 通过 range / textRange / viewHeightRange 控制可视范围，避免海量标注同屏堆叠；\r
  - 注意 coordinateType 坐标系（Projection/WGS84/GCJ02/BD09）与场景一致；\r
  - 图标资源需按资源引入说明加载，支持 gif 动图但应控制资源大小。\r
  - 支持样式包括纯文字标签、图标、文字+图片片、自定义html弹窗、视频弹窗\r
\r
## 构造函数\r
\r
\`\`\`js\r
new Marker()\r
\`\`\`\r
\r
---\r
\r
\r
## 方法列表\r
\r
| 方法 | 说明 | 适用业务场景 |\r
|------|------|------------|\r
| [\`add\`](#add) | 添加一个或多个标注点  调用时 | 向场景批量添加对象 |\r
| [\`attachObject\`](#attachObject) | 设置Marker贴合模型对象进行移动，设置贴合后Marker会跟随模型一起平滑运动，支持… |  |\r
| [\`clear\`](#clear) | 删除场景中所有的标注 | 清空全部对象，重置图层 |\r
| [\`delete\`](#delete) | 删除一个或多个标注对象 | 按 ID 移除指定对象 |\r
| [\`deleteByGroupId\`](#deleteByGroupId) | 根据分组ID删除Marker |  |\r
| [\`focus\`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |\r
| [\`focusAll\`](#focusAll) | 自动定位到能观察所有Marker对象的合适距离 | 相机定位到全部对象的合适视角 |\r
| [\`get\`](#get) | 根据ID获取标注的详细信息 | 查询对象信息，用于业务联动 |\r
| [\`hide\`](#hide) | 隐藏标注 | 按业务条件隐藏对象 |\r
| [\`hideAll\`](#hideAll) | 隐藏所有标注 | 一键隐藏全部对象 |\r
| [\`hideAllPopupWindow\`](#hideAllPopupWindow) | 隐藏所有标注的弹出窗口 |  |\r
| [\`hideByGroupId\`](#hideByGroupId) | 根据分组ID隐藏Marker |  |\r
| [\`hidePopupWindow\`](#hidePopupWindow) | 隐藏指定标注的弹出窗口 |  |\r
| [\`setAnchors\`](#setAnchors) | 设置标注的整体偏移量（修改锚点） |  |\r
| [\`setAutoHidePopupWindow\`](#setAutoHidePopupWindow) | 设置是否自动关闭标注的弹出窗口 |  |\r
| [\`setClusterStyle\`](#setClusterStyle) | 设置marker聚合样式 |  |\r
| [\`setCoordinate\`](#setCoordinate) | 设置标注的位置 |  |\r
| [\`setFontColor\`](#setFontColor) | 设置标注文本颜色 |  |\r
| [\`setFontOutlineColor\`](#setFontOutlineColor) | 设置字体轮廓线颜色 |  |\r
| [\`setFontOutlineSize\`](#setFontOutlineSize) | 设置字体轮廓线大小 |  |\r
| [\`setFontSize\`](#setFontSize) | 设置字体大小 |  |\r
| [\`setGroupId\`](#setGroupId) | 设置分组 |  |\r
| [\`setHoverImagePath\`](#setHoverImagePath) | 设置鼠标悬停时显示的图片路径 |  |\r
| [\`setImagePath\`](#setImagePath) | 设置标注的图片 |  |\r
| [\`setImageSize\`](#setImageSize) | 设置标注图片的大小 |  |\r
| [\`setLineColor\`](#setLineColor) | 设置LineColor |  |\r
| [\`setLineOffset\`](#setLineOffset) | 设置LineOffset |  |\r
| [\`setLineSize\`](#setLineSize) | 设置LineSize |  |\r
| [\`setOcclusionCull\`](#setOcclusionCull) | 设置是否参与遮挡剔除 |  |\r
| [\`setPopupOffset\`](#setPopupOffset) | 设置弹窗偏移: [x, y] |  |\r
| [\`setPopupSize\`](#setPopupSize) | 设置弹窗大小: [width, height] |  |\r
| [\`setPopupURL\`](#setPopupURL) | 设置弹窗HTML链接 |  |\r
| [\`setPriority\`](#setPriority) | 设置避让优先级 |  |\r
| [\`setRange\`](#setRange) | 设置标注的可见范围 |  |\r
| [\`setText\`](#setText) | 设置标注的文本 |  |\r
| [\`setTextBackgroundColor\`](#setTextBackgroundColor) | 设置标注文本的背景颜色 |  |\r
| [\`setTextOffset\`](#setTextOffset) | 设置文本偏移 |  |\r
| [\`setTextRange\`](#setTextRange) | 设置文本可视范围: [近裁距离, 远裁距离] |  |\r
| [\`setURL\`](#setURL) | 设置标注的URL |  |\r
| [\`setUserData\`](#setUserData) | 设置用户数据 |  |\r
| [\`setViewportVisible\`](#setViewportVisible) | 多视口状态下，设置Marker对象在各视口的可见性 |  |\r
| [\`show\`](#show) | 显示标注 | 按业务条件显示对象 |\r
| [\`showAll\`](#showAll) | 显示所有标注 | 一键显示全部对象 |\r
| [\`showAllPopupWindow\`](#showAllPopupWindow) | 显示所有标注的弹出窗口 |  |\r
| [\`showByGroupId\`](#showByGroupId) | 根据分组ID显示Marker |  |\r
| [\`showPopupWindow\`](#showPopupWindow) | 显示指定标注的弹出窗口 |  |\r
| [\`update\`](#update) | 修改一个或多个标注对象 | 运行时动态更新对象属性/状态 |\r
| [\`updateBegin\`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |\r
| [\`updateEnd\`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |\r
\r
## 方法（Methods）\r
\r
### \`add(data, fn)\` {#add}\r
\r
添加一个或多个标注点  调用时注意：单次创建的Marker对象数量不要超过5000个，在一个工程内创建的Marker对象总数量不要超过20万个。\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 标注点的数据，可以是Object类型或者Array类型，对于每一个标注点，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注点的唯一标识符 |\r
| \`groupId\` | \`string\` | 可选，Group分组 |\r
| \`userData\` | \`string\` | 可选，用户自定义数据 |\r
| \`coordinateType\` | \`number\` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |\r
| \`coordinate\` | \`array\` | 标注点的位置坐标: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |\r
| \`anchors\` | \`array\` | 锚点: [x, y]，设置Marker的聚焦图片位置的偏移，默认值：[0,0]，取值规则如下图： ![](/img/refdoc/api/anchors.png) |\r
| \`range\` | \`array\` | 可视范围: [近裁距离, 远裁距离]，默认值: [10, 10000] |\r
| \`textRange\` | \`array\` | 文本可视范围: [近裁距离, 远裁距离]，默认值: [100, 6000] |\r
| \`viewHeightRange\` | \`array\` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |\r
| \`rangeRatio\` | \`number\` | 可视范围的衰减因子，取值范围：[0~1]，仅在设置了viewHeightRange后才生效，会根据相机高度对可见距离进行衰减，相机高度=maxViewHeight时，marker的可见范围是range，相机高度下降到minViewHeight时marker的可见范围会线性衰减到rangeRatio*range |\r
| \`imageSize\` | \`array\` | 图片的尺寸: [width, height]， 默认值[32,32] |\r
| \`fixedSize\` | \`boolean\` | 图片是否固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false |\r
| \`imagePath\` | \`string\` | 图片路径，支持gif动图，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |\r
| \`hoverImagePath\` | \`string\` | 鼠标悬停时显示的图片路径，支持gif动图，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |\r
| \`hoverImageSize\` | \`array\` | 鼠标悬停时显示的图片尺寸: [width, height]， 默认值：[0,0] 使用图片自身的尺寸，注意：如果设置的值比imageSize尺寸小，则默认使用imageSize的尺寸。 |\r
| \`text\` | \`string\` | 显示的文字 |\r
| \`useTextAnimation\` | \`boolean\` | 是否打开文字展开动画效果，默认值：true |\r
| \`textOffset\` | \`array\` | 文本偏移: [x, y]，默认值：[0,0] |\r
| \`fontSize\` | \`number\` | 字体大小，默认值：12 |\r
| \`fontOutlineSize\` | \`number\` | 字体轮廓线大小，默认值：1 |\r
| \`textBackgroundColor\` | [\`Color\`](/docs/api/types#color) | 文本背景颜色，默认值白色[1, 1, 1, 0.85]，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fontColor\` | [\`Color\`](/docs/api/types#color) | 字体颜色，默认值：黑色Color.Black，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fontOutlineColor\` | [\`Color\`](/docs/api/types#color) | 字体轮廓线颜色，默认值：黑色Color.Black，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`popupBackgroundColor\` | [\`Color\`](/docs/api/types#color) | 弹窗背景颜色， [1.0,1.0,1.0,0.1] ，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`popupURL\` | \`string\` | 弹窗HTML链接或者视频文件路径，也支持实时流媒体视频地址，[资源引入说明](/docs/tutorials/resources) |\r
| \`popupSize\` | \`array\` | 弹窗大小: [width, height]，默认值：[600,400] |\r
| \`popupOffset\` | \`array\` | 弹窗偏移: [x, y]，默认值：[0,0] |\r
| \`showLine\` | \`boolean\` | 标注点下方是否显示垂直牵引线，默认不显示：false |\r
| \`lineSize\` | \`array\` | 牵引线粗细[width, height]，默认值：[0,0]，如果要显示牵引线，需要将该属性设置成非0值 |\r
| \`lineColor\` | [\`Color\`](/docs/api/types#color) | 牵引线颜色，默认值：白色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`lineOffset\` | \`array\` | 牵引线偏移: [x, y]，默认值：[0,0] |\r
| \`autoHidePopupWindow\` | \`boolean\` | 是否自动关闭弹出窗口，默认值：true |\r
| \`autoHideText\` | \`boolean\` | 打开弹窗时是否自动隐藏文字，默认值：true |\r
| \`autoHeight\` | \`boolean\` | 自动判断下方是否有物体，设置正确高度，默认值：false。注意：如果Marker坐标的z值是0或者不设置，则自动判断位置下方是否有物体并进行贴合，如果z有值则相当于z方向的offset偏移 |\r
| \`displayMode\` | \`number\` | 显示模式，默认值：4，取值说明如下： |\r
| \`autoDisplayModeSwitchFirstRatio\` | \`number\` | 智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2 |\r
| \`autoDisplayModeSwitchSecondRatio\` | \`number\` | 智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=0 |\r
| \`clusterByImage\` | \`boolean\` | 聚合时是否根据图片路径(imagePath)分类聚合显示，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合 |\r
| \`priority\` | \`number\` | 避让优先级，默认值：0，注意：值越大显示越靠上 |\r
| \`occlusionCull\` | \`boolean\` | 是否参与遮挡剔除，注意：仅displayMode设置为0或1时，遮挡剔除才会生效 |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Add\r
\r
\`\`\`js\r
fdapi.marker.clear();\r
//支持经纬度坐标和普通投影坐标两种类型\r
let o1 = {\r
    id: 'm1',\r
    groupId: 'markerAdd',\r
    coordinate: [492548.01156250003, 2491828.58796875, 132.697470703125],//坐标位置\r
    coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1\r
    anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height\r
    imageSize: [50, 50],//图片的尺寸\r
    hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸\r
    range: [1, 1000000],//可视范围\r
    viewHeightRange: [1, 1000000],// 可见高度范围\r
    rangeRatio: 0.01,//可见高度范围的调整系数\r
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径\r
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径\r
    fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false \r
\r
    text: '北京银行',//显示的文字 \r
    useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率\r
    textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]\r
    textOffset: [0, 0],// 文本偏移\r
    textBackgroundColor: Color.SpringGreen,//文本背景颜色\r
    fontSize: 24,//字体大小\r
    fontOutlineSize: 1,//字体轮廓线大小\r
    fontColor: Color.White,//字体颜色\r
    fontOutlineColor: Color.Black,//字体轮廓线颜色\r
\r
    popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接\r
    popupBackgroundColor: [1.0, 1.0, 1.0, 1],//弹窗背景颜色\r
    popupSize: [300, 300],//弹窗大小\r
    popupOffset: [0, 0],//弹窗偏移\r
\r
    showLine: true,//标注点下方是否显示垂直牵引线\r
    lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]\r
    lineColor: Color.SpringGreen,//垂直牵引线颜色\r
    lineOffset: [0, 0],//垂直牵引线偏移\r
\r
    autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口\r
    autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：false\r
    autoHeight: false,// 自动判断下方是否有物体  开启后会叠加坐标Z\r
    displayMode: 4,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 \r
    clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合\r
    priority: 1,//避让优先级 值越大显示越靠上\r
    occlusionCull: false//是否参与遮挡\r
};\r
\r
\r
let o2 = {\r
    id: 'm2',\r
    groupId: 'markerAdd',\r
    coordinate: [492705.448125, 2491800.24453125, 0],//坐标位置 自动高度开启可以不给坐标高度z 标注可以定位到下方物体上\r
    coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1\r
    anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height\r
    imageSize: [50, 50],//图片的尺寸\r
    hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸\r
    fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false \r
\r
\r
    range: [1, 1000000],//可视范围\r
    viewHeightRange: [1, 1000000],// 可见高度范围\r
    rangeRatio: 0.01,//可见高度范围的调整系数\r
\r
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径\r
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径\r
\r
    text: '招商银行',//显示的文字\r
    useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率\r
    textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]\r
    textOffset: [0, 0],// 文本偏移\r
    textBackgroundColor: Color.SpringGreen,//文本背景颜色\r
    fontSize: 24,//字体大小\r
    fontOutlineSize: 1,//字体轮廓线大小\r
    fontColor: Color.White,//字体颜色\r
    fontOutlineColor: Color.Black,//字体轮廓线颜色\r
\r
    popupURL: HostConfig.Path + '/locale/zh/help.html',//弹窗HTML链接\r
    popupBackgroundColor: [1.0, 1.0, 1.0, 1],//弹窗背景颜色\r
    popupSize: [600, 600],//弹窗大小\r
    popupOffset: [0, 0],//弹窗偏移\r
\r
    showLine: true,//标注点下方是否显示垂直牵引线\r
    lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]\r
    lineColor: Color.SpringGreen,//垂直牵引线颜色\r
    lineOffset: [0, 0],//垂直牵引线偏移\r
\r
    autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口\r
    autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：true\r
    autoHeight: true,// 自动判断下方是否有物体 开启后会叠加坐标Z\r
    displayMode: 4,// 智能显示模式: 根据当前相机高度自动适配以上模式，类似金字塔lod加载效果，内置规则:range范围的1%内取值2，1%至10%取值1，大于10%取值0\r
    autoDisplayModeSwitchFirstRatio: 0.01,//智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2\r
    autoDisplayModeSwitchSecondRatio: 0.1,//智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=1\r
    clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合\r
    priority: 2,//避让优先级 值越大显示越靠上\r
    occlusionCull: false//是否参与遮挡\r
};\r
\r
let o3 = {\r
    id: 'm3',\r
    groupId: 'markerAdd',\r
    coordinate: [492817.4336328125, 2491807.7020703126, 149.757939453125],//坐标位置 自动高度开启可以不给坐标高度z 标注可以定位到下方物体上\r
    coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1\r
    anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height\r
    imageSize: [50, 50],//图片的尺寸\r
    hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸\r
    fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false \r
\r
\r
    range: [1, 1000000],//可视范围\r
    viewHeightRange: [1, 1000000],// 可见高度范围\r
    rangeRatio: 0.01,//可见高度范围的调整系数\r
\r
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径\r
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径\r
\r
    text: '中国银行',//显示的文字\r
    useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率\r
    textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]\r
    textOffset: [0, 0],// 文本偏移\r
    textBackgroundColor: Color.SpringGreen,//文本背景颜色\r
    fontSize: 24,//字体大小\r
    fontOutlineSize: 1,//字体轮廓线大小\r
    fontColor: Color.White,//字体颜色\r
    fontOutlineColor: Color.Black,//字体轮廓线颜色\r
\r
    popupURL: HostConfig.Path + 'locale/zh/help.html',//弹窗HTML链接\r
    popupBackgroundColor: [1, 1, 1, 1],//弹窗背景颜色\r
    popupSize: [600, 600],//弹窗大小\r
    popupOffset: [0, 0],//弹窗偏移\r
\r
    showLine: true,//标注点下方是否显示垂直牵引线\r
    lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]\r
    lineColor: Color.SpringGreen,//垂直牵引线颜色\r
    lineOffset: [0, 0],//垂直牵引线偏移\r
\r
    autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口\r
    autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：true\r
    autoHeight: false,// 自动判断下方是否有物体 开启后会叠加坐标Z\r
    displayMode: 4,// 智能显示模式\r
    autoDisplayModeSwitchFirstRatio: 0.01,//智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2\r
    autoDisplayModeSwitchSecondRatio: 0.1,//智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=1\r
    clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合\r
    priority: 3,//避让优先级 值越大显示越靠上\r
    occlusionCull: false//是否参与遮挡\r
};\r
let markerArr = [];\r
markerArr.push(o1);\r
markerArr.push(o2);\r
markerArr.push(o3);\r
//海量poi添加请使用批量添加 提供效率 \r
await fdapi.marker.add(markerArr);\r
fdapi.marker.focus(o1.id, 100, 0);\r
\`\`\`\r
\r
> 示例：用canvas绘制标签的imagePath属性：Add\r
\r
\`\`\`js\r
// 生成图片\r
if (!__canvas)\r
    __canvas = document.createElement("canvas");\r
\r
let img = new Image()\r
img.src = __base64_tagBg;\r
img.onload = () => {\r
\r
    __canvas.width = img.width;\r
    __canvas.height = img.height;\r
\r
    var ctx = __canvas.getContext("2d");\r
    ctx.drawImage(img, 0, 0);\r
    ctx.fillStyle = "#fff";\r
    ctx.font = "36px Bold Verdana";\r
    ctx.textBaseline = "middle";\r
    ctx.fillText("农村商业银行", 60, 50);\r
\r
\r
    let o = {};\r
    o.id = 'canvas_marker1';\r
    o.coordinate = [492705.53125, 2491816.25, 20.719257354736328];\r
    o.imagePath = __canvas.toDataURL("image/jpg");\r
    o.imageSize = [165, 63];\r
    o.popupURL = '';\r
    o.url = HostConfig.Path + '/locale/zh/popup_simple.html';\r
    o.range = [1, 8000.0];\r
\r
    fdapi.marker.delete('canvas_marker1')\r
        .then(() => fdapi.marker.add(o))\r
        .then(() => fdapi.marker.focus('canvas_marker1', 10, 0.2));\r
}\r
\`\`\`\r
\r
---\r
\r
### \`attachObject(data, fn)\` {#attachObject}\r
\r
设置Marker贴合模型对象进行移动，设置贴合后Marker会跟随模型一起平滑运动，支持的对象类型：CustomObject、Vehicle、Vehicle2、Train、Drone\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`object \\| array\` | 模型对象id和MarkerId的数据映射对象数组，可以是Object类型或者Array类型，对于每一个映射对象，支持以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`data\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`markerId\` | \`string\` | 标注Marker对象id |\r
| \`objectId\` | \`string\` | 被贴合的对象id，支持的对象类型：CustomObject、Vehicle、Vehicle2、Train、Drone |\r
| \`offset\` | \`array\` | 贴合的偏移量，[X,Y,Z]，[取值示例](/docs/tutorials/coordinates) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.marker.attachObject(data);\r
\`\`\`\r
\r
---\r
\r
### \`clear(fn)\` {#clear}\r
\r
删除场景中所有的标注\r
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
fdapi.marker.clear();\r
\`\`\`\r
\r
---\r
\r
### \`delete(ids, fn)\` {#delete}\r
\r
删除一个或多个标注对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要删除的标注对象的ID或者ID数组（可以删除一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Delete\r
\r
\`\`\`js\r
fdapi.marker.delete(['m1', 'm2']);\r
\`\`\`\r
\r
---\r
\r
### \`deleteByGroupId(groupIds, fn)\` {#deleteByGroupId}\r
\r
根据分组ID删除Marker\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupIds\` | \`string \\| array\` | Marker创建时指定的分组ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：DeleteByGroupId\r
\r
\`\`\`js\r
fdapi.marker.deleteByGroupId('markerAdd');\r
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
| \`ids\` | \`string \\| array\` | 标注对象的ID或者ID数组 |\r
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
fdapi.marker.focus('m1', 200, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`focusAll(distance, flyTime, rotation, fn)\` {#focusAll}\r
\r
自动定位到能观察所有Marker对象的合适距离\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`distance\` | \`number\` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |\r
| \`flyTime\` | \`number\` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |\r
| \`rotation\` | \`array\` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：FocusAll\r
\r
\`\`\`js\r
fdapi.marker.focusAll(200, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`get(ids, fn)\` {#get}\r
\r
根据ID获取标注的详细信息\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 要获取的标注对象ID或者ID数组（可以获取一个或者多个） |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 异步方法，查询结果通过回调函数 \`fn\` 返回（也可 \`await\` 获取），具体数据结构见示例。\r
\r
> **返回数据结构**\r
\r
\`\`\`js\r
返回Marker的详细信息\r
{\r
            "id":	"m1",\r
            "groupId":	"",\r
            "userData":	"",\r
            "coordinateType":	0,\r
            "coordinate":	[495269.375000, 2491073.250000, 25.400000],\r
            "anchors":	[-16.000000, 32.000000],\r
            "range":	[10.000000, 10000.000000],\r
            "textRange":	[100.000000, 6000.000000],\r
            "imageSize":	[28.000000, 28.000000],\r
            "imagePath":	"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\Cloud\\\\SDK/images/tag.png",\r
            "hoverImagePath":	"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\Cloud\\\\SDK/images/hilightarea.png",\r
            "hoverImageSize": [28.000000, 28.000000],\r
            "text":	"北京银行",\r
            "textOffset":	[0.000000, 0.000000],\r
            "fontSize":	12,\r
            "fontOutlineSize":	1,\r
            "textBackgroundColor":	[1.000000, 1.000000, 1.000000, 1.000000],\r
            "fontColor":	[1.000000, 0.000000, 0.000000, 1.000000],\r
            "fontOutlineColor":	[1.000000, 0.000000, 0.000000, 1.000000],\r
            "popupUrl":	"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\Cloud\\\\SDK/simple.html",\r
            "popupSize":	[600.000000, 400.000000],\r
            "popupOffset":	[0.000000, 0.000000],\r
            "popupBackgroundColor":	[1.000000, 1.000000, 1.000000, 0.100000],\r
            "lineSize":	[2.000000, 100.000000],\r
            "lineColor":	[0.200000, 0.700000, 0.400000, 1.000000],\r
            "lineOffset":	[0.000000, 0.000000],\r
            "autoHidePopupWindow":	1,\r
            "autoHeight":	0,\r
            "displayMode":	0,\r
            "priority":	0,\r
            "occlusioncull":	0\r
        }\r
\`\`\`\r
\r
> 示例：Get\r
\r
\`\`\`js\r
let res = await fdapi.marker.get('m1');\r
let o = res.data[0];\r
log(\`获取标注：\\n id: \${o.id} \\n text: \${o.text}\`);\r
\`\`\`\r
\r
---\r
\r
### \`hide(ids, fn)\` {#hide}\r
\r
隐藏标注\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 标注对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Hide\r
\r
\`\`\`js\r
fdapi.marker.hide(['m1']);\r
\`\`\`\r
\r
---\r
\r
### \`hideAll(fn)\` {#hideAll}\r
\r
隐藏所有标注\r
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
fdapi.marker.hideAll();\r
\`\`\`\r
\r
---\r
\r
### \`hideAllPopupWindow(fn)\` {#hideAllPopupWindow}\r
\r
隐藏所有标注的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：隐藏所有弹出窗口：HideAllPopupWindow\r
\r
\`\`\`js\r
fdapi.marker.hideAllPopupWindow();\r
\`\`\`\r
\r
---\r
\r
### \`hideByGroupId(groupIds, fn)\` {#hideByGroupId}\r
\r
根据分组ID隐藏Marker\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupIds\` | \`string \\| array\` | Marker创建时指定的分组ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：HideByGroupId\r
\r
\`\`\`js\r
fdapi.marker.hideByGroupId('markerAdd');\r
\`\`\`\r
\r
---\r
\r
### \`hidePopupWindow(ids, fn)\` {#hidePopupWindow}\r
\r
隐藏指定标注的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 标注对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：隐藏标注的弹出窗口：HidePopupWindow\r
\r
\`\`\`js\r
fdapi.marker.hidePopupWindow('m1');\r
\`\`\`\r
\r
---\r
\r
### \`setAnchors(id, newVal, fn)\` {#setAnchors}\r
\r
设置标注的整体偏移量（修改锚点）\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 锚点新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Anchors\r
\r
\`\`\`js\r
//设置标注整体偏移\r
await fdapi.marker.setAnchors('m1', [-50, 25]);\r
fdapi.marker.focus('m1', 100, 1);\r
\`\`\`\r
\r
---\r
\r
### \`setAutoHidePopupWindow(id, newVal, fn)\` {#setAutoHidePopupWindow}\r
\r
设置是否自动关闭标注的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`boolean\` | 是否显示垂直牵引线 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetAutoHidePopupWindow\r
\r
\`\`\`js\r
fdapi.marker.setAutoHidePopupWindow('m1', false);\r
\`\`\`\r
\r
---\r
\r
### \`setClusterStyle(style, fn)\` {#setClusterStyle}\r
\r
设置marker聚合样式\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`style\` | \`object\` | marker的聚合样式对象，包含以下属性： |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
> **\`style\` 对象属性：**\r
\r
| 属性 | 类型 | 说明 |\r
|------|------|------|\r
| \`imagePath\` | \`string\` | 聚合后显示的图片磁盘路径或图片URL |\r
| \`imageSize\` | \`array\` | 聚合后显示的图片尺寸宽高，示例：[20,20] |\r
| \`fontSize\` | \`string\` | 聚合后显示的聚合数字的字体大小 |\r
| \`fontColor\` | [\`Color\`](/docs/api/types#color) | 聚合后显示的聚合数字的字体颜色，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`enableAnimation\` | \`boolean\` | 是否开启marker聚合时的透明渐变动画，默认值：true |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetClusterStyle\r
\r
\`\`\`js\r
let style = {\r
    imagePath: HostConfig.Path + '/locale/zh/images/cluster.png',\r
    imageSize: [30, 30],\r
    fontSize: 14,\r
    fontColor: [1, 1, 1, 1], //可以设置完全透明 隐藏数字\r
    enableAnimation: false //是否开启marker聚合时的透明渐变动画，默认值：true\r
}\r
fdapi.marker.setClusterStyle(style);\r
\`\`\`\r
\r
---\r
\r
### \`setCoordinate(id, newVal, fn)\` {#setCoordinate}\r
\r
设置标注的位置\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Coordinate\r
\r
\`\`\`js\r
await fdapi.marker.setCoordinate('m1', [494474.5625, 2491468.5, -0.67259764671325684]);\r
fdapi.marker.focus('m1', 200, 0.2);\r
\`\`\`\r
\r
---\r
\r
### \`setFontColor(id, newVal, fn)\` {#setFontColor}\r
\r
设置标注文本颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：FontColor\r
\r
\`\`\`js\r
fdapi.marker.setFontColor('m1', Color.Blue);\r
\`\`\`\r
\r
---\r
\r
### \`setFontOutlineColor(id, newVal, fn)\` {#setFontOutlineColor}\r
\r
设置字体轮廓线颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.marker.setFontOutlineColor(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setFontOutlineSize(id, newVal, fn)\` {#setFontOutlineSize}\r
\r
设置字体轮廓线大小\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetFontOutlineSize\r
\r
\`\`\`js\r
fdapi.marker.setFontOutlineSize('m1', 2);\r
\`\`\`\r
\r
---\r
\r
### \`setFontSize(id, newVal, fn)\` {#setFontSize}\r
\r
设置字体大小\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetFontSize\r
\r
\`\`\`js\r
fdapi.marker.setFontSize('m1', 30);\r
\`\`\`\r
\r
---\r
\r
### \`setGroupId(id, newVal, fn)\` {#setGroupId}\r
\r
设置分组\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetGroupId\r
\r
\`\`\`js\r
fdapi.marker.setGroupId('m1', 'groupMarker2');\r
\`\`\`\r
\r
---\r
\r
### \`setHoverImagePath(id, newVal, fn)\` {#setHoverImagePath}\r
\r
设置鼠标悬停时显示的图片路径\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新值，[资源引入说明](/docs/tutorials/resources) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetHoverImagePath\r
\r
\`\`\`js\r
let hoverImagePath = HostConfig.Path + '/locale/zh/images/viewshed.png';\r
fdapi.marker.setHoverImagePath('m1', hoverImagePath);\r
\`\`\`\r
\r
---\r
\r
### \`setImagePath(id, newVal, fn)\` {#setImagePath}\r
\r
设置标注的图片\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新值，[资源引入说明](/docs/tutorials/resources) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ImagePath\r
\r
\`\`\`js\r
let path = HostConfig.Path + '/locale/zh/images/ctag.png';\r
fdapi.marker.setImagePath('m1', path);\r
\`\`\`\r
\r
---\r
\r
### \`setImageSize(id, newVal, fn)\` {#setImageSize}\r
\r
设置标注图片的大小\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新的尺寸 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ImageSize\r
\r
\`\`\`js\r
fdapi.marker.setImageSize('m1', [64, 64]);\r
\`\`\`\r
\r
---\r
\r
### \`setLineColor(id, newVal, fn)\` {#setLineColor}\r
\r
设置LineColor\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetLineColor\r
\r
\`\`\`js\r
fdapi.marker.setLineColor('m1', Color.Red);\r
\`\`\`\r
\r
---\r
\r
### \`setLineOffset(id, newVal, fn)\` {#setLineOffset}\r
\r
设置LineOffset\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetLineOffset\r
\r
\`\`\`js\r
fdapi.marker.setLineOffset('m1', [10, 10]);\r
\`\`\`\r
\r
---\r
\r
### \`setLineSize(id, newVal, fn)\` {#setLineSize}\r
\r
设置LineSize\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetLineSize\r
\r
\`\`\`js\r
fdapi.marker.setLineSize('m1', [0.5, 50]);\r
\`\`\`\r
\r
---\r
\r
### \`setOcclusionCull(id, newVal, fn)\` {#setOcclusionCull}\r
\r
设置是否参与遮挡剔除\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`boolean\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetOcclusionCull\r
\r
\`\`\`js\r
fdapi.marker.setOcclusionCull('m1', true);\r
\`\`\`\r
\r
---\r
\r
### \`setPopupOffset(id, newVal, fn)\` {#setPopupOffset}\r
\r
设置弹窗偏移: [x, y]\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetPopupOffset\r
\r
\`\`\`js\r
fdapi.marker.setPopupOffset('m1', [20, 20]);\r
\`\`\`\r
\r
---\r
\r
### \`setPopupSize(id, newVal, fn)\` {#setPopupSize}\r
\r
设置弹窗大小: [width, height]\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetPopupSize\r
\r
\`\`\`js\r
fdapi.marker.setPopupSize('m1', [400, 600]);\r
\`\`\`\r
\r
---\r
\r
### \`setPopupURL(id, newVal, fn)\` {#setPopupURL}\r
\r
设置弹窗HTML链接\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新值，[资源引入说明](/docs/tutorials/resources) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例代码如下：\r
\r
\`\`\`js\r
await fdapi.marker.setPopupURL(id, newVal);\r
\`\`\`\r
\r
---\r
\r
### \`setPriority(id, newVal, fn)\` {#setPriority}\r
\r
设置避让优先级\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`number\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetPriority\r
\r
\`\`\`js\r
fdapi.marker.setPriority('m1', 1);\r
\`\`\`\r
\r
---\r
\r
### \`setRange(id, newVal, fn)\` {#setRange}\r
\r
设置标注的可见范围\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新的可见范围值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Range\r
\r
\`\`\`js\r
fdapi.marker.setRange('m1', [1, 800]);\r
\`\`\`\r
\r
---\r
\r
### \`setText(id, newVal, fn)\` {#setText}\r
\r
设置标注的文本\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Text\r
\r
\`\`\`js\r
fdapi.marker.setText('m1', '体育馆');\r
\`\`\`\r
\r
---\r
\r
### \`setTextBackgroundColor(id, newVal, fn)\` {#setTextBackgroundColor}\r
\r
设置标注文本的背景颜色\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | [\`Color\`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：TextBackgroundColor\r
\r
\`\`\`js\r
fdapi.marker.setTextBackgroundColor('m1', Color.Yellow);\r
\`\`\`\r
\r
---\r
\r
### \`setTextOffset(id, newVal, fn)\` {#setTextOffset}\r
\r
设置文本偏移\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetTextOffset\r
\r
\`\`\`js\r
fdapi.marker.setTextOffset('m1', [10, 10]);\r
\`\`\`\r
\r
---\r
\r
### \`setTextRange(id, newVal, fn)\` {#setTextRange}\r
\r
设置文本可视范围: [近裁距离, 远裁距离]\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`array\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetTextRange\r
\r
\`\`\`js\r
fdapi.marker.setTextRange('m1', [0, 100]);\r
\`\`\`\r
\r
---\r
\r
### \`setURL(id, newVal, fn)\` {#setURL}\r
\r
设置标注的URL\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新值，[资源引入说明](/docs/tutorials/resources) |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：URL\r
\r
\`\`\`js\r
fdapi.marker.setURL('m1', 'http://www.baidu.com');\r
\`\`\`\r
\r
---\r
\r
### \`setUserData(id, newVal, fn)\` {#setUserData}\r
\r
设置用户数据\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | 标注的唯一标识符ID |\r
| \`newVal\` | \`string\` | 新值 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：SetUserData\r
\r
\`\`\`js\r
fdapi.marker.setUserData('m1', '{name:\\"karl\\",sex:\\"male\\",\\"age\\":32}');\r
\`\`\`\r
\r
---\r
\r
### \`setViewportVisible(id, vp, fn)\` {#setViewportVisible}\r
\r
多视口状态下，设置Marker对象在各视口的可见性\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`id\` | \`string\` | Marker对象的ID |\r
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
//进入多视口\r
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);\r
//仅视口1和视口3可见\r
fdapi.marker.setViewportVisible('m1', Viewport.V1 | Viewport.V3);\r
\`\`\`\r
\r
---\r
\r
### \`show(ids, fn)\` {#show}\r
\r
显示标注\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 标注对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Show\r
\r
\`\`\`js\r
fdapi.marker.show('m1');\r
\`\`\`\r
\r
---\r
\r
### \`showAll(fn)\` {#showAll}\r
\r
显示所有标注\r
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
fdapi.marker.showAll();\r
\`\`\`\r
\r
---\r
\r
### \`showAllPopupWindow(fn)\` {#showAllPopupWindow}\r
\r
显示所有标注的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示所有弹出窗口：ShowAllPopupWindow\r
\r
\`\`\`js\r
fdapi.marker.showAllPopupWindow();\r
\`\`\`\r
\r
---\r
\r
### \`showByGroupId(groupIds, fn)\` {#showByGroupId}\r
\r
根据分组ID显示Marker\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`groupIds\` | \`string \\| array\` | Marker创建时指定的分组ID或ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：ShowByGroupId\r
\r
\`\`\`js\r
fdapi.marker.showByGroupId('markerAdd');\r
\`\`\`\r
\r
---\r
\r
### \`showPopupWindow(ids, fn)\` {#showPopupWindow}\r
\r
显示指定标注的弹出窗口\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`ids\` | \`string \\| array\` | 标注对象的ID或者ID数组 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：显示标注的弹出窗口：ShowPopupWindow\r
\r
\`\`\`js\r
fdapi.marker.showPopupWindow('m1');\r
\`\`\`\r
\r
---\r
\r
### \`update(data, fn)\` {#update}\r
\r
修改一个或多个标注对象\r
\r
| 参数 | 类型 | 说明 |\r
|------|------|------|\r
| \`data\` | \`data \\| array\` | 标注点的数据，参考add方法 |\r
| \`fn\` | \`function\` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |\r
\r
**返回：** 无返回数据；异步方法，可 \`await\` 等待执行完成，或在回调函数 \`fn\` 中处理。\r
\r
> 示例：Update\r
\r
\`\`\`js\r
let o = {\r
    id: 'm1',\r
    text: '北京银行欢迎你',\r
    fontColor: Color.Blue,\r
    popupBackgroundColor: [1.0, 1.0, 1.0, 1.0],\r
    textBackgroundColor: Color.Yellow,\r
    lineSize: [2, 50],\r
    lineColor: Color.Yellow\r
}\r
await fdapi.marker.update(o);\r
fdapi.marker.focus(o.id, 200, 0);\r
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
await fdapi.marker.updateEnd();\r
\`\`\`\r
\r
\r
## 更多示例\r
\r
> 标注贴合对象：AttachObject\r
\r
\`\`\`js\r
fdapi.marker.clear();\r
//添加标签\r
let marker = {\r
    id: 'marker1',\r
    coordinate: [493075.96875, 2492030.75, 0], //坐标位置\r
    coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1\r
    anchors: [-14, 28], //锚点\r
    range: [0, 10000], //可视范围\r
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png', //显示图片路径\r
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png', // 鼠标悬停时显示的图片路径\r
    imageSize: [28, 28], //图片的尺寸\r
    hoverImageSize: [28, 28], //鼠标悬停时显示的图片尺寸\r
    fixedSize: true, //图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false \r
\r
    text: '标签跟随车辆移动', //显示的文字\r
    useTextAnimation: false, //打开文字展开动画效果\r
    textRange: [0, 10000], //文本可视范围[近裁距离, 远裁距离]\r
    textOffset: [0, 0], // 文本偏移\r
    textBackgroundColor: Color.White, //文本背景颜色\r
    fontSize: 18, //字体大小\r
    fontOutlineSize: 1, //字体轮廓线大小\r
    fontColor: Color.Green, //字体颜色\r
    fontOutlineColor: Color.White, //字体轮廓线颜色\r
\r
    showLine: true, //标注点下方是否显示垂直牵引线\r
    lineSize: [2, 80], //垂直牵引线宽度和高度[width, height]\r
    lineColor: Color.SpringGreen, //垂直牵引线颜色\r
    lineOffset: [0, 0], //垂直牵引线偏移\r
\r
    autoHeight: true, // 自动判断下方是否有物体\r
    displayMode: 2, //显示模式 \r
    priority: 0, //避让优先级\r
    occlusionCull: false //是否参与遮挡剔除\r
};\r
fdapi.marker.add(marker);\r
\r
//添加前清空所有customObject 防止id重复\r
fdapi.customObject.clear();\r
\r
//添加车辆\r
let co = {\r
    id: 'co1', //自定义对象唯一id\r
    pakFilePath: '@path:DTS_Library.pak', //pak文件路径\r
    assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe', //资源目录，自定义对象在pak文件资源包里的相对路径\r
    location: [493075.96875, 2492030.75, 2.115567684173584], //位置坐标\r
    coordinateType: 0, // 坐标系类型 \r
    rotation: [0, 0, 0], //旋转\r
    scale: [1, 1, 1], //缩放\r
    smoothMotion: 1, //1: 平滑插值，0: 跳跃\r
};\r
fdapi.customObject.add(co);\r
\r
//设置贴合，支持数组类型，多个对象贴合\r
fdapi.marker.attachObject([{\r
    markerId: 'marker1', //标注id\r
    objectId: 'co1', //自定义对象id\r
    offset: [0, 0.5, 2] //偏移量\r
}]);\r
\r
\r
//标签跟随车辆移动\r
fdapi.customObject.focus(co.id, -1);\r
\r
let pathArr = [\r
    [493075.96875, 2492030.75, 2.115567684173584],\r
    [493102.46875, 2492033, 2.1155762672424316],\r
    [493089.78125, 2492033.75, 2.1155567169189453],\r
    [493074.15625, 2492034.5, 2.1155762672424316],\r
    [493062.21875, 2492034, 2.1155664920806885],\r
    [493045.71875, 2492035, 2.1155762672424316],\r
    [493032.28125, 2492035, 2.1155664920806885],\r
    [493016.4375, 2492036, 2.1155567169189453],\r
    [493000.6875, 2492036, 2.1155664920806885],\r
    [492988.1875, 2492037, 2.1155762672424316],\r
]\r
\r
//启动定时器更改车辆位置   \r
let index = 0;\r
let timerId = setInterval(async () => {\r
    if (++index > pathArr.length)\r
        index = 0;\r
    let pos = pathArr[index];\r
    fdapi.customObject.setLocation(co.id, pos)\r
}, 1000);\r
//清除定时器\r
window.setTimeout(function () {\r
    window.clearInterval(timerId)\r
}, 10000);\r
\`\`\`\r
\r
> SetFontOutlineColor\r
\r
\`\`\`js\r
fdapi.marker.setFontOutlineColor('m1', Color.Red);\r
\`\`\`\r
`;export{r as default};
