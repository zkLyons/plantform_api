const n=`---\r
title: 高级接口授权\r
sidebar_label: 高级接口授权\r
description: "DTS Cloud SDK 高级付费接口授权说明：需单独授权的对象与模块清单、授权流程与授权状态验证。"\r
---\r
\r
### SDK 高级付费接口授权说明\r
\r
部分高级功能接口需要**单独购买授权**后才能使用。未授权时调用这些接口，方法会静默失败或返回错误回调。\r
\r
---\r
\r
### 需要授权的对象与模块\r
\r
下表列出需单独授权的对象及其所属授权模块：\r
\r
| 对象 / 类 | 说明 | 授权模块 |\r
|-----------|------|---------|\r
| \`HeatMap3D\` | 三维热力图 | 高级分析模块 |\r
| \`FloodFill\` | 水淹分析 | 高级分析模块 |\r
| \`Tools\` | 分析工具（下列 9 个分析接口，详见下表） | 高级分析模块 |\r
| \`Antenna\` | 天线方向图 | 高级分析模块 |\r
| \`SignalWave\` | 信号波束 | 高级分析模块 |\r
| \`FiniteElement2\` | 有限元仿真 2 | 高级分析模块 |\r
| \`WaterFlowField\` | 水流场 | 水仿真模块 |\r
| \`Fluid\` | 三维水体仿真 | 水仿真模块 |\r
| \`HydroDynamic1D\` | 一维水动力模型 | 水仿真模块 |\r
| \`HydroDynamic2D\` | 二维水动力模型 | 水仿真模块 |\r
| \`VectorField\` | 向量场 | 海洋气象模块 |\r
| \`Vehicle2\` | 高级载具 | 交通仿真模块 |\r
| \`Train\` | 火车 | 交通仿真模块 |\r
| \`TrafficSimulation\` | 城市交通仿真 | 交通仿真模块 |\r
| \`Drone\` | 低空无人机 | 交通仿真模块 |\r
| \`BattlefieldSimulation\` | 战场仿真 | 军事仿真模块 |\r
| \`Plot\` | 态势标绘 | 军事仿真模块 |\r
\r
#### \`Tools\` 对象下需授权的分析方法\r
\r
| 方法名 | 说明 |\r
|--------|------|\r
| \`startContourLineAnalysis(options, fn)\` | 等高线分析（适用于地形） |\r
| \`startCutFillAnalysis(options, fn)\` | 填挖方分析（适用于地形） |\r
| \`startFloodFill(options, fn)\` | 水淹分析 |\r
| \`startSkylineAnalysis(options, fn)\` | 天际线分析 |\r
| \`exportSkyline(path, size, options, fn)\` | 导出天际线图片 |\r
| \`startSunshineAnalysis(options, fn)\` | 日照分析 |\r
| \`startTerrainSlopeAnalysis(options, fn)\` | 坡度坡向分析（适用于地形） |\r
| \`startViewDomeAnalysis(options, fn)\` | 开敞度分析 |\r
| \`startViewshedAnalysis(options, fn)\` | 视域分析 |\r
| \`startVisiblityAnalysis(options, fn)\` | 通视分析 |\r
\r
---\r
\r
### 授权流程\r
\r
1. 联系 DTS 商务团队，购买对应模块的授权 License。\r
2. 将 License 文件放置到服务端指定目录（由实施工程师配置）。\r
3. 重启 DTS Cloud 服务，授权自动生效。\r
4. 客户端无需修改任何代码，授权后接口直接可用。\r
\r
---\r
\r
### 验证授权状态\r
\r
未授权的接口通常会静默失败或在回调中返回错误，可借此判断授权状态：\r
\r
\`\`\`js\r
new DigitalTwinAPI('127.0.0.1:8080', {\r
  onReady: () => {\r
    // 尝试调用付费接口，通过回调判断是否已授权\r
    fdapi.tools.startViewshedAnalysis(\r
      { coordinate: [120.15, 30.27, 0], radius: 500 },\r
      (result) => {\r
        if (result.error) {\r
          console.warn('接口未授权或参数错误：', result.error);\r
        } else {\r
          console.log('视域分析已启动');\r
        }\r
      }\r
    );\r
  },\r
});\r
\`\`\`\r
`;export{n as default};
