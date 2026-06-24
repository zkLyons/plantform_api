const r=`---\r
title: 版本更新记录\r
sidebar_label: 版本历史\r
description: "SDK 各版本更新内容与兼容性说明"\r
---\r
\r
### 2026.05.27 Satellite卫星系统新增高亮和取消高亮方法\r
\r
##### Satellite新增方法如下：\r
\r
- highlight() 打开指定卫星的缩略图的高亮效果\r
- unHighlight() 取消指定卫星缩略图的高亮效果\r
- unHighlightAll() 取消所有卫星缩略图的高亮效果\r
\r
### 2026.05.22 Weather天气对象新增方法、Satellite卫星系统新增方法\r
\r
##### Weather新增设置大气环境的瑞利散射系数方法如下：\r
\r
- setRayleighScatter(rayleighScatter) 设置大气环境的瑞利散射系数\r
\r
##### Satellite新增方法如下：\r
\r
- addLinkage(data) 添加卫星之间的连接线，卫星运动时连接线会跟随同步运动\r
- updateLinkage(data) 更新卫星连接线的参数配置\r
- deleteLinkage(data) 删除指定的卫星连接线\r
- clearLinkage(data) 清空卫星之间的连接线\r
\r
### 2026.05.12 多边形对象Polygon新增填充透明渐变样式和参数\r
\r
##### Polygon新增参数如下：\r
\r
- gradualWidth (number) 透明渐变的间隔宽度，单位：米，默认值：10\r
- outerAlpha (number) 多边形填充的透明度渐变的起始值，取值范围：[0~1]，默认值：0.3\r
- innerAlpha (number) 多边形填充的透明度渐变的结束值，取值范围：[0~1]，默认值：1\r
\r
##### Polygon新增style样式枚举如下：\r
\r
- AlphaGradualBorder 透明渐变边界\r
\r
### 2026.05.09 Plot对象新增停止绘制方法、 VectorField对象新增子场参数\r
\r
##### Plot对象新增停止绘制方法stopDraw()\r
\r
- stopDraw() 停止绘制Plot\r
\r
##### VectorField对象新增子场参数如下：\r
\r
- spawnLineRate (number) 每个线条上每秒生成的粒子数量\r
- spawnLineCap (number) 每个线条上粒子的最大数量\r
\r
### 2026.05.08 新增引导线GuideLine对象及操作方法\r
\r
##### 引导线GuideLine对象新增操作方法如下\r
\r
- add() 添加引导线\r
- update() 更新引导线\r
- clear() 清空引导线\r
- focus() 定位引导线\r
- hide() 隐藏引导线\r
- show() 显示引导线\r
- delete() 删除引导线\r
- get() 查询引导线\r
\r
### 2026.04.28 Polyline对象新增贴合模型方法\r
\r
##### 新增方法如下：\r
\r
- attachObject(array) 设置一个或多个Polyline对象的起点和终点跟随对应的模型移动\r
\r
### 2026.04.27 向量场VectorFiled对象新增支持子场的系列参数\r
\r
##### 新增子场subFields包含的参数如下：\r
\r
- renderSphereOutRadius (array) 子场渲染的粒子发射器的外径\r
- renderSphereInnerRadius (array) 子场渲染的粒子发射器内径\r
- startIndex (number) 父场repeatcount参数中该子场区域使用的粒子发射器数量的起始索引，剩下的粒子发射器影响父场\r
- endIndex (number) 父场repeatcount参数中该子场区域使用的粒子发射器数量的结束索引，剩下的粒子发射器影响父场\r
- singleSpriteSize (number) 子场的单个粒子大小，单位米，影响粒子大小\r
- lodMin (number) 子场包含粒子大小的最小缩放比例，默认值：0.6，影响粒子大小\r
- lodMax (number) 子场包含粒子大小的最大缩放比例，默认值：2.0，影响粒子大小\r
- spawnRate (number) 子场粒子每秒生成的速率，影响粒子数量\r
- spawnRateMin (number) 子场近距离粒子的生成速度，影响粒子数量\r
- spawnRateMax (number) 子场远距离粒子的生成速度，影响粒子数量\r
- spawnRatePower (number) 子场粒子的密度变化曲线，即按距离插值时使用指数函数，设置指数函数的N次方，影响粒子数量\r
- lodMaxDistance (number) 子场粒子大小的最大缩放距离，即从[0~lodMaxDistance]映射到[lodMin~lodMax]对粒子大小进行缩放，注意：举例若超过此值则使用lodMax进行缩放，影响粒子大小\r
- lodMinDistance (number) 子场粒子大小的最小缩放距离，即从[0~lodMinDistance]映射到[lodMin~lodMax]对粒子大小进行缩放，注意：若小于此值则使用lodMin进行缩放，影响粒子大小\r
- lifeTime (number) 子场粒子的生命周期，即粒子存活时间，单位：秒，影响粒子长度\r
- lifeTimeMinScale (number) 子场粒子生命周期的缩放因子范围的最小值\r
- lifeTimeMaxScale (number) 子场粒子生命周期的缩放因子范围的最大值\r
\r
### 2026.04.17 CustomObject对象新增拆分楼层方法、SmoothedParticleHydrodynamics对象新增支持vtk文件和bin文件添加方法、新增海岸线Coastline对象及操作方法\r
\r
##### CustomObject对象新增拆分楼层方法如下\r
\r
- cutFloor(obj) 把一个CustomObject类型的楼宇模型按层高拆分为若干个指定的楼层，注意：仅支持CustomObject类型的楼宇模型\r
\r
##### SmoothedParticleHydrodynamics对象新增支持vtk和bin文件加载方法\r
\r
- addByBin(data) 根据bin文件添加sph\r
- addByVtk(data) 根据vtk文件添加sph\r
\r
##### 海岸线Coastline对象新增操作方法如下\r
\r
- add() 添加海岸线\r
- update() 更新海岸线\r
- clear() 清空海岸线\r
- focus() 定位海岸线\r
- hide() 隐藏海岸线\r
- show() 显示海岸线\r
- delete() 删除海岸线\r
- get() 查询海岸线\r
\r
### 2026.04.02 Tools对象新增河道横断面分析方法\r
\r
##### 新增河道横断面分析方法如下\r
\r
- riverCrossSectionByShp(option) 根据河道的shp文件和tif高程对河道横断面进行分析\r
- riverCrossSection(option) 根据河道的坐标点和tif高程对河道横断面进行分析\r
\r
### 2026.03.31 Settings对象新增方法、Plot对象新增方法\r
\r
##### Settings新增设置VTPK标注的深度检测的相机高度阈值方法\r
\r
- setLabelLayerDepthTestHeight(height) &#123;number&#125; depthTestHeight 深度检测的相机高度阈值，高于此高度时深度检测失效，默认值：2000米，单位：米\r
\r
##### Plot对象新增根据ID获取Plot对象的描边坐标集合方法\r
\r
- getStrokeCoordinates(ids) &#123;string|array&#125; ids 要获取的Plot对象ID或者ID数组（可以获取一个或者多个）\r
\r
### 2026.03.25 GeoJsonLayer对象新增控制自定义材质底面和顶面是否绘制参数\r
\r
##### GeoJsonLayer对象新增参数\r
\r
- generateTop (boolean) 可选参数，是否生成顶面，默认：true\r
- generateBottom (boolean) 可选参数，是否生成底面，默认：true\r
\r
### 2026.03.20 态势标绘制对象新增绘制方法startDraw()、Hydrodynamic2d更新方法新增参数\r
\r
##### 根据鼠标交互获取到坐标值创建对象\r
\r
- startDraw(plot) 进入标绘对象的手工绘制模式，\r
\r
##### 新增两类样式枚举，自由绘制线和面\r
\r
- FreehandLineString 自由线绘制：从鼠标左键按下不松开然后光标开始移动进行绘制线段，光标经过的所有坐标位置按顺序连成线，直到松开鼠标左键结束绘制。\r
- FreehandPolygon 自由面绘制：从鼠标左键按下不松开然后光标开始移动进行绘制平面，光标经过的所有坐标位置首尾闭合绘制成面，直到松开鼠标左键结束绘制\r
\r
##### Hydrodynamic2d对象update()更新方法新增参数\r
\r
- vertexWaterDepth (boolean) 是否根据顶点水深插值，默认值：true\r
\r
### 2026.03.14 Tools测量方法新增测量单位和坐标支持\r
\r
##### Tools设置测量方法新增以下参数\r
\r
- unitType (number) 单位 0：米 1：千米 2：英尺，默认值 0\r
- coordinates (array) 待测量坐标数组，不传则根据交互拾取的坐标进行测量\r
\r
### 2026.03.13 卫星仿真对象Satellite新增操作方法\r
\r
##### Satellite对象新增如下方法：\r
\r
- setFollow() 设置相机跟随卫星移动\r
- showSatellite() 显示卫星模型及文字标签\r
- hideSatellite() 隐藏卫星模型及文字标签\r
- showText() 显示卫星文字标签\r
- hideText() 隐藏卫星文字标签\r
- showModel() 显示卫星模型\r
- hideModel() 隐藏卫星模型\r
\r
### 2026.03.05 Weather天气对象新增设置太阳颜色方法\r
\r
##### Weather对象新增setSunColor(color)方法\r
\r
- setSunColor() (color) 自定义太阳颜色\r
\r
### 2026.03.04 球面工程Weather天气对象新增以下方法\r
\r
##### Weather对象新增以下三个方法\r
\r
- setEarthCloudIntensity() (number) 设置地球大气云层的亮度，取值范围：[0~1]，设置0则隐藏云层\r
- setEarthNightLightIntensity() (number) 设置地球夜晚灯光的亮度，取值范围：[0~1]，设置0则关闭灯光\r
- setEarthStarBackgroundIntensity() (number) 设置星空背景的亮度，取值范围：[0~1]，设置0则关闭星空背景亮度\r
\r
### 2026.02.11 新增卫星仿真对象Satellite及操作方法、Cesium3DTileset对象新增属性\r
\r
##### Satellite对象新增如下方法：\r
\r
- add() 添加卫星\r
- update() 更新卫星\r
- clear() 清空卫星\r
- focus() 定位卫星\r
- callBPFunction() 调用卫星模型的蓝图函数\r
- getBPFunction() 查询卫星模型的蓝图函数\r
\r
##### Cesium3DTileset对象新增是否参与光照属性\r
\r
- enableLighting (boolean) 可选，服务是否参与光照，默认值：true\r
\r
### 2026.02.02 Tools下测量方法新增角度测量\r
\r
##### 新增角度测量枚举：\r
\r
- Angle (number) 7 角度测量 返回测量的角度\r
\r
### 2026.01.28 视频投影对象VideoProjection新增属性、Vehicle2新增设置视口可见性方法\r
\r
##### 新增如下属性：\r
\r
- screen (boolean) 是否显示投影幕布，默认值：false\r
- screenDistance (number) 投影幕布的显示距离，单位：米，默认值：100米\r
\r
##### Vehicle2新增设置视口可见性方法\r
\r
- setViewportVisible() 多视口状态下，设置Vehicle2对象在各视口的可见性\r
\r
### 2026.01.12 GlobeTerrain对象新增属性\r
\r
##### 新增如下属性：\r
\r
- alpha (number) 可选，球面网络图层的透明度，取值范围：[0,1]\r
- bConvertSRGB (boolean) 可选，球面网络图层服务加载时颜色效果是否开启RGB模式转换为SRGB，默认值：true\r
\r
### 2026.01.09 Polyline和Polygon对象新增arcType属性\r
\r
##### Polyline和Polygon对象新增如下属性：\r
\r
- arcType (number) 球面地形下绘制贴地弧线的类型，0：劣弧 1：优弧，默认值：0\r
\r
### 2025.12.25 无人机Drone对象新增轨迹线和灯光秀属性\r
\r
##### 无人机Drone对象新增如下属性：\r
\r
- trailType (number) 可选，轨迹线类型，取值范围：[0,1,2]，0:无轨迹 1：拖尾效果 2：条带效果，默认值：0\r
- trailColor (Color) 可选，轨迹线颜色\r
- trailDuration (number) 可选，轨迹持续时间，单位：秒，默认值：0\r
- lightColor (Color) 可选，灯光秀颜色\r
\r
### 2025.12.24 Settings对象新增方法、Marker对象设置聚合样式方法新增参数\r
\r
##### Settings对象新增设置网络图层服务的裂分等级的偏移量方法\r
\r
- setImageryLayerLevelOffset(LevelOffset) 设置网络图层服务的裂分等级的偏移量，如果图层服务当前某处的裂分等级为6级，参数设置为1则当前图层服务的裂分等级增加1变为7级。\r
\r
##### Marker对象setClusterStyle(style)方法新增参数\r
\r
- enableAnimation (boolean) 是否开启marker聚合时的透明渐变动画，默认值：true\r
\r
### 2025.12.23 GeoJSONLayer对象新增根据属性高亮要素的操作方法\r
\r
##### GeoJSONLayer对象新增操作方法如下：\r
\r
- highlightFeatureByProperty() 根据要素包含的属性字段名称和对应的值来高亮GeoJSONLayer图层对象内部对应的要素区域\r
- unHighlightFeatureByProperty() 根据要素包含的属性字段名称和对应的值来取消高亮GeoJSONLayer图层对象内部对应的要素区域\r
\r
### 2025.12.16 Settings对象新增设置VTPK标注的符号化设置方法\r
\r
##### 设置VTPK标注的符号化配置参数方法如下\r
\r
- setLabelLayerScaleRatio(scale) 设置VTPK标注的缩放显示百分比\r
- setLabelLayerLineSpace(lineSpace) 设置VTPK线性标注的间隔\r
- setLabelLayerSymbolAvoidance(type) 设置VTPK标注符号避让方式\r
\r
### 2025.12.12 球面GlobeTerrain新增操作方法\r
\r
##### 设置更新初始化加载的影像服务、新增全参数图层服务\r
\r
- setImagery(imageryUrl, imageryResourceUrl) 设置更新初始化加载的影像服务\r
- setImageryBySchemaParams(option) 根据自定义参数的图层服务来更新初始化球面加载的影像服务\r
- addImageryLayerBySchemaParams(obj) 根据自定义参数添加球面网络地图服务，如WMTS/WMS/MVT/TMS服务等网络图层服务\r
\r
### 2025.12.09 相机Camera对象支持按顺序播放多个导览，查询导览列表接口返回导览所在目录信息\r
\r
##### 按顺序播放多个导览、返回导览所在目录信息\r
\r
- playAnimation(ids) 按传入索引序号的顺序播放一个或多个动画导览\r
- getAnimationList 返回新增foldername属性 导览所在文件夹名称 acp工程内全局唯一\r
\r
### 2025.11.27 新增光滑粒子流体动力学仿真对象(SmoothedParticleHydrodynamics)及相关操作方法\r
\r
##### SmoothedParticleHydrodynamics对象新增如下方法：\r
\r
- add() 添加SmoothedParticleHydrodynamics对象\r
- update() 更新SmoothedParticleHydrodynamics对象\r
- clear() 清空SmoothedParticleHydrodynamics对象\r
- show() 显示SmoothedParticleHydrodynamics对象\r
- hide() 隐藏SmoothedParticleHydrodynamics对象\r
- delete() 删除SmoothedParticleHydrodynamics对象\r
- get() 查询SmoothedParticleHydrodynamics对象\r
- focus() 定位SmoothedParticleHydrodynamics对象\r
\r
### 2025.11.21 新增GlobeTerrain类，包含球面坐标系下Cesium球面地形影像服务的相关操作方法、ImageryLayer2新增设置图层顺序方法\r
\r
##### GlobeTerrain对象新增如下方法：\r
\r
- init() 初始化Cesium球面的地形和影像\r
- destroy() 销毁Cesium球面的地形和影像\r
- show() 显示Cesium球面的地形和影像\r
- hide() 隐藏Cesium球面的地形和影像\r
- addImageryLayer() 添加Cesium球面的图层服务，支持类型包含WMS、WMTS、MVT和TMS\r
- deleteImageryLayer() 删除图层服务\r
- clearImageryLayer() 清空图层服务\r
- setImageryLayerDrawOrder() 设置图层服务的顺序\r
\r
##### ImageryLayer2对象新增如下方法：\r
\r
- setDrawOrder() 设置图层服务的顺序\r
\r
### 2025.11.18 高级载具Vehicle2对象更新方法支持更新载具颜色\r
\r
##### update方法新增支持以下参数\r
\r
- color 可选，载具自定义涂装颜色，注意：若传入此颜色参数会覆盖掉内置的涂装颜色（colorType）\r
\r
### 2025.11.06 海洋热力图新增海浪样式枚举OceanHeatMapStyle\r
\r
##### 新增波浪样式枚举\r
\r
- Arrow() 箭头样式\r
- Flow() 流场样式\r
- Wave() 波浪样式\r
\r
### 2025.11.04 GeoJSONLayer对象新增参数、新增无人机Drone对象及相关操作方法\r
\r
##### 无人机Drone对象新增如下方法：\r
\r
- add() 添加无人机Drone\r
- update() 更新无人机Drone\r
- clear() 清空无人机Drone\r
- show() 显示无人机Drone\r
- hide() 隐藏无人机Drone\r
- delete() 删除无人机Drone\r
- get() 查询无人机Drone\r
- moveTo() 无人机Drone运动\r
- focus() 定位无人机Drone\r
\r
##### GeoJSONLayer对象新增深度检测和反走样参数\r
\r
- depthTest (boolean) 是否做深度检测，默认开启：true，true会被遮挡，false不会被遮挡\r
- enableAntialias (boolean) 是否开启反走样，默认开启：true\r
\r
### 2025.10.24 向量场VectorField对象新增bDynamicRenderBound参数\r
\r
##### 向量场VectorField对象新增bDynamicRenderBound参数\r
\r
- bDynamicRenderBound (boolean) 是否动态计算渲染范围，默认：false\r
\r
### 2025.10.23 CustomObject、 GeoJSONLayer、SplineMesh新增参数\r
\r
##### CustomObject对象下的addByTileLayer()方法新增visible参数\r
\r
- visible (boolean) 可选，复制模型完成后是否显示，默认：true\r
\r
##### GeoJSONLayer对象新增标注字体大小和颜色属性\r
\r
- textColor (Color) 可选，文字标注的字体颜色，默认颜色：[1,1,1,1]\r
- textSize (number) 可选，文字标注的字体大小，默认大小：24\r
\r
##### SplineMesh新增meshPath参数\r
\r
- meshPath (string) 可选(和style二选一)，路径模型自定义样式的打包路径，注意：若传入此路径会自动覆盖style样式\r
\r
### 2025.10.20 新增OceanHeatMap海洋热力图对象\r
\r
##### 新增以下操作方法\r
\r
- add() 添加对象\r
- update() 更新对象\r
- clear() 清空对象\r
- show() 显示对象\r
- hide() 隐藏对象\r
- delete() 删除对象\r
- get() 查询对象\r
\r
### 2025.10.14 向量场VectorField对象新增fileOrder参数\r
\r
##### 向量场VectorField对象新增fileOrder参数\r
\r
- fileOrder (number) 向量场数据加载bin/tif文件的堆叠顺序，0：正向堆叠（0~z层） 1：反向堆叠（z~0层）\r
\r
### 2025.10.09 三维热力图对象新增billboards参数\r
\r
##### HeatMap3d新增billboards参数\r
\r
- billboards (object) 三维热力图对象始终朝向相机（广告牌效果），仅体素模式下displayMode=1生效，包含参数如下： scale (number) 面向屏幕的缩放值\r
\r
### 2025.09.16 SplineMesh对象增加按组操作方法\r
\r
##### 新增按组操作方法如下：\r
\r
- 增加showByGroupId()方法\r
- 增加hideByGroupId()方法\r
- 增加deleteByGroupId()方法\r
\r
### 2025.09.15 Settings对象新增设置鼠标悬浮和移动事件返回的时间间隔方法\r
\r
##### 新增设置鼠标悬浮和移动事件返回的时间间隔方法\r
\r
- setMouseHoverTime(time) 设置鼠标悬浮事件返回的时间间隔\r
- setMouseMoveTime(time) 设置鼠标移动事件返回的时间间隔\r
\r
### 2025.09.05 三维热力图对象新增执行盒子剖切时是否裁切体素参数\r
\r
##### HeatMap3d新增clipVoxel参数\r
\r
- clipVoxel (boolean) 三维热力图执行盒子剖切时是否裁切体素(displayMode:1)，默认值：true\r
\r
### 2025.08.26 Camera对象的playAnimation()方法新增mask参数\r
\r
##### Camera对象的playAnimation()方法新增mask参数\r
\r
- mask (number) 可选，播放动画导览时生效的工程配置掩码类别，支持组合设置。请参考 AnimationMask\r
\r
### 2025.08.22 TileLayer对象的setPointCloudStyle方法新增仅线框显示\r
\r
##### TileLayer对象的setPointCloudStyle方法新增仅线框显示\r
\r
- renderBoxWireframe (number) 盒子模式下是否显示线框，取值：[0,1,2]，0不显示 1显示 2仅显示线框（隐藏面）\r
\r
### 2025.08.21 向量场VectorField对象新增参数、高斯泼溅GaussianSplatting对象新增碰撞参数、CustomObject对象focus()方法新增offset参数、HeatMap3D对象新增opacityMaskClip参数\r
\r
##### 向量场VectorField对象新增粒子发射器头部粒子的亮度控制参数\r
\r
- headBrightness (number) 粒子发射器头部粒子的亮度缩放值，默认值：1，值越大发射器头部的粒子越亮\r
\r
##### 高斯泼溅GaussianSplatting对象新增碰撞参数\r
\r
- collision (boolean) 可选，模型加载后是否开启碰撞，默认值：false\r
\r
##### CustomObject对象focus()方法新增offset参数\r
\r
- offset (array) 可选参数，相机视角的偏移量，取值示例：[X, Y, Z]，分别是三个方向的偏移量，单位：米\r
\r
##### HeatMap3D对象新增opacityMaskClip参数\r
\r
- opacityMaskClip (number) 三维热力图clipbox剖切支持的透明度阈值，色带colors参数内配置的颜色透明度值如果大于此值则进行剖切\r
\r
##### Marker对象新增autoHideText参数\r
\r
- autoHideText (boolean) 打开弹窗时是否自动隐藏文字，默认值：true\r
\r
### 2025.08.12 Tools对象新增打开测量和剖切面板方法\r
\r
##### 新增以下方法\r
\r
- showMeasurePanel(type, screenPosition) 新增打开测量功能面板\r
- showClipPanel(type, screenPosition) 新增打开剖切功能面板\r
\r
### 2025.08.11 三维热力图对象新增包围盒线框颜色参数、视频投影对象新增曝光度参数\r
\r
##### HeatMap3d新增包围盒线框颜色参数boundsColor\r
\r
- boundsColor (array) 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1]\r
\r
##### VideoProjection新增曝光度参数\r
\r
- exposure (number) 曝光度，取值范围：[0~3]，默认值：0.6\r
\r
### 2025.07.29 HydroDynamic2D二维水动力对象新增动态箭头配置相关参数、 Settings设置对象新增方法\r
\r
##### 新增动态箭头配置参数\r
\r
- arrowVisibleDistance (number) 可选参数，动态箭头显示的最大距离，单位：米\r
- dynamicArrow (number) (object) 可选参数，动态箭头的配置参数对象如下： numArrows (number) 箭头数量 speedFactor (number) 速度因子 sizeScale (number) 尺寸缩放因子\r
\r
##### Settings设置对象新增方法\r
\r
- setPlayerName(name,size) 联网模式（会议室）下设置角色漫游和无人机漫游模式时模型上方显示的角色名称\r
\r
### 2025.07.21 三维热力图Heatmap3D对象新增预加载和播放、暂停等方法\r
\r
##### 新增load和play、pause和setTime方法\r
\r
- load(obj) 预加载多个tif文件构成的三维热力图动画\r
- play(id) 执行播放三维热力图动画\r
- pause(id) 暂停播放三维热力图动画\r
- setTime(id,startTime) 设置从第几秒开始播放三维热力图动画\r
\r
### 2025.07.18 FiniteElement2有限元仿真对象新增过滤器相关操作方法\r
\r
##### 新增以下方法\r
\r
- applyContourFilter() 根据等值线的数值添加过滤器并展示过滤后的有限元模型分析结果\r
- applyPlaneClipFilter() 切面过滤器\r
- applyBoxClipFilter() 盒子过滤器\r
- applySphereClipFilter() 球型过滤器\r
- applyCylinderClipFilter() 圆柱体过滤器\r
\r
### 2025.07.10 FiniteElement2有限元仿真对象新增过滤器相关操作方法\r
\r
##### 新增以下3个方法\r
\r
- applyThresholdFilter() 根据属性字段的区间值添加过滤器并展示过滤后的有限元模型分析结果\r
- removeFilter() 移除指定的有限元模型对象添加的相关过滤器\r
- clearFilter() 清空指定的有限元模型对象添加的所有过滤器\r
\r
### 2025.07.05 图层TileLayer对象新增方法\r
\r
##### TileLayer对象新增以下3个方法\r
\r
- highlightActorWithColor() 使用颜色去高亮一个Actor，支持设置不同的高亮颜色去高亮不同的Actor\r
- highlightActorsWithColor() 使用颜色去高亮多个Actor，支持设置不同的高亮颜色去高亮不同的Actor\r
- unHighlightAllPoints() 取消高亮点云包含所有点的高亮效果\r
\r
### 2025.07.01 FiniteElement2有限元仿真对象新增箭头符号化参数\r
\r
##### 新增箭头参数arrow\r
\r
- field (string) 使用此属性字段名称对应的值符号化显示箭头\r
- sizeScale (number) 可选，箭头尺寸\r
- colorField (string) 颜色属性字段名称\r
- lengthScale (number) 可选，箭头长度缩放值\r
- colorComponent (string) 颜色属性字段对应的分量名称\r
\r
### 2025.06.26 自定义对象CustomObject和样条线对象SplineMesh新增参数\r
\r
##### CustomObject新增曲线差值类型和差值分段数量参数\r
\r
- curveType (number) 可选，路径模型绘制时曲线的插值类型，取值范围：[0,1]，默认值：0\r
- segment (number) 可选，路径模型的绘制时曲线的插值的分段数量，默认值：10\r
\r
##### SplineMesh对象新增曲线差值类型和差值分段数量参数\r
\r
- curveType (number) 可选，路径模型绘制时曲线的插值类型，取值范围：[0,1]，默认值：0\r
- segment (number) 可选，路径模型的绘制时曲线的插值的分段数量，默认值：10\r
\r
### 2025.06.24 新增FiniteElement2有限元仿真对象\r
\r
##### 新增以下方法\r
\r
- add() 添加对象\r
- update() 更新对象\r
- clear() 清空对象\r
- show() 显示对象\r
- hide() 隐藏对象\r
- delete() 删除对象\r
- get() 查询对象\r
\r
### 2025.06.19 ImageryLayer2球面图层服务增加参数\r
\r
##### 新增颜色效果转换参数\r
\r
- bConvertSRGB (boolean) 可选，球面网络图层服务加载时颜色效果是否开启RGB模式转换为SRGB，默认值：true\r
\r
### 2025.05.29 有限元对象新增特征线信息参数\r
\r
##### 新增特征线参数\r
\r
- filePath (string) 包含特征线信息的文件路径\r
- color (Color) 特征线的颜色\r
\r
### 2025.05.22 ImageryLayer2对象新增方法\r
\r
##### ImageryLayer2对象新增add方法\r
\r
- addByUrl(data) 根据图层服务的xmlPath添加一个或多个球面网络地图服务\r
- addBySchemaParams(data) 根据图层服务的自定义参数添加一个或多个球面网络地图服务\r
\r
### 2025.05.21 Settings对象新增方法查询和设置自定义的人物角色模型和无人机模型\r
\r
##### 查询和设置自定义的人物角色模型和无人机模型\r
\r
- setCharacterAssetPath(assetPath) 人物漫游模式下，设置自定义的无人机模型\r
- getCharacterAssetPath() 查询当前工程已经挂载的pak文件包含的自定义的角色模型路径\r
- setDroneAssetPath(assetPath) 无人机漫游模式下，设置自定义的无人机模型\r
- getDroneAssetPath() 查询当前工程已经挂载的pak文件包含的自定义的无人机模型路径\r
\r
### 2025.05.16 2D水动力模型对象新增水浪效果漫延的流速区间范围\r
\r
##### 新增流速影响水浪效果参数\r
\r
- crestWaterSpeedRange (array) 可选，水浪效果漫延的流速区间范围，默认值：[0,1]，注意：和深度区间表现为叠加的效果，区间内的水流速度值越大浪头越来越明显\r
\r
### 2025.05.12 SplineMesh新增支持调用蓝图函数、Settings对象新增控制鼠标右键的点击拾取及Polygon3D新增支持深度检测、载具2新增标识牌显示配置参数\r
\r
##### SplineMesh新增支持查询和调用蓝图函数方法\r
\r
- getBPFunction(ids) 查询splineMesh包含的蓝图函数\r
- callBPFunction(data) 调用splineMesh包含的蓝图函数\r
\r
##### Settings对象新增控制鼠标右键的点击拾取方法\r
\r
- enableRightClickMousePick(enable) 控制鼠标右键的点击拾取，默认关闭\r
\r
##### Polygon3D新增支持深度检测参数\r
\r
- depthTest (boolean) 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡，注意：非半透明材质不支持深度检测\r
\r
##### 载具2新增标识牌显示配置参数\r
\r
- visible (boolean) 标识牌是否可见\r
- offset (array) 标识牌偏移\r
- text (string) 标识牌显示的字符串\r
\r
### 2025.04.30 相机Camera对象新增导出正交投影图片接口\r
\r
##### 新增导出正交投影图片接口\r
\r
- exportOrthoImage(path, imageSize, orthoWidth, location, rotation, backGroundColor） 根据传入的参数导出相机位置对应的正交投影图片\r
\r
### 2025.04.23 新增BoxTrigger盒子热区范围对象，当customObject或camera进入和退出盒子热区范围则触发相关事件\r
\r
##### 新增以下方法\r
\r
- add(data) 新增BoxTrigger盒子热区范围对象\r
- delete(id) 删除BoxTrigger盒子热区范围对象\r
- clear() 清空BoxTrigger盒子热区范围对象\r
\r
### 2025.04.10 2D水动力模型对象新增流场样式及相关参数、球面网络图层新增透明度参数\r
\r
##### 新增流场样式和羽化参数\r
\r
- alphaGradientDepthRange (array) 边缘羽化的水深范围，默认值：[0,2]，单位：米，对应的alpha区间为[0,1]，注意：仅在alphaMode=1时生效\r
\r
##### 球面网络图层新增透明度参数\r
\r
- alpha (number) 球面网络图层的透明度，取值范围：[0,1]\r
\r
### 2025.04.07 Tools分析工具可视域分析接口新增水平角和俯仰角参数\r
\r
##### 新增水平角和俯仰角参数\r
\r
- 【yaw】 水平角，取值范围：[-180°~180°]，默认值：0\r
- 【pitch】 俯仰角，取值范围：[-90°~90°]，默认值：0\r
\r
### 2025.03.21 Polyline对象增加1像素线宽样式枚举\r
\r
##### OnePixelWidth：1像素线宽样式\r
\r
### 2025.03.17 新增军事态势标绘对象Plot及相关操作方法\r
\r
##### 拓扑线对象新增如下方法：\r
\r
- add() 添加Plot对象\r
- update() 更新Plot对象\r
- clear() 清空Plot对象\r
- show() 显示Plot对象\r
- hide() 隐藏Plot对象\r
- showAll() 显示所有Plot对象\r
- hideAll() 隐藏所有Plot对象\r
- delete() 删除Plot对象\r
- get() 查询Plot对象\r
\r
### 2025.03.07 CustomObject对象focus()方法跟随模式新增枚举\r
\r
##### 新增枚举跟随世界的绝对朝向\r
\r
- 跟随世界的绝对朝向： FollowWorldRotation\r
\r
### 2025.02.28 Weather对象新增海浪效果设置和查询接口\r
\r
##### 新增setOceanWave和getOceanWave()接口\r
\r
- setOceanWave(option) 设置海浪参数\r
- getOceanWave() 查询海浪参数\r
\r
### 2025.02.21 新增拓扑线对象TopologyLine及相关操作方法\r
\r
##### 拓扑线对象新增如下方法：\r
\r
- add() 添加拓扑线对象\r
- update() 更新拓扑线对象\r
- clear() 清空拓扑线对象\r
- show() 显示拓扑线对象\r
- hide() 隐藏拓扑线对象\r
- showAll() 显示所有拓扑线对象\r
- hideAll() 隐藏所有拓扑线对象\r
- delete() 删除超拓扑线对象\r
- get() 查询拓扑线对象\r
\r
### 2025.02.20 新增超欠挖分析对象excavationAnalysis及相关操作方法\r
\r
##### 超欠挖分析对象新增如下方法：\r
\r
- add() 添加超欠挖分析对象\r
- update() 更新超欠挖分析对象\r
- clear() 清空超欠挖分析对象\r
- show() 显示超欠挖分析对象\r
- hide() 隐藏超欠挖分析对象\r
- delete() 删除超欠挖分析对象\r
- get() 查询超欠挖分析对象\r
\r
### 2025.02.14 图层对象setPointCloudStyle()方法新增lod参数\r
\r
##### 新增是否开启lod参数 默认值false\r
\r
- (boolean) 是否开启lod，默认值：false\r
\r
### 2025.01.21 TileLayer对象新增enableFluid()方法\r
\r
##### 设置图层对水流体对象Fluid的支持\r
\r
### 2025.01.16 热力图增加预加载和播放、暂停等方法\r
\r
##### 增加load和play、pause和setTime方法\r
\r
- load(obj) 预加载多个tif文件，准备播放热力图动画\r
- play(id) 播放热力图动画\r
- pause(id) 暂停播放热力图动画\r
- setTime(id,startTime) 设置从第几秒开始播放\r
\r
### 2025.01.15 向量场对象新增参数\r
\r
##### 新增speedPower参数\r
\r
### 2025.01.14 新增gaussianSplatting对象及相关操作方法\r
\r
##### 高斯泼溅对象新增如下方法：\r
\r
- add() 添加高斯泼溅对象\r
- update() 更新高斯泼溅对象\r
- clear() 清空高斯泼溅对象\r
- show() 显示高斯泼溅对象\r
- hide() 隐藏高斯泼溅对象\r
- delete() 删除高斯泼溅对象\r
- get() 查询高斯泼溅对象\r
\r
### 2025.01.14 热力图对象HeatMap增加addByTif()方法\r
\r
##### HeatMap增加addByTif()方法\r
\r
- addByTif(heatMap) 通过tif文件添加热力图对象\r
\r
### 2025.01.06 自定义对象CustomObject对象新增生长动画方法\r
\r
##### CustomObjec增加showGrowth()方法\r
\r
- showGrowth(data) 模拟从3dt中复制的CustomObject对象的生长动画效果\r
\r
### 2024.12.30 热力图对象HeatMap增加高亮和取消高亮方法\r
\r
##### 增加highlightPixels()和unHighlightAllPixels()方法\r
\r
- highlightPixels(id, pixelCoords) 高亮热力图指定的像素点\r
- unHighlightAllPixels(id) 取消热力图所有像素点高亮\r
\r
### 2024.12.11 CustomObject对象新增参数\r
\r
##### 新增自动高度和碰撞参数\r
\r
### 2024.11.19 图层对象增加setPointCloudStyle()方法\r
\r
##### 图层对象增加setPointCloudStyle()方法\r
\r
- setPointCloudStyle() 根据点云的属性值来设置点云模型的渲染颜色\r
\r
### 2024.11.13 相机对象增加cancelFollow()方法\r
\r
##### 相机对象增加cancelFollow()方法\r
\r
- cancelFollow() 取消自动跟随相机视角\r
\r
### 2024.11.12 新增Vehicle2对象及相关操作方法\r
\r
##### Vehicle2对象新增如下方法：\r
\r
- add() 添加载具2对象\r
- update() 更新载具2对象\r
- clear() 清空载具2对象\r
- show() 显示载具2对象\r
- hide() 隐藏载具2对象\r
- delete() 删除载具2对象\r
- get() 查询载具2对象\r
- moveTo() 载具2对象运动\r
- focus() 定位载具2对象\r
- setFollow() 设置载具2对象相机跟随\r
\r
### 2024.11.08 新增Train对象及相关操作方法\r
\r
##### 火车对象新增如下方法：\r
\r
- add() 添加火车对象\r
- moveTo() 设置火车行驶\r
- pause() 暂停行驶\r
- resume() 恢复行驶\r
- show() 显示火车\r
- hide() 隐藏火车\r
- clear() 清空火车\r
- delete() 删除火车\r
- get() 查询火车\r
- focus() 定位火车\r
- setFollow() 设置火车行驶时相机跟随\r
\r
### 2024.10.17 新增ImageryLayer2对象球面坐标系下加载网络图层服务对象\r
\r
##### 新增ImageryLayer2对象球面坐标系下加载网络图层服务对象\r
\r
### 2024.07.19 新增城市级交通仿真对象TrafficSimulation及相关操作方法\r
\r
##### TrafficSimulation对象新增如下方法\r
\r
### 2024.07.17 新增路径模型SplineMesh对象及相关操作方法\r
\r
##### SplineMesh对象新增如下方法\r
\r
### 2024.03.01 Polyline、Polygon和Polygon3D对象增加原色样式枚举\r
\r
##### OriginColor：原色\r
\r
### 2023.12.29 Fluid对象新增color颜色属性\r
\r
##### 流体仿真自定义颜色属性：color\r
\r
### 2023.12.26 GeoJSONLayer对象新增高亮和定位方法\r
\r
##### 高亮某个要素：highlightFeature()\r
\r
##### 停止高亮：stopHighlightFeature()\r
\r
##### 高亮多个要素：highlightFeatures()\r
\r
##### 停止高亮要素：stopHighlightFeatures()\r
\r
##### 定位某个要素：focusFeature()\r
\r
### 2023.12.25 GeoJSONLayer对象新增属性\r
\r
##### GeoJSONLayer新增文字标注属性：textMarkerFiled\r
\r
##### GeoJSONLayer新增文字标注可见范围属性：textRange\r
\r
##### GeoJSONLayer新增贴地属性：onTerrain\r
\r
### 2023.12.20 Tools对象新增getUIPanel方法\r
\r
##### 新增查询系统UI面板状态方法如下：\r
\r
- 新增方法： getUIPanel(type,fn)\r
\r
### 2023.12.13 标注对象Marker新增方法、Tools天际线分析新增参数\r
\r
##### Marker对象新增设置视口可见性方法如下：\r
\r
- 新增方法： setViewportVisible(id,vp,fn)\r
\r
##### Tools对象天际线分析增加交互锁定参数\r
\r
- 新增交互锁定参数： interactiveLock\r
\r
### 2023.12.08 Misc新增统计接口 统计ACP工程包含的资产信息\r
\r
##### projectAssetCountAll() 统计ACP工程包含的全部资产\r
\r
##### projectAssetCount(assetType) 统计ACP工程包含的各类资产\r
\r
### 2023.12.01 HydroDynamic1D和2D对象新增属性\r
\r
##### HydroDynamic1D和2D对象新增水波纹亮度属性waveBrightness\r
\r
### 2023.11.27 设置面板设置后期效果新增相关参数\r
\r
##### globalIllumination: false, //屏幕空间全局光照;\r
\r
##### chromaticAberration: 0, //透镜色差;\r
\r
##### ambientRadius: 100, //环境光遮罩半径\r
\r
##### ambientFadeDistance: 12000, //环境光遮罩淡出距离\r
\r
##### exposureEnabled: false,//自动曝光\r
\r
##### exposureCompensation: 0, //曝光补偿\r
\r
##### depthFiethSwitch: false,//景深开关\r
\r
##### focalLength: 10000,// 焦距\r
\r
##### aperture: 4,// 光圈\r
\r
##### deepBlur: 2,// 深度模糊\r
\r
### 2023.11.23 GeoJSONLayer、ImageryLayer和CustomObject新增属性和方法\r
\r
##### GeoJSONLayer增加定位方法focus()\r
\r
##### GeoJSONLayer新增rotation属性 控制旋转 新增range属性 控制点的可视范围\r
\r
##### ImageryLayer增加定位方法focus()\r
\r
##### CustomObject对象新增visible参数 控制模型加载后是否显示\r
\r
### 2023.11.22 波束对象增加range参数\r
\r
##### 随着相机观察距离的拉远拉近波束透明度会进行线性变化，越远越透明直至看不到\r
\r
### 2023.11.21 TileLayer新增设置热力样式接口\r
\r
##### TileLayer图层对象新增分层热力样式设置接口setHeatMapStyle()\r
\r
### 2023.11.20 GeoJSONLayer对象和波束SignalWave对象新增属性\r
\r
##### GeoJSONLayer新增offset属性\r
\r
##### SignalWave新增opacity不透明度属性，优化波束样式显示\r
\r
### 2023.11.17 HydroDynamic1D对象新增属性\r
\r
##### HydroDynamic1D新增waterMode属性\r
\r
### 2023.11.10 Settings对象新增设置人物漫游接口\r
\r
##### Settings对象新增setCharacterRoaming()接口\r
\r
### 2023.11.6 新增HydroDynamic1D对象（一维水动力模型）\r
\r
##### HydroDynamic1D对象新增如下方法\r
\r
### 2023.11.3 Misc对象新增方法\r
\r
##### Misc对象新增reloadPak()方法\r
\r
##### Misc对象新增download()方法\r
\r
### 2023.10.26 向量场对象和二维水动力模型支持TIF文件构建\r
\r
##### VectorField对象新增tif类型文件支持\r
\r
##### HydroDynamic2D对象新增tif类型文件支持\r
\r
### 2023.10.23 新增HydroDynamic2D对象（二维水动力模型）\r
\r
##### HydroDynamic2D对象新增如下方法\r
\r
### 2023.09.20 Settings对象新增查询工程坐标系接口\r
\r
##### Settings对象新增getProjectWKT()接口\r
\r
### 2023.09.18 蓝图函数支持控制Marker3D对象拓展参数内的图标和动画\r
\r
##### 蓝图函数新增枚举类型16，支持设置拓展参数内的图标和样式动画\r
\r
### 2023.09.05 WaterFlowField和HeatMap3D支持多视口\r
\r
##### 水流场对象和三维热力对象支持在不同视口下设置显示\r
\r
### 2023.09.04 新增天线方向图和波束对象\r
\r
##### 新增天线方向图对象Antenna接口如下\r
\r
##### 新增波束对象SignalWave接口如下\r
\r
### 2023.08.23 HeatMap3D支持稀疏体素方式构建\r
\r
##### 支持sparseVoxels构建对象\r
\r
##### 增加查询体素方法queryVoxel()\r
\r
##### 新增textureFilter属性参数\r
\r
### 2023.08.18 TileLayer对象新增clear()方法、GeoJsonLayer新增属性\r
\r
##### TileLayer对象新增clear()方法\r
\r
##### GeoJsonLayer新增投影转换属性\r
\r
### 2023.08.12 热力图HeatMap对象支持bin文件添加和更新\r
\r
##### 热力图对象add()方法支持bin文件\r
\r
##### 热力图对象update()方法支持bin文件及插值更新动画\r
\r
### 2023.08.11 新增流体仿真对象Fluid\r
\r
##### 新增流体仿真对象Fluid接口如下\r
\r
### 2023.07.27 新增有限元仿真对象FiniteElement\r
\r
##### 新增有限元仿真对象FiniteElement接口如下\r
\r
### 2023.07.14 CustomObject对象新增参数\r
\r
##### isEffectRotation (boolean) 模型执行移动方法moveTo()时是否开启旋转效果，注意：仅在moveTo()方法调用时生效\r
\r
### 2023.06.28 新增向量场对象VectorField\r
\r
##### 新增向量场对象VectorField接口如下\r
\r
### 2023.05.30 Settings对象和TileLayer对象新增方法\r
\r
##### Settings对象新增方法如下：\r
\r
- setScreenControlsVisible(visiable) 布尔类型参数，当交互模式为人物或无人机模式时，设置屏幕操纵杆UI的可见性\r
\r
##### 图层TileLayer对象增加setEnableDecal()方法\r
\r
- setEnableDecal(data) 设置图层对贴花类型对象的贴合支持，包含Decal对象和HeatMap对象\r
\r
### 2023.05.26 优化Reset接口、Heatmap新增样式\r
\r
##### 优化DigitalTwinAPI类的Reset方法\r
\r
\`\`\`js\r
api.reset(ResetType.ClearObjects | ResetType.ResetCamera);  或者 \r
api.reset(1 | 4); 或者 \r
api.reset(5);\r
\`\`\`\r
\r
reset方法增加了一个参数type，用于设置要重置的类型 ResetType是一个可自由组合的枚举类型，定义如下： reset方法如果不传参数，默认行为是清除添加的所有对象。 如果要清除对象并复位相机，则可以这样调用： 这样用户就不用自己通过调用一大堆对象的clear方法去一个一个清除所添加的对象了。\r
\r
##### Heatmap新增波峰样式 HeatMapStyle\r
\r
### 2023.05.09 Player用户自定义信息\r
\r
##### AirCityPlayer增加初始化属性：customString\r
\r
customString可用于存储用户自定义信息，稍候能够在实例管理接口的GetStatus后返回。如下的代码设置customString后\r
\r
### 2023.04.21 Marker3D对象增加按组操作方法、水流场对象增加属性\r
\r
##### Marker3D对象新增方法如下：\r
\r
- Marker3D对象增加showByGroupId()方法\r
- Marker3D对象增加hideByGroupId()方法\r
- Marker3D对象增加deleteByGroupId()方法\r
\r
##### WaterFlowField水流场对象增加属性如下：\r
\r
- traceFactor (number) 光流轨迹保持因子，仅在displayMode=2生效，取值范围：[0~100] 值越大粒子轨迹越长，注意：水流场的采样点越稀疏，因子值就要设置越大\r
\r
### 2023.04.18 相机对象增加环绕方法、载具对象增加偏移属性\r
\r
### 2023.04.13 新增编辑助手右键结束交互事件\r
\r
### 2023.03.30 水流场新增透明度参数alphas\r
\r
### 2023.03.29 新增设置大地图下的贴合模式\r
\r
### 2023.03.17 Vehicle载具对象新增涂装颜色colorType属性\r
\r
### 2023.03.10 Coord对象新增支持火星坐标和百度坐标转换\r
\r
### 2023.02.28 CustomObject对象增加闪烁和停止闪烁方法\r
\r
### 2023.02.23 Misc对象增加蓝图函数和材质信息查询方法\r
\r
### 2023.02.22 载具对象Vehicle增加属性\r
\r
### 2023.02.17 CustomObject视角跟随、设置点云、太阳和月亮尺寸\r
\r
### 2023.02.15 HeatMap热力图增加新的样式参数\r
\r
### 2023.02.10 TileLayer对象新增图层碰撞信息查询方法\r
\r
### 2023.02.08 CustomObject对象新增方法\r
\r
### 2023.02.06 Marker对象新增支持贴合载具Vehicle运动\r
\r
### 2023.02.01 Heatmap3d对象新增属性\r
\r
##### Heatmap对象新增属性denoise：\r
\r
### 2023.01.30 属性改名\r
\r
##### DigitalTwinPlayer的初始化属性由于功能扩展而改名\r
\r
debugTouchPanel改名为debugEventsPanel，将此属性设置为true后，将在左上角显示一个半透明的调试面板，之前只能显示触摸事件，现在可以显示键盘、鼠标、触摸事件了，方便调试。\r
\r
### 2023.01.17 新增火星坐标系和百度坐标系支持\r
\r
##### 新增火星坐标系和百度坐标系支持\r
\r
### 2023.01.13 CustomObject对象startMove方法新增参数\r
\r
##### startMove方法新增rotation参数\r
\r
### 2023.01.11 Heatmap3d、Weather对象修改\r
\r
##### Heatmap对象新增属性：\r
\r
##### Heatmap对象新增增加三维像素块方法：\r
\r
##### Weather对象新增设置阴影强度方法\r
\r
### 2022.12.30 Misc对象新增getConvexPolygon()方法\r
\r
##### 新增getConvexPolygon()方法：\r
\r
### 2022.12.26 Vehicle 对象增加moveTo()方法\r
\r
##### 新增moveTo()方法：\r
\r
### 2022.12.22 HeatMap3D 对象add方法增加属性\r
\r
##### 新增add方法属性：\r
\r
### 2022.12.16 ImageryLayer 对象add方法增加属性\r
\r
##### 新增ImageryLayer对象add方法属性：\r
\r
- xmlPath (string) 可选，xml协议的url路径，不传则默认从init()方法获取\r
- layerName (string) 可选，图层名称，不传则默认从init()方法获取\r
- tileMatrixName (string) 可选，如果服务类型是WMTS：tileMatrixName是切片方案，如果服务类型是WMS：tileMatrixName是坐标类型，不传则默认从init()方法获取\r
- ogcEPSG (string) 可选，坐标系类型，不传则默认从init()方法获取\r
\r
### 2022.12.16 CustomMesh对象新增属性\r
\r
##### CustomMesh对象新增属性如下：\r
\r
### 2022.12.06 Polygon和Polyline对象新增自定义材质替换相关属性\r
\r
##### Polygon和Polyline对象各自新增属性如下：\r
\r
### 2022.12.01 自定义对象CustomObject新增属性\r
\r
### 注意：此localRotation属性替代了之前老版本的rotation属性，原来的rotation属性修正为控制世界坐标系的旋转\r
\r
##### CustomObject对象新增控制自身旋转属性：\r
\r
- localRotation (array) 模型自身旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]\r
\r
### 2022.11.30 新增载具对象Vehicle及相关操作方法\r
\r
##### Vehicle对象新增如下方法：\r
\r
- add() 添加载具对象\r
- update() 更新载具对象\r
- clear() 清空载具对象\r
- show() 显示载具对象\r
- hide() 隐藏载具对象\r
- delete() 删除载具对象\r
- get() 查询载具对象\r
- setWayPoints() 给载具对象添加运动的路径点\r
- start() 启动载具运动\r
- pause() 暂停载具运动\r
- resume() 恢复载具运动\r
- stop() 停止载具运动\r
\r
### 2022.11.26 CustomObject对象setLocation()新增参数\r
\r
##### setLocation()方法新增参数如下：\r
\r
- smoothTime &#123;number&#125; 可选，平滑移动的插值时间，仅在smoothMotion=1即平滑移动下生效，注意：传值若为0则根据调用setLocation()接口的时间自动计算平滑移动的插值时间，默认值：1，单位：秒\r
\r
### 2022.11.16 新增保存场景方法\r
\r
##### 新增saveProject方法\r
\r
- saveProject() 保存场景（只保存场景设置，不保存接口创建的对象）\r
\r
### 2022.11.10 Polygon3D对象新增方法\r
\r
##### 新增如下方法\r
\r
- showAll() 显示所有Polygon3D对象\r
- hideAll() 隐藏所有Polygon3D对象\r
\r
### 2022.11.09 SettingPanel对象设置后期方法新增属性\r
\r
##### setPostProcessMode() 方法参数新增属性如下：\r
\r
- darkCorner &#123;number&#125; 暗角，取值范围：[0~1]，单位：百分比，默认值：0\r
- lutMode &#123;number&#125; LUT调色模式，取值范围：[0~30]，默认值：0（关闭调色模式），1-30对应不同LUT调色效果\r
- lutIntensity &#123;number&#125; LUT调色强度，类型为百分比，取值范围：[0~1.0]，默认值：0，即小数对应的百分比\r
\r
### 2022.11.08 Tools、Misc对象新增方法\r
\r
##### Tools新增显示隐藏系统面板方法如下：\r
\r
- 显示系统面板方法 showPanel(type,positon)\r
- 隐藏系统面板方法 hidePanel()\r
\r
##### Misc对象新增方法如下：\r
\r
- setMultiviewportInteractSync(bool) 多视口模式下设置相机是否同步\r
\r
### 2022.11.02 新增设置指北针位置方法\r
\r
##### Settings对象新增方法如下：\r
\r
- setCampassPosition(left,top) 设置指北针位置\r
\r
### 2022.10.29 贴花对象新增参数\r
\r
##### 新增贴花类型参数\r
\r
- decalBlendMode (number) 贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花；默认值：0\r
\r
### 2022.10.28 Tools设置测量增加字体大小控制参数\r
\r
##### 设置测量模式增加字体大小参数\r
\r
- 测量模式显示字体大小：textSize 默认值10\r
\r
### 2022.10.20 完善VideoProjection和Settings对象\r
\r
##### VideoProjection对象新增方法如下：\r
\r
- clear()方法\r
\r
##### Settings对象新增方法如下：\r
\r
- 查询当前交互模式 getInteractiveMode()方法\r
\r
### 2022.10.12 完善ImageryLayer、ShapeFileLayer\r
\r
##### 新增ImageryLayer对象方法如下：\r
\r
- ImageryLayer对象增加show()方法\r
- ImageryLayer对象增加hide()方法\r
- ImageryLayer对象增加delete()方法\r
\r
##### ShapeFileLayer对象新增属性cacheAllField：\r
\r
- cacheAllField (boolean) 当type==Polygon时此属性可选，Polygon支持缓存所有字段，以便于高效动态更新Polygon不同字段的效果，默认值：false\r
\r
### 2022.10.09 扩展初始化属性\r
\r
##### DigitalTwinPlayer初始化参数options增加属性\r
\r
- mainUI：是否显示Cloud工具栏，如果设置为true就显示，如果设置为false就隐藏，如果没有设置，就保持原状。\r
- campass: 是否显示指北针，如果设置为true就显示，如果设置为false就隐藏，如果没有设置，就保持原状。\r
\r
### 2022.09.28 新增设置WMTS图层服务的透明度方法\r
\r
##### Settings对象新增如下方法：\r
\r
- setWMTSLayerOpacity(data) 设置图层透明度\r
\r
### 2022.09.27 相机限制、后期泛光参数、移除VTPK\r
\r
##### Camera新增如下方法：\r
\r
- lockByBBox(bbox) 根据bbox范围锁定相机交互范围\r
- unLockByBBox() 解锁相机交互\r
\r
##### 设置面板后期设置setPostProcessMode()新增如下参数：\r
\r
- bloomIntensity: 0.1,//泛光，取值范围：[0~10.0]，默认值：0\r
\r
##### Settings对象新增如下方法：\r
\r
- removeLabelLayer() 移除当前显示的VTPK的标注\r
\r
### 2022.09.16 实例管理功能支持REST\r
\r
##### 实例管理服务接口调用支持REST方式\r
\r
- WebSocket方式，需要先建立连接，然后才能调用\r
- REST通过HTTP POST，注意：POST时Content-Type需要设置为application/json，要发送的JSON字符串设置在Body里\r
- 获取实时运行状态的接口不支持REST，只能通过WebSocket方式调用\r
\r
实例管理服务有2种调用方式：WebSocket和REST，两种方式发送和接收的数据格式都是JSON\r
\r
### 2022.09.15 SettingsPanel对象新增设置相机最大高度参数\r
\r
##### 相机设置支持最大相机高度maxCameraHeight\r
\r
- 设置相机面板参数 setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight)\r
\r
### 2022.09.09 增加ImageryLayer 网络图层对象及相关操作方法\r
\r
##### 新增ImageryLayer对象，相关操作方法如下：\r
\r
- ImageryLayer对象增加init()方法\r
- ImageryLayer对象增加add()方法\r
\r
### 2022.09.01 优化ShapeFile对象命名修改为ShapeFileLayer\r
\r
##### 矢量图层对象名称修改为ShapeFileLayer\r
\r
- 兼容之前5.2/5.1的别名写法，例如shapeFile和shp\r
\r
### 2022.08.31 Marker对象新增按分组操作方法\r
\r
##### 动态标注对象新增如下方法：\r
\r
- showByGroupId() 按分组ID显示\r
- hideByGroupId() 按分组ID隐藏\r
- deleteByGroupId() 按分组ID删除\r
\r
### 2022.08.25 优化focus()方法\r
\r
##### 新增rotation参数控制相机定位时旋转\r
\r
- rotation (array) 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0]\r
\r
### 2022.08.23 完善Marker对象\r
\r
##### Marker对象新增智能模式下属性\r
\r
- autoDisplayModeSwitchFirstRatio (number) 智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2\r
- autoDisplayModeSwitchSecondRatio (number) 智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=1\r
\r
### 2022.08.22 完善Settings、InfoTree\r
\r
##### Settings对象新增方法setCursorAutoSync()\r
\r
- 设置多客户端访问时鼠标同步\r
\r
##### InfoTree对象新增focus()方法\r
\r
- 图层树对象新增focus()方法\r
\r
### 2022.08.19 完善Marker对象\r
\r
##### displayMode参数新增显示模式\r
\r
- displayMode:3，移动时不显示，不参与避让聚\r
- displayMode:4，智能模式，根据当前相机高度自动适配以上模式，类似金字塔lod加载效果，内置规则:range范围的1%内取值2，1%至10%取值1，大于10%取值0\r
\r
### 2022.08.17 完善Setting对象\r
\r
##### 设置VTPK标注方法\r
\r
- setLabelLayer(name)\r
\r
##### 获取所有VTPK方法\r
\r
- getLabelLayer()\r
\r
##### 相机移动事件的开关方法增加事件返回间隔时间参数\r
\r
settings对象setEnableCameraMovingEvent方法增加period参数，值越小返回的越快，单位：毫秒，默认：20ms，取值范围：[0~100]\r
\r
### 2022.07.21 优化DigitalTwinPlayer\r
\r
##### 显示任务队列\r
\r
- 0: 永不显示\r
- 1: 执行比较耗时的操作时显示（默认值）\r
- 2: 一直显示\r
\r
由于现在的接口都是在主线程执行的，当接口调用比较耗时的时候，视频流会处于假死状态（无法交互），为了让用户知道当前的状态，增加了API调用信息的显示。 DigitalTwinPlayer类的构造函数增加属性：showTaskList，取值如下： 如果值为1，当一条API指令执行时间超过1秒，就会显示任务队列信息。\r
\r
##### 增加错误代码\r
\r
如果当前实例正在执行比较耗时的API指令，用户在连接的时候，就会出现黑屏现象，为了明确提示用户，增加了错误代码：4107\r
\r
### 2022.07.21 完善DigitalTwinPlayer\r
\r
##### 二次开发可以获取视频流实时状态\r
\r
\`\`\`js\r
var options = {\r
	'onvideostatus': stats => {         //用于接收视频流的状态信息，例如：帧率、码率、QP等\r
           document.title = \`Cloud--FPS:\${stats.framesPerSecond}\`;\r
    },\r
    //其他属性...\r
}\r
var aircityPlayer = new DigitalTwinPlayer(playerHost, options);\r
\`\`\`\r
\r
DigitalTwinPlayer类的构造函数增加属性：onvideostatus，用于接收视频流的状态信息，例如：帧率、码率等\r
\r
##### actionEventHander属性改名为onaction\r
\r
DigitalTwinPlayer构造函数的初始化属性actionEventHander改名为onaction，为了兼容之前代码，之前的actionEventHander仍然可用。\r
\r
##### 二次开发可以随时开关键盘、鼠标交互事件\r
\r
DigitalTwinPlayer类增加方法：setActionEventEnabled，可以随时设置是否开启键盘、鼠标交互事件的回调功能\r
\r
### 2022.07.18 视频投影对象新增支持投影线框\r
\r
##### 投影线框参数：\r
\r
- frustumVisible (boolean) 是否显示投影线框，默认值：false\r
\r
### 2022.07.07 光源Light对象新增支持automate属性\r
\r
##### Light对象新增属性描述如下：\r
\r
- automate (boolean) 可选参数，是否根据系统时间自动开关，即开启后晚上自动亮白天自动灭，默认值：true\r
\r
### 2022.06.21 完善customObject、marker对象\r
\r
##### customObject的objectId参数描述如下：\r
\r
- objectId (string | array) TileLayer图层中包含的待复制的模型(Actor)的ObjectId，同时也支持数组类型参数即把多个actor复制为一个customObject\r
\r
##### marker的imagePath和hoverImagePath参数描述如下：\r
\r
- imagePath (string) 图片路径，支持gif动图，支持本地路径和网络路径\r
- hoverImagePath (string) 鼠标悬停时显示的图片路径，支持gif动图，支持本地路径和网络路径\r
\r
### 2022.06.20 全景图对象新增方法，Marker、ShapeFile对象新增属性\r
\r
##### Panorama对象新增操作方法如下：\r
\r
- 进入全景图模式：enter(id)\r
- 退出全景图模式：exit()\r
- 切换显示模式：switchMode()\r
\r
##### Marker对象新增属性如下：\r
\r
- clusterByImage (boolean) 聚合时是否根据图片路径分类聚合显示，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合\r
\r
##### ShapeFile对象新增属性如下：\r
\r
- clusterByImage (boolean) 当type==Point时此属性可选，是否按相同图片路径(pointImage)聚合显示\r
\r
### 2022.06.14 视频流展示新增多视口模式（分屏显示）\r
\r
##### Misc对象新增的操作多视口方法如下：\r
\r
- 进入多视口：enterMultiViewportMode(viewportMode,lineColor,lineSize)\r
- 退出多视口：exitMultiViewportMode()\r
- 设置当前激活视口：setActiveViewport(index)\r
- 获取当前激活视口：getActiveViewport()\r
\r
### 2022.06.02 蓝图函数支持传递多个参数\r
\r
##### Misc对象下callBPFunction()和CustomObject对象下callFunction()/callFunction4CustomObjectArr()新增parameters属性\r
\r
### 2022.05.27 贴花对象Decal新增bbox参数\r
\r
##### 贴花对象Decal新增bbox参数\r
\r
### 2022.05.19 Polygon3D对象新增自定义材质替换属性\r
\r
##### Polygon3D对象新增自定义材质替换属性\r
\r
### 2022.05.19 修改Tools对象体剖切方法和日日照分析方法\r
\r
##### Tools对象体剖切方法更新\r
\r
##### 日照分析startSunshineAnalysis(options)方法设置对象options新增时间区间属性\r
\r
### 2022.05.16 优化Cloud UI及交互\r
\r
##### 完善DigitalTwinCloud视频流窗口的UI\r
\r
视频流窗口的左下角增加3个按钮：显示信息、全屏显示、初始位置\r
\r
##### DigitalTwinCloud键盘交互默认方式改为video\r
\r
之前版本的键盘交互默认是关闭的，现在改为video。\r
\r
### 2022.05.11 键盘鼠标交互事件\r
\r
##### DigitalTwinPlayer增加了键盘、鼠标交互事件的回调函数\r
\r
\`\`\`js\r
let actionEventHander = {\r
        'onmousedown': e => { log(\`[MouseDn] button: \${e.button}, pos: \${e.x}, \${e.y}\`) },\r
        'onmouseup': e => { log(\`[MouseUp] button: \${e.button}, pos: \${e.x}, \${e.y}\`) },\r
        'onkeydown': e => { log(\`KeyDown: \${e.code}\`) }\r
    }\r
 aircityPlayer = new DigitalTwinPlayer("192.168.1.29:8080", {\r
    'actionEventHander': actionEventHander  //鼠标、键盘交互事件的回调\r
    //其他属性\r
    //...\r
});\r
\`\`\`\r
\r
\`\`\`js\r
[MouseDn] button: 2, pos: 892, 625\r
[MouseUp] button: 2, pos: 892, 625\r
KeyDown: KeyF\r
KeyDown: KeyA\r
KeyDown: KeyD\r
KeyDown: ControlLeft\r
KeyDown: ShiftLeft\r
\`\`\`\r
\r
- onmouseenter\r
- onmouseleave\r
- onmousemove\r
- onmousedown\r
- onmouseup\r
- onkeydown\r
- onkeyup\r
\r
DigitalTwinPlayer的初始化参数params增加属性：actionEventHander，可以用来设置键盘、鼠标交互事件的回调函数，目前支持以下事件的回调： 运行效果：\r
\r
##### CustomMesh对象新增自定义材质替换属性\r
\r
- material 自定义材质路径\r
- scalarParameters 材质数值参数，用来控制材质不透明度\r
- vectorParameters 材质数组参数，用来控制材质颜色\r
\r
##### 蓝图函数参数类型枚举(BPFuncParamType)新增浮点数组\r
\r
- FloatArray新增浮点数值参数类型FloatArray\r
\r
### 2022.05.10 DigitalTwinPlayer\r
\r
##### DigitalTwinPlayer类增加初始化参数\r
\r
DigitalTwinPlayer初始化参数params增加属性：useHttps，可以明确指定是否使用HTTPS进行WebSocket连接。 如果使用Nginx通过Https反向代理DigitalTwinCloud的Http服务，为了能够正确的建立连接，需要在初始化DigitalTwinPlayer的时候设置useHttps属性为true。\r
\r
### 2022.05.09 导出天际线\r
\r
##### 优化导出天际线的接口\r
\r
原先的接口定义如下：tools.exportSkyline(filePath, imageSize); 第一个参数只能是云渲染服务器的路径，这在Cloud环境下调用会有诸多不便，为了解决这个问题，增强了第一个参数的含义，如果传递的是文件路径，则导出图片到磁盘指定的位置， 如果传递字符串"base64"（不区分大小写），则接口返回图片的BASE64编码字符串。 如下代码的运行效果： fdapi.tools.exportSkyline('base64', [400, 200],\r
\r
### 2022.04.18 实现全屏功能\r
\r
##### 视频流窗口实现全屏功能\r
\r
DigitalTwinPlayer对象增加属性：fullscreen&#123;get, set&#125;，可以用来设置是否全屏，也可以获取当前是否处于全屏状态 例如：fdplayer.fullscreen = true DigitalTwinPlayer对象初始化参数options增加属性showFullscreenButton，用于控制是否在右下角显示“全屏”按钮，默认为false，不显示。\r
\r
### 2022.04.15 内嵌浏览器内核支持回调了\r
\r
##### Marker的弹窗页面和tick页面里调用API支持回调了\r
\r
\`\`\`js\r
async function getCamera() {\r
        let o = await fdapi.camera.get();\r
        document.getElementById('info').innerText = JSON.stringify(o);\r
    }\r
\`\`\`\r
\r
现在在弹窗页面和tick页面里调用API方法，完全跟正常页面调用一样了，支持回调函数了。 例如： 运行效果：\r
\r
### 2022.04.13 增加获取SDK完整版本号的方法\r
\r
##### DigitalTwinAPI类增加方法getVersion\r
\r
可获取SDK的完整版本号，例如：5.3.0413 注：通过AcApiVersion或者acapi.VERSION获取到的是SDK的大版本号，例如：5.3，而通过此方法获取到的是完整版本号\r
\r
### 2022.04.07 Polyline和Polygon对象增加可视范围参数\r
\r
##### Polyline、Polygon新增可视范围参数\r
\r
- range (array) 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]\r
\r
### 2022.04.01 天气对象设置雾效新增雾化范围参数\r
\r
##### setFogParam() 新增雾化范围参数fogRange\r
\r
- setFogParam(fogDensity, fogGroundDensity, fogGroundHeight, fogRange)\r
\r
### 2022.03.25 Marker3D、Weather、TileLayer、Tools、Camera对象修改\r
\r
##### Marker3D新增可视范围和自动高度属性\r
\r
- range：3D标注的可视距离范围：[min,max]，单位：米\r
- autoHeight：自动判断下方是否有物体，设置正确高度，默认值：false\r
\r
##### Weather对象新增设置云层高度方法\r
\r
- 设置云层高度：setCloudHeight(cloudHeight) 参数单位：公里\r
\r
##### TileLayer对象Foucs方法新增定位距离和飞机时间参数\r
\r
- distance：定位距离 单位：米\r
- flyTime : 飞行时间 单位：秒\r
\r
##### Tools对象视域分析接口新增起始坐标位置属性\r
\r
- startPoint：起点坐标位置\r
- endPoint : 终点坐标位置\r
\r
##### Camera对象新增方法计算空间两点的欧拉角\r
\r
- getEulerAngle(startPoint,endPoint)：起始点坐标位置\r
\r
### 2022.03.25 支持Node服务器环境调用\r
\r
##### DigitalTwinCloud JS API支持Node服务器环境调用了\r
\r
\`\`\`js\r
const acapi = require('./ac.min');\r
var fdapi = new acapi.DigitalTwinAPI('192.168.1.29:4321', {\r
    onReady: () => {\r
        let data = {\r
            id: 't1',\r
            coordinate: [491274.65625, 2489124, 21.0],\r
            text: '北京银行',\r
            range: [1, 10000]\r
        }\r
        fdapi.tag.delete('t1');\r
        fdapi.camera.set(492472.750000, 2487660.750000, 1637.308838, -49.619568, -93.635345, 0);\r
        fdapi.tag.add(data);\r
    }\r
});\r
\`\`\`\r
\r
使用方法与浏览器环境一样\r
\r
##### WebSocket方式的API调用不再限制数据大小\r
\r
之前通过WebSocket方式调用API会有数据大小限制（超过30MB就会造成WebSocket连接断开），新的版本不再有这个限制了，对浏览器环境和Node服务器环境都没有限制了。 注意： 只有通过CloudAPI调用接口发送数据才不会有限制， 如果自己创建WebSocket对象，自己发送数据还是有限制。\r
\r
### 2022.03.24 实现在三维渲染每帧的时候执行JS脚本\r
\r
### 2022.03.23 ShapeFile对象新增Feature要素操作方法\r
\r
##### ShapeFile对象新增方法如下：\r
\r
- 高亮单个要素区域：highlightFeature(shapeFileId,featureId)\r
- 取消高亮单个要素区域：stopHighlightFeature(shapeFileId,featureId)\r
- 高亮多个要素区域：highlightFeatures(data)\r
- 取消高亮多个要素区域：highlightFeatures(data)\r
- 定位要素区域：focusFeature(shapeFileId, featureId, distance, flyTime)\r
- 查询多个要素区域：getFeature(data)\r
\r
### 2022.03.22 实现在POI弹窗里进行接口调用及交互操作\r
\r
##### 和主页面进行通信（单向）\r
\r
\`\`\`js\r
//onEvent\r
    let _onEvent = (e) => {\r
        if (e.eventtype == 'MarkerCallBack') {\r
            alert(e.Data);\r
        }\r
        log('OnEvent: ' + e.eventtype);\r
    };\r
\`\`\`\r
\r
在弹窗的页面中进行如下调用：\`\`FDExternal.postevent('this is a message.')\` FDExternal是弹窗的浏览器内核的内置对象 主页面的事件处理：\r
\r
##### 在弹窗里直接进行接口调用\r
\r
\`\`\`js\r
var fdapi;\r
\r
    window.onload = function () {\r
        fdapi = new DigitalTwinAPI(); //初始化时不需要传递任何参数\r
    }\r
\r
    function callApi() {\r
        fdapi.settings.setMainUIVisibility(false);\r
        fdapi.odline.clear();\r
        let o = {\r
            id: 'od1',color: Color.Green,\r
            coordinates: [[492303.65625, 2487534.5, 4.195], [491391.5625, 2487777.5, 4.2]],\r
            flowRate: 1,intensity: 1,bendDegree: 0.5,\r
            tiling: 0.5,lineThickness: 15,flowPointSizeScale: 30,\r
            labelSizeScale: 1000,endLabelShape: 1，\r
            lineShape: 1,lineStyle: 0,flowShape: 1,\r
            startPointShape: 1,endPointShape: 1,startLabelShape: 1            \r
        };\r
        fdapi.odline.add(o);\r
        fdapi.odline.focus(o.id);       \r
    }\r
\`\`\`\r
\r
- 调试不方便，因为代码是在POI弹窗里运行，所以没有办法像浏览器一样进行调试，如果直接在浏览器运行弹窗页面也是不能进行API调用的（因为浏览器里没有FDExternal对象）\r
- 没有接口调用的返回值，不能使用回调函数或者异步操作(await/async, then等)\r
\r
这种方式效率很高，不会通过网络传输，也不会占用主页面的脚本执行时间，直接通过JS调用C++的底层功能。 但是也是有缺点的： 如果不能接受上面2个缺点，可以通过第1条更新进行迂回实现，通过向主页面发送消息，所有逻辑代码在主页面里实现。\r
\r
##### 在弹窗里直接调用C++方法关闭窗口\r
\r
### 2022.03.17 新增三维热力图对象，Settings新增交互模式、Marker新增方法\r
\r
##### HeatMap3D对象新增方法如下：\r
\r
- 添加对象：add()\r
- 修改对象：update()\r
- 删除对象：delete()\r
- 查询对象：get()\r
- 聚焦对象：focus()\r
- 隐藏对象：hide()\r
- 显示对象：show()\r
- 清空对象: clear()\r
\r
##### Settings对象修改方法如下：\r
\r
- setInteractiveMode(mode)：设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式\r
\r
##### Marker对象新增方法如下：\r
\r
- setAttachCustomObject(data)：设置标注Marker贴合模型对象CustomObject，模拟标注跟随物体运动\r
\r
### 2022.03.11 Settings对象setMapMode()方法增加设置WMTS最大层级参数\r
\r
##### Settings对象setMapMode()方法新增设置WMTS最大层级参数如下：\r
\r
- maxLevel : WMTS服务最大显示层级，取值范围：[0~22]，默认值：10\r
\r
### 2022.03.10 图层TileLayer对象新增getAllFlattenInfo方法、get()方法增加包围盒bbox信息\r
\r
##### TileLayer对象新增方法和属性如下：\r
\r
- BBox：[minX,minY,minZ,MaxX,maxY,maxZ]\r
- 新增方法：getAllFlattenInfo() 查询所有图层的剖切信息\r
\r
### 2022.03.08 优化光标资源\r
\r
##### 将光标文件内置\r
\r
之前的SDK用户在进行二次开发时需要将SDK目录的cursors文件夹拷贝到自己的环境并与ac.min.js在一个文件夹下。今天之后的版本不再需要这个cursors文件夹了，光标资源已经内置到API里，不需要单独的cur文件了。\r
\r
##### DigitalTwinPlayer初始化增加属性：useBuiltinCursors\r
\r
参数类型：boolean，默认值true 设置是否使用内置光标，如果设置为false, 则不使用内置光标，视频窗口将一直显示箭头样式的光标\r
\r
### 2022.03.04 水流场WaterFlowField对象属性调整\r
\r
##### WaterFlowField对象调整属性如下：\r
\r
- WaterFlowField对象新增属性：uvRangeMapping (array) 流速重映射范围，为了突出流动效果，可以对流速有效范围进行一个映射\r
- WaterFlowField对象修改属性：colorSpeedRange修改为validUVRange (array) 流速有效范围，流速小于min的区域会显示蓝色，min到max之间的区域会从蓝色过渡到红色显示热\r
\r
### 2022.03.02 DigitalTwinPlayer对象增加初始化属性\r
\r
##### DigitalTwinPlayer初始化参数options增加属性urlExtraInfo\r
\r
\`\`\`js\r
var player = new DigitalTwinPlayer('127.0.0.1:8080', {\r
    iid:'2471787814316',\r
    pid:1, \r
    urlExtraInfo:{\r
        userToken:'jb3k5b345',\r
    	appToken:'jbsfhjg4234'\r
    }   \r
})\r
\`\`\`\r
\r
在初始化DigitalTwinPlayer对象时，可以在options参数中设置属性：urlExtraInfo，用于在创建WebSocket连接的URL后面添加附加信息（例如授权认证信息等），例如如下的示例代码： 最终生成的WebSocket URL是这样的：ws://192.168.1.29:8080/player?hasVideo=true&iid=2471787814316&pid=1&userToken=jb3k5b345&appToken=jbsfhjg4234\r
\r
### 2022.03.01 视频投影对象自定义蒙版图片属性\r
\r
##### VideoProjection对象新增自定义蒙版图片属性\r
\r
texturePath (string) 自定义投影蒙版图片路径，可以是本地路径，也支持网络路径\r
\r
### 2022.02.24 全景图对象增加属性、TileLayer对象setCollision()方法增加参数\r
\r
##### 全景图对象增加属性\r
\r
是否贴地：onTerrain，布尔类型，默认true，设置为贴地后offset偏移量的Z轴会失效 偏移量：offset，数组类型，[X,Y,Z]\r
\r
##### TileLayer对象setCollision()方法增加参数\r
\r
enableMouseInteract 是否开启鼠标交互，默认值：true 开启交互 enableMousePick 是否开启鼠标拾取查询，默认值：true 开启拾取 enableCharacterCollision 是否开启碰撞，默认值：true 开启碰撞\r
\r
### 2022.01.25 Tools对象多边形剖切增加反转参数和3dt挖洞增加反转参数\r
\r
##### 多边形剖切增加反转参数：isReverseCut\r
\r
多边形剖切反转：tools.startPolygonClip(coordinates,isReverseCut)\r
\r
##### TileLayer多边形挖洞方法增加反转参数：isReverseCut\r
\r
新增多边形挖洞反转：tileLayer.addHole() 修改多边形挖洞反转：tileLayer.updateHole()\r
\r
### 2022.01.26 Tools对象新增等高线分析方法\r
\r
##### Tools对象新增等高线分析方法\r
\r
开始分析：startContourLineAnalysis(option) 结束分析：stopContourLineAnalysis()\r
\r
### 2022.01.21 Tools对象新增坡度坡向分析方法，设置测量增加地表面积测量类型枚举\r
\r
##### Tools对象新增坡度坡向分析方法\r
\r
开始分析：startTerrainSlopeAnalysis(option) 结束分析：stopTerrainSlopeAnalysis()\r
\r
##### Tools对象设置测量模式增加地表面积测量类型枚举\r
\r
地表面积测量：MeasurementMode.TerrainArea\r
\r
### 2022.01.13 TileLayer对象设置样式setStyle()方法新增参数\r
\r
##### TileLayer对象设置样式方法新增参数\r
\r
饱和度：saturation 亮度：brightness 对比度：contrast 对比度基准：contrastBase\r
\r
### 2022.01.13 Tools对象新增日照分析\r
\r
##### Tools对象新增日照分析工具\r
\r
开始日照分析方法：startSunshineAnalysis(options) 结束日照分析方法：stopSunshineAnalysis()\r
\r
### 2022.01.06 Tools对象新增多条线段求交方法\r
\r
##### Tools对象新增方法linesIntersect()\r
\r
linesIntersect(startEndPointArr, highPrecision,returnDetails)：支持一次设置多条线段求交，支持设置返回信息精度和返回内容详情\r
\r
### 2021.12.28 Marker对象新增属性 Weather对象新增方法\r
\r
##### Marker对象新增属性\r
\r
hoverImageSize：鼠标悬停时显示的图片尺寸，[width,height]，默认值：[0,0] 使用图片原始尺寸\r
\r
##### Weather对象新增设置云层厚度方法\r
\r
setCloudTickness(cloudTickness)：云层厚度，取值范围：[0~20] : [28,28],//鼠标悬停时显示的图片尺寸\r
\r
### 2021.12.27 TileLayer接口修复挖平操作方法\r
\r
##### TileLayer修复挖平方法addModifier()的bug\r
\r
### 2021.12.24 TileLayer接口修改\r
\r
##### TileLayer add方法的data参数增加可见性和是否释放资源属性\r
\r
visible：添加后是否可见 releaseWhenHidden：隐藏时是否释放资源\r
\r
### 2021.12.23 Tools对象新增通视分析、开敞度分析和填挖方分析方法\r
\r
##### 新增通视分析和开敞度分析\r
\r
- Tools对象增加通视分析方法：startVisiblityAnalysis()、stopVisiblityAnalysis()\r
- Tools对象增加开敞度分析方法：startViewDomeAnalysis()、stopViewDomeAnalysis()\r
- Tools对象增加填挖方分析方法：startCutFillAnalysis()、stopCutFillAnalysis()\r
\r
### 2021.12.22 TileLayer对象新增方法和get()新增返回属性\r
\r
##### 新增设置TileLayer图层的可视高度范围方法，get()方法返回增加属性\r
\r
- TileLayer对象增加setViewHeightRange(id, minVisibleHeight, maxVisibleHeight)\r
- TileLayer对象get()方法返回结果增加minVisibleHeight、maxVisibleHeight属性，可视高度范围的最小最大值\r
\r
### 2021.12.13 设置面板SettingsPanel--后期选项增加设置倾斜摄影透明度参数\r
\r
##### 后期设置方法setPostProcessMode()新增设置属性如下：\r
\r
- osgbGlobalAlpha: 0.8 //倾斜摄影不透明度，取值范围：[0,1.0]，默认值：1.0\r
\r
### 2021.12.10 新增流场WaterFlowField对象及相关操作方法\r
\r
##### WaterFlowField对象新增方法如下：\r
\r
- WaterFlowField对象增加add()方法\r
- WaterFlowField对象增加update()方法\r
- WaterFlowField对象增加delete()方法\r
- WaterFlowField对象增加get()方法\r
- WaterFlowField对象增加clear()方法\r
- WaterFlowField对象增加focus()方法\r
- WaterFlowField对象增加hide()方法\r
- WaterFlowField对象增加show()方法\r
\r
##### 修复TileLayer的hideActors()方法：\r
\r
- 修复TileLayer的隐藏多个Actor方法 hideActors()\r
\r
### 2021.12.08 三维图层TileLayer对象增加三个属性\r
\r
##### TileLayer对象新增属性及默认取值如下：\r
\r
- enableMouseInteract (boolean) 是否开启鼠标交互，默认值：true 开启交互\r
- enableMousePick (boolean) 是否开启鼠标拾取查询，默认值：true 开启拾取\r
- enableCharacterCollision (boolean) 是否开启碰撞，默认值：true 开启碰撞\r
\r
### 2021.12.07 自定义对象CustomObject增加方法\r
\r
##### CustomObject对象新增设置视口可见性方法如下：\r
\r
- 新增方法： setViewportVisible(id,vp,fn) 仅在播放导览时生效\r
\r
### 2021.12.03 优化API调用性能，Tools剖切方法增加参数，自定义对象增加控制移动方法\r
\r
##### 实现禁用回调功能以优化性能\r
\r
\`\`\`js\r
async function test_stress_disable_callback() {\r
    log('100次API调用开始...');\r
    let t1 = new Date().getTime();\r
    for (let i = 0; i < 100; i++) {\r
        fdapi.settings.setMainUIVisibility(false, null);\r
        //下面是启用回调的代码，可以对比一下\r
        //await fdapi.settings.setMainUIVisibility(false);\r
    }\r
    let t2 = new Date().getTime();\r
    log('100次API调用开始! 总共耗时：' + (t2 - t1));\r
}\r
\`\`\`\r
\r
​ 之前调用每个API方法，服务器在处理后都会返回调用结果，但是有些接口用户根本不关心也不需要服务器返回结果，比如设置相机位置、显隐界面UI等。 ​ 因为服务器返回信息都是排队返回的，如果在大量调用接口的时候，每个接口都返回信息，就会造成队列拥挤，这样用户真正需要调用返回信息的接口的时候，就会等待很久。所以增加了禁用服务器返回的功能。 ​ 每个API方法的最后一个参数都是回调函数fn，如果想禁止服务器在处理后返回响应，只需要将fn 设置成null即可（注意不是undefined，必需是null）。 如上测试代码，如果禁用服务器响应总耗时是477ms，如果启用服务器响应，总耗时是10072ms。 注意：fn设置成null以后，此方法就不能再等待了，前面不能加await了。\r
\r
##### Tools面、体剖切方法增加参数\r
\r
- 新增参数：Tools面剖切方法新增参数控制交互编辑startPlaneClip(location, rotation, isShowPlane,isEditable, fn)\r
- 新增参数：Tools体剖切方法新增参数控制交互编辑 startVolumeClip(bbox, value, isShowBBox ,isEditable, fn)\r
\r
##### CustomObject增加控制对象移动方法\r
\r
- 新增方法：startMove() 按路径轨迹和差分时间执行物体移动\r
\r
### 2021.12.02 Light对象新增可视距离distance属性\r
\r
##### 新增功能如下\r
\r
- Light光源对象增加可视距离distance属性，默认5000米\r
\r
### 2021.12.01 新增SettingsPanel对象新增Polyline样式\r
\r
##### 新增设置面板SettingsPanel对象及相关操作方法如下\r
\r
- 设置汇报模式参数 setReportModeMode()\r
- 获取汇报模式参数 getReportModeMode()\r
- 设置控制面板参数 setControlMode()\r
- 获取控制面板参数 getControlMode()\r
- 设置后期面板参数 setPostProcessMode()\r
- 获取后期面板参数 getPostProcessMode()\r
- 设置相机面板参数 setCameraMode()\r
- 获取相机面板参数 getCameraMode()\r
- 设置地图面板参数 setMapMode()\r
- 获取地图面板参数 getMapMode()\r
\r
##### Polyline新增两种虚线样式\r
\r
- 普通虚线 PolylineStyle.DottedNormal\r
- 圆点虚线 PolylineStyle.DottedCircle\r
\r
### 2021.11.26 自定义对象CustomObject对象新增替换和恢复材质方法\r
\r
##### 新增相关方法如下\r
\r
- 替换自定义对象材质 overrideMaterial()\r
- 恢复自定义对象材质 restoreMaterial()\r
\r
### 2021.11.25 天气对象新增6个参数及相关设置方法\r
\r
##### 参数设置相关方法如下\r
\r
- 设置太阳光照射强度 setSunIntensity(0.7)\r
- 设置月亮光照射强度 setMoonIntensity(30)\r
- 设置环境光强度 setAmbientLightIntensity(0.3)\r
- 设置色温值 setTemperature(8500)\r
- 设置阴影质量 setShadowQuality(2)\r
- 设置阴影可视距离 setShadowDistance(2000)\r
\r
### 2021.11.19 顶点编辑新增四种坐标架类型\r
\r
##### 进入顶点编辑时，新增四种类型坐标架交互\r
\r
- 1.缩放\r
- 2.旋转\r
- 3.位移\r
- 4.混合，默认取值是4\r
\r
### 2021.11.19 新增WaterMesh水流网格对象及相关操作方法，Marker对象增加两个新属性\r
\r
##### 新增WaterMesh水流网格对象，相关操作方法如下\r
\r
- waterMesh对象增加add()方法\r
- waterMesh对象增加update()方法\r
- waterMesh对象增加delete()方法\r
- waterMesh对象增加get()方法\r
- waterMesh对象增加clear()方法\r
- waterMesh对象增加focus()方法\r
- waterMesh对象增加hide()方法\r
- waterMesh对象增加show()方法\r
\r
##### Marker对象增加两个新属性\r
\r
- Marker对象增加属性：boolean fixedSize 是否固定图片尺寸\r
- Marker对象增加属性：boolean useTextAnimation 是否使用画效果\r
\r
### 2021.11.16 优化API调用时机\r
\r
##### API首次调用必需在onReady回调里\r
\r
如果页面加载时，尚未接收到onReady回调就进行了API调用，某些接口可能有崩溃的风险，今天的版本优化了此功能，避免了潜在的风险，如果API调用早于onReady回调，会收到调用失败的结果 如果开启了日志，在WebSocket.log里也可以看到相关的日志记录：\r
\r
### 2021.11.08 增加实例访问权限功能\r
\r
##### 实例连接增加访问令牌\r
\r
DigitalTwinPlayer对象初始化参数options增加属性token，用于设置实例访问令牌，如果服务设置了令牌，那么客户端需要提供正确的令牌才能连接实例。\r
\r
### 2021.11.05 新增Light光源对象及相关操作方法\r
\r
##### 新增Light光源对象，相关操作方法如下：\r
\r
- Light对象增加add()方法\r
- Light对象增加update()方法\r
- Light对象增加delete()方法\r
- Light对象增加get()方法\r
- Light对象增加clear()方法\r
- Light对象增加focus()方法\r
- Light对象增加hide()方法\r
- Light对象增加hideAll()方法\r
- Light对象增加show()方法\r
- Light对象增加showAll()方法\r
\r
##### Beam对象新增显示/隐藏操作方法如下：\r
\r
- Beam对象增加hide()方法\r
- Beam对象增加hideAll()方法\r
- Beam对象增加show()方法\r
- Beam对象增加showAll()方法\r
\r
### 2021.11.02 TileLayer对象新增方法支持空间库查询\r
\r
##### TileLayer对象新增方法：\r
\r
- 新增：从空间库查询Actor详细属性方法 getActorInfoFromDB()\r
\r
### 2021.11.01 TileLayer对象修复高亮多个Actor问题\r
\r
##### 高亮接口bug：\r
\r
- 修复：高亮多个Actor方法highlightActors()\r
\r
### 2021.10.25 完善示例，优化用户体验\r
\r
##### 完善实例管理接口的实例，增加KickPlayer示例\r
\r
具体请参考manager.html\r
\r
##### 优化用户体验\r
\r
视频流窗口的左上角增加闪烁的小圆点（状态指示器），从指示点的颜色可以判断当前的运行状态，当DigitalTwinPlayer对象初始化时showStartupInfo设置为false不显示启动信息的时候，这个指示点是很有用的。 具体含义请参考CloudStatus类型。\r
\r
### 2021.10.18 Marker对象新增属性、RadiationPoint对象新增方法及优化部分接口\r
\r
##### 接口优化：\r
\r
- 优化：包含亮度的所有对象，亮度参数统一命名为intensity\r
- 新增：Marker对象增加showLine属性\r
- 新增：RadiationPoint对象增加hideAll()和showAll方法\r
\r
### 2021.10.15 Tools对象新增替换贴图纹理方法\r
\r
##### Tools新增操作方法如下：\r
\r
- Tools对象增加使用视频替换纹理方法：replaceTextureByVideo()\r
- Tools对象增加使用图片替换纹理方法：replaceTextureByImage()\r
- Tools对象增加使用网页替换纹理方法：replaceTextureByUrl()\r
- Tools对象增加恢复纹理方法：restoreTexture()\r
\r
### 2021.10.12 资源文件支持相对路径\r
\r
##### 所有接口的中引用的资源文件支持相对路径了\r
\r
### 2021.10.08 修复Settings里设置交互开关bug\r
\r
##### 修复设置交互开关方法的bug\r
\r
- setEnableInteract方法：设置交互开关，目前支持启用和禁用鼠标交互，禁用后可以通过API设置交互\r
\r
### 2021.09.26 增加Camera对象获取导览缩略图方法\r
\r
##### 新增根据导览名称获取对应导览缩略图base64字符串方法，如下：\r
\r
- Camera对象增加getAnimationImage()方法\r
\r
### 2021.09.22 增加Marker3D对象及相关操作方法，TileLayer新增压平和新增挖洞操作方法\r
\r
##### 新增Marker3D对象，相关操作方法如下：\r
\r
- Marker3D对象增加add()方法\r
- Marker3D对象增加update()方法\r
- Marker3D对象增加delete()方法\r
- Marker3D对象增加get()方法\r
- Marker3D对象增加clear()方法\r
- Marker3D对象增加focus()方法\r
- Marker3D对象增加hide()方法\r
- Marker3D对象增加hideAll()方法\r
- Marker3D对象增加show()方法\r
- Marker3D对象增加showAll()方法\r
\r
##### TileLayer新增压平和新增挖洞操作方法\r
\r
- TileLayer对象新增根据坐标添加压平addModifiers()方法\r
- TileLayer对象新增根据shapeFile路径添加压平addModifierByShapeFile方法\r
- TileLayer对象新增根据坐标添加挖洞addHole()方法\r
- TileLayer对象新增根据shapeFile路径添加挖洞addHoleByShapeFile方法\r
\r
### 2021.09.18 Polygon3DStyle增加枚举类型\r
\r
##### 新增枚举类型取值说明：\r
\r
- 单色无光照，SingleColor: 9\r
- 单色有光照，SingleColorWithLight: 10\r
\r
### 2021.09.18 CustomObject和Polygon增加方法，蓝图函数增加坐标类型参数\r
\r
##### 对象增加方法：\r
\r
- CustomObject对象增加setTintColor()方法：设置模型叠加颜色\r
- Polygon对象增加stopHighlight()方法： 取消对象高亮效果\r
\r
##### 蓝图函数CallBPFunction增加坐标类型参数\r
\r
- 参数支持单个坐标和坐标数组\r
\r
### 2021.09.16 完善DigitalTwinPlayer对象\r
\r
##### 完善三维键盘交互功能\r
\r
之前的版本的键盘交互都是绑定到document对象，这样有个问题就是在页面输入时也会触发三维交互，影响体验。今天的版本在DigitalTwinPlayer初始化的options参数里增加了keyEventReceiver属性，用于设置键盘事件绑定，可设置的值为：'document', 'video', 'none'，二次开发可以根据应用场景选择合适的值。\r
\r
##### 增加视频流加载成功的回调方法\r
\r
DigitalTwinPlayer初始化的options参数里增加了onloaded属性，可用于设置当视频流加载完成后的回调方法，具体请参考API文档和示例。\r
\r
##### DigitalTwinPlayer对象增加resize方法\r
\r
\`\`\`js\r
let options = {\r
    'iid': iid,                 //如果想连接指定的云渲染实例，可以指定这个参数\r
    'pid': pid,                 //工程ID\r
    'domId': 'player',          //DOM元素\r
    'apiOptions': apiOptions,   //DigitalTwinAPI初始化选项\r
    'keyEventTarget': 'none', //三维键盘交互事件接收者，可选的值：document / video / none\r
    'showStatus': true,         //如果不需要，直接去掉showStatus属性即可\r
    'showStartupInfo': true,    //如果不需要显示启动信息，直接去掉showStartupInfo即可\r
    'onclose': _onClose,        //一般情况下不需要这个属性\r
    'onloaded': () => console.log('video stream loaded.')\r
}\r
var aircityPlayer = new DigitalTwinPlayer(playerHost, options)\r
\`\`\`\r
\r
当自动布局无效时，可以手动调用此方法调整布局。\r
\r
##### 实现工程切换接口\r
\r
DigitalTwinPlayer增加方法setInstanceOptions，实现切换实例参数的功能。 调用此接口可以实现在不刷新页面的情况下切换实例参数\r
\r
### 2021.09.15 修正Marker对象属性名称：dispalyMode\r
\r
##### 修改属性名称：\r
\r
- 修改为displayMode\r
\r
### 2021.09.08 TileLayer对象新增挖洞相关操作\r
\r
##### TileLayer对象新增以下方法：\r
\r
- TileLayer对象增加addHole()方法 : 新增挖洞操作\r
- TileLayer对象增加updateHole方法: 更新挖洞操作\r
- TileLayer对象增加deleteHole方法: 删除挖洞操作\r
- TileLayer对象增加clearHole方法 : 清空挖洞操作\r
\r
### 2021.09.06 Marker和Tag对象增加属性，EditHelper和Tools删除相关参数\r
\r
##### 修改明细：\r
\r
- Marker和Tag对象： 添加popupBackgroundColor 弹出层颜色透明度属性 （ array）\r
- EditHelper对象：setParam接口 删除参数 DrawType和DrawTickness\r
- Tools对象： setMeasurement接口 删除参数 LineSize\r
\r
### 2021.09.02 增加ShapeFile对象及方法\r
\r
##### ShapeFile新增以下方法：\r
\r
- ShapeFile对象增加add()方法\r
- ShapeFile对象增加clear()方法\r
- ShapeFile对象增加delete()方法\r
- ShapeFile对象增加focus()方法\r
- ShapeFile对象增加get()方法\r
- ShapeFile对象增加hide()方法\r
- ShapeFile对象增加hideAll()方法\r
- ShapeFile对象增加show()方法\r
- ShapeFile对象增加showAll()方法\r
- ShapeFile对象增加update()方法\r
- ShapeFile对象增加open()方法\r
\r
### 2021.08.30 添加方法\r
\r
##### 完善以下对象的方法：\r
\r
- weather对象增加getDateTime方法\r
- camera对象增加getAnimationList方法\r
- tileLayer对象增加getActorInfo方法\r
\r
### 2021.08.25 实例管理服务权限优化\r
\r
##### 优化了实例管理服务接口的权限\r
\r
之前的实例管理服务是需要权限的，调用接口之前需要先登录才能正常调用，现在改成可选的了，如果部署的网络环境没有安全问题（比如内网部署），可以不用开启接口调用权限。\r
\r
### 2021.08.23 时间模拟\r
\r
##### Weather对象增加时间模拟的接口\r
\r
weather.simulateTime(startTime, endTime, duration) 具体使用方法请参考接口帮助文档和示例代码。\r
\r
### 2021.08.13 增加新接口\r
\r
##### 增加FloodFill和Cesium3DTile类\r
\r
##### TileLayer增加获取图层详细信息的方法\r
\r
tileLayer.getInformation\r
\r
### 2021.07.22 重构Cloud接口调用方式\r
\r
##### API调用同时支持WebSocket和WebRTC两种方式\r
\r
- 在CloudMaster配置界面的实例编辑高级参数里开启：\r
- 如果是通过实例管理服务的接口进行实例动态启停，可以在实例运行参数里加上websocketPort属性即可，具体使用方法请参考SDK/manager.html\r
\r
Cloud的API调用默认是重用WebRTC通道，不需要单独设置端口号。如果想使用之前的WebSocket方式，也是可以的，现在可以同时支持这两种方式。开启WebSocket调用方式的方法如下：\r
\r
### 2021.07.21 水淹分析\r
\r
##### 实现水淹分析接口\r
\r
tools对象增加方法：startFloodFill，stopFloodFill\r
\r
##### 支持WMTS\r
\r
地图设置(settings.setMapMode)支持wmts，具体请参考API文档\r
\r
### 2021.07.13 重构API和测试代码\r
\r
##### 重构对象的创建方式\r
\r
\`\`\`js\r
let o = {\r
	id: 'p1',\r
	coordinate: [495269.37, 2491073.25, 25.4],\r
	imagePath: HostConfig.Path + '/samples/images/tag.png',\r
	url: HostConfig.Path + '/samples/popup/simple.html',\r
	imageSize: [28, 28],\r
	text: '北京银行',\r
	range: [1, 8000.0],\r
	textRange: 3000,\r
	showLine: true,\r
	textColor: Color.Black,\r
	textBackgroundColor: Color.White,\r
	hoverImagePath: HostConfig.Path + '/samples/images/hilightarea.png',\r
	textSize: 10,\r
	autoHeight: true\r
	}\r
await fdapi.tag.add(o);\r
fdapi.tag.focus(o.id, 200, 0);\r
\`\`\`\r
\r
之前的对象XX创建方式是通过XXData来创建的，比如创建标签（Tag），需要先simple.html然后设置调用tag.add，现在不需要用这种方式了，直接构造object即可，例如： SDK自带的测试代码已经全部换成这种创建方式。 注意： ​ 以前的创建方式目前仍然可以继续使用，不过API文档已经移除了相关Data的注释，如果要查看之前的调用方式，请参考之前版本的API文档。\r
\r
##### RadiationPoint对象增加属性：autoHeight\r
\r
autoHeight：自动判断下方是否有物体，设置正确高度，默认值：false\r
\r
### 2021.07.12 完善接口\r
\r
##### 完善CustomTag类的方法\r
\r
CustomTagData增加属性popupPos，用于设置弹窗的位置。\r
\r
### 2021.07.07 完善OnReady回调\r
\r
##### 解决onReady回调引起的接口调用问题\r
\r
之前的onReady回调函数是在WebSocket连接成功时触发，这样有隐患，因为此时可能工程尚未加载完成，Explorer环境尚未准备好，如果此时调用接口，可能导致接口调用无效或者程序崩溃。 修改后的逻辑是：当工程加载完成后才会触发onReady回调。 注：用户不需要自己处理CompleteInitialization事件，SDK内部会自动处理，当收到CompleteInitialization事件时自动触发onReady回调。\r
\r
### 2021.07.01 DigitalTwinCloud重磅升级！！！\r
\r
##### DigitalTwinCloud改变API调用方式\r
\r
之前的版本是通过WebSocket方式进行API调用的，所以需要设置一个-websocketport参数，现在不需要这个参数设置了，改为直接通过WebRTC信道进行API调用。 这个改变只针对Cloud， 对于Explorer还需要之前的调用方式。\r
\r
##### 优化DigitalTwinPlayer、DigitalTwinAPI对象的初始化方式\r
\r
\`\`\`js\r
//DigitalTwinAPI初始化选项\r
    let apiOptions = {\r
        'onReady': _onReady,\r
        'onApiVersion': _onApiVersion,\r
        'onEvent': _onEvent,\r
        'onLog': log\r
    };\r
	aircityApi = new DigitalTwinAPI(HostConfig.API, apiOptions);\r
\`\`\`\r
\r
\`\`\`js\r
let iid = getQueryVariable('iid');\r
let apiOptions = {\r
	'onReady': _onReady,\r
	'onApiVersion': _onApiVersion,\r
	'onEvent': _onEvent,\r
	'onLog': log\r
};\r
//DigitalTwinPlayer\r
let options;\r
if (document.getElementById('player')) { //需要显示视频流\r
    options = {\r
	'iid': iid,         //如果想连接指定的云渲染实例，可以指定这个参数\r
	'domId': 'player',\r
	'apiOptions': apiOptions,\r
	'showStatus': true,\r
	'showStartupInfo': true\r
    }\r
}\r
else {\r
    options = {\r
	'iid': iid,          //不带视频流的连接必须指定云渲染实例\r
	'apiOptions': apiOptions\r
    };\r
}\r
aircityPlayer = new DigitalTwinPlayer(HostConfig.Player, options);\r
\r
//对于Cloud应用可以不用显式的创建DigitalTwinAPI对象，只需要在DigitalTwinPlayer创建参数里指定apiOptions，就会自动创建。\r
aircityApi = aircityPlayer.getAPI();\r
\`\`\`\r
\r
之前的DigitalTwinAPI的构造函数是这样的：constructor(host, fnOnReady, fnLog); 重构之后的构造函数是这样的：constructor(host, options, reserved); 重构之后，仍然兼容之前的调用方式（建议改成新的调用方式）。具体请参考帮助文档以及API测试页面。需要注意的是：之前的第一个参数host可以传实例ID，重构之后的host参数只能使用ip:port这样的形式，不能再传实例ID。 示例代码： 之前的DigitalTwinPlayer构造函数是这样的：constructor(host, domId, token, showStatus, showStartupInfo); 重构之后的构造函数是这样的：constructor(host, options); 重构之后，仍然兼容之前的调用方式（不过建议改成新的调用方式）。具体请参考帮助文档以及API测试页面。需要注意的是：之前的第一个参数host可以传实例ID，重构之后的host参数只能使用ip:port这样的形式，不能再传实例ID。 对于Cloud应用可以不用显式的创建DigitalTwinAPI对象，只需要在DigitalTwinPlayer创建参数里指定apiOptions，就会自动创建。 示例代码：\r
\r
##### 支持内网穿透功能\r
\r
之前的版本只能在有公网IP的机器上部署云渲染，这样有了很大的限制。 现在可以支持在任意网络环境中部署云渲染了。\r
\r
##### 支持分布式部署\r
\r
之前的版本云渲染相关的所有功能组件都必须在一台机器上部署，现在可以分布式部署了，比如在内网只部署云渲染节点，服务功能放在有公网IP的机器上。当用户连接的时候，可以自动分配空闲的云渲染实例，也可以指定访问特定的实例。\r
\r
### 2021.06.30 设置交互模式\r
\r
##### settings对象增加设置交互模式的方法\r
\r
setInteractiveMode(mode, fn) mode 交互模式，0：自由，1：第三人称，2：无人机\r
\r
##### Polyline, Polygon的样式增加“贴地模式”\r
\r
Polyline, Polygon之前的样式现在可以用枚举值了 ，具体请参考API文档。\r
\r
##### TileLayer增加新的方法\r
\r
- 增加设置视口可见性的方法：setViewportVisible\r
- 增加获取指定TileLayer的所有ObjectID的方法：getObjectIDs\r
\r
##### 增加相机移动事件的开关\r
\r
settings对象增加setEnableCameraMovingEvent方法 CameraMoving事件默认不再触发，如果需要触发CameraMoving事件，可以调用settings.setEnableCameraMovingEvent(true)来实现。\r
\r
##### 增加新的功能类\r
\r
- 增加CustomMesh类\r
- 增加新的标注类（标注类比之前的标签类tag功能更加强大）\r
\r
### 2021.05.25 增加接口\r
\r
##### settings对象增加交互开关\r
\r
fdapi.settings.setEnableInteract(bEnable) 用来设置交互开关，包括键盘、鼠标、触摸，如果禁用，只能通过接口控制相机\r
\r
##### 增加设置指北针是否可见的接口\r
\r
fdapi.settings.setCampassVisible\r
\r
##### Tag对象增加属性：autoHeight, textSize\r
\r
autoHeight: 自动判断Tag下方是否有物体，设置tag的正确高度 textSize：设置标签文本大小\r
\r
##### camera对象增加pauseAnimation, resumeAnimation方法\r
\r
可用于暂停、恢复播放动画导览。\r
\r
### 2021.04.28 优化API版本信息接口\r
\r
##### 云渲染服务器返回的版本号增加类型字段，用于区分软件的版本，例如Trunk/Master/Cluster等。\r
\r
通过版本类型和版本字段组合，更加唯一的确定了当前所使用的API版本。\r
\r
##### tag对象增加2个属性：popupPos、popupSize，用于设置弹出窗口的位置和大小\r
\r
注意：这2个属性不在TagData的构造函数中，需要创建TagData后再设置 数据类型： popupPos: [x, y] popupSize: [width, height]\r
\r
##### 增加启动进程的方法\r
\r
misc对象增加startProcess方法，用于调用系统进程，例如用系统浏览器打开一个网页，调用系统中的某个程序执行需要的功能等。 具体请参考测试页面int.html\r
\r
### 2021.04.23 TileLayer压平\r
\r
##### 增加TileLayer压平操作相关的接口\r
\r
tileLayer对象增加以下方法： addModifier、updateModifier、deleteModifier、clearModifier\r
\r
##### 优化视频流自适应功能\r
\r
云渲染视频流最大支持4K， 当页面video元素大小超过4K时，按比例进行缩放，比如8000x2000的大小，则云渲染后台的分辨率为：3840x960。\r
\r
### 2021.04.16 设置码率\r
\r
##### DigitalTwinPlayer对象增加设置码率的接口\r
\r
setBitrate(maxBitrate) 参数为最大码率，默认值为30000，可以根据自己的实际情况设置为合适的值。 SDK的测试页面player.html, main.html，可以通过url参数进行设置， 例如 http://192.168.1.29/player.html?bitrate=15000\r
\r
### 2021.04.12 优化tools对象\r
\r
##### 天际线分析方法增加属性\r
\r
startSkylineAnalysis方法的options参数增加tileLayers属性 exportSkyline方法去掉skylineColor和backgroundColor参数，增加options参数\r
\r
##### 增加设置鼠标拾取功能的方法\r
\r
misc对象增加setMousePickMask方法，之前的setQueryToolState方法已弃用。\r
\r
### 2021.04.08 统一方法名\r
\r
##### 统一tools对象的测量、剖切、分析接口的方法名\r
\r
都以start和stop为前缀，具体如下： createSkyline ---> startSkylineAnalysis deleteSkyline ---> stopSkylineAnalysis createViewshed ---> startViewshedAnalysis deleteViewshed ---> stopViewshedAnalysis\r
\r
##### 解决无法手动调整视频流大小的BUG\r
\r
手动设置大小和自动调整大小只能二选一。 具体请参考player_resize.html\r
\r
##### 添加相机控制接口\r
\r
camera对象增加以下方法，用于控制相机：前进、后退、左移、右移、上升、下降、左转、右转、抬头、低头以及停止。 moveForward moveBackward moveLeft moveRight moveUp moveDown turnLeft turnRight turnUp turnDown stop\r
\r
### 2021.04.02 添加天际线和视域分析功能\r
\r
##### tools对象增加天际线分析功能\r
\r
- createSkyline 创建天际线\r
- deleteSkyline 删除天际线\r
- exportSkyline 导出天际线\r
\r
tools对象增加以下方法：\r
\r
##### tools对象增加视域分析功能\r
\r
- createViewshed 开始视域分析\r
- deleteViewshed 停止视域分析\r
\r
tools对象增加以下方法： 注意： ​ 以前的视域分析功能(fdapi.viewshed)已弃用\r
\r
### 2021.03.23 接口改名\r
\r
##### 坐标转换方法改名\r
\r
proj2Geo ---> pcs2gcs geo2Proj ---> gcs2pcs\r
\r
### 2021.03.22 优化实例管理接口、增加剖切功能\r
\r
##### 设置实例参数的接口增加了参数"async"，\r
\r
\`\`\`js\r
var o = {\r
            'command': CommandType.SetInstanceParams,\r
            'async': true,   \r
            'instanceId': instanceId,\r
            'projectPath': projectPath,\r
            'adjustResolution': adjustResolution,\r
            'limitOneClient': limitOneClient\r
        }\r
        __ws.send(JSON.stringify(o));\r
\`\`\`\r
\r
用于设置接口是异步调用还是同步调用，命令格式如下： async参数是可选的，如果设置为true，那么立即返回结果，如果设置为false或者没有此参数，会等待实例启动结果，然后再返回。（也就是说此接口默认会等待）\r
\r
##### 实例管理服务增加错误代码\r
\r
\`\`\`js\r
const WSErrorCode = {\r
        OK: 0,\r
        NoInstance: 1,				//没有可用的实例\r
        InstanceNotFound: 2,		//没有找到指定的实例\r
        InstanceNotRunning: 3,		//指定的实例没有在运行\r
        ProjectPathNotExist: 4,	    //工程文件不存在\r
        AsyncProcessing: 5,		    //异步处理中...\r
        StartInstanceFailed: 6,	    //实例启动失败\r
        MaxCode: 255\r
    };\r
\`\`\`\r
\r
- AsyncProcessing：异步操作进行中，比如SetInstanceParam命令，如果设置了aysnc为true，那么返回的错误代码就是AsyncProcessing，说明实例正在启动\r
- StartInstanceFailed：启动实例失败\r
\r
##### 增加剖切相关的接口\r
\r
增加面剖切和体剖切相关的功能接口 ​ startPlaneClip、stopPlaneClip ​ startVolumeClip、stopVolumeClip 之前的stopClip方法已过期 暂时可继续使用，建议用stopPolygonClip代替。\r
\r
### 2021.03.19 重构异步调用\r
\r
##### 实现接口异步调用的三种方式\r
\r
三种方式：callback、then、async/await 使用方法请参考：二次开发：异步接口调用方式\r
\r
##### 优化设置相机的接口：camera.set\r
\r
现在camera.set方法可以传递三种类型的参数了 使用方法请参考：二次开发：关于设置相机位置的三种形式\r
\r
##### 统一所有接口的返回值\r
\r
\`\`\`js\r
async function test_tag_get() {\r
    let res = await fdapi.tag.get('p1');\r
    let o = res.data[0];\r
    log(\`获取标签：\\n id: \${o.id} \\n text: \${o.text}\`);\r
}\r
\r
或者：\r
function test_tag_get() {\r
    fdapi.tag.get('p1', function(res){\r
        let o = res.data[0];\r
    log(\`获取标签：\\n id: \${o.id} \\n text: \${o.text}\`);\r
    });   \r
}\r
\`\`\`\r
\r
\`\`\`js\r
{\r
	"command":	90,\r
	"timestamp":	1616134672222,\r
	"callbackIndex":	3,\r
	"result":	0,\r
	"resultMessage":	"OK",simple.html\r
	"data":	[{\r
			"id":	"p1",\r
			"groupId":	"",\r
			"userData":	"",\r
			"coordinate":	[495269.343750, 2491073.250000, 25.400000],\r
			"imageSize":	[28.000000, 28.000000],\r
			"url":	"D:\\\\Pojects\\\\DigitalTwinCloud\\\\SDK/simple.html",\r
			"imagePath":	"D:\\\\Pojects\\\\DigitalTwinCloud\\\\SDK/images/tag.png",\r
			"hoverImagePath":	"D:\\\\Pojects\\\\DigitalTwinCloud\\\\SDK/images/hilightarea.png",\r
			"text":	"北京银行",\r
			"textColor":	[0.000000, 0.000000, 0.000000, 1.000000],\r
			"textBackgroundColor":	[1.000000, 1.000000, 1.000000, 1.000000],\r
			"textBorderColor":	[0.000000, 0.000000, 0.000000, 0.000000],\r
			"range":	[1.000000, 8000.000000],\r
			"textRange":	3000.000000,\r
			"showLine":	1,\r
			"autoHidePopupWindow":	1\r
		}]\r
}\r
\`\`\`\r
\r
之前对tag.get, polyline.get等这些对象的get方法的回调函数的返回值进行的特殊处理，现在进行了统一，对于使用async/await方式进行异步调用，所有的接口返回值都是一样的了，就是在int.html里调用接口后显示的Reponse输出内容 以tag.get举例，调用方式如下： 运行上面的代码后，res参数就是下面的JSON对象：\r
\r
### 2021.03.18 重构JS库完善API接口\r
\r
##### 增加获取图层数信息的接口\r
\r
\`\`\`js\r
fdapi.infoTree.get((response) => {\r
        let str = response.infotree;\r
        let o = JSON.parse(str);\r
        log(JSON.stringify(o));\r
});\r
\`\`\`\r
\r
\`\`\`js\r
{\r
	"command":	217,\r
	"timestamp":	1615272910405,\r
	"callbackIndex":	3,\r
	"result":	0,\r
	"infotree":	[{\r
			"iD":	"ProjectTree_Root",\r
			"index":	0,\r
			"parentIndex":	-1,\r
			"name":	"世界",\r
			"type":	"EPT_Folder"\r
		}, {\r
			"iD":	"D18ABAB9405A2AC58E6D49BF28A86706",\r
			"index":	1,\r
			"parentIndex":	0,\r
			"name":	"EmergencyRoom_UniversalKey",\r
			"type":	"EPT_Scene"\r
		}, {\r
			"iD":	"8F4AD37744DCF514E62EED80BA6D4064",\r
			"index":	2,\r
			"parentIndex":	0,\r
			"name":	"SDKDemo",\r
			"type":	"EPT_Scene"\r
		}, {\r
			"iD":	"8E543D9B427BE68A2726C380501D6DC2",\r
			"index":	3,\r
			"parentIndex":	0,\r
			"name":	"building",\r
			"type":	"EPT_Scene"\r
		}]\r
}\r
\`\`\`\r
\r
调用方法： 回调返回的数据格式如下：\r
\r
##### playMovie方法增加loop参数，用于指定是否循环播放\r
\r
fdapi.misc.playMovie('c:/media/courier.mp4', true);\r
\r
##### 增加reset方法\r
\r
fdapi.reset(); 调用后可以将场景重置到刚打开工程的状态。\r
\r
##### 重构JS库以支持VUE开发\r
\r
点击查看 API_Vue\r
\r
##### DigitalTwinCloud对象改名为DigitalTwinAPI，现在的调用方法如下：\r
\r
var api = new DigitalTwinAPI(...); 为了保持兼容，DigitalTwinCloud还可以继续使用，var api = new DigitalTwinCloud(...);\r
\r
##### 重构JS库，现在支持在同一个HTML页面创建多个云渲染实例了\r
\r
具体使用方法请参考在一个页面中嵌入多个云渲染窗口\r
\r
##### 完善CustomObject类的方法\r
\r
- addByTileLayer：从TileLayer图层添加CustomObject对象\r
- highlight：高亮\r
- unhighlight：取消高亮\r
- callFunction：调用CustomObject对象的蓝图函数\r
- focus：该方法距离参数功能增强\r
\r
增加了以下几个方法：（具体参数请参考API修改记录）\r
\r
##### 配置工具增加使用样例功能的功能：\r
\r
首次使用DigitalTwinCloud或者想学习接口使用方法，查看示例代码的时候可以选择样例功能。\r
\r
##### 回调函数返回的JSON数据里增加resultMessage属性，用于只是错误代码的信息\r
\r
\`\`\`js\r
{\r
	"command":	255,\r
	"timestamp":	0,\r
	"callbackIndex":	0,\r
	"result":	7,\r
	"resultMessage":	"InvalidRequestType"\r
}\r
\`\`\`\r
\r
##### 统一Camera的Get/Set方法的参数\r
\r
- camera的get方法返回的信息由之前的x, y, z, heading, tilt, roll调整为x, y, z, pitch, yaw, roll和数组 set/lookAt/lookAtBBox方法的参数也做了对应的调整，参见下面第2条说明\r
- camera增加useOldDataFormat方法 用于设置是否使用旧版本的数据格式（2021.03.17之前的版本），这是一个全局的设置。 受影响的方法有：camera对象的set、lookAt、lookAtBBox，以camera.set举例： 之前版本的方法定义如下：(x, y, z, heading, tilt, flyTime, fn) 现在的定义如下：set(x, y, z, pitch, yaw, flyTime, fn) 两个的区别就是heading(yaw), tilt(pitch)的顺序互换了一下 如果调用了useOldDataFormat()，可以让用户代码保持兼容（不用修改就可以在新版本上运行）\r
\r
### 2021.03.05 完善坐标系-增加动态水接口\r
\r
##### coord对象增加坐标系转换接口：geo2Proj, proj2Geo\r
\r
geo2Proj: 地理坐标转投影坐标 proj2Geo: 投影坐标转地理坐标\r
\r
##### object的派生类支持使用经纬度创建了\r
\r
目前支持一下对象使用经纬度创建： tag、customTag, polyline, odline, polygon, polygon3D, beam, radiationPoint, videoProjection, viewshed 以tag为例，在构造TagData后，设置coordinateType为WGS84即可，例如： let o = new TagData('tag1', ....); o.coordinateType = 1; fdapi.tag.add(o);\r
\r
##### 增加quit方法，可以调用此方法退出程序\r
\r
fdapi.quit();\r
\r
##### 完善tileLayer对象的stopHighlightActor方法\r
\r
之前的stopHighlightActor是取消场景里所有相关的高亮，现在可以传递参数，取消指定tileLayer、指定actor的高亮了。 fdapi.tileLayer.stopHighlightActor(tileLayerId, tileLayerActorObjectId); 如果想取消所有的高亮，可以调用__g.tileLayer.stopHighlightActor(); 或者 fdapi.tileLayer.stopHighlightActors();\r
\r
##### 增加动态水接口：dynamicWater\r
\r
### 2021.03.01 CameraTour\r
\r
##### CameraTourData类的构造函数去掉duration和userData参数\r
\r
现在的调用方式如下： let data = new CameraTourData('1', 'tour1', keyFrames);\r
\r
##### tools对象增加lineIntersect方法，进行线段求交。\r
`;export{r as default};
