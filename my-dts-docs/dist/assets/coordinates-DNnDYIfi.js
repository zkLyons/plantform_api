const r=`---\r
title: 坐标系与坐标转换\r
sidebar_label: 坐标系\r
description: "投影坐标系、地理坐标系、火星/百度坐标系的说明与转换"\r
---\r
\r
### 坐标系类型\r
\r
DTS Cloud 支持两种主坐标系：\r
\r
| 类型 | 说明 | 典型用途 |\r
|------|------|----------|\r
| **PCS**（投影坐标系） | 本地平面直角坐标，单位：米 | 工厂、园区、建筑等局部场景 |\r
| **GCS**（地理坐标系） | 经纬度坐标（WGS84 / CGCS2000） | 城市级、全球级场景 |\r
\r
当前场景使用哪种坐标系，由服务端配置决定，可通过 \`fdapi.coord\` 查询。\r
\r
---\r
\r
### 坐标数组格式说明\r
\r
SDK 中多边形、折线等几何体使用多维数组表示坐标。\`z\`（高度）可省略，默认为 0。\r
\r
#### 单个点（一维数组）\r
\r
\`\`\`js\r
let point = [x, y, z]; // z 可省略\r
\`\`\`\r
\r
#### 单条折线 / 单个环（二维数组）\r
\r
坐标点需按**顺时针或逆时针**顺序排列：\r
\r
\`\`\`js\r
let z = 0;\r
let ring = [\r
  [1, 1, z],\r
  [2, 2, z],\r
  [3, 3, z],\r
];\r
\`\`\`\r
\r
#### 单个 Part（含内环的多边形，三维数组）\r
\r
\`\`\`js\r
let z = 0;\r
\r
// 1 个 Part，无内环\r
let c1 = [\r
  [1, 1, z],\r
  [2, 2, z],\r
  [3, 3, z],\r
];\r
\r
// 1 个 Part，含 1 到多个内环\r
// 第一个元素是外环，其余是内环（孔洞）\r
let c2 = [\r
  [[1, 1, z], [2, 2, z], [3, 3, z]],  // 外环\r
  [[1, 1, z], [2, 2, z], [3, 3, z]],  // 内环 1\r
  [[1, 1, z], [2, 2, z], [3, 3, z]],  // 内环 2\r
];\r
\`\`\`\r
\r
#### 多个 Part（四维数组）\r
\r
\`\`\`js\r
let z = 0;\r
\r
// 多个 Part，有的含内环，有的不含\r
let c3 = [\r
  // 无内环的 Part\r
  [\r
    [[1, 1, z], [2, 2, z], [3, 3, z]],\r
  ],\r
  // 含内环的 Part（第一个元素是外环，其余是内环）\r
  [\r
    [[1, 1, z], [2, 2, z], [3, 3, z]],  // 外环\r
    [[1, 1, z], [2, 2, z], [3, 3, z]],  // 内环\r
  ],\r
];\r
\r
// 多个 Part，每个 Part 都含内环\r
let c4 = [\r
  [  // Part 1\r
    [[1, 1, z], [2, 2, z], [3, 3, z]],  // 外环\r
    [[1, 1, z], [2, 2, z], [3, 3, z]],  // 内环\r
  ],\r
  [  // Part 2\r
    [[1, 1, z], [2, 2, z], [3, 3, z]],  // 外环\r
    [[1, 1, z], [2, 2, z], [3, 3, z]],  // 内环\r
  ],\r
];\r
\`\`\`\r
\r
---\r
\r
### 坐标转换\r
\r
使用 \`fdapi.coord\` 在各坐标系之间转换：\r
\r
\`\`\`js\r
// PCS ↔ GCS 互转\r
const gcs = fdapi.coord.pcsToGcs([488000, 2890000, 10]);   // → [lng, lat, alt]\r
const pcs = fdapi.coord.gcsToPcs([120.15, 30.27, 10]);     // → [x, y, z]\r
\r
// 屏幕坐标 → 世界坐标\r
const world = fdapi.coord.screenToWorld([960, 540]);\r
\r
// 世界坐标 → 屏幕坐标\r
const screen = fdapi.coord.worldToScreen([488000, 2890000, 10]);\r
\`\`\`\r
\r
详细参数说明见 [Coord API 文档](/docs/api/utils/coord)。\r
`;export{r as default};
